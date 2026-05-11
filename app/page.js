import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#020617] overflow-hidden">
      {/* Fondo Dinámico NASA-Punk */}
      <div className="absolute inset-0 tech-grid pointer-events-none opacity-50" />
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-600/10 blur-[180px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-20%] w-[800px] h-[800px] bg-blue-900/10 blur-[180px] rounded-full" />

      {/* Contenido Principal */}
      <main className="relative z-10 pt-40 pb-32 px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full glass-panel border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              Operational Intelligence System v5.2
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase">
                INGENIERÍA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">AUMENTADA</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-400 font-light max-w-xl leading-relaxed">
                Eliminamos el <span className="text-white font-bold italic text-cyan-400">70% del trabajo manual</span> en proyectos de construcción mediante Agentes de IA y automatización operativa.
              </p>
            </div>

            <div className="flex flex-col sm:row gap-6">
              <Link href="https://wa.me/51993147501" target="_blank" className="neon-button text-sm uppercase tracking-widest text-center py-6 px-10">
                Agendar Diagnóstico Operativo
              </Link>
              <Link href="/consultoria" className="px-10 py-6 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest">
                Ver Soluciones B2B
                <span className="material-symbols-outlined text-sm">bolt</span>
              </Link>
            </div>

            {/* Métricas de Impacto Real */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-16 border-t border-white/10">
              <div className="space-y-2">
                <p className="text-4xl font-black text-white">70%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-tight">Reducción de Burocracia Digital</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-black text-white">Real-Time</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-tight">Control de Plazos y Costos</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-black text-white">0%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-tight">Ceguera Contractual</p>
              </div>
            </div>
          </div>

          {/* Panel de Visualización de Datos */}
          <div className="relative hidden lg:block animate-tech-float">
            <div className="glass-panel p-1 border-white/10 rounded-[48px]">
              <div className="bg-[#0f172a] rounded-[44px] p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-cyan-500/60 tracking-widest uppercase">System Status: Monitoring</span>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="p-8 rounded-3xl bg-[#020617] border border-white/5 space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Contractual Alert</p>
                        <p className="text-2xl font-black text-white">Hito Próximo: 72h</p>
                      </div>
                      <span className="text-cyan-400 text-xs font-bold tracking-widest">ACTIVO</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full w-[85%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[10px] text-slate-500 font-black uppercase mb-2">CPI (Cost)</p>
                      <p className="text-2xl font-black text-white text-green-400">1.04</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[10px] text-slate-500 font-black uppercase mb-2">SPI (Schedule)</p>
                      <p className="text-2xl font-black text-white text-orange-400">0.98</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Áreas de Impacto Estratégico */}
        <section className="mt-48 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              title: "Control de Proyectos", 
              desc: "Sincronización P6 & Lookahead automática. Reportabilidad en tiempo real desde el frente de obra.",
              icon: "analytics"
            },
            { 
              title: "Gestión Contractual", 
              desc: "Agentes de IA que analizan adendas y alertan hitos críticos para evitar penalidades.",
              icon: "gavel"
            },
            { 
              title: "Calidad y HSE", 
              desc: "Digitalización total de flujos de seguridad y calidad con dashboards de cumplimiento auditables.",
              icon: "verified_user"
            },
            { 
              title: "Licitaciones IA", 
              desc: "Estandarización y análisis inteligente de propuestas económicas para ganar más contratos.",
              icon: "contract"
            }
          ].map((f, i) => (
            <div key={i} className="glass-panel p-8 rounded-[32px] group hover:border-cyan-500/30 transition-all hover:-translate-y-2">
              <span className="material-symbols-outlined text-4xl text-cyan-500 mb-6 block group-hover:scale-110 transition-transform">{f.icon}</span>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tighter">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* Declaración de Misión */}
        <div className="mt-48 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
            "Democraticemos la programación para que el ingeniero vuelva a hacer ingeniería."
          </h2>
          <p className="text-slate-400 text-xl font-light italic">
            No instalamos software genérico. Desplegamos sistemas agénticos que operan bajo tu lógica de negocio.
          </p>
          <div className="pt-8">
            <Link href="/formacion" className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-[10px] hover:text-white transition-colors border-b border-cyan-400/30 pb-2">
              Conoce nuestro programa de Formación Élite →
            </Link>
          </div>
        </div>

        {/* Versión del Sistema */}
        <div className="mt-32 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-mono text-slate-700 tracking-[0.8em] uppercase">
            PCAI_SYSTEM_V.5.2_OPERATIONAL_STABLE
          </p>
        </div>
      </main>
    </div>
  );
}
