"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import catalogo from "@/data/cursos.json";

const { asincronicos, sincronicos } = catalogo;

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
            <section className="p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-slate-900 via-[#0a1320] to-[#020617] border-2 border-slate-700/60 relative overflow-hidden shadow-[0_0_50px_rgba(30,41,59,0.3)]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[90px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 blur-[80px] pointer-events-none" />

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

                {/* 3 Pilares Clave */}
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
                    <p className="text-[11px] text-slate-400 mt-1">APUs en Excel, macros VBA en MS Project, .XER en P6 y EETT a Word.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center font-bold mb-3">
                      <span className="material-symbols-outlined text-[22px]">auto_fix_high</span>
                    </div>
                    <p className="text-xs font-black text-white uppercase tracking-wider">Frente al Software Rígido</p>
                    <p className="text-[11px] text-slate-400 mt-1">Agentes flexibles diseñados para el dinamismo de la obra.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Banner Dual: El Despertar ($5 USD) + Opción 100% Gratuita en YouTube */}
            <section className="space-y-6">
              {/* Caja de Paradigma */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">
                  <span className="material-symbols-outlined text-[22px]">psychology</span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-0.5">
                    ¿Por qué Agentes de Ingeniería?
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Los programas de software tradicionales son demasiado rígidos y requieren días de configuración manual. Estamos en la nueva era de los Agentes de Ingeniería: modelos especializados que procesan tus especificaciones y generan entregables listos para emitir.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Opción A: Curso El Despertar a solo $5 USD */}
                <div className="p-7 md:p-8 rounded-3xl bg-gradient-to-br from-[#121c2e] via-slate-900 to-[#0a1120] border-2 border-cyan-500/30 flex flex-col justify-between relative overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-cyan-500 text-slate-950">
                        CURSO OFICIAL HOTMART
                      </span>
                      <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30">
                        De $15 a $5 USD
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                      Curso &ldquo;El Despertar de la IA en la Gestión de Proyectos&rdquo;
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                      Si aún no sabes de agentes, este es el curso perfecto para empezar. Redujimos el precio inicial de <strong>$15.00 USD a solo $5.00 USD (a un tercio de precio)</strong> con la intención de que todos los profesionales de ingeniería puedan conocer cómo funcionan los agentes de IA.
                    </p>

                    <div className="flex items-baseline gap-3 mb-6 bg-black/40 p-3 rounded-2xl border border-white/5">
                      <span className="text-xs text-slate-500 line-through font-bold">Precio inicial: $15.00 USD</span>
                      <span className="text-2xl font-black text-cyan-400">Hoy: $5.00 USD</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Acceso vitalicio 24/7</span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                    <Link
                      href="https://pay.hotmart.com/I104938744G"
                      target="_blank"
                      className="py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(6,182,212,0.3)]"
                    >
                      <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
                      Comprar por $5 USD
                    </Link>
                    <Link
                      href="https://go.hotmart.com/I104938744G?dp=1"
                      target="_blank"
                      className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">description</span>
                      Temario PDF
                    </Link>
                  </div>
                </div>

                {/* Opción B: Opción 100% Gratuita en YouTube (2 Cursos Maestros) */}
                <div className="p-7 md:p-8 rounded-3xl bg-gradient-to-br from-[#240e11] via-slate-900 to-[#120508] border-2 border-red-500/30 flex flex-col justify-between relative overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-red-600 text-white">
                        100% GRATUITO · YOUTUBE
                      </span>
                      <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded border border-red-500/30">
                        2 Clases Abiertas
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                      ¿Quieres algo gratuito? Míralo en YouTube
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                      Con estos dos cursos totalmente gratuitos podrás entender a fondo cómo funcionan los agentes y estarás listo para utilizar los Agentes de Ingeniería en tus proyectos:
                    </p>

                    {/* Las 2 Clases Gratuitas con enlace directo */}
                    <div className="space-y-2.5 mb-6">
                      {clasesGratuitasYouTube.map((clase) => (
                        <div
                          key={clase.id}
                          className="p-3 rounded-2xl bg-black/50 border border-white/5 hover:border-red-500/30 transition-all flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setSelectedVideo({ nombre: clase.titulo, duracionVideo: "Clase Completa", videoId: clase.id, entregable: "Bases y metodología completa para utilizar agentes de ingeniería." })}
                              className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all flex items-center justify-center shrink-0"
                              aria-label={`Reproducir ${clase.titulo}`}
                            >
                              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                            </button>
                            <div>
                              <h4 className="text-xs font-bold text-white group-hover:text-red-300 transition-colors line-clamp-1">
                                Clase {clase.num}: {clase.titulo}
                              </h4>
                              <p className="text-[10px] text-slate-400 line-clamp-1">{clase.desc}</p>
                            </div>
                          </div>

                          <Link
                            href={clase.url}
                            target="_blank"
                            className="text-[10px] font-bold text-red-400 hover:text-white uppercase tracking-wider shrink-0 flex items-center gap-0.5 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20"
                          >
                            <span>Ver en YouTube</span>
                            <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <span className="material-symbols-outlined text-sm text-red-400">check_circle</span>
                      Listos para ver hoy mismo
                    </span>
                    <Link
                      href="https://www.youtube.com/@ProjectControlAI"
                      target="_blank"
                      className="text-red-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Canal Oficial YouTube</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Catálogo: Abanico de Agentes en Gris (Próximamente) */}
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    ABANICO DE AGENTES
                  </span>
                  <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Próximamente · Liberación Progresiva
                  </span>
                </div>

                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                  Abanico de Agentes de Ingeniería
                </h2>
                <p className="text-slate-400 font-light text-sm max-w-3xl mt-1 leading-relaxed">
                  Iremos colgando en YouTube uno a uno los videotutoriales y demostraciones de los agentes que se tienen preparados para la venta. Revisa las capacidades de cada agente y únete a la lista de espera para ser el primero en implementarlo:
                </p>
              </div>

              {/* Grid en Tono Gris Técnico */}
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
                      {/* Header de Tarjeta */}
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

                      {/* El Reto vs La Solución */}
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

                    {/* Acciones de la Tarjeta */}
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

            {/* 4. Cierre y Llamado a la Acción Global */}
            <section className="p-8 md:p-12 rounded-[40px] bg-slate-900/80 border border-slate-800 text-center relative overflow-hidden">
              <div className="max-w-2xl mx-auto space-y-4">
                <span className="text-cyan-400 text-xs font-black tracking-[0.3em] uppercase block">
                  Era de los Agentes de Ingeniería
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                  Iremos publicando los agentes uno a uno en YouTube
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Suscríbete a nuestro canal oficial para no perderte cada lanzamiento. Si necesitas un agente a medida para tu empresa o proyecto, conversemos directamente por WhatsApp.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <Link
                    href="https://www.youtube.com/@aurelioalfonsosolorzanorios"
                    target="_blank"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                  >
                    <span className="material-symbols-outlined text-base">subscriptions</span>
                    Ir al Canal de YouTube
                  </Link>
                  <Link
                    href="https://wa.me/51993147501?text=Hola%20Aurelio,%20deseo%20estar%20al%20tanto%20del%20lanzamiento%20de%20los%20Agentes%20de%20Ingenier%C3%ADa."
                    target="_blank"
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    Contactar por WhatsApp (+51 993 147 501)
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
                          {curso.id === "A1" && (
                            <span className="text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider bg-cyan-400 text-slate-950 shadow-md">
                              OFERTA $5 USD
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
                          {curso.id === "A1" ? (
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-slate-500 line-through font-bold">$14.99 USD</span>
                                <span className="text-2xl font-black text-cyan-400 tracking-tight">$5.00 USD</span>
                              </div>
                              <span className="text-[9px] text-cyan-300 font-bold uppercase tracking-wider block">Reducido de $15 a $5 USD</span>
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
                            curso.id === "A1"
                              ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-[0_4px_14px_rgba(6,182,212,0.4)]"
                              : rutaInfo.btnPrimary
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">shopping_cart</span>
                          {curso.id === "A1" ? "Comprar ($5)" : "Comprar"}
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
