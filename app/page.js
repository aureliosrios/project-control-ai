import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-40" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/images/logo.png" alt="PCAI Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tighter text-white">PROJECT CONTROL AI</span>
              <span className="text-[10px] text-cyan-400 tracking-[0.2em] uppercase font-medium">Engineering Intelligence</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="#" className="hover:text-cyan-400 transition-colors">Formación</Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">Consultoría</Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">Recursos</Link>
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Acceso Alumnos
            </button>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-20 px-6">
        {/* Hero */}
        <section className="max-w-7xl mx-auto text-center md:text-left py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Nueva Era de Ingeniería
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                Automatiza tu <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 neon-text">Control de Proyectos</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
                Democraticemos la programación. Gracias a la IA, la automatización avanzada está ahora al alcance de todos los ingenieros de construcción.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all">
                  Explorar Cursos
                </button>
                <button className="glass-card px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all">
                  Agendar Diagnóstico
                </button>
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

        {/* Feature Grid */}
        <section className="max-w-7xl mx-auto py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Ecosistema de Formación</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">De cero a experto en automatización con IA aplicada a la construcción.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "El Despertar de la IA", level: "Básico", desc: "Domina los lenguajes nativos de la IA: HTML, Mermaid, MD y CSV." },
              { title: "Ingeniería Aumentada", level: "Avanzado", desc: "Python, VBA y Scripts MCP para dashboards agénticos." },
              { title: "Licitaciones Inteligentes", level: "Elite", desc: "Automatización de expedientes técnicos masivos con Python." }
            ].map((course, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border-white/5 hover:border-cyan-500/30 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">{course.level}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {course.desc}
                </p>
                <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-cyan-500 hover:text-slate-950 transition-all">
                  Ver Detalles
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 grayscale opacity-50">
            <Image src="/images/logo.png" alt="PCAI Logo" width={30} height={30} />
            <span className="text-sm font-bold tracking-tighter text-white">PROJECT CONTROL AI</span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            © 2026 PROJECT CONTROL AI · ENGINEERING INTELLIGENCE PROTOCOL
          </p>
          <div className="flex gap-6 text-slate-500 text-xs font-medium uppercase tracking-widest">
            <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-white transition-colors">Términos</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
