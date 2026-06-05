
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "./components/Sidebar";
import Image from "next/image";

export default function StudentPortal() {
  const [dni, setDni] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar sesión si existe en localStorage para persistencia básica
  useEffect(() => {
    const savedDni = localStorage.getItem("pcai_student_dni");
    if (savedDni) {
      fetchStudentData(savedDni);
    }
  }, []);

  const fetchStudentData = async (dniValue) => {
    setLoading(true);
    try {
      const trimmedDni = dniValue.trim();
      
      // 1. Obtener datos del estudiante
      const { data: student, error: studentError } = await supabase
        .from('estudiantes')
        .select('*')
        .eq('dni', trimmedDni)
        .single();

      if (studentError || !student) {
        alert("DNI no encontrado en el sistema.");
        localStorage.removeItem("pcai_student_dni");
        return;
      }

      // 2. Obtener sus matrículas y sus certificados (si existen)
      const { data: enrollments } = await supabase
        .from('matriculas')
        .select('*')
        .eq('dni', trimmedDni);

      const { data: certificates } = await supabase
        .from('certificados')
        .select('*')
        .eq('dni', trimmedDni);

      // 3. Procesar lógica de acceso por curso (excluyendo alumnos retirados)
      const activeEnrollmentsOnly = (enrollments || []).filter(enroll => {
        const edicion = enroll.edicion_curso || "";
        return !edicion.toUpperCase().includes("RETIRADO");
      });

      // Homogeneizar nombres de cursos en memoria para evitar errores de duplicación en DB
      const homogenizedEnrollments = activeEnrollmentsOnly.map(enroll => {
        let cursoHomogeneizado = enroll.curso;
        const cursoLower = enroll.curso?.trim().toLowerCase();
        
        if (
          cursoLower?.includes("gestion proyectos ia") || 
          cursoLower?.includes("gestión integral de proyectos con ia") ||
          cursoLower?.includes("gestion integral de proyectos con ia") ||
          cursoLower?.includes("el despertar de la ia") ||
          cursoLower?.includes("despertar digital") ||
          cursoLower?.includes("construcción con ia") ||
          cursoLower?.includes("construccion con ia")
        ) {
          cursoHomogeneizado = "Gestión de Construcción con IA (El Despertar Digital)";
        } else if (
          cursoLower?.includes("automation") || 
          cursoLower?.includes("ingenieria") || 
          cursoLower?.includes("automatizacion") || 
          cursoLower?.includes("obras con agentes")
        ) {
          cursoHomogeneizado = "Automatización de Obras con Agentes de IA (Ingeniería Aumentada)";
        } else if (
          cursoLower?.includes("licitacio")
        ) {
          cursoHomogeneizado = "Licitaciones de Construcción con IA (Licitaciones Inteligentes)";
        }

        // Forzar privilegios VIP/Normal en el frontend para evitar restricciones de RLS
        let vipOverride = enroll.acceso_vip;
        const studentDni = enroll.dni?.trim();
        if (cursoHomogeneizado === "Gestión de Construcción con IA (El Despertar Digital)") {
          const vipDnis = ["47812821", "10740454"]; // Esther y Aurelio
          const normalDnis = ["40253671", "19082488", "10516759", "32983297"]; // Daniel, Ronal, Pavel, Victor
          
          if (vipDnis.includes(studentDni)) {
            vipOverride = true;
          } else if (normalDnis.includes(studentDni)) {
            vipOverride = false;
          }
        }
        
        return {
          ...enroll,
          curso: cursoHomogeneizado,
          acceso_vip: vipOverride
        };
      });

      // Fusionar duplicados en memoria conservando el acceso VIP si existe
      const uniqueEnrollmentsMap = {};
      homogenizedEnrollments.forEach(enroll => {
        const key = enroll.curso;
        if (!uniqueEnrollmentsMap[key]) {
          uniqueEnrollmentsMap[key] = enroll;
        } else {
          // Si ya existe una matrícula, conservamos la que tenga VIP
          if (enroll.acceso_vip === true) {
            uniqueEnrollmentsMap[key] = enroll;
          }
        }
      });

      const processedEnrollments = Object.values(uniqueEnrollmentsMap).map(enroll => {
        const cert = certificates?.find(c => c.curso === enroll.curso);
        let status = cert ? "GRADUADO" : "INSCRITO";
        let daysLeft = 999; 
        let accessExpired = false;

        // LÓGICA VIP (Llave Maestra del Director)
        if (enroll.acceso_vip === true) {
          return {
            ...enroll,
            status: "VIP",
            daysLeft: "∞",
            accessExpired: false
          };
        }

        if (status === "GRADUADO" && cert.fecha) {
          const fechaCert = new Date(cert.fecha);
          const hoy = new Date();
          const diffTime = hoy - fechaCert;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          daysLeft = 60 - diffDays;
          if (daysLeft < 0) {
            accessExpired = true;
            daysLeft = 0;
          }
        } else {
          // INSCRITO: 60 días desde la fecha de matrícula (created_at)
          if (enroll.created_at) {
            const fechaMatricula = new Date(enroll.created_at);
            const hoy = new Date();
            const diffTime = hoy - fechaMatricula;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            daysLeft = 60 - diffDays;
            if (daysLeft < 0) {
              accessExpired = true;
              daysLeft = 0;
            }
          }
        }

        return {
          ...enroll,
          status,
          daysLeft,
          accessExpired
        };
      });

      // 4. Filtrar solo los que tienen acceso (Inscritos o Graduados < 60 días)
      const activeEnrollments = processedEnrollments.filter(e => !e.accessExpired);

      if (activeEnrollments.length === 0 && enrollments.length > 0) {
        alert("Tu periodo de acceso a clases ha finalizado (60 días post-graduación). Aún puedes descargar tus certificados en la sección correspondiente.");
      }

      setStudentData(student);
      setMatriculas(activeEnrollments);
      setIsLoggedIn(true);
      localStorage.setItem("pcai_student_dni", trimmedDni);
    } catch (err) {
      console.error(err);
      alert("Error de comunicación con el servidor central.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudentData(null);
    setMatriculas([]);
    localStorage.removeItem("pcai_student_dni");
  };

  const handleLogin = async () => {
    if (!dni) return alert("Por favor ingresa tu DNI");
    await fetchStudentData(dni);
  };

  // Lógica de cálculo de días restantes (Simulado por ahora)
  const calculateDaysLeft = (enrollment) => {
    // Aquí iría la lógica real comparando con enrollment.fecha_vencimiento
    return 85; // Días de ejemplo
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid pointer-events-none opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="glass-panel p-12 rounded-[40px] border border-white/10 max-w-md w-full relative z-10">
          <div className="mb-8 flex flex-col items-center justify-center">
            <Image 
              src="/images/logo.png" 
              alt="Project Control AI Logo" 
              width={220} 
              height={55} 
              className="h-12 w-auto object-contain"
              priority
            />
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-4">Acceso Exclusivo para Alumnos</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-2">Identificación Académica</label>
              <input
                type="text"
                placeholder="INGRESAR DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-700"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full neon-button py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all hover:scale-[1.02] active:scale-[0.98] bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              {loading ? "Verificando Protocolos..." : "Iniciar Sesión"}
            </button>
          </div>
          <p className="mt-8 text-center text-[9px] text-slate-600 font-medium uppercase tracking-[0.3em]">
            Engineering Education System v6.0
          </p>
        </div>
      </div>
    );
  }

  const getCourseKey = (dbCursoName) => {
    if (!dbCursoName) return null;
    const name = dbCursoName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
      
    if (name.includes("automation") || name.includes("ingenieria") || name.includes("automatizacion")) return "AE";
    if (name.includes("licitacion")) return "LIC";
    if (name.includes("despertar") || name.includes("gestion proyectos ia") || name.includes("gip") || name.includes("el despertar") || name.includes("gestion integral")) return "GIP";
    return null;
  };



  const activeZoomSessions = [
    {
      courseKey: "AE",
      zoomUrl: "https://us06web.zoom.us/j/89278943716?pwd=AQbn3eCCxhaLU4zr1zuabDwJwdSnsm.1",
      title: "Automatización de Obras con Agentes de IA (Ingeniería Aumentada)",
      message: "La clase está en curso. Toca el botón de abajo para unirte desde tu celular."
    },
    {
      courseKey: "GIP",
      zoomUrl: "https://us06web.zoom.us/j/82338486465?pwd=kBVuLWZgYxA2WOzMVjCM6tqM47GA5g.1",
      title: "Gestión de Construcción con IA (El Despertar Digital)",
      message: "¡Hoy inicia el curso! La sesión sincrónica está activa. Toca el botón de abajo para ingresar a tu clase de hoy."
    }
  ];

  const studentZoomSessions = activeZoomSessions.filter(session => 
    matriculas.some(m => getCourseKey(m.curso) === session.courseKey)
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <Sidebar studentName={studentData.nombre} onLogout={handleLogout} />

      <main className="flex-1 p-8 md:p-12 relative overflow-y-auto h-screen">
        <div className="absolute inset-0 tech-grid pointer-events-none opacity-10" />
        
        {/* Brand Tag Flotante */}
        <div className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md z-30">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-300 font-sans">
            PROJECT CONTROL <span className="text-cyan-400">AI</span>
          </span>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              <p className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]">Sistema de Alumnos Activo</p>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              Panel de <span className="text-cyan-400">Control</span>
            </h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Sección de Cursos */}
              <section>
                <h2 className="text-sm font-black mb-6 uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                  Mis Capacitaciones
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {matriculas.map((m, i) => (
                    <div key={i} className="glass-panel p-8 rounded-[32px] border-white/5 hover:border-cyan-500/20 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-cyan-500/10 transition-all" />
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            m.status === 'VIP'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : m.status === 'INSCRITO' 
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                          }`}>
                            {m.status === 'VIP' ? '💎 Acceso VIP' : m.status === 'INSCRITO' ? 'En Dictado' : 'Graduado'}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold uppercase">
                            {m.status === 'VIP' ? 'Acceso Ilimitado' : m.status === 'INSCRITO' ? 'Acceso Ilimitado' : `${m.daysLeft} días de acceso`}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-white mb-6 uppercase leading-tight">{m.curso}</h3>
                        <div className="flex gap-4">
                          <a 
                            href="/clases-grabadas" 
                            className="flex-1 bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-center"
                          >
                            Ver Clases
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Acceso Directo Zoom Dinámico */}
              {studentZoomSessions.map((session, idx) => (
                <section key={idx} className="relative overflow-hidden rounded-[40px] border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-transparent p-8">
                    <div className="relative z-50 space-y-6">
                      <div className="flex items-center gap-2">
                        <span className="flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">Clase en Vivo Activa ({session.title})</p>
                      </div>
                      
                      <div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Sala de Conferencias</h3>
                        <p className="text-slate-400 text-sm mt-2 max-w-sm">{session.message}</p>
                      </div>

                      <a 
                        href={session.zoomUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-4 w-full md:w-auto bg-white text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] active:scale-95 cursor-pointer"
                      >
                        INGRESAR A ZOOM AHORA
                        <span className="material-symbols-outlined">open_in_new</span>
                      </a>
                    </div>
                </section>
              ))}
            </div>

            {/* Columna Derecha */}
            <div className="space-y-8">
              <section className="glass-panel p-8 rounded-[32px] border-white/10">
                <h2 className="text-xs font-black mb-6 uppercase tracking-[0.2em] text-slate-400">Accesos Rápidos</h2>
                <div className="space-y-3">
                  <a href="/verificar" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-cyan-400 text-lg">verified</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">Mis Certificados</span>
                    </div>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </a>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-orange-400 text-lg">folder</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">Materiales de Clase</span>
                    </div>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </section>

              <section className="glass-panel p-8 rounded-[32px] border-white/10 bg-cyan-500/5">
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-cyan-400">support_agent</span>
                  <h3 className="text-xs font-black uppercase tracking-widest">Soporte Técnico</h3>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed mb-6 italic">
                  "Si tienes problemas con el acceso a Zoom o tus certificados, escríbenos directamente."
                </p>
                <button className="w-full py-4 bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:bg-cyan-500/30 transition-all">
                  Contactar por WhatsApp
                </button>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
