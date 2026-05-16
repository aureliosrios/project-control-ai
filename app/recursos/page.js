"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const resources = [
  { id: 1, type: "brochure", title: "Licitaciones Inteligentes con IA", desc: "Auditoría de expedientes masivos, APUs, Presupuestos y Cronogramas automáticos.", img: "/images/Licitaciones.png", link: "/brochures/Brochure_Curso_1_Licitaciones_360.pdf" },
  { id: 2, type: "brochure", title: "El Despertar de la IA", desc: "Alcance, Contratos, Calidad y HSE potenciados por Inteligencia Artificial.", img: "/images/Gestión Integral.png", link: "/brochures/Brochure_Curso_3_IA_Despertar_Digital.pdf" }
];

export default function Recursos() {
  const [filter, setFilter] = useState("todos");

  const filtered = filter === "todos" ? resources : resources.filter(r => r.type === filter);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-32 pb-20 selection:bg-cyan-500/30">
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-20" />
      
      <main className="relative max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
            Librería de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Recursos Técnicos</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Brochures técnicos, catálogos de formación y material de consulta para ingeniería.
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {["todos", "brochure"].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-bold capitalize transition-all ${
                filter === f ? 'bg-cyan-500 text-slate-950' : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              {f === 'todos' ? 'Todos' : 'Brochures'}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(resource => (
            <div key={resource.id} className="glass-card rounded-3xl border-white/5 overflow-hidden group hover:border-cyan-500/30 transition-all flex flex-col">
              <div className="aspect-video relative overflow-hidden bg-white/5">
                <Image src={resource.img} alt={resource.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-cyan-500 text-slate-950 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                  {resource.type}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{resource.title}</h3>
                <p className="text-sm text-slate-400 mb-6 flex-1 leading-relaxed">{resource.desc}</p>
                <Link 
                  href={resource.link} 
                  target={resource.type === 'brochure' ? '_blank' : '_self'}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-center hover:bg-cyan-500 hover:text-slate-950 transition-all flex items-center justify-center gap-2"
                >
                  {resource.type === 'brochure' ? 'Descargar PDF' : 'Ver Contenido'}
                  <span className="material-symbols-outlined text-sm">{resource.type === 'brochure' ? 'download' : 'open_in_new'}</span>
                </Link>
              </div>
            </div>
          ))}

          {/* Social Card */}
          <div className="lg:col-span-2 glass-card rounded-3xl border-[#EE1D52]/20 bg-gradient-to-br from-[#EE1D52]/5 to-transparent p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 bg-[#EE1D52] rounded-2xl flex items-center justify-center text-white text-4xl shadow-[0_0_30px_rgba(238,29,82,0.3)]">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.73a8.18 8.18 0 004.78 1.52V6.8a4.84 4.84 0 01-1.01-.11z"/></svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">@project.control.a</h3>
              <p className="text-slate-400 text-sm mb-6 max-w-md">Tips, demostraciones y casos reales de cómo la IA está transformando el control de proyectos.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link href="https://www.tiktok.com/@project.control.a" target="_blank" className="bg-[#EE1D52] text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all">Seguir en TikTok</Link>
                <Link href="https://wa.me/51993147501" target="_blank" className="bg-white/5 text-slate-300 px-6 py-2 rounded-full font-bold text-sm border border-white/10 hover:bg-white/10 transition-all">Consultar Info</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
