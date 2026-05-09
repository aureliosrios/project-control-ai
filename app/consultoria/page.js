import Link from "next/link";
import Image from "next/image";

export default function Consultoria() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-32 pb-20 selection:bg-cyan-500/30">
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-20" />
      
      <main className="relative max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(244,99,15,0.8)]"></span>
              Optimización Inteligente
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8">
              Automatización <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">a medida</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Eliminamos el error humano y aceleramos la toma de decisiones con flujos de trabajo autónomos diseñados específicamente para el sector constructor.
            </p>
            <Link 
              href="https://wa.me/51993147501?text=Hola,%20quiero%20agendar%20un%20diagn%C3%B3stico%20gratuito" 
              target="_blank"
              className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-400 transition-all shadow-[0_0_30px_rgba(244,99,15,0.3)] inline-flex items-center gap-3"
            >
              Agendar Diagnóstico Gratuito
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/10 blur-[120px] rounded-full" />
            <div className="glass-card p-8 rounded-3xl border-white/5 relative z-10">
              <div className="space-y-8">
                {[
                  { icon: "psychology", title: "Estrategia de Datos", desc: "Centralización de información crítica del proyecto." },
                  { icon: "robot_2", title: "Agentes IA", desc: "Automatización de reportes, análisis y alertas." },
                  { icon: "monitoring", title: "Control Predictivo EVM", desc: "Alertas preventivas de desviación de costo y plazo." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div>
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/30">
                    <Image src="/images/Aurelio Solorzano.png" alt="Aurelio" width={48} height={48} className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Eficiencia Comprobada</p>
                    <p className="text-xl font-bold text-white">+40% ROI promedio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { 
              title: "Automatización Express", 
              tag: "Starter", 
              icon: "build", 
              color: "cyan",
              desc: "Un proceso automatizado clave (cotización o reporte). Entrega en 2 semanas.",
              features: ["1 flujo clave automatizado", "Dashboard en Power BI", "Soporte técnico 30 días"]
            },
            { 
              title: "Control Inteligente Pyme", 
              tag: "Más Popular", 
              icon: "rocket_launch", 
              color: "orange",
              desc: "Automatización integral de tu operación. Entrega en 4 semanas.",
              features: ["Diagnóstico de flujos operativos", "Atención al cliente vía WhatsApp", "Dashboard con EVM completo"]
            },
            { 
              title: "Ecosistema Digital", 
              tag: "Premium", 
              icon: "hub", 
              color: "blue",
              desc: "Transformación digital completa con agentes de IA autónomos privados.",
              features: ["Auditoría forense de procesos", "Agentes de IA propios (Python/JS)", "Despliegue en servidor dedicado"]
            }
          ].map((pkg, i) => (
            <div key={i} className={`glass-card p-8 rounded-3xl border-white/5 hover:border-${pkg.color}-500/30 transition-all flex flex-col ${i === 1 ? 'md:scale-105 z-10 border-orange-500/20' : ''}`}>
              <div className="mb-6">
                <span className={`material-symbols-outlined text-4xl text-${pkg.color}-400 mb-4 block`}>{pkg.icon}</span>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-white">{pkg.title}</h3>
                  <span className={`bg-${pkg.color}-500/10 text-${pkg.color}-400 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase`}>{pkg.tag}</span>
                </div>
                <p className="text-slate-400 text-sm">{pkg.desc}</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-slate-300">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className={`text-${pkg.color}-400`}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="https://wa.me/51993147501" target="_blank" className={`w-full py-3 rounded-xl border border-${pkg.color}-500/30 text-${pkg.color}-400 font-bold text-center hover:bg-${pkg.color}-500 hover:text-slate-950 transition-all`}>
                Agendar Valorización
              </Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
