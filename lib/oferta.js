export const consultoria = {
  precioSoles: 100,
  precioTexto: "S/ 100",
  minutosGratis: 15,
  whatsapp: "51993147501",
};
export function contactoConsultoria(tipo) {
  const mensaje = tipo === "gratuita"
    ? `Hola, quiero coordinar una reunión gratuita de ${consultoria.minutosGratis} minutos para comentar mi caso.`
    : `Hola, quiero coordinar una consultoría de una hora a ${consultoria.precioTexto}. Mi consulta es sobre: `;
  return `https://wa.me/${consultoria.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
