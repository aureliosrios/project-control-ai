"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Página de canje: el alumno pega su clave (o llega con ?clave=...) y pulsa Descargar.
// La descarga NO se dispara al abrir el link, para que las vistas previas de WhatsApp no consuman la clave.
export default function DescargarAgente() {
  const [clave, setClave] = useState("");
  const [estado, setEstado] = useState("idle"); // idle | cargando | ok | error
  const [mensaje, setMensaje] = useState("");
  const [descarga, setDescarga] = useState(null);

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("clave");
    if (c) setClave(c.toUpperCase());
  }, []);

  async function canjear(e) {
    e.preventDefault();
    if (estado === "cargando") return;
    setEstado("cargando");
    setMensaje("");
    try {
      const res = await fetch("/api/agentes/canjear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clave }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.mensaje);
      setDescarga(data);
      setEstado("ok");
      window.location.href = data.url;
    } catch (err) {
      setMensaje(err.message || "No se pudo validar la clave.");
      setEstado("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#14161a] text-slate-100">
      <div className="fixed inset-0 tech-grid opacity-30 pointer-events-none" />
      <main className="relative z-10 pt-32 pb-24 px-6 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
          <span className="material-symbols-outlined text-sm">key</span>
          Descarga de Agentes de IA
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-none mb-4">
          Canjea tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">clave</span>
        </h1>
        <p className="text-slate-300 mb-8">
          Ingresa la clave que recibiste por WhatsApp después de verificar tu pago. La clave es de <strong>un solo uso</strong>:
          descarga el agente desde el equipo donde lo vas a utilizar.
        </p>

        {estado === "ok" ? (
          <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/40">
            <p className="font-black text-emerald-300 flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined">check_circle</span>
              ¡Clave validada! Tu descarga comenzó.
            </p>
            <p className="text-sm text-slate-300 mb-4">
              {descarga?.agente} · <span className="font-mono">{descarga?.archivo}</span>
            </p>
            <a
              href={descarga?.url}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Si no inició, pulsa aquí (válido 60 s)
            </a>
          </div>
        ) : (
          <form onSubmit={canjear} className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 space-y-4">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-400" htmlFor="clave">
              Clave de descarga
            </label>
            <input
              id="clave"
              value={clave}
              onChange={(e) => setClave(e.target.value.toUpperCase())}
              placeholder="PCAI-XXXX-XXXX-XXXX"
              autoComplete="off"
              spellCheck={false}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 focus:border-cyan-400 outline-none font-mono text-lg tracking-wider"
            />
            {estado === "error" && (
              <p className="text-sm text-red-300 flex items-start gap-1.5">
                <span className="material-symbols-outlined text-base">error</span>
                {mensaje}
              </p>
            )}
            <button
              type="submit"
              disabled={estado === "cargando" || clave.trim().length < 12}
              className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 disabled:opacity-50 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">download</span>
              {estado === "cargando" ? "Validando..." : "Descargar agente"}
            </button>
          </form>
        )}

        <p className="text-xs text-slate-500 mt-6">
          ¿Aún no tienes tu clave? Mira la guía y la demo en{" "}
          <Link href="/servicios?tab=agentes" className="text-cyan-400 hover:underline">Soluciones Agénticas</Link>, realiza tu pago y
          envía el comprobante al{" "}
          <a href="https://wa.me/51993147501" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
            +51 993 147 501
          </a>.
        </p>
      </main>
    </div>
  );
}
