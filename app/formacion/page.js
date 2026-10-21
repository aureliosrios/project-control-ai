"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import catalogo from "@/data/cursos.json";

const { asincronicos, sincronicos } = catalogo;

const agentesEspecializados = [
  {
    id: "agente-s10",
    nombre: "Agente de Presupuestos & APU Tipo S10",
    especialidad: "Costos y Presupuestos",
    tag: "COSTOS & S10",
    theme: {
      border: "border-amber-500/40 hover:border-amber-400",
      bg: "bg-gradient-to-br from-[#1c1307] to-[#0d0a04]",
      badge: "bg-amber-500 text-slate-950 font-black",
      pill: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      btn: "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_4px_14px_rgba(245,158,11,0.35)]"
    },
    icono: "calculate",
    duracionVideo: "12 min",
    tiempoEntrega: "15 segundos",
    problema: "¿Pasas horas calculando rendimientos, cuadrillas y transcribiendo precios en hojas de cálculo propensas a errores?",
    solucion: "Genera el desglose paramétrico de partidas, análisis de precios unitarios (APU) tipo S10, cálculo de HH/HM y costo directo con fórmulas vivas.",
    entregable: "Plantilla Excel con fórmulas nativas vivas, cálculo de cuadrillas, mano de obra y lista de insumos tipo S10.",
    videoId: "dVZNMhvNSsw",
    whatsappMsg: "Hola Aurelio, deseo implementar el Agente de Presupuestos y APU Tipo S10 en mis proyectos."
  },
  {
    id: "agente-msproject",
    nombre: "Agente Programador Gantt & VBA (MS Project)",
    especialidad: "Planeamiento y Programación",
    tag: "MS PROJECT & VBA",
    theme: {
      border: "border-blue-500/40 hover:border-blue-400",
      bg: "bg-gradient-to-br from-[#071329] to-[#030914]",
      badge: "bg-blue-500 text-white font-black",
      pill: "bg-blue-500/10 text-blue-300 border-blue-500/30",
      btn: "bg-blue-500 hover:bg-blue-400 text-white shadow-[0_4px_14px_rgba(59,130,246,0.35)]"
    },
    icono: "calendar_month",
    duracionVideo: "15 min",
    tiempoEntrega: "20 segundos",
    problema: "¿Vincular cientos de tareas una por una, ajustar calendarios y nivelar recursos a mano en MS Project te toma días?",
    solucion: "Convierte cualquier WBS o presupuesto en un cronograma estructurado con ruta crítica CPM, hitos y duraciones calculadas con macros VBA.",
    entregable: "Script VBA (.bas) listo para importar directamente a MS Project, generando el cronograma y diagrama de Gantt sin errores.",
    videoId: "NjWnA5b9Zho",
    whatsappMsg: "Hola Aurelio, me interesa implementar el Agente Programador Gantt con macros VBA para MS Project."
  },
  {
    id: "agente-p6",
    nombre: "Agente Primavera P6 (.XER / PLF)",
    especialidad: "Control Maestro y Forense",
    tag: "PRIMAVERA P6",
    theme: {
      border: "border-orange-500/40 hover:border-orange-400",
      bg: "bg-gradient-to-br from-[#1c0c05] to-[#0a0502]",
      badge: "bg-orange-500 text-slate-950 font-black",
      pill: "bg-orange-500/10 text-orange-300 border-orange-500/30",
      btn: "bg-orange-500 hover:bg-orange-400 text-slate-950 shadow-[0_4px_14px_rgba(249,115,22,0.35)]"
    },
    icono: "reorder",
    duracionVideo: "14 min",
    tiempoEntrega: "30 segundos",
    problema: "¿Archivos .XER con errores de importación (%T PROJECT), descuadres en calendarios o curvas de valor ganado inconsistentes?",
    solucion: "Genera y sanea archivos nativos de Oracle Primavera P6 (.xer) y plantillas de diseño visual (.plf) con curvas S y Valor Ganado (EVM).",
    entregable: "Archivo .XER compatible y limpio, con Curva S (PV/EV), asignación de recursos y diseño de seguimiento de barras Gantt.",
    videoId: "vABYYEA46yc",
    whatsappMsg: "Hola Aurelio, requiero el Agente Primavera P6 (.XER) para el control maestro de mis cronogramas."
  },
  {
    id: "agente-contratos",
    nombre: "Agente Auditor Contractual & Cerebro Digital",
    especialidad: "Oficina Técnica y Contractual",
    tag: "CONTRATOS & AUDITORÍA",
    theme: {
      border: "border-purple-500/40 hover:border-purple-400",
      bg: "bg-gradient-to-br from-[#170a24] to-[#09030f]",
      badge: "bg-purple-500 text-white font-black",
      pill: "bg-purple-500/10 text-purple-300 border-purple-500/30",
      btn: "bg-purple-500 hover:bg-purple-400 text-white shadow-[0_4px_14px_rgba(168,85,247,0.35)]"
    },
    icono: "gavel",
    duracionVideo: "10 min",
    tiempoEntrega: "25 segundos",
    problema: "¿Expedientes y contratos de más de 500 páginas donde se pierden penalidades, plazos de ampliación y obligaciones críticas?",
    solucion: "Pipeline OCR y análisis semántico para extraer automáticamente matrices de riesgos, penalidades diarias y causales de ampliación.",
    entregable: "Matriz ejecutiva de control contractual en Excel (dashboard A3) y grafo de conocimiento conectado en Obsidian.",
    videoId: "0nJQXGfkMB4",
    whatsappMsg: "Hola Aurelio, quiero aplicar el Agente Auditor Contractual y Cerebro Digital para proteger mis contratos de obra."
  },
  {
    id: "agente-lps",
    nombre: "Agente Lookahead & Last Planner System",
    especialidad: "Control Semanal y Producción",
    tag: "LAST PLANNER SYSTEM",
    theme: {
      border: "border-emerald-500/40 hover:border-emerald-400",
      bg: "bg-gradient-to-br from-[#061c12] to-[#020b07]",
      badge: "bg-emerald-500 text-slate-950 font-black",
      pill: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      btn: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_4px_14px_rgba(16,185,129,0.35)]"
    },
    icono: "fact_check",
    duracionVideo: "11 min",
    tiempoEntrega: "15 segundos",
    problema: "¿Reuniones de producción caóticas, restricciones no identificadas a tiempo y cálculo manual del PPC cada semana?",
    solucion: "Estructura el Lookahead a 6 semanas con arquitectura de 3 filas (Línea Base LB-0, Reprogramado y Real Campo), Plan Semanal WWP y restricciones.",
    entregable: "Matriz viva de restricciones en Excel con semaforización automática, causas de no cumplimiento (CNC) y cálculo PPC.",
    videoId: "dVZNMhvNSsw",
    whatsappMsg: "Hola Aurelio, me interesa el Agente Lookahead & Last Planner System para la gestión de producción en campo."
  },
  {
    id: "agente-eett",
    nombre: "Agente Redactor de EETT a Word",
    especialidad: "Especificaciones Técnicas",
    tag: "EETT & WORD",
    theme: {
      border: "border-cyan-500/40 hover:border-cyan-400",
      bg: "bg-gradient-to-br from-[#051724] to-[#02090e]",
      badge: "bg-cyan-500 text-slate-950 font-black",
      pill: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      btn: "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_4px_14px_rgba(6,182,212,0.35)]"
    },
    icono: "description",
    duracionVideo: "10 min",
    tiempoEntrega: "20 segundos",
    problema: "¿Copiar y pegar especificaciones desactualizadas con normas derogadas y unidades de medida incongruentes?",
    solucion: "Redacta especificaciones técnicas completas y normadas por partida (descripción, materiales, método de ejecución, controles, medición y pago).",
    entregable: "Documento oficial listo para entregar en Microsoft Word (.docx) con índice automático, estilos institucionales y normativa técnica vigente.",
    videoId: "NjWnA5b9Zho",
    whatsappMsg: "Hola Aurelio, deseo implementar el Agente Redactor de EETT a Word para la formulación rápida de expedientes."
  }
];

const rutasConstruccion = {
  A: {
    letra: "A",
    titulo: "Fundamentos Transversales",
    subtitulo: "Para todo profesional en obra",
    colorNombre: "Azul Acero Estructural",
    borderClass: "border-[#1E40AF]",
    borderHover: "hover:border-[#3B82F6]",
    badgeBg: "bg-[#1E40AF]/20 text-[#93C5FD] border-[#1E40AF]/60",
    badgeSolid: "bg-[#1E40AF] text-white",
    cardBg: "bg-[#0A101F]",
    btnPrimary: "bg-[#1E40AF] hover:bg-[#2563EB] text-white shadow-[0_4px_14px_rgba(30,64,175,0.4)]",
    btnTemario: "border-[#1E40AF]/60 text-slate-200 hover:bg-[#1E40AF]/20 hover:border-[#1E40AF]",
    desc: "IA práctica, gestión documental y auditoría legal-técnica de contratos y expedientes sin programar.",
    tagColor: "text-[#60A5FA]"
  },
  B: {
    letra: "B",
    titulo: "Gestión y Control de Proyectos",
    subtitulo: "Planners, residentes y oficina técnica",
    colorNombre: "Ámbar / Amarillo Maquinaria CAT",
    borderClass: "border-[#D97706]",
    borderHover: "hover:border-[#F59E0B]",
    badgeBg: "bg-[#D97706]/20 text-[#FCD34D] border-[#D97706]/60",
    badgeSolid: "bg-[#D97706] text-slate-950 font-black",
    cardBg: "bg-[#140F07]",
    btnPrimary: "bg-[#D97706] hover:bg-[#F59E0B] text-slate-950 font-black shadow-[0_4px_14px_rgba(217,119,6,0.4)]",
    btnTemario: "border-[#D97706]/60 text-slate-200 hover:bg-[#D97706]/20 hover:border-[#D97706]",
    desc: "Del APU al cronograma nivelado en MS Project y Primavera P6 con Last Planner System y EVM.",
    tagColor: "text-[#FBBF24]"
  },
  C: {
    letra: "C",
    titulo: "Especialidades de Ingeniería",
    subtitulo: "Costos, presupuestos y especificaciones",
    colorNombre: "Naranja Industrial de Seguridad",
    borderClass: "border-[#EA580C]",
    borderHover: "hover:border-[#F97316]",
    badgeBg: "bg-[#EA580C]/20 text-[#FDBA74] border-[#EA580C]/60",
    badgeSolid: "bg-[#EA580C] text-white font-black",
    cardBg: "bg-[#160B06]",
    btnPrimary: "bg-[#EA580C] hover:bg-[#F97316] text-white font-black shadow-[0_4px_14px_rgba(234,88,12,0.4)]",
    btnTemario: "border-[#EA580C]/60 text-slate-200 hover:bg-[#EA580C]/20 hover:border-[#EA580C]",
    desc: "Automatización de presupuestos tipo S10 con Python y redacción de EETT normadas a Word.",
    tagColor: "text-[#FB923C]"
  }
};

const rutas = [
  {
    letra: "A",
    titulo: "Fundamentos Transversales",
    desc: "Herramientas de IA y análisis documental para todo profesional de la construcción.",
    cursos: [
      { codigo: "A4", nombre: "Prompt Engineering Pro para Obras", estado: "proximamente" },
      { codigo: "A5", nombre: "Python for Construction Engineers", estado: "proximamente" }
    ]
  },
  {
    letra: "B",
    titulo: "Gestión y Control de Proyectos",
    desc: "De la estimación al cronograma ejecutable y control de avance físico-financiero.",
    cursos: [
    ]
  },
  {
    letra: "C",
    titulo: "Especialidades de Ingeniería",
    desc: "Ingeniería de costos, formulación de EETT y agentes autónomos especializados.",
    cursos: [
      { codigo: "C4", nombre: "Auditoría Técnica y Forense de Expedientes", estado: "proximamente" },
      { codigo: "C5", nombre: "Ecosistemas de Agentes Autónomos y MCP", estado: "proximamente" }
    ]
  }
];

// Mapa estático de colores para Tailwind CSS en cursos sincrónicos (evita purgado en producción)
const sincThemes = {
  cyan: {
    glow: "bg-cyan-500/10",
    tagText: "text-cyan-400",
    border: "border-cyan-500/30 hover:border-cyan-500/50",
    badgeBg: "bg-cyan-500 text-slate-950",
    iconColor: "text-cyan-400"
  },
  blue: {
    glow: "bg-indigo-500/10",
    tagText: "text-indigo-400",
    border: "border-indigo-500/30 hover:border-indigo-500/50",
    badgeBg: "bg-indigo-500 text-white",
    iconColor: "text-indigo-400"
  },
  orange: {
    glow: "bg-orange-500/10",
    tagText: "text-orange-400",
    border: "border-orange-500/30 hover:border-orange-500/50",
    badgeBg: "bg-orange-500 text-slate-950",
    iconColor: "text-orange-400"
  }
};

export default function Formacion() {
  const [activeTab, setActiveTab] = useState("agentes");
  const [selectedRuta, setSelectedRuta] = useState("TODAS");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "agentes" || tabParam === "sinc" || tabParam === "asinc") {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const cursosFiltrados = selectedRuta === "TODAS"
    ? asincronicos
    : asincronicos.filter((c) => c.ruta === selectedRuta);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500/30">
      <div className="fixed inset-0 tech-grid opacity-30 pointer-events-none" />

      <main className="relative z-10 pt-32 pb-32 px-6 md:px-8 max-w-7xl mx-auto">
        {/* Encabezado con propuesta de valor directa y pruebas concretas */}
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Project Control AI · Catálogo Oficial
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 uppercase leading-none">
            SISTEMA DE <br />
            <span className="text-neon">FORMACIÓN</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 font-normal max-w-3xl leading-relaxed mb-8">
            Automatiza presupuestos, cronogramas, EETT y control de obra con IA. Cursos prácticos y soluciones agénticas para ingenieros y profesionales de construcción.
          </p>

          {/* Banner rápido hacia Solución Agéntica */}
          <div 
            onClick={() => setActiveTab("agentes")}
            className="cursor-pointer mb-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 hover:border-emerald-400 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black shrink-0">
                <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">bolt</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500 text-slate-950">
                    NUEVO ENFOQUE
                  </span>
                  <span className="text-xs text-emerald-300 font-bold">
                    ¿No tienes 8 horas para llevar un curso por cada especialidad?
                  </span>
                </div>
                <p className="text-sm font-semibold text-white mt-0.5">
                  Descubre las <span className="text-emerald-400 underline underline-offset-4">Soluciones Agénticas</span>: entregables profesionales en segundos con videoguías de 10 a 15 min.
                </p>
              </div>
            </div>
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); setActiveTab("agentes"); }}
              className="whitespace-nowrap px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1 shadow-md"
            >
              Ver Agentes
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Tres pruebas de valor concretas enfocadas en Casos Reales de Obra */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Acceso Inmediato</p>
                <p className="text-[11px] text-slate-400">En plataforma Hotmart 24/7</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/30 text-cyan-300 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <span className="material-symbols-outlined text-[20px]">engineering</span>
              </div>
              <div>
                <p className="text-xs font-black text-cyan-200 uppercase tracking-wider">Casos Reales de Obra</p>
                <p className="text-[11px] text-cyan-400/80">Túneles, presas, edificios y contratos</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">download</span>
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Plantillas y Flujos</p>
                <p className="text-[11px] text-slate-400">Excel matricial, macros VBA y prompts</p>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Selector */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-14 border-b border-white/10 pb-6">
          <button
            aria-pressed={activeTab === "agentes"}
            onClick={() => setActiveTab("agentes")}
            className={`px-6 md:px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2.5 ${
              activeTab === 'agentes'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.45)] ring-2 ring-emerald-400/50'
                : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-emerald-500/20'
            }`}
          >
            <span className="material-symbols-outlined text-base text-emerald-400">smart_toy</span>
            <span>⚡ Soluciones Agénticas</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              Nuevo
            </span>
          </button>

          <button
            aria-pressed={activeTab === "asinc"}
            onClick={() => setActiveTab("asinc")}
            className={`px-6 md:px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 ${
              activeTab === 'asinc'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.4)]'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-sm">schedule</span>
            A tu ritmo (Asincrónico)
          </button>

          <button
            aria-pressed={activeTab === "sinc"}
            onClick={() => setActiveTab("sinc")}
            className={`px-6 md:px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 ${
              activeTab === 'sinc'
                ? 'bg-orange-500 text-slate-950 shadow-[0_0_30px_rgba(244,99,15,0.4)]'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-sm">sensors</span>
            En Vivo (Sincrónico)
          </button>
        </div>

        {activeTab === "agentes" && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* 1. Hero del Manifiesto Agéntico */}
            <section className="p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-slate-900 via-[#061524] to-[#020b17] border-2 border-emerald-500/40 relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.15)]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[90px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/10 blur-[80px] pointer-events-none" />

              <div className="relative z-10 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Solución Agéntica · Ingeniería de Precisión
                </div>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.08] mb-6">
                  ¿No tienes tiempo para llevar <span className="text-emerald-400">8 horas de cursos</span> para aprender una especialidad?
                </h2>

                <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed mb-8">
                  Aprender desde cero presupuestos, cronogramas, seguimiento y control toma semanas. <strong className="text-white font-bold">Acá te damos la solución agéntica:</strong> agentes autónomos de IA que te dan la libertad de tener un entregable profesional en segundos. Solo mira una videoguía de 10 a 15 minutos y estarás listo para aplicarlos a tus proyectos reales de obra.
                </p>

                {/* 3 Pilares Clave */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-3">
                      <span className="material-symbols-outlined text-[22px]">timer</span>
                    </div>
                    <p className="text-xs font-black text-white uppercase tracking-wider">Video de 10 a 15 min</p>
                    <p className="text-[11px] text-slate-400 mt-1">Directo a la aplicación práctica, sin teoría innecesaria.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold mb-3">
                      <span className="material-symbols-outlined text-[22px]">bolt</span>
                    </div>
                    <p className="text-xs font-black text-white uppercase tracking-wider">Entregable en Segundos</p>
                    <p className="text-[11px] text-slate-400 mt-1">APUs en Excel, macros VBA en MS Project, .XER en P6 y EETT a Word.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-3">
                      <span className="material-symbols-outlined text-[22px]">engineering</span>
                    </div>
                    <p className="text-xs font-black text-white uppercase tracking-wider">Listo para Obra</p>
                    <p className="text-[11px] text-slate-400 mt-1">Fórmulas vivas, normativas vigentes y trazabilidad técnica.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Banner Destacado: Curso "El Despertar" a $0 USD */}
            <section className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-950 to-cyan-950/40 border-2 border-emerald-500/40 relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="flex-1 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest">
                    <span className="material-symbols-outlined text-[14px]">card_giftcard</span>
                    Beca Abierta · Precio Reducido al 100%
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    ¿No sabes de agentes? Empieza con el curso <span className="text-emerald-400">&ldquo;El Despertar&rdquo;</span>
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
                    Si aún no sabes cómo interactúan los agentes de IA con tus archivos de obra, preparamos el curso introductorio <strong>&ldquo;El Despertar de la IA en la Gestión de Proyectos&rdquo;</strong>. Hoy con precio totalmente disminuido de <strong>$15.00 USD a $0.00 USD (GRATUITO)</strong> con la intención de que todos los profesionales y estudiantes de ingeniería puedan conocer cómo funcionan los agentes sin ninguna barrera económica.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <div className="flex items-baseline gap-2 bg-black/40 px-3.5 py-1.5 rounded-xl border border-white/10">
                      <span className="text-xs text-slate-500 line-through font-bold">Precio Regular: $15.00 USD</span>
                      <span className="text-lg font-black text-emerald-400">Hoy: $0.00 USD (Gratis)</span>
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-cyan-400">all_inclusive</span>
                      Acceso 24/7 en Hotmart
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                  <Link
                    href="https://pay.hotmart.com/I104938744G"
                    target="_blank"
                    className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105"
                  >
                    <span className="material-symbols-outlined text-base">card_giftcard</span>
                    Acceder Gratis al Curso ($0 USD)
                  </Link>

                  <Link
                    href="https://go.hotmart.com/I104938744G?dp=1"
                    target="_blank"
                    className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">description</span>
                    Descargar Temario PDF
                  </Link>
                </div>
              </div>
            </section>

            {/* 3. Banner Oficial de YouTube */}
            <section className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-red-950/30 via-slate-950 to-slate-900 border border-red-500/30 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-3xl">smart_display</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-red-500 text-white">
                        CANAL OFICIAL
                      </span>
                      <span className="text-xs text-red-400 font-bold">Comunidad Abierta</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                      Hoy nos encontramos también en YouTube
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm max-w-2xl mt-1">
                      Mira demostraciones de agentes en tiempo real, videoguías de 10 a 15 minutos, resolución de casos de obra reales y tutoriales paso a paso para aplicar inteligencia artificial a tu trabajo diario.
                    </p>
                  </div>
                </div>

                <Link
                  href="https://www.youtube.com/@ProjectControlAI"
                  target="_blank"
                  className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-105"
                >
                  <span className="material-symbols-outlined text-base">subscriptions</span>
                  Ir a YouTube
                </Link>
              </div>
            </section>

            {/* 4. Catálogo de Agentes de Precisión */}
            <div>
              <div className="mb-8">
                <span className="text-emerald-400 text-[10px] font-black tracking-[0.3em] uppercase block mb-1">
                  Catálogo de Agentes · Entregables en Segundos
                </span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                  Elige tu Agente, Mira el Video y Contáctanos
                </h2>
                <p className="text-slate-400 font-light text-sm max-w-2xl mt-1">
                  Cada agente resuelve un problema crítico de oficina técnica o campo. Revisa la videoguía demostrativa de 10-15 minutos y contáctanos para implementarlo directamente en tus proyectos.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agentesEspecializados.map((agente) => (
                  <div
                    key={agente.id}
                    className={`p-6 sm:p-7 rounded-3xl border-2 ${agente.theme.border} ${agente.theme.bg} flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group relative overflow-hidden`}
                  >
                    <div>
                      {/* Header de Tarjeta */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${agente.theme.badge}`}>
                          {agente.tag}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          <span className="material-symbols-outlined text-[13px] text-cyan-400">schedule</span>
                          {agente.duracionVideo}
                        </div>
                      </div>

                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white">
                          <span className="material-symbols-outlined text-[22px]">{agente.icono}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                            {agente.nombre}
                          </h3>
                          <p className="text-[11px] text-slate-400 font-medium">{agente.especialidad}</p>
                        </div>
                      </div>

                      {/* El Reto vs La Solución */}
                      <div className="space-y-3 my-4 text-xs">
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">El Reto:</span>
                          <p className="text-slate-300 leading-relaxed text-[11px]">{agente.problema}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">Solución Agéntica:</span>
                          <p className="text-slate-300 leading-relaxed text-[11px]">{agente.solucion}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[10px] font-black text-cyan-300 uppercase tracking-wider">Entregable Listo:</span>
                            <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              ⚡ {agente.tiempoEntrega}
                            </span>
                          </div>
                          <p className="text-slate-200 text-[11px] font-medium leading-relaxed">{agente.entregable}</p>
                        </div>
                      </div>
                    </div>

                    {/* Acciones de la Tarjeta */}
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <button
                        type="button"
                        onClick={() => setSelectedVideo(agente)}
                        className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-base text-red-500">play_circle</span>
                        Ver Video ({agente.duracionVideo})
                      </button>

                      <Link
                        href={`https://wa.me/51993147501?text=${encodeURIComponent(agente.whatsappMsg)}`}
                        target="_blank"
                        className={`w-full py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 ${agente.theme.btn}`}
                      >
                        <span className="material-symbols-outlined text-base">chat</span>
                        Ponte en Contacto
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Cierre y Llamado a la Acción Global */}
            <section className="p-8 md:p-12 rounded-[40px] bg-slate-900 border border-white/10 text-center relative overflow-hidden">
              <div className="max-w-2xl mx-auto space-y-4">
                <span className="text-emerald-400 text-xs font-black tracking-[0.3em] uppercase block">
                  Adopción Inmediata · Soporte Directo
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                  Elige tu agente, mira el video y ponte en contacto con nosotros
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  ¿Deseas implementar estos agentes en tu empresa o adaptar un flujo agéntico para tu tipo de proyecto? Conversemos directamente por WhatsApp o programa una sesión técnica de consultoría.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <Link
                    href="https://wa.me/51993147501?text=Hola%20Aurelio,%20estuve%20revisando%20la%20secci%C3%B3n%20de%20agentes%20en%20Project%20Control%20AI%20y%20deseo%20m%C3%A1s%20informaci%C3%B3n."
                    target="_blank"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    Contactar por WhatsApp (+51 993 147 501)
                  </Link>
                  <Link
                    href="/consultoria"
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    Ver Consultoría Técnica
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "asinc" && (
          <div className="space-y-16">
            {/* NUEVO: Selector de Rutas Profesionales de Construcción */}
            <section className="p-8 md:p-10 rounded-3xl bg-slate-950/80 border border-white/10 backdrop-blur-xl relative overflow-hidden">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-amber-400 text-lg">alt_route</span>
                  <span className="text-amber-400 text-xs font-black tracking-[0.25em] uppercase">Rutas de Formación Profesional</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Elige tu Ruta Especializada</h2>
                <p className="text-slate-400 text-sm max-w-2xl mt-1">
                  Selecciona la ruta según tu área de trabajo en obra. Los bordes identifican la especialidad técnica de cada curso:
                </p>
              </div>

              {/* 3 Tarjetas de Rutas con Colores Fuertes de Construcción */}
              <div className="grid md:grid-cols-3 gap-5">
                {/* RUTA A */}
                <button
                  onClick={() => setSelectedRuta(selectedRuta === "A" ? "TODAS" : "A")}
                  className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between group ${
                    selectedRuta === "A"
                      ? 'border-[#1E40AF] bg-[#0A101F] shadow-[0_0_25px_rgba(30,64,175,0.4)] scale-[1.02]'
                      : 'border-[#1E40AF]/60 bg-[#070D1E]/60 hover:border-[#1E40AF] hover:bg-[#0A101F]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#1E40AF] text-white">
                        RUTA A
                      </span>
                      <span className="text-xs font-mono font-bold text-blue-300 bg-[#1E40AF]/20 px-2 py-0.5 rounded border border-[#1E40AF]/40">
                        {asincronicos.filter(c => c.ruta === "A").length} Cursos
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white mb-1 group-hover:text-blue-300 transition-colors">
                      {rutasConstruccion.A.titulo}
                    </h3>
                    <p className="text-xs font-bold text-[#60A5FA] mb-2">
                      {rutasConstruccion.A.subtitulo}
                    </p>
                    <p className="text-xs text-slate-300 font-normal leading-relaxed">
                      {rutasConstruccion.A.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#60A5FA]">
                    <span>{selectedRuta === "A" ? "Viendo Ruta A" : "Filtrar por Ruta A"}</span>
                    <span className="material-symbols-outlined text-sm">
                      {selectedRuta === "A" ? "check_circle" : "arrow_forward"}
                    </span>
                  </div>
                </button>

                {/* RUTA B */}
                <button
                  onClick={() => setSelectedRuta(selectedRuta === "B" ? "TODAS" : "B")}
                  className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between group ${
                    selectedRuta === "B"
                      ? 'border-[#D97706] bg-[#140F07] shadow-[0_0_25px_rgba(217,119,6,0.4)] scale-[1.02]'
                      : 'border-[#D97706]/60 bg-[#100C05]/60 hover:border-[#D97706] hover:bg-[#140F07]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#D97706] text-slate-950">
                        RUTA B
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-300 bg-[#D97706]/20 px-2 py-0.5 rounded border border-[#D97706]/40">
                        {asincronicos.filter(c => c.ruta === "B").length} Cursos
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white mb-1 group-hover:text-amber-300 transition-colors">
                      {rutasConstruccion.B.titulo}
                    </h3>
                    <p className="text-xs font-bold text-[#FBBF24] mb-2">
                      {rutasConstruccion.B.subtitulo}
                    </p>
                    <p className="text-xs text-slate-300 font-normal leading-relaxed">
                      {rutasConstruccion.B.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#FBBF24]">
                    <span>{selectedRuta === "B" ? "Viendo Ruta B" : "Filtrar por Ruta B"}</span>
                    <span className="material-symbols-outlined text-sm">
                      {selectedRuta === "B" ? "check_circle" : "arrow_forward"}
                    </span>
                  </div>
                </button>

                {/* RUTA C */}
                <button
                  onClick={() => setSelectedRuta(selectedRuta === "C" ? "TODAS" : "C")}
                  className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between group ${
                    selectedRuta === "C"
                      ? 'border-[#EA580C] bg-[#160B06] shadow-[0_0_25px_rgba(234,88,12,0.4)] scale-[1.02]'
                      : 'border-[#EA580C]/60 bg-[#120904]/60 hover:border-[#EA580C] hover:bg-[#160B06]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#EA580C] text-white">
                        RUTA C
                      </span>
                      <span className="text-xs font-mono font-bold text-orange-300 bg-[#EA580C]/20 px-2 py-0.5 rounded border border-[#EA580C]/40">
                        {asincronicos.filter(c => c.ruta === "C").length} Cursos
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white mb-1 group-hover:text-orange-300 transition-colors">
                      {rutasConstruccion.C.titulo}
                    </h3>
                    <p className="text-xs font-bold text-[#FB923C] mb-2">
                      {rutasConstruccion.C.subtitulo}
                    </p>
                    <p className="text-xs text-slate-300 font-normal leading-relaxed">
                      {rutasConstruccion.C.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#FB923C]">
                    <span>{selectedRuta === "C" ? "Viendo Ruta C" : "Filtrar por Ruta C"}</span>
                    <span className="material-symbols-outlined text-sm">
                      {selectedRuta === "C" ? "check_circle" : "arrow_forward"}
                    </span>
                  </div>
                </button>
              </div>
            </section>

            {/* Listado de Tarjetas de Cursos Asincrónicos */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-amber-400 text-[10px] font-black tracking-[0.3em] uppercase block mb-1">Catálogo Activo · Hotmart</span>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                    {selectedRuta === "TODAS" ? `Todos los Cursos Disponibles (${asincronicos.length})` : `Cursos de la ${rutasConstruccion[selectedRuta].titulo}`}
                  </h2>
                  <p className="text-slate-400 font-light text-sm max-w-2xl mt-1">
                    Afiches oficiales, temarios completos en Hotmart y acceso de por vida.
                  </p>
                </div>

                {/* Filtros rápidos */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedRuta("TODAS")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedRuta === "TODAS"
                        ? "bg-white text-slate-950 font-black shadow-md"
                        : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
                    }`}
                  >
                    Todos ({asincronicos.length})
                  </button>
                  <button
                    onClick={() => setSelectedRuta("A")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedRuta === "A"
                        ? "bg-[#1E40AF] text-white border-[#1E40AF] shadow-[0_0_15px_rgba(30,64,175,0.4)]"
                        : "bg-[#070D1E] text-blue-300 border-[#1E40AF]/40 hover:border-[#1E40AF]"
                    }`}
                  >
                    Ruta A ({asincronicos.filter(c => c.ruta === "A").length})
                  </button>
                  <button
                    onClick={() => setSelectedRuta("B")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedRuta === "B"
                        ? "bg-[#D97706] text-slate-950 font-black border-[#D97706] shadow-[0_0_15px_rgba(217,119,6,0.4)]"
                        : "bg-[#100C05] text-amber-300 border-[#D97706]/40 hover:border-[#D97706]"
                    }`}
                  >
                    Ruta B ({asincronicos.filter(c => c.ruta === "B").length})
                  </button>
                  <button
                    onClick={() => setSelectedRuta("C")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedRuta === "C"
                        ? "bg-[#EA580C] text-white font-black border-[#EA580C] shadow-[0_0_15px_rgba(234,88,12,0.4)]"
                        : "bg-[#120904] text-orange-300 border-[#EA580C]/40 hover:border-[#EA580C]"
                    }`}
                  >
                    Ruta C ({asincronicos.filter(c => c.ruta === "C").length})
                  </button>
                </div>
              </div>

              {/* Grid de Tarjetas Ultra-Limpias */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cursosFiltrados.map((curso) => {
                  const rutaInfo = rutasConstruccion[curso.ruta] || rutasConstruccion.A;

                  return (
                    <div
                      key={curso.id}
                      id={`curso-${curso.id}`}
                      className={`rounded-3xl border-2 ${rutaInfo.borderClass} ${rutaInfo.cardBg} p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group`}
                    >
                      {/* Portada Oficial con Imagen Encajada 3:4 */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/60 mb-4 border border-white/10 shadow-inner">
                        <Image fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw" quality={70}
                          src={curso.imagen}
                          alt={curso.nombre}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Badges superiores */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-md shadow-md ${rutaInfo.badgeSolid}`}>
                            {curso.id}
                          </span>
                          {curso.precio === "$0.00 USD" && (
                            <span className="text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md animate-pulse">
                              BECA LIBRE
                            </span>
                          )}
                        </div>
                        <div className="absolute top-2.5 right-2.5">
                          <span className="text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider bg-black/80 text-white border border-white/20 backdrop-blur-md">
                            HOTMART
                          </span>
                        </div>
                      </div>

                      {/* Cuerpo de la Tarjeta: Nombre y Monto */}
                      <div className="flex-1 flex flex-col justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${rutaInfo.badgeBg}`}>
                              RUTA {curso.ruta}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">
                              {curso.tag}
                            </span>
                          </div>
                          <h3 className="text-sm md:text-base font-bold text-white leading-snug line-clamp-2 min-h-[2.75rem] group-hover:text-white transition-colors">
                            {curso.nombre}
                          </h3>
                        </div>

                        {/* Monto Oficial */}
                        <div className="pt-3 mt-3 border-t border-white/10 flex items-baseline justify-between">
                          {curso.precio === "$0.00 USD" ? (
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-slate-500 line-through font-bold">$14.99 USD</span>
                                <span className="text-2xl font-black text-emerald-400 tracking-tight">$0.00 USD</span>
                              </div>
                              <span className="text-[9px] text-emerald-300 font-bold uppercase tracking-wider block">100% Gratuito · Beca Libre</span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-2xl font-black text-white tracking-tight">{curso.precio}</span>
                              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Acceso 24/7</span>
                            </div>
                          )}
                          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">verified</span> Oficial
                          </span>
                        </div>
                      </div>

                      {/* Botones de Acción: Ver Temario y Comprar */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                        <Link
                          href={curso.brochure}
                          target="_blank"
                          className={`py-2.5 px-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 border ${rutaInfo.btnTemario}`}
                        >
                          <span className="material-symbols-outlined text-[14px]">description</span>
                          Temario
                        </Link>
                        <Link
                          href={curso.link}
                          target="_blank"
                          className={`py-2.5 px-2 rounded-xl text-[11px] font-black uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 ${
                            curso.precio === "$0.00 USD"
                              ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-[0_4px_14px_rgba(16,185,129,0.4)]"
                              : rutaInfo.btnPrimary
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {curso.precio === "$0.00 USD" ? "card_giftcard" : "shopping_cart"}
                          </span>
                          {curso.precio === "$0.00 USD" ? "Acceder Gratis" : "Comprar"}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Plan de Micro-Especialización (Rutas Sincronizadas y estados claros) */}
            <section className="pt-12 border-t border-white/5">
              <div className="text-center mb-16">
                <span className="text-cyan-400 text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Ecosistema Profesional</span>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">Plan de Micro-Especialización</h2>
                <p className="text-slate-400 max-w-2xl mx-auto font-light leading-relaxed text-sm">
                  Ruta estructurada para dominar desde los fundamentos de IA y auditoría forense hasta la programación con agentes autónomos en obra.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {rutas.map((ruta) => (
                  <div key={ruta.letra} className="p-8 md:p-10 rounded-[40px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-white mb-6">
                      {ruta.letra}
                    </div>
                    <h3 className="text-xl font-black text-white mb-2 uppercase">{ruta.titulo}</h3>
                    <p className="text-xs text-slate-400 mb-8 font-light leading-relaxed">{ruta.desc}</p>

                    <div className="space-y-3.5">
                      {[...asincronicos.filter(c => c.ruta === ruta.letra).map(c => ({ codigo: c.id, nombre: c.nombre, estado: "disponible" })), ...ruta.cursos.filter(c => c.estado === "proximamente" && !asincronicos.some(a => a.id === c.codigo))].map((c, i) => (
                        <div key={i} className="flex items-start justify-between gap-3 text-xs text-slate-300 group">
                          <div className="flex items-start gap-2.5">
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${c.estado === 'disponible' ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                            <span className={c.estado === 'disponible' ? 'text-slate-200 group-hover:text-cyan-300 font-medium' : 'text-slate-500'}>
                              <strong className="text-white font-mono mr-1">{c.codigo}:</strong> {c.nombre}
                            </span>
                          </div>
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            c.estado === 'disponible'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-white/5 text-slate-500 border border-white/5'
                          }`}>
                            {c.estado === 'disponible' ? 'Disponible' : 'Próximamente'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "sinc" && (
          <div className="space-y-16">
            {/* Cursos Sincrónicos: Convocatoria Oficial Abierta (Destacada) */}
            <div>
              <div className="mb-8">
                <span className="text-orange-400 text-[10px] font-black tracking-[0.3em] uppercase block mb-1">Clases en Vivo · Masterclass</span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                  {sincronicos.filter(c => !c.cerrado).length > 1 ? "Próximas Convocatorias Oficiales" : "Próxima Convocatoria Oficial"}
                </h2>
                <p className="text-slate-400 font-light text-sm max-w-2xl mt-1">
                  Capacitación intensiva en tiempo real con resolución de consultas, talleres interactivos y acompañamiento directo.
                </p>
              </div>

              {/* Tarjetas Destacadas de Convocatoria Abierta */}
              <div className="space-y-8">
                {sincronicos.filter(c => !c.cerrado).map((curso) => {
                const theme = sincThemes[curso.colorKey] || sincThemes.cyan;

                return (
                  <div key={curso.id} className="p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-slate-900 via-slate-900 to-[#030d22] border-2 border-cyan-500/40 relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 blur-[90px] pointer-events-none" />

                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black tracking-[0.3em] uppercase text-cyan-400">
                          {curso.tag}
                        </span>
                        <span className="bg-cyan-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                          {curso.destacado}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">ID: {curso.id} · Formato Sincrónico</span>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                      <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-snug">
                          {curso.nombre}
                        </h3>
                        <p className="text-slate-300 font-normal text-sm md:text-base leading-relaxed">
                          {curso.desc}
                        </p>

                        {/* Caso Real */}
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs flex items-start gap-3">
                          <span className="material-symbols-outlined text-amber-400 text-lg">apartment</span>
                          <div>
                            <strong className="text-amber-300 uppercase tracking-wider text-[10px] block">Caso Real de Obra:</strong>
                            <span className="text-slate-300">{curso.casoReal}</span>
                          </div>
                        </div>

                        {/* Datos de Fechas y Horarios */}
                        <div className="grid sm:grid-cols-2 gap-3 pt-2">
                          <div className="flex items-center gap-3 text-xs text-slate-300 bg-black/40 p-3 rounded-xl border border-white/5">
                            <span className="material-symbols-outlined text-base text-cyan-400">calendar_today</span>
                            <span><strong className="text-white">Inicio:</strong> {curso.inicio}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-300 bg-black/40 p-3 rounded-xl border border-white/5">
                            <span className="material-symbols-outlined text-base text-cyan-400">schedule</span>
                            <span>{curso.horario}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-300 bg-black/40 p-3 rounded-xl border border-white/5">
                            <span className="material-symbols-outlined text-base text-cyan-400">event_available</span>
                            <span><strong className="text-white">Fin:</strong> {curso.fin}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-300 bg-black/40 p-3 rounded-xl border border-white/5">
                            <span className="material-symbols-outlined text-base text-cyan-400">more_time</span>
                            <span>{curso.sesiones}</span>
                          </div>
                        </div>
                      </div>

                      {/* Caja de Inscripción y Precios */}
                      <div className="p-6 rounded-3xl bg-black/60 border border-white/10 flex flex-col justify-between h-full">
                        <div className="mb-6">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Inversión Oficial</span>
                          <div className="flex flex-wrap items-baseline gap-3">
                            <span className="text-4xl font-black text-white">{curso.precio}</span>
                            <span className="text-sm text-cyan-400 font-extrabold uppercase tracking-wider">{curso.precioSoles}</span>
                          </div>
                          {curso.precioPaypal ? (
                            <div className="mt-2.5 flex flex-wrap gap-2 text-[11px]">
                              <span className="px-2 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-300 font-bold">
                                Hotmart: {curso.precioHotmart || curso.precio}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-300 font-bold">
                                PayPal: {curso.precioPaypal}
                              </span>
                            </div>
                          ) : null}
                          <p className="text-[11px] text-slate-400 mt-2">Acceso a clases en vivo, grabaciones y materiales de por vida.</p>
                        </div>

                        <div className="space-y-2.5">
                          {curso.brochure && (
                            <Link
                              href={curso.brochure}
                              target="_blank"
                              className="w-full py-3 bg-white/5 border border-white/10 text-slate-200 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-white/15 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                              <span className="material-symbols-outlined text-sm">download</span>
                              Descargar Temario PDF
                            </Link>
                          )}
                          <Link
                            href={`${curso.link}?curso=${encodeURIComponent(curso.registro)}`}
                            className="w-full py-3.5 bg-cyan-500 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                          >
                            <span className="material-symbols-outlined text-sm">how_to_reg</span>
                            Ficha de Inscripción
                          </Link>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <Link
                              href={curso.hotmart}
                              target="_blank"
                              className="py-2.5 bg-orange-500/10 border border-orange-500/30 rounded-xl text-[10px] font-black text-orange-400 uppercase tracking-wider hover:bg-orange-500/20 text-center transition-all flex flex-col items-center justify-center"
                            >
                              <span>Hotmart</span>
                              <span className="text-[9px] font-semibold text-orange-300/80">{curso.precioHotmart || curso.precio}</span>
                            </Link>
                            <Link
                              href={curso.paypal}
                              target="_blank"
                              className="py-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl text-[10px] font-black text-blue-400 uppercase tracking-wider hover:bg-blue-500/20 text-center transition-all flex flex-col items-center justify-center"
                            >
                              <span>PayPal</span>
                              <span className="text-[9px] font-semibold text-blue-300/80">{curso.precioPaypal || curso.precio}</span>
                            </Link>
                          </div>

                          <Link
                            href={`https://wa.me/51993147501?text=Hola,%20quiero%20inscribirme%20al%20curso%20${encodeURIComponent(curso.nombre)}%20por%20Yape/Plin.`}
                            target="_blank"
                            className="w-full py-3 bg-white/5 border border-white/10 text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-emerald-500/10 text-center flex items-center justify-center gap-2 transition-all"
                          >
                            <span className="material-symbols-outlined text-sm">qr_code_2</span>
                            Pagar con Yape / Plin (Perú)
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>

            {/* Ediciones Anteriores y Lista de Espera */}
            {sincronicos.some(c => c.cerrado) && (
              <div className="pt-8 border-t border-white/5">
                <div className="mb-6">
                  <span className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase block mb-1">Historial Académico</span>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Ediciones en Curso y Lista de Espera</h3>
                  <p className="text-slate-400 text-xs">
                    Programas en pleno dictado con vacantes completadas. Puedes unirte a la lista de espera para la siguiente edición.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {sincronicos.filter(c => c.cerrado).map((curso) => {
                    const theme = sincThemes[curso.colorKey] || sincThemes.orange;

                    return (
                      <div key={curso.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between opacity-90 hover:opacity-100 transition-all">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className={`text-[10px] font-black tracking-wider uppercase ${theme.tagText}`}>
                              {curso.tag}
                            </span>
                            <span className="bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              {curso.estadoBadge || "Matrículas Cerradas"}
                            </span>
                          </div>

                          <h4 className="text-lg font-bold text-slate-200 mb-2">{curso.nombre}</h4>
                          <p className="text-slate-400 text-xs mb-4 leading-relaxed">{curso.desc}</p>

                          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] mb-4">
                            <span className="text-slate-500 font-bold uppercase tracking-wider text-[8px] block">Caso Real:</span>
                            <span className="text-slate-300">{curso.casoReal}</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                          <div>
                            <span className="text-sm font-bold text-slate-500 line-through block">{curso.precio}</span>
                            <span className="text-[10px] text-slate-500 uppercase">{curso.sesiones}</span>
                          </div>
                          <Link
                            href={`https://wa.me/51993147501?text=Hola,%20deseo%20entrar%20a%20la%20lista%20de%20espera%20para%20la%20nueva%20edici%C3%B3n%20del%20curso%20${encodeURIComponent(curso.nombre)}.`}
                            target="_blank"
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-cyan-300 uppercase tracking-wider hover:bg-cyan-500/10 transition-all flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-sm">chat</span>
                            Lista de Espera (WhatsApp)
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Canales y Métodos de Pago Oficiales */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Perú Section */}
              <div className="glass-panel p-8 md:p-10 rounded-[40px] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <span className="material-symbols-outlined text-8xl text-white">account_balance</span>
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl">🇵🇪</span>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Pagos en Perú</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Soles y Dólares</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-xs">Y/P</div>
                      <div>
                        <p className="font-bold text-white text-xs md:text-sm">Yape / Plin</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Pagos instantáneos</p>
                      </div>
                    </div>
                    <Link href="https://wa.me/51993147501" target="_blank" className="text-[10px] font-black text-cyan-400 border border-cyan-400/30 px-3.5 py-1.5 rounded-full hover:bg-cyan-400/10 transition-all">
                      +51 993 147 501
                    </Link>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 font-black text-xs">BCP</div>
                      <div>
                        <p className="font-bold text-white text-xs md:text-sm">Transferencia BCP</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Soles y Dólares</p>
                      </div>
                    </div>
                    <Link href="https://wa.me/51993147501?text=Hola,%20solicito%20número%20de%20cuenta%20BCP" target="_blank" className="text-[10px] font-black text-blue-400 border border-blue-400/30 px-3.5 py-1.5 rounded-full hover:bg-blue-400/10 transition-all">
                      Consultar
                    </Link>
                  </div>
                </div>
              </div>

              {/* Internacional Section */}
              <div className="glass-panel p-8 md:p-10 rounded-[40px] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <span className="material-symbols-outlined text-8xl text-white">public</span>
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl">🌎</span>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Internacional</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Acceso Global 24/7</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-indigo-500/30 transition-all">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-black text-xs">PP</div>
                      <div>
                        <p className="font-bold text-white text-xs md:text-sm">PayPal</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Visa / Mastercard</p>
                      </div>
                    </div>
                    <Link href="https://paypal.me/ProjectControlAI" target="_blank" className="text-[10px] font-black text-indigo-400 border border-indigo-400/30 px-3.5 py-1.5 rounded-full hover:bg-indigo-400/10 transition-all">
                      Pagar
                    </Link>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-orange-500/30 transition-all">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 font-black text-xs">HT</div>
                      <div>
                        <p className="font-bold text-white text-xs md:text-sm">Hotmart</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Checkout Seguro Multidivisa</p>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">Checkout en tarjeta</span>
                  </div>
                </div>
              </div>
            </div>
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
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href={`https://wa.me/51993147501?text=${encodeURIComponent(selectedVideo.whatsappMsg)}`}
                    target="_blank"
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Contactar por WhatsApp
                  </Link>
                  <Link
                    href="https://www.youtube.com/@ProjectControlAI"
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
