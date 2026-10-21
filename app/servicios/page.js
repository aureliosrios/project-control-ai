"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { consultoria, contactoConsultoria } from "@/lib/oferta";

const clasesGratuitasYouTube = [
  {
    id: "0nJQXGfkMB4",
    num: "01",
    titulo: "Introducción a Agentes de IA y Entorno de Trabajo",
    desc: "Aprende los fundamentos de operación, configuración de prompts base, estructuración de partidas y primeros flujos agénticos.",
    url: "https://youtu.be/0nJQXGfkMB4"
  },
  {
    id: "8QCOyk6Qm58",
    num: "02",
    titulo: "Agentes de Ingeniería para Proyectos de Construcción",
    desc: "Casos aplicados de agentes en obras: del presupuesto al cronograma ejecutable y entregables técnicos sin la rigidez del software convencional.",
    url: "https://youtu.be/8QCOyk6Qm58"
  }
];

const agentesEspecializados = [
  {
    id: "agente-4d5d",
    nombre: "Agente de Planeamiento de Obra 4D y 5D",
    especialidad: "Planeamiento BIM 4D/5D, Curva S y Visor Web 3D",
    tag: "BIM 4D/5D & THREE.JS",
    estado: "Publicado en YouTube",
    theme: {
      border: "border-cyan-500/40 hover:border-cyan-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-cyan-400 border border-cyan-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "view_in_ar",
    duracionVideo: "14 min",
    tiempoEntrega: "45 segundos",
    problema: "¿Coordinar planos 2D en CAD, cronogramas de cientos de tareas y presupuestos desvinculados sin visualizar la obra en el tiempo?",
    solucion: "Le proporcionas al Agente tus Planos (DWG/DXF), Cronograma (P6/MSP) y Presupuesto, y genera un Visor Web 3D 4D/5D interactivo con semáforo constructivo, Curva S y Lookahead.",
    entregable: "Visor 3D interactivo en HTML/Three.js autocontenido, simulación temporal 4D, panel de costos 5D (EVM), Curva S y Lookahead a 4 semanas.",
    videoId: "weL9yLqdCHY",
    tiktokUrl: "https://vt.tiktok.com/ZSgyYmMFX/",
    whatsappMsg: "Hola Aurelio, vi el video del Agente de Planeamiento de Obra 4D/5D en YouTube y deseo adquirir el agente para mis proyectos."
  },
  {
    id: "agente-s10",
    nombre: "Agente de Presupuestos & APU Tipo S10",
    especialidad: "Costos y Presupuestos",
    tag: "COSTOS & S10",
    estado: "Próximamente",
    theme: {
      border: "border-slate-800 hover:border-slate-700",
      bg: "bg-slate-900/50",
      badge: "bg-slate-800 text-slate-300 border border-slate-700 font-bold",
      pill: "bg-slate-800/80 text-slate-400 border border-slate-700/60",
      btn: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
    },
    icono: "calculate",
    duracionVideo: "12 min",
    tiempoEntrega: "15 segundos",
    problema: "¿Pasas horas calculando rendimientos, cuadrillas y transcribiendo precios en hojas de cálculo propensas a errores?",
    solucion: "Genera el desglose paramétrico de partidas, análisis de precios unitarios (APU) tipo S10, cálculo de HH/HM y costo directo con fórmulas vivas.",
    entregable: "Plantilla Excel con fórmulas nativas vivas, cálculo de cuadrillas, mano de obra y lista de insumos tipo S10.",
    videoId: "dVZNMhvNSsw",
    whatsappMsg: "Hola Aurelio, deseo entrar a la lista de espera para el Agente de Presupuestos y APU Tipo S10."
  },
  {
    id: "agente-msproject",
    nombre: "Agente Programador Gantt & VBA (MS Project)",
    especialidad: "Planeamiento y Programación",
    tag: "MS PROJECT & VBA",
    estado: "Próximamente",
    theme: {
      border: "border-slate-800 hover:border-slate-700",
      bg: "bg-slate-900/50",
      badge: "bg-slate-800 text-slate-300 border border-slate-700 font-bold",
      pill: "bg-slate-800/80 text-slate-400 border border-slate-700/60",
      btn: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
    },
    icono: "calendar_month",
    duracionVideo: "15 min",
    tiempoEntrega: "20 segundos",
    problema: "¿Vincular cientos de tareas una por una, ajustar calendarios y nivelar recursos a mano en MS Project te toma días?",
    solucion: "Convierte cualquier WBS o presupuesto en un cronograma estructurado con ruta crítica CPM, hitos y duraciones calculadas con macros VBA.",
    entregable: "Script VBA (.bas) listo para importar directamente a MS Project, generando el cronograma y diagrama de Gantt sin errores.",
    videoId: "NjWnA5b9Zho",
    whatsappMsg: "Hola Aurelio, deseo entrar a la lista de espera para el Agente Programador Gantt con macros VBA para MS Project."
  },
  {
    id: "agente-p6",
    nombre: "Agente Primavera P6 (.XER / PLF)",
    especialidad: "Control Maestro y Forense",
    tag: "PRIMAVERA P6",
    estado: "Próximamente",
    theme: {
      border: "border-slate-800 hover:border-slate-700",
      bg: "bg-slate-900/50",
      badge: "bg-slate-800 text-slate-300 border border-slate-700 font-bold",
      pill: "bg-slate-800/80 text-slate-400 border border-slate-700/60",
      btn: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
    },
    icono: "reorder",
    duracionVideo: "14 min",
    tiempoEntrega: "30 segundos",
    problema: "¿Archivos .XER con errores de importación (%T PROJECT), descuadres en calendarios o curvas de valor ganado inconsistentes?",
    solucion: "Genera y sanea archivos nativos de Oracle Primavera P6 (.xer) y plantillas de diseño visual (.plf) con curvas S y Valor Ganado (EVM).",
    entregable: "Archivo .XER compatible y limpio, con Curva S (PV/EV), asignación de recursos y diseño de seguimiento de barras Gantt.",
    videoId: "vABYYEA46yc",
    whatsappMsg: "Hola Aurelio, deseo entrar a la lista de espera para el Agente Primavera P6 (.XER)."
  },
  {
    id: "agente-contratos",
    nombre: "Agente Auditor Contractual & Cerebro Digital",
    especialidad: "Oficina Técnica y Contractual",
    tag: "CONTRATOS & AUDITORÍA",
    estado: "Próximamente",
    theme: {
      border: "border-slate-800 hover:border-slate-700",
      bg: "bg-slate-900/50",
      badge: "bg-slate-800 text-slate-300 border border-slate-700 font-bold",
      pill: "bg-slate-800/80 text-slate-400 border border-slate-700/60",
      btn: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
    },
    icono: "gavel",
    duracionVideo: "10 min",
    tiempoEntrega: "25 segundos",
    problema: "¿Expedientes y contratos de más de 500 páginas donde se pierden penalidades, plazos de ampliación y obligaciones críticas?",
    solucion: "Pipeline OCR y análisis semántico para extraer automáticamente matrices de riesgos, penalidades diarias y causales de ampliación.",
    entregable: "Matriz ejecutiva de control contractual en Excel (dashboard A3) y grafo de conocimiento conectado en Obsidian.",
    videoId: "0nJQXGfkMB4",
    whatsappMsg: "Hola Aurelio, deseo entrar a la lista de espera para el Agente Auditor Contractual y Cerebro Digital."
  },
  {
    id: "agente-lps",
    nombre: "Agente Lookahead & Last Planner System",
    especialidad: "Control Semanal y Producción",
    tag: "LAST PLANNER SYSTEM",
    estado: "Próximamente",
    theme: {
      border: "border-slate-800 hover:border-slate-700",
      bg: "bg-slate-900/50",
      badge: "bg-slate-800 text-slate-300 border border-slate-700 font-bold",
      pill: "bg-slate-800/80 text-slate-400 border border-slate-700/60",
      btn: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
    },
    icono: "fact_check",
    duracionVideo: "11 min",
    tiempoEntrega: "15 segundos",
    problema: "¿Reuniones de producción caóticas, restricciones no identificadas a tiempo y cálculo manual del PPC cada semana?",
    solucion: "Estructura el Lookahead a 6 semanas con arquitectura de 3 filas (Línea Base LB-0, Reprogramado y Real Campo), Plan Semanal WWP y restricciones.",
    entregable: "Matriz viva de restricciones en Excel con semaforización automática, causas de no cumplimiento (CNC) y cálculo PPC.",
    videoId: "dVZNMhvNSsw",
    whatsappMsg: "Hola Aurelio, deseo entrar a la lista de espera para el Agente Lookahead & Last Planner System."
  },
  {
    id: "agente-eett",
    nombre: "Agente Redactor de EETT a Word",
    especialidad: "Especificaciones Técnicas",
    tag: "EETT & WORD",
    estado: "Próximamente",
    theme: {
      border: "border-slate-800 hover:border-slate-700",
      bg: "bg-slate-900/50",
      badge: "bg-slate-800 text-slate-300 border border-slate-700 font-bold",
      pill: "bg-slate-800/80 text-slate-400 border border-slate-700/60",
      btn: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
    },
    icono: "description",
    duracionVideo: "10 min",
    tiempoEntrega: "20 segundos",
    problema: "¿Copiar y pegar especificaciones desactualizadas con normas derogadas y unidades de medida incongruentes?",
    solucion: "Redacta especificaciones técnicas completas y normadas por partida (descripción, materiales, método de ejecución, controles, medición y pago).",
    entregable: "Documento oficial listo para entregar en Microsoft Word (.docx) con índice automático, estilos institucionales y normativa técnica vigente.",
    videoId: "NjWnA5b9Zho",
    whatsappMsg: "Hola Aurelio, deseo entrar a la lista de espera para el Agente Redactor de EETT a Word."
  }
];

const temasConsultoria = [
  ["Planeamiento y cronogramas", "Revisa o elabora secuencias, ruta crítica, recursos y seguimiento de obra en MS Project o Primavera P6."],
  ["Presupuestos y costos", "Trabaja o estructura tus APUs, análisis de recursos, costos indirectos y control de presupuesto."],
  ["Especificaciones técnicas", "Elabora, organiza y revisa tus EETT, fuentes técnicas y coherencia con el expediente."],
  ["Automatización en cotizaciones", "Acelera y estandariza plantillas, matrices de cotización comercial y flujos ágiles con IA."],
  ["Reportabilidad, control y seguimiento", "Diseña dashboards, curvas S, reportes ejecutivos y seguimiento de avance físico y financiero."],
  ["Cerebro digital y agentes IA", "Estructura documentos y conocimiento de tu proyecto para encontrar información al instante y simplificar tareas."],
];

export default function ServiciosPage() {
  const [activeTab, setActiveTab] = useState("agentes");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      const hash = window.location.hash.toLowerCase().replace("#", "");
      if (tabParam === "consultoria" || hash.includes("consultoria")) {
        setActiveTab("consultoria");
      } else if (tabParam === "agentes" || hash.includes("agente")) {
        setActiveTab("agentes");
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500/30">
      <div className="fixed inset-0 tech-grid opacity-30 pointer-events-none" />

      <main className="relative z-10 pt-32 pb-32 px-6 md:px-8 max-w-7xl mx-auto">
        {/* Header de Servicios de Ingeniería */}
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Project Control AI · Servicios de Ingeniería
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 uppercase leading-none">
            SERVICIOS DE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              INGENIERÍA
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-300 font-normal max-w-3xl leading-relaxed mb-8">
            El software convencional es rígido. Proporcionamos <strong>Soluciones Agénticas de IA</strong> que generan entregables técnicos en segundos y <strong>Consultoría Especializada en Obra</strong> para resolver los retos críticos de tus proyectos.
          </p>

          {/* Selector de Pestañas de Servicios */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 border-b border-white/10 pb-6">
            <button
              type="button"
              onClick={() => setActiveTab("agentes")}
              className={`px-6 md:px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2.5 ${
                activeTab === "agentes"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.45)] ring-2 ring-emerald-400/50"
                  : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-emerald-500/20"
              }`}
            >
              <span className="material-symbols-outlined text-base">smart_toy</span>
              <span>⚡ Soluciones Agénticas (IA)</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Entregables en Segundos
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("consultoria")}
              className={`px-6 md:px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2.5 ${
                activeTab === "consultoria"
                  ? "bg-amber-500 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.45)] ring-2 ring-amber-400/50"
                  : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-amber-500/20"
              }`}
            >
              <span className="material-symbols-outlined text-base">engineering</span>
              <span>Consultoría y Asesoría Técnica</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider bg-amber-950 text-amber-300 border border-amber-500/30">
                15 min gratis
              </span>
            </button>
          </div>
        </header>

        {/* 1. CONTENIDO: SOLUCIONES AGÉNTICAS */}
        {activeTab === "agentes" && (
          <div id="agentes" className="space-y-16 animate-in fade-in duration-300">
            {/* Manifiesto Agéntico */}
            <section className="p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-slate-900 via-[#0a1320] to-[#020617] border-2 border-slate-700/60 relative overflow-hidden shadow-[0_0_50px_rgba(30,41,59,0.3)]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[90px] pointer-events-none" />
              <div className="relative z-10 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  La Era de los Agentes de Ingeniería
                </div>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.08] mb-6">
                  ¿No tienes tiempo para llevar <span className="text-cyan-400">8 horas de cursos</span> para aprender una especialidad?
                </h2>

                <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed mb-6">
                  Hay que entender que hoy en día los softwares tradicionales de ingeniería son demasiado rígidos y lentos. <strong className="text-white font-bold">Acá te damos la solución agéntica:</strong> agentes autónomos de IA que te dan la libertad de tener un entregable profesional en segundos. Solo mira un video de 10 a 15 minutos y estarás listo para aplicar los diversos agentes a tus proyectos reales de obra.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold mb-3">
                      <span className="material-symbols-outlined text-[22px]">timer</span>
                    </div>
                    <p className="text-xs font-black text-white uppercase tracking-wider">Video de 10 a 15 min</p>
                    <p className="text-[11px] text-slate-400 mt-1">Directo a la aplicación práctica, sin rodeos teóricos.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-3">
                      <span className="material-symbols-outlined text-[22px]">bolt</span>
                    </div>
                    <p className="text-xs font-black text-white uppercase tracking-wider">Entregable en Segundos</p>
                    <p className="text-[11px] text-slate-400 mt-1">Visor 3D 4D/5D, APUs en Excel, macros VBA en MS Project y .XER en P6.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold mb-3">
                      <span className="material-symbols-outlined text-[22px]">tune</span>
                    </div>
                    <p className="text-xs font-black text-white uppercase tracking-wider">Flexibilidad Total</p>
                    <p className="text-[11px] text-slate-400 mt-1">El software tradicional es rígido; la IA se adapta a tus proyectos.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Clases Gratuitas en YouTube */}
            <section className="p-8 md:p-10 rounded-[32px] bg-slate-900/60 border border-slate-800">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-red-500 text-xl">smart_display</span>
                    <span className="text-xs font-black text-red-400 tracking-[0.25em] uppercase">Fundamentos Abiertos en YouTube</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                    ¿Primera vez con Agentes de Ingeniería?
                  </h3>
                  <p className="text-slate-300 text-sm max-w-2xl mt-1">
                    Mira estas dos clases gratuitas en nuestro canal de YouTube para entender cómo operan los agentes de IA en obras reales:
                  </p>
                </div>
                <Link
                  href="https://www.youtube.com/@aurelioalfonsosolorzanorios"
                  target="_blank"
                  className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.3)] shrink-0"
                >
                  <span className="material-symbols-outlined text-base">subscriptions</span>
                  Canal de YouTube
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {clasesGratuitasYouTube.map((clase) => (
                  <div key={clase.id} className="p-6 rounded-2xl bg-black/40 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest block mb-2">
                        CLASE {clase.num} · 100% GRATUITA
                      </span>
                      <h4 className="text-lg font-bold text-white mb-2 leading-snug">{clase.titulo}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{clase.desc}</p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-800">
                      <Link
                        href={clase.url}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-xs font-black text-red-400 hover:text-red-300 uppercase tracking-wider transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">play_circle</span>
                        Ver Clase en YouTube
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Catálogo Maestro de Agentes */}
            <div>
              <div className="mb-8">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                  Catálogo Oficial de Agentes de Ingeniería
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  Elige tu Agente de IA para Obra
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                  Iremos publicando los agentes uno a uno en YouTube. Mira la guía técnica, revisa el resultado final en TikTok y comunícate con nosotros para adquirir el agente.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agentesEspecializados.map((agente) => (
                  <div
                    key={agente.id}
                    className={`p-6 sm:p-7 rounded-3xl border-2 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden backdrop-blur-sm ${
                      agente.estado === "Publicado en YouTube"
                        ? "border-cyan-500/50 bg-slate-900/70 hover:border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.15)]"
                        : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          {agente.estado === "Publicado en YouTube" ? (
                            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-500/40 flex items-center gap-1 shadow-[0_0_10px_rgba(239,68,68,0.25)]">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                              Disponible en YouTube
                            </span>
                          ) : (
                            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              Próximamente
                            </span>
                          )}
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {agente.tag}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
                          <span className="material-symbols-outlined text-[13px] text-slate-400">schedule</span>
                          {agente.duracionVideo}
                        </div>
                      </div>

                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                          agente.estado === "Publicado en YouTube"
                            ? "bg-cyan-950/60 border-cyan-500/50 text-cyan-300"
                            : "bg-slate-800 border-slate-700 text-slate-300"
                        }`}>
                          <span className="material-symbols-outlined text-[22px]">{agente.icono}</span>
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold group-hover:text-cyan-300 transition-colors leading-snug ${
                            agente.estado === "Publicado en YouTube" ? "text-white" : "text-slate-200"
                          }`}>
                            {agente.nombre}
                          </h3>
                          <p className="text-[11px] text-slate-400 font-medium">{agente.especialidad}</p>
                        </div>
                      </div>

                      <div className="space-y-3 my-4 text-xs">
                        <div className="p-3 rounded-xl bg-black/40 border border-slate-800/80">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">El Reto Habitual:</span>
                          <p className="text-slate-300 leading-relaxed text-[11px]">{agente.problema}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800/80">
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">Solución Agéntica:</span>
                          <p className="text-slate-300 leading-relaxed text-[11px]">{agente.solucion}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-wider">Entregable en Segundos:</span>
                            <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                              ⚡ {agente.tiempoEntrega}
                            </span>
                          </div>
                          <p className="text-slate-200 text-[11px] font-medium leading-relaxed">{agente.entregable}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 space-y-2">
                      <button
                        type="button"
                        onClick={() => setSelectedVideo(agente)}
                        className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                          agente.estado === "Publicado en YouTube"
                            ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] border border-red-500/50"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                        }`}
                      >
                        <span className="material-symbols-outlined text-base text-white">play_circle</span>
                        {agente.estado === "Publicado en YouTube" ? "Ver Guía en YouTube (14 min)" : "Ver Avance en YouTube"}
                      </button>

                      {agente.tiktokUrl && (
                        <Link
                          href={agente.tiktokUrl}
                          target="_blank"
                          className="w-full py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 bg-black/80 hover:bg-black text-white border border-pink-500/30 hover:border-pink-500/60 shadow-[0_0_12px_rgba(236,72,153,0.15)] group/tiktok"
                        >
                          <svg className="w-4 h-4 fill-current text-cyan-400 group-hover/tiktok:text-pink-400 transition-colors" viewBox="0 0 24 24">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                          </svg>
                          <span>Ver Resultado Final (TikTok)</span>
                        </Link>
                      )}

                      <Link
                        href={`https://wa.me/51993147501?text=${encodeURIComponent(agente.whatsappMsg)}`}
                        target="_blank"
                        className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 ${
                          agente.estado === "Publicado en YouTube"
                            ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-400/40"
                            : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">
                          {agente.estado === "Publicado en YouTube" ? "chat" : "notifications_active"}
                        </span>
                        {agente.estado === "Publicado en YouTube" ? "Quiero el Agente (+51 993 147 501)" : "Lista de Espera (WhatsApp)"}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. CONTENIDO: CONSULTORÍA Y ASESORÍA TÉCNICA */}
        {activeTab === "consultoria" && (
          <div id="consultoria" className="space-y-16 animate-in fade-in duration-300">
            {/* Modalidades de Trabajo */}
            <section>
              <div className="mb-8">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  Modalidades Flexibles
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  ¿Cómo Trabajamos Juntos?
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Modalidad 1: Gratuita */}
                <article className="rounded-3xl border border-slate-700 bg-slate-900 p-7 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Orientación inicial</span>
                    <h4 className="text-2xl font-bold mt-2 text-white">Reunión inicial gratuita</h4>
                    <p className="text-3xl sm:text-4xl font-bold mt-4 text-cyan-300">
                      S/ 0 <span className="text-lg font-normal text-slate-400">/ $0 USD</span>
                      <span className="text-xs font-normal text-slate-300 block mt-1">/ {consultoria.minutosGratis} minutos</span>
                    </p>
                    <ul className="mt-6 space-y-2.5 text-slate-300 text-xs sm:text-sm list-disc pl-5">
                      <li>Nos cuentas el reto y el contexto de tu proyecto.</li>
                      <li>Evaluamos cómo podemos ayudarte técnica y operativamente.</li>
                      <li>Definimos la modalidad más adecuada: consultoría o servicio por proyecto.</li>
                    </ul>
                  </div>
                  <a
                    href={contactoConsultoria("gratuita")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 block text-center rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-950 px-5 py-3.5 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Coordinar reunión gratuita (15 min)
                  </a>
                </article>

                {/* Modalidad 2: Por Hora */}
                <article className="rounded-3xl border-2 border-cyan-500/60 bg-cyan-950/30 p-7 sm:p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                  <div>
                    <span className="inline-block bg-cyan-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
                      Sesión técnica 1 a 1
                    </span>
                    <h4 className="text-2xl font-bold text-white">Consultoría por hora</h4>
                    <p className="text-3xl sm:text-4xl font-bold mt-4 text-cyan-300">
                      S/ 100 <span className="text-lg font-normal text-slate-300">o</span> $35 USD
                      <span className="text-xs font-normal text-slate-300 block mt-1">/ hora de asesoría directa</span>
                    </p>
                    <ul className="mt-6 space-y-2.5 text-slate-300 text-xs sm:text-sm list-disc pl-5">
                      <li>Sesión por videollamada para revisar tu caso puntual.</li>
                      <li>Destrabe de cronogramas, APUs, reclamos o automatizaciones con IA.</li>
                      <li>Se comparte pantalla y se trabaja sobre tus propios archivos.</li>
                    </ul>
                  </div>
                  <a
                    href={contactoConsultoria("hora-soles")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 block text-center rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 px-5 py-3.5 font-black text-xs uppercase tracking-wider transition-colors shadow-lg"
                  >
                    Agendar consultoría por hora
                  </a>
                </article>

                {/* Modalidad 3: Por Proyecto */}
                <article className="rounded-3xl border border-indigo-500/40 bg-indigo-950/20 p-7 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">Entregables a medida</span>
                    <h4 className="text-2xl font-bold mt-2 text-white">Servicio por proyecto</h4>
                    <p className="text-3xl sm:text-4xl font-bold mt-4 text-indigo-300">
                      A cotizar <span className="text-xs font-normal text-slate-300 block mt-1">según alcance del expediente</span>
                    </p>
                    <ul className="mt-6 space-y-2.5 text-slate-300 text-xs sm:text-sm list-disc pl-5">
                      <li>Elaboración de cronogramas maestros (Primavera P6 o MS Project).</li>
                      <li>Elaboración integral de presupuestos, metrados y APUs.</li>
                      <li>Auditoría contractual, peritaje de plazos y reclamos.</li>
                    </ul>
                  </div>
                  <a
                    href={contactoConsultoria("cotizacion")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 block text-center rounded-xl border border-indigo-400 text-indigo-300 hover:bg-indigo-950 px-5 py-3.5 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Cotizar servicio técnico
                  </a>
                </article>
              </div>
            </section>

            {/* Áreas de Consultoría */}
            <section className="border-t border-slate-800 pt-12">
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-8">
                ¿Qué podemos resolver juntos?
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {temasConsultoria.map(([titulo, descripcion], i) => (
                  <article key={titulo} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <p className="font-mono text-cyan-400 text-xs font-bold mb-2">0{i + 1}</p>
                    <h4 className="text-lg font-bold text-white mb-2">{titulo}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{descripcion}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Modal de Video Demostrativo */}
        {selectedVideo && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-slate-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-500 text-2xl">play_circle</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{selectedVideo.nombre}</h3>
                    <p className="text-xs text-slate-400">Demostración práctica · Duración estimada: {selectedVideo.duracionVideo}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Cerrar video"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                  title={selectedVideo.nombre}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-4 sm:p-6 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  <span className="text-emerald-400 font-bold block mb-0.5">⚡ Entregable en segundos:</span>
                  {selectedVideo.entregable}
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {selectedVideo.tiktokUrl && (
                    <Link
                      href={selectedVideo.tiktokUrl}
                      target="_blank"
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border border-pink-500/40"
                    >
                      <svg className="w-3.5 h-3.5 fill-current text-cyan-400" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                      </svg>
                      Demo en TikTok
                    </Link>
                  )}
                  <Link
                    href={`https://wa.me/51993147501?text=${encodeURIComponent(selectedVideo.whatsappMsg)}`}
                    target="_blank"
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Quiero el Agente
                  </Link>
                  <Link
                    href="https://www.youtube.com/@aurelioalfonsosolorzanorios"
                    target="_blank"
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm text-red-500">subscriptions</span>
                    Canal de YouTube
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
