import Link from "next/link";
import Image from "next/image";

const soluciones = [
  {
    title: "Reportabilidad Automática",
    desc: "Adiós al ingreso manual. Sistemas de captura de datos que generan reportes de campo y gabinete en tiempo real.",
    icon: "analytics",
    features: ["Dashboards gerenciales automáticos", "Sincronización con Google Sheets", "Alertas de desviación inmediata"]
  },
  {
    title: "Extracción P6 & Seguimiento",
    desc: "Extraemos información de Primavera P6 automáticamente para preparar informes de seguimiento sin error humano.",
    icon: "account_tree",
    features: ["Carga masiva de actividades", "Actualización de cronogramas", "Análisis de ruta crítica IA"]
  },
  {
    title: "Lookahead & Valor Ganado",
    desc: "Cálculo automático de Lookahead y EVM (Valor Ganado) directamente desde la reportabilidad diaria.",
    icon: "trending_up",
    features: ["Proyección de hitos", "Curva S automática", "Análisis de productividad"]
  },
  {
    title: "Cotizaciones con IA",
    desc: "Prepara presupuestos y licitaciones en minutos utilizando Agentes de IA que analizan planos y EETT.",
    icon: "description",
    features: ["Análisis masivo de ítems", "Cálculo de APU asistido", "Generación de propuestas técnica"]
  },
  {
    title: "Cruce Almacén vs RRHH",
    desc: "Control total de costos comparando el consumo real de almacén y mano de obra contra el presupuesto.",
    icon: "inventory_2",
    features: ["Auditoría de recursos", "Detección de mermas", "Conciliación de costos actuales"]
  },
  {
    title: "Agentes Autónomos",
    desc: "Desplegamos instancias de Antigravity y Claude Code para gestionar tus flujos de trabajo en la nube.",
    icon: "precision_manufacturing",
    features: ["Infraestructura Supabase + Vercel", "Integración con GitHub", "Flujos MCP personalizados"]
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
            Engineering Intelligence Division
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-10 uppercase leading-[0.9]">
            ELIMINAMOS EL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">TRABAJO MANUAL</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            Especialistas en automatizar constructoras y consultoras con cuellos de botella. 
            Transformamos procesos de días en segundos mediante Agentes de IA y Arquitectura de Datos de Élite.
          </p>
          <Link 
            href="https://wa.me/51993147501?text=Hola,%20necesito%20automatizar%20mis%20procesos%20de%20ingenier%C3%ADa." 
            target="_blank"
            className="bg-cyan-500 text-slate-950 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] inline-flex items-center gap-4 group"
          >
            Agendar Auditoría de Procesos
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">bolt</span>
          </Link>
        </section>

        {/* Services Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
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

        {/* Tech Stack Banner */}
        <section className="glass-panel p-12 rounded-[50px] border-white/5 text-center mb-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />
          <p className="text-cyan-400 text-[10px] font-black tracking-[0.6em] uppercase mb-10">Our Technology Stack</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 opacity-60">
            {["Claude Code", "Antigravity", "Supabase", "Vercel", "GitHub", "Google Sheets"].map((tech) => (
              <div key={tech} className="text-sm font-black text-white uppercase tracking-tighter">
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">¿Listo para escalar tu rentabilidad?</h2>
          <p className="text-slate-400 mb-12 font-light italic">
            "No vendemos software, vendemos tiempo y precisión para ingenieros que quieren liderar la era de la IA."
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

