
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StudentPortal() {
  const [dni, setDni] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudentData = async (dniValue) => {
    setLoading(true);
    try {
      // 1. Obtener datos del estudiante
      const { data: student, error: studentError } = await supabase
        .from('estudiantes')
        .select('*')
        .eq('dni', dniValue.trim())
        .single();

      if (studentError || !student) {
        alert("DNI no encontrado");
        return;
      }

      // 2. Obtener sus matrículas
      const { data: enrollments, error: enrollError } = await supabase
        .from('matriculas')
        .select('*')
        .eq('dni', dniValue.trim());

      setStudentData(student);
      setMatriculas(enrollments || []);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
      alert("Error al conectar con la base de datos");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!dni) return alert("Por favor ingresa tu DNI");
    await fetchStudentData(dni);
  };

  // MOCK: En el futuro, esto vendrá de una tabla 'zoom_links' en Supabase
  const zoomLinksMap = {
    "automation": "https://zoom.us/j/123456789",
    "licitaciones": "https://zoom.us/j/987654321",
    "gestion": "https://zoom.us/j/555666777"
  };

  const getZoomLinkForStudent = () => {
    for (const m of matriculas) {
      const cursoLower = m.curso.toLowerCase();
      if (cursoLower.includes("automation")) return zoomLinksMap["automation"];
      if (cursoLower.includes("licitaciones")) return zoomLinksMap["licitaciones"];
      if (cursoLower.includes("gestion")) return zoomLinksMap["gestion"];
    }
    return null;
  };

  const activeZoomLink = getZoomLinkForStudent();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-8">
        <div className="absolute inset-0 tech-grid pointer-events-none opacity-30" />
        <div className="glass-panel p-12 rounded-[40px] border border-white/10 max-w-md w-full relative z-10">
          <h1 className="text-3xl font-black text-white mb-8 text-center uppercase tracking-tighter">
            Portal del <span className="text-cyan-400">Alumno</span>
          </h1>
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Ingresa tu DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full bg-black/50 border border-white/20 rounded-2xl px-6 py-4 text-white outline-none focus:border-cyan-500 transition-all"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full neon-button py-4 rounded-2xl font-black text-sm tracking-[0.2em] uppercase transition-all hover:scale-[1.02]"
            >
              {loading ? "Verificando..." : "Acceder al Ecosistema"}
            </button>
          </div>
          <p className="mt-8 text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            Project Control AI | Security Verified
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 md:p-12">
      <div className="absolute inset-0 tech-grid pointer-events-none opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              Hola, <span className="text-cyan-400">{studentData.nombre}</span>
            </h1>
            <p className="text-slate-400 font-light uppercase tracking-[0.3em] text-[10px] mt-2">
              Panel del Estudiante v1.0
            </p>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Cerrar Sesión
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="glass-panel p-8 rounded-[32px] border-white/10">
              <h2 className="text-xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-cyan-400">school</span>
                Mis Cursos Activos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matriculas.length > 0 ? matriculas.map((m, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group">
                    <p className="text-[10px] text-cyan-500 font-black uppercase mb-1">En Curso</p>
                    <h3 className="text-lg font-bold mb-4">{m.curso}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Edición: {m.edicion_curso || 'Actual'}</span>
                      <span className="material-symbols-outlined text-cyan-400 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full p-8 rounded-2xl bg-white/5 border border-dashed border-white/10 text-center">
                    <p className="text-slate-500 text-sm">No tienes cursos activos.</p>
                  </div>
                )}
              </div>
            </section>

            <section className="glass-panel p-8 rounded-[32px] border-white/10">
              <h2 className="text-xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-cyan-400">live_tv</span>
                Clase en Vivo (Acceso Directo)
              </h2>
              {activeZoomLink ? (
                <div className="p-8 rounded-[32px] bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  </div>
                  <div className="relative z-10 space-y-4">
                    <div>
                      <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.2em] mb-1">Sesión Activa</p>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Conexión vía Zoom</h3>
                      <p className="text-slate-400 text-sm font-light mt-2">Ya puedes ingresar a la sesión de hoy. Recuerda tener tu micrófono apagado al entrar.</p>
                    </div>
                    <a 
                      href={activeZoomLink} 
                      target="_blank" 
                      className="inline-flex items-center gap-4 bg-cyan-500 text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                    >
                      Entrar a la Clase Ahora
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-[32px] bg-white/5 border border-dashed border-white/10 text-center">
                  <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">No hay clases en vivo programadas en este momento</p>
                  <p className="text-[10px] text-slate-600 mt-2">Las sesiones suelen iniciar a las 19:00 PM (GMT-5)</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section className="glass-panel p-8 rounded-[32px] border-white/10">
              <h2 className="text-xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-cyan-400">verified</span>
                Mis Certificados
              </h2>
              <div className="space-y-4">
                {matriculas.length > 0 ? (
                  matriculas.map((m, i) => (
                    <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider">{m.curso}</p>
                        <p className="text-[10px] text-slate-500 uppercase mt-1">Habilitado</p>
                      </div>
                      <button className="text-cyan-400 material-symbols-outlined hover:scale-110 transition-transform">download</button>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center">No hay certificados emitidos aún.</p>
                )}
              </div>
            </section>

            <section className="glass-panel p-8 rounded-[32px] border-white/10">
              <h2 className="text-xl font-black mb-6 uppercase tracking-tight">Recursos Generales</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                  <span className="material-symbols-outlined text-orange-400 group-hover:rotate-12 transition-transform">description</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Metodología PCAI v5.2</span>
                </li>
                <li className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                  <span className="material-symbols-outlined text-blue-400 group-hover:rotate-12 transition-transform">link</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Drive de Estudiantes</span>
                </li>
              </ul>
            </section>

            <section className="glass-panel p-8 rounded-[32px] border-white/10">
              <h2 className="text-xl font-black mb-6 uppercase tracking-tight">Calificaciones</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-xs text-slate-400 uppercase font-bold">Examen Módulo 1</span>
                  <span className="text-lg font-black text-cyan-400">18/20</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-xs text-slate-400 uppercase font-bold">Taller Práctico</span>
                  <span className="text-lg font-black text-cyan-400">--</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
