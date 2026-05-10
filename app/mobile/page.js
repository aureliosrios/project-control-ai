import Image from "next/image";
import Link from "next/link";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center px-6 py-10 selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Tech Effects */}
      <div className="fixed inset-0 tech-grid pointer-events-none opacity-30" />
      <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-cyan-500/10 to-transparent -z-10" />

      {/* Profile Header */}
      <div className="relative mt-10 mb-12 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-6 p-1 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600">
          <div className="w-full h-full rounded-full bg-[#020617] p-4 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-tighter text-white mb-2 text-center uppercase">Project Control AI</h1>
        <p className="text-cyan-400 text-[10px] font-black tracking-[0.5em] uppercase text-center">Engineering Intelligence Systems</p>
      </div>

      {/* VIP Consultant Card */}
      <div className="w-full max-w-sm mb-12">
        <Link 
          href="https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20vengo%20de%20TikTok%20y%20necesito%20una%20consulta%20especializada."
          target="_blank"
          className="flex items-center gap-5 w-full glass-panel p-5 rounded-[2.5rem] border-cyan-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)] group hover:scale-[1.03] transition-all active:scale-95"
        >
          <div className="relative w-20 h-20 flex-shrink-0">
            <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
            <Image src="/images/Aurelio Solorzano.png" alt="Ing. Aurelio" fill className="rounded-full object-cover border-2 border-cyan-500 relative z-10" />
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-[#020617] rounded-full z-20" />
          </div>
          <div className="text-left">
            <span className="block text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-1">Lead AI Consultant</span>
            <span className="block text-xl font-black text-white leading-none">Ing. Aurelio <br /> Solorzano Rios</span>
          </div>
          <span className="ml-auto material-symbols-outlined text-cyan-500 text-3xl group-hover:translate-x-1 transition-transform">bolt</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="w-full max-w-sm space-y-5">
        <div className="flex items-center gap-4 py-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Main Access</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        <Link href="/formacion" className="block w-full glass-panel p-7 rounded-3xl border-white/10 hover:border-cyan-500/50 transition-all text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="block text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-2">Academy</span>
          <span className="block text-2xl font-black text-white tracking-tighter">EXPLORAR CURSOS</span>
        </Link>

        <Link href="/" className="block w-full glass-panel p-7 rounded-3xl border-white/10 hover:border-blue-500/50 transition-all text-center group">
          <span className="block text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Global System</span>
          <span className="block text-2xl font-black text-white tracking-tighter">WEB PRINCIPAL</span>
        </Link>

        {/* Secondary Links */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Link href="https://www.linkedin.com/company/112620972/" target="_blank" className="flex items-center justify-center p-5 glass-panel rounded-3xl border-[#0077b5]/20 text-[#0077b5] hover:bg-[#0077b5]/5 transition-all">
            <Image src="/images/Logotipo.png" alt="In" width={24} height={24} className="opacity-70 group-hover:opacity-100" />
          </Link>
          <Link href="https://chat.whatsapp.com/H0lG0T5yLAVB0qGRBhpBsT" target="_blank" className="flex items-center justify-center p-5 glass-panel rounded-3xl border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/5 transition-all">
            <span className="material-symbols-outlined text-2xl">group</span>
          </Link>
        </div>
      </div>

      {/* Footer Version */}
      <footer className="mt-24 pb-10">
        <p className="text-[9px] font-mono text-slate-700 tracking-[0.5em] uppercase text-center">
          PCAI_MOBILE_ENDPOINT_STABLE_V5
        </p>
      </footer>
    </div>
  );
}
