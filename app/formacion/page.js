"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const asincronicos = [
  {
    id: "A1",
    nombre: "El Despertar de la IA en la Gestión de Proyectos",
    precio: "$14.99 USD",
    tag: "CURSO A1 · PUBLICADO",
    desc: "6 entregables reales en 2.5h sin programar. Reportes HTML, Mermaid.js, ATS, IPERC, Organigramas y Matrices CSV generados con IA.",
    link: "https://go.hotmart.com/I104938744G",
    color: "cyan",
    pilares: ["Reportes HTML interactivos", "Flujogramas Mermaid.js", "ATS + IPERC inteligentes", "Cronogramas visuales"]
  },
  {
    id: "A2",
    nombre: "Gestión de Documentos Contractuales en la Gestión de Construcción",
    precio: "$15.99 USD",
    tag: "CURSO A2 · PUBLICADO",
    desc: "Gestión documental masiva para proyectos. Auditoría legal y técnica, extracción de actividades e informes de movilización en minutos.",
    link: "https://pay.hotmart.com/O105604032H",
    color: "orange",
    pilares: ["Auditoría Forense IA", "Plan Logístico (Gemini)", "Checklist de Recursos", "Narrativa Multimedia"]
  },
  {
    id: "C1",
    nombre: "Automatización de Presupuestos con IA",
    precio: "$15.99 USD",
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
    nombre: "Gestión de Construcción con IA (El Despertar Digital)",
    precio: "$75.00 USD",
    precioSoles: "S/. 200",
    tag: "CURSO 1 · BÁSICO",
    desc: "El inicio de la era digital para ingenieros. Domina la Gestión de Alcance, Contratos, Calidad y HSE mediante informes en HTML, flujogramas en Mermaid y documentos en MD/CSV.",
    inicio: "14 de Junio, 2026",
    horario: "Domingos · 10:00 AM – 1:00 PM",
    sesiones: "15h · 5 sesiones",
    link: "/inscripcion",
    hotmart: "https://pay.hotmart.com/K104218834V",
    paypal: "https://paypal.me/ProjectControlAI",
    color: "cyan",
    cerrado: true
  },
  {
    id: "S2",
    nombre: "Automatización de Obras con Agentes de IA (Ingeniería Aumentada)",
    precio: "$97.00 USD",
    precioSoles: "S/. 300",
    tag: "CURSO 2 · AVANZADO",
    desc: "Domina la automatización avanzada con Python, HTML, VBA y Agentes Autónomos. Aprende a desarrollar Skills y Scripts MCP dentro de ecosistemas agénticos.",
    inicio: "28 de Junio, 2026",
    horario: "Domingos · 3:00 PM – 6:00 PM",
    sesiones: "15h · 5 sesiones",
    link: "/inscripcion",
    hotmart: "https://pay.hotmart.com/I104227016S",
    paypal: "https://paypal.me/ProjectControlAI",
    color: "blue"
  },
  {
    id: "S3",
    nombre: "Licitaciones de Construcción con IA (Licitaciones Inteligentes)",
    precio: "$97.00 USD",
    precioSoles: "S/. 300",
    tag: "CURSO 3 · AVANZADO",
    desc: "Nivel Avanzado: Domina MCP, Skills y Scripts Python para automatizar APUs y cronogramas. Análisis masivo de expedientes técnicos de miles de páginas.",
    inicio: "29 de Junio, 2026",
    horario: "Lunes y Miércoles · 7:00 PM – 10:00 PM",
    sesiones: "15h · 5 sesiones",
    link: "/inscripcion",
    hotmart: "https://pay.hotmart.com/N104187999C",
    paypal: "https://paypal.me/ProjectControlAI",
    color: "orange"
  }
];

const rutas = [
  {
    letra: "A",
    titulo: "Fundamentos Transversales",
    desc: "Indispensables para todo profesional de la construcción.",
    cursos: ["A1: El Despertar Digital", "A2: Gestión Contractual", "A3: Prompt Engineering Pro", "A4: Python for Engineers"]
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
                  
                  <div className="flex justify-between items-start mb-6">
                    <span className={`text-[10px] font-black tracking-[0.3em] uppercase text-${curso.color === 'cyan' ? 'cyan' : curso.color === 'blue' ? 'indigo' : 'orange'}-400`}>
                      {curso.tag}
                    </span>
                    {curso.cerrado ? (
                      <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">Agotado</span>
                    ) : (
                      <span className="bg-orange-500 text-slate-950 text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest animate-pulse">En Vivo</span>
                    )}
                  </div>

                  <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                    {curso.nombre}
                  </h3>
                  <p className="text-slate-400 font-light mb-8 flex-1 text-sm leading-relaxed">
                    {curso.desc}
                  </p>

                  <div className="space-y-3 mb-10">
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <span className="material-symbols-outlined text-[16px] text-orange-500">calendar_today</span>
                      <span><strong className="text-white">Inicio:</strong> {curso.inicio}</span>
                    </div>
                    {curso.horario && (
                      <div className="flex items-center gap-3 text-xs text-slate-300">
                        <span className="material-symbols-outlined text-[16px] text-orange-500">schedule</span>
                        <span>{curso.horario}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <span className="material-symbols-outlined text-[16px] text-orange-500">more_time</span>
                      <span>{curso.sesiones}</span>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    {curso.cerrado ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-2xl font-black text-slate-500 line-through">{curso.precio}</span>
                            <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Matrículas Cerradas</span>
                          </div>
                          <button 
                            disabled
                            className="px-6 py-3 bg-red-950/20 border border-red-500/20 text-red-400 rounded-xl font-bold text-[10px] uppercase tracking-widest cursor-not-allowed"
                          >
                            Cupos Agotados
                          </button>
                        </div>
                        <Link 
                          href={`https://wa.me/51993147501?text=Hola,%20deseo%20entrar%20a%20la%20lista%20de%20espera%20para%20el%20curso%20de%20Licitaciones%20Inteligentes.`} 
                          target="_blank"
                          className="flex items-center justify-center gap-2 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">chat</span>
                          Lista de Espera (WhatsApp)
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex flex-col">
                            <span className="text-2xl font-black text-white">{curso.precio}</span>
                            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{curso.precioSoles}</span>
                          </div>
                          <Link 
                            href={curso.link} 
                            className={`px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all`}
                          >
                            Inscribirme
                          </Link>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <Link 
                            href={curso.hotmart} 
                            target="_blank"
                            className="flex items-center justify-center gap-2 py-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-[9px] font-black text-orange-400 uppercase tracking-widest hover:bg-orange-500/20 transition-all"
                          >
                            <span className="material-symbols-outlined text-sm">shopping_cart</span>
                            Hotmart
                          </Link>
                          <Link 
                            href={curso.paypal} 
                            target="_blank"
                            className="flex items-center justify-center gap-2 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-[9px] font-black text-blue-400 uppercase tracking-widest hover:bg-blue-500/20 transition-all"
                          >
                            <span className="material-symbols-outlined text-sm">payments</span>
                            PayPal
                          </Link>
                          <Link 
                            href={`https://wa.me/51993147501?text=Hola,%20quiero%20pagar%20el%20curso%20${curso.nombre}%20por%20Yape/Plin.`} 
                            target="_blank"
                            className="col-span-2 flex items-center justify-center gap-2 py-3 bg-cyan-500 text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                          >
                            <span className="material-symbols-outlined text-sm">qr_code_2</span>
                            Pagar con Yape / Plin
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Payment Methods - Replicating Old Site Organization */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Perú Section */}
              <div className="glass-panel p-10 rounded-[40px] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><span className="material-symbols-outlined text-8xl text-white">account_balance</span></div>
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-3xl">🇵🇪</span>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Pagos en Perú</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Soles y Dólares</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-black">Y/P</div>
                      <div>
                        <p className="font-bold text-white text-sm">Yape / Plin</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Pagos instantáneos</p>
                      </div>
                    </div>
                    <Link href="https://wa.me/51993147501" target="_blank" className="text-[10px] font-black text-cyan-400 border border-cyan-400/30 px-4 py-2 rounded-full hover:bg-cyan-400/10 transition-all">
                      +51 993 147 501
                    </Link>
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 font-black">BCP</div>
                      <div>
                        <p className="font-bold text-white text-sm">Transferencia BCP</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Soles y Dólares</p>
                      </div>
                    </div>
                    <Link href="https://wa.me/51993147501?text=Hola,%20solicito%20número%20de%20cuenta%20BCP" target="_blank" className="text-[10px] font-black text-blue-400 border border-blue-400/30 px-4 py-2 rounded-full hover:bg-blue-400/10 transition-all">
                      Consultar
                    </Link>
                  </div>
                </div>
              </div>

              {/* International Section */}
              <div className="glass-panel p-10 rounded-[40px] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><span className="material-symbols-outlined text-8xl text-white">public</span></div>
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-3xl">🌎</span>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Internacional</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Global Access</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-indigo-500/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-black">PP</div>
                      <div>
                        <p className="font-bold text-white text-sm">PayPal</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Visa / Mastercard</p>
                      </div>
                    </div>
                    <Link href="https://paypal.me/ProjectControlAI" target="_blank" className="text-[10px] font-black text-indigo-400 border border-indigo-400/30 px-4 py-2 rounded-full hover:bg-indigo-400/10 transition-all">
                      Pagar
                    </Link>
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-orange-500/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 font-black">HT</div>
                      <div>
                        <p className="font-bold text-white text-sm">Hotmart</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Checkout Seguro</p>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-600 font-black uppercase tracking-tighter">Links en cursos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
