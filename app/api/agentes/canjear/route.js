import { createClient } from "@supabase/supabase-js";

// Canje de licencias de UN SOLO USO. Corre solo en el servidor (Vercel): la clave service_role
// nunca llega al navegador. La función SQL marca la licencia como USADA de forma atómica y aquí
// se entrega un enlace firmado del bucket privado `agentes` que caduca en 60 segundos.
export const dynamic = "force-dynamic";

const MENSAJES = {
  NO_EXISTE: "La clave no es válida. Revisa que la hayas copiado completa.",
  YA_USADA: "Esta clave ya fue utilizada. Cada clave permite una sola descarga.",
  ANULADA: "Esta clave fue anulada. Comunícate con Project Control AI.",
  EXPIRADA: "Esta clave venció. Solicita una nueva por WhatsApp.",
};

export async function POST(request) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bpsumudexpywfffcwpun.supabase.co";
  if (!serviceKey) {
    return Response.json({ ok: false, mensaje: "Servicio de descargas no configurado." }, { status: 503 });
  }

  let clave = "";
  try {
    clave = String((await request.json())?.clave || "").trim();
  } catch {}
  if (clave.replace(/[^A-Za-z0-9]/g, "").length < 12 || clave.length > 40) {
    return Response.json({ ok: false, mensaje: MENSAJES.NO_EXISTE }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || null;

  const { data, error } = await supabase.rpc("canjear_licencia_agente", {
    p_clave: clave,
    p_ip: ip,
    p_user_agent: request.headers.get("user-agent"),
  });
  if (error) {
    console.error("canjear_licencia_agente", error);
    return Response.json({ ok: false, mensaje: "No se pudo validar la clave. Intenta en un momento." }, { status: 500 });
  }

  const r = data?.[0];
  if (!r?.ok) {
    return Response.json({ ok: false, mensaje: MENSAJES[r?.motivo] || MENSAJES.NO_EXISTE }, { status: 403 });
  }

  const nombreArchivo = r.archivo_path.split("/").pop();
  const { data: firmado, error: signError } = await supabase.storage
    .from("agentes")
    .createSignedUrl(r.archivo_path, 60, { download: nombreArchivo });
  if (signError) {
    // La clave ya se consumió: avisar para que el admin emita una nueva.
    console.error("createSignedUrl", signError);
    return Response.json(
      { ok: false, mensaje: "Tu clave se validó, pero el archivo no está disponible. Escríbenos por WhatsApp y te enviamos una nueva." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true, agente: r.agente_nombre, archivo: nombreArchivo, url: firmado.signedUrl });
}
