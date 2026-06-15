import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';

// Mocked data for Guillermo
const cert = {
  dni: '46691273',
  nombre_completo: 'Guillermo Colchado Ugaldez',
  certificado_id: 'b7399705-08c9-4c0e-91bb-bb99d565637e',
  codigo_verificacion: 'PCAI-AUTO-2026-46691273',
  fecha_inicio_clases: '2026-02-22',
  fecha_fin_clases: '2026-03-22',
  nombre_curso_oficial: 'Automatización y Soluciones de IA para la Gestión de Construcción',
  prof_nombre: 'Aurelio',
  prof_apellido: 'Solórzano Ríos',
  prof_cip: '76508',
  prof_firma: 'https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/Firmas/firma_aurelio_76508.png'
};

const formatearFecha = (fecha) => {
  if (!fecha) return "---";
  const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(fecha + 'T12:00:00').toLocaleDateString('es-ES', opciones);
};

async function testGen() {
  const slug = (cert.nombre_curso_oficial || "").toLowerCase();
  
  let archivo = "cert_gestion_integral.pdf";
  if (slug.includes("automation") || slug.includes("automatizacion") || slug.includes("automatización")) archivo = "cert_automation_engineer.pdf";
  else if (slug.includes("licitaciones")) archivo = "cert_licitaciones_ia.pdf";
  else if (slug.includes("evm") || slug.includes("control")) archivo = "cert_control_evm.pdf";
  else if (slug.includes("gerencia") || slug.includes("gestion")) archivo = "cert_gestion_integral.pdf";
  else if (slug.includes("p6")) archivo = "cert_primavera_p6.pdf";

  console.log(`Selected Template: ${archivo}`);

  const templateUrl = `https://bpsumudexpywfffcwpun.supabase.co/storage/v1/object/public/academia/${archivo}`;
  const response = await fetch(templateUrl);
  const pdfDoc = await PDFDocument.load(await response.arrayBuffer());
  const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontR = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page1 = pdfDoc.getPages()[0];
  const { width } = page1.getSize();

  const nombreFull = ("Ing. " + cert.nombre_completo).trim();
  const detalle = `con una duración de 45 horas académicas, impartidas del ${formatearFecha(cert.fecha_inicio_clases)} al ${formatearFecha(cert.fecha_fin_clases)} en modalidad online.`;

  // Estampado
  page1.drawText(nombreFull.toUpperCase(), { 
    x: (width / 2) - 257, 
    y: 430, 
    size: 21, 
    font: fontB, 
    color: rgb(0.98, 0.75, 0.14) 
  });

  const dWidth = fontR.widthOfTextAtSize(detalle, 11);
  page1.drawText(detalle, { 
    x: (width / 2) - (dWidth / 2) - 85, 
    y: 278, 
    size: 11, 
    font: fontR, 
    color: rgb(0.2, 0.2, 0.2) 
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('guillermo_test.pdf', pdfBytes);
  console.log("PDF saved to guillermo_test.pdf");
}

testGen();
