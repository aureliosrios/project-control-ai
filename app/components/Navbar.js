"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [formacionOpen, setFormacionOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] border-b border-white/10 bg-[#020617]/90 backdrop-blur-2xl">
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
            <Link href="/servicios" className="hover:text-cyan-400 transition-colors">
              Servicios de Ingeniería
            </Link>

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
                    href="/formacion?tab=sinc"
                    className="p-3 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 group/item"
                  >
                    <span className="material-symbols-outlined text-emerald-400 text-xl mt-0.5">video_camera_front</span>
                    <div>
                      <span className="block text-xs font-black text-white group-hover/item:text-emerald-300 transition-colors uppercase">
                        Cursos en Vivo
                      </span>
                      <span className="block text-[10px] text-slate-400 font-medium normal-case">
                        Capacitaciones sincrónicas con mentoría directa
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/formacion?tab=asinc"
                    className="p-3 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 group/item"
                  >
                    <span className="material-symbols-outlined text-purple-400 text-xl mt-0.5">play_lesson</span>
                    <div>
                      <span className="block text-xs font-black text-white group-hover/item:text-purple-300 transition-colors uppercase">
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

            <Link href="/portal" className="text-white hover:text-cyan-400 transition-colors border-l border-white/10 pl-8">
              Portal Alumno
            </Link>
          </div>
          <Link href="/inscripcion" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
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
        <div id="menu-movil" className="lg:hidden absolute top-full left-0 w-full bg-[#020617] border-b border-white/10 p-8 flex flex-col gap-5 animate-in slide-in-from-top duration-300">
          <Link href="/servicios" onClick={() => setIsOpen(false)} className="text-lg font-black text-white uppercase tracking-tighter">
            Servicios de Ingeniería
          </Link>

          <div className="space-y-3 border-l-2 border-cyan-500/40 pl-4 py-1">
            <span className="text-xs font-mono font-black text-cyan-400 uppercase tracking-widest block">
              Formación
            </span>
            <Link
              href="/formacion?tab=sinc"
              onClick={() => setIsOpen(false)}
              className="block text-sm font-bold text-slate-200 hover:text-white"
            >
              • Capacitación Sincrónica (En Vivo)
            </Link>
            <Link
              href="/formacion?tab=asinc"
              onClick={() => setIsOpen(false)}
              className="block text-sm font-bold text-slate-200 hover:text-white"
            >
              • Capacitación Asincrónica (Grabada)
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
