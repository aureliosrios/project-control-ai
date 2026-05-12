// QC Dashboard v1.1 - Force Sync
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import Image from "next/image";

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
      const { data, error } = await supabase.from('vw_certificados_publicos').select('*').eq('dni', dni);
      if (error) throw error;
      setResultados(data || []);
    } catch (e) { alert("Error: " + e.message); }
    finally { setLoading(false); }
  }

  async function generarVistaPrevia(cert) {
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

      page1.drawText(nombreFull, { x: (width / 2) - 257, y: 430, size: 21, font: fontB, color: rgb(0.98, 0.75, 0.14) });
      const dWidth = fontR.widthOfTextAtSize(detalle, 11);
      page1.drawText(detalle, { x: (width / 2) - (dWidth / 2) - 85, y: 278, size: 11, font: fontR, color: rgb(0.2, 0.2, 0.2) });

      const qrUrl = `https://projectcontrolai.com/academia/validar.html?v=${cert.codigo_verificacion}`;
      const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 300 });
      const qrImg = await pdfDoc.embedPng(qrDataUrl);
      page1.drawRectangle({ x: 710, y: 83, width: 88, height: 88, color: rgb(1, 1, 1) });
      page1.drawImage(qrImg, { x: 714, y: 87, width: 80, height: 80 });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setPreviewUrl(URL.createObjectURL(blob));
    } catch (err) { alert("Error: " + err.message); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black uppercase mb-12">QC <span className="text-cyan-400">Dashboard</span></h1>
        <div className="flex gap-4 mb-8">
          <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} placeholder="DNI" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
          <button onClick={buscarCertificados} className="bg-cyan-500 text-black px-6 py-2 rounded-xl font-bold uppercase text-xs">Buscar</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            {resultados.map(cert => (
              <div key={cert.certificado_id} onClick={() => generarVistaPrevia(cert)} className="p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10">
                <div className="text-sm font-bold">{cert.nombre_completo}</div>
                <div className="text-xs text-slate-500">{cert.codigo_verificacion}</div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 bg-black/40 rounded-3xl min-h-[500px] flex items-center justify-center relative overflow-hidden">
            {previewUrl ? <iframe src={previewUrl} className="w-full h-[600px] rounded-3xl" /> : <p className="text-slate-600 uppercase font-black text-xs tracking-widest">Vista Previa</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
