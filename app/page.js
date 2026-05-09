import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-40" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="relative pt-32 pb-20 px-6">
        {/* Hero */}
        <section className="max-w-7xl mx-auto text-center md:text-left py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Nueva Era de Ingeniería
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white">
                Automatiza tu <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 neon-text">Control de Proyectos</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
                Democraticemos la programación. Gracias a la IA, la automatización avanzada está ahora al alcance de todos los ingenieros de construcción.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/formacion" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all text-center min-w-[200px]">
                  Explorar Cursos
                </Link>
                <Link href="/consultoria" className="glass-card px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all text-center min-w-[200px]">
                  Agendar Diagnóstico
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full animate-glow" />
              <div className="glass-card p-8 rounded-3xl relative z-10 border-white/10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-white">Velocidad Extrema</p>
                      <p className="text-xs text-slate-400">Reportes en minutos, no días.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 translate-x-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-white">Precisión Milimétrica</p>
                      <p className="text-xs text-slate-400">Elimina el error humano con Agentes.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 translate-x-12">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-white">Control Total</p>
                      <p className="text-xs text-slate-400">Visibilidad 360° de tus variables.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Summary */}
        <section className="max-w-7xl mx-auto py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Ecosistema de Formación</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">De cero a experto en automatización con IA aplicada a la construcción.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Fundamentos Transversales", level: "Ruta A", desc: "El Despertar de la IA y Escáner Forense. Base para todo ingeniero." },
              { title: "Especialidad en Costos", level: "Ruta C", desc: "Automatización de Presupuestos y APUs con Python." },
              { title: "Administración Contractual", level: "Ruta D", desc: "Análisis NEC/FIDIC y Gestión de Claims con Agentes." }
            ].map((course, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border-white/5 hover:border-cyan-500/30 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-4">{course.level}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {course.desc}
                </p>
                <Link href="/formacion" className="block w-full py-3 rounded-xl bg-white/5 border border-white/10 font-bold text-center hover:bg-cyan-500 hover:text-slate-950 transition-all">
                  Ver Formación
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
