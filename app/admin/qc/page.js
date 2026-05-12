"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import Image from "next/image";

export default function AdminQCDashboard() {
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  const formatearFecha = (fecha) => {
    if (!fecha) return "---";
    const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(fecha + 'T12:00:00').toLocaleDateString('es-ES', opciones);
  };

  async function buscarCertificados() {
    if (!dni) return alert("Ingrese un DNI para revisión");
    setLoading(true);
    setResultados([]);
    setPreviewUrl(null);

    try {
      const { data, error } = await supabase
        .from('vw_certificados_publicos')
        .select('*')
        .eq('dni', dni);

      if (error) throw error;
      if (!data || data.length === 0) {
        alert("DNI no tiene certificados emitidos aún.");
      } else {
        setResultados(data);
      }
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function generarVistaPrevia(cert) {
    setSelectedCert(cert);
    setLoading(true);
    try {
      // Lógica de generación idéntica a 'verificar' pero sin bloqueo de descarga
      const slug = (cert.nombre_curso_oficial || cert.nombre_curso_inscrito || "").toLowerCase();
      let archivo = "cert_gestion_integral.pdf";

      if (slug.includes("licitaciones")) archivo = "cert_licitaciones_ia.pdf";
      else if (slug.includes("evm") || slug.includes("control")) archivo = "cert_control_evm.pdf";
      else if (slug.includes("gerencia") || slug.includes("gestion")) archivo = "cert_gestion_integral.pdf";
      else if (slug.includes("p6")) archivo = "cert_primavera_p6.pdf";
      else if (slug.includes("automation")) archivo = "cert_automation_engineer.pdf";

      const templateUrl = `https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/academia/${archivo}`;
      const response = await fetch(templateUrl);
      const pdfDoc = await PDFDocument.load(await response.arrayBuffer());
      const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontR = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const page1 = pdfDoc.getPages()[0];
      const { width } = page1.getSize();

      const nombreFull = "Ing. " + cert.nombre_completo.toUpperCase();
      const detalle = `con una duración de 45 horas académicas, impartidas del ${formatearFecha(cert.fecha_inicio_clases)} al ${formatearFecha(cert.fecha_fin_clases)} en modalidad online.`;

      // Estampado
      page1.drawText(nombreFull, { x: (width / 2) - 257, y: 430, size: 21, font: fontB, color: rgb(0.98, 0.75, 0.14) });
      
      const dWidth = fontR.widthOfTextAtSize(detalle, 11);
      page1.drawText(detalle, { x: (width / 2) - (dWidth / 2) - 85, y: 278, size: 11, font: fontR, color: rgb(0.2, 0.2, 0.2) });

      // QR
      const qrUrl = `https://projectcontrolai.com/academia/validar.html?v=${cert.codigo_verificacion}`;
      const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 300 });
      const qrImg = await pdfDoc.embedPng(qrDataUrl);
      page1.drawRectangle({ x: 710, y: 83, width: 88, height: 88, color: rgb(1, 1, 1) });
      page1.drawImage(qrImg, { x: 714, y: 87, width: 80, height: 80 });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setPreviewUrl(URL.createObjectURL(blob));

    } catch (err) {
      alert("Error en vista previa: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function resetearDescargas(certId) {
    if (!confirm("¿Deseas resetear el contador de descargas para este alumno?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('certificados').update({ descargas_count: 0 }).eq('id', certId);
      if (error) throw error;
      alert("Contador reseteado. El alumno puede volver a descargar.");
      buscarCertificados();
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase text-white">
              Director <span className="text-cyan-400">QC Dashboard</span>
            </h1>
            <p className="text-slate-500 text-sm font-bold tracking-[0.2em]">CONTROL DE CALIDAD INDUSTRIAL v1.0</p>
          </div>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && buscarCertificados()}
              placeholder="DNI del Alumno"
              className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-white focus:border-cyan-500 outline-none w-64"
            />
            <button 
              onClick={buscarCertificados}
              className="bg-cyan-500 text-slate-950 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all"
            >
              BUSCAR
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Resultados */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-4">Certificados Encontrados</h2>
            {resultados.map(cert => (
              <div 
                key={cert.certificado_id}
                onClick={() => generarVistaPrevia(cert)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer ${selectedCert?.certificado_id === cert.certificado_id ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
              >
                <div className="text-xs font-black text-cyan-400 mb-2 uppercase">{cert.curso_nombre || 'Curso'}</div>
                <div className="text-white font-bold text-sm mb-4">{cert.nombre_completo}</div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 font-bold">Folio: {cert.codigo_verificacion}</span>
                  <span className={`text-[10px] font-black px-2 py-1 rounded ${cert.descargas_count > 0 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {cert.descargas_count > 0 ? 'BLOQUEADO' : 'LIBRE'}
                  </span>
                </div>
                {cert.descargas_count > 0 && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); resetearDescargas(cert.id); }}
                    className="mt-4 w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-[9px] font-black uppercase tracking-tighter"
                  >
                    RESETEAR CONTADOR
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Previsualización */}
          <div className="lg:col-span-2">
            <div className="glass-panel min-h-[600px] rounded-[40px] border-white/5 relative overflow-hidden flex items-center justify-center bg-black/40">
              {previewUrl ? (
                <iframe src={previewUrl} className="w-full h-[600px] rounded-[40px]" />
              ) : (
                <div className="text-center p-12">
                  <div className="text-slate-700 text-6xl mb-6">👁️‍🗨️</div>
                  <p className="text-slate-600 font-bold uppercase text-xs tracking-[0.3em]">Selecciona un certificado para previsualizar</p>
                </div>
              )}
              {loading && (
                <div className="absolute inset-0 bg-[#020617]/80 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-cyan-400 font-black animate-pulse tracking-widest">PROCESANDO...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
