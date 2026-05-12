// QC Dashboard v1.4 - Auto-Preview & Improved UX
"use client";
import { useState, useEffect } from "react";
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
    setSelectedCert(null);

    try {
      const { data, error } = await supabase.from('vw_certificados_publicos').select('*').eq('dni', dni);
      if (error) throw error;
      
      const res = data || [];
      setResultados(res);
      
      // AUTO-PREVIEW: Si hay resultados, cargar el primero automáticamente
      if (res.length > 0) {
        generarCertificado(res[0], 'preview');
      }
    } catch (e) { alert("Error: " + e.message); }
    finally { setLoading(false); }
  }

  async function generarCertificado(cert, mode = 'preview') {
    setSelectedCert(cert);
    if (mode === 'preview') setLoading(true);
    
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

      page1.drawText(nombreFull, { x: (width / 2) - 257, y: 430, size: 21, font: fontB, color: rgb(0.98, 0.75, 0.14) });
      const dWidth = fontR.widthOfTextAtSize(detalle, 11);
      page1.drawText(detalle, { x: (width / 2) - (dWidth / 2) - 85, y: 278, size: 11, font: fontR, color: rgb(0.2, 0.2, 0.2) });

      if (cert.prof_firma) {
        try {
          const fImg = await pdfDoc.embedPng(await (await fetch(cert.prof_firma)).arrayBuffer());
          page1.drawImage(fImg, { x: 437, y: 120, width: 120, height: 120 });
        } catch (e) { console.warn("Error firma", e); }
      }
      page1.drawText(`Ing. ${cert.prof_nombre} ${cert.prof_apellido}`, { x: 448, y: 74, size: 10, font: fontB });

      const qrUrl = `https://projectcontrolai.com/academia/validar.html?v=${cert.codigo_verificacion}`;
      const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 300 });
      const qrImg = await pdfDoc.embedPng(qrDataUrl);
      page1.drawRectangle({ x: 710, y: 83, width: 88, height: 88, color: rgb(1, 1, 1) });
      page1.drawImage(qrImg, { x: 714, y: 87, width: 80, height: 80 });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      if (mode === 'preview') { setPreviewUrl(url); } 
      else {
        const link = document.createElement("a");
        link.href = url;
        link.download = `QC_ADMIN_${cert.codigo_verificacion}.pdf`;
        link.click();
      }
    } catch (err) { alert("Error: " + err.message); }
    finally { setLoading(false); }
  }

  async function resetearContador(id) {
    if (!confirm("¿Habilitar descarga (Poner en 0)?")) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('certificados').update({ descargas_count: 0 }).eq('id', id);
      if (error) throw error;
      alert("Listo. Contador en 0.");
      buscarCertificados();
    } catch (e) { alert("Error: " + e.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans p-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl">
          <div>
            <h1 className="text-4xl font-black uppercase text-white tracking-tighter">QC <span className="text-cyan-400">ADMIN PANEL</span></h1>
            <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] mt-1 uppercase">Control de Calidad v1.4</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <input 
              type="text" 
              value={dni} 
              onChange={(e) => setDni(e.target.value)} 
              onKeyDown={(e)=>e.key==='Enter' && buscarCertificados()} 
              placeholder="Ingrese DNI..." 
              className="bg-black/50 border border-white/20 rounded-2xl px-6 py-4 text-white outline-none w-full md:w-64 focus:border-cyan-500 transition-all" 
            />
            <button onClick={buscarCertificados} className="bg-cyan-500 text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all">
              BUSCAR
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] px-4">Resultados</h2>
            {resultados.map(cert => (
              <div 
                key={cert.certificado_id} 
                onClick={() => generarCertificado(cert, 'preview')} 
                className={`p-8 rounded-[40px] border transition-all cursor-pointer group ${selectedCert?.certificado_id === cert.certificado_id ? 'bg-cyan-500/15 border-cyan-500/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
              >
                <div className="text-white font-bold text-lg mb-6 leading-tight">{cert.nombre_completo}</div>
                <div className="grid grid-cols-1 gap-3">
                  <button onClick={(e) => { e.stopPropagation(); resetearContador(cert.id); }} className="w-full py-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest">Habilitar Alumno</button>
                  <button onClick={(e) => { e.stopPropagation(); generarCertificado(cert, 'download'); }} className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest">Descarga Admin</button>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                   <span>Descargas: {cert.descargas_count}</span>
                   <span>Folio: {cert.codigo_verificacion}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-black/60 rounded-[50px] border border-white/5 min-h-[700px] flex items-center justify-center relative overflow-hidden backdrop-blur-3xl shadow-2xl">
              {previewUrl ? (
                <iframe src={previewUrl} className="w-full h-[700px] rounded-[50px] border-none" title="Vista Previa" />
              ) : (
                <div className="text-center opacity-30">
                  <div className="text-7xl mb-6">📜</div>
                  <p className="text-[10px] font-black tracking-[0.5em] uppercase text-slate-400">
                    {loading ? "Generando Vista Previa..." : "Seleccione un certificado"}
                  </p>
                </div>
              )}
              {loading && (
                <div className="absolute inset-0 bg-[#020617]/90 flex flex-col items-center justify-center gap-4 backdrop-blur-md">
                  <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                  <div className="text-cyan-400 font-black text-xs uppercase tracking-[0.4em]">Cargando PDF...</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
