import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
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
            <Link href="/clases-grabadas" className="hover:text-cyan-400 transition-colors">Grabaciones</Link>
          </div>
          <Link href="/inscripcion" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            Inscripción
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button className="md:hidden text-cyan-400">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>
    </nav>
  );
}
