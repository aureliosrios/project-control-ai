"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] border-b border-white/10 bg-[#020617]/90 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 transition-transform group-hover:scale-110">
            <Image src="/images/logo.png" alt="PCAI Logo" fill className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white leading-none">PROJECT CONTROL AI</span>
            <span className="text-[10px] text-cyan-400 tracking-[0.4em] uppercase font-bold mt-1">Industrial Systems</span>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <Link href="/formacion" className="hover:text-cyan-400 transition-colors">Formación</Link>
            <Link href="/consultoria" className="hover:text-cyan-400 transition-colors">Consultoría</Link>
            <Link href="/recursos" className="hover:text-cyan-400 transition-colors">Recursos</Link>
          </div>
          <Link href="/inscripcion" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            Inscripción
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button 
          className="md:hidden text-cyan-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#020617] border-b border-white/10 p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <Link href="/formacion" onClick={() => setIsOpen(false)} className="text-lg font-black text-white uppercase tracking-tighter">Formación</Link>
          <Link href="/consultoria" onClick={() => setIsOpen(false)} className="text-lg font-black text-white uppercase tracking-tighter">Consultoría</Link>
          <Link href="/recursos" onClick={() => setIsOpen(false)} className="text-lg font-black text-white uppercase tracking-tighter">Recursos</Link>
          <Link href="/inscripcion" onClick={() => setIsOpen(false)} className="bg-cyan-500 text-slate-950 px-6 py-4 rounded-xl font-black text-center uppercase tracking-widest text-xs">
            Inscripción
          </Link>
        </div>
      )}
    </nav>
  );
}
