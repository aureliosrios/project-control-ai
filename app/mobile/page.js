import Image from "next/image";
import Link from "next/link";
import { consultoria } from "@/lib/oferta";

export const metadata = {
  title: "Project Control AI | Enlaces Oficiales (TikTok)",
  description: "Soluciones agénticas para construcción, consultoría técnica, capacitaciones sincrónicas y asincrónicas, y contacto directo con el Ing. Aurelio Solórzano.",
};

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center px-4 py-8 selection:bg-cyan-500/30 overflow-x-hidden relative">
      {/* Cyber Background Effects */}
      <div className="fixed inset-0 tech-grid pointer-events-none opacity-20" />
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent -z-10" />

      {/* Header Section */}
      <header className="relative mt-4 mb-6 flex flex-col items-center text-center">
        <Link href="/" className="group flex flex-col items-center">
          <div className="relative w-20 h-20 mb-3 p-1 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-emerald-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-slate-950 p-3 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full">
                <Image 
                  src="/images/logo.png" 
                  alt="Project Control AI Logo" 
                  fill 
                  sizes="80px"
                  className="object-contain" 
                />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase">
            Project Control AI
          </h1>
          <p className="text-cyan-400 text-[10px] font-mono font-bold tracking-[0.3em] uppercase mt-1">
            Soluciones Agénticas & Formación
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-black uppercase tracking-wider hover:bg-cyan-900/80 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <span className="material-symbols-outlined text-xs">open_in_new</span>
            <span>Ir a la Página Principal</span>
          </div>
        </Link>
      </header>

      {/* Profile Bio Card (Ing. Aurelio Solorzano) */}
      <section className="w-full max-w-md mb-6 px-1">
        <Link 
          href="https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20vengo%20de%20TikTok%20y%20necesito%20una%20consulta%20especializada."
          target="_blank"
          className="flex items-center gap-3.5 w-full bg-slate-950/80 backdrop-blur-xl p-3.5 rounded-2xl border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:border-cyan-400 hover:scale-[1.01] transition-all"
        >
          <div className="relative w-14 h-14 flex-shrink-0">
            <Image 
              src="/images/Aurelio Solorzano.png" 
              alt="Ing. Aurelio Solorzano" 
              fill 
              sizes="56px"
              className="rounded-full object-cover border-2 border-cyan-500 relative z-10" 
            />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#020617] rounded-full z-20 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <span className="block text-[9px] font-black text-cyan-400 uppercase tracking-widest">Consultor Principal</span>
            <span className="block text-base font-black text-white leading-tight truncate">Ing. Aurelio Solórzano Ríos</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Activo en WhatsApp
            </span>
          </div>
          <span className="material-symbols-outlined text-emerald-400 text-xl group-hover:translate-x-1 transition-transform">
            chat
          </span>
        </Link>
      </section>

      {/* Main Container Stack */}
      <main className="w-full max-w-md space-y-3.5 px-1">

        {/* Separador: Nuestros Servicios */}
        <div className="flex items-center gap-3 py-1">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyan-500/30" />
          <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.3em]">SERVICIOS DE INGENIERÍA & FORMACIÓN</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyan-500/30" />
        </div>

        {/* 1. CURSOS ASINCRÓNICOS (GRABADOS) */}
        <Link 
          href="/formacion?tab=asinc" 
          className="block w-full bg-slate-950/70 backdrop-blur-xl p-4 rounded-2xl border border-purple-500/30 hover:border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all group hover:scale-[1.01]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-2xl font-bold">play_lesson</span>
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-black text-white group-hover:text-purple-300 transition-colors uppercase tracking-tight">
                  Cursos Asincrónicos
                </span>
                <span className="text-[8px] font-mono font-bold text-purple-400 bg-purple-950 px-1.5 py-0.5 rounded border border-purple-800">
                  DESDE $5 USD
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                Aprende a tu propio ritmo: &quot;El Despertar&quot;, clases abiertas y másters.
              </p>
            </div>
            <span className="material-symbols-outlined text-slate-500 group-hover:text-purple-400 text-lg transition-colors">
              chevron_right
            </span>
          </div>
        </Link>

        {/* 2. CURSOS SINCRÓNICOS (EN VIVO) */}
        <Link 
          href="/formacion?tab=sinc" 
          className="block w-full bg-slate-950/70 backdrop-blur-xl p-4 rounded-2xl border border-emerald-500/30 hover:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all group hover:scale-[1.01]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-2xl font-bold">video_camera_front</span>
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors uppercase tracking-tight">
                  Cursos Sincrónicos
                </span>
                <span className="text-[8px] font-mono font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                  EN VIVO
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                Acompañamiento en directo paso a paso con el Ing. Aurelio Solórzano.
              </p>
            </div>
            <span className="material-symbols-outlined text-slate-500 group-hover:text-emerald-400 text-lg transition-colors">
              chevron_right
            </span>
          </div>
        </Link>

        {/* 3. SOLUCIONES AGÉNTICAS */}
        <Link 
          href="/servicios#agentes" 
          className="block w-full bg-slate-950/70 backdrop-blur-xl p-4 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all group hover:scale-[1.01]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-2xl font-bold">smart_toy</span>
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors uppercase tracking-tight">
                  Soluciones Agénticas
                </span>
                <span className="text-[8px] font-mono font-bold text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                  SEGUNDOS
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                Agentes de IA: Visor 4D/5D, APUs tipo S10, macros MS Project y EETT.
              </p>
            </div>
            <span className="material-symbols-outlined text-slate-500 group-hover:text-cyan-400 text-lg transition-colors">
              chevron_right
            </span>
          </div>
        </Link>

        {/* 4. CONSULTORÍAS */}
        <Link 
          href="/servicios#consultoria" 
          className="block w-full bg-slate-950/70 backdrop-blur-xl p-4 rounded-2xl border border-amber-500/30 hover:border-amber-400 shadow-[0_0_15px_rgba(217,119,6,0.1)] transition-all group hover:scale-[1.01]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-2xl font-bold">engineering</span>
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-black text-white group-hover:text-amber-300 transition-colors uppercase tracking-tight">
                  Consultorías
                </span>
                <span className="text-[8px] font-mono font-bold text-amber-400 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">
                  {consultoria.minutosGratis} MIN GRATIS
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                Planeamiento maestro, reclamos de ampliación, auditoría y peritajes.
              </p>
            </div>
            <span className="material-symbols-outlined text-slate-500 group-hover:text-amber-400 text-lg transition-colors">
              chevron_right
            </span>
          </div>
        </Link>

        {/* 5. BOTÓN PROMINENTE A LA WEB PRINCIPAL (ABRIR EN PESTAÑA O NAVEGACIÓN) */}
        <Link 
          href="/" 
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-r from-blue-900/60 via-slate-900 to-cyan-950/60 p-4 rounded-2xl border-2 border-cyan-400/50 hover:border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all group hover:scale-[1.02] text-center"
        >
          <div className="flex items-center justify-center gap-2 text-cyan-300 font-black text-xs uppercase tracking-widest mb-1">
            <span className="material-symbols-outlined text-base">open_in_new</span>
            Página Principal (Web Matriz)
          </div>
          <p className="text-[11px] text-slate-300 font-medium">
            Abrir en pestaña nueva: Manifiesto agéntico, comparativas y plataforma completa.
          </p>
        </Link>

        {/* Separador: Comunidad & Redes */}
        <div className="flex items-center gap-3 py-1 pt-3">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">COMUNIDAD Y REDES</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* 7. GRUPO GRATUITO DE WHATSAPP */}
        <Link 
          href="https://chat.whatsapp.com/H0lG0T5yLAVB0qGRBhpBsT" 
          target="_blank" 
          className="flex items-center gap-3.5 w-full bg-slate-950/50 p-3.5 rounded-xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <span className="material-symbols-outlined text-xl">group</span>
          </div>
          <div className="text-left flex-1 min-w-0">
            <span className="block text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
              Comunidad VIP de WhatsApp
            </span>
            <span className="block text-[10px] text-slate-400">Plantillas, scripts y novedades sin costo</span>
          </div>
          <span className="text-[9px] font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            GRATIS
          </span>
        </Link>

        {/* 8. CANAL DE YOUTUBE */}
        <Link 
          href="https://www.youtube.com/@aurelioalfonsosolorzanorios" 
          target="_blank" 
          className="flex items-center gap-3.5 w-full bg-slate-950/50 p-3.5 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0">
            <span className="material-symbols-outlined text-xl">subscriptions</span>
          </div>
          <div className="text-left flex-1 min-w-0">
            <span className="block text-xs font-bold text-white group-hover:text-red-300 transition-colors">
              Canal de YouTube Oficial
            </span>
            <span className="block text-[10px] text-slate-400">Masterclasses de ingeniería y tutoriales</span>
          </div>
          <span className="material-symbols-outlined text-slate-600 text-base group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </Link>

        {/* 9. TIKTOK */}
        <Link 
          href="https://vt.tiktok.com/ZSgyYmMFX/" 
          target="_blank" 
          className="flex items-center gap-3.5 w-full bg-slate-950/50 p-3.5 rounded-xl border border-pink-500/20 hover:border-pink-500/50 transition-all group"
        >
          <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 flex-shrink-0">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
            </svg>
          </div>
          <div className="text-left flex-1 min-w-0">
            <span className="block text-xs font-bold text-white group-hover:text-pink-300 transition-colors">
              TikTok Oficial (@project.control.a)
            </span>
            <span className="block text-[10px] text-slate-400">Demos y resultados finales en formato corto</span>
          </div>
          <span className="material-symbols-outlined text-slate-600 text-base group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </Link>
      </main>

      {/* Footer Minimalista */}
      <footer className="mt-12 pb-6 flex flex-col items-center text-center">
        <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
          © 2026 PROJECT CONTROL AI · TODOS LOS DERECHOS RESERVADOS
        </p>
      </footer>
    </div>
  );
}
