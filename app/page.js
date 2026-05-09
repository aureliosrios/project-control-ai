import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#020617] overflow-hidden">
      {/* Background Technical Elements */}
      <div className="absolute inset-0 cyber-grid pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />

      {/* Hero Section */}
      <main className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-[0.3em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Industrial AI Systems v4.0
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter">
              CONTROL DE <br />
              <span className="text-gradient">PROYECTOS</span> <br />
              <span className="text-slate-600 italic">AUMENTADO</span>
            </h1>

            <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-light">
              Democraticemos la programación. Implementamos agentes de IA autónomos que gestionan el <span className="text-cyan-400 font-medium italic">costo, plazo y calidad</span> de tus obras mientras tú duermes.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link href="/formacion" className="group relative px-10 py-5 bg-cyan-500 text-slate-950 rounded-2xl font-black text-xl hover:bg-cyan-400 transition-all shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 overflow-hidden">
                <span className="relative z-10">EXPLORAR ACADEMY</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
              <Link href="/consultoria" className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xl hover:bg-white/10 transition-all backdrop-blur-md">
                DIAGNÓSTICO
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5">
              <div>
                <p className="text-3xl font-black text-white">40%</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">+ ROI Operativo</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">0.02s</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Latencia de Alertas</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">100%</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Data Auditada</p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative lg:block hidden animate-float">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[120px] rounded-full" />
            <div className="glass-card p-12 rounded-[40px] border-white/10 relative z-10 rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-2 bg-cyan-500 rounded-full" />
                  <div className="w-4 h-4 rounded-full bg-white/10" />
                </div>
                <div className="h-64 bg-slate-800/50 rounded-3xl border border-white/5 relative overflow-hidden">
                  {/* Mock Chart lines */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="100%" height="100%" className="opacity-30">
                      <path d="M0 100 Q 50 20, 100 80 T 200 40" stroke="cyan" fill="transparent" strokeWidth="2" />
                      <path d="M0 120 Q 80 50, 150 100 T 300 60" stroke="#f4630f" fill="transparent" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4 text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Live Forensics</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Costo (AC)</p>
                    <p className="text-xl font-bold text-white tracking-tight">$1.2M</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">SPI / CPI</p>
                    <p className="text-xl font-bold text-emerald-400 tracking-tight">1.05 / 0.98</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Sections */}
        <section className="mt-40 grid md:grid-cols-3 gap-12">
          {[
            { title: "Control de Costos", desc: "Monitoreo en tiempo real de valorizaciones y APUs con IA." },
            { title: "Ingeniería Forense", desc: "Auditoría automática de contratos y gestión de claims con Agentes." },
            { title: "Reportabilidad 4.0", desc: "Dashboards predictivos que se actualizan solos cada minuto." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-10 rounded-3xl group hover:border-cyan-500/40 transition-all">
              <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">analytics</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
