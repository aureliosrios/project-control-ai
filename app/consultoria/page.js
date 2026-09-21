import Link from "next/link";
import { consultoria, contactoConsultoria } from "@/lib/oferta";

export const metadata = {
  title: `Consultoría y servicios técnicos · ${consultoria.precioTexto} por hora | Project Control AI`,
  description: `Reunión inicial gratuita de ${consultoria.minutosGratis} minutos, consultoría a ${consultoria.precioTexto} por hora o cotización de servicios en presupuestos, cronogramas, EETT y automatización.`,
};

const temas = [
  ["Planeamiento y cronogramas", "Revisa o elabora secuencias, ruta crítica, recursos y seguimiento de obra en MS Project o Primavera P6."],
  ["Presupuestos y costos", "Trabaja o estructura tus APUs, análisis de recursos, costos indirectos y control de presupuesto."],
  ["Especificaciones técnicas", "Elabora, organiza y revisa tus EETT, fuentes técnicas y coherencia con el expediente."],
  ["Automatización en cotizaciones", "Acelera y estandariza plantillas, matrices de cotización comercial y flujos ágiles con IA."],
  ["Reportabilidad, control y seguimiento", "Diseña dashboards, curvas S, reportes ejecutivos y seguimiento de avance físico y financiero."],
  ["Cerebro digital y agentes IA", "Estructura documentos y conocimiento de tu proyecto para encontrar información al instante y simplificar tareas."],
];

export default function Consultoria() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-12">
        <Link href="/" className="text-sm text-slate-400 hover:text-cyan-300">← Inicio</Link>
        <p className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase mt-10 mb-5">Consultoría y servicios para profesionales y empresas</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-4xl">Tu proyecto tiene un reto.<br /><span className="text-cyan-300">Trabajemos en resolverlo.</span></h1>
        <p className="text-lg text-slate-300 leading-relaxed mt-6 max-w-2xl">Acompañamiento sobre tu caso real: planeamiento, presupuestos, especificaciones técnicas, automatización en cotizaciones y servicios especializados de ingeniería y control de proyectos.</p>
      </section>

      <section id="modalidades" aria-labelledby="modalidades-title" className="max-w-7xl mx-auto px-6 scroll-mt-28">
        <h2 id="modalidades-title" className="text-2xl font-bold mb-6">Modalidades de trabajo</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Modalidad 1: Reunión inicial gratuita */}
          <article className="rounded-3xl border border-slate-700 bg-slate-900 p-7 sm:p-8 flex flex-col">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Orientación inicial</span>
            <h3 className="text-2xl font-bold mt-2">Reunión inicial gratuita</h3>
            <p className="text-3xl sm:text-4xl font-bold mt-6">S/ 0 <span className="text-lg font-normal text-slate-400">/ $0 USD</span><span className="text-sm font-normal text-slate-300 block mt-1">/ {consultoria.minutosGratis} minutos</span></p>
            <p className="text-slate-400 text-sm mt-3">Coordinamos día y hora vía WhatsApp.</p>
            <ul className="mt-6 space-y-3 text-slate-300 list-disc pl-5 text-sm leading-relaxed">
              <li>Nos cuentas el reto y el contexto de tu proyecto.</li>
              <li>Evaluamos cómo podemos ayudarte técnica y operativamente.</li>
              <li>Definimos la modalidad más adecuada: consultoría por hora o servicio por proyecto.</li>
            </ul>
            <p className="text-xs text-slate-400 mt-6 mb-8">Sesión exploratoria de orientación; el trabajo técnico en profundidad se realiza en la consultoría o servicio.</p>
            <a href={contactoConsultoria("gratuita")} target="_blank" rel="noopener noreferrer" className="mt-auto block text-center rounded-xl border border-cyan-300 text-cyan-300 hover:bg-cyan-950 px-5 py-3.5 font-bold transition-colors">
              Coordinar reunión gratuita (15 min)
            </a>
          </article>

          {/* Modalidad 2: Consultoría por hora */}
          <article className="rounded-3xl border border-cyan-400/60 bg-cyan-950/30 p-7 sm:p-8 flex flex-col relative shadow-[0_0_30px_rgba(6,182,212,0.12)]">
            <span className="inline-block bg-cyan-400 text-slate-950 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full w-fit mb-2">
              Sesión técnica 1 a 1
            </span>
            <h3 className="text-2xl font-bold text-white">Consultoría por hora</h3>
            <p className="text-3xl sm:text-4xl font-bold mt-4 text-cyan-300">
              S/ 100 <span className="text-lg font-normal text-slate-300">o</span> $35 USD
              <span className="text-sm font-normal text-slate-300 block mt-1">/ hora de sesión (60 min)</span>
            </p>
            
            <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 text-xs space-y-2">
              <div className="flex items-start gap-2">
                <span className="font-bold text-cyan-300 shrink-0">🇵🇪 En Soles:</span>
                <span className="text-slate-300">Cualquier medio de pago (Yape, Plin, transferencia bancaria).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-indigo-300 shrink-0">🌎 En Dólares:</span>
                <span className="text-slate-300">Pago único seguro por PayPal.</span>
              </div>
            </div>

            <ul className="mt-5 space-y-2.5 text-slate-300 list-disc pl-5 text-sm leading-relaxed">
              <li>Revisión directa de tu problema técnico o metodológico.</li>
              <li>Orientación aplicada a tus archivos (Excel, MS Project, Primavera P6).</li>
              <li>Hoja de ruta concreta y recomendaciones aplicables.</li>
            </ul>

            <p className="text-xs text-slate-400 mt-5 mb-6">Antes de la sesión confirmamos el objetivo, los documentos necesarios y el horario de trabajo.</p>
            
            <div className="mt-auto space-y-2.5">
              <a href={contactoConsultoria("hora")} target="_blank" rel="noopener noreferrer" className="block text-center rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 px-5 py-3.5 font-bold transition-colors">
                Solicitar consultoría por WhatsApp
              </a>
              <a href={consultoria.paypalUrl} target="_blank" rel="noopener noreferrer" className="block text-center text-xs text-cyan-300 hover:text-cyan-200 hover:underline py-1">
                Pagar con PayPal ($35 USD) ↗
              </a>
            </div>
          </article>

          {/* Modalidad 3: Cotización de servicios por proyecto */}
          <article className="rounded-3xl border border-indigo-400/40 bg-indigo-950/20 p-7 sm:p-8 flex flex-col relative">
            <span className="inline-block bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full w-fit mb-2">
              A medida · Entregables
            </span>
            <h3 className="text-2xl font-bold text-white">Servicios por proyecto</h3>
            <p className="text-3xl sm:text-4xl font-bold mt-4 text-indigo-300">
              A cotizar <span className="text-sm font-normal text-slate-300 block mt-1">/ según alcance y entregables</span>
            </p>
            <p className="text-slate-400 text-sm mt-3">Para desarrollo integral de ingeniería y control de proyectos.</p>
            
            <ul className="mt-5 space-y-2.5 text-slate-300 list-disc pl-5 text-sm leading-relaxed">
              <li><strong className="text-slate-100">Presupuestos y costos:</strong> APUs, rendimientos y desagregados.</li>
              <li><strong className="text-slate-100">Cronogramas:</strong> MS Project y Primavera P6 (LPS, curvas S).</li>
              <li><strong className="text-slate-100">Especificaciones técnicas:</strong> Elaboración y revisión de EETT.</li>
              <li><strong className="text-slate-100">Automatización en cotizaciones:</strong> Plantillas dinámicas y flujos ágiles.</li>
              <li><strong className="text-slate-100">Reportabilidad, control y seguimiento:</strong> Paneles y dashboards de avance.</li>
            </ul>

            <p className="text-xs text-slate-400 mt-5 mb-8">Envíanos el alcance o antecedentes de tu obra para preparar una propuesta técnica y económica formal.</p>
            <a href={contactoConsultoria("cotizacion")} target="_blank" rel="noopener noreferrer" className="mt-auto block text-center rounded-xl border border-indigo-400 text-indigo-300 hover:bg-indigo-950/80 px-5 py-3.5 font-bold transition-colors">
              Cotizar servicio técnico
            </a>
          </article>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-20" aria-labelledby="temas-title">
        <h2 id="temas-title" className="text-3xl font-bold mb-8">¿Qué podemos resolver juntos?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {temas.map(([titulo, descripcion], i) => (
            <article key={titulo} className="border-t border-slate-700 pt-5">
              <p className="font-mono text-cyan-300 text-sm">0{i + 1}</p>
              <h3 className="text-xl font-semibold mt-3 mb-3">{titulo}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{descripcion}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="rounded-3xl bg-slate-900 p-7 sm:p-10 border border-slate-800">
          <h2 className="text-2xl font-bold mb-8">De tu consulta a una solución concreta</h2>
          <ol className="grid md:grid-cols-3 gap-8">
            {[
              ["1. Cuéntanos tu caso", "Escríbenos por WhatsApp indicando el tema, problema o servicio que necesitas cotizar."],
              ["2. Acordamos el formato", "Confirmamos si requieres la reunión gratuita de 15 min, una consultoría por hora o una propuesta técnica por proyecto."],
              ["3. Trabajamos juntos", "En la sesión resolvemos tu consulta o desarrollamos los entregables técnicos según el cronograma acordado."]
            ].map(([titulo, texto]) => (
              <li key={titulo}>
                <h3 className="font-semibold text-cyan-300 mb-2">{titulo}</h3>
                <p className="text-slate-300 leading-relaxed text-sm">{texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>
        {[
          ["¿Cuáles son los medios de pago para la consultoría?", "Para pagos en soles la tarifa es de S/ 100 por hora y aceptamos cualquier medio de pago nacional (Yape, Plin, transferencias BCP, BBVA, Interbank, etc.). Para pagos en dólares la tarifa es de $35 USD por hora con pago único vía PayPal. Los 15 minutos iniciales de orientación son 100% gratuitos."],
          ["¿Cómo funciona la cotización de servicios a medida?", "Si requieres un entregable completo —como la elaboración de presupuestos, cronogramas en MS Project o Primavera P6, especificaciones técnicas, automatización en cotizaciones o un sistema de reportabilidad y control de obra—, nos escribes describiendo tu necesidad o enviando las bases para cotizarte formalmente según el alcance y tiempo estimado."],
          ["¿Puedo consultar por mi empresa o equipo de obra?", "Sí. Brindamos asesoría a profesionales independientes, contratistas, empresas supervisoras y equipos de gestión técnica."],
          ["¿Se resolverá todo en una hora?", "Para dudas puntuales o destrabar problemas técnicos específicos, 60 minutos suelen ser suficientes. Si el caso involucra mayor profundidad, podemos programar sesiones adicionales o migrar a una cotización por proyecto."],
          ["¿Cómo confirmo mi reserva o coordino el servicio?", "Los botones de contacto abren un chat de WhatsApp con nuestro número oficial (+51 993 147 501), donde coordinamos horarios, accesos de videollamada y canales de pago."],
        ].map(([pregunta, respuesta]) => (
          <details key={pregunta} className="border-b border-slate-700 py-5">
            <summary className="cursor-pointer font-semibold">{pregunta}</summary>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm">{respuesta}</p>
          </details>
        ))}
        <p className="mt-10 text-slate-400">¿Prefieres capacitarte con un programa estructurado? <Link href="/formacion" className="text-cyan-300 underline underline-offset-4">Explora las capacitaciones.</Link></p>
      </section>
    </main>
  );
}
