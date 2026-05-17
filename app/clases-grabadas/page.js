"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "../portal/components/Sidebar";
import SecurityOverlay from "../portal/components/SecurityOverlay";
import { supabase } from "@/lib/supabase";

const courses = {
  "AE": {
    name: "Automation Engineer (Sesiones en Vivo)",
    lessons: [
      { id: "BHYaeOX97Mc", num: "01", status: "OCULTA", title: "Introducción a la Automatización de Procesos", desc: "Clase del 19 de Abril: Fundamentos y herramientas clave para el ingeniero de automatización moderno." },
      { id: "c5qxq90FTJA", num: "02", status: "OCULTA", title: "Arquitectura de Agentes y Workflows", desc: "Clase del 26 de Abril: Diseño de flujos de trabajo inteligentes y orquestación de agentes." },
      { id: "jDAwMF7kkjY", num: "03", status: "OCULTA", title: "Integración Avanzada y Sistemas Autónomos", desc: "Clase del 03 de Mayo: Integración y orquestación avanzada en producción con casos prácticos reales." }
    ]
  },
  "GIP": {
    name: "El Despertar de la IA para la Gestión de Proyectos",
    lessons: [] // Próximamente se añadirán clases grabadas
  },
  "LIC": {
    name: "Licitaciones Inteligentes con IA",
    lessons: [] // Próximamente se añadirán clases grabadas
  }
};

const getCourseKey = (dbCursoName) => {
  const name = dbCursoName?.toLowerCase();
  if (name?.includes("automation") || name?.includes("ingenieria") || name?.includes("automatizacion")) return "AE";
  if (name?.includes("licitacion")) return "LIC";
  if (name?.includes("despertar") || name?.includes("gestion proyectos ia") || name?.includes("gip")) return "GIP";
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
        .from('estudiantes')
        .select('*')
        .eq('dni', dni)
        .single();

      if (studentError || !student) {
        localStorage.removeItem("pcai_student_dni");
        window.location.href = "/portal";
        return;
      }

      // 2. Obtener matrículas del estudiante
      const { data: enrollments } = await supabase
        .from('matriculas')
        .select('*')
        .eq('dni', dni);

      // 3. Obtener certificados para verificar expiraciones (60 días post-graduación)
      const { data: certificates } = await supabase
        .from('certificados')
        .select('*')
        .eq('dni', dni);

      if (!enrollments || enrollments.length === 0) {
        alert("Acceso Restringido: No cuentas con una matrícula activa en el sistema.");
        window.location.href = "/portal";
        return;
      }

      // 4. Mapear y procesar accesos por curso
      const processed = enrollments.map(enroll => {
        const key = getCourseKey(enroll.curso);
        if (!key) return null;

        const cert = certificates?.find(c => c.curso === enroll.curso);
        let isExpired = false;
        if (cert && cert.fecha && enroll.acceso_vip !== true) {
          const fechaCert = new Date(cert.fecha);
          const hoy = new Date();
          const diffTime = hoy - fechaCert;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays > 60) {
            isExpired = true;
          }
        }

        return {
          key,
          dbName: enroll.curso,
          displayName: courses[key].name,
          acceso_vip: enroll.acceso_vip,
          isExpired
        };
      }).filter(Boolean);

      if (processed.length === 0) {
        alert("Acceso Restringido: Tus cursos actuales no requieren acceso a la biblioteca de clases grabadas.");
        window.location.href = "/portal";
        return;
      }

      setStudentCourses(processed);
      setStudentData(student);
      setIsLoggedIn(true);

      // Seleccionar curso por defecto (primero con grabaciones activas y no vencido)
      const defaultCourse = processed.find(c => courses[c.key].lessons.length > 0 && !c.isExpired) || processed[0];
      
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
                  {c.key === "AE" ? "Automation Engineer" : c.key === "GIP" ? "El Despertar de la IA" : "Licitaciones Inteligentes"}
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

              {/* Recursos del curso */}
              {!activeCourse?.isExpired && (
                <div className="p-8 rounded-[32px] bg-cyan-500/5 border border-cyan-500/20 flex flex-col md:flex-row items-center gap-6 justify-between">
                  <div>
                    <h3 className="text-xl font-black text-cyan-400 mb-2 uppercase tracking-tight">📂 Material de Clase</h3>
                    <p className="text-sm text-slate-400">Descarga las plantillas y recursos oficiales del curso activo.</p>
                  </div>
                  <button className="bg-cyan-500 text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                    Descargar Recursos
                  </button>
                </div>
              )}
            </div>

            {/* Playlist Sidebar Column */}
            <div className="glass-panel rounded-[32px] border-white/5 p-6 h-fit max-h-[800px] overflow-y-auto">
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
