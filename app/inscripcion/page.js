"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Inscripcion() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    profesion: "",
    telefono: "",
    email: "",
    curso: "",
    metodo_pago: "Yape / Plin"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        fecha: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
        pago_realizado: 'NO',
        validado_director: false,
        edicion_curso: 'AUTO-REGISTRO'
      };

      // Check if student exists
      let { data: existingStudent } = await supabase
        .from('estudiantes')
        .select('id')
        .eq('dni', formData.dni)
        .maybeSingle();

      let studentId;
      if (existingStudent) {
        studentId = existingStudent.id;
        await supabase.from('estudiantes').update(formData).eq('id', studentId);
      } else {
        const { data: newStudent, error } = await supabase
          .from('estudiantes')
          .insert([formData])
          .select()
          .single();
        if (error) throw error;
        studentId = newStudent.id;
      }

      // Create enrollment
      const { error: enrollError } = await supabase
        .from('matriculas')
        .insert([{ ...payload, estudiante_id: studentId }]);
      
      if (enrollError) throw enrollError;

      setSuccess(true);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 pt-32 pb-20">
        <div className="glass-card p-12 rounded-3xl border-white/5 text-center max-w-md w-full animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
          <h2 className="text-3xl font-bold text-white mb-4">¡Registro Exitoso!</h2>
          <p className="text-slate-400 mb-8">Para validar tu vacante, envía tu voucher por WhatsApp.</p>
          <Link 
            href={`https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20soy%20${formData.nombre}.%20Me%20inscrib%C3%AD%20al%20curso%20${formData.curso}.%20Adjunto%20voucher.`}
            target="_blank"
            className="block w-full py-4 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all"
          >
            Enviar Voucher por WhatsApp
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-32 pb-20 selection:bg-cyan-500/30">
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-20" />
      
      <main className="relative max-w-2xl mx-auto px-6">
        <div className="glass-card rounded-3xl border-white/5 p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Ficha de Inscripción</h1>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Academia de Ingeniería & Construcción</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nombre(s)</label>
                <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 transition-all outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Apellidos</label>
                <input type="text" name="apellido" required value={formData.apellido} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 transition-all outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">DNI / Cedula / Pasaporte</label>
              <input type="text" name="dni" required value={formData.dni} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 transition-all outline-none" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Profesión / Cargo Actual</label>
              <input type="text" name="profesion" required value={formData.profesion} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 transition-all outline-none" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">WhatsApp</label>
                <input type="tel" name="telefono" required value={formData.telefono} onChange={handleChange} placeholder="+51" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 transition-all outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Correo Electrónico</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 transition-all outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Curso a Inscribirse</label>
              <select name="curso" required value={formData.curso} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 transition-all outline-none appearance-none">
                <option value="" disabled>Seleccione curso...</option>
                <option value="Gestion Proyectos IA">1. El Despertar de la IA para la Gestión de Proyectos</option>
                <option value="Automation Engineer">2. Ingeniería Aumentada: Automatización con Agentes de IA</option>
                <option value="Licitaciones Inteligentes">3. Licitaciones Inteligentes con IA</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Medio de Pago</label>
              <select name="metodo_pago" required value={formData.metodo_pago} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 transition-all outline-none">
                <option value="Yape / Plin">Yape / Plin</option>
                <option value="Transferencia BCP">Transferencia BCP</option>
                <option value="Paypal / Tarjeta">Paypal / Tarjeta</option>
                <option value="Hotmart">Hotmart</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-cyan-500 text-slate-950 py-4 rounded-xl font-bold text-lg hover:bg-cyan-400 transition-all disabled:opacity-50 mt-4 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
            >
              {loading ? "PROCESANDO..." : "FINALIZAR INSCRIPCIÓN"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
