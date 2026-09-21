export const consultoria = {
  precioSoles: 100,
  precioDolares: 35,
  precioSolesTexto: "S/ 100",
  precioDolaresTexto: "$35 USD",
  precioTexto: "S/ 100 o $35 USD",
  minutosGratis: 15,
  whatsapp: "51993147501",
  paypalUrl: "https://paypal.me/ProjectControlAI",
};

export function contactoConsultoria(tipo) {
  let mensaje = "";
  if (tipo === "gratuita") {
    mensaje = `Hola, quiero coordinar una reunión gratuita de ${consultoria.minutosGratis} minutos para comentar mi caso.`;
  } else if (tipo === "hora-soles") {
    mensaje = `Hola, quiero coordinar una consultoría de una hora a ${consultoria.precioSolesTexto} (en soles). Mi consulta es sobre: `;
  } else if (tipo === "hora-dolares") {
    mensaje = `Hola, quiero coordinar una consultoría de una hora a ${consultoria.precioDolaresTexto} (en dólares vía PayPal). Mi consulta es sobre: `;
  } else if (tipo === "servicio" || tipo === "cotizacion") {
    mensaje = "Hola, me gustaría cotizar un servicio técnico para mi proyecto (elaboración de presupuestos, cronogramas, especificaciones técnicas, automatización en cotizaciones o reportabilidad y control). Mi requerimiento es: ";
  } else {
    mensaje = `Hola, quiero coordinar una consultoría de una hora (${consultoria.precioTexto}). Mi consulta es sobre: `;
  }
  return `https://wa.me/${consultoria.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
