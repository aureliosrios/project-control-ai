"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const courses = {
  "GIP": {
    name: "El Despertar de la IA para la Gestión de Proyectos",
    lessons: [
      { id: "e7I-HLme2aA", num: "01", status: "PÚBLICA", title: "El Arte del Prompt Engineering para Ingenieros", desc: "Sesión Gratuita: Domina las técnicas de prompting aplicadas a la ingeniería." },
      { id: "VkI5DaT23eo", num: "02", status: "OCULTA", title: "Auditoría Forense de Contratos y Riesgos", desc: "Contenido Exclusivo: Técnicas de auditoría asistidas por IA." },
      { id: "jXKeAhJD0A4", num: "03", status: "OCULTA", title: "Deep Research y Arquitectura de Datos en Excel", desc: "Contenido Exclusivo: Investigación profunda y estructuración de datos." },
      { id: "gf4_1sXfv8E", num: "04", status: "OCULTA", title: "Creación de Chatbots en Excel con IA", desc: "Contenido Exclusivo: Implementación de chatbots funcionales en hojas de cálculo." },
      { id: "G6Pgy4nsGPA", num: "05", status: "OCULTA", title: "Automatización VBA y Dashboards de Control", desc: "Contenido Exclusivo: Dashboards dinámicos y automatización avanzada." }
    ]
  },
  "LIC": {
    name: "Licitaciones Inteligentes",
    lessons: [
      { id: "2QxbQ8IY0Zc", num: "01", status: "PÚBLICA", title: "Configuración de Cerebros Digitales con NotebookLM", desc: "Aprende a configurar tu primer cerebro digital utilizando NotebookLM." },
      { id: "QhgXgxZFmCY", num: "02", status: "OCULTA", title: "Generación Dinámica del WBS y Visualización HTML", desc: "Técnicas avanzadas para generar estructuras de desglose de trabajo." }
    ]
  }
};

export default function ClasesGrabadas() {
  const [selectedLesson, setSelectedLesson] = useState(courses["GIP"].lessons[0]);
  const [activeCourse, setActiveCourse] = useState("GIP");

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-32 pb-20 selection:bg-cyan-500/30">
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-20" />

      <main className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Player Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
              <iframe 
                src={`https://www.youtube.com/embed/${selectedLesson.id}`}
                className="w-full h-full"
                allowFullScreen
                title={selectedLesson.title}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 ${
                    selectedLesson.status === 'PÚBLICA' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {selectedLesson.status}
                  </span>
                  <h1 className="text-3xl font-bold text-white">{selectedLesson.title}</h1>
                </div>
                <Link 
                  href={`https://www.youtube.com/watch?v=${selectedLesson.id}`}
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 font-bold text-sm hover:bg-red-500 hover:text-white transition-all"
                >
                  Ver en YouTube
                </Link>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
                {selectedLesson.desc}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-cyan-500/5 border border-cyan-500/20 flex flex-col md:flex-row items-center gap-6 justify-between">
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-2">🔥 ¿Quieres participar en vivo?</h3>
                <p className="text-sm text-slate-400">Material exclusivo, plantillas y consultas directas con el Ing. Aurelio.</p>
              </div>
              <Link href="/inscripcion" className="bg-cyan-500 text-slate-950 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all">
                Ver Próximos Inicios
              </Link>
            </div>
          </div>

          {/* Playlist Column */}
          <div className="glass-card rounded-3xl border-white/5 p-6 h-fit max-h-[800px] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6 sticky top-0 bg-[#020617]/80 backdrop-blur pb-4 border-b border-white/10 z-10">Contenido del Curso</h2>
            <div className="space-y-8">
              {Object.keys(courses).map(courseKey => (
                <div key={courseKey}>
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-4 px-2">{courses[courseKey].name}</div>
                  <div className="space-y-2">
                    {courses[courseKey].lessons.map((lesson, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          setSelectedLesson(lesson);
                          setActiveCourse(courseKey);
                        }}
                        className={`w-full flex gap-4 p-3 rounded-2xl transition-all text-left group ${
                          selectedLesson.id === lesson.id ? 'bg-cyan-500/10 border border-cyan-500/30' : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="relative w-24 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                          <Image 
                            src={`https://img.youtube.com/vi/${lesson.id}/mqdefault.jpg`}
                            alt="thumb"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-[10px] font-bold text-slate-500 uppercase mb-1">Lección {lesson.num}</span>
                          <span className={`text-sm font-bold leading-tight ${selectedLesson.id === lesson.id ? 'text-cyan-400' : 'text-slate-300'}`}>
                            {lesson.title}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
