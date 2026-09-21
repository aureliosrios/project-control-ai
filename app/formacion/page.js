"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import catalogo from "@/data/cursos.json";

const { asincronicos, sincronicos } = catalogo;

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
      { codigo: "A3", nombre: "Prompt Engineering Pro para Obras", estado: "proximamente" },
      { codigo: "A4", nombre: "Python for Construction Engineers", estado: "proximamente" }
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
      { codigo: "C3", nombre: "Auditoría Técnica y Forense de Expedientes", estado: "proximamente" },
      { codigo: "C4", nombre: "Ecosistemas de Agentes Autónomos y MCP", estado: "proximamente" }
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
  const [activeTab, setActiveTab] = useState("asinc");
  const [selectedRuta, setSelectedRuta] = useState("TODAS");

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
        <div className="flex flex-col sm:flex-row gap-4 mb-14 border-b border-white/10 pb-6">
          <button
            aria-pressed={activeTab === "asinc"}
            onClick={() => setActiveTab("asinc")}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${activeTab === 'asinc' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.4)]' : 'bg-white/5 text-slate-500 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-sm">schedule</span>
            A tu ritmo (Asincrónico)
          </button>
          <button
            aria-pressed={activeTab === "sinc"}
            onClick={() => setActiveTab("sinc")}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${activeTab === 'sinc' ? 'bg-orange-500 text-slate-950 shadow-[0_0_30px_rgba(244,99,15,0.4)]' : 'bg-white/5 text-slate-500 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-sm">sensors</span>
            En Vivo (Sincrónico)
          </button>
        </div>

        {activeTab === "asinc" ? (
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
                          <div>
                            <span className="text-2xl font-black text-white tracking-tight">{curso.precio}</span>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Acceso 24/7</span>
                          </div>
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
                          className={`py-2.5 px-2 rounded-xl text-[11px] font-black uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 ${rutaInfo.btnPrimary}`}
                        >
                          <span className="material-symbols-outlined text-[14px]">shopping_cart</span>
                          Comprar
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
                          <div className="flex flex-wrap items-baseline gap-3">
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
