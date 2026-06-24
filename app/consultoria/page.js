import Link from "next/link";
import Image from "next/image";

const soluciones = [
  {
    title: "APUs y Presupuestos con IA (Formato S10)",
    desc: "Creación rápida de presupuestos, análisis de precios unitarios (APU) y listado de recursos estructurados similar al formato S10, con trazabilidad de fórmulas y estudio automático de precios de mercado.",
    icon: "payments",
    features: ["Estructuración tipo S10 automatizada", "Trazabilidad de fórmulas y rendimientos", "Estudio de precios de mercado con agentes de IA"]
  },
  {
    title: "Generación e Ingeniería Forense de EETT",
    desc: "Generación y revisión de Especificaciones Técnicas (EETT) utilizando agentes de IA para analizar estudios de suelos, diseños, logística y bases, eliminando vicios ocultos y riesgos.",
    icon: "assignment",
    features: ["Generación rápida de EETT consistentes", "Auditoría automatizada de bases y TDRs", "Optimización logística y normativa"]
  },
  {
    title: "Planificación y Nivelación de Recursos",
    desc: "Generación acelerada de cronogramas y nivelación óptima de recursos (personal, equipos y materiales) con IA para proteger los plazos y márgenes del proyecto.",
    icon: "account_tree",
    features: ["Cronogramas lógicos automáticos", "Nivelación inteligente de recursos", "Exportación a Primavera P6 y MS Project"]
  },
  {
    title: "Sistemas Operativos a Medida (Premium B2B)",
    desc: "Digitalización completa del frente de obra y automatización avanzada (reportabilidad móvil, dashboards gerenciales en tiempo real y conciliación automatizada de costos AC vs EV).",
    icon: "smartphone",
    features: ["Reportabilidad móvil desde campo", "Conciliación automática Costo Actual vs Valor Ganado", "Dashboards gerenciales en tiempo real"]
  }
];

export default function Consultoria() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-32 pb-20 selection:bg-cyan-500/30">
      <div className="fixed inset-0 tech-grid pointer-events-none opacity-20" />
      
      <main className="relative max-w-7xl mx-auto px-6">
        {/* Header Hero */}
        <section className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(0,242,255,0.8)]"></span>
            Operational Intelligence System
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-10 uppercase leading-[0.9]">
            MÁXIMA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">EFICIENCIA OPERATIVA</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            Especialistas en eliminar el trabajo manual en empresas constructoras. 
            Digitalizamos el frente de obra y automatizamos el control de proyectos con precisión quirúrgica.
          </p>
          <Link 
            href="https://wa.me/51993147501?text=Hola,%20necesito%20automatizar%20mis%20procesos%20de%20ingenier%C3%ADa." 
            target="_blank"
            className="bg-cyan-500 text-slate-950 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] inline-flex items-center gap-4 group"
          >
            Agendar Diagnóstico Operativo
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">bolt</span>
          </Link>
        </section>

        {/* Services Grid */}
        <section className="grid md:grid-cols-2 gap-8 mb-32">
          {soluciones.map((sol, i) => (
            <div key={i} className="glass-panel p-10 rounded-[40px] border-white/5 hover:border-cyan-500/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400 mb-8 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">{sol.icon}</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{sol.title}</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed mb-8">{sol.desc}</p>
              <ul className="space-y-3">
                {sol.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Metodología & Agentes */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Nuestra Infraestructura</h2>
            <p className="text-slate-500 font-light max-w-xl mx-auto">Utilizamos el stack tecnológico más avanzado del mercado para dar vida a nuestras soluciones.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="glass-panel p-12 rounded-[50px] border-white/5 relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="text-white font-black uppercase text-xl mb-4">Arquitectura Agéntica</h4>
                  <p className="text-slate-400 text-sm font-light leading-relaxed">
                    Nuestras soluciones son impulsadas por motores de IA especializados como <span className="text-cyan-400 font-bold">Claude Code</span> y <span className="text-cyan-400 font-bold">Antigravity</span>. 
                    No instalamos software genérico; desplegamos agentes autónomos entrenados en tu lógica de negocio.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  {["Supabase", "Vercel", "GitHub", "Google Sheets", "Python Core"].map((tech) => (
                    <span key={tech} className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-12 rounded-[50px] border-white/5 h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/5 to-transparent">
               <div className="text-center">
                 <span className="material-symbols-outlined text-6xl text-cyan-500 mb-6 animate-spin-slow">hub</span>
                 <p className="text-white font-black uppercase text-2xl tracking-tighter">Sincronización <br /> Total</p>
               </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">¿Listo para escalar tu rentabilidad?</h2>
          <p className="text-slate-400 mb-12 font-light italic">
            "No vendemos herramientas aisladas, entregamos sistemas de control que permiten a los ingenieros volver a hacer ingeniería."
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="https://wa.me/51993147501" 
              className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-all"
            >
              Contactar Consultoría VIP
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}


