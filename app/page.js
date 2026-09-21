import Image from "next/image";
import Link from "next/link";
import { consultoria } from "@/lib/oferta";

export const metadata = {
  title: "Capacitación y consultoría para construcción | Project Control AI",
  description: "Aprende IA aplicada a la construcción o resuelve un problema de tu proyecto. Cursos y consultoría en planeamiento, presupuestos, EETT y automatización.",
};
const temas = [
  ["01", "Planeamiento y control", "Cronogramas, Primavera P6, MS Project y seguimiento de obra."],
  ["02", "Presupuestos y costos", "Análisis de precios unitarios, recursos y control de costos."],
  ["03", "Especificaciones técnicas", "Organización, elaboración y revisión de EETT con apoyo de IA."],
  ["04", "Cerebro digital y automatización", "Organiza el conocimiento de tu proyecto y simplifica tareas repetitivas."],
];
export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center py-8 lg:py-16">
        <div>
          <p className="text-cyan-300 text-xs font-semibold tracking-[0.18em] uppercase mb-6">Ingeniería + inteligencia artificial</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">Capacitación y consultoría para <span className="text-cyan-300">resolver los retos de tu obra.</span></h1>
          <p className="text-lg text-slate-300 leading-relaxed mt-6 max-w-xl">Aprende a aplicar IA en tus proyectos o trabaja con nosotros sobre un problema concreto de planeamiento, presupuesto o gestión técnica.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link href="/formacion" className="rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-6 py-4 text-center">Explorar capacitaciones <span aria-hidden="true">↗</span></Link>
            <Link href="/consultoria" className="rounded-xl border border-slate-600 hover:border-cyan-300 font-semibold px-6 py-4 text-center">Ver consultorías</Link>
          </div>
          <p className="text-sm text-slate-400 mt-5">Para profesionales y equipos del sector construcción.</p>
        </div>
        <div className="space-y-4">
          <article className="rounded-3xl border border-slate-700 bg-slate-900 p-7 sm:p-8">
            <div className="flex justify-between items-center gap-4"><p className="text-cyan-300 text-xs font-bold tracking-widest uppercase">Quiero aprender</p><span aria-hidden="true" className="text-2xl text-cyan-300">↗</span></div>
            <h2 className="text-2xl font-bold mt-4">Capacitación práctica</h2>
            <p className="text-slate-300 leading-relaxed mt-3">Cursos grabados para avanzar a tu ritmo y programas en vivo para aprender con acompañamiento.</p>
            <Link href="/formacion" className="inline-block text-cyan-300 font-semibold mt-6 underline underline-offset-4">Ver cursos, fechas y precios</Link>
          </article>
          <article className="rounded-3xl border border-cyan-400/30 bg-cyan-950/30 p-7 sm:p-8">
            <div className="flex justify-between items-center gap-4"><p className="text-cyan-300 text-xs font-bold tracking-widest uppercase">Quiero resolver un problema</p><span className="text-sm text-cyan-200">{consultoria.precioTexto} / hora</span></div>
            <h2 className="text-2xl font-bold mt-4">Consultoría aplicada</h2>
            <p className="text-slate-300 leading-relaxed mt-3">Trae tu caso y revisemos cómo avanzar. Empieza con una reunión gratuita de {consultoria.minutosGratis} minutos para definir lo que necesitas.</p>
            <Link href="/consultoria" className="inline-block text-cyan-300 font-semibold mt-6 underline underline-offset-4">Elegir mi tipo de reunión</Link>
          </article>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 mt-16" aria-labelledby="areas-title">
        <div className="border-t border-slate-800 pt-12 mb-8"><p className="text-sm text-cyan-300 mb-3">Aplicado a tu trabajo diario</p><h2 id="areas-title" className="text-3xl font-bold tracking-tight">¿En qué te podemos ayudar?</h2></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{temas.map(([numero, titulo, detalle]) => <article key={numero} className="border-t border-slate-700 pt-6"><span className="text-sm font-mono text-cyan-300">{numero}</span><h3 className="text-xl font-semibold mt-4 mb-3">{titulo}</h3><p className="text-slate-400 leading-relaxed">{detalle}</p></article>)}</div>
      </section>
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-7 sm:p-10 flex flex-col sm:flex-row gap-7 items-start sm:items-center">
          <Image src="/images/Aurelio Solorzano.png" alt="Ing. Aurelio Solorzano Rios" width={96} height={96} sizes="96px" className="rounded-2xl object-cover w-24 h-24" />
          <div className="flex-1"><p className="text-sm text-cyan-300 mb-2">Project Control AI</p><h2 className="text-2xl font-bold">Ingeniería, con un enfoque práctico.</h2><p className="mt-3 text-slate-300 leading-relaxed">Ing. Aurelio Solorzano Rios · Capacitación y acompañamiento para aplicar IA en la gestión y el control de proyectos.</p></div>
          <Link href="/consultoria#modalidades" className="rounded-xl border border-slate-600 px-5 py-3 font-semibold hover:border-cyan-300">Empezar con una reunión</Link>
        </div>
      </section>
    </main>
  );
}
