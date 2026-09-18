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
    destacadoBadge: "Empieza Aquí",
    badgeType: "primary",
    desc: "Genera 6 entregables ejecutivos de obra (reportes HTML, flujogramas en Mermaid, matrices CSV y formatos ATS/IPERC) a partir de datos técnicos, aplicando prompts estructurados sin necesidad de programar.",
    casoReal: "Implementación de reportes de supervisión diaria y matriz de riesgos de seguridad (ATS/IPERC) en frente de obra civil.",
    paraQuien: "Ingenieros residentes, supervisores de obra y asistentes técnicos.",
    entregable: "6 formatos listos para obra (HTML interactivo, Mermaid, CSV, ATS e IPERC).",
    nivel: "Básico (Sin código)",
    herramientas: "Claude, ChatGPT, Mermaid.js, HTML, CSV",
    incluye: "Prompts listos, plantillas de reporte y casos descargables.",
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
    destacadoBadge: "Gestión Contractual",
    badgeType: "neutral",
    desc: "Audita y extrae requisitos críticos de contratos de obra, bases y TDRs, detectando penalidades, riesgos de ampliación de plazo y checklists de movilización mediante NotebookLM y Gemini.",
    casoReal: "Auditoría forense de contrato de obra pública con bases técnicas y detección anticipada de penalidades e hitos contractuales.",
    paraQuien: "Administradores de contrato, jefes de oficina técnica y gerentes de proyecto.",
    entregable: "Matriz de riesgos contractuales, checklist de movilización y reporte forense.",
    nivel: "Básico - Intermedio",
    herramientas: "NotebookLM, Gemini, Google Workspace",
    incluye: "Prompts contractuales, matrices de penalidades y ejemplos de bases.",
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
    destacadoBadge: "Ruta Práctica (Paso 1)",
    badgeType: "featured",
    desc: "Transforma presupuestos y análisis de precios unitarios (APU) en un cronograma balanceado, definiendo trenes de trabajo, calculando rendimientos reales y nivelando cuadrillas con IA.",
    casoReal: "Presupuesto integral y balance de rendimientos de mano de obra en edificación multifamiliar para trenes continuos.",
    paraQuien: "Planificadores, jefes de producción e ingenieros de costos.",
    entregable: "Cálculo de rendimientos, dimensionamiento de cuadrillas y secuencia lógica de trenes.",
    nivel: "Intermedio",
    herramientas: "IA para análisis de APU, Excel de Productividad, Trenes de Trabajo",
    incluye: "Plantillas de balance de recursos, cálculo de duraciones y matriz de trenes.",
    link: "https://pay.hotmart.com/L106624764I",
    brochure: "https://go.hotmart.com/L106624764I?dp=1",
    color: "orange",
    pilares: ["Análisis de APU y Recursos", "Definición de Trenes de Trabajo", "Cálculo de Productividad", "Nivelación de Cuadrillas con IA"]
  },
  {
    id: "B2",
    nombre: "Automatización de Cronogramas de Obra con IA & MS Project",
    precio: "$14.99 USD",
    tag: "CURSO B2 · PUBLICADO",
    destacadoBadge: "Ruta Práctica (Paso 2)",
    badgeType: "featured",
    desc: "Convierte presupuestos de obra en PDF en una programación estructurada de MS Project con EDT, ruta crítica, duraciones y recursos cargados, mediante macros VBA generadas por IA.",
    casoReal: "Presupuestos en PDF de proyectos pesados (obras de túneles y central hidroeléctrica) convertidos a MS Project ejecutable.",
    paraQuien: "Ingenieros de planificación, control de proyectos y programadores de obra.",
    entregable: "Cronograma .mpp listo en MS Project con EDT, APUs y macro VBA (.bas) reutilizable.",
    nivel: "Intermedio",
    herramientas: "Antigravity IDE, MS Project, VBA (.bas), JSON",
    incluye: "Código de macro VBA, scripts de extracción de PDF y archivo .mpp base.",
    link: "https://pay.hotmart.com/O106954282N",
    brochure: "https://go.hotmart.com/O106954282N?dp=1",
    color: "emerald",
    pilares: [
      "Configuración de Antigravity IDE en Ingeniería Civil",
      "Generación de código VBA (.bas) sin saber programar",
      "Conversión de presupuestos PDF a JSON estructurado",
      "Casos Reales: Obras de Túneles y Central Hidroeléctrica",
      "Carga masiva de APUs, mano de obra, equipos y materiales"
    ]
  },
  {
    id: "B3",
    nombre: "Seguimiento y Control de Proyectos de Construcción con IA, Last Planner y MS Project",
    precio: "$19.99 USD",
    tag: "CURSO B3 · PUBLICADO",
    destacadoBadge: "Especialidad MS Project",
    badgeType: "software",
    diferenciador: "Especializado para equipos que gestionan con Microsoft Project y Last Planner System.",
    desc: "Monitorea y controla el avance físico y financiero integrando MS Project y Last Planner System (LPS). Automatiza métricas de Valor Ganado (EVM), curvas S vivas y confiabilidad semanal (PPC).",
    casoReal: "Control físico-financiero de obra con 4 cortes semanales de Valor Ganado (EVM) y reporte de confiabilidad PPC.",
    paraQuien: "Ingenieros de control de proyectos, planners y jefes de oficina técnica con MS Project.",
    entregable: "Modelo de control EVM en MS Project, Curvas S automatizadas y plantilla de Lookahead LPS.",
    nivel: "Intermedio - Avanzado",
    herramientas: "MS Project, Excel 365, Last Planner System (LPS), EVM",
    incluye: "Plantilla matricial de Lookahead, tablero de confiabilidad PPC y fórmulas EVM.",
    link: "https://pay.hotmart.com/H107475121N",
    brochure: "https://go.hotmart.com/H107475121N?dp=1",
    color: "rose",
    pilares: [
      "Control de Avance Físico y Financiero en MS Project",
      "Last Planner System (LPS, Lookahead y PPC)",
      "Curvas S y Métricas de Valor Ganado (EVM)",
      "Detección de Desviaciones con Agentes de IA"
    ]
  },
  {
    id: "B4",
    nombre: "Seguimiento y Control de Obras: Primavera P6 & Last Planner System",
    precio: "$19.99 USD",
    tag: "CURSO B4 · PUBLICADO",
    destacadoBadge: "Especialidad Primavera P6",
    badgeType: "software",
    diferenciador: "Especializado para grandes obras y organizaciones que estandarizan con Oracle Primavera P6 (.XER/.PLF).",
    desc: "Ejecuta el control integral de plazos y costos con Oracle Primavera P6 y Last Planner System. Incluye red CPM cerrada, cronograma dual (LB-0 vs Real), curvas S y Lookahead en 3 filas.",
    casoReal: "Edificio corporativo real de 6 pisos y 2 sótanos (128 partidas CPM cerradas sin lags negativos).",
    paraQuien: "Planners senior, directores de obra, consultores y contratistas que licitan con Primavera P6.",
    entregable: "Archivos .XER y .PLF saneados bajo estándar DCMA + Lookahead LPS matricial en Excel 365.",
    nivel: "Avanzado",
    herramientas: "Oracle Primavera P6, Excel 365 Matricial, JSON SSOT, LPS",
    incluye: "Archivos .XER multi-proyecto, layout .PLF, plantilla de Lookahead 3 filas y motor EVM.",
    link: "https://pay.hotmart.com/S107662854J",
    brochure: "https://go.hotmart.com/S107662854J?dp=1",
    color: "teal",
    pilares: [
      "Arquitectura de Datos SSOT en JSON",
      "Cronogramas Primavera P6 (.XER / .PLF) bajo DCMA",
      "Cronograma Dual y Doble Barra en Gantt (LB-0 vs Real)",
      "Conciliación Comercial y Valor Ganado (EVM, SPI, CPI)",
      "Lookahead LPS en 3 Filas en Excel 365 matricial",
      "Gobernanza Semanal Last Planner (WWP y Restricciones)"
    ]
  },
  {
    id: "C1",
    nombre: "Automatización de Presupuestos con IA",
    precio: "$15.99 USD",
    tag: "CURSO C1 · ESPECIALIDAD",
    destacadoBadge: "Especialidad Rentable (Paso 1)",
    badgeType: "profit",
    desc: "Automatiza la estructuración de presupuestos tipo S10 y análisis de precios unitarios (APU) conectando bases de datos de insumos, especificaciones técnicas y Python asistido por IA.",
    casoReal: "Presupuesto real de obra con base de insumos, rendimientos y cálculo automático de cuadrillas tipo S10.",
    paraQuien: "Ingenieros de costos, presupuestistas, cotizadores y consultores de licitaciones.",
    entregable: "Presupuesto tipo S10 estructurado, base de datos de insumos y scripts de automatización.",
    nivel: "Intermedio",
    herramientas: "Python, Pandas, S10 formato, IA para Costos",
    incluye: "Scripts de Python, plantilla de base de datos de costos y prompts de descomposición.",
    link: "https://pay.hotmart.com/H105703259M",
    brochure: "https://go.hotmart.com/H105703259M?dp=1",
    color: "indigo",
    pilares: ["Infraestructura Python", "IA para EETT y WBS", "Visión Artificial Planos", "SkillPro v4: Lógica APU"]
  },
  {
    id: "C2",
    nombre: "Generar EETT con agentes de AI",
    precio: "$15.99 USD",
    tag: "CURSO C2 · PUBLICADO",
    destacadoBadge: "Especialidad Rentable (Paso 2)",
    badgeType: "profit",
    desc: "Automatiza la redacción técnica y auditoría de Especificaciones Técnicas (EETT) a partir de planos, normativas y memorias, exportando entregables profesionales directos a Microsoft Word.",
    casoReal: "Elaboración de EETT completas de especialidades (estructuras, arquitectura e instalaciones) según normativa vigente.",
    paraQuien: "Ingenieros proyectistas, revisores de expedientes técnicos y personal de oficina técnica.",
    entregable: "Documento ejecutivo de EETT en Microsoft Word con formato institucional y normativa trazable.",
    nivel: "Intermedio",
    herramientas: "NotebookLM, Gemini, Microsoft Word, Agentes Especializados",
    incluye: "Biblioteca de prompts de EETT, índice de normativa técnica y plantilla Word profesional.",
    link: "https://pay.hotmart.com/D106788121M",
    brochure: "https://go.hotmart.com/D106788121M?dp=1",
    color: "purple",
    pilares: ["NotebookLM como Fuente de Verdad", "Índice Vectorial de Normativa", "Agentes y Skills Personalizadas", "Conversión a Word Profesional"]
  }
];

const rutasDecision = [
  {
    id: "r1",
    necesidad: "Empezar a usar IA en proyectos",
    cursoSugerido: "A1",
    codigo: "A1",
    nombreCurso: "El Despertar de la IA en la Gestión de Proyectos",
    beneficio: "Genera 6 entregables reales (HTML, Mermaid, ATS/IPERC) sin programar.",
    enfoque: "Primeros pasos en obra",
    color: "cyan"
  },
  {
    id: "r2",
    necesidad: "Analizar contratos y expedientes",
    cursoSugerido: "A2",
    codigo: "A2",
    nombreCurso: "Gestión de Documentos Contractuales",
    beneficio: "Auditoría forense de bases, penalidades y riesgos con NotebookLM.",
    enfoque: "Administración contractual",
    color: "amber"
  },
  {
    id: "r3",
    necesidad: "Pasar de presupuesto a cronograma",
    cursoSugerido: "B1",
    codigo: "B1 → B2",
    nombreCurso: "Planificación Nivelada (B1) y Automatización MS Project (B2)",
    beneficio: "Calcula productividades de cuadrillas y exporta a MS Project con macros VBA.",
    enfoque: "Ruta práctica de programación",
    color: "orange"
  },
  {
    id: "r4",
    necesidad: "Controlar avance, plazo y costo",
    cursoSugerido: "B3",
    codigo: "B3 o B4",
    nombreCurso: "B3 (con MS Project) o B4 (con Primavera P6)",
    beneficio: "Elige B3 para gestión con MS Project; elige B4 para Oracle Primavera P6 y Lookahead LPS.",
    enfoque: "Control de proyectos y EVM",
    color: "teal"
  },
  {
    id: "r5",
    necesidad: "Automatizar presupuestos y EETT",
    cursoSugerido: "C1",
    codigo: "C1 → C2",
    nombreCurso: "Presupuestos con Python (C1) y EETT con Agentes (C2)",
    beneficio: "Estructura APUs tipo S10 con IA y redacta especificaciones normadas en Word.",
    enfoque: "Especialidad de alta rentabilidad",
    color: "indigo"
  }
];

const sincronicos = [
  {
    id: "S1",
    nombre: "Agentes de IA: Presupuestos, EETT y Cronogramas",
    precio: "$100.00 USD",
    precioSoles: "S/. 300",
    tag: "CURSO 1 · MASTERCLASS",
    destacado: "Convocatoria Oficial Confirmada",
    desc: "Aprende a automatizar el flujo completo de obra con Agentes Autónomos (Antigravity, Codex), SkillsPro, Cerebro Digital en Obsidian, Presupuestos en Excel con fórmulas vivas y Cronogramas en MS Project con macros VBA (.bas).",
    casoReal: "Flujo integral de licitación y obra: del análisis de bases y APUs hasta la programación Gantt con agentes.",
    inicio: "Domingo 20 de Septiembre, 2026",
    fin: "Domingo 25 de Octubre, 2026",
    horario: "Todos los domingos · 3:00 PM – 6:00 PM",
    sesiones: "18h · 6 sesiones en vivo",
    link: "/inscripcion",
    brochure: "/brochures/Brochure_Agentes_IA_Presupuestos_EETT_Cronogramas.pdf",
    hotmart: "https://pay.hotmart.com/K104218834V",
    paypal: "https://paypal.me/ProjectControlAI",
    colorKey: "cyan",
    cerrado: false
  },
  {
    id: "S2",
    nombre: "Automatización de Obras con Agentes de IA (Ingeniería Aumentada)",
    precio: "$97.00 USD",
    precioSoles: "S/. 300",
    tag: "CURSO 2 · AVANZADO",
    desc: "Domina la automatización avanzada con Python, HTML, VBA y Agentes Autónomos. Aprende a desarrollar Skills y Scripts MCP dentro de ecosistemas agénticos.",
    casoReal: "Orquestación local de scripts en obra civil y conexionado de bases de datos de control.",
    inicio: "28 de Junio, 2026",
    fin: "Domingo 26 de Julio, 2026",
    horario: "Domingos · 3:00 PM – 6:00 PM",
    sesiones: "15h · 5 sesiones",
    link: "/inscripcion",
    hotmart: "https://pay.hotmart.com/I104227016S",
    paypal: "https://paypal.me/ProjectControlAI",
    colorKey: "blue",
    cerrado: true
  },
  {
    id: "S3",
    nombre: "Licitaciones de Construcción con IA (Licitaciones Inteligentes)",
    precio: "$97.00 USD",
    precioSoles: "S/. 300",
    tag: "CURSO 3 · AVANZADO",
    desc: "Nivel Avanzado: Domina MCP, Skills y Scripts Python para automatizar APUs y cronogramas. Análisis masivo de expedientes técnicos de miles de páginas.",
    casoReal: "Auditoría masiva de bases integradas y expedientes de licitación de más de 2,000 páginas.",
    inicio: "29 de Junio, 2026",
    fin: "Lunes 13 de Julio, 2026",
    horario: "Lunes y Miércoles · 7:00 PM – 10:00 PM",
    sesiones: "15h · 5 sesiones",
    link: "/inscripcion",
    hotmart: "https://pay.hotmart.com/N104187999C",
    paypal: "https://paypal.me/ProjectControlAI",
    colorKey: "orange",
    cerrado: true
  }
];

const rutas = [
  {
    letra: "A",
    titulo: "Fundamentos Transversales",
    desc: "Herramientas de IA y análisis documental para todo profesional de la construcción.",
    cursos: [
      { codigo: "A1", nombre: "El Despertar de la IA en la Gestión de Proyectos", estado: "disponible" },
      { codigo: "A2", nombre: "Gestión de Documentos Contractuales", estado: "disponible" },
      { codigo: "A3", nombre: "Prompt Engineering Pro para Obras", estado: "proximamente" },
      { codigo: "A4", nombre: "Python for Construction Engineers", estado: "proximamente" }
    ]
  },
  {
    letra: "B",
    titulo: "Gestión y Control de Proyectos",
    desc: "De la estimación al cronograma ejecutable y control de avance físico-financiero.",
    cursos: [
      { codigo: "B1", nombre: "Planificación de Obras con IA: Presupuesto a Cronograma", estado: "disponible" },
      { codigo: "B2", nombre: "Automatización de Cronogramas con IA & MS Project", estado: "disponible" },
      { codigo: "B3", nombre: "Seguimiento y Control con IA, Last Planner & MS Project", estado: "disponible" },
      { codigo: "B4", nombre: "Seguimiento y Control con Primavera P6 & Last Planner", estado: "disponible" }
    ]
  },
  {
    letra: "C",
    titulo: "Especialidades de Ingeniería",
    desc: "Ingeniería de costos, formulación de EETT y agentes autónomos especializados.",
    cursos: [
      { codigo: "C1", nombre: "Automatización de Presupuestos con IA (Tipo S10)", estado: "disponible" },
      { codigo: "C2", nombre: "Generación de EETT con Agentes de IA a Word", estado: "disponible" },
      { codigo: "C3", nombre: "Auditoría Técnica y Forense de Expedientes", estado: "proximamente" },
      { codigo: "C4", nombre: "Ecosistemas de Agentes Autónomos y MCP", estado: "proximamente" }
    ]
  }
];

// Mapa estático de colores para Tailwind CSS en cursos asincrónicos
const themeMap = {
  A1: {
    border: "border-cyan-500/30 hover:border-cyan-500/60",
    glow: "bg-cyan-500/10",
    tagText: "text-cyan-400",
    badgeBg: "from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/40",
    badgeHighlight: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    btnBg: "bg-cyan-500 text-slate-950 hover:bg-cyan-400",
    btnShadow: "0 0 15px rgba(6, 182, 212, 0.4)",
    priceGlow: "text-cyan-400"
  },
  A2: {
    border: "border-amber-500/30 hover:border-amber-500/60",
    glow: "bg-amber-500/10",
    tagText: "text-amber-400",
    badgeBg: "from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/40",
    badgeHighlight: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    btnBg: "bg-amber-500 text-slate-950 hover:bg-amber-400",
    btnShadow: "0 0 15px rgba(245, 158, 11, 0.4)",
    priceGlow: "text-amber-400"
  },
  B1: {
    border: "border-orange-500/30 hover:border-orange-500/60",
    glow: "bg-orange-500/10",
    tagText: "text-orange-400",
    badgeBg: "from-orange-500/20 to-red-500/20 text-orange-300 border-orange-500/40",
    badgeHighlight: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    btnBg: "bg-orange-500 text-slate-950 hover:bg-orange-400",
    btnShadow: "0 0 15px rgba(249, 115, 22, 0.4)",
    priceGlow: "text-orange-400"
  },
  B2: {
    border: "border-emerald-500/30 hover:border-emerald-500/60",
    glow: "bg-emerald-500/10",
    tagText: "text-emerald-400",
    badgeBg: "from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40",
    badgeHighlight: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    btnBg: "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
    btnShadow: "0 0 15px rgba(16, 185, 129, 0.4)",
    priceGlow: "text-emerald-400"
  },
  B3: {
    border: "border-rose-500/30 hover:border-rose-500/60",
    glow: "bg-rose-500/10",
    tagText: "text-rose-400",
    badgeBg: "from-rose-500/20 to-red-500/20 text-rose-300 border-rose-500/40",
    badgeHighlight: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    btnBg: "bg-rose-500 text-slate-950 hover:bg-rose-400",
    btnShadow: "0 0 15px rgba(244, 63, 94, 0.4)",
    priceGlow: "text-rose-400"
  },
  B4: {
    border: "border-teal-500/30 hover:border-teal-500/60",
    glow: "bg-teal-500/10",
    tagText: "text-teal-400",
    badgeBg: "from-teal-500/20 to-emerald-500/20 text-teal-300 border-teal-500/40",
    badgeHighlight: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    btnBg: "bg-teal-500 text-slate-950 hover:bg-teal-400",
    btnShadow: "0 0 15px rgba(20, 184, 166, 0.4)",
    priceGlow: "text-teal-400"
  },
  C1: {
    border: "border-indigo-500/30 hover:border-indigo-500/60",
    glow: "bg-indigo-500/10",
    tagText: "text-indigo-400",
    badgeBg: "from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/40",
    badgeHighlight: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    btnBg: "bg-indigo-500 text-white hover:bg-indigo-400",
    btnShadow: "0 0 15px rgba(99, 102, 241, 0.4)",
    priceGlow: "text-indigo-400"
  },
  C2: {
    border: "border-purple-500/30 hover:border-purple-500/60",
    glow: "bg-purple-500/10",
    tagText: "text-purple-400",
    badgeBg: "from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/40",
    badgeHighlight: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    btnBg: "bg-purple-500 text-white hover:bg-purple-400",
    btnShadow: "0 0 15px rgba(168, 85, 247, 0.4)",
    priceGlow: "text-purple-400"
  }
};

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
  const [activeTab, setActiveTab] = useState("asinc");
  const [selectedRoute, setSelectedRoute] = useState(null);

  const scrollToCourse = (courseId) => {
    setSelectedRoute(courseId);
    const element = document.getElementById(`curso-${courseId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

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
            Automatiza presupuestos, cronogramas, EETT y control de obra con IA. Cursos prácticos para ingenieros y profesionales de construcción.
          </p>

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
        <div className="flex gap-4 mb-14 border-b border-white/10 pb-6">
          <button 
            onClick={() => setActiveTab("asinc")}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${activeTab === 'asinc' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.4)]' : 'bg-white/5 text-slate-500 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-sm">schedule</span>
            A tu ritmo (Asincrónico)
          </button>
          <button 
            onClick={() => setActiveTab("sinc")}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${activeTab === 'sinc' ? 'bg-orange-500 text-slate-950 shadow-[0_0_30px_rgba(244,99,15,0.4)]' : 'bg-white/5 text-slate-500 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-sm">sensors</span>
            En Vivo (Sincrónico)
          </button>
        </div>

        {activeTab === "asinc" ? (
          <div className="space-y-16">
            {/* Bloque: ¿Qué necesitas resolver? (Rutas de Decisión) */}
            <section className="p-8 md:p-10 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[90px] pointer-events-none" />
              
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-cyan-400 text-lg">alt_route</span>
                  <span className="text-cyan-400 text-xs font-black tracking-[0.25em] uppercase">Guía Rápida de Selección</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">¿Qué necesitas resolver hoy en obra?</h2>
                <p className="text-slate-400 text-sm max-w-2xl mt-1">
                  Encuentra directamente la ruta formativa basada en la necesidad técnica que buscas resolver:
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rutasDecision.map((rd) => (
                  <button
                    key={rd.id}
                    onClick={() => scrollToCourse(rd.cursoSugerido)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
                      selectedRoute === rd.cursoSugerido 
                        ? 'bg-cyan-500/15 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                        : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                          {rd.enfoque}
                        </span>
                        <span className="text-xs font-black text-white font-mono bg-white/10 px-2 py-0.5 rounded">
                          {rd.codigo}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {rd.necesidad}
                      </p>
                      <p className="text-xs text-slate-400 font-normal leading-relaxed mb-4">
                        {rd.beneficio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                      <span>Ver curso recomendado</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Listado de Tarjetas de Cursos Asincrónicos */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase block mb-1">Catálogo Activo · Hotmart</span>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Cursos Asincrónicos Disponibles</h2>
                  <p className="text-slate-400 font-light text-sm max-w-2xl mt-1">
                    Capacitación 100% práctica aplicada a casos reales de obra con archivos y soporte descargable.
                  </p>
                </div>
                {selectedRoute && (
                  <button 
                    onClick={() => setSelectedRoute(null)}
                    className="self-start md:self-auto text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20"
                  >
                    <span className="material-symbols-outlined text-sm">filter_alt_off</span>
                    Mostrar todos los cursos
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {asincronicos.map((curso) => {
                  const theme = themeMap[curso.id] || themeMap.A1;
                  const isHighlighted = selectedRoute === curso.id;

                  return (
                    <div 
                      key={curso.id} 
                      id={`curso-${curso.id}`}
                      className={`glass-panel p-6 rounded-3xl flex flex-col justify-between group transition-all duration-300 relative overflow-hidden bg-slate-900/70 backdrop-blur-xl border ${theme.border} ${
                        isHighlighted ? 'ring-2 ring-cyan-400 ring-offset-4 ring-offset-[#020617] scale-[1.01]' : ''
                      }`}
                    >
                      <div className={`absolute top-0 right-0 w-36 h-36 ${theme.glow} blur-[60px] pointer-events-none`} />
                      
                      <div>
                        {/* Cabecera con jerarquía comercial clara */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${theme.tagText}`}>
                            {curso.tag}
                          </span>
                          
                          {/* Badge de Jerarquía Comercial */}
                          {curso.destacadoBadge && (
                            <span className={`border text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 ${theme.badgeHighlight}`}>
                              <span className="material-symbols-outlined text-[12px]">verified</span>
                              {curso.destacadoBadge}
                            </span>
                          )}
                        </div>

                        {/* Título */}
                        <h3 className="text-base md:text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                          {curso.nombre}
                        </h3>

                        {/* Diferenciador explícito para B3 y B4 */}
                        {curso.diferenciador && (
                          <div className="mb-3 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-cyan-300 font-semibold flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-cyan-400">info</span>
                            <span>{curso.diferenciador}</span>
                          </div>
                        )}

                        {/* Descripción (Resultado + Contexto + Herramienta) */}
                        <p className="text-slate-300 font-normal text-xs mb-4 leading-relaxed">
                          {curso.desc}
                        </p>

                        {/* Ficha de Prueba de Valor y Caso Real */}
                        <div className="space-y-2 mb-5 p-3.5 rounded-2xl bg-black/40 border border-white/5 text-[11px]">
                          <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-amber-400 text-sm mt-0.5">apartment</span>
                            <div>
                              <span className="font-bold text-amber-300 block uppercase tracking-wider text-[9px]">Caso Real de Obra</span>
                              <span className="text-slate-300 leading-snug">{curso.casoReal}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <span className="text-slate-500 font-bold block uppercase tracking-wider text-[8px]">Para quién:</span>
                              <span className="text-slate-300 leading-tight block">{curso.paraQuien}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 font-bold block uppercase tracking-wider text-[8px]">Nivel:</span>
                              <span className="text-cyan-400 font-semibold">{curso.nivel}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/5">
                            <span className="text-slate-500 font-bold block uppercase tracking-wider text-[8px]">Entregable que te llevas:</span>
                            <span className="text-emerald-300 font-medium leading-snug">{curso.entregable}</span>
                          </div>

                          <div className="pt-1 text-[9px] text-slate-400">
                            <strong className="text-slate-300">Incluye:</strong> {curso.incluye}
                          </div>
                        </div>
                      </div>

                      {/* Footer de Tarjeta con Precios y Botones */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 mt-2">
                        <div className="flex flex-col">
                          <span className="text-2xl font-extrabold text-white tracking-tight">{curso.precio}</span>
                          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Pago Único · Hotmart</span>
                        </div>
                        <div className="flex gap-2">
                          <Link 
                            href={curso.brochure}
                            target="_blank"
                            className="px-3 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-semibold text-[10px] uppercase tracking-wider hover:bg-white/15 hover:text-white text-center transition-all flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[13px]">description</span>
                            Temario
                          </Link>
                          <Link 
                            href={curso.link} 
                            target="_blank" 
                            className={`px-4 py-2.5 ${theme.btnBg} rounded-xl font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-all text-center flex items-center gap-1`}
                            style={{
                              boxShadow: theme.btnShadow
                            }}
                          >
                            <span className="material-symbols-outlined text-[14px]">shopping_cart</span>
                            Comprar
                          </Link>
                        </div>
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
                      {ruta.cursos.map((c, i) => (
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
        ) : (
          <div className="space-y-16">
            {/* Cursos Sincrónicos: Convocatoria Oficial Abierta (Destacada) */}
            <div>
              <div className="mb-8">
                <span className="text-orange-400 text-[10px] font-black tracking-[0.3em] uppercase block mb-1">Clases en Vivo · Masterclass</span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Próxima Convocatoria Oficial</h2>
                <p className="text-slate-400 font-light text-sm max-w-2xl mt-1">
                  Capacitación intensiva en tiempo real con resolución de consultas, talleres interactivos y acompañamiento directo.
                </p>
              </div>

              {/* S1: Tarjeta Destacada de Convocatoria Abierta */}
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
                          <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-black text-white">{curso.precio}</span>
                            <span className="text-sm text-cyan-400 font-extrabold uppercase tracking-wider">{curso.precioSoles}</span>
                          </div>
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
                            href={curso.link} 
                            className="w-full py-3.5 bg-cyan-500 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                          >
                            <span className="material-symbols-outlined text-sm">how_to_reg</span>
                            Ficha de Inscripción
                          </Link>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <Link 
                              href={curso.hotmart} 
                              target="_blank"
                              className="py-2.5 bg-orange-500/10 border border-orange-500/30 rounded-xl text-[10px] font-black text-orange-400 uppercase tracking-wider hover:bg-orange-500/20 text-center transition-all"
                            >
                              Hotmart
                            </Link>
                            <Link 
                              href={curso.paypal} 
                              target="_blank"
                              className="py-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl text-[10px] font-black text-blue-400 uppercase tracking-wider hover:bg-blue-500/20 text-center transition-all"
                            >
                              PayPal
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

            {/* Ediciones Anteriores y Lista de Espera */}
            <div className="pt-8 border-t border-white/5">
              <div className="mb-6">
                <span className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase block mb-1">Historial Académico</span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Ediciones Anteriores y Lista de Espera</h3>
                <p className="text-slate-400 text-xs">
                  Estos programas completaron sus vacantes. Puedes unirte a la lista de espera para la siguiente edición.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {sincronicos.filter(c => c.cerrado).map((curso) => {
                  const theme = sincThemes[curso.colorKey] || sincThemes.orange;

                  return (
                    <div key={curso.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between opacity-85 hover:opacity-100 transition-all">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-[10px] font-black tracking-wider uppercase ${theme.tagText}`}>
                            {curso.tag}
                          </span>
                          <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Matrículas Cerradas
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
      </main>
    </div>
  );
}
