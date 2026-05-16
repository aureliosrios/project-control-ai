
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "./components/Sidebar";

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
      const { data: student, error: studentError } = await supabase
        .from('estudiantes')
        .select('*')
        .eq('dni', dniValue.trim())
        .single();

      if (studentError || !student) {
        alert("DNI no encontrado");
        localStorage.removeItem("pcai_student_dni");
        return;
      }

      const { data: enrollments, error: enrollError } = await supabase
        .from('matriculas')
        .select('*')
        .eq('dni', dniValue.trim());

      setStudentData(student);
      setMatriculas(enrollments || []);
      setIsLoggedIn(true);
      localStorage.setItem("pcai_student_dni", dniValue.trim());
    } catch (err) {
      console.error(err);
      alert("Error al conectar con la base de datos");
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
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
              PCAI <span className="text-cyan-400">Portal</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Acceso Exclusivo para Alumnos</p>
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

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <Sidebar studentName={studentData.nombre} onLogout={handleLogout} />

      <main className="flex-1 p-8 md:p-12 relative overflow-y-auto h-screen">
        <div className="absolute inset-0 tech-grid pointer-events-none opacity-10" />
        
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
                          <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-cyan-500/20">
                            Activo
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold uppercase">{calculateDaysLeft(m)} días restantes</span>
                        </div>
                        <h3 className="text-xl font-black text-white mb-6 uppercase leading-tight">{m.curso}</h3>
                        <div className="flex gap-4">
                          <button className="flex-1 bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                            Ver Clases
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Acceso Directo Zoom */}
              <section className="p-8 rounded-[40px] bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent border border-cyan-500/20 relative group">
                <div className="flex flex-col md:row items-center gap-8 justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">En Vivo Ahora</p>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Sala de Conferencias</h3>
                    <p className="text-slate-400 text-sm max-w-sm">Acceso directo a la sesión sincrónica de hoy. No necesitas contraseña.</p>
                  </div>
                  <button className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                    Unirse a Sesión
                  </button>
                </div>
              </section>
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
