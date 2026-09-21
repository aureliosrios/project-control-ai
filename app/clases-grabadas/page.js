"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "../portal/components/Sidebar";
import SecurityOverlay from "../portal/components/SecurityOverlay";
import { supabase } from "@/lib/supabase";
import { registeredCourseKey } from "@/lib/cohortes";

import courses from "@/data/clases-grabadas.json";

const getCourseKey = (dbCursoName, edicionCurso = "") => {
    const registered = registeredCourseKey(dbCursoName, edicionCurso);
    if (registered) return registered;
  if (!dbCursoName) return null;
  const name = dbCursoName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const edicion = (edicionCurso || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
    
  if (name.includes("presupuesto") || name.includes("eett") || name.includes("cronograma") || (name.includes("agentes") && name.includes("presupuesto")) || name.includes("agentes de ia")) {
    if (edicion.includes("tarde") || edicion.includes("20/09") || edicion.includes("grupo 2") || name.includes("tarde")) {
      return "AGENTES_IA_TARDE";
    }
    return "AGENTES_IA";
  }
  if (name.includes("automation engineer")) return "AE";
  if (name.includes("automatizacion y soluciones") || name.includes("soluciones de ia")) return "AUT_CONST";
  if (name.includes("licitacion")) return "LIC";
  if (name.includes("despertar") || name.includes("gestion proyectos ia") || name.includes("gip") || name.includes("el despertar") || name.includes("gestion integral")) return "GIP";
  return null;
};


export default function ClasesGrabadas() {
  const [studentCourses, setStudentCourses] = useState([]);
  const [activeCourseKey, setActiveCourseKey] = useState("AE");
  const [selectedLesson, setSelectedLesson] = useState(null);
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
    try {
      // 1. Obtener datos del estudiante
      const { data: student, error: studentError } = await supabase
        .from('vw_estudiantes_publicos')
        .select('*')
        .eq('dni', dni)
        .single();

      if (studentError || !student) {
        localStorage.removeItem("pcai_student_dni");
        window.location.href = "/portal";
        return;
      }

      // 2. Obtener matrículas del estudiante (excluyendo alumnos retirados)
      const { data: rawEnrollments } = await supabase
        .from('matriculas')
        .select('*')
        .eq('dni', dni);

      const enrollments = (rawEnrollments || []).filter(enroll => {
        const edicion = enroll.edicion_curso || "";
        return !edicion.toUpperCase().includes("RETIRADO");
      });

      // 3. Obtener certificados para verificar expiraciones (60 días post-graduación)
      const { data: certificates } = await supabase
        .from('vw_certificados_publicos')
        .select('*')
        .eq('dni', dni);

      if (!enrollments || enrollments.length === 0) {
        alert("Acceso Restringido: No cuentas con una matrícula activa en el sistema.");
        window.location.href = "/portal";
        return;
      }

      // 4. Mapear y procesar accesos por curso
      const processed = enrollments.map(enroll => {
        const key = getCourseKey(enroll.curso, enroll.edicion_curso);
        if (!key) return null;

        // Todos los alumnos matriculados en cursos activos tienen acceso completo a la biblioteca de clases grabadas
        let isExpired = false;

        return {
          key,
          dbName: enroll.curso,
          displayName: courses[key].name,
          acceso_vip: false,
          isExpired
        };
      }).filter(Boolean);

      // Deduplicar en memoria por clave de curso para evitar duplicidad de pestañas
      const uniqueProcessedMap = {};
      processed.forEach(item => {
        const existing = uniqueProcessedMap[item.key];
        if (!existing) {
          uniqueProcessedMap[item.key] = item;
        } else {
          if (item.acceso_vip === true) {
            uniqueProcessedMap[item.key] = item;
          }
        }
      });

      const uniqueProcessed = Object.values(uniqueProcessedMap);

      if (uniqueProcessed.length === 0) {
        alert("Acceso Restringido: Tus cursos actuales no requieren acceso a la biblioteca de clases grabadas.");
        window.location.href = "/portal";
        return;
      }

      setStudentCourses(uniqueProcessed);
      setStudentData(student);
      setIsLoggedIn(true);

      // Seleccionar curso por defecto (priorizar AGENTES_IA si existe, luego GIP o el primero disponible)
      const agentesCourse = processed.find(c => c.key === "AGENTES_IA" && !c.isExpired);
      const gipCourse = processed.find(c => c.key === "GIP" && !c.isExpired);
      const defaultCourse = agentesCourse || gipCourse || processed.find(c => courses[c.key].lessons.length > 0 && !c.isExpired) || processed[0];
      
      setActiveCourseKey(defaultCourse.key);
      if (courses[defaultCourse.key].lessons.length > 0 && !defaultCourse.isExpired) {
        setSelectedLesson(courses[defaultCourse.key].lessons[0]);
      } else {
        setSelectedLesson(null);
      }

    } catch (err) {
      console.error(err);
      alert("Error verificando credenciales.");
      window.location.href = "/portal";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("pcai_student_dni");
    window.location.href = "/portal";
  };

  if (!isLoggedIn) return <div className="min-h-screen bg-[#020617]" />;

  const activeCourse = studentCourses.find(c => c.key === activeCourseKey);
  const lessons = courses[activeCourseKey]?.lessons || [];

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <Sidebar studentName={studentData?.nombre} onLogout={handleLogout} />

      <main className="flex-1 p-8 md:p-12 relative overflow-y-auto h-screen">
        <div className="absolute inset-0 tech-grid pointer-events-none opacity-10" />
        
        {/* Brand Tag Flotante */}
        <div className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md z-30">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-300 font-sans">
            PROJECT CONTROL <span className="text-cyan-400">AI</span>
          </span>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <header className="mb-8">
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              Biblioteca de <span className="text-cyan-400">Clases</span>
            </h1>
            <p className="text-slate-400 text-sm mt-2">Accede a las sesiones sincrónicas grabadas y descarga sus recursos.</p>
          </header>

          {/* Selectores de Curso (Tabs si tiene más de 1 curso asignado) */}
          {studentCourses.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8 bg-white/5 p-1 rounded-2xl border border-white/5 w-fit">
              {studentCourses.map(c => (
                <button
                  key={c.key}
                  onClick={() => {
                    setActiveCourseKey(c.key);
                    if (courses[c.key].lessons.length > 0 && !c.isExpired) {
                      setSelectedLesson(courses[c.key].lessons[0]);
                    } else {
                      setSelectedLesson(null);
                    }
                  }}
                  className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    activeCourseKey === c.key 
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {c.key === "AGENTES_IA_TARDE" ? "Agentes de IA (Grupo Tarde: 3pm - 6pm)" : c.key === "AGENTES_IA" ? "Agentes de IA: Presupuestos, EETT y Cronogramas (Grupo Mañana)" : c.key === "AE" ? "Automatización de Obras con Agentes de IA (Ingeniería Aumentada)" : c.key === "GIP" ? "Gestión de Construcción con IA (El Despertar Digital)" : c.key === "AUT_CONST" ? "Automatización y Soluciones de IA para la Gestión de Construcción" : "Licitaciones de Construcción con IA (Licitaciones Inteligentes)"}
                </button>
              ))}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Player Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* CASO 1: ACCESO EXPIRADO */}
              {activeCourse?.isExpired ? (
                <div className="aspect-video bg-slate-950/80 rounded-3xl border border-red-500/10 flex flex-col items-center justify-center p-8 text-center backdrop-blur-md shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
                  <span className="material-symbols-outlined text-red-500 text-6xl mb-4 animate-pulse">lock</span>
                  <h3 className="text-xl font-black uppercase tracking-wider text-white">Acceso Finalizado</h3>
                  <p className="text-slate-400 text-xs mt-3 max-w-sm leading-relaxed">
                    Tu periodo de acceso a las grabaciones de este curso ha finalizado (60 días post-graduación). Si consideras que esto es un error, por favor contacta a soporte.
                  </p>
                </div>
              ) 
              // CASO 2: NO HAY GRABACIONES AÚN
              : lessons.length === 0 ? (
                <div className="aspect-video bg-slate-950/80 rounded-3xl border border-cyan-500/10 flex flex-col items-center justify-center p-8 text-center backdrop-blur-md shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none" />
                  <span className="material-symbols-outlined text-cyan-400 text-6xl mb-4 animate-pulse">hourglass_empty</span>
                  <h3 className="text-xl font-black uppercase tracking-wider text-white">Próximamente</h3>
                  <p className="text-slate-400 text-xs mt-3 max-w-sm leading-relaxed">
                    Las clases grabadas para **{activeCourse?.dbName}** se subirán próximamente de forma automática en esta sección. ¡Mantente atento!
                  </p>
                </div>
              ) 
              // CASO 3: REPRODUCTOR ACTIVO
              : selectedLesson ? (
                <>
                  <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                    <iframe 
                      src={`https://www.youtube.com/embed/${selectedLesson.id}?modestbranding=1&rel=0`}
                      className="w-full h-full"
                      allowFullScreen
                      title={selectedLesson.title}
                    />
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
                </>
              ) : null}

              {/* Recursos de la Lección Seleccionada */}
              {!activeCourse?.isExpired && selectedLesson && (
                <div className="p-8 rounded-[32px] bg-cyan-500/5 border border-cyan-500/20 space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-cyan-400 mb-1 uppercase tracking-tight flex items-center gap-2">
                      <span className="material-symbols-outlined">folder_open</span>
                      Recursos de la Clase {selectedLesson.num}
                    </h3>
                    <p className="text-xs text-slate-400">Descarga el material de lectura y resúmenes oficiales exclusivos de esta sesión.</p>
                  </div>
                  
                  {selectedLesson.resources && selectedLesson.resources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedLesson.resources.map((res, idx) => (
                        <a 
                          key={idx}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-950/20 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`material-symbols-outlined ${
                              res.type === 'pdf' ? 'text-red-400' : res.type === 'md' || res.type === 'markdown' ? 'text-emerald-400' : 'text-cyan-400'
                            }`}>
                              {res.type === 'pdf' ? 'picture_as_pdf' : res.type === 'md' || res.type === 'markdown' ? 'description' : 'html'}
                            </span>
                            <div className="text-left">
                              <p className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-cyan-400 transition-colors">{res.title}</p>
                              <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                                {res.type === 'pdf' ? 'Documento PDF' : res.type === 'md' || res.type === 'markdown' ? 'Documento Markdown' : 'Resumen Interactivo (HTML)'}
                              </p>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-cyan-400 group-hover:translate-y-0.5 transition-all">
                            download
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-slate-500 text-xs italic p-4 rounded-xl border border-white/5 bg-black/20 text-center">
                      No hay recursos específicos cargados para esta clase aún. Revisa más tarde.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Playlist Sidebar Column */}
            <div className="glass-panel rounded-[32px] border-white/5 p-6 h-fit max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent hover:scrollbar-thumb-cyan-400">
              <h2 className="text-sm font-black text-slate-400 mb-6 uppercase tracking-[0.2em] px-2">Contenido de {courses[activeCourseKey]?.name}</h2>
              <div className="space-y-2">
                {lessons.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    Sin Sesiones Grabadas
                  </div>
                ) : (
                  lessons.map((lesson, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full flex gap-4 p-3 rounded-2xl transition-all text-left group ${
                        selectedLesson?.id === lesson.id ? 'bg-cyan-500/10 border border-cyan-500/20' : 'hover:bg-white/5 border border-transparent'
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
                        <span className="text-[9px] font-black text-slate-500 uppercase mb-1 tracking-widest">L{lesson.num}</span>
                        <span className={`text-xs font-bold leading-tight uppercase tracking-tight ${selectedLesson?.id === lesson.id ? 'text-cyan-400' : 'text-slate-300'}`}>
                          {lesson.title}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
