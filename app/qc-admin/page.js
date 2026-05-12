// QC Dashboard v1.2 - Pro Admin Features
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";

export default function QCDashboard() {
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
    if (!dni) return alert("Ingrese un DNI");
    setLoading(true);
    setResultados([]);
    setPreviewUrl(null);
    try {
      // Usamos la vista pública para tener todos los datos de curso e instructor
      const { data, error } = await supabase.from('vw_certificados_publicos').select('*').eq('dni', dni);
      if (error) throw error;
      setResultados(data || []);
    } catch (e) { alert("Error: " + e.message); }
    finally { setLoading(false); }
  }

  async function generarCertificado(cert, mode = 'preview') {
    setSelectedCert(cert);
    setLoading(true);
    try {
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

      // Estampado de Datos
      page1.drawText(nombreFull, { x: (width / 2) - 257, y: 430, size: 21, font: fontB, color: rgb(0.98, 0.75, 0.14) });
      const dWidth = fontR.widthOfTextAtSize(detalle, 11);
      page1.drawText(detalle, { x: (width / 2) - (dWidth / 2) - 85, y: 278, size: 11, font: fontR, color: rgb(0.2, 0.2, 0.2) });

      // FIRMA DEL INSTRUCTOR (Añadido)
      if (cert.prof_firma) {
        try {
          const fImg = await pdfDoc.embedPng(await (await fetch(cert.prof_firma)).arrayBuffer());
          page1.drawImage(fImg, { x: 437, y: 120, width: 120, height: 120 });
        } catch (e) { console.warn("Error firma", e); }
      }
      page1.drawText(`Ing. ${cert.prof_nombre} ${cert.prof_apellido}`, { x: 448, y: 74, size: 10, font: fontB });

      // QR
      const qrUrl = `https://projectcontrolai.com/academia/validar.html?v=${cert.codigo_verificacion}`;
      const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 300 });
      const qrImg = await pdfDoc.embedPng(qrDataUrl);
      page1.drawRectangle({ x: 710, y: 83, width: 88, height: 88, color: rgb(1, 1, 1) });
      page1.drawImage(qrImg, { x: 714, y: 87, width: 80, height: 80 });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      if (mode === 'preview') {
        setPreviewUrl(url);
      } else {
        const link = document.createElement("a");
        link.href = url;
        link.download = `QC_ADMIN_${cert.codigo_verificacion}.pdf`;
        link.click();
      }

    } catch (err) { alert("Error: " + err.message); }
    finally { setLoading(false); }
  }

  async function resetearContador(id) {
    if (!confirm("¿Habilitar descarga para el alumno (Poner en 0)?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('certificados').update({ descargas_count: 0 }).eq('id', id);
      if (error) throw error;
      alert("Contador reseteado a 0.");
      buscarCertificados();
    } catch (e) { alert("Error: " + e.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase text-white tracking-tighter">QC <span className="text-cyan-400">ADMIN PANEL</span></h1>
            <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] mt-1">INDUSTRIAL VERIFICATION SYSTEM</p>
          </div>
          <div className="flex gap-4">
            <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} onKeyDown={(e)=>e.key==='Enter' && buscarCertificados()} placeholder="DNI del Alumno" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-white outline-none w-64 focus:border-cyan-500" />
            <button onClick={buscarCertificados} className="bg-cyan-500 text-black px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">BUSCAR</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            <h2 className="text-xs font-black text-slate-600 uppercase tracking-widest">Resultados</h2>
            {resultados.map(cert => (
              <div key={cert.certificado_id} onClick={() => generarCertificado(cert, 'preview')} className={`p-6 rounded-[32px] border transition-all cursor-pointer ${selectedCert?.certificado_id === cert.certificado_id ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                <div className="text-[10px] font-black text-cyan-400 mb-2 uppercase">{cert.curso_nombre}</div>
                <div className="text-white font-bold mb-4">{cert.nombre_completo}</div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button onClick={(e) => { e.stopPropagation(); resetearContador(cert.id); }} className="py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-[9px] font-black uppercase">Habilitar Alumno</button>
                  <button onClick={(e) => { e.stopPropagation(); generarCertificado(cert, 'download'); }} className="py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-[9px] font-black uppercase">Bajar (Admin)</button>
                </div>
                
                <div className="mt-4 flex justify-between items-center text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                   <span>Descargas: {cert.descargas_count}</span>
                   <span>Folio: {cert.codigo_verificacion}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-black/40 rounded-[40px] border border-white/5 min-h-[650px] flex items-center justify-center relative overflow-hidden backdrop-blur-xl">
              {previewUrl ? (
                <iframe src={previewUrl} className="w-full h-[650px] rounded-[40px]" title="Vista Previa" />
              ) : (
                <div className="text-center opacity-20">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-[10px] font-black tracking-[0.5em] uppercase">Esperando Selección</p>
                </div>
              )}
              {loading && <div className="absolute inset-0 bg-[#020617]/80 flex items-center justify-center font-black text-cyan-400 animate-pulse">PROCESANDO...</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
