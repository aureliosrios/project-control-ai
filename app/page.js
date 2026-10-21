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
    tag: "AUTOMATIZACIÓN INSTANTÁNEA",
    titulo: "Soluciones Agénticas",
    icono: "smart_toy",
    color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400",
    badge: "Entregables en Segundos",
    desc: "Agentes de IA autónomos que procesan tus planos (DWG/DXF), cronogramas y presupuestos. Generan en segundos visores 3D interactivos 4D/5D, APUs tipo S10, macros VBA en MS Project y redacción de EETT normadas sin la rigidez del software clásico.",
    linkText: "Explorar Agentes",
    linkHref: "/formacion#agentes",
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
    linkHref: "/consultoria",
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
    linkHref: "/formacion#sincronicos",
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
    linkHref: "/formacion#asincronicos",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 pt-28 sm:pt-36 pb-20 selection:bg-cyan-500 selection:text-slate-950">
      {/* 1. HERO SECTION: LA MISIÓN AGÉNTICA */}
      <section className="max-w-7xl mx-auto px-6 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge Misión */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-in fade-in duration-700">
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
              href="/formacion"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:scale-105 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">smart_toy</span>
              Explorar Soluciones & Cursos
            </Link>

            <Link
              href="/consultoria"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest border border-slate-700 hover:border-cyan-400 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base text-cyan-400">engineering</span>
              Consultoría Especializada
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
          <div className="p-8 rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-cyan-950/30 to-slate-950/80 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
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

      {/* 3. SHOWCASE DESTACADO: NUESTRO PRIMER AGENTE PUBLICADO (4D/5D) */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="p-8 sm:p-12 rounded-[36px] border-2 border-cyan-500/40 bg-gradient-to-br from-slate-900 via-slate-950 to-[#030a1c] relative overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.2)]">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-red-950 text-red-400 border border-red-500/40 flex items-center gap-1.5 shadow-[0_0_12px_rgba(239,68,68,0.3)]">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  Primer Agente en Acción · Disponible
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                  BIM 4D/5D & Three.js WebGL
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                Agente de Planeamiento de Obra 4D y 5D con IA
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Le proporcionas al agente de IA tus <strong>Planos (DWG/DXF)</strong>, <strong>Cronograma maestro</strong> y <strong>Presupuesto</strong>, y genera de forma automática un <strong>Visor Web 3D interactivo</strong> donde modela todo el proceso constructivo paso a paso, integrando Curva S, presupuesto devengado y Lookahead Planning.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Insumos:</span>
                  <span className="text-slate-200 font-semibold">Planos + P6/MSP + APUs</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Entregable:</span>
                  <span className="text-cyan-300 font-semibold">Visor 3D Interactivo (.html)</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Velocidad:</span>
                  <span className="text-emerald-400 font-semibold">⚡ En Segundos</span>
                </div>
              </div>

              {/* Botones del Agente 4D/5D */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href="https://youtu.be/weL9yLqdCHY"
                  target="_blank"
                  className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                >
                  <span className="material-symbols-outlined text-base">play_circle</span>
                  Ver Guía en YouTube (14 min)
                </Link>

                <Link
                  href="https://vt.tiktok.com/ZSgyYmMFX/"
                  target="_blank"
                  className="px-5 py-3 rounded-xl bg-black hover:bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-pink-500/40 shadow-[0_0_12px_rgba(236,72,153,0.2)]"
                >
                  <svg className="w-4 h-4 fill-current text-cyan-400" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                  </svg>
                  Ver Resultado Final (TikTok)
                </Link>

                <Link
                  href="https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20vi%20el%20Agente%20de%20Planeamiento%204D/5D%20y%20deseo%20adquirirlo%20para%20mis%20proyectos."
                  target="_blank"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  Quiero el Agente (+51 993 147 501)
                </Link>
              </div>
            </div>

            {/* Mockup / Visual del Visor 3D */}
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 p-6 flex flex-col justify-between shadow-2xl min-h-[300px]">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-[11px] font-mono text-cyan-400 font-bold">CASE STUDY: REFINERÍA CONCHÁN</span>
                <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">478 DÍAS DE OBRA</span>
              </div>
              <div className="space-y-3 py-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <span className="material-symbols-outlined text-3xl">view_in_ar</span>
                </div>
                <h4 className="text-lg font-bold text-white">Tanques T-68 & T-69 (160,000 Bls)</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Simulación de gateo inverso, cubeto de retención de 755.4 ml, Curva S y Lookahead a 4 semanas.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>EVM: $16.8M USD</span>
                <span className="text-emerald-400 font-mono font-bold">100% Autocontenido (.HTML)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NUESTROS SERVICIOS: SOLUCIONES AGÉNTICAS, CONSULTORÍA Y CAPACITACIONES */}
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
              className="px-6 py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-widest text-center transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
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
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)]"
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
