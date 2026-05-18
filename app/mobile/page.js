import Image from "next/image";
import Link from "next/link";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center px-4 py-8 selection:bg-cyan-500/30 overflow-x-hidden relative">
      {/* Premium Cyber Background Effects */}
      <div className="fixed inset-0 tech-grid pointer-events-none opacity-20" />
      <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent -z-10" />
      <div className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] -z-10" />
      <div className="absolute top-80 -right-40 w-80 h-80 rounded-full bg-emerald-500/5 blur-[120px] -z-10" />

      {/* Header Section */}
      <header className="relative mt-8 mb-10 flex flex-col items-center">
        <div className="relative w-28 h-28 mb-5 p-1 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 shadow-[0_0_40px_rgba(6,182,212,0.25)] animate-pulse duration-[3000ms]">
          <div className="w-full h-full rounded-full bg-gradient-to-b from-slate-900 to-[#020617] p-4 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full">
              <Image 
                src="/images/logo.png" 
                alt="Project Control AI Logo" 
                fill 
                className="object-contain filter contrast-[1.1] brightness-[1.05]" 
                style={{
                  maskImage: 'radial-gradient(circle, black 65%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)'
                }}
              />
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-tighter text-white mb-2 text-center uppercase bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
          Project Control AI
        </h1>
        <p className="text-cyan-400 text-[9px] font-black tracking-[0.6em] uppercase text-center ml-[0.6em]">
          Engineering Intelligence Systems
        </p>
      </header>

      {/* Profile Bio Card (VIP Consultant) */}
      <section className="w-full max-w-md mb-8 px-2">
        <Link 
          href="https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20vengo%20de%20TikTok%20y%20necesito%20una%20consulta%20especializada."
          target="_blank"
          className="flex items-center gap-4 w-full bg-slate-950/60 backdrop-blur-xl p-4 rounded-[2rem] border border-cyan-500/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)] group hover:border-cyan-400/50 hover:scale-[1.02] transition-all duration-300 active:scale-95"
        >
          <div className="relative w-16 h-16 flex-shrink-0">
            <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
            <Image 
              src="/images/Aurelio Solorzano.png" 
              alt="Ing. Aurelio Solorzano" 
              fill 
              className="rounded-full object-cover border-2 border-cyan-500 relative z-10" 
            />
            <div className="absolute bottom-0 right-0 w-4.5 h-4.5 bg-emerald-500 border-2 border-[#020617] rounded-full z-20 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          </div>
          <div className="text-left">
            <span className="block text-[8px] font-black text-cyan-400 uppercase tracking-widest mb-0.5">Lead AI Consultant</span>
            <span className="block text-lg font-black text-white leading-tight">Ing. Aurelio Solorzano Rios</span>
            <span className="inline-flex items-center gap-1.5 mt-1 text-[9px] font-bold text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Activo en WhatsApp
            </span>
          </div>
          <span className="ml-auto material-symbols-outlined text-cyan-500 text-2xl group-hover:translate-x-1 group-hover:scale-110 transition-transform">
            bolt
          </span>
        </Link>
      </section>

      {/* Main Navigation Stack (Top 3 Priority Actions) */}
      <main className="w-full max-w-md space-y-6 px-2">
        
        {/* Separator - Priority 1 */}
        <div className="flex items-center gap-4 py-1">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-emerald-500/25" />
          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.4em]">PRIORIDAD #1 | COMUNIDAD</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-emerald-500/25" />
        </div>

        {/* 1. WHATSAPP COMMUNITY CARD (Highest Conversion) */}
        <Link 
          href="https://chat.whatsapp.com/H0lG0T5yLAVB0qGRBhpBsT" 
          target="_blank" 
          className="block w-full bg-[#070b14]/75 backdrop-blur-xl p-6 rounded-3xl border border-emerald-500/30 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] active:scale-95"
        >
          {/* Neon Glow Shift */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms]" />

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-2xl font-bold">group</span>
            </div>
            <div className="text-left">
              {/* Title with Inline Glowing Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xl font-black text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                  GRUPO DE WHATSAPP
                </span>
                <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-[#020617] text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.3)] inline-flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-slate-950 animate-ping" />
                  GRATIS
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Únete a nuestra comunidad. Recibe plantillas de control, scripts de Python y lecciones exclusivas sin costo.
              </p>
            </div>
          </div>
        </Link>

        {/* Separator - Priority 2 & 3 */}
        <div className="flex items-center gap-4 py-1 pt-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyan-500/25" />
          <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.4em]">SERVICIOS Y FORMACIÓN</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyan-500/25" />
        </div>

        {/* 2. ACADEMY CARD (Cyan glow) */}
        <Link 
          href="/formacion" 
          className="block w-full bg-[#070b14]/75 backdrop-blur-xl p-6 rounded-3xl border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.08)] hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms]" />

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-2xl font-bold">school</span>
            </div>
            <div className="text-left">
              {/* Title with Inline Glowing Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  EXPLORAR CURSOS
                </span>
                <span className="bg-gradient-to-r from-cyan-600 to-cyan-400 text-[#020617] text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  ACADEMIA
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Python para ingenieros, Primavera P6 con Inteligencia Artificial y agentes para control de proyectos.
              </p>
            </div>
          </div>
        </Link>

        {/* 3. CONSULTANCY CARD (Purple glow) */}
        <Link 
          href="/consultoria" 
          className="block w-full bg-[#070b14]/75 backdrop-blur-xl p-6 rounded-3xl border border-purple-500/30 hover:border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.08)] hover:shadow-[0_0_35px_rgba(139,92,246,0.25)] transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms]" />

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-2xl font-bold">psychology</span>
            </div>
            <div className="text-left">
              {/* Title with Inline Glowing Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xl font-black text-white tracking-tight group-hover:text-purple-300 transition-colors">
                  CONSULTORÍA IA
                </span>
                <span className="bg-gradient-to-r from-purple-600 to-purple-400 text-[#020617] text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                  B2B SYSTEMS
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Implementación de agentes autónomos y sistemas cognitivos a medida para constructoras y empresas.
              </p>
            </div>
          </div>
        </Link>

        {/* Separator - Secondary Access */}
        <div className="flex items-center gap-4 py-2 pt-6">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Enlaces Adicionales</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* 4. WEB PRINCIPAL (Portal) */}
        <Link 
          href="/" 
          className="flex items-center gap-4 w-full bg-slate-950/40 p-4 rounded-2xl border border-white/5 hover:border-blue-500/40 transition-all duration-300 group hover:scale-[1.01]"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform flex-shrink-0">
            <span className="material-symbols-outlined text-xl">language</span>
          </div>
          <div className="text-left">
            <span className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-0.5">Global System</span>
            <span className="block text-sm font-bold text-white group-hover:text-blue-300 transition-colors">WEB PRINCIPAL</span>
          </div>
          <span className="ml-auto material-symbols-outlined text-slate-600 text-lg group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </Link>

        {/* 5. LINKEDIN */}
        <Link 
          href="https://www.linkedin.com/company/112620972/" 
          target="_blank" 
          className="flex items-center gap-4 w-full bg-slate-950/40 p-4 rounded-2xl border border-white/5 hover:border-[#0077b5]/40 transition-all duration-300 group hover:scale-[1.01]"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0077b5]/5 border border-[#0077b5]/10 flex items-center justify-center text-[#0077b5] group-hover:scale-105 transition-transform flex-shrink-0 relative">
            <Image 
              src="/images/Logotipo.png" 
              alt="LinkedIn icon" 
              width={16} 
              height={16} 
              className="opacity-70 group-hover:opacity-100 filter brightness-[1.2]" 
            />
          </div>
          <div className="text-left">
            <span className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-0.5">LinkedIn</span>
            <span className="block text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">SÍGUENOS EN REDES</span>
          </div>
          <span className="ml-auto material-symbols-outlined text-slate-600 text-lg group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </Link>

      </main>

      {/* Premium Footer */}
      <footer className="mt-20 pb-8 flex flex-col items-center">
        <p className="text-[8px] font-mono text-slate-600 tracking-[0.5em] uppercase text-center ml-[0.5em]">
          PCAI_MOBILE_ENDPOINT_STABLE_V6
        </p>
      </footer>
    </div>
  );
}
