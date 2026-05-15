"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import Image from "next/image";

export default function Verificar() {
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState([]);
  const [alumno, setAlumno] = useState(null);
  const [searchDone, setSearchDone] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [titulo, setTitulo] = useState("Ing.");
  const [errorQR, setErrorQR] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  // Soporte para validación automática vía QR (?v=CODIGO)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('v');
    if (v) {
      setIsValidating(true);
      buscarPorCodigo(v);
    }
  }, []);

  async function buscarPorCodigo(codigo) {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vw_certificados_publicos')
        .select('*')
        .eq('codigo_verificacion', codigo)
        .single();
      if (error) throw error;
      if (data) {
        setAlumno(data);
        setConfirmName(data.nombre_completo.toUpperCase());
        setResultados([data]);
        setSearchDone(true);
      }
    } catch (e) {
      console.error("QR Error:", e);
      setErrorQR("No se pudo validar el código del QR.");
    } finally {
      setLoading(false);
    }
  }

  const formatearFecha = (fecha) => {
    if (!fecha) return "---";
    const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(fecha + 'T12:00:00').toLocaleDateString('es-ES', opciones);
  };

  async function buscarCertificados() {
    if (!dni) return alert("Ingrese un DNI");
    setLoading(true);
    setResultados([]);

    try {
      const { data, error } = await supabase
        .from('vw_certificados_publicos')
        .select('*')
        .eq('dni', dni);

      if (error) throw error;
      if (!data || data.length === 0) {
        alert("DNI no encontrado.");
        setLoading(false);
        return;
      }

      setAlumno(data[0]);
      setConfirmName(data[0].nombre_completo.toUpperCase());
      setResultados(data);
      setSearchDone(true);
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function procesarDiploma(cert) {
    const certId = cert.certificado_id;
    try {
      // 1. Validar límite en tiempo real
      const { data: currentCert, error: fetchErr } = await supabase
        .from('vw_certificados_publicos')
        .select('*')
        .eq('certificado_id', certId)
        .single();

      if (fetchErr || !currentCert) throw new Error("No se hallaron los datos del folio.");
      
      const isAutomation = (currentCert.nombre_curso_oficial || currentCert.nombre_curso_inscrito || "").toLowerCase().includes("automation");

      if (!isAutomation && (currentCert.descargas_count || 0) >= 1) {
        throw new Error("LÍMITE DE DESCARGA AGOTADO: Este certificado ya ha sido descargado previamente. Contacte a soporte para una nueva copia.");
      }

      // 2. Incrementar descarga (RPC)
      const { error: rpcError } = await supabase.rpc('incrementar_descarga', { cert_id: certId });
      if (rpcError) throw new Error("No se pudo validar la descarga. Límite alcanzado.");

      setLoading(true);

      // 3. Selección de Plantilla
      const slug = (cert.nombre_curso_oficial || cert.nombre_curso_inscrito || "").toLowerCase();

      // Detectar si es curso ASINCRÓNICO por palabras clave del nombre
      const isAsincronico = (
        slug.includes("despertar") ||
        slug.includes("forense") ||
        slug.includes("presupuesto") ||
        slug.includes("asincronico") ||
        cert.edicion_grupo?.toUpperCase().includes("ASINCRONICO")
      );

      // --- RAMA ASINCRÓNICA ---
      if (isAsincronico) {
        let archivoAsinc = "asinc_despertar.pdf";
        if (slug.includes("forense")) archivoAsinc = "asinc_forense.pdf";
        else if (slug.includes("presupuesto")) archivoAsinc = "asinc_presupuestos.pdf";

        const templateUrl = `https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/academia/${archivoAsinc}`;
        const response = await fetch(templateUrl);
        if (!response.ok) throw new Error("No se pudo cargar la plantilla asincrónica. Contacte al administrador.");
        const pdfDoc = await PDFDocument.load(await response.arrayBuffer());
        const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontR = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const page1 = pdfDoc.getPages()[0];
        const { width } = page1.getSize();

        const nombreFull = (titulo + " " + confirmName).trim().toUpperCase();
        const nombreCurso = (cert.nombre_curso_oficial || cert.nombre_curso_inscrito || "").toUpperCase();
        const fechaEmision = new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });

        // Nombre del alumno (Coordenadas sincrónicas exactas)
        page1.drawText(nombreFull, {
          x: (width / 2) - 257,
          y: 430,
          size: 21,
          font: fontB,
          color: rgb(0.98, 0.75, 0.14)
        });

        // Detalle modalidad asincrónica (Bajado 10mm para evitar superposición)
        const detalle = `con una duración de 12 horas académicas en modalidad asincrónica autogestionada.`;
        const dWidth = fontR.widthOfTextAtSize(detalle, 11);
        page1.drawText(detalle, {
          x: (width / 2) - (dWidth / 2) - 85,
          y: 250,
          size: 11,
          font: fontR,
          color: rgb(0.2, 0.2, 0.2)
        });

        // Firma del instructor (Aurelio Solórzano) - ESCALADA +30% (78x78)
        try {
          const firmaUrl = "https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/Firmas/firma_aurelio_76508.png";
          const fImg = await pdfDoc.embedPng(await (await fetch(firmaUrl)).arrayBuffer());
          page1.drawImage(fImg, { x: 458, y: 116, width: 78, height: 78 });
        } catch (e) { console.warn("Error cargando firma", e); }
        
        // Instructor y CIP centrados
        const instNombre = `Ing. Aurelio Solórzano Ríos`;
        const instCIP = `CIP: 76508`;
        page1.drawText(instNombre, { x: 442, y: 76, size: 10, font: fontB });
        page1.drawText(instCIP, { x: 442 + (fontB.widthOfTextAtSize(instNombre, 10)/2) - (fontR.widthOfTextAtSize(instCIP, 9)/2), y: 66, size: 9, font: fontR });

        // Fecha de emisión: ajustada 15mm a la derecha
        const labelFechaFinal = `Fecha de emisión: ${fechaEmision}`;
        page1.drawText(labelFechaFinal, {
          x: width - 322,
          y: 47,
          size: 8,
          font: fontR,
          color: rgb(0.3, 0.3, 0.3)
        });

        // QR Code - Margen reducido a 2 para mejor centrado
        const qrUrl = `https://project-control-ai-one.vercel.app/verificar?v=${cert.codigo_verificacion}`.trim();
        const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 2, width: 400, errorCorrectionLevel: 'L' });
        const qrImg = await pdfDoc.embedPng(qrDataUrl);
        page1.drawRectangle({ x: 710, y: 83, width: 88, height: 88, color: rgb(1, 1, 1) });
        page1.drawImage(qrImg, { x: 712, y: 85, width: 84, height: 84 });

        // Página 2: contenido dinámico
        if (pdfDoc.getPages().length > 1) {
          const p2 = pdfDoc.getPages()[1];
          const { width: w2 } = p2.getSize();

          // Texto de modalidad en la zona de "Fechas de impartición"
          const textImparticion = `Modalidad Asincrónica autogestionada. Fecha de culminación: ${fechaEmision}`;
          const twImparticion = fontB.widthOfTextAtSize(textImparticion, 11);
          p2.drawText(textImparticion, {
            x: (w2 / 2) - (twImparticion / 2),
            y: 77,
            size: 11,
            font: fontB,
            color: rgb(0.2, 0.2, 0.2)
          });

          // Fecha de emisión en el pie (igual que sincrónicos)
          const emisionP2 = `Fecha de Emisión: ${new Date().toLocaleDateString('es-PE')} ${new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
          p2.drawText(emisionP2, { x: w2 - fontR.widthOfTextAtSize(emisionP2, 8) - 8, y: 45, size: 8, font: fontR, color: rgb(0.3, 0.3, 0.3) });
        }

        // Descargar
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Certificado_Asincronico_${cert.codigo_verificacion}.pdf`;
        link.click();
        alert("¡Descarga exitosa! Certificado Asincrónico generado.");
        window.location.reload();
        return; // Salir — no ejecutar la lógica sincrónica
      }

      // --- RAMA SINCRÓNICA (lógica existente) ---
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

      const nombreFull = (titulo + " " + confirmName).trim();
      const detalle = `con una duración de 45 horas académicas, impartidas del ${formatearFecha(cert.fecha_inicio_clases)} al ${formatearFecha(cert.fecha_fin_clases)} en modalidad online.`;

      // 4. Estampado (COORDENADAS v11.8)
      // Nombre
      page1.drawText(nombreFull.toUpperCase(), { 
        x: (width / 2) - 257, 
        y: 430, 
        size: 21, 
        font: fontB, 
        color: rgb(0.98, 0.75, 0.14) 
      });

      // Detalle
      const dWidth = fontR.widthOfTextAtSize(detalle, 11);
      page1.drawText(detalle, { 
        x: (width / 2) - (dWidth / 2) - 85, 
        y: 278, 
        size: 11, 
        font: fontR, 
        color: rgb(0.2, 0.2, 0.2) 
      });

      const isPrimavera = (cert.nombre_curso_oficial || cert.nombre_curso_inscrito || "").toLowerCase().includes("primavera");
      
      const pNombre = cert.prof_nombre || (isPrimavera ? "Mario" : "Aurelio");
      const pApellido = cert.prof_apellido || (isPrimavera ? "Huilca Ayma" : "Solórzano Ríos");
      const pCIP = cert.prof_cip || (isPrimavera ? "186892" : "76508");
      const pFirma = cert.prof_firma || (isPrimavera 
        ? "https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/Firmas/firma_mario_186892.png" 
        : "https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/Firmas/firma_aurelio_76508.png"
      );

      // Instructor
      if (pFirma) {
        try {
          const fImg = await pdfDoc.embedPng(await (await fetch(pFirma)).arrayBuffer());
          page1.drawImage(fImg, { x: 437, y: 120, width: 120, height: 120 });
        } catch (e) { console.warn("Error cargando firma", e); }
      }
      page1.drawText(`Ing. ${pNombre} ${pApellido}`, { x: 448, y: 76, size: 10, font: fontB });
      page1.drawText(`CIP: ${pCIP}`, { x: 448, y: 66, size: 9, font: fontR });

      // Página 2 (Reverso)
      if (pdfDoc.getPages().length > 1) {
        const p2 = pdfDoc.getPages()[1];
        const { width: w2 } = p2.getSize();
        p2.drawText(`Del ${formatearFecha(cert.fecha_inicio_clases)}, al ${formatearFecha(cert.fecha_fin_clases)}.`, { x: (w2 / 2) - 130, y: 75, size: 12, font: fontB });
        const emision = `Fecha de Emisión: ${new Date().toLocaleDateString('es-PE')} ${new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
        p2.drawText(emision, { x: w2 - fontR.widthOfTextAtSize(emision, 8) - 50, y: 45, size: 8, font: fontR, color: rgb(0.3, 0.3, 0.3) });
      }

      // 5. QR Code
      const qrUrl = `https://projectcontrolai.com/academia/validar.html?v=${cert.codigo_verificacion}`;
      const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 300 });
      const qrImg = await pdfDoc.embedPng(qrDataUrl);
      page1.drawRectangle({ x: 710, y: 83, width: 88, height: 88, color: rgb(1, 1, 1) });
      page1.drawImage(qrImg, { x: 714, y: 87, width: 80, height: 80 });

      // 6. Descargar
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Certificado_PCAI_${cert.codigo_verificacion}.pdf`;
      link.click();

      alert("¡Descarga exitosa! Registro oficial completado.");
      window.location.reload();

    } catch (err) {
      alert("Aviso: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // --- VISTA DE DECLARACIÓN JURADA (Para QR) ---
  if (isValidating && searchDone && alumno) {
    const slug = (alumno.nombre_curso_oficial || alumno.nombre_curso_inscrito || "").toLowerCase();
    const isAsinc = slug.includes("despertar") || slug.includes("forense") || slug.includes("presupuesto") || alumno.edicion_grupo?.toUpperCase().includes("ASINCRONICO");

    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 text-slate-900 font-sans">
        <div className="w-full max-w-xl bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-10 border-t-[10px] border-cyan-500 overflow-hidden relative">
          <div className="text-center mb-10 border-b border-slate-100 pb-8">
            <div className="relative w-32 h-16 mx-auto mb-4">
              <Image src="/images/logo.png" alt="PCAI" fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Declaración Jurada de Validez</h1>
            <div className="inline-block bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mt-4">
              ✓ Documento Auténtico PCAI
            </div>
          </div>
          
          <p className="text-sm text-slate-500 mb-8 leading-relaxed text-center px-4">
            Project Control AI certifica la veracidad de la siguiente información académica registrada en nuestros sistemas oficiales:
          </p>
          
          <div className="space-y-4">
            <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-cyan-500">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Profesional Certificado</span>
              <span className="text-lg font-bold text-slate-900 uppercase">{alumno.nombre_completo}</span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-cyan-500">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Documento de Identidad</span>
              <span className="text-lg font-bold text-slate-900">{alumno.dni}</span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-cyan-500">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Programa Académico</span>
              <span className="text-lg font-bold text-slate-900 uppercase">{alumno.nombre_curso_oficial || alumno.nombre_curso_inscrito}</span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-cyan-500 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Modalidad</span>
                <span className="text-sm font-bold text-slate-900">{isAsinc ? "Asincrónica Autogestionada" : "Online en Vivo"}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Duración</span>
                <span className="text-sm font-bold text-slate-900">{isAsinc ? "12 Horas Académicas" : "45 Horas Académicas"}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-100 flex justify-between items-end">
            <div>
              <div className="text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase mb-1">Código de Folio</div>
              <div className="text-xs font-bold text-slate-400">{alumno.codigo_verificacion}</div>
            </div>
            <div className="text-right">
              {alumno.prof_firma && (
                <div className="relative w-28 h-16 ml-auto mb-2">
                  <img src={alumno.prof_firma} alt="Firma" className="object-contain h-full ml-auto" />
                </div>
              )}
              <div className="text-sm font-black text-slate-900 uppercase tracking-tighter">Ing. {alumno.prof_nombre} {alumno.prof_apellido}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CIP: {alumno.prof_cip}</div>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.href = '/verificar'}
            className="mt-10 w-full py-5 bg-slate-900 text-white rounded-3xl text-xs font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
          >
            ← Regresar al Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500/30 font-sans">
      <div className="fixed inset-0 tech-grid opacity-30 pointer-events-none" />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-[480px] glass-panel p-10 rounded-[40px] border-white/5 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
          <div className="absolute top-6 right-8 text-[9px] font-black text-slate-500 tracking-[0.2em] uppercase">
            v5.2 SAFE-DOWNLOAD
          </div>

          {!searchDone ? (
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <Image src="/images/logo.png" alt="PCAI" fill className="object-contain" />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-4">
                Portal de <span className="text-cyan-400">Certificación</span>
              </h1>
              <p className="text-slate-400 text-sm font-light mb-10 leading-relaxed">
                Ingresa tu DNI para descargar tus certificados oficiales.<br/>
                <span className="text-orange-500 font-bold uppercase text-[10px] tracking-widest">Límite: 1 descarga por folio</span>
              </p>

              <div className="space-y-6">
                <input 
                  type="text" 
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  placeholder="Número de DNI"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-center text-2xl font-black text-white placeholder:text-slate-700 focus:border-cyan-500/50 focus:bg-white/10 transition-all outline-none"
                />

                <button 
                  onClick={buscarCertificados}
                  disabled={loading}
                  className="w-full py-5 bg-cyan-500 text-slate-950 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] disabled:opacity-50"
                >
                  {loading ? "VALIDANDO..." : "CONSULTAR MIS CURSOS"}
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-3xl p-6 mb-8">
                <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">Estudiante Identificado</h3>
                <div className="flex gap-3">
                  <select 
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="bg-[#020617] border border-white/10 rounded-xl px-3 py-3 text-xs font-bold text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Ing.">Ing.</option>
                    <option value="Arq.">Arq.</option>
                    <option value="Lic.">Lic.</option>
                    <option value="Mag.">Mag.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="">---</option>
                  </select>
                  <input 
                    type="text"
                    value={confirmName}
                    onChange={(e) => setConfirmName(e.target.value.toUpperCase())}
                    className="flex-1 bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-sm font-black text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {resultados.map((item) => {
                  if (item.estado_academico === 'ARCHIVADO') return null;
                  const curso = item.nombre_curso_oficial || item.nombre_curso_inscrito || "";
                  const isAutomation = curso.toLowerCase().includes("automation");
                  const yaDescargado = !isAutomation && (item.descargas_count >= 1);
                  const graduado = (item.estado_academico === 'GRADUADO');
                  
                  // Lógica de Estado Visual
                  let statusLabel = "⏳ PROCESO";
                  let statusClass = "bg-orange-500/20 text-orange-400";
                  
                  if (yaDescargado) {
                    statusLabel = "🔒 CERRADO";
                    statusClass = "bg-red-500/20 text-red-400";
                  } else if (graduado) {
                    statusLabel = "✅ DISPONIBLE";
                    statusClass = "bg-emerald-500/20 text-emerald-400";
                  }

                  return (
                    <div key={item.certificado_id} className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 transition-all hover:bg-white/[0.05]">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-white font-bold text-sm leading-tight max-w-[70%] uppercase tracking-tighter">{curso}</div>
                        <span className={`text-[8px] font-black px-2 py-1 rounded-md tracking-widest ${statusClass}`}>
                          {statusLabel}
                        </span>
                      </div>

                      {graduado ? (
                        yaDescargado ? (
                          <div className="bg-white/5 border border-white/10 text-slate-500 text-[9px] font-black p-3 rounded-xl text-center uppercase tracking-widest">
                            Certificado ya descargado
                          </div>
                        ) : (
                          <button 
                            onClick={() => procesarDiploma(item)}
                            disabled={loading}
                            className="w-full py-3 bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/30 rounded-xl text-[10px] font-black text-cyan-400 uppercase tracking-widest transition-all"
                          >
                            📥 DESCARGAR DIPLOMA
                          </button>
                        )
                      ) : (
                        <div className="bg-white/5 border border-dashed border-white/10 text-slate-600 text-[9px] font-black p-3 rounded-xl text-center uppercase tracking-widest">
                          Curso en dictado / Evaluación pendiente
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => window.location.reload()}
                className="w-full mt-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
              >
                ← Realizar otra búsqueda
              </button>
            </div>
          )}
        </div>

        <p className="mt-12 text-[10px] text-slate-600 font-bold uppercase tracking-[0.4em]">
          PCAI Industrial Verification System
        </p>
      </main>
    </div>
  );
}
