// QC Dashboard v2.0 - ASYNC + SYNC FIX
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
      const slug = (cert.nombre_curso_oficial || cert.nombre_curso_inscrito || "").toLowerCase();

      // Detectar si es ASINCRÓNICO
      const isAsincronico = (
        slug.includes("despertar") ||
        slug.includes("forense") ||
        slug.includes("presupuesto") ||
        slug.includes("asincronico") ||
        (cert.edicion_grupo || "").toUpperCase().includes("ASINCRONICO")
      );

      // ── RAMA ASINCRÓNICA ──────────────────────────────────────────
      if (isAsincronico) {
        let archivoAsinc = "asinc_despertar.pdf";
        if (slug.includes("forense")) archivoAsinc = "asinc_forense.pdf";
        else if (slug.includes("presupuesto")) archivoAsinc = "asinc_presupuestos.pdf";

        const response = await fetch(`https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/academia/${archivoAsinc}`);
        if (!response.ok) throw new Error(`No se pudo cargar la plantilla asincrónica: ${archivoAsinc}`);

        const pdfDoc = await PDFDocument.load(await response.arrayBuffer());
        const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontR = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const page1 = pdfDoc.getPages()[0];
        const { width } = page1.getSize();

        const nombreFull = ("Ing. " + (cert.nombre_completo || "")).toUpperCase();
        const fechaEmision = new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });

        // Nombre del alumno
        page1.drawText(nombreFull, {
          x: (width / 2) - 257, y: 430, size: 21,
          font: fontB, color: rgb(0.98, 0.75, 0.14)
        });

        // Detalle modalidad asincrónica
        const detalle = `con una duración de 12 horas académicas en modalidad asincrónica autogestionada.`;
        const dWidth = fontR.widthOfTextAtSize(detalle, 11);
        page1.drawText(detalle, {
          x: (width / 2) - (dWidth / 2) - 85, y: 250, size: 11,
          font: fontR, color: rgb(0.2, 0.2, 0.2)
        });

        // Firma Aurelio Solórzano
        try {
          const firmaUrl = "https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/Firmas/firma_aurelio_76508.png";
          const fImg = await pdfDoc.embedPng(await (await fetch(firmaUrl)).arrayBuffer());
          page1.drawImage(fImg, { x: 458, y: 116, width: 78, height: 78 });
        } catch (e) {}

        // Instructor y CIP centrados
        const instNombre = `Ing. Aurelio Solórzano Ríos`;
        const instCIP = `CIP: 76508`;
        page1.drawText(instNombre, { x: 442, y: 76, size: 10, font: fontB });
        page1.drawText(instCIP, {
          x: 442 + (fontB.widthOfTextAtSize(instNombre, 10) / 2) - (fontR.widthOfTextAtSize(instCIP, 9) / 2),
          y: 66, size: 9, font: fontR
        });

        // Fecha de emisión
        const labelFecha = `Fecha de emisión: ${fechaEmision}`;
        page1.drawText(labelFecha, {
          x: width - 322, y: 47, size: 8,
          font: fontR, color: rgb(0.3, 0.3, 0.3)
        });

        // QR Code
        const qrUrl = `https://project-control-ai-one.vercel.app/verificar?v=${cert.codigo_verificacion}`.trim();
        const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 2, width: 400, errorCorrectionLevel: 'L' });
        const qrImg = await pdfDoc.embedPng(qrDataUrl);
        page1.drawRectangle({ x: 710, y: 83, width: 88, height: 88, color: rgb(1, 1, 1) });
        page1.drawImage(qrImg, { x: 712, y: 85, width: 84, height: 84 });

        // Página 2
        if (pdfDoc.getPages().length > 1) {
          const p2 = pdfDoc.getPages()[1];
          const { width: w2 } = p2.getSize();
          const textImparticion = `Modalidad Asincrónica autogestionada. Fecha de culminación: ${fechaEmision}`;
          const twImparticion = fontB.widthOfTextAtSize(textImparticion, 11);
          p2.drawText(textImparticion, {
            x: (w2 / 2) - (twImparticion / 2), y: 77, size: 11,
            font: fontB, color: rgb(0.2, 0.2, 0.2)
          });
          const emisionP2 = `Fecha de Emisión: ${new Date().toLocaleDateString('es-PE')} ${new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
          p2.drawText(emisionP2, {
            x: w2 - fontR.widthOfTextAtSize(emisionP2, 8) - 8, y: 45, size: 8,
            font: fontR, color: rgb(0.3, 0.3, 0.3)
          });
        }

        const pdfBytes = await pdfDoc.save();
        const url = URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));
        if (mode === 'preview') { setPreviewUrl(url); }
        else {
          const link = document.createElement("a");
          link.href = url;
          link.download = `QC_Asinc_${cert.codigo_verificacion}.pdf`;
          link.click();
        }
        return; // Salir — no ejecutar la lógica sincrónica
      }

      // ── RAMA SINCRÓNICA ───────────────────────────────────────────
      const isPrimavera = slug.includes("primavera");
      const pNombre = cert.prof_nombre || (isPrimavera ? "Mario" : "Aurelio");
      const pApellido = cert.prof_apellido || (isPrimavera ? "Huilca Ayma" : "Solórzano Ríos");
      const pCIP = cert.prof_cip || (isPrimavera ? "186892" : "76508");
      const pFirma = cert.prof_firma || (isPrimavera
        ? "https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/Firmas/firma_mario_186892.png"
        : "https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/Firmas/firma_aurelio_76508.png"
      );

      let plantilla = "cert_gestion_integral.pdf";
      if (slug.includes("automation")) plantilla = "cert_automation_engineer.pdf";
      else if (slug.includes("licitaciones")) plantilla = "cert_licitaciones_ia.pdf";
      else if (slug.includes("evm") || slug.includes("control")) plantilla = "cert_control_evm.pdf";
      else if (slug.includes("p6") || slug.includes("primavera")) plantilla = "cert_primavera_p6.pdf";

      const response = await fetch(`https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/academia/${plantilla}`);
      const pdfDoc = await PDFDocument.load(await response.arrayBuffer());
      const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontR = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const page1 = pdfDoc.getPages()[0];
      const { width } = page1.getSize();

      const nombreFull = "Ing. " + (cert.nombre_completo || "").toUpperCase();
      page1.drawText(nombreFull, {
        x: (width / 2) - 257, y: 430, size: 21,
        font: fontB, color: rgb(0.98, 0.75, 0.14)
      });

      const detalle = `con una duración de 45 horas académicas, impartidas del ${formatearFecha(cert.fecha_inicio_clases)} al ${formatearFecha(cert.fecha_fin_clases)} en modalidad online.`;
      const dWidth = fontR.widthOfTextAtSize(detalle, 11);
      page1.drawText(detalle, {
        x: (width / 2) - (dWidth / 2) - 85, y: 278, size: 11,
        font: fontR, color: rgb(0.2, 0.2, 0.2)
      });

      try {
        const fImg = await pdfDoc.embedPng(await (await fetch(pFirma)).arrayBuffer());
        page1.drawImage(fImg, { x: 437, y: 120, width: 120, height: 120 });
      } catch (e) {}

      const instNombre = `Ing. ${pNombre} ${pApellido}`;
      const instCIP = `CIP: ${pCIP}`;
      page1.drawText(instNombre, { x: 442, y: 76, size: 10, font: fontB });
      page1.drawText(instCIP, {
        x: 442 + (fontB.widthOfTextAtSize(instNombre, 10) / 2) - (fontR.widthOfTextAtSize(instCIP, 9) / 2),
        y: 66, size: 9, font: fontR
      });

      // Fecha de emisión en primera página (Replicado de asincrónico)
      const fechaEmision = new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
      const labelFecha = `Fecha de emisión: ${fechaEmision}`;
      page1.drawText(labelFecha, {
        x: width - 322, y: 47, size: 8,
        font: fontR, color: rgb(0.3, 0.3, 0.3)
      });

      if (pdfDoc.getPages().length > 1) {
        const p2 = pdfDoc.getPages()[1];
        const { width: w2 } = p2.getSize();
        p2.drawText(`Del ${formatearFecha(cert.fecha_inicio_clases)}, al ${formatearFecha(cert.fecha_fin_clases)}.`, {
          x: (w2 / 2) - 130, y: 75, size: 12, font: fontB
        });
        const emision = `Fecha de Emisión: ${new Date().toLocaleDateString('es-PE')} ${new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
        p2.drawText(emision, { x: w2 - fontR.widthOfTextAtSize(emision, 8) - 50, y: 45, size: 8, font: fontR, color: rgb(0.3, 0.3, 0.3) });
      }

      const qrUrl = `https://project-control-ai-one.vercel.app/verificar?v=${cert.codigo_verificacion}`;
      const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 300 });
      const qrImg = await pdfDoc.embedPng(qrDataUrl);
      page1.drawRectangle({ x: 710, y: 83, width: 88, height: 88, color: rgb(1, 1, 1) });
      page1.drawImage(qrImg, { x: 714, y: 87, width: 80, height: 80 });

      const pdfBytes = await pdfDoc.save();
      const url = URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));
      if (mode === 'preview') { setPreviewUrl(url); }
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
          <div>
            <h1 className="text-4xl font-black uppercase">QC <span className="text-cyan-400">ADMIN v2.0</span></h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">🛡️ Sin límite de descargas · Acceso Directo</p>
          </div>
          <div className="flex gap-4">
            <input
              type="text" value={dni}
              onChange={(e) => setDni(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && buscarCertificados()}
              placeholder="DNI..."
              className="bg-black/50 border border-white/20 rounded-2xl px-6 py-4 text-white outline-none w-64"
            />
            <button onClick={buscarCertificados} className="bg-cyan-500 text-black px-8 py-4 rounded-2xl font-black text-xs">BUSCAR</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-4">
            {resultados.map(cert => {
              const slug = (cert.nombre_curso_oficial || cert.nombre_curso_inscrito || "").toLowerCase();
              const isAsinc = slug.includes("despertar") || slug.includes("forense") || slug.includes("presupuesto") || (cert.edicion_grupo || "").toUpperCase().includes("ASINCRONICO");
              return (
                <div
                  key={cert.certificado_id}
                  onClick={() => generarCertificado(cert, 'preview')}
                  className={`p-6 rounded-[32px] border transition-all cursor-pointer ${selectedCert?.certificado_id === cert.certificado_id ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                >
                  <div className="text-white font-bold text-sm mb-1 leading-tight uppercase">{cert.nombre_curso_oficial || cert.nombre_curso_inscrito}</div>
                  <div className="text-[9px] mb-4 font-black tracking-widest">
                    <span className={isAsinc ? "text-purple-400" : "text-cyan-400"}>{isAsinc ? "⚡ ASINCRÓNICO" : "🎓 SINCRÓNICO"}</span>
                    <span className="text-slate-500 ml-2">· {cert.descargas_count || 0} descarga(s)</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); generarCertificado(cert, 'download'); }}
                    className="w-full py-3 bg-white/5 text-white border border-white/10 rounded-2xl text-[9px] font-black uppercase hover:bg-cyan-500 hover:text-black transition-all"
                  >
                    ⬇ Descargar (Admin)
                  </button>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-2 bg-black/60 rounded-[50px] border border-white/5 min-h-[700px] flex items-center justify-center relative overflow-hidden backdrop-blur-3xl shadow-2xl">
            {previewUrl
              ? <iframe src={previewUrl} className="w-full h-[700px] rounded-[50px]" title="Preview" />
              : <div className="text-center opacity-20">Seleccione un certificado para previsualizar</div>
            }
            {loading && (
              <div className="absolute inset-0 bg-[#020617]/90 flex items-center justify-center text-cyan-400 font-black animate-pulse uppercase">
                Generando PDF...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
