"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../portal/components/Sidebar";
import SecurityOverlay from "../portal/components/SecurityOverlay";
import { supabase } from "@/lib/supabase";

const courses = {
  // Las clases grabadas de la cuenta aureliosrios1@gmail.com quedan sin efecto temporalmente por cambio de canal
  /*
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
  },
  */
  "AE": {
    name: "Automation Engineer (Sesiones en Vivo)",
    lessons: [
      { id: "BHYaeOX97Mc", num: "01", status: "OCULTA", title: "Introducción a la Automatización de Procesos", desc: "Clase del 19 de Abril: Fundamentos y herramientas clave para el ingeniero de automatización moderno." },
      { id: "c5qxq90FTJA", num: "02", status: "OCULTA", title: "Arquitectura de Agentes y Workflows", desc: "Clase del 26 de Abril: Diseño de flujos de trabajo inteligentes y orquestación de agentes." },
      { id: "jDAwMF7kkjY", num: "03", status: "OCULTA", title: "Integración Avanzada y Sistemas Autónomos", desc: "Clase del 03 de Mayo: Integración y orquestación avanzada en producción con casos prácticos reales." }
    ]
  }
};

export default function ClasesGrabadas() {
  const [selectedLesson, setSelectedLesson] = useState(courses["AE"].lessons[0]);
  const [activeCourse, setActiveCourse] = useState("AE");
  const [studentData, setStudentData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedDni = localStorage.getItem("pcai_student_dni");
    if (savedDni) {
      fetchStudent(savedDni);
    } else {
      window.location.href = "/portal";
    }
  }, []);

  const fetchStudent = async (dni) => {
    const { data } = await supabase.from('estudiantes').select('*').eq('dni', dni).single();
    if (data) {
      setStudentData(data);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("pcai_student_dni");
    window.location.href = "/portal";
  };

  if (!isLoggedIn) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <Sidebar studentName={studentData?.nombre} onLogout={handleLogout} />

      <main className="flex-1 p-8 md:p-12 relative overflow-y-auto h-screen">
        <div className="absolute inset-0 tech-grid pointer-events-none opacity-10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <header className="mb-12">
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              Biblioteca de <span className="text-cyan-400">Clases</span>
            </h1>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Player Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                <iframe 
                  src={`https://www.youtube.com/embed/${selectedLesson.id}?modestbranding=1&rel=0`}
                  className="w-full h-full"
                  allowFullScreen
                  title={selectedLesson.title}
                />
                
                {/* EL STICKER DE SEGURIDAD */}
                <SecurityOverlay 
                  studentName={studentData?.nombre} 
                  studentDni={studentData?.dni} 
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 ${
                      selectedLesson.status === 'PÚBLICA' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {selectedLesson.status}
                    </span>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">{selectedLesson.title}</h2>
                  </div>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed max-w-3xl font-light">
                  {selectedLesson.desc}
                </p>
              </div>

              <div className="p-8 rounded-[32px] bg-cyan-500/5 border border-cyan-500/20 flex flex-col md:flex-row items-center gap-6 justify-between">
                <div>
                  <h3 className="text-xl font-black text-cyan-400 mb-2 uppercase tracking-tight">📂 Material de Clase</h3>
                  <p className="text-sm text-slate-400">Descarga las plantillas y recursos utilizados en esta sesión.</p>
                </div>
                <button className="bg-cyan-500 text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                  Descargar Recursos
                </button>
              </div>
            </div>

            {/* Playlist Column */}
            <div className="glass-panel rounded-[32px] border-white/5 p-6 h-fit max-h-[800px] overflow-y-auto">
              <h2 className="text-sm font-black text-slate-400 mb-6 uppercase tracking-[0.2em] px-2">Contenido del Curso</h2>
              <div className="space-y-8">
                {Object.keys(courses).map(courseKey => (
                  <div key={courseKey}>
                    <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-4 px-2">{courses[courseKey].name}</div>
                    <div className="space-y-2">
                      {courses[courseKey].lessons.map((lesson, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            setSelectedLesson(lesson);
                            setActiveCourse(courseKey);
                          }}
                          className={`w-full flex gap-4 p-3 rounded-2xl transition-all text-left group ${
                            selectedLesson.id === lesson.id ? 'bg-cyan-500/10 border border-cyan-500/20' : 'hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          <div className="relative w-24 aspect-video rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
                            <Image 
                              src={`https://img.youtube.com/vi/${lesson.id}/mqdefault.jpg`}
                              alt="thumb"
                              fill
                              className="object-cover group-hover:scale-110 transition-transform opacity-60"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="material-symbols-outlined text-white/50 text-sm">play_arrow</span>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center">
                            <span className="text-[9px] font-black text-slate-500 uppercase mb-1 tracking-widest text-wrap">L{lesson.num}</span>
                            <span className={`text-xs font-bold leading-tight uppercase tracking-tight ${selectedLesson.id === lesson.id ? 'text-cyan-400' : 'text-slate-300'}`}>
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
        </div>
      </main>
    </div>
  );
}
