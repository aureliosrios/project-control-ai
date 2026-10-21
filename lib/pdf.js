// pdf-lib y qrcode solo se necesitan al generar un certificado: se cargan bajo demanda
// para no incluirlos en el JS inicial de cada ruta.
export async function cargarPdf() {
  const [{ PDFDocument, rgb, StandardFonts }, { default: QRCode }] = await Promise.all([
    import("pdf-lib"),
    import("qrcode"),
  ]);
  return { PDFDocument, rgb, StandardFonts, QRCode };
}
