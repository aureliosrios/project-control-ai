"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
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
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente de Planeamiento de Obra 4D y 5D (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-s10",
    nombre: "Agente de Presupuestos & APU Tipo S10",
    especialidad: "Costos, Presupuestos y Fórmulas Polinómicas con IA",
    tag: "COSTOS & S10",
    estado: "Publicado en YouTube",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-emerald-500/40 hover:border-emerald-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-emerald-400 border border-emerald-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "calculate",
    duracionVideo: "15 min",
    tiempoEntrega: "15 segundos",
    problema: "¿Pasas horas calculando rendimientos, cuadrillas y transcribiendo precios en hojas de cálculo propensas a errores y alucinaciones de LLMs?",
    solucion: "Ingesta determinista de expedientes (PDF/Excel), construcción de Cerebro Digital con Grafo de 1,486 nodos, evaluación de 10 compuertas (G1-G10) y fórmula polinómica conforme al D.S. 011-79-VC.",
    entregable: "Carpeta autocontenida con libro Excel S10 de fórmulas vivas (openpyxl), budget_result.json, Wiki técnica navegable, grafo integrado y verificación matemática SHA-256.",
    videoId: "NoaHRpYAzMc",
    tiktokUrl: "https://vt.tiktok.com/ZSg5CFDGH/",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente de Presupuestos & APU Tipo S10 (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-msproject",
    nombre: "Agente Programador Gantt & VBA (MS Project)",
    especialidad: "Planeamiento y Programación",
    tag: "MS PROJECT & VBA",
    estado: "Próximamente",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
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
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir / reservar el Agente Programador Gantt & VBA (MS Project) (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-p6",
    nombre: "Agente Primavera P6 (.XER / PLF)",
    especialidad: "Control Maestro y Forense",
    tag: "PRIMAVERA P6",
    estado: "Próximamente",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
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
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir / reservar el Agente Primavera P6 (.XER) (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-contratos",
    nombre: "Agente Auditor Contractual & Cerebro Digital",
    especialidad: "Oficina Técnica y Contractual",
    tag: "CONTRATOS & AUDITORÍA",
    estado: "Próximamente",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
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
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir / reservar el Agente Auditor Contractual & Cerebro Digital (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-lps",
    nombre: "Agente Lookahead & Last Planner System",
    especialidad: "Control Semanal y Producción",
    tag: "LAST PLANNER SYSTEM",
    estado: "Próximamente",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
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
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir / reservar el Agente Lookahead & Last Planner System (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-eett",
    nombre: "Agente Redactor de EETT a Word",
    especialidad: "Especificaciones Técnicas",
    tag: "EETT & WORD",
    estado: "Próximamente",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
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
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir / reservar el Agente Redactor de EETT a Word (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
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

function ServiciosContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("agentes");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [expandedAgents, setExpandedAgents] = useState({ "agente-4d5d": true, "agente-s10": true });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos"); // "todos" | "disponibles" | "proximos"

  const toggleAgent = (id) => {
    setExpandedAgents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all = {};
    agentesEspecializados.forEach((a) => {
      all[a.id] = true;
    });
    setExpandedAgents(all);
  };

  const collapseAll = () => {
    setExpandedAgents({});
  };

  const filteredAgentes = agentesEspecializados.filter((agente) => {
    if (statusFilter === "disponibles" && agente.estado !== "Publicado en YouTube") {
      return false;
    }
    if (statusFilter === "proximos" && agente.estado === "Publicado en YouTube") {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      agente.nombre.toLowerCase().includes(q) ||
      agente.especialidad.toLowerCase().includes(q) ||
      agente.tag.toLowerCase().includes(q) ||
      agente.problema.toLowerCase().includes(q) ||
      agente.solucion.toLowerCase().includes(q) ||
      agente.entregable.toLowerCase().includes(q)
    );
  });

  const countDisponibles = agentesEspecializados.filter((a) => a.estado === "Publicado en YouTube").length;
  const countProximos = agentesEspecializados.filter((a) => a.estado !== "Publicado en YouTube").length;

  const changeTab = (tab, hashTarget = null) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      if (hashTarget) {
        url.hash = hashTarget;
      }
      window.history.replaceState(null, "", url.toString());
      if (hashTarget) {
        setTimeout(() => {
          const el = document.getElementById(hashTarget);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tabParam = searchParams?.get("tab") || new URLSearchParams(window.location.search).get("tab");
      const hash = window.location.hash.toLowerCase().replace("#", "");
      if (tabParam === "consultoria" || hash.includes("consultoria")) {
        setActiveTab("consultoria");
      } else if (tabParam === "agentes" || hash.includes("agente")) {
        setActiveTab("agentes");
      }

      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }

      const handleCustomEvent = (e) => {
        if (e.detail?.tab) {
          setActiveTab(e.detail.tab);
        }
        if (e.detail?.hashTarget) {
          setTimeout(() => {
            const el = document.getElementById(e.detail.hashTarget);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 120);
        }
      };

      const handlePopState = () => {
        const p = new URLSearchParams(window.location.search).get("tab");
        const h = window.location.hash.toLowerCase().replace("#", "");
        if (p === "consultoria" || h.includes("consultoria")) setActiveTab("consultoria");
        else if (p === "agentes" || h.includes("agente")) setActiveTab("agentes");
      };

      window.addEventListener("pcai-servicios-tab", handleCustomEvent);
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("hashchange", handlePopState);
      return () => {
        window.removeEventListener("pcai-servicios-tab", handleCustomEvent);
        window.removeEventListener("popstate", handlePopState);
        window.removeEventListener("hashchange", handlePopState);
      };
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#14161a] text-slate-100 selection:bg-cyan-500/30">
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
          <div id="catalogo-servicios" className="scroll-mt-32 flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 border-b border-white/10 pb-6">
            <button
              type="button"
              aria-pressed={activeTab === "agentes"}
              onClick={() => changeTab("agentes")}
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
              aria-pressed={activeTab === "consultoria"}
              onClick={() => changeTab("consultoria")}
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

          {/* Indicador Visual y Rápido de la Sección Seleccionada */}
          <div className="mb-10 p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${activeTab === "agentes" ? "bg-emerald-400 animate-pulse" : "bg-amber-400 animate-pulse"}`} />
              <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                Viendo ahora:{" "}
                <strong className={activeTab === "agentes" ? "text-emerald-400" : "text-amber-400"}>
                  {activeTab === "agentes" ? "⚡ Soluciones Agénticas de IA (Entregables Técnicos en Segundos)" : "🛠️ Consultoría Especializada en Obra (15 min gratis, por hora y proyectos)"}
                </strong>
              </span>
            </div>

            <button
              type="button"
              onClick={() => changeTab(activeTab === "agentes" ? "consultoria" : "agentes")}
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1 self-start sm:self-auto group"
            >
              <span>Cambiar a {activeTab === "agentes" ? "Consultoría y Asesoría Técnica" : "Soluciones Agénticas de IA"}</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
            </button>
          </div>
        </header>

        {/* 1. CONTENIDO: SOLUCIONES AGÉNTICAS */}
        {activeTab === "agentes" && (
          <div id="agentes" className="space-y-16 animate-in fade-in duration-300">
            {/* Manifiesto Agéntico */}
            <section className="p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-slate-900 via-[#181b1f] to-[#14161a] border-2 border-slate-700/60 relative overflow-hidden shadow-[0_0_50px_rgba(30,41,59,0.3)]">
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

            {/* Catálogo Maestro de Agentes (Comprimible, Desplegable y con Buscador) */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                    Catálogo Oficial de Agentes de Ingeniería
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                    Elige tu Agente de IA para Obra
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                    Sección comprimible y desplegable: abre cualquier agente para ver su reto, solución, entregable y medios de pago.
                  </p>
                </div>

                {/* Acciones de Expandir / Colapsar todos */}
                <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={expandAll}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                    title="Expandir todos los agentes"
                  >
                    <span className="material-symbols-outlined text-base">unfold_more</span>
                    <span>Expandir todos</span>
                  </button>

                  <button
                    type="button"
                    onClick={collapseAll}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                    title="Colapsar todos los agentes"
                  >
                    <span className="material-symbols-outlined text-base">unfold_less</span>
                    <span>Colapsar todos</span>
                  </button>
                </div>
              </div>

              {/* Barra de Búsqueda y Filtros Rápidos */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Input de Búsqueda */}
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar agente (ej. 4D, S10, presupuestos, MS Project, Primavera P6, contratos...)"
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-sm"
                      aria-label="Limpiar búsqueda"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  )}
                </div>

                {/* Filtros de Estado */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 shrink-0">
                  <button
                    type="button"
                    onClick={() => setStatusFilter("todos")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      statusFilter === "todos"
                        ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(245,168,0,0.3)] font-black"
                        : "bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    Todos ({agentesEspecializados.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatusFilter("disponibles")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      statusFilter === "disponibles"
                        ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] font-black"
                        : "bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    Disponibles ({countDisponibles})
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatusFilter("proximos")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      statusFilter === "proximos"
                        ? "bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)] font-black"
                        : "bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Próximamente ({countProximos})
                  </button>
                </div>
              </div>

              {/* Lista Desplegable / Acordeón de Agentes */}
              {filteredAgentes.length === 0 ? (
                <div className="p-10 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
                  <span className="material-symbols-outlined text-slate-500 text-4xl">search_off</span>
                  <h4 className="text-lg font-bold text-white">No se encontraron agentes</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    No encontramos ningún agente que coincida con &quot;{searchQuery}&quot;. ¿Necesitas un agente a la medida de tu proyecto?
                  </p>
                  <Link
                    href="https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20estoy%20buscando%20un%20agente%20especializado%20para%20mi%20proyecto."
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Solicitar Agente Personalizado
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAgentes.map((agente) => {
                    const isExpanded = !!expandedAgents[agente.id];

                    return (
                      <div
                        key={agente.id}
                        className={`rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm overflow-hidden ${
                          isExpanded
                            ? agente.estado === "Publicado en YouTube"
                              ? "border-cyan-500/60 bg-slate-900/90 shadow-[0_0_30px_rgba(245,168,0,0.18)] ring-1 ring-cyan-500/30"
                              : "border-slate-700 bg-slate-900/90 shadow-lg"
                            : agente.estado === "Publicado en YouTube"
                            ? "border-cyan-500/40 bg-slate-900/60 hover:border-cyan-400/70 hover:bg-slate-900/80"
                            : "border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60"
                        }`}
                      >
                        {/* Cabecera Comprimible (Siempre Visible y Clickeable) */}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleAgent(agente.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggleAgent(agente.id);
                            }
                          }}
                          className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none transition-colors group"
                        >
                          {/* Izquierda: Ícono, Título, Tag y Especialidad */}
                          <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                              agente.estado === "Publicado en YouTube"
                                ? "bg-cyan-950/80 border-cyan-500/50 text-cyan-300"
                                : "bg-slate-800 border-slate-700 text-slate-300"
                            }`}>
                              <span className="material-symbols-outlined text-2xl">{agente.icono}</span>
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                <h3 className={`text-base sm:text-lg font-black leading-tight transition-colors ${
                                  agente.estado === "Publicado en YouTube"
                                    ? "text-white group-hover:text-cyan-300"
                                    : "text-slate-200 group-hover:text-white"
                                }`}>
                                  {agente.nombre}
                                </h3>
                                <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                  {agente.tag}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 truncate">{agente.especialidad}</p>
                            </div>
                          </div>

                          {/* Derecha: Badges, Inversión, Tiempo y Botón Expandir */}
                          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/80">
                            <div className="flex items-center gap-2 flex-wrap">
                              {agente.estado === "Publicado en YouTube" ? (
                                <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-red-950 text-red-300 border border-red-500/40 flex items-center gap-1 shadow-[0_0_10px_rgba(239,68,68,0.25)]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                  Disponible
                                </span>
                              ) : (
                                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded bg-slate-800 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                  Próximamente
                                </span>
                              )}

                              <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-800/40 flex items-center gap-1">
                                ⚡ {agente.tiempoEntrega}
                              </span>

                              {agente.precioSoles && (
                                <span className="text-[10px] font-mono font-black text-emerald-300 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-500/40">
                                  {agente.precioSoles} / {agente.precioDolares}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800 text-xs font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">
                              <span className="hidden sm:inline text-[11px] uppercase tracking-wider">
                                {isExpanded ? "Ocultar" : "Detalles"}
                              </span>
                              <span className={`material-symbols-outlined text-xl transition-transform duration-300 ${
                                isExpanded ? "rotate-180 text-cyan-400" : "text-slate-400"
                              }`}>
                                expand_more
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Contenido Expandible (Estructura Mínima Información - Estilo Tarjeta Destacada) */}
                        {isExpanded && (
                          <div className="p-5 sm:p-6 border-t border-slate-800/80 bg-gradient-to-br from-[#171a1e]/80 via-slate-900/60 to-[#14161a] animate-in fade-in duration-200">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                              {/* Izquierda: Descripción concisa y Caja de Inversión */}
                              <div className="flex-1 space-y-4 max-w-2xl">
                                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                                  {agente.solucion}
                                </p>

                                {/* Caja de Inversión y Medios de Pago */}
                                {agente.precioSoles ? (
                                  <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-xl">
                                    <div>
                                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-bold">
                                        Inversión del Agente
                                      </span>
                                      <div className="flex items-baseline gap-2">
                                        <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                                          {agente.precioSoles} PEN
                                        </span>
                                        <span className="text-xs text-slate-400 font-bold">ó</span>
                                        <span className="text-lg sm:text-xl font-black text-cyan-300 font-mono">
                                          {agente.precioDolares}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-xs text-slate-300 space-y-1.5 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
                                      <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                                        <span><strong>Perú (Yape / Plin):</strong> {agente.yape}</span>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                                        <span><strong>Extranjero (PayPal):</strong> {agente.precioDolares}</span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
                                    💡 Este agente se encuentra en fase final de despliegue. Puedes unirte a la lista de espera para acceso prioritario.
                                  </div>
                                )}

                                {/* Enlace para canjear clave de descarga */}
                                <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                                  <span className="material-symbols-outlined text-emerald-400 text-sm">key</span>
                                  <span>¿Ya adquiriste tu clave de acceso?</span>
                                  <Link href="/agentes/descargar" className="text-emerald-300 font-bold hover:underline">
                                    Canjear y Descargar aquí →
                                  </Link>
                                </div>
                              </div>

                              {/* Derecha: Botones de Acción (PayPal, Yape, WhatsApp, YouTube, TikTok) */}
                              <div className="flex flex-col gap-2.5 w-full lg:w-auto shrink-0 min-w-[280px]">
                                {agente.precioSoles && (
                                  <div className="grid grid-cols-2 gap-2">
                                    <a
                                      href={agente.paypalUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02]"
                                    >
                                      <span className="material-symbols-outlined text-sm">payment</span>
                                      PayPal ($25)
                                    </a>
                                    <a
                                      href={`https://wa.me/51993147501?text=${encodeURIComponent(agente.whatsappMsg || `Hola Ing. Aurelio, deseo adquirir el ${agente.nombre} por Yape / Plin (S/ 70). Adjunto mi comprobante de pago al 51 993147501.`)}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02]"
                                    >
                                      <span className="material-symbols-outlined text-sm">phone_iphone</span>
                                      Yape / Plin (S/ 70)
                                    </a>
                                  </div>
                                )}

                                <a
                                  href={`https://wa.me/51993147501?text=${encodeURIComponent(agente.whatsappMsg)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`px-4 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] ${
                                    agente.estado === "Publicado en YouTube"
                                      ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                                  }`}
                                >
                                  <span className="material-symbols-outlined text-base">chat</span>
                                  {agente.estado === "Publicado en YouTube" ? "Quiero el Agente (+51 993 147 501)" : "Lista de Espera (WhatsApp)"}
                                </a>

                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedVideo(agente)}
                                    className="flex-1 px-3 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 shadow-md hover:scale-[1.02]"
                                  >
                                    <span className="material-symbols-outlined text-sm">play_circle</span>
                                    YouTube ({agente.duracionVideo})
                                  </button>

                                  {agente.tiktokUrl ? (
                                    <Link
                                      href={agente.tiktokUrl}
                                      target="_blank"
                                      className="flex-1 px-3 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-[11px] uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 border border-pink-500/40 shadow-md hover:scale-[1.02]"
                                    >
                                      <svg className="w-3.5 h-3.5 fill-current text-cyan-400" viewBox="0 0 24 24">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                                      </svg>
                                      TikTok
                                    </Link>
                                  ) : (
                                    <span className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900/90 text-slate-500 font-bold text-[11px] uppercase tracking-wider text-center flex items-center justify-center border border-slate-800">
                                      TikTok Pronto
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Clases Gratuitas en YouTube (Al final de la sección) */}
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
                {/* Modalidad 1: Gratuita (15 min gratis) */}
                <article id="consultoria-gratis" className="scroll-mt-36 rounded-3xl border border-slate-700 bg-slate-900 p-7 sm:p-8 flex flex-col justify-between">
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
                <article id="consultoria-hora" className="scroll-mt-36 rounded-3xl border-2 border-cyan-500/60 bg-cyan-950/30 p-7 sm:p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(245,168,0,0.15)]">
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

                {/* Modalidad 3: Por Proyecto (Trabajos Puntuales) */}
                <article id="consultoria-proyecto" className="scroll-mt-36 rounded-3xl border border-indigo-500/40 bg-indigo-950/20 p-7 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">Entregables a medida</span>
                    <h4 className="text-2xl font-bold mt-2 text-white">Servicio por proyecto (Trabajos puntuales)</h4>
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

              {selectedVideo.precioSoles && (
                <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950/80 via-slate-950 to-cyan-950/80 border-t border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-0.5">
                      Adquiere este Agente de IA
                    </span>
                    <p className="text-base font-black text-white">
                      Inversión: <span className="text-emerald-300 font-mono">{selectedVideo.precioSoles} PEN</span> ó <span className="text-cyan-300 font-mono">{selectedVideo.precioDolares}</span>
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      📱 <strong>Perú:</strong> Yape / Plin al <strong className="text-white">{selectedVideo.yape}</strong> · 💳 <strong>Extranjero:</strong> PayPal ({selectedVideo.precioDolares})
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                    <a
                      href={selectedVideo.paypalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span className="material-symbols-outlined text-sm">payment</span>
                      PayPal ($25)
                    </a>
                    <a
                      href={`https://wa.me/51993147501?text=${encodeURIComponent(selectedVideo.whatsappMsg || `Hola Ing. Aurelio, deseo adquirir el ${selectedVideo.nombre} por Yape / Plin (S/ 70). Adjunto mi comprobante de pago.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span className="material-symbols-outlined text-sm">phone_iphone</span>
                      Yape / Plin (S/ 70)
                    </a>
                  </div>
                </div>
              )}

              <div className="p-4 sm:p-6 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
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

export default function ServiciosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#14161a]" />}>
      <ServiciosContent />
    </Suspense>
  );
}
