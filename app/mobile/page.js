import Image from "next/image";
import Link from "next/link";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center px-6 py-12 selection:bg-cyan-500/30">
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-20" />
      <div className="absolute top-0 w-full h-64 bg-cyan-500/10 blur-[100px] -z-10" />

      {/* Profile Section */}
      <div className="relative w-24 h-24 mb-4 mt-8">
        <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
      </div>
      <h1 className="text-2xl font-bold text-white tracking-tighter mb-1">PROJECT CONTROL AI</h1>
      <p className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-12">Especialización en Ingeniería & IA</p>

      {/* Main CTA: Consultant Profile */}
      <div className="w-full max-w-sm mb-10">
        <Link 
          href="https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20necesito%20una%20consulta%20directa%20sobre%20sus%20servicios%20y%20cursos."
          target="_blank"
          className="flex items-center gap-4 w-full bg-white text-slate-950 p-4 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-[1.02] transition-all active:scale-95"
        >
          <div className="relative w-14 h-14 flex-shrink-0">
            <Image src="/images/Aurelio Solorzano.png" alt="Ing. Aurelio" fill className="rounded-full object-cover border-2 border-slate-950" />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div className="text-left">
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ing. Aurelio Solorzano Rios</span>
            <span className="block text-sm font-bold">Consultoría & Mentoría IA</span>
          </div>
          <span className="ml-auto text-xl">📲</span>
        </Link>
      </div>

      {/* Course Categories */}
      <div className="w-full max-w-sm space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Catálogo de Formación</span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        <Link href="/formacion" className="block w-full glass-card p-6 rounded-2xl border-cyan-500/30 hover:border-cyan-500 transition-all text-center group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-4xl">live_tv</span>
          </div>
          <span className="block text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Próximos Inicios</span>
          <span className="block text-xl font-bold text-white">Cursos en Vivo</span>
        </Link>

        <Link href="/formacion" className="block w-full glass-card p-6 rounded-2xl border-orange-500/30 hover:border-orange-500 transition-all text-center group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-4xl text-orange-400">school</span>
          </div>
          <span className="block text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">A tu propio ritmo</span>
          <span className="block text-xl font-bold text-white">Cursos Grabados</span>
        </Link>
      </div>

      {/* Community Links */}
      <div className="w-full max-w-sm mt-12 space-y-3">
        <Link href="https://www.linkedin.com/company/112620972/" target="_blank" className="flex items-center justify-center gap-2 w-full bg-[#0077b5]/10 border border-[#0077b5]/30 text-[#0077b5] rounded-2xl py-4 text-xs font-bold uppercase tracking-widest">
          💼 LinkedIn | Project Control AI
        </Link>
        <Link href="https://chat.whatsapp.com/H0lG0T5yLAVB0qGRBhpBsT" target="_blank" className="flex items-center justify-center gap-2 w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl py-4 text-xs font-bold uppercase tracking-widest">
          👥 Grupo de WhatsApp (Gratis)
        </Link>
        <Link href="/" className="flex items-center justify-center gap-2 w-full text-slate-500 text-[9px] font-bold uppercase tracking-widest hover:text-white transition-colors mt-8">
          🌐 Visitar Web Principal
        </Link>
      </div>
    </div>
  );
}
