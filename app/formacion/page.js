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
    link: "https://pay.hotmart.com/I104938744G",
    brochure: "https://go.hotmart.com/I104938744G?dp=1",
    color: "cyan",
    pilares: ["Reportes HTML interactivos", "Flujogramas Mermaid.js", "ATS + IPERC inteligentes", "Cronogramas visuales"]
  },
  {
    id: "A2",
    nombre: "Gestión de Documentos Contractuales en la Gestión de Construcción",
    precio: "$15.99 USD",
    tag: "CURSO A2 · PUBLICADO",
    desc: "Aprovecha las fortalezas de NotebookLM y Gemini para la gestión y control masivo de documentación contractual. Realiza auditorías forenses legales y técnicas, y genera planes e informes en minutos.",
    link: "https://pay.hotmart.com/O105604032H",
    brochure: "https://go.hotmart.com/O105604032H?dp=1",
    color: "orange",
    pilares: ["Análisis masivo con NotebookLM", "Prompts Contractuales para Gemini", "Auditoría Forense Legal-Técnica", "Análisis de Riesgos y Reclamos"]
  },
  {
    id: "B1",
    nombre: "Planificación de Obras con IA: del Presupuesto al Cronograma Nivelado",
    precio: "$15.99 USD",
    tag: "CURSO B1 · PUBLICADO",
    desc: "Transforma un presupuesto de obra en un cronograma nivelado. Analiza APU y recursos, define trenes de trabajo, calcula duraciones y nivela cuadrillas con IA.",
    link: "https://pay.hotmart.com/L106624764I",
    brochure: "https://go.hotmart.com/L106624764I?dp=1",
    color: "orange",
    pilares: ["Análisis de APU y Recursos", "Definición de Trenes de Trabajo", "Cálculo de Productividad", "Nivelación de Cuadrillas con IA"]
  },
  {
    id: "B2",
    nombre: "Automatización de Cronogramas con IA (Antigravity) y MS Project",
    precio: "$9.99 USD",
    tag: "CURSO B2 · PUBLICADO",
    desc: "Transforma presupuestos no estructurados en PDF (Túneles e Hidroeléctricas) en programaciones ejecutables de MS Project con WBS, Diagrama de Gantt y APUs en minutos usando Antigravity AI.",
    link: "https://pay.hotmart.com/O106954282N",
    brochure: "https://go.hotmart.com/O106954282N?dp=1",
    color: "orange",
    pilares: [
      "Configuración de Antigravity IDE en Ingeniería Civil",
      "Generación de código VBA (.bas) sin saber programar",
      "Conversión de presupuestos PDF a JSON estructurado",
      "Casos Reales: Obras de Túneles y Central Hidroeléctrica",
      "Carga masiva de APUs, mano de obra, equipos y materiales"
    ]
  },
  {
    id: "C1",
    nombre: "Automatización de Presupuestos con IA",
    precio: "$15.99 USD",
    tag: "CURSO C1 · ESPECIALIDAD",
    desc: "Ingeniería de Costos Aumentada (Python + Agentes). Reduce el tiempo operativo de licitación en un 90% delegando tareas a la IA.",
    link: "https://pay.hotmart.com/H105703259M",
    brochure: "https://go.hotmart.com/H105703259M?dp=1",
    color: "blue",
    pilares: ["Infraestructura Python", "IA para EETT y WBS", "Visión Artificial Planos", "SkillPro v4: Lógica APU"]
  },
  {
    id: "C2",
    nombre: "Generar EETT con agentes de AI",
    precio: "$15.99 USD",
    tag: "CURSO C2 · PUBLICADO",
    desc: "Aprende a automatizar la elaboración de Especificaciones Técnicas (EETT) de proyectos de construcción mediante NotebookLM, Gemini y agentes de IA, exportando entregables profesionales a Microsoft Word sin errores de formato.",
    link: "https://pay.hotmart.com/D106788121M",
    brochure: "https://go.hotmart.com/D106788121M?dp=1",
    color: "blue",
    pilares: ["NotebookLM como Fuente de Verdad", "Índice Vectorial de Normativa", "Agentes y Skills Personalizadas", "Conversión a Word Profesional"]
  }
];

const sincronicos = [
  {
    id: "S1",
    nombre: "Agentes de IA: Presupuestos, EETT y Cronogramas",
    precio: "$97.00 USD",
    precioSoles: "S/. 300",
    tag: "CURSO 1 · MASTERCLASS",
    desc: "Aprende a automatizar el flujo completo de obra con Agentes Autónomos, SkillsPro y Cerebros Digitales: Presupuestos en Excel con fórmulas vivas, EETT en Word (.docx) y Cronogramas en MS Project vía Macros VBA (.bas).",
    inicio: "Domingo 16 de Agosto, 2026",
    horario: "Todos los domingos · 10:00 AM – 1:00 PM",
    sesiones: "18h · 6 sesiones",
    link: "/inscripcion",
    hotmart: "https://pay.hotmart.com/K104218834V",
    paypal: "https://paypal.me/ProjectControlAI",
    color: "cyan",
    cerrado: false
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
    color: "orange",
    cerrado: true
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
    cursos: ["B1: Planificación Agéntica", "B2: Automatización MS Project", "B3: Control de Costos (EVM)", "B4: Dashboards HTML"]
  },
  {
    letra: "C",
    titulo: "Especialidades de Ingeniería",
    desc: "Herramientas de élite para áreas específicas.",
    cursos: ["C1: Presupuestos IA", "C2: EETT con Agentes", "C3: Auditoría Técnica", "C4: Agentes Autónomos"]
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
          <div className="space-y-16">
            {/* Sección: Cursos Asincrónicos */}
            <div>
              <div className="mb-8">
                <span className="text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase block mb-1">A tu propio ritmo</span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Cursos Asincrónicos</h2>
                <p className="text-slate-400 font-light text-sm max-w-2xl mt-1">
                  Capacitación especializada en IA para ingeniería y construcción con acceso inmediato.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {asincronicos.map((curso) => {
                  const masVendido = [
                    "El Despertar de la IA en la Gestión de Proyectos",
                    "Planificación de Obras con IA: del Presupuesto al Cronograma Nivelado",
                    "Automatización de Presupuestos con IA"
                  ].includes(curso.nombre);

                  // Definición de paletas de color únicas por curso para máxima diferenciación visual
                  const themeMap = {
                    A1: {
                      border: "hover:border-cyan-500/50 border-cyan-500/20",
                      glow: "bg-cyan-500/10",
                      tagText: "text-cyan-400",
                      badgeBg: "from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/40",
                      btnBg: "bg-cyan-500 text-slate-950 hover:bg-cyan-400",
                      btnShadow: "0 0 15px rgba(6, 182, 212, 0.4)",
                      priceGlow: "text-cyan-400"
                    },
                    A2: {
                      border: "hover:border-amber-500/50 border-amber-500/20",
                      glow: "bg-amber-500/10",
                      tagText: "text-amber-400",
                      badgeBg: "from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/40",
                      btnBg: "bg-amber-500 text-slate-950 hover:bg-amber-400",
                      btnShadow: "0 0 15px rgba(245, 158, 11, 0.4)",
                      priceGlow: "text-amber-400"
                    },
                    B1: {
                      border: "hover:border-orange-500/50 border-orange-500/20",
                      glow: "bg-orange-500/10",
                      tagText: "text-orange-400",
                      badgeBg: "from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/40",
                      btnBg: "bg-orange-500 text-slate-950 hover:bg-orange-400",
                      btnShadow: "0 0 15px rgba(249, 115, 22, 0.4)",
                      priceGlow: "text-orange-400"
                    },
                    B2: {
                      border: "hover:border-emerald-500/50 border-emerald-500/20",
                      glow: "bg-emerald-500/10",
                      tagText: "text-emerald-400",
                      badgeBg: "from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40",
                      btnBg: "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
                      btnShadow: "0 0 15px rgba(16, 185, 129, 0.4)",
                      priceGlow: "text-emerald-400"
                    },
                    C1: {
                      border: "hover:border-indigo-500/50 border-indigo-500/20",
                      glow: "bg-indigo-500/10",
                      tagText: "text-indigo-400",
                      badgeBg: "from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/40",
                      btnBg: "bg-indigo-500 text-white hover:bg-indigo-400",
                      btnShadow: "0 0 15px rgba(99, 102, 241, 0.4)",
                      priceGlow: "text-indigo-400"
                    },
                    C2: {
                      border: "hover:border-purple-500/50 border-purple-500/20",
                      glow: "bg-purple-500/10",
                      tagText: "text-purple-400",
                      badgeBg: "from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/40",
                      btnBg: "bg-purple-500 text-white hover:bg-purple-400",
                      btnShadow: "0 0 15px rgba(168, 85, 247, 0.4)",
                      priceGlow: "text-purple-400"
                    }
                  };

                  const theme = themeMap[curso.id] || themeMap.A1;

                  return (
                    <div key={curso.id} className={`glass-panel p-6 rounded-3xl flex flex-col justify-between group transition-all duration-300 relative overflow-hidden bg-slate-900/60 backdrop-blur-xl border ${theme.border}`}>
                      <div className={`absolute top-0 right-0 w-32 h-32 ${theme.glow} blur-[50px] pointer-events-none`} />
                      
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${theme.tagText}`}>
                            {curso.tag}
                          </span>
                          {masVendido && (
                            <span className={`bg-gradient-to-r ${theme.badgeBg} border text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-[0_0_12px_rgba(245,158,11,0.15)]`}>
                              <span className="material-symbols-outlined text-[12px]">local_fire_department</span>
                              MÁS VENDIDO
                            </span>
                          )}
                        </div>

                        <h3 className="text-base md:text-lg font-bold text-slate-100 mb-3 leading-snug tracking-normal group-hover:text-white transition-colors">
                          {curso.nombre}
                        </h3>

                        <p className="text-slate-400 font-normal text-xs mb-5 line-clamp-3 leading-relaxed">
                          {curso.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 mt-2">
                        <div className="flex flex-col">
                          <span className="text-xl font-extrabold text-white tracking-tight">{curso.precio}</span>
                          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Hotmart</span>
                        </div>
                        <div className="flex gap-2">
                          <Link 
                            href={curso.brochure}
                            target="_blank"
                            className="px-3.5 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-semibold text-[10px] uppercase tracking-wider hover:bg-white/15 hover:text-white text-center transition-all"
                          >
                            Temario
                          </Link>
                          <Link 
                            href={curso.link} 
                            target="_blank" 
                            className={`px-4 py-2.5 ${theme.btnBg} rounded-xl font-bold text-[10px] uppercase tracking-wider hover:scale-105 transition-all text-center`}
                            style={{
                              boxShadow: theme.btnShadow
                            }}
                          >
                            Comprar
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ecosystem Plan */}
            <section className="pt-12 border-t border-white/5">
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

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-6 tracking-tight leading-snug">
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
