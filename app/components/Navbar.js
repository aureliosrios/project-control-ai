"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [formacionOpen, setFormacionOpen] = useState(false);

  const handleFormacionTab = (tab) => {
    setIsOpen(false);
    setFormacionOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("pcai-tab-change", { detail: tab }));
      if (window.location.pathname.startsWith("/formacion")) {
        const el = document.getElementById("catalogo-formacion");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const handleServiciosTab = (tab, hashTarget) => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("pcai-servicios-tab", { detail: { tab, hashTarget } }));
      if (window.location.pathname.startsWith("/servicios")) {
        const targetId = hashTarget || (tab === "agentes" ? "agentes" : "consultoria");
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 80);
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-[100] border-b border-white/10 bg-[#14161a]/90 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 transition-transform group-hover:scale-110">
            <Image src="/images/logo.png" alt="PCAI Logo" fill sizes="48px" className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-xl font-black tracking-tighter text-white leading-none">PROJECT CONTROL AI</span>
            <span className="text-[10px] text-cyan-400 tracking-[0.12em] uppercase font-bold mt-1">Servicios de Ingeniería & Formación</span>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Inicio
            </Link>

            {/* Dropdown Servicios de Ingeniería */}
            <div className="relative group">
              <Link 
                href="/servicios" 
                className="flex items-center gap-1 hover:text-cyan-400 transition-colors py-2 uppercase"
              >
                <span>Servicios</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
              </Link>
              
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="w-80 p-3 rounded-2xl bg-slate-950/95 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-1.5">
                  {/* 1. Soluciones Agénticas */}
                  <Link
                    href="/servicios?tab=agentes#agentes"
                    onClick={() => handleServiciosTab("agentes", "agentes")}
                    className="p-3 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 group/item border border-emerald-500/20 hover:border-emerald-500/50 bg-emerald-950/20"
                  >
                    <span className="material-symbols-outlined text-emerald-400 text-xl mt-0.5">smart_toy</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="block text-xs font-black text-white group-hover/item:text-emerald-300 transition-colors uppercase">
                          Soluciones Agénticas
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">IA</span>
                      </div>
                      <span className="block text-[10px] text-slate-400 font-medium normal-case mt-0.5">
                        Agentes especializados (4D/5D, presupuestos, cronogramas) con entregables en segundos
                      </span>
                    </div>
                  </Link>

                  {/* Subcabecera Consultoría */}
                  <div className="px-2 pt-2.5 pb-1 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                      Consultoría Especializada
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono font-medium">Asesoría Técnica</span>
                  </div>

                  {/* 2. 15 min gratis */}
                  <Link
                    href="/servicios?tab=consultoria#consultoria-gratis"
                    onClick={() => handleServiciosTab("consultoria", "consultoria-gratis")}
                    className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 group/item"
                  >
                    <span className="material-symbols-outlined text-cyan-400 text-lg mt-0.5">timer</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="block text-xs font-black text-white group-hover/item:text-cyan-300 transition-colors uppercase">
                          15 Minutos Gratis
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold">Sin costo</span>
                      </div>
                      <span className="block text-[10px] text-slate-400 font-medium normal-case">
                        Diagnóstico inicial y orientación técnica sobre tu caso
                      </span>
                    </div>
                  </Link>

                  {/* 3. Consultoría por Hora */}
                  <Link
                    href="/servicios?tab=consultoria#consultoria-hora"
                    onClick={() => handleServiciosTab("consultoria", "consultoria-hora")}
                    className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 group/item"
                  >
                    <span className="material-symbols-outlined text-amber-400 text-lg mt-0.5">hourglass_bottom</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="block text-xs font-black text-white group-hover/item:text-amber-300 transition-colors uppercase">
                          Consultoría por Hora
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">S/ 100 · $35</span>
                      </div>
                      <span className="block text-[10px] text-slate-400 font-medium normal-case">
                        Sesión 1 a 1 por videollamada para destrabe de proyectos
                      </span>
                    </div>
                  </Link>

                  {/* 4. Trabajos Puntuales (Por Proyecto) */}
                  <Link
                    href="/servicios?tab=consultoria#consultoria-proyecto"
                    onClick={() => handleServiciosTab("consultoria", "consultoria-proyecto")}
                    className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 group/item"
                  >
                    <span className="material-symbols-outlined text-indigo-400 text-lg mt-0.5">task</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="block text-xs font-black text-white group-hover/item:text-indigo-300 transition-colors uppercase">
                          Trabajos Puntuales
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-bold">A Medida</span>
                      </div>
                      <span className="block text-[10px] text-slate-400 font-medium normal-case">
                        Elaboración de cronogramas P6/MSP, presupuestos y peritajes
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Dropdown Formación */}
            <div className="relative group">
              <Link 
                href="/formacion" 
                className="flex items-center gap-1 hover:text-cyan-400 transition-colors py-2 uppercase"
              >
                <span>Formación</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
              </Link>
              
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="w-72 p-3 rounded-2xl bg-slate-950/95 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-1.5">
                  <Link
                    href="/formacion?tab=sinc#catalogo-formacion"
                    onClick={() => handleFormacionTab("sinc")}
                    className="p-3 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 group/item"
                  >
                    <span className="material-symbols-outlined text-orange-400 text-xl mt-0.5">sensors</span>
                    <div>
                      <span className="block text-xs font-black text-white group-hover/item:text-orange-400 transition-colors uppercase">
                        Cursos en Vivo
                      </span>
                      <span className="block text-[10px] text-slate-400 font-medium normal-case">
                        Capacitaciones sincrónicas con mentoría directa
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/formacion?tab=asinc#catalogo-formacion"
                    onClick={() => handleFormacionTab("asinc")}
                    className="p-3 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 group/item"
                  >
                    <span className="material-symbols-outlined text-cyan-400 text-xl mt-0.5">schedule</span>
                    <div>
                      <span className="block text-xs font-black text-white group-hover/item:text-cyan-300 transition-colors uppercase">
                        Cursos Grabados
                      </span>
                      <span className="block text-[10px] text-slate-400 font-medium normal-case">
                        Capacitaciones asincrónicas a tu propio ritmo
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Dropdown / Pestaña TikTok */}
            <div className="relative group">
              <Link 
                href="/mobile" 
                className="flex items-center gap-1.5 text-slate-300 hover:text-pink-400 transition-colors py-2 uppercase"
              >
                <svg className="w-3.5 h-3.5 fill-current text-pink-400" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                </svg>
                <span>TikTok</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
              </Link>
              
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="w-80 p-3 rounded-2xl bg-slate-950/95 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-1.5">
                  <Link
                    href="/mobile"
                    className="p-3 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 group/item border border-pink-500/30 hover:border-pink-500/60 bg-pink-950/20"
                  >
                    <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="block text-xs font-black text-white group-hover/item:text-pink-300 transition-colors uppercase">
                          Enlaces TikTok (Bio Móvil)
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 font-bold border border-pink-500/40">HUB</span>
                      </div>
                      <span className="block text-[10px] text-slate-400 font-medium normal-case mt-0.5">
                        Vista minimalista y rápida vinculada a nuestro canal de TikTok
                      </span>
                    </div>
                  </Link>

                  <div className="px-2 pt-2 pb-1 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                      Accesos Rápidos
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium">Desde el perfil</span>
                  </div>

                  <Link
                    href="https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20vengo%20de%20TikTok%20y%20necesito%20una%20consulta%20especializada."
                    target="_blank"
                    className="p-2 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 text-xs text-slate-200 hover:text-emerald-400"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold">WhatsApp: Ing. Aurelio Solórzano</span>
                  </Link>

                  <Link
                    href="/#enlaces-tiktok"
                    className="p-2 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 text-xs text-slate-200 hover:text-cyan-300"
                  >
                    <span className="material-symbols-outlined text-sm text-cyan-400">visibility</span>
                    <span>Ver sección TikTok en web principal</span>
                  </Link>

                  <Link
                    href="/mobile"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-center text-xs font-black text-cyan-300 uppercase tracking-wider border border-white/10 mt-1 transition-colors"
                  >
                    Abrir Hub Completo (/mobile) →
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/portal" className="text-white hover:text-cyan-400 transition-colors border-l border-white/10 pl-8">
              Portal Alumno
            </Link>
          </div>
          <Link href="/inscripcion" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,168,0,0.3)]">
            Inscripción
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button 
          className="lg:hidden text-cyan-400 p-2"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="menu-movil"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div id="menu-movil" className="lg:hidden absolute top-full left-0 w-full bg-[#14161a] border-b border-white/10 p-8 flex flex-col gap-5 animate-in slide-in-from-top duration-300 max-h-[85vh] overflow-y-auto">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-black text-white uppercase tracking-tighter">
            Inicio
          </Link>

          {/* Sección Servicios de Ingeniería Mobile */}
          <div className="space-y-2.5 border-l-2 border-emerald-500/40 pl-4 py-1">
            <Link
              href="/servicios"
              onClick={() => setIsOpen(false)}
              className="text-xs font-mono font-black text-emerald-400 uppercase tracking-widest block hover:text-white"
            >
              Servicios de Ingeniería
            </Link>
            <Link
              href="/servicios?tab=agentes#agentes"
              onClick={() => handleServiciosTab("agentes", "agentes")}
              className="block text-sm font-bold text-slate-200 hover:text-emerald-400 transition-colors"
            >
              • Soluciones Agénticas (IA)
            </Link>
            <Link
              href="/servicios?tab=consultoria#consultoria-gratis"
              onClick={() => handleServiciosTab("consultoria", "consultoria-gratis")}
              className="block text-sm font-bold text-slate-200 hover:text-cyan-300 transition-colors"
            >
              • Consultoría: 15 min gratis
            </Link>
            <Link
              href="/servicios?tab=consultoria#consultoria-hora"
              onClick={() => handleServiciosTab("consultoria", "consultoria-hora")}
              className="block text-sm font-bold text-slate-200 hover:text-amber-300 transition-colors"
            >
              • Consultoría por hora (S/ 100 / $35 USD)
            </Link>
            <Link
              href="/servicios?tab=consultoria#consultoria-proyecto"
              onClick={() => handleServiciosTab("consultoria", "consultoria-proyecto")}
              className="block text-sm font-bold text-slate-200 hover:text-indigo-300 transition-colors"
            >
              • Trabajos puntuales (Por proyecto)
            </Link>
          </div>

          {/* Sección Formación Mobile */}
          <div className="space-y-2.5 border-l-2 border-cyan-500/40 pl-4 py-1">
            <span className="text-xs font-mono font-black text-cyan-400 uppercase tracking-widest block">
              Formación
            </span>
            <Link
              href="/formacion?tab=sinc#catalogo-formacion"
              onClick={() => handleFormacionTab("sinc")}
              className="block text-sm font-bold text-slate-200 hover:text-orange-400 transition-colors"
            >
              • Capacitación Sincrónica (En Vivo)
            </Link>
            <Link
              href="/formacion?tab=asinc#catalogo-formacion"
              onClick={() => handleFormacionTab("asinc")}
              className="block text-sm font-bold text-slate-200 hover:text-cyan-300 transition-colors"
            >
              • Capacitación Asincrónica (Grabada)
            </Link>
          </div>

          {/* Sección TikTok Mobile */}
          <div className="space-y-2.5 border-l-2 border-pink-500/40 pl-4 py-1">
            <Link
              href="/mobile"
              onClick={() => setIsOpen(false)}
              className="text-xs font-mono font-black text-pink-400 uppercase tracking-widest block hover:text-white flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current text-pink-400" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
              </svg>
              Enlaces TikTok (Bio Móvil)
            </Link>
            <Link
              href="/mobile"
              onClick={() => setIsOpen(false)}
              className="block text-sm font-bold text-slate-200 hover:text-pink-300 transition-colors"
            >
              • Abrir Hub Minimalista (/mobile)
            </Link>
            <Link
              href="/#enlaces-tiktok"
              onClick={() => setIsOpen(false)}
              className="block text-sm font-bold text-slate-200 hover:text-cyan-300 transition-colors"
            >
              • Ver sección en la web principal
            </Link>
          </div>

          <Link href="/portal" onClick={() => setIsOpen(false)} className="text-lg font-black text-cyan-400 uppercase tracking-tighter">
            Portal Alumno
          </Link>
          <Link href="/inscripcion" onClick={() => setIsOpen(false)} className="bg-cyan-500 text-slate-950 px-6 py-4 rounded-xl font-black text-center uppercase tracking-widest text-xs">
            Inscripción
          </Link>
        </div>
      )}
    </nav>
  );
}
