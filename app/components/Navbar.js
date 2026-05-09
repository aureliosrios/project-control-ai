import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image src="/images/logo.png" alt="PCAI Logo" fill className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tighter text-white">PROJECT CONTROL AI</span>
            <span className="text-[10px] text-cyan-400 tracking-[0.2em] uppercase font-medium">Academy & Consultoría</span>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="/formacion" className="hover:text-cyan-400 transition-colors">Formación</Link>
          <Link href="/consultoria" className="hover:text-cyan-400 transition-colors">Consultoría</Link>
          <Link href="/recursos" className="hover:text-cyan-400 transition-colors">Recursos</Link>
          <Link href="/clases-grabadas" className="hover:text-cyan-400 transition-colors">Clases Grabadas</Link>
          <Link href="/inscripcion" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            Inscripción
          </Link>
        </div>

        {/* Mobile menu simple trigger (placeholder) */}
        <div className="md:hidden text-cyan-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </div>
      </div>
    </nav>
  );
}
