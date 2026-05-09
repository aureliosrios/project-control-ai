"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Formacion() {
  const [view, setView] = useState("asinc");

  const toggleRoute = (id) => {
    const el = document.getElementById(id);
    const arrow = document.getElementById(`arrow-${id}`);
    if (el) el.classList.toggle("hidden");
    if (arrow) arrow.classList.toggle("rotate-180");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 pt-32 pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-20" />
      
      <main className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Academy & Training
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
            Ecosistema de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Formación</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            Domina la intersección entre la <span className="text-cyan-400 font-medium">Inteligencia Artificial</span> y la gestión de proyectos de construcción de alto rendimiento.
          </p>
        </header>

        {/* View Selector */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button 
            onClick={() => setView("asinc")}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all ${
              view === "asinc" 
              ? "bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)]" 
              : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            <span className="material-symbols-outlined text-lg">school</span> Asincrónico · A tu ritmo
          </button>
          <button 
            onClick={() => setView("sinc")}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all ${
              view === "sinc" 
              ? "bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)]" 
              : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            <span className="material-symbols-outlined text-lg">live_tv</span> En Vivo · Sincrónico
          </button>
        </div>

        {view === "asinc" ? (
          <div className="space-y-20">
            {/* Cursos Transversales */}
            <section>
              <div className="flex flex-col mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Cursos Transversales</h2>
                <p className="text-slate-400 max-w-2xl">Fundamentos indispensables para ingenieros de todas las especialidades. El punto de partida de tu transformación digital.</p>
              </div>

              {/* Curso A1 */}
              <div className="glass-card rounded-3xl border-white/5 p-8 md:p-12 relative overflow-hidden group hover:border-cyan-500/20 transition-all mb-12">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none" />
                <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-bold mb-4 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> RUTA A · CURSO A1 · PUBLICADO
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">El Despertar de la IA en la Gestión de Proyectos</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">
                      6 entregables reales en 2.5 horas sin escribir una sola línea de código. Reportes HTML, Mermaid.js, ATS, IPERC y Matrices generados con IA.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-8 text-sm text-slate-400">
                      <div className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Reportes HTML</div>
                      <div className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Flujogramas Mermaid</div>
                      <div className="flex items-center gap-2"><span className="text-cyan-400">✓</span> ATS + IPERC</div>
                      <div className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 28 Prompts Élite</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-3xl font-bold text-white">$11.99 USD</span>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Acceso de por vida · Hotmart</span>
                      </div>
                      <Link href="https://go.hotmart.com/I104938744G" target="_blank" className="bg-cyan-500 text-slate-950 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        Comprar ahora
                      </Link>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-4">Resultados del Curso</div>
                    <ul className="space-y-4">
                      {["Reporte ejecutivo interactivo", "Diagramas de flujo automáticos", "Plan de seguridad inteligente", "Cronograma visual sin P6"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                          <span className="w-5 h-5 rounded bg-cyan-500/10 flex items-center justify-center text-[10px] text-cyan-400 font-bold">{i+1}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cursos Sincrónicos */}
            {[
              { 
                title: "El Despertar de la IA (En Vivo)", 
                level: "Curso 1 · Básico", 
                date: "24 de mayo, 2026", 
                price: "$75 USD",
                desc: "15h de formación en vivo. Domina el alcance, contratos y calidad con lenguajes nativos de IA."
              },
              { 
                title: "Ingeniería Aumentada", 
                level: "Curso 2 · Avanzado", 
                date: "31 de mayo, 2026", 
                price: "$100 USD",
                desc: "Python, VBA y Agentes Autónomos. Crea tus propios Skills y Scripts MCP para dashboards."
              }
            ].map((course, i) => (
              <div key={i} className="glass-card rounded-3xl border-white/5 overflow-hidden flex flex-col hover:border-cyan-500/30 transition-all group">
                <div className="h-48 bg-white/5 relative">
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">En Vivo</span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{course.title}</h3>
                  <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mb-4">{course.level}</p>
                  <p className="text-slate-400 text-sm mb-6 flex-1">{course.desc}</p>
                  <div className="space-y-2 mb-8 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-2"><span className="text-cyan-500">📅</span> Inicio: {course.date}</div>
                    <div className="flex items-center gap-2"><span className="text-cyan-500">⏰</span> Domingos · 10AM - 1PM</div>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">{course.price}</span>
                    <Link href="/inscripcion" className="bg-white/10 hover:bg-cyan-500 hover:text-slate-950 px-4 py-2 rounded-lg font-bold text-xs transition-all">
                      Inscribirme
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
