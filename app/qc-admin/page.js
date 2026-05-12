// QC Dashboard v1.6 - FINAL STAMPING FIX
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
    if (!fecha || fecha === "---") return "---";
    try {
      const dateObj = new Date(fecha.includes('T') ? fecha : fecha + 'T12:00:00');
      return dateObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) { return "Error"; }
  };

  async function buscarCertificados() {
    if (!dni) return alert("Ingrese DNI");
    setLoading(true);
    try {
      const { data, error } = await supabase.from('vw_certificados_publicos').select('*').eq('dni', dni.trim());
      if (error) throw error;
      setResultados(data || []);
      if (data && data.length > 0) generarCertificado(data[0], 'preview');
    } catch (e) { alert(e.message); }
    finally { setLoading(false); }
  }

  async function generarCertificado(cert, mode = 'preview') {
    setSelectedCert(cert);
    if (mode === 'preview') setLoading(true);
    try {
      const isPrimavera = (cert.nombre_curso_oficial || cert.nombre_curso_inscrito || "").toLowerCase().includes("primavera");
      
      const pNombre = cert.prof_nombre || (isPrimavera ? "Mario" : "Aurelio");
      const pApellido = cert.prof_apellido || (isPrimavera ? "Huilca Ayma" : "Solórzano Ríos");
      const pCIP = cert.prof_cip || (isPrimavera ? "186892" : "76508");
      const pFirma = cert.prof_firma || (isPrimavera 
        ? "https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/Firmas/firma_mario_186892.png" 
        : "https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/Firmas/firma_aurelio_76508.png"
      );
      
      const slug = (cert.nombre_curso_oficial || cert.nombre_curso_inscrito || "").toLowerCase();
      let plantilla = "cert_gestion_integral.pdf";
      if (slug.includes("automation")) plantilla = "cert_automation_engineer.pdf";
      else if (slug.includes("licitaciones")) plantilla = "cert_licitaciones_ia.pdf";
      else if (slug.includes("evm")) plantilla = "cert_control_evm.pdf";

      const response = await fetch(`https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/academia/${plantilla}`);
      const pdfDoc = await PDFDocument.load(await response.arrayBuffer());
      const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontR = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const page1 = pdfDoc.getPages()[0];
      const { width } = page1.getSize();

      // ESTAMPADO
      page1.drawText("Ing. " + (cert.nombre_completo || "").toUpperCase(), { x: (width / 2) - 257, y: 430, size: 21, font: fontB, color: rgb(0.98, 0.75, 0.14) });
      
      const detalle = `con una duración de 45 horas académicas, impartidas del ${formatearFecha(cert.fecha_inicio_clases)} al ${formatearFecha(cert.fecha_fin_clases)} en modalidad online.`;
      page1.drawText(detalle, { x: (width / 2) - (fontR.widthOfTextAtSize(detalle, 11) / 2) - 85, y: 278, size: 11, font: fontR, color: rgb(0.2, 0.2, 0.2) });

      // FIRMA E INSTRUCTOR
      try {
        const fImg = await pdfDoc.embedPng(await (await fetch(pFirma)).arrayBuffer());
        page1.drawImage(fImg, { x: 437, y: 120, width: 120, height: 120 });
      } catch (e) {}
      
      page1.drawText(`Ing. ${pNombre} ${pApellido}`, { x: 448, y: 76, size: 10, font: fontB });
      page1.drawText(`CIP: ${pCIP}`, { x: 448, y: 66, size: 9, font: fontR });

      const qrUrl = `https://projectcontrolai.com/academia/validar.html?v=${cert.codigo_verificacion}`;
      const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 300 });
      const qrImg = await pdfDoc.embedPng(qrDataUrl);
      page1.drawRectangle({ x: 710, y: 83, width: 88, height: 88, color: rgb(1, 1, 1) });
      page1.drawImage(qrImg, { x: 714, y: 87, width: 80, height: 80 });

      const pdfBytes = await pdfDoc.save();
      const url = URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));

      if (mode === 'preview') setPreviewUrl(url);
      else {
        const link = document.createElement("a");
        link.href = url;
        link.download = `QC_${cert.dni}.pdf`;
        link.click();
      }
    } catch (e) { alert(e.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans p-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12 bg-white/5 p-8 rounded-[32px] border border-white/10">
          <h1 className="text-4xl font-black uppercase">QC <span className="text-cyan-400">ADMIN v1.6</span></h1>
          <div className="flex gap-4">
            <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} onKeyDown={(e)=>e.key==='Enter' && buscarCertificados()} placeholder="DNI..." className="bg-black/50 border border-white/20 rounded-2xl px-6 py-4 text-white outline-none w-64" />
            <button onClick={buscarCertificados} className="bg-cyan-500 text-black px-8 py-4 rounded-2xl font-black text-xs">BUSCAR</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            {resultados.map(cert => (
              <div key={cert.certificado_id} onClick={() => generarCertificado(cert, 'preview')} className={`p-8 rounded-[40px] border transition-all cursor-pointer ${selectedCert?.certificado_id === cert.certificado_id ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                <div className="text-white font-bold text-lg mb-6">{cert.nombre_completo}</div>
                <button onClick={(e) => { e.stopPropagation(); generarCertificado(cert, 'download'); }} className="w-full py-4 bg-white/5 text-white border border-white/10 rounded-2xl text-[10px] font-black uppercase">Descargar (Admin)</button>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 bg-black/60 rounded-[50px] border border-white/5 min-h-[700px] flex items-center justify-center relative overflow-hidden backdrop-blur-3xl shadow-2xl">
            {previewUrl ? <iframe src={previewUrl} className="w-full h-[700px] rounded-[50px]" title="Preview" /> : <div className="text-center opacity-20">Seleccione un certificado</div>}
            {loading && <div className="absolute inset-0 bg-[#020617]/90 flex items-center justify-center text-cyan-400 font-black animate-pulse uppercase">Cargando PDF...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
