import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#020617] overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 tech-grid pointer-events-none opacity-50" />
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-600/10 blur-[180px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-20%] w-[800px] h-[800px] bg-blue-900/10 blur-[180px] rounded-full" />

      {/* Hero Content */}
      <main className="relative z-10 pt-40 pb-32 px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full glass-panel border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              Neural Engineering Systems v5.1
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-9xl font-black text-white leading-[0.8] tracking-tighter uppercase">
                INGENIERÍA <br />
                <span className="text-neon">AUMENTADA</span>
              </h1>
              <p className="text-lg md:text-2xl text-slate-400 font-light max-w-xl leading-relaxed">
                Reinventamos el <span className="text-white font-bold italic">Control de Proyectos</span> con Agentes de IA que operan en el núcleo de tus datos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/formacion" className="neon-button text-lg uppercase tracking-widest text-center py-6 px-10">
                Iniciar Formación
              </Link>
              <Link href="/consultoria" className="px-10 py-6 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest">
                Agendar Diagnóstico
                <span className="material-symbols-outlined text-sm">bolt</span>
              </Link>
            </div>

            {/* Industrial Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-16 border-t border-white/10 cyber-border">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <p className="text-5xl font-black text-white">+40%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Eficiencia Operativa</p>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <p className="text-5xl font-black text-white">0.05s</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Detección de Riesgos</p>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <p className="text-5xl font-black text-white">100%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Precisión Auditada</p>
              </div>
            </div>
          </div>

          {/* Visual Technical Panel */}
          <div className="relative hidden lg:block animate-tech-float">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[150px] rounded-full opacity-30" />
            <div className="glass-panel p-1 border-white/10 rounded-[48px]">
              <div className="bg-[#0f172a] rounded-[44px] p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                <div className="space-y-10">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-orange-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-500/60 tracking-widest uppercase">System Core Status: Active</span>
                  </div>
                  
                  <div className="h-72 bg-[#020617] rounded-3xl border border-white/5 relative group cursor-crosshair">
                    <div className="absolute inset-0 opacity-20 tech-grid scale-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 0 400 200" className="opacity-40">
                        <path d="M0 150 L50 120 L100 160 L150 100 L200 130 L250 80 L300 110 L350 50 L400 70" stroke="#00f2ff" fill="none" strokeWidth="3" className="animate-pulse" />
                        <path d="M0 170 L80 140 L160 180 L240 120 L320 150 L400 90" stroke="#f4630f" fill="none" strokeWidth="2" strokeDasharray="5,5" />
                      </svg>
                    </div>
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <p className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.2em]">Live Forensics Analysis</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-cyan-500/30 transition-all">
                      <p className="text-[10px] text-slate-500 font-black uppercase mb-2">Cost Performance (CPI)</p>
                      <p className="text-3xl font-black text-white">1.08 <span className="text-xs text-green-400 font-bold tracking-normal">+5%</span></p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-orange-500/30 transition-all">
                      <p className="text-[10px] text-slate-500 font-black uppercase mb-2">Schedule Variance (SV)</p>
                      <p className="text-3xl font-black text-white">-2d <span className="text-xs text-orange-400 font-bold tracking-normal">Alert</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Features */}
        <section className="mt-48 grid md:grid-cols-3 gap-12">
          {[
            { title: "Control Predictivo", desc: "Algoritmos de visión que detectan desviaciones antes de que ocurran." },
            { title: "Agentes Autónomos", desc: "Flujos de trabajo que reportan y alertan sin intervención humana." },
            { title: "Big Data In situ", desc: "Toma de decisiones basada en datos reales, no en supuestos." }
          ].map((f, i) => (
            <div key={i} className="glass-panel p-12 rounded-[32px] group hover:border-cyan-500/30 transition-all hover:-translate-y-2">
              <span className="material-symbols-outlined text-5xl text-cyan-500 mb-8 block group-hover:scale-110 transition-transform">database</span>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* Final System Version */}
        <div className="mt-32 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-mono text-slate-700 tracking-[0.8em] uppercase">
            PCAI_OS_KERNEL_STABLE_V.5.1.2_BUILD_2026
          </p>
        </div>
      </main>
    </div>
  );
}
