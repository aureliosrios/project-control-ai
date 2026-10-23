"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

// Panel del director para emitir claves de descarga de UN SOLO USO (funciona en celular y laptop).
// Acceso con Supabase Auth; las funciones SQL solo responden a correos registrados en `admins_pcai`.
const SITE = "https://project-control-ai-one.vercel.app";

const ESTADO_COLOR = {
  DISPONIBLE: "text-emerald-300 bg-emerald-950/60 border-emerald-500/40",
  USADA: "text-slate-300 bg-slate-800 border-slate-600",
  ANULADA: "text-red-300 bg-red-950/60 border-red-500/40",
  EXPIRADA: "text-amber-300 bg-amber-950/60 border-amber-500/40",
};

const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-cyan-400 outline-none text-sm";

export default function LicenciasAdmin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agentes, setAgentes] = useState([]);
  const [licencias, setLicencias] = useState([]);
  const [form, setForm] = useState({ agente: "", nombre: "", contacto: "", dni: "", monto: "S/ 70 Yape", dias: 7 });
  const [generada, setGenerada] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [copiado, setCopiado] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const cargar = useCallback(async () => {
    const [a, l] = await Promise.all([
      supabase.rpc("listar_agentes_descargables"),
      supabase.rpc("listar_licencias_agentes", { p_limite: 50 }),
    ]);
    if (a.error || l.error) {
      setError((a.error || l.error).message);
      return;
    }
    setAgentes(a.data || []);
    setLicencias(l.data || []);
    setForm((f) => ({ ...f, agente: f.agente || a.data?.[0]?.id || "" }));
  }, []);

  useEffect(() => {
    if (session) cargar();
  }, [session, cargar]);

  async function login(e) {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setError("Credenciales incorrectas.");
  }

  async function generar(e) {
    e.preventDefault();
    setCargando(true);
    setError("");
    setGenerada(null);
    const { data, error } = await supabase.rpc("generar_licencia_agente", {
      p_agente_id: form.agente,
      p_alumno_nombre: form.nombre,
      p_alumno_contacto: form.contacto,
      p_dni: form.dni,
      p_monto: form.monto,
      p_nota: null,
      p_dias_validez: Number(form.dias) || 7,
    });
    setCargando(false);
    if (error) return setError(error.message);
    const { clave, expira_at } = data[0];
    const link = `${SITE}/agentes/descargar?clave=${clave}`;
    const agente = agentes.find((a) => a.id === form.agente)?.nombre || "";
    const mensaje =
      `¡Gracias por tu compra${form.nombre ? `, ${form.nombre.split(" ")[0]}` : ""}! ✅ Pago verificado.\n` +
      `Descarga tu ${agente} aquí:\n${link}\n\nClave: ${clave}\n\n` +
      `⚠️ El enlace y la clave son de UN SOLO USO. Descárgalo desde el equipo donde lo vas a usar.`;
    setGenerada({ clave, link, mensaje, expira_at, contacto: form.contacto });
    setForm((f) => ({ ...f, nombre: "", contacto: "", dni: "" }));
    cargar();
  }

  async function anular(id) {
    if (!confirm("¿Anular esta clave? El alumno ya no podrá usarla.")) return;
    const { error } = await supabase.rpc("anular_licencia_agente", { p_id: id });
    if (error) return setError(error.message);
    cargar();
  }

  async function copiar(texto, tipo) {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(tipo);
      setTimeout(() => setCopiado(""), 1500);
    } catch {}
  }

  const waNumero = (generada?.contacto || "").replace(/\D/g, "");
  const waHref = generada
    ? `https://wa.me/${waNumero.length === 9 ? `51${waNumero}` : waNumero}?text=${encodeURIComponent(generada.mensaje)}`
    : "#";

  return (
    <div className="min-h-screen bg-[#14161a] text-slate-100">
      <main className="relative z-10 pt-28 pb-24 px-4 sm:px-6 max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-1">Licencias de Agentes</h1>
        <p className="text-slate-400 text-sm mb-8">Claves de descarga de un solo uso · solo director</p>

        {error && <p className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm">{error}</p>}

        {!session ? (
          <form onSubmit={login} className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3 max-w-sm">
            <input className={inputCls} type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
            <input className={inputCls} type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            <button className="w-full px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-black text-xs uppercase tracking-wider">Ingresar</button>
          </form>
        ) : (
          <>
            <form onSubmit={generar} className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <select className={`${inputCls} sm:col-span-2`} value={form.agente} onChange={(e) => setForm({ ...form, agente: e.target.value })}>
                {agentes.map((a) => (
                  <option key={a.id} value={a.id}>{a.nombre}</option>
                ))}
              </select>
              <input className={inputCls} placeholder="Nombre del alumno" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
              <input className={inputCls} placeholder="WhatsApp (ej. 51987654321)" inputMode="tel" value={form.contacto} onChange={(e) => setForm({ ...form, contacto: e.target.value })} />
              <input className={inputCls} placeholder="DNI (opcional)" inputMode="numeric" value={form.dni} onChange={(e) => setForm({ ...form, dni: e.target.value })} />
              <select className={inputCls} value={form.monto} onChange={(e) => setForm({ ...form, monto: e.target.value })}>
                <option>S/ 70 Yape</option>
                <option>S/ 70 Plin</option>
                <option>$25 PayPal</option>
                <option>Cortesía</option>
              </select>
              <label className="text-xs text-slate-400 flex items-center gap-2">
                Válida por
                <input className={`${inputCls} w-20`} type="number" min={1} max={90} value={form.dias} onChange={(e) => setForm({ ...form, dias: e.target.value })} />
                días
              </label>
              <button disabled={cargando || !form.agente} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 disabled:opacity-50 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-base">key</span>
                {cargando ? "Generando..." : "Generar clave"}
              </button>
            </form>

            {generada && (
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 mb-8 space-y-3">
                <p className="text-xs font-black uppercase tracking-wider text-emerald-300">Clave generada · se muestra solo una vez</p>
                <p className="font-mono text-2xl font-black tracking-wider break-all">{generada.clave}</p>
                <p className="text-xs text-slate-400 break-all">{generada.link}</p>
                <div className="flex flex-wrap gap-2">
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 rounded-xl bg-green-600 hover:bg-green-500 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">send</span>
                    Enviar por WhatsApp
                  </a>
                  <button type="button" onClick={() => copiar(generada.mensaje, "msg")} className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-black text-xs uppercase tracking-wider">
                    {copiado === "msg" ? "¡Copiado!" : "Copiar mensaje"}
                  </button>
                  <button type="button" onClick={() => copiar(generada.clave, "clave")} className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-black text-xs uppercase tracking-wider">
                    {copiado === "clave" ? "¡Copiado!" : "Copiar clave"}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-300">Últimas claves</h2>
              <div className="flex gap-3 text-xs">
                <button onClick={cargar} className="text-cyan-400 hover:underline">Actualizar</button>
                <button onClick={() => supabase.auth.signOut()} className="text-slate-400 hover:underline">Salir</button>
              </div>
            </div>
            <div className="space-y-2">
              {licencias.map((l) => (
                <div key={l.id} className="p-3 rounded-xl bg-slate-900/60 border border-white/10 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="font-mono text-slate-400">…{l.codigo_sufijo}</span>
                  <span className="font-bold">{l.alumno_nombre || "—"}</span>
                  <span className="text-slate-500 text-xs">{l.agente_id} · {l.monto || ""}</span>
                  <span className={`ml-auto text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${ESTADO_COLOR[l.estado]}`}>{l.estado}</span>
                  <span className="w-full text-xs text-slate-500">
                    Creada {new Date(l.created_at).toLocaleString("es-PE")}
                    {l.usada_at ? ` · Descargada ${new Date(l.usada_at).toLocaleString("es-PE")}` : ""}
                    {l.estado === "DISPONIBLE" && (
                      <button onClick={() => anular(l.id)} className="ml-3 text-red-400 hover:underline">Anular</button>
                    )}
                  </span>
                </div>
              ))}
              {licencias.length === 0 && <p className="text-sm text-slate-500">Aún no hay claves emitidas.</p>}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
