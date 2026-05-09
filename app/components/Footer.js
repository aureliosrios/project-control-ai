import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6 bg-[#020617]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3 grayscale opacity-50">
          <Image src="/images/logo.png" alt="PCAI Logo" width={30} height={30} />
          <span className="text-sm font-bold tracking-tighter text-white">PROJECT CONTROL AI</span>
        </div>
        <p className="text-xs text-slate-500 font-mono text-center">
          © 2026 PROJECT CONTROL AI · Automatización de Proyectos con IA
        </p>
        <div className="flex gap-6 text-slate-500 text-xs font-medium uppercase tracking-widest">
          <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
          <Link href="#" className="hover:text-white transition-colors">Términos</Link>
          <Link href="https://wa.me/51993147501" target="_blank" className="hover:text-white transition-colors">Contacto</Link>
        </div>
      </div>
    </footer>
  );
}
