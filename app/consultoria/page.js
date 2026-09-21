import Link from "next/link";
import { consultoria, contactoConsultoria } from "@/lib/oferta";

export const metadata = {
  title: `Consultoría para construcción · ${consultoria.precioTexto} por hora | Project Control AI`,
  description: `Reunión inicial gratuita de ${consultoria.minutosGratis} minutos o consultoría a ${consultoria.precioTexto} por hora. Planeamiento, presupuestos, EETT, cerebro digital y automatizaciones.`,
};
const temas = [
  ["Planeamiento y cronogramas", "Revisa secuencias, recursos y seguimiento de obra en MS Project o Primavera P6."],
  ["Presupuestos y costos", "Trabaja tus APUs, rendimientos, estructura de presupuesto y control de costos."],
  ["Especificaciones técnicas", "Organiza y revisa tus EETT, sus fuentes y su coherencia con el expediente técnico."],
  ["Cerebro digital", "Estructura documentos y conocimiento de tu proyecto para encontrar y reutilizar información."],
  ["Automatizaciones y agentes de IA", "Identifica tareas repetitivas y recibe orientación para automatizar reportes, hojas de cálculo y documentos."],
  ["Otros retos de tu proyecto", "Cuéntanos tu caso en la reunión inicial para confirmar si podemos ayudarte."],
];
export default function Consultoria() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-12">
        <Link href="/" className="text-sm text-slate-400 hover:text-cyan-300">← Inicio</Link>
        <p className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase mt-10 mb-5">Consultoría para profesionales y empresas</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-4xl">Tu proyecto tiene un reto.<br /><span className="text-cyan-300">Trabajemos en resolverlo.</span></h1>
        <p className="text-lg text-slate-300 leading-relaxed mt-6 max-w-2xl">Acompañamiento sobre tu caso real: planeamiento, presupuestos, especificaciones técnicas e inteligencia artificial aplicada a la construcción.</p>
      </section>
      <section id="modalidades" aria-labelledby="modalidades-title" className="max-w-7xl mx-auto px-6 scroll-mt-28">
        <h2 id="modalidades-title" className="text-2xl font-bold mb-6">Dos formas de empezar</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <article className="rounded-3xl border border-slate-700 bg-slate-900 p-7 sm:p-9 flex flex-col">
            <p className="text-sm text-slate-300">Para conocer tu necesidad</p><h3 className="text-2xl font-bold mt-3">Reunión inicial gratuita</h3>
            <p className="text-4xl font-bold mt-6">S/ 0<span className="text-base font-normal text-slate-300"> / {consultoria.minutosGratis} minutos</span></p><p className="text-slate-400 text-sm mt-2">Coordinamos el horario por WhatsApp.</p>
            <ul className="mt-7 space-y-3 text-slate-300 list-disc pl-5"><li>Nos cuentas el problema y el contexto de tu proyecto.</li><li>Evaluamos cómo podemos ayudarte.</li><li>Definimos el alcance de una posible sesión de trabajo.</li></ul>
            <p className="text-sm text-slate-400 mt-6 mb-8">Es una primera conversación para orientar tu consulta; el trabajo técnico se realiza en la consultoría por hora.</p>
            <a href={contactoConsultoria("gratuita")} target="_blank" rel="noopener noreferrer" className="mt-auto block text-center rounded-xl border border-cyan-300 text-cyan-300 hover:bg-cyan-950 px-5 py-4 font-bold">Coordinar reunión gratuita</a>
          </article>
          <article className="rounded-3xl border border-cyan-400/60 bg-cyan-950/30 p-7 sm:p-9 flex flex-col">
            <p className="text-sm text-cyan-300">Para trabajar sobre tu caso</p><h3 className="text-2xl font-bold mt-3">Consultoría por hora</h3>
            <p className="text-4xl font-bold mt-6">{consultoria.precioTexto}<span className="text-base font-normal text-slate-300"> / hora</span></p><p className="text-slate-400 text-sm mt-2">Tarifa en soles · Sesión de 60 minutos.</p>
            <ul className="mt-7 space-y-3 text-slate-300 list-disc pl-5"><li>Revisión de un problema técnico concreto.</li><li>Orientación aplicada a tus documentos y herramientas.</li><li>Definición de los siguientes pasos para avanzar.</li></ul>
            <p className="text-sm text-slate-400 mt-6 mb-8">Antes de la sesión coordinamos el alcance, los archivos necesarios, el horario y el pago. Si necesitas más horas, las acordamos contigo.</p>
            <a href={contactoConsultoria("hora")} target="_blank" rel="noopener noreferrer" className="mt-auto block text-center rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 px-5 py-4 font-bold">Solicitar consultoría · {consultoria.precioTexto}/h</a>
          </article>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 mt-20" aria-labelledby="temas-title"><h2 id="temas-title" className="text-3xl font-bold mb-8">¿Qué podemos revisar juntos?</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">{temas.map(([titulo, descripcion], i) => <article key={titulo} className="border-t border-slate-700 pt-5"><p className="font-mono text-cyan-300 text-sm">0{i + 1}</p><h3 className="text-xl font-semibold mt-3 mb-3">{titulo}</h3><p className="text-slate-400 leading-relaxed">{descripcion}</p></article>)}</div></section>
      <section className="max-w-7xl mx-auto px-6 mt-20"><div className="rounded-3xl bg-slate-900 p-7 sm:p-10"><h2 className="text-2xl font-bold mb-8">De tu consulta a una sesión de trabajo</h2><ol className="grid md:grid-cols-3 gap-8">{[["1. Cuéntanos tu caso", "Escríbenos por WhatsApp con el tema y el resultado que buscas."], ["2. Acordamos el alcance", "Confirmamos qué revisaremos, la disponibilidad y los documentos necesarios."], ["3. Trabajamos juntos", "En la consultoría abordamos el problema y definimos los próximos pasos."]].map(([titulo, texto]) => <li key={titulo}><h3 className="font-semibold text-cyan-300 mb-2">{titulo}</h3><p className="text-slate-300 leading-relaxed">{texto}</p></li>)}</ol></div></section>
      <section className="max-w-3xl mx-auto px-6 mt-20"><h2 className="text-2xl font-bold mb-6">Antes de agendar</h2>{[
        ["¿Puedo consultar por mi empresa o equipo?", "Sí. Atendemos consultas de profesionales y equipos. Cuéntanos quiénes participarán y qué necesitan revisar para coordinar el alcance."],
        ["¿Se resolverá todo en una hora?", "Depende de la complejidad del caso. Definimos una prioridad para la sesión y, si se requiere más trabajo, lo conversamos antes de continuar."],
        ["¿Cómo confirmo mi reserva?", "Los botones abren WhatsApp para solicitar una reunión. El horario y la reserva se confirman por ese medio."],
      ].map(([pregunta, respuesta]) => <details key={pregunta} className="border-b border-slate-700 py-5"><summary className="cursor-pointer font-semibold">{pregunta}</summary><p className="mt-4 text-slate-300 leading-relaxed">{respuesta}</p></details>)}<p className="mt-10 text-slate-400">¿Prefieres aprender con un programa estructurado? <Link href="/formacion" className="text-cyan-300 underline underline-offset-4">Explora las capacitaciones.</Link></p></section>
    </main>
  );
}
