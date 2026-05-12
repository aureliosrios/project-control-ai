// QC Dashboard v1.5 - Data Integrity Patch
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
      const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
      // Normalizar fecha si viene en formato YYYY-MM-DD
      const dateObj = new Date(fecha.includes('T') ? fecha : fecha + 'T12:00:00');
      return dateObj.toLocaleDateString('es-ES', opciones);
    } catch (e) { return "Error Fecha"; }
  };

  async function buscarCertificados() {
    if (!dni) return alert("Ingrese un DNI");
    setLoading(true);
    setResultados([]);
    setPreviewUrl(null);
    try {
      const { data, error } = await supabase
        .from('vw_certificados_publicos')
        .select('*')
        .eq('dni', dni.trim());
      
      if (error) throw error;
      const res = data || [];
      setResultados(res);
      if (res.length > 0) generarCertificado(res[0], 'preview');
    } catch (e) { alert("Error: " + e.message); }
    finally { setLoading(false); }
  }

  async function generarCertificado(cert, mode = 'preview') {
    setSelectedCert(cert);
    if (mode === 'preview') setLoading(true);
    
    try {
      // VALIDACIÓN DE DATOS CRÍTICOS
      const pNombre = cert.prof_nombre || "Aurelio"; // Fallback por si la vista falla
      const pApellido = cert.prof_apellido || "Solórzano Ríos";
      const pFirma = cert.prof_firma || "https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/Firmas/firma_aurelio_76508.png";
      const fInicio = cert.fecha_inicio_clases || "2026-04-19";
      const fFin = cert.fecha_fin_clases || "2026-05-24";

      const slug = (cert.nombre_curso_oficial || cert.nombre_curso_inscrito || "").toLowerCase();
      let archivo = "cert_gestion_integral.pdf";
      if (slug.includes("licitaciones")) archivo = "cert_licitaciones_ia.pdf";
      else if (slug.includes("evm") || slug.includes("control")) archivo = "cert_control_evm.pdf";
      else if (slug.includes("gerencia") || slug.includes("gestion")) archivo = "cert_gestion_integral.pdf";
      else if (slug.includes("p6")) archivo = "cert_primavera_p6.pdf";
      else if (slug.includes("automation")) archivo = "cert_automation_engineer.pdf";

      const templateUrl = `https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/academia/${archivo}?t=${Date.now()}`;
      const response = await fetch(templateUrl);
      const pdfDoc = await PDFDocument.load(await response.arrayBuffer());
      const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontR = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const page1 = pdfDoc.getPages()[0];
      const { width } = page1.getSize();

      const nombreFull = "Ing. " + (cert.nombre_completo || "SIN NOMBRE").toUpperCase();
      const detalle = `con una duración de 45 horas académicas, impartidas del ${formatearFecha(fInicio)} al ${formatearFecha(fFin)} en modalidad online.`;

      page1.drawText(nombreFull, { x: (width / 2) - 257, y: 430, size: 21, font: fontB, color: rgb(0.98, 0.75, 0.14) });
      const dWidth = fontR.widthOfTextAtSize(detalle, 11);
      page1.drawText(detalle, { x: (width / 2) - (dWidth / 2) - 85, y: 278, size: 11, font: fontR, color: rgb(0.2, 0.2, 0.2) });

      // Firma e Instructor
      try {
        const fImg = await pdfDoc.embedPng(await (await fetch(pFirma)).arrayBuffer());
        page1.drawImage(fImg, { x: 437, y: 120, width: 120, height: 120 });
      } catch (e) { console.error("Error firma:", e); }
      
      page1.drawText(`Ing. ${pNombre} ${pApellido}`, { x: 448, y: 74, size: 10, font: fontB });

      const qrUrl = `https://projectcontrolai.com/academia/validar.html?v=${cert.codigo_verificacion}`;
      const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 300 });
      const qrImg = await pdfDoc.embedPng(qrDataUrl);
      page1.drawRectangle({ x: 710, y: 83, width: 88, height: 88, color: rgb(1, 1, 1) });
      page1.drawImage(qrImg, { x: 714, y: 87, width: 80, height: 80 });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      if (mode === 'preview') setPreviewUrl(url);
      else {
        const link = document.createElement("a");
        link.href = url;
        link.download = `CERT_${cert.dni}.pdf`;
        link.click();
      }
    } catch (err) { alert("Error: " + err.message); }
    finally { setLoading(false); }
  }

  async function habilitar(id) {
    if (!confirm("¿Habilitar descarga?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('certificados').update({ descargas_count: 0 }).eq('id', id);
      if (error) throw error;
      alert("Habilitado.");
      buscarCertificados();
    } catch (e) { alert("Error: " + e.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans p-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 bg-white/5 p-8 rounded-[32px] border border-white/10">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">QC <span className="text-cyan-400">ADMIN</span></h1>
            <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase">Data Integrity v1.5</p>
          </div>
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
                <div className="flex flex-col gap-2">
                  <button onClick={(e) => { e.stopPropagation(); habilitar(cert.id); }} className="w-full py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[9px] font-black uppercase">Habilitar Alumno</button>
                  <button onClick={(e) => { e.stopPropagation(); generarCertificado(cert, 'download'); }} className="w-full py-3 bg-white/5 text-white border border-white/10 rounded-xl text-[9px] font-black uppercase">Descargar Admin</button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 bg-black/60 rounded-[50px] border border-white/5 min-h-[700px] flex items-center justify-center relative overflow-hidden backdrop-blur-3xl shadow-2xl">
            {previewUrl ? <iframe src={previewUrl} className="w-full h-[700px] rounded-[50px]" title="Preview" /> : <div className="text-center opacity-20"><div className="text-7xl mb-4">📜</div><p className="text-[10px] font-black uppercase tracking-widest">Esperando Selección</p></div>}
            {loading && <div className="absolute inset-0 bg-[#020617]/90 flex items-center justify-center text-cyan-400 font-black animate-pulse">CARGANDO...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
