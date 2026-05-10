"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const asincronicos = [
  {
    id: "A1",
    nombre: "El Despertar de la IA en la Gestión de Proyectos",
    precio: "$11.99 USD",
    tag: "CURSO A1 · PUBLICADO",
    desc: "6 entregables reales en 2.5h sin programar. Reportes HTML, Mermaid.js, ATS, IPERC, Organigramas y Matrices CSV generados con IA.",
    link: "https://go.hotmart.com/I104938744G",
    color: "cyan",
    pilares: ["Reportes HTML interactivos", "Flujogramas Mermaid.js", "ATS + IPERC inteligentes", "Cronogramas visuales"]
  },
  {
    id: "A2",
    nombre: "Escáner Forense con NotebookLM",
    precio: "$11.99 USD",
    tag: "CURSO A2 · PUBLICADO",
    desc: "Gestión documental masiva para proyectos. Auditoría legal y técnica, extracción de actividades e informes de movilización en minutos.",
    link: "https://pay.hotmart.com/O105604032H",
    color: "orange",
    pilares: ["Auditoría Forense IA", "Plan Logístico (Gemini)", "Checklist de Recursos", "Narrativa Multimedia"]
  },
  {
    id: "C1",
    nombre: "Automatización de Presupuestos con IA",
    precio: "$11.99 USD",
    tag: "CURSO C1 · ESPECIALIDAD",
    desc: "Ingeniería de Costos Aumentada (Python + Agentes). Reduce el tiempo operativo de licitación en un 90% delegando tareas a la IA.",
    link: "https://pay.hotmart.com/H105703259M",
    color: "blue",
    pilares: ["Infraestructura Python", "IA para EETT y WBS", "Visión Artificial Planos", "SkillPro v4: Lógica APU"]
  }
];

const sincronicos = [
  {
    id: "S1",
    nombre: "El Despertar de la IA para la Gestión de Proyectos",
    precio: "$67.00 USD",
    tag: "EN VIVO · COHORTE 1",
    desc: "Sesiones en vivo donde implementamos agentes de IA para el control de cronogramas y riesgos. Incluye acceso a herramientas exclusivas.",
    link: "/inscripcion",
    color: "cyan",
    pilares: ["Sesiones Mentoría en Vivo", "Agentes de Control Real", "Plantillas de Ingeniería", "Soporte VIP WhatsApp"]
  },
  {
    id: "S2",
    nombre: "Ingeniería Aumentada: Automatización con Agentes",
    precio: "$97.00 USD",
    tag: "EN VIVO · ESPECIALIZACIÓN",
    desc: "Dominio avanzado de Python y Agentes Autónomos para ingenieros. Crea tus propios sistemas de control operativo.",
    link: "/inscripcion",
    color: "blue",
    pilares: ["Desarrollo Python para Ing.", "Creación Agentes Autónomos", "Integración API / Vercel", "Arquitectura de Software"]
  },
  {
    id: "S3",
    nombre: "Licitaciones Inteligentes con IA",
    precio: "$67.00 USD",
    tag: "EN VIVO · COHORTE 1",
    desc: "Automatización total de propuestas técnicas y económicas. Gana licitaciones con la velocidad de la inteligencia artificial.",
    link: "/inscripcion",
    color: "orange",
    pilares: ["Estandarización de Partidas", "Análisis de EETT Masivo", "Generación Propuesta Econ.", "Estrategia de Ganancia"]
  }
];

const rutas = [
  {
    letra: "A",
    titulo: "Fundamentos Transversales",
    desc: "Indispensables para todo profesional de la construcción.",
    cursos: ["A1: El Despertar Digital", "A2: Escáner Forense", "A3: Prompt Engineering Pro", "A4: Python for Engineers"]
  },
  {
    letra: "B",
    titulo: "Gestión y Control de Proyectos",
    desc: "Optimización de cronogramas y administración contractual.",
    cursos: ["B1: Planificación Agéntica", "B2: Control de Costos (EVM)", "B3: Gestión de Riesgos IA", "B4: Dashboards HTML"]
  },
  {
    letra: "C",
    titulo: "Especialidades de Ingeniería",
    desc: "Herramientas de élite para áreas específicas.",
    cursos: ["C1: Presupuestos IA", "C2: Licitaciones 360", "C3: Auditoría Técnica", "C4: Agentes Autónomos"]
  }
];

export default function Formacion() {
  const [activeTab, setActiveTab] = useState("asinc");

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500/30">
      <div className="fixed inset-0 tech-grid opacity-30 pointer-events-none" />

      <main className="relative z-10 pt-32 pb-32 px-8 max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase">
            SISTEMA DE <br />
            <span className="text-neon">FORMACIÓN</span>
          </h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
            Domina la intersección entre la <span className="text-white font-bold italic">IA de Élite</span> y la Ingeniería de alto rendimiento.
          </p>
        </header>

        {/* Tab Selector */}
        <div className="flex gap-4 mb-16 border-b border-white/5 pb-8">
          <button 
            onClick={() => setActiveTab("asinc")}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${activeTab === 'asinc' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.4)]' : 'bg-white/5 text-slate-500 hover:text-white'}`}
          >
            A tu ritmo (Asincrónico)
          </button>
          <button 
            onClick={() => setActiveTab("sinc")}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${activeTab === 'sinc' ? 'bg-orange-500 text-slate-950 shadow-[0_0_30px_rgba(244,99,15,0.4)]' : 'bg-white/5 text-slate-500 hover:text-white'}`}
          >
            En Vivo (Sincrónico)
          </button>
        </div>

        {activeTab === "asinc" ? (
          <div className="space-y-24">
            {/* Top 3 Courses */}
            <div className="grid lg:grid-cols-3 gap-8">
              {asincronicos.map((curso) => (
                <div key={curso.id} className="glass-panel p-8 rounded-[40px] flex flex-col group border-white/5 hover:border-cyan-500/30 transition-all relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${curso.color}-500/10 blur-[60px]`} />
                  
                  <span className={`text-[10px] font-black tracking-[0.3em] uppercase mb-4 text-${curso.color}-400`}>
                    {curso.tag}
                  </span>
                  <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                    {curso.nombre}
                  </h3>
                  <p className="text-slate-400 font-light mb-8 flex-1 leading-relaxed">
                    {curso.desc}
                  </p>

                  <div className="space-y-3 mb-10">
                    {curso.pilares.map((p, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs text-slate-300">
                        <span className={`material-symbols-outlined text-[16px] text-${curso.color}-500`}>verified</span>
                        {p}
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-white">{curso.precio}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Hotmart Access</span>
                    </div>
                    <Link 
                      href={curso.link} 
                      target="_blank" 
                      className={`px-8 py-4 bg-${curso.color === 'blue' ? 'indigo' : curso.color}-500 text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-110 transition-all shadow-[0_0_20px_rgba(var(--tw-shadow-color),0.4)]`}
                      style={{
                        boxShadow: `0 0 25px ${curso.color === 'cyan' ? '#06b6d4' : curso.color === 'orange' ? '#f97316' : '#6366f1'}66`
                      }}
                    >
                      Comprar
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Ecosystem Plan */}
            <section className="pt-20">
              <div className="text-center mb-16">
                <span className="text-cyan-400 text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Ecosistema 2026</span>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">Plan de Micro-Especialización</h2>
                <p className="text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                  Un ecosistema diseñado para escalar desde los fundamentos transversales hasta la maestría en agentes autónomos.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {rutas.map((ruta) => (
                  <div key={ruta.letra} className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-white mb-6">
                      {ruta.letra}
                    </div>
                    <h3 className="text-xl font-black text-white mb-4 uppercase">{ruta.titulo}</h3>
                    <p className="text-sm text-slate-500 mb-8 font-light">{ruta.desc}</p>
                    <div className="space-y-4">
                      {ruta.cursos.map((c, i) => (
                        <div key={i} className="flex items-center gap-4 text-sm text-slate-400 group">
                          <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-cyan-500 transition-colors" />
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-24">
            <div className="grid lg:grid-cols-3 gap-8">
              {sincronicos.map((curso) => (
                <div key={curso.id} className="glass-panel p-8 rounded-[40px] flex flex-col group border-white/5 hover:border-orange-500/30 transition-all relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${curso.color === 'cyan' ? 'cyan' : curso.color === 'blue' ? 'indigo' : 'orange'}-500/10 blur-[60px]`} />
                  
                  <span className={`text-[10px] font-black tracking-[0.3em] uppercase mb-4 text-${curso.color === 'cyan' ? 'cyan' : curso.color === 'blue' ? 'indigo' : 'orange'}-400`}>
                    {curso.tag}
                  </span>
                  <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                    {curso.nombre}
                  </h3>
                  <p className="text-slate-400 font-light mb-8 flex-1 leading-relaxed">
                    {curso.desc}
                  </p>

                  <div className="space-y-3 mb-10">
                    {curso.pilares.map((p, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs text-slate-300">
                        <span className={`material-symbols-outlined text-[16px] text-${curso.color === 'cyan' ? 'cyan' : curso.color === 'blue' ? 'indigo' : 'orange'}-500`}>verified</span>
                        {p}
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-white">{curso.precio}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Acceso Directo</span>
                    </div>
                    <Link 
                      href={curso.link} 
                      className={`px-8 py-4 bg-${curso.color === 'cyan' ? 'cyan' : curso.color === 'blue' ? 'indigo' : 'orange'}-500 text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-110 transition-all shadow-[0_0_20px_rgba(var(--tw-shadow-color),0.4)]`}
                      style={{
                        boxShadow: `0 0 25px ${curso.color === 'cyan' ? '#06b6d4' : curso.color === 'orange' ? '#f97316' : '#6366f1'}66`
                      }}
                    >
                      Inscribirse
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
