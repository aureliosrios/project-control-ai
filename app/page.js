import Image from "next/image";
import Link from "next/link";
import { consultoria } from "@/lib/oferta";

export const metadata = {
  title: "Project Control AI | Soluciones Agénticas y Flexibles para la Construcción",
  description: "El software convencional es rígido. En Project Control AI adaptamos la Inteligencia Artificial a tus necesidades: soluciones agénticas, consultoría técnica y capacitación sincrónica y asincrónica.",
};

const serviciosPrincipales = [
  {
    num: "01",
    tag: "INGENIERÍA AGÉNTICA",
    titulo: "Soluciones Agénticas",
    icono: "smart_toy",
    color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400",
    badge: "Entregables en Segundos",
    desc: "Agentes de IA autónomos que procesan tus planos (DWG/DXF), cronogramas y presupuestos. Generan en segundos visores 3D interactivos 4D/5D, APUs tipo S10, macros VBA en MS Project y redacción de EETT normadas sin la rigidez del software clásico.",
    linkText: "Ver Soluciones Agénticas",
    linkHref: "/servicios?tab=agentes#agentes",
  },
  {
    num: "02",
    tag: "ASESORÍA TÉCNICA EN OBRA",
    titulo: "Consultoría Especializada",
    icono: "engineering",
    color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
    badge: `${consultoria.minutosGratis} min gratis`,
    desc: "Acompañamiento directo para empresas y profesionales en retos de alta complejidad: planeamiento maestro, reclamos de ampliación de plazo, presupuestos desglosados, auditoría de contratos y automatización de procesos técnicos a medida.",
    linkText: "Agendar Consultoría",
    linkHref: "/servicios?tab=consultoria#consultoria",
  },
  {
    num: "03",
    tag: "APRENDIZAJE EN DIRECTO",
    titulo: "Capacitaciones Sincrónicas",
    icono: "video_camera_front",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
    badge: "En Vivo con el Ing. Aurelio",
    desc: "Programas intensivos en directo con acompañamiento paso a paso. Aprende a crear, configurar e implementar agentes de ingeniería en proyectos reales, interactuando en vivo para resolver dudas y adaptar los flujos a tus obras.",
    linkText: "Ver Cursos en Vivo",
    linkHref: "/formacion?tab=sinc#catalogo-formacion",
  },
  {
    num: "04",
    tag: "A TU PROPIO RITMO",
    titulo: "Capacitaciones Asincrónicas",
    icono: "play_lesson",
    color: "from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400",
    badge: "Acceso Inmediato 24/7",
    desc: "Cursos grabados de alta definición con materiales descargables. Incluye desde el curso accesible de iniciación 'El Despertar' y clases maestras abiertas en YouTube hasta módulos especializados de programación y control de proyectos.",
    linkText: "Ver Cursos Grabados",
    linkHref: "/formacion?tab=asinc#catalogo-formacion",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#14161a] text-slate-100 pt-28 sm:pt-36 pb-20 selection:bg-cyan-500 selection:text-slate-950">
      {/* 1. HERO SECTION: LA MISIÓN AGÉNTICA */}
      <section className="max-w-7xl mx-auto px-6 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge Misión */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(245,168,0,0.15)] animate-in fade-in duration-700">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
              Misión: Soluciones Agénticas para la Construcción
            </span>
          </div>

          {/* Headline Principal */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] uppercase">
            El software convencional <span className="text-slate-400 font-extralight line-through decoration-red-500/80 decoration-4">es muy rígido</span>.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 block mt-2">
              Hoy la solución es adaptar la IA a tus necesidades.
            </span>
          </h1>

          {/* Manifiesto y Tesis de Project Control AI */}
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal pt-2">
            En <strong className="text-white font-semibold">Project Control AI</strong> tenemos la misión de brindar{" "}
            <span className="text-cyan-300 font-semibold">soluciones agénticas</span> a los profesionales y empresas de la construcción. 
            Nos hemos dado cuenta de que el software tradicional ya no es suficiente: es inflexible, cerrado y te obliga a trabajar a su manera. 
            Hoy el software rígido ya no es la solución; hoy la clave es{" "}
            <strong className="text-white font-semibold">adaptar la Inteligencia Artificial a la medida exacta de tu proyecto, de tu empresa o de tus necesidades individuales</strong>.
          </p>

          {/* Botones de Acción (CTAs) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/servicios"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(245,168,0,0.35)] hover:scale-105 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">engineering</span>
              Servicios de Ingeniería
            </Link>

            <Link
              href="/formacion"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest border border-slate-700 hover:border-cyan-400 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base text-cyan-400">school</span>
              Formación & Cursos
            </Link>

            <Link
              href="https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20deseo%20conocer%20m%C3%A1s%20sobre%20las%20Soluciones%20Ag%C3%A9nticas%20de%20Project%20Control%20AI."
              target="_blank"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 font-bold text-xs uppercase tracking-widest border border-emerald-500/40 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              WhatsApp (+51 993 147 501)
            </Link>
          </div>
        </div>
      </section>

      {/* 2. EL PARADIGMA: SOFTWARE RÍGIDO VS. SOLUCIONES AGÉNTICAS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tarjeta Pasado: Software Rígido */}
          <div className="p-8 rounded-3xl border border-red-900/40 bg-gradient-to-b from-red-950/20 to-slate-950/60 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/30 flex items-center justify-center text-red-400">
                <span className="material-symbols-outlined">lock</span>
              </span>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">El Enfoque Tradicional</span>
                <h3 className="text-xl font-black text-slate-200">El Software Convencional es Rígido</h3>
              </div>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-black">✕</span>
                <span><strong>Obliga a adaptarte a su estructura:</strong> Tablas estáticas, formatos propietarios y configuraciones engorrosas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-black">✕</span>
                <span><strong>Días de transcripción manual:</strong> Copiar datos a mano entre planos CAD, hojas de metrados, S10 y Primavera P6.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-black">✕</span>
                <span><strong>Cero interoperabilidad real:</strong> Archivos corruptos (.xer, bases bloqueadas) y dificultad para personalizar entregables de obra.</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta Futuro: Soluciones Agénticas con IA */}
          <div className="p-8 rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-cyan-950/30 to-slate-950/80 shadow-[0_0_30px_rgba(245,168,0,0.15)] relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-300">
                <span className="material-symbols-outlined">bolt</span>
              </span>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">La Revolución Agéntica</span>
                <h3 className="text-xl font-black text-white">Adaptar la IA a tus Necesidades</h3>
              </div>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-black">✓</span>
                <span><strong>Flexibilidad total:</strong> La IA se adapta a los requerimientos específicos de tu obra, tu empresa o tu perfil.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-black">✓</span>
                <span><strong>Entregables técnicos en segundos:</strong> Proporcionas planos, cronograma y presupuesto, y el agente modela el resultado en segundos.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-black">✓</span>
                <span><strong>Autonomía y precisión:</strong> Generación de visores 3D interactivos, matrices de control, curvas S y APUs con fórmulas vivas.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2.5. AGENTES DESTACADOS DISPONIBLES */}
      <section className="max-w-7xl mx-auto px-6 py-4 space-y-6">
        {/* Agente 1: Planeamiento 4D y 5D */}
        <div className="p-8 sm:p-12 rounded-[40px] bg-gradient-to-br from-[#171a1e] via-slate-900 to-[#14161a] border-2 border-cyan-500/50 shadow-[0_0_50px_rgba(245,168,0,0.2)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-red-950 text-red-400 border border-red-500/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(239,68,68,0.3)]">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  Agente Destacado · Disponible Ahora
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  BIM 4D/5D & THREE.JS
                </span>
                <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-800/40">
                  ⚡ 45 segundos
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
                Agente de Planeamiento de Obra 4D y 5D
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Le proporcionas tus Planos (DWG/DXF), Cronograma y Presupuesto, y el agente genera en segundos un <strong>Visor Web 3D interactivo autocontenido</strong> con semáforo temporal 4D, panel de costos 5D (EVM), Curva S y Lookahead a 4 semanas.
              </p>

              {/* Caja de Inversión y Medios de Pago */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-xl">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-bold">Inversión del Agente</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">S/ 70 PEN</span>
                    <span className="text-xs text-slate-400 font-bold">ó</span>
                    <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">$25 USD</span>
                  </div>
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                    <span><strong>Perú (Yape / Plin):</strong> 51 993147501</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    <span><strong>Extranjero (PayPal):</strong> $25 USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones y Medios de Pago */}
            <div className="flex flex-col gap-3 w-full lg:w-auto shrink-0 min-w-[280px]">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://paypal.me/ProjectControlAI/25USD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02]"
                >
                  <span className="material-symbols-outlined text-sm">payment</span>
                  PayPal ($25)
                </a>
                <a
                  href={`https://wa.me/51993147501?text=${encodeURIComponent("Hola Ing. Aurelio, deseo adquirir el Agente de Planeamiento de Obra 4D y 5D por Yape / Plin (S/ 70). Adjunto mi comprobante al 51 993147501.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02]"
                >
                  <span className="material-symbols-outlined text-sm">phone_iphone</span>
                  Yape / Plin (S/ 70)
                </a>
              </div>

              <a
                href={`https://wa.me/51993147501?text=${encodeURIComponent("Hola Ing. Aurelio, deseo adquirir el Agente de Planeamiento de Obra 4D y 5D (S/ 70 o $25 USD).")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Quiero el Agente (+51 993 147 501)
              </a>

              <div className="flex gap-2">
                <Link
                  href="https://youtu.be/weL9yLqdCHY"
                  target="_blank"
                  className="flex-1 px-3 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 shadow-md hover:scale-[1.02]"
                >
                  <span className="material-symbols-outlined text-sm">play_circle</span>
                  YouTube (14 min)
                </Link>
                <Link
                  href="https://vt.tiktok.com/ZSgyYmMFX/"
                  target="_blank"
                  className="flex-1 px-3 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-[11px] uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 border border-pink-500/40 shadow-md hover:scale-[1.02]"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-cyan-400" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                  </svg>
                  TikTok
                </Link>
              </div>

              <Link
                href="/servicios?tab=agentes#agentes"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-center text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                Ver Catálogo de Agentes
              </Link>
            </div>
          </div>
        </div>

        {/* Agente 2: Presupuestos & APU Tipo S10 */}
        <div className="p-8 sm:p-12 rounded-[40px] bg-gradient-to-br from-[#171a1e] via-slate-900 to-[#14161a] border-2 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-red-950 text-red-400 border border-red-500/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(239,68,68,0.3)]">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  Agente Destacado · Disponible Ahora
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  COSTOS & S10 · OPENPYXL
                </span>
                <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-800/40">
                  ⚡ 15 segundos
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
                Agente de Presupuestos & APU Tipo S10
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Le proporcionas tus Expedientes Técnicos (PDF/Excel: Memoria, EETT, Metrados y Cotizaciones) y genera en segundos un <strong>Presupuesto profesional tipo S10 en Excel con fórmulas vivas</strong>, cálculo de APUs, desglose de gastos generales y fórmula polinómica conforme al D.S. 011-79-VC.
              </p>

              {/* Caja de Inversión y Medios de Pago */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-xl">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-bold">Inversión del Agente</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">S/ 70 PEN</span>
                    <span className="text-xs text-slate-400 font-bold">ó</span>
                    <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">$25 USD</span>
                  </div>
                </div>
                <div className="text-xs text-slate-300 space-y-1.5 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                    <span><strong>Perú (Yape / Plin):</strong> 51 993147501</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    <span><strong>Extranjero (PayPal):</strong> $25 USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones y Medios de Pago */}
            <div className="flex flex-col gap-3 w-full lg:w-auto shrink-0 min-w-[280px]">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://paypal.me/ProjectControlAI/25USD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02]"
                >
                  <span className="material-symbols-outlined text-sm">payment</span>
                  PayPal ($25)
                </a>
                <a
                  href={`https://wa.me/51993147501?text=${encodeURIComponent("Hola Ing. Aurelio, deseo adquirir el Agente de Presupuestos & APU Tipo S10 por Yape / Plin (S/ 70). Adjunto mi comprobante al 51 993147501.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02]"
                >
                  <span className="material-symbols-outlined text-sm">phone_iphone</span>
                  Yape / Plin (S/ 70)
                </a>
              </div>

              <a
                href={`https://wa.me/51993147501?text=${encodeURIComponent("Hola Ing. Aurelio, deseo adquirir el Agente de Presupuestos & APU Tipo S10 (S/ 70 o $25 USD).")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Quiero el Agente (+51 993 147 501)
              </a>

              <div className="flex gap-2">
                <Link
                  href="https://youtu.be/NoaHRpYAzMc"
                  target="_blank"
                  className="flex-1 px-3 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 shadow-md hover:scale-[1.02]"
                >
                  <span className="material-symbols-outlined text-sm">play_circle</span>
                  YouTube (15 min)
                </Link>
                <Link
                  href="https://vt.tiktok.com/ZSg5CFDGH/"
                  target="_blank"
                  className="flex-1 px-3 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-[11px] uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 border border-pink-500/40 shadow-md hover:scale-[1.02]"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-cyan-400" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                  </svg>
                  TikTok
                </Link>
              </div>

              <Link
                href="/servicios?tab=agentes#agentes"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-center text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                Ver Catálogo de Agentes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NUESTROS SERVICIOS: SOLUCIONES AGÉNTICAS, CONSULTORÍA Y CAPACITACIONES */}
      <section className="max-w-7xl mx-auto px-6 py-16" aria-labelledby="servicios-title">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2">Ecosistema Integral</p>
          <h2 id="servicios-title" className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Nuestros Servicios
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
            Cuatro formas complementarias de incorporar la inteligencia artificial agéntica a tus proyectos y a tu organización.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {serviciosPrincipales.map((srv) => (
            <article
              key={srv.num}
              className={`p-8 rounded-3xl border bg-gradient-to-br ${srv.color} backdrop-blur-sm flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 relative group overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono font-bold tracking-wider text-slate-400">{srv.num} · {srv.tag}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-black/60 text-white border border-white/10">
                    {srv.badge}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl text-white">{srv.icono}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                      {srv.titulo}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  {srv.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={srv.linkHref}
                  className="text-xs font-black uppercase tracking-widest text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  {srv.linkText}
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. HUB DE ENLACES TIKTOK (LO QUE SE MUESTRA EN /mobile) */}
      <section id="enlaces-tiktok" className="scroll-mt-32 max-w-7xl mx-auto px-6 py-16" aria-labelledby="tiktok-hub-title">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
            </svg>
            Canal Oficial TikTok · @project.control.a
          </div>
          <h2 id="tiktok-hub-title" className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Enlaces Oficiales & Hub Móvil
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
            Accede a la misma vista directa y minimalista enlazada en nuestro TikTok: contacto directo con el <strong>Ing. Aurelio Solórzano</strong>, capacitaciones sincrónicas y asincrónicas, soluciones agénticas y consultoría técnica.
          </p>
        </div>

        {/* Card Contenedora con el diseño idéntico al de /mobile */}
        <div className="max-w-2xl mx-auto bg-slate-950/80 border-2 border-cyan-500/30 rounded-[36px] p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(245,168,0,0.12)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-b from-pink-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

          {/* Header perfil del Ing. Aurelio Solórzano */}
          <div className="mb-4">
            <Link 
              href="https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20vengo%20de%20TikTok%20y%20necesito%20una%20consulta%20especializada."
              target="_blank"
              className="flex items-center gap-4 w-full bg-slate-900/90 p-4 rounded-2xl border border-cyan-500/30 shadow-lg group hover:border-cyan-400 hover:scale-[1.01] transition-all"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0">
                <Image 
                  src="/images/Aurelio Solorzano.png" 
                  alt="Ing. Aurelio Solorzano" 
                  fill 
                  sizes="64px"
                  className="rounded-full object-cover border-2 border-cyan-400" 
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-[#14161a] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <span className="block text-[10px] font-black text-cyan-400 uppercase tracking-widest">Consultor Principal</span>
                <span className="block text-lg font-black text-white leading-tight truncate">Ing. Aurelio Solórzano Ríos</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Activo en WhatsApp (+51 993 147 501)
                </span>
              </div>
              <span className="material-symbols-outlined text-emerald-400 text-2xl group-hover:translate-x-1 transition-transform">
                chat
              </span>
            </Link>
          </div>

          {/* ⭐ HERO DESTACADO: GRUPO GRATUITO DE WHATSAPP */}
          <div className="mb-6">
            <Link 
              href="https://chat.whatsapp.com/H0lG0T5yLAVB0qGRBhpBsT" 
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-full overflow-hidden p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-slate-950 to-emerald-950/80 border-2 border-emerald-400/90 shadow-[0_0_30px_rgba(16,185,129,0.35)] group hover:border-emerald-300 hover:scale-[1.02] transition-all"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/35 transition-all" />

              <div className="relative z-10 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  <span className="material-symbols-outlined text-3xl font-bold">groups</span>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full" />
                </div>

                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-mono font-black text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/50 uppercase tracking-wider">
                      Acceso 100% Libre
                    </span>
                    <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Comunidad VIP
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-200 transition-colors uppercase tracking-tight leading-tight">
                    Únete a mi Grupo de WhatsApp Gratuito
                  </h3>
                  <p className="text-xs text-slate-300 leading-snug mt-1 font-medium">
                    Plantillas, scripts de control de proyectos, prompts de IA y novedades sin costo.
                  </p>
                </div>

                <div className="shrink-0 self-center pl-1">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black group-hover:translate-x-1 group-hover:bg-emerald-400 transition-all shadow-[0_0_12px_rgba(16,185,129,0.6)]">
                    <span className="material-symbols-outlined text-xl font-bold">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Stack de Enlaces Rápidos (/mobile) */}
          <div className="space-y-3.5">
            {/* 1. Cursos Asincrónicos */}
            <Link 
              href="/formacion?tab=asinc#catalogo-formacion" 
              className="block w-full bg-slate-900/80 p-4 rounded-2xl border border-purple-500/30 hover:border-purple-400 transition-all group hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <span className="material-symbols-outlined text-2xl font-bold">play_lesson</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-black text-white group-hover:text-purple-300 transition-colors uppercase tracking-tight">
                      Cursos Asincrónicos
                    </span>
                    <span className="text-[9px] font-mono font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                      DESDE $5 USD
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-tight">
                    Aprende a tu propio ritmo: &quot;El Despertar&quot;, clases abiertas y másters.
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-500 group-hover:text-purple-400 text-lg transition-colors">
                  chevron_right
                </span>
              </div>
            </Link>

            {/* 2. Cursos Sincrónicos */}
            <Link 
              href="/formacion?tab=sinc#catalogo-formacion" 
              className="block w-full bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/30 hover:border-emerald-400 transition-all group hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <span className="material-symbols-outlined text-2xl font-bold">video_camera_front</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors uppercase tracking-tight">
                      Cursos Sincrónicos
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      EN VIVO
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-tight">
                    Acompañamiento en directo paso a paso con el Ing. Aurelio Solórzano.
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-500 group-hover:text-emerald-400 text-lg transition-colors">
                  chevron_right
                </span>
              </div>
            </Link>

            {/* 3. Soluciones Agénticas */}
            <Link 
              href="/servicios?tab=agentes#agentes" 
              className="block w-full bg-slate-900/80 p-4 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 transition-all group hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <span className="material-symbols-outlined text-2xl font-bold">smart_toy</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors uppercase tracking-tight">
                      Soluciones Agénticas
                    </span>
                    <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      SEGUNDOS
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-tight">
                    Agentes de IA: Visor 4D/5D, APUs tipo S10, macros MS Project y EETT.
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-500 group-hover:text-cyan-400 text-lg transition-colors">
                  chevron_right
                </span>
              </div>
            </Link>

            {/* 4. Consultorías */}
            <Link 
              href="/servicios?tab=consultoria#consultoria" 
              className="block w-full bg-slate-900/80 p-4 rounded-2xl border border-amber-500/30 hover:border-amber-400 transition-all group hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <span className="material-symbols-outlined text-2xl font-bold">engineering</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-black text-white group-hover:text-amber-300 transition-colors uppercase tracking-tight">
                      Consultorías Especializadas
                    </span>
                    <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                      {consultoria.minutosGratis} MIN GRATIS
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-tight">
                    Planeamiento maestro, reclamos de ampliación, auditoría y peritajes.
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-500 group-hover:text-amber-400 text-lg transition-colors">
                  chevron_right
                </span>
              </div>
            </Link>

            {/* Redes y Comunidad */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <Link 
                href="https://chat.whatsapp.com/H0lG0T5yLAVB0qGRBhpBsT" 
                target="_blank" 
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-emerald-500/20 hover:border-emerald-500/50 transition-all group"
              >
                <span className="material-symbols-outlined text-emerald-400 text-lg">group</span>
                <div className="text-left min-w-0">
                  <span className="block text-[11px] font-bold text-white group-hover:text-emerald-300 truncate">Comunidad VIP</span>
                  <span className="block text-[9px] text-slate-400 font-mono">WhatsApp Gratis</span>
                </div>
              </Link>

              <Link 
                href="https://www.youtube.com/@aurelioalfonsosolorzanorios" 
                target="_blank" 
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-red-500/20 hover:border-red-500/50 transition-all group"
              >
                <span className="material-symbols-outlined text-red-500 text-lg">subscriptions</span>
                <div className="text-left min-w-0">
                  <span className="block text-[11px] font-bold text-white group-hover:text-red-300 truncate">YouTube Oficial</span>
                  <span className="block text-[9px] text-slate-400 font-mono">Masterclasses</span>
                </div>
              </Link>

              <Link 
                href="https://vt.tiktok.com/ZSgyYmMFX/" 
                target="_blank" 
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-pink-500/20 hover:border-pink-500/50 transition-all group"
              >
                <svg className="w-4 h-4 fill-current text-pink-400 shrink-0" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                </svg>
                <div className="text-left min-w-0">
                  <span className="block text-[11px] font-bold text-white group-hover:text-pink-300 truncate">TikTok Oficial</span>
                  <span className="block text-[9px] text-slate-400 font-mono">Demos en Video</span>
                </div>
              </Link>
            </div>

            {/* Botón a /mobile */}
            <div className="pt-4 text-center">
              <Link 
                href="/mobile" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:from-pink-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(236,72,153,0.3)] hover:scale-105"
              >
                <span className="material-symbols-outlined text-sm">smartphone</span>
                <span>Abrir Vista Minimalista de TikTok (/mobile)</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EL EXPERTO DETRÁS: ING. AURELIO SOLÓRZANO */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="rounded-[36px] bg-slate-900 border border-slate-800 p-8 sm:p-12 flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-6 items-center text-center sm:text-left">
            <Image
              src="/images/Aurelio Solorzano.png"
              alt="Ing. Aurelio Solorzano Rios"
              width={112}
              height={112}
              sizes="112px"
              className="rounded-3xl object-cover w-28 h-28 border-2 border-cyan-500/40 shadow-xl"
            />
            <div className="space-y-1.5 max-w-xl">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">Fundador y Consultor Principal</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Ing. Aurelio Solórzano Ríos</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                Especialista en Control de Proyectos, Planeamiento 4D/5D e Inteligencia Artificial Agéntica. Más de una década liderando obras de infraestructura, refinerías y proyectos de gran envergadura.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link
              href="/consultoria"
              className="px-6 py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-widest text-center transition-all shadow-[0_0_20px_rgba(245,168,0,0.3)]"
            >
              Reunión Gratuita ({consultoria.minutosGratis} min)
            </Link>
            <Link
              href="https://wa.me/51993147501"
              target="_blank"
              className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-widest text-center border border-slate-700 transition-all"
            >
              Contactar por WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CIERRE Y LLAMADO A LA ACCIÓN GLOBAL */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="p-8 sm:p-14 rounded-[40px] bg-gradient-to-br from-cyan-950/40 via-slate-900 to-black border border-cyan-500/30 text-center relative overflow-hidden space-y-6">
          <span className="text-cyan-400 text-xs font-mono font-black tracking-[0.3em] uppercase block">
            El Futuro de la Construcción es Agéntico
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight max-w-3xl mx-auto leading-tight">
            ¿Listo para dejar atrás la rigidez del software convencional?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Conversemos sobre cómo adaptar agentes de IA a tu proyecto o inscríbete a nuestras capacitaciones para dominar las herramientas agénticas hoy mismo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/formacion"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(245,168,0,0.4)]"
            >
              Ver Catálogo de Agentes y Cursos
            </Link>
            <Link
              href="https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20deseo%20implementar%20soluciones%20ag%C3%A9nticas%20en%20mi%20empresa%20o%20proyecto."
              target="_blank"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              Hablar con un Especialista (+51 993 147 501)
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
