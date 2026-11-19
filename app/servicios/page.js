"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { consultoria, contactoConsultoria } from "@/lib/oferta";

const agentesEspecializados = [
  {
    id: "agente-4d5d",
    nombre: "Agente de Planeamiento de Obra 4D y 5D",
    especialidad: "Planeamiento BIM 4D/5D, Curva S y Visor Web 3D",
    tag: "BIM 4D/5D & THREE.JS",
    estado: "Publicado en YouTube",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-cyan-500/40 hover:border-cyan-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-cyan-400 border border-cyan-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "view_in_ar",
    duracionVideo: "14 min",
    tiempoEntrega: "45 segundos",
    problema: "¿Tu proyecto no fue modelado en Revit y necesitas coordinar planos 2D en CAD, cronogramas de cientos de tareas y presupuestos desvinculados sin poder visualizar la obra en el tiempo?",
    solucion: "Si tu proyecto no fue configurado con Revit, este agente es la solución para tener un visor 3D vinculado al presupuesto y al cronograma como en aplicativos de última generación (Revit, Navisworks). Convierte tus planos en 2D (DWG/DXF) + presupuesto + cronograma (P6/MSP) en un visor 3D totalmente interactivo donde puedes hacer un recorrido virtual, con semáforo constructivo, Curva S y Lookahead.",
    entregable: "Visor 3D interactivo en HTML/Three.js autocontenido con recorrido virtual, simulación temporal 4D, panel de costos 5D (EVM), Curva S y Lookahead a 4 semanas.",
    videoId: "skWw6d2JAes",
    tiktokUrl: "https://vt.tiktok.com/ZSgyYmMFX/",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente de Planeamiento de Obra 4D y 5D (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-s10",
    nombre: "Agente de Presupuestos & APU Tipo S10",
    especialidad: "Costos, Presupuestos y Fórmulas Polinómicas con IA",
    tag: "COSTOS & S10",
    estado: "Publicado en YouTube",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-emerald-500/40 hover:border-emerald-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-emerald-400 border border-emerald-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "calculate",
    duracionVideo: "15 min",
    tiempoEntrega: "15 segundos",
    problema: "¿Pasas horas calculando rendimientos, cuadrillas y transcribiendo precios en hojas de cálculo propensas a errores y alucinaciones de LLMs?",
    solucion: "Ingesta determinista de expedientes (PDF/Excel), construcción de Cerebro Digital con Grafo de 1,486 nodos, evaluación de 10 compuertas (G1-G10) y fórmula polinómica conforme al D.S. 011-79-VC.",
    entregable: "Carpeta autocontenida con libro Excel S10 de fórmulas vivas (openpyxl), budget_result.json, Wiki técnica navegable, grafo integrado y verificación matemática SHA-256.",
    videoId: "rK4FQC59Ojc",
    tiktokUrl: "https://vt.tiktok.com/ZSg5CFDGH/",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente de Presupuestos & APU Tipo S10 (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-presto",
    nombre: "Agente de Presupuestos & APU Tipo Presto",
    especialidad: "Costos, Presupuestos y Exportación Presto (Excel & BC3)",
    tag: "COSTOS & PRESTO",
    estado: "Publicado en YouTube",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-amber-500/40 hover:border-amber-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-amber-400 border border-amber-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "table_chart",
    duracionVideo: "15 min",
    tiempoEntrega: "15 segundos",
    problema: "¿Expedientes complejos sin archivos nativos de Presto y horas perdidas transcribiendo partidas y APUs sin trazabilidad?",
    solucion: "Ingesta determinista de expedientes (PDF/Excel), generación de presupuesto en formato Presto con descomposición por naturalezas (mano de obra, maquinaria, materiales, subcontratas) y archivo estándar BC3 (FIEBDC-3/2020).",
    entregable: "Carpeta autocontenida con libro Excel oficial formato Presto de fórmulas vivas, archivo estándar nativo .bc3 para Presto, Cerebro Digital navegable y grafo de conocimiento.",
    videoId: "Npqz9TnI6No",
    tiktokUrl: "https://vt.tiktok.com/ZSg9ThvSH/",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente de Presupuestos & APU Tipo Presto (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-cad-dwg",
    nombre: "Agente de Digitalización de Planos (PDF, PNG, JPG a DWG)",
    especialidad: "Restitución CAD, Vectorización y Estandarización DWG/DXF",
    tag: "CAD · PDF/PNG/JPG A DWG",
    estado: "Publicado en YouTube",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-indigo-500/40 hover:border-indigo-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-indigo-400 border border-indigo-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "architecture",
    duracionVideo: "9 min",
    tiempoEntrega: "30 segundos",
    problema: "¿Tienes planos en PDF, imágenes PNG/JPG o escaneados sin el archivo editable y pierdes días redibujando capas, bloques, cotas y escalas en AutoCAD?",
    solucion: "Digitaliza y restituye planos desde PDF (vectorial o escaneado), PNG y JPG a formato nativo DWG y DXF (R2018) en milímetros reales (escala 1:1). Detecta y organiza capas por disciplina (OCG/AIA/ISO), convierte geometría repetida en bloques reutilizables, reconstruye achurados (HATCH), textos, cotas, layout A1 con viewports calibrados y valida con AutoCAD Core Console (0 errores de auditoría).",
    entregable: "Carpeta CAD autocontenida con plano nativo .DWG y .DXF (R2018) estandarizado por capas y bloques, lámina en espacio papel con viewports calibrados, comparativa visual e informe técnico de control de calidad.",
    videoId: "IPSAlchju68",
    tiktokUrl: "https://vt.tiktok.com/ZSg4H7Urm/",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente de Digitalización de Planos (PDF, PNG, JPG a DWG) (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-metrados-dwg",
    nombre: "Agente Automatizador de Metrados (Planos DWG a Excel)",
    especialidad: "2 Agentes a elegir: Genérico (Cualquier Proyecto) o Normativa Peruana de Edificaciones y Habilitación Urbana",
    tag: "METRADOS · DWG A EXCEL",
    estado: "Publicado en YouTube",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-teal-500/40 hover:border-teal-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-teal-400 border border-teal-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "square_foot",
    duracionVideo: "65 min",
    tiempoEntrega: "30 segundos",
    problema: "¿Pasas semanas midiendo polilíneas a mano en AutoCAD, contando bloques uno por uno y digitando medidas en Excel con alto riesgo de duplicidades o partidas omitidas?",
    solucion: "Automatiza la extracción geométrica desde planos nativos AutoCAD (.DWG y .DXF) con LibreDWG/Python. El usuario puede elegir entre dos agentes según su proyecto: (1) Agente Genérico para cualquier proyecto, país y múltiples disciplinas (civil, mecánica, electricidad, instrumentación, infraestructura) por WBS/EDT; o (2) Agente Normativo especializado en la Normativa Peruana de Metrados para Obras de Edificación y Habilitaciones Urbanas (R.D. N° 073-2010 / RNE).",
    entregable: "Carpeta de proyecto con libro Excel oficial de metrados con fórmulas vivas auditadas matemáticamente (Resumen WBS o partidas bajo Normativa Peruana de Edificaciones y Habilitación Urbana, detalle por paquete de trabajo, fuentes y criterios), protocolos de cobertura y supuestos, y semáforo de calidad técnica.",
    videoId: "9FqLHJgDC94",
    tiktokUrl: "https://vt.tiktok.com/ZSgsPDX9M/",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente Automatizador de Metrados (Planos DWG a Excel) (S/ 70 PEN / $25 USD) — Versión a elegir: [Genérico / Edificaciones y Habilitación Urbana]. Adjunto mi comprobante de pago."
  },
  {
    id: "agente-ingesta-s10",
    nombre: "Agente de Ingesta Excel a Base de Datos S10 (SQL Server)",
    especialidad: "Migración Automatizada de Presupuestos Excel a Esquema Nativo S10",
    tag: "INGESTA · EXCEL A S10 SQL",
    estado: "Publicado en YouTube",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-sky-500/40 hover:border-sky-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-sky-400 border border-sky-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "dns",
    duracionVideo: "10 min",
    tiempoEntrega: "10 segundos",
    problema: "¿Pasas semanas digitando presupuestos celda por celda en S10, lidiando con errores de importación de texto o bases de datos corruptas?",
    solucion: "Ingesta determinista y transaccional desde Excel o JSON que escribe directamente en las tablas del esquema nativo de S10 en SQL Server (Presupuesto, Partida, APUs, Subpartidas anidadas, Insumos, Pie y Fórmulas), con 100% de asignación a Índices Unificados oficiales del INEI y verificación matemática atómica.",
    entregable: "Script T-SQL transaccional (BEGIN TRAN/COMMIT) validado contra la plantilla oficial ModelS10, base de datos S10 lista para procesar en S10 Presupuestos y respaldo .BAK de seguridad.",
    videoId: "1l2e-I65KtQ",
    tiktokUrl: "https://vt.tiktok.com/ZSgtw7FYv/",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente de Ingesta Excel a Base de Datos S10 (SQL Server) (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-excel-p6",
    nombre: "Agente de Excel a Primavera P6 (.XER)",
    especialidad: "Planeamiento, Seguimiento, Lookahead y Generación Nativa de XER",
    tag: "EXCEL A PRIMAVERA P6 (.XER)",
    estado: "Publicado en YouTube",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-orange-500/40 hover:border-orange-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-orange-400 border border-orange-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "table_view",
    duracionVideo: "17 min",
    tiempoEntrega: "10 segundos",
    problema: "¿Pasas días cargando cronogramas a mano en Primavera P6, lidiando con errores de sintaxis en el XER, descuadres de calendarios o pérdida de relaciones lógicas y costos?",
    solucion: "Ingesta determinista desde Excel o JSON que reconoce 3 fuentes (Planeamiento con relaciones CPM, Seguimiento al corte Data Date y Lookahead diario PROG/EJEC) y 3 niveles de control (N1 barras, N2 horas-hombre y N3 costos/EVM). Resuelve ambigüedades en PREGUNTAS.md antes de asumir datos y genera directamente el archivo .XER oficial.",
    entregable: "Archivo nativo .XER listo para importar en Primavera P6 sin errores, proyecto_p6.json (contrato 3.0), memoria técnica de supuestos (SUPUESTOS.md), reporte de conversión y auditoría de retorno con métricas DCMA-14.",
    videoId: "gorfbCeit3A",
    tiktokUrl: "https://vt.tiktok.com/ZSp1wND3d/",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente de Excel a Primavera P6 (.XER) (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-valorizaciones-publicas",
    nombre: "Agente de Valorizaciones de Obra Pública (Perú)",
    especialidad: "Presupuesto, Cronograma, Cuaderno de Obra en PDF, Reajustes (K) y Curva S",
    tag: "VALORIZACIONES & CONTRATACIONES",
    estado: "Publicado en YouTube",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-purple-500/40 hover:border-purple-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-purple-400 border border-purple-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "receipt_long",
    duracionVideo: "20 min",
    tiempoEntrega: "30 segundos",
    problema: "¿Pasas días cuadrando manualmente los asientos diarios del Cuaderno de Obra en PDF con la planilla de metrados, el presupuesto contractual en Excel y calculando fórmulas de reajuste K propensas a observaciones y retrasos de pago?",
    solucion: "Le proporcionas al Agente el Presupuesto Contractual (Excel con partidas y APUs tipo S10), el Cronograma de Ejecución de Obra (Excel con Línea Base LB-0) y el PDF del Cuaderno de Obra digitalizado. El Agente extrae los metrados ejecutados diarios, concilia avances acumulados y genera en minutos la valorización mensual con fórmulas vivas bajo la Ley de Contrataciones del Estado (D.L. 1444, D.S. 344-2018-EF).",
    entregable: "Expediente oficial en Excel con fórmulas vivas (Resumen General, Desagregado Contractual, Planilla de Metrados, Cálculo de Reajuste K por Fórmula Polinómica D.S. 011-79-VC, Amortizaciones y Deducciones de Adelanto Directo y Materiales, Retenciones), Informe Técnico en Markdown/PDF y Curva S programada vs ejecutada.",
    videoId: "0LPG5_YoXlM",
    tiktokUrl: "https://vt.tiktok.com/ZSpc9YGn5/",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente de Valorizaciones de Obra Pública (Perú) (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-estados-de-pago-privado",
    nombre: "Agente de Estados de Pago (Valorización) - Obra Privada",
    especialidad: "Obra Privada a Suma Alzada (FIDIC · NEC4 · PMI), Sustento Trazable de Metrados y Órdenes de Cambio",
    tag: "ESTADOS DE PAGO & EDP",
    estado: "Publicado en YouTube",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-emerald-500/40 hover:border-emerald-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-emerald-400 border border-emerald-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "fact_check",
    duracionVideo: "9 min",
    tiempoEntrega: "60 segundos",
    problema: "¿Valorizar una obra privada te obliga a cruzar cada mes cientos de reportes diarios (DPR), protocolos QA/QC, RFI, transmittals y órdenes de cambio sin poder demostrar fácilmente de dónde sale cada metrado certificado?",
    solucion: "Entrada de datos: recibe hasta 7 grupos de insumos (Presupuesto APU, Cronograma LB-0, Reportes Diarios DPR, Protocolos de Cierre QA/QC, RFI y Transmittals, Control de Cambios CO/CV y EDP Anterior) en JSON, Excel o PDF. Si no cuentas con todos los insumos, la IA se adapta a la información disponible con la que cuentas o sustentas tus metrados para el EDP; sin embargo, está preparada para cualquier situación de un Estado de Pago. Ejecuta validaciones V01–V14 / E00–E04 sin inventar cifras, respeta la moneda original y calcula ambos criterios de certificación: solo lo protocolizado vs. protocolizado + reporte diario.",
    entregable: "Salida de datos: libro Excel oficial por periodo con 8 hojas y fórmulas vivas verificadas con LibreOffice (Resumen_EDP, Contrato_Vigente, Valorizacion_Contractual, Valorizacion_Cambios, Sustento_Metrados con selector de criterio, Sustento_Metrados_CO, Sustento_Documental y Parametros), archivo JSON estructurado, Informe Ejecutivo en Markdown, Matriz Consolidada multi-EDP y reportes de verificación S01–S08.",
    videoId: "lF7T_IA7g0A",
    tiktokUrl: "https://vt.tiktok.com/ZSpcH3KhH/",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente de Estados de Pago (Valorización) - Obra Privada (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-msproject",
    nombre: "Agente Programador Gantt & VBA (MS Project)",
    especialidad: "Presupuesto con APU a Cronograma, Duraciones, Cuadrillas y Archivo .MPP",
    tag: "MS PROJECT & VBA",
    estado: "Publicado en YouTube",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-blue-500/40 hover:border-blue-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-blue-400 border border-blue-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "calendar_month",
    duracionVideo: "8 min",
    tiempoEntrega: "30 segundos",
    problema: "¿Vincular cientos de tareas una por una, calcular duraciones partida por partida con los rendimientos del APU, estimar cuadrillas y ajustar calendarios a mano en MS Project te toma días?",
    solucion: "Entrada de datos: recibe un presupuesto o cronograma en Excel o PDF (por ejemplo, un export de Presto con análisis de precios unitarios). Lee metrados, APU, rendimientos y cuadrillas, calcula las duraciones (metrado ÷ rendimiento × cuadrillas), propone la red de actividades con vínculos y desfases, hitos y plazo contractual, y confirma contigo la fecha de inicio y el calendario (días, turnos y feriados) antes de exportar.",
    entregable: "Salida de datos: archivo nativo .MPP listo para abrir en Microsoft Project, módulo VBA (.bas) para regenerar el cronograma, JSON validado con la trazabilidad de cada dato (hoja y celda de origen) y resumen en Markdown con supuestos y decisiones que cambian la programación.",
    videoId: "qpL0cwAror4",
    tiktokUrl: "https://vt.tiktok.com/ZSpc9DUaf/",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente Programador Gantt & VBA (MS Project) (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-expediente-tecnico",
    nombre: "Agente para Expediente Técnico (Cerebro Digital)",
    especialidad: "Cerebro Digital del Proyecto, Trazabilidad Total, EETT y Consolidación Word (.docx)",
    tag: "EXPEDIENTE TÉCNICO · CEREBRO DIGITAL",
    estado: "Publicado en YouTube",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-violet-500/40 hover:border-violet-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-violet-400 border border-violet-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "hub",
    duracionVideo: "10 min",
    tiempoEntrega: "45 segundos",
    problema: "¿Tienes estudios básicos, memorias, planos, metrados, catálogo de partidas y normativa dispersos en decenas de archivos sin coherencia ni sustento al armar el Expediente Técnico y las EETT?",
    solucion: "Ingiere toda la documentación del proyecto organizada en 8 frentes —gestión y control documental (incluida la normativa vigente aplicable), base de diseño y datos generales, estudios básicos, memorias descriptivas, planos e ingeniería, WBS y catálogo de partidas, metrados maestros y trazabilidad/calidad— para construir un Cerebro Digital unificado. Vincula automáticamente cada partida con sus planos, metrados, ensayos y normas de respaldo, detecta discrepancias antes de redactar y convierte todo ese corpus en el Expediente Técnico y las Especificaciones Técnicas (EETT) trazables del proyecto.",
    entregable: "Cerebro Digital del proyecto (corpus normalizado, grafo de conocimiento, wiki técnica navegable y matriz de trazabilidad bidireccional), Especificaciones Técnicas (EETT) por partida y Expediente Técnico consolidado en Markdown y Microsoft Word (.docx) editable.",
    videoId: "C7PSBudh6CA",
    tiktokUrl: "https://vt.tiktok.com/ZSpc9Ucf8/",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente para Expediente Técnico (Cerebro Digital) (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-consultas-obra-qaqc",
    nombre: "Agente de Consultas de Obra & Calidad QA/QC (Cerebro Digital)",
    especialidad: "Auditoría de Incoherencias, Compras Discrepantes, RFIs Técnicos y Reclamos Contractuales",
    tag: "CALIDAD QA/QC · CONSULTAS DE OBRA",
    estado: "Publicado en YouTube",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-rose-500/40 hover:border-rose-400",
      bg: "bg-slate-900/60",
      badge: "bg-red-950 text-red-300 border border-red-500/40 font-bold",
      pill: "bg-slate-800/80 text-rose-400 border border-rose-800/60",
      btn: "bg-red-600 hover:bg-red-500 text-white"
    },
    icono: "verified_user",
    duracionVideo: "12 min",
    tiempoEntrega: "30 segundos",
    problema: "¿Tu obra civil o metalmecánica tiene contratos, EETT, planos, normas (API 653/650, ASME V/IX, RNE, GRI-GM13) y registros de campo dispersos, donde compras adquiere materiales equivocados por seguir planos simplificados y responder un RFI o reclamo contractual toma días?",
    solucion: "Audita y organiza toda la documentación del proyecto (gobernanza contractual, alcance civil y metalmecánico, normativa aplicable seleccionada y control de calidad en campo) manteniendo paridad PDF/Word/Excel para el equipo y Markdown/JSON con IDs para la IA. Construye un Cerebro Digital con Wiki modular y Grafo de Conocimiento interactivo para detectar incoherencias técnicas, validar compras internas de materiales frente a EETT y normas, y emitir dictámenes trazables de RFIs y reclamos contractuales.",
    entregable: "Carpeta de proyecto saneada (PDF, MD y JSON estructurado con IDs), Cerebro Digital (Wiki modular + Grafo interactivo en HTML Dark Mode + .canvas), matriz de consistencia normativa y motor de consultas para compras discrepantes, RFIs y reclamos.",
    videoId: "mlFOUMeEEv4",
    tiktokUrl: "https://vt.tiktok.com/ZSpcut4gg/",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir el Agente de Consultas de Obra & Calidad QA/QC (Cerebro Digital) (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-contratos",
    nombre: "Agente Auditor Contractual & Cerebro Digital",
    especialidad: "Oficina Técnica y Contractual",
    tag: "CONTRATOS & AUDITORÍA",
    estado: "Próximamente",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-slate-800 hover:border-slate-700",
      bg: "bg-slate-900/50",
      badge: "bg-slate-800 text-slate-300 border border-slate-700 font-bold",
      pill: "bg-slate-800/80 text-slate-400 border border-slate-700/60",
      btn: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
    },
    icono: "gavel",
    duracionVideo: "10 min",
    tiempoEntrega: "25 segundos",
    problema: "¿Expedientes y contratos de más de 500 páginas donde se pierden penalidades, plazos de ampliación y obligaciones críticas?",
    solucion: "Pipeline OCR y análisis semántico para extraer automáticamente matrices de riesgos, penalidades diarias y causales de ampliación.",
    entregable: "Matriz ejecutiva de control contractual en Excel (dashboard A3) y grafo de conocimiento conectado en Obsidian.",
    videoId: "0nJQXGfkMB4",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir / reservar el Agente Auditor Contractual & Cerebro Digital (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-lps",
    nombre: "Agente Lookahead & Last Planner System",
    especialidad: "Control Semanal y Producción",
    tag: "LAST PLANNER SYSTEM",
    estado: "Próximamente",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-slate-800 hover:border-slate-700",
      bg: "bg-slate-900/50",
      badge: "bg-slate-800 text-slate-300 border border-slate-700 font-bold",
      pill: "bg-slate-800/80 text-slate-400 border border-slate-700/60",
      btn: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
    },
    icono: "fact_check",
    duracionVideo: "11 min",
    tiempoEntrega: "15 segundos",
    problema: "¿Reuniones de producción caóticas, restricciones no identificadas a tiempo y cálculo manual del PPC cada semana?",
    solucion: "Estructura el Lookahead a 6 semanas con arquitectura de 3 filas (Línea Base LB-0, Reprogramado y Real Campo), Plan Semanal WWP y restricciones.",
    entregable: "Matriz viva de restricciones en Excel con semaforización automática, causas de no cumplimiento (CNC) y cálculo PPC.",
    videoId: "dVZNMhvNSsw",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir / reservar el Agente Lookahead & Last Planner System (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  },
  {
    id: "agente-eett",
    nombre: "Agente Redactor de EETT a Word",
    especialidad: "Especificaciones Técnicas",
    tag: "EETT & WORD",
    estado: "Próximamente",
    precioSoles: "S/ 70",
    precioDolares: "$25 USD",
    yape: "51 993147501",
    paypalUrl: "https://paypal.me/ProjectControlAI/25USD",
    theme: {
      border: "border-slate-800 hover:border-slate-700",
      bg: "bg-slate-900/50",
      badge: "bg-slate-800 text-slate-300 border border-slate-700 font-bold",
      pill: "bg-slate-800/80 text-slate-400 border border-slate-700/60",
      btn: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
    },
    icono: "description",
    duracionVideo: "10 min",
    tiempoEntrega: "20 segundos",
    problema: "¿Copiar y pegar especificaciones desactualizadas con normas derogadas y unidades de medida incongruentes?",
    solucion: "Redacta especificaciones técnicas completas y normadas por partida (descripción, materiales, método de ejecución, controles, medición y pago).",
    entregable: "Documento oficial listo para entregar en Microsoft Word (.docx) con índice automático, estilos institucionales y normativa técnica vigente.",
    videoId: "NjWnA5b9Zho",
    whatsappMsg: "Hola Ing. Aurelio, deseo adquirir / reservar el Agente Redactor de EETT a Word (S/ 70 PEN / $25 USD). Adjunto mi comprobante de pago."
  }
];

const temasConsultoria = [
  ["Planeamiento y cronogramas", "Revisa o elabora secuencias, ruta crítica, recursos y seguimiento de obra en MS Project o Primavera P6."],
  ["Presupuestos y costos", "Trabaja o estructura tus APUs, análisis de recursos, costos indirectos y control de presupuesto."],
  ["Especificaciones técnicas", "Elabora, organiza y revisa tus EETT, fuentes técnicas y coherencia con el expediente."],
  ["Automatización en cotizaciones", "Acelera y estandariza plantillas, matrices de cotización comercial y flujos ágiles con IA."],
  ["Reportabilidad, control y seguimiento", "Diseña dashboards, curvas S, reportes ejecutivos y seguimiento de avance físico y financiero."],
  ["Cerebro digital y agentes IA", "Estructura documentos y conocimiento de tu proyecto para encontrar información al instante y simplificar tareas."],
];

function ServiciosContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("agentes");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [expandedAgents, setExpandedAgents] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos"); // "todos" | "disponibles" | "proximos"

  const toggleAgent = (id) => {
    setExpandedAgents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all = {};
    agentesEspecializados.forEach((a) => {
      all[a.id] = true;
    });
    setExpandedAgents(all);
  };

  const collapseAll = () => {
    setExpandedAgents({});
  };

  const filteredAgentes = agentesEspecializados.filter((agente) => {
    if (statusFilter === "disponibles" && agente.estado !== "Publicado en YouTube") {
      return false;
    }
    if (statusFilter === "proximos" && agente.estado === "Publicado en YouTube") {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      agente.nombre.toLowerCase().includes(q) ||
      agente.especialidad.toLowerCase().includes(q) ||
      agente.tag.toLowerCase().includes(q) ||
      agente.problema.toLowerCase().includes(q) ||
      agente.solucion.toLowerCase().includes(q) ||
      agente.entregable.toLowerCase().includes(q)
    );
  });

  const countDisponibles = agentesEspecializados.filter((a) => a.estado === "Publicado en YouTube").length;
  const countProximos = agentesEspecializados.filter((a) => a.estado !== "Publicado en YouTube").length;

  const changeTab = (tab, hashTarget = null) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      if (hashTarget) {
        url.hash = hashTarget;
      }
      window.history.replaceState(null, "", url.toString());
      if (hashTarget) {
        setTimeout(() => {
          const el = document.getElementById(hashTarget);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tabParam = searchParams?.get("tab") || new URLSearchParams(window.location.search).get("tab");
      const hash = window.location.hash.toLowerCase().replace("#", "");
      if (tabParam === "consultoria" || hash.includes("consultoria")) {
        setActiveTab("consultoria");
      } else if (tabParam === "agentes" || hash.includes("agente")) {
        setActiveTab("agentes");
      }

      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }

      const handleCustomEvent = (e) => {
        if (e.detail?.tab) {
          setActiveTab(e.detail.tab);
        }
        if (e.detail?.hashTarget) {
          setTimeout(() => {
            const el = document.getElementById(e.detail.hashTarget);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 120);
        }
      };

      const handlePopState = () => {
        const p = new URLSearchParams(window.location.search).get("tab");
        const h = window.location.hash.toLowerCase().replace("#", "");
        if (p === "consultoria" || h.includes("consultoria")) setActiveTab("consultoria");
        else if (p === "agentes" || h.includes("agente")) setActiveTab("agentes");
      };

      window.addEventListener("pcai-servicios-tab", handleCustomEvent);
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("hashchange", handlePopState);
      return () => {
        window.removeEventListener("pcai-servicios-tab", handleCustomEvent);
        window.removeEventListener("popstate", handlePopState);
        window.removeEventListener("hashchange", handlePopState);
      };
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#14161a] text-slate-100 selection:bg-cyan-500/30">
      <div className="fixed inset-0 tech-grid opacity-30 pointer-events-none" />

      <main className="relative z-10 pt-24 md:pt-28 pb-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {/* Header de Servicios de Ingeniería */}
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2 leading-tight">
            {activeTab === "agentes" ? "Soluciones agénticas para construcción" : "Consultoría técnica para tu proyecto"}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-5">
            {activeTab === "agentes"
              ? "En Project Control AI somos pioneros en soluciones agénticas para arquitectura, ingeniería, planeamiento, costos y control de calidad. Explora cada agente y su demostración."
              : "Asesoría especializada para resolver los retos técnicos de tu obra."}
          </p>

          {/* Selector de Pestañas de Servicios */}
          <div id="catalogo-servicios" className="scroll-mt-24 flex flex-wrap gap-2 border-b border-white/10 pb-4">
            <button
              type="button"
              aria-pressed={activeTab === "agentes"}
              onClick={() => changeTab("agentes")}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${activeTab === "agentes"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.45)] ring-2 ring-emerald-400/50"
                  : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-emerald-500/20"
                }`}
            >
              <span className="material-symbols-outlined text-base">smart_toy</span>
              <span>Soluciones Agénticas</span>
            </button>

            <button
              type="button"
              aria-pressed={activeTab === "consultoria"}
              onClick={() => changeTab("consultoria")}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${activeTab === "consultoria"
                  ? "bg-amber-500 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.45)] ring-2 ring-amber-400/50"
                  : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-amber-500/20"
                }`}
            >
              <span className="material-symbols-outlined text-base">engineering</span>
              <span>Consultoría y Asesoría Técnica</span>
            </button>
          </div>
        </header>

        {/* 1. CONTENIDO: SOLUCIONES AGÉNTICAS */}
        {activeTab === "agentes" && (
          <div id="agentes" className="space-y-10 animate-in fade-in duration-300 scroll-mt-24">
            {/* Catálogo Maestro de Agentes (Comprimible, Desplegable y con Buscador) */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Explora los agentes de IA
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                    Abre una ficha para conocer qué recibe, qué entrega y cómo se usa.
                  </p>
                  <a href="https://chat.whatsapp.com/Jq7YgCGPFpoKyEaQ2mwRx7" target="_blank" rel="noopener noreferrer" className="inline-flex mt-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200 underline underline-offset-4">
                    Únete al grupo de WhatsApp para ver nuevos casos →
                  </a>
                </div>

                {/* Acciones de Expandir / Colapsar todos */}
                <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={expandAll}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                    title="Expandir todos los agentes"
                  >
                    <span className="material-symbols-outlined text-base">unfold_more</span>
                    <span>Expandir todos</span>
                  </button>

                  <button
                    type="button"
                    onClick={collapseAll}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                    title="Colapsar todos los agentes"
                  >
                    <span className="material-symbols-outlined text-base">unfold_less</span>
                    <span>Colapsar todos</span>
                  </button>
                </div>
              </div>

              {/* Barra de Búsqueda y Filtros Rápidos */}
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2">
                {/* Input de Búsqueda */}
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por especialidad, formato o entregable"
                    aria-label="Buscar agentes"
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-sm"
                      aria-label="Limpiar búsqueda"
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  )}
                </div>

                {/* Filtros de Estado */}
                <div className="grid grid-cols-3 gap-1.5 md:gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setStatusFilter("todos")}
                    className={`min-w-0 px-2 md:px-3.5 py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase leading-tight tracking-wide transition-all ${statusFilter === "todos"
                        ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(245,168,0,0.3)] font-black"
                        : "bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                  >
                    Todos ({agentesEspecializados.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatusFilter("disponibles")}
                    className={`min-w-0 px-2 md:px-3.5 py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase leading-tight tracking-wide transition-all flex items-center justify-center gap-1 ${statusFilter === "disponibles"
                        ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] font-black"
                        : "bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    Disponibles ({countDisponibles})
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatusFilter("proximos")}
                    className={`min-w-0 px-2 md:px-3.5 py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase leading-tight tracking-wide transition-all flex items-center justify-center gap-1 ${statusFilter === "proximos"
                        ? "bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)] font-black"
                        : "bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Próximamente ({countProximos})
                  </button>
                </div>
              </div>

              {/* Lista Desplegable / Acordeón de Agentes */}
              {filteredAgentes.length === 0 ? (
                <div className="p-10 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
                  <span className="material-symbols-outlined text-slate-500 text-4xl">search_off</span>
                  <h4 className="text-lg font-bold text-white">No se encontraron agentes</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    No encontramos ningún agente que coincida con &quot;{searchQuery}&quot;. ¿Necesitas un agente a la medida de tu proyecto?
                  </p>
                  <Link
                    href="https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20estoy%20buscando%20un%20agente%20especializado%20para%20mi%20proyecto."
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Solicitar Agente Personalizado
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAgentes.map((agente) => {
                    const isExpanded = !!expandedAgents[agente.id];

                    return (
                      <div
                        key={agente.id}
                        className={`rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm overflow-hidden ${isExpanded
                            ? agente.estado === "Publicado en YouTube"
                              ? "border-cyan-500/60 bg-slate-900/90 shadow-[0_0_30px_rgba(245,168,0,0.18)] ring-1 ring-cyan-500/30"
                              : "border-slate-700 bg-slate-900/90 shadow-lg"
                            : agente.estado === "Publicado en YouTube"
                              ? "border-cyan-500/40 bg-slate-900/60 hover:border-cyan-400/70 hover:bg-slate-900/80"
                              : "border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60"
                          }`}
                      >
                        {/* Cabecera Comprimible (Siempre Visible y Clickeable) */}
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-controls={`${agente.id}-detalles`}
                          onClick={() => toggleAgent(agente.id)}
                          className="w-full text-left p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-2 cursor-pointer select-none transition-colors group focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
                        >
                          {/* Izquierda: Ícono, Título, Tag y Especialidad */}
                          <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${agente.estado === "Publicado en YouTube"
                                ? "bg-cyan-950/80 border-cyan-500/50 text-cyan-300"
                                : "bg-slate-800 border-slate-700 text-slate-300"
                              }`}>
                              <span className="material-symbols-outlined text-xl">{agente.icono}</span>
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                <h3 className={`text-sm sm:text-base font-bold leading-tight transition-colors ${agente.estado === "Publicado en YouTube"
                                    ? "text-white group-hover:text-cyan-300"
                                    : "text-slate-200 group-hover:text-white"
                                  }`}>
                                  {agente.nombre}
                                </h3>
                                <span className="hidden sm:inline text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                  {agente.tag}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 truncate">{agente.especialidad}</p>
                            </div>
                          </div>

                          {/* Derecha: Badges, Inversión, Tiempo y Botón Expandir */}
                          <div className="flex items-center justify-between md:justify-end gap-2 shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-slate-800/80">
                            <div className="flex items-center gap-2 flex-wrap">
                              {agente.estado === "Publicado en YouTube" ? (
                                <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-red-950 text-red-300 border border-red-500/40 flex items-center gap-1 shadow-[0_0_10px_rgba(239,68,68,0.25)]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                  Disponible
                                </span>
                              ) : (
                                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded bg-slate-800 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                  Próximamente
                                </span>
                              )}

                              <span className="hidden sm:flex text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-800/40 items-center gap-1">
                                ⚡ {agente.tiempoEntrega}
                              </span>

                              {agente.precioSoles && (
                                <span className="text-[10px] font-mono font-black text-emerald-300 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-500/40">
                                  {agente.precioSoles} / {agente.precioDolares}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800 text-xs font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">
                              <span className="hidden sm:inline text-[11px] uppercase tracking-wider">
                                {isExpanded ? "Ocultar" : "Detalles"}
                              </span>
                              <span className={`material-symbols-outlined text-xl transition-transform duration-300 ${isExpanded ? "rotate-180 text-cyan-400" : "text-slate-400"
                                }`}>
                                expand_more
                              </span>
                            </div>
                          </div>
                        </button>

                        {/* Contenido Expandible (Estructura Mínima Información - Estilo Tarjeta Destacada) */}
                        {isExpanded && (
                          <div id={`${agente.id}-detalles`} className="p-4 sm:p-5 border-t border-slate-800/80 bg-gradient-to-br from-[#171a1e]/80 via-slate-900/60 to-[#14161a] animate-in fade-in duration-200">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                              {/* Izquierda: Descripción concisa y Caja de Inversión */}
                              <div className="flex-1 space-y-3 max-w-2xl">
                                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                                  {agente.solucion}
                                </p>
                                <p className="text-slate-400 text-xs leading-relaxed"><strong className="text-white">Entregable:</strong> {agente.entregable}</p>

                                {/* Enlace para canjear clave de descarga */}
                                <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                                  <span className="material-symbols-outlined text-emerald-400 text-sm">key</span>
                                  <span>¿Ya adquiriste tu clave de acceso?</span>
                                  <Link href="/agentes/descargar" className="text-emerald-300 font-bold hover:underline">
                                    Canjear y Descargar aquí →
                                  </Link>
                                </div>
                              </div>

                              {/* Derecha: Botones de Acción (PayPal, Yape, WhatsApp, YouTube, TikTok) */}
                              <div className="flex flex-col gap-2.5 w-full lg:w-auto shrink-0 min-w-[280px]">
                                {agente.precioSoles && (
                                  <div className="grid grid-cols-2 gap-2">
                                    <a
                                      href={agente.paypalUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02]"
                                    >
                                      <span className="material-symbols-outlined text-sm">payment</span>
                                      PayPal ($25)
                                    </a>
                                    <a
                                      href={`https://wa.me/51993147501?text=${encodeURIComponent(agente.whatsappMsg || `Hola Ing. Aurelio, deseo adquirir el ${agente.nombre} por Yape / Plin (S/ 70). Adjunto mi comprobante de pago al 51 993147501.`)}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02]"
                                    >
                                      <span className="material-symbols-outlined text-sm">phone_iphone</span>
                                      Yape / Plin (S/ 70)
                                    </a>
                                  </div>
                                )}

                                <a
                                  href={`https://wa.me/51993147501?text=${encodeURIComponent(agente.whatsappMsg)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`px-4 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] ${agente.estado === "Publicado en YouTube"
                                      ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                                    }`}
                                >
                                  <span className="material-symbols-outlined text-base">chat</span>
                                  {agente.estado === "Publicado en YouTube" ? "Quiero el Agente (+51 993 147 501)" : "Lista de Espera (WhatsApp)"}
                                </a>

                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedVideo(agente)}
                                    className="flex-1 px-3 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 shadow-md hover:scale-[1.02]"
                                    title="YouTube: Guía práctica para el manejo del agente"
                                  >
                                    <span className="material-symbols-outlined text-sm">play_circle</span>
                                    YouTube ({agente.duracionVideo})
                                  </button>

                                  {agente.tiktokUrl ? (
                                    <Link
                                      href={agente.tiktokUrl}
                                      target="_blank"
                                      className="flex-1 px-3 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-[11px] uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 border border-pink-500/40 shadow-md hover:scale-[1.02]"
                                      title="TikTok: Alcance y resultado obtenido"
                                    >
                                      <svg className="w-3.5 h-3.5 fill-current text-cyan-400" viewBox="0 0 24 24">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                                      </svg>
                                      TikTok (Alcance)
                                    </Link>
                                  ) : (
                                    <span className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900/90 text-slate-500 font-bold text-[11px] uppercase tracking-wider text-center flex items-center justify-center border border-slate-800">
                                      TikTok Pronto
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Masterclass Gratuita Oficial: De la Nube al Entorno Local con Agentes de IA */}
            <section id="masterclass-agentes-ia" className="p-6 sm:p-8 md:p-10 rounded-[32px] bg-slate-900/80 border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      MASTERCLASS COMPLETA · 100% GRATUITA
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      58 MINUTOS · ALTA DEFINICIÓN
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                    De la Nube al Entorno Local: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Agentes de IA para Ingenieros</span>
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base max-w-4xl leading-relaxed">
                    Dejemos atrás el software rígido y las limitaciones del chat en la nube. Aprende cómo configurar y poner a operar herramientas agénticas como <strong className="text-white">Codex</strong>, <strong className="text-white">Antigravity</strong> y <strong className="text-white">Claude Code</strong> navegando directamente por tu computador, y descubre las enormes bondades de trabajar con <strong className="text-cyan-300">IAs de frontera (Sol, Opus, Sonnet, Argon / Gemini)</strong> frente a las IAs gratuitas convencionales.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Link
                    href="https://youtu.be/8eyHEGSdTuY"
                    target="_blank"
                    className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.35)]"
                  >
                    <span className="material-symbols-outlined text-base">smart_display</span>
                    Ver en YouTube
                  </Link>
                  <Link
                    href="https://www.youtube.com/@aurelioalfonsosolorzanorios"
                    target="_blank"
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-slate-700"
                  >
                    <span className="material-symbols-outlined text-base">subscriptions</span>
                    Canal Oficial
                  </Link>
                </div>
              </div>

              {/* Grid: Reproductor de Video + 3 Pilares Técnicos */}
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Reproductor de Video */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                    <iframe
                      src="https://www.youtube.com/embed/8eyHEGSdTuY?modestbranding=1&rel=0"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Agentes de IA: Presupuestos y Planificación de Obra con IA | Sesión 1: Fundamentos y Entorno Local"
                    />
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-cyan-400 text-2xl">verified</span>
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-tight">Sesión Práctica en Vivo</h4>
                        <p className="text-xs text-slate-400">Ing. Aurelio Solórzano Ríos · Project Control AI</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      Entorno Local Activo
                    </span>
                  </div>
                </div>

                {/* 3 Pilares del Aprendizaje */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <span className="material-symbols-outlined text-lg">desktop_windows</span>
                      <h4 className="text-xs font-black uppercase tracking-wider">1. De la Nube al Entorno Local</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      El chat en la nube pierde el contexto al superar 10-20 archivos técnicos. En tu máquina, los agentes leen expedientes completos, planos y bases de licitación sin truncar información ni olvidar parámetros.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/40 transition-colors space-y-2">
                    <div className="flex items-center gap-2 text-purple-400">
                      <span className="material-symbols-outlined text-lg">terminal</span>
                      <h4 className="text-xs font-black uppercase tracking-wider">2. Codex, Antigravity y Claude Code</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Herramientas agénticas que navegan por tus carpetas, crean Workspaces de obra, generan WBS/EDT bajo el PMBOK y construyen libros Excel con fórmulas vivas directamente en tu disco.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="material-symbols-outlined text-lg">bolt</span>
                      <h4 className="text-xs font-black uppercase tracking-wider">3. IAs de Frontera (Sol, Opus, Argon) vs. IAs Gratuitas</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Aprende por qué modelos de frontera como <strong className="text-white">Sol</strong>, <strong className="text-white">Opus</strong>, <strong className="text-white">Sonnet</strong> y <strong className="text-white">Argon / Gemini</strong> garantizan precisión matemática, lógica de costos y consistencia técnica, superando las alucinaciones de las IAs free.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20vi%20la%20Masterclass%20Gratuita%20de%20Agentes%20de%20IA%20y%20deseo%20m%C3%A1s%20informaci%C3%B3n"
                      target="_blank"
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 text-cyan-200 border border-cyan-500/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center"
                    >
                      <span className="material-symbols-outlined text-base">chat</span>
                      Consultar al WhatsApp por el Programa Completo
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. CONTENIDO: CONSULTORÍA Y ASESORÍA TÉCNICA */}
        {activeTab === "consultoria" && (
          <div id="consultoria" className="space-y-16 animate-in fade-in duration-300">
            {/* Modalidades de Trabajo */}
            <section>
              <div className="mb-8">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  Modalidades Flexibles
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  ¿Cómo Trabajamos Juntos?
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Modalidad 1: Gratuita (15 min gratis) */}
                <article id="consultoria-gratis" className="scroll-mt-36 rounded-3xl border border-slate-700 bg-slate-900 p-7 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Orientación inicial</span>
                    <h4 className="text-2xl font-bold mt-2 text-white">Reunión inicial gratuita</h4>
                    <p className="text-3xl sm:text-4xl font-bold mt-4 text-cyan-300">
                      S/ 0 <span className="text-lg font-normal text-slate-400">/ $0 USD</span>
                      <span className="text-xs font-normal text-slate-300 block mt-1">/ {consultoria.minutosGratis} minutos</span>
                    </p>
                    <ul className="mt-6 space-y-2.5 text-slate-300 text-xs sm:text-sm list-disc pl-5">
                      <li>Nos cuentas el reto y el contexto de tu proyecto.</li>
                      <li>Evaluamos cómo podemos ayudarte técnica y operativamente.</li>
                      <li>Definimos la modalidad más adecuada: consultoría o servicio por proyecto.</li>
                    </ul>
                  </div>
                  <a
                    href={contactoConsultoria("gratuita")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 block text-center rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-950 px-5 py-3.5 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Coordinar reunión gratuita (15 min)
                  </a>
                </article>

                {/* Modalidad 2: Por Hora */}
                <article id="consultoria-hora" className="scroll-mt-36 rounded-3xl border-2 border-cyan-500/60 bg-cyan-950/30 p-7 sm:p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(245,168,0,0.15)]">
                  <div>
                    <span className="inline-block bg-cyan-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
                      Sesión técnica 1 a 1
                    </span>
                    <h4 className="text-2xl font-bold text-white">Consultoría por hora</h4>
                    <p className="text-3xl sm:text-4xl font-bold mt-4 text-cyan-300">
                      S/ 100 <span className="text-lg font-normal text-slate-300">o</span> $35 USD
                      <span className="text-xs font-normal text-slate-300 block mt-1">/ hora de asesoría directa</span>
                    </p>
                    <ul className="mt-6 space-y-2.5 text-slate-300 text-xs sm:text-sm list-disc pl-5">
                      <li>Sesión por videollamada para revisar tu caso puntual.</li>
                      <li>Destrabe de cronogramas, APUs, reclamos o automatizaciones con IA.</li>
                      <li>Se comparte pantalla y se trabaja sobre tus propios archivos.</li>
                    </ul>
                  </div>
                  <a
                    href={contactoConsultoria("hora-soles")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 block text-center rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 px-5 py-3.5 font-black text-xs uppercase tracking-wider transition-colors shadow-lg"
                  >
                    Agendar consultoría por hora
                  </a>
                </article>

                {/* Modalidad 3: Por Proyecto (Trabajos Puntuales) */}
                <article id="consultoria-proyecto" className="scroll-mt-36 rounded-3xl border border-indigo-500/40 bg-indigo-950/20 p-7 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">Entregables a medida</span>
                    <h4 className="text-2xl font-bold mt-2 text-white">Servicio por proyecto (Trabajos puntuales)</h4>
                    <p className="text-3xl sm:text-4xl font-bold mt-4 text-indigo-300">
                      A cotizar <span className="text-xs font-normal text-slate-300 block mt-1">según alcance del expediente</span>
                    </p>
                    <ul className="mt-6 space-y-2.5 text-slate-300 text-xs sm:text-sm list-disc pl-5">
                      <li>Elaboración de cronogramas maestros (Primavera P6 o MS Project).</li>
                      <li>Elaboración integral de presupuestos, metrados y APUs.</li>
                      <li>Auditoría contractual, peritaje de plazos y reclamos.</li>
                    </ul>
                  </div>
                  <a
                    href={contactoConsultoria("cotizacion")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 block text-center rounded-xl border border-indigo-400 text-indigo-300 hover:bg-indigo-950 px-5 py-3.5 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Cotizar servicio técnico
                  </a>
                </article>
              </div>
            </section>

            {/* Áreas de Consultoría */}
            <section className="border-t border-slate-800 pt-12">
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-8">
                ¿Qué podemos resolver juntos?
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {temasConsultoria.map(([titulo, descripcion], i) => (
                  <article key={titulo} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <p className="font-mono text-cyan-400 text-xs font-bold mb-2">0{i + 1}</p>
                    <h4 className="text-lg font-bold text-white mb-2">{titulo}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{descripcion}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Modal de Video Demostrativo */}
        {selectedVideo && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-slate-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-500 text-2xl">play_circle</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{selectedVideo.nombre}</h3>
                    <p className="text-xs text-slate-300">
                      📺 <strong>Guía práctica para el manejo del agente</strong> · {selectedVideo.duracionVideo}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Cerrar video"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                  title={selectedVideo.nombre}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {selectedVideo.precioSoles && (
                <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950/80 via-slate-950 to-cyan-950/80 border-t border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-0.5">
                      Adquiere este Agente de IA
                    </span>
                    <p className="text-base font-black text-white">
                      Inversión: <span className="text-emerald-300 font-mono">{selectedVideo.precioSoles} PEN</span> ó <span className="text-cyan-300 font-mono">{selectedVideo.precioDolares}</span>
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      📱 <strong>Perú:</strong> Yape / Plin al <strong className="text-white">{selectedVideo.yape}</strong> · 💳 <strong>Extranjero:</strong> PayPal ({selectedVideo.precioDolares})
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                    <a
                      href={selectedVideo.paypalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span className="material-symbols-outlined text-sm">payment</span>
                      PayPal ($25)
                    </a>
                    <a
                      href={`https://wa.me/51993147501?text=${encodeURIComponent(selectedVideo.whatsappMsg || `Hola Ing. Aurelio, deseo adquirir el ${selectedVideo.nombre} por Yape / Plin (S/ 70). Adjunto mi comprobante de pago.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span className="material-symbols-outlined text-sm">phone_iphone</span>
                      Yape / Plin (S/ 70)
                    </a>
                  </div>
                </div>
              )}

              <div className="p-4 sm:p-6 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  <span className="text-emerald-400 font-bold block mb-0.5">⚡ Entregable en segundos:</span>
                  {selectedVideo.entregable}
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  {selectedVideo.tiktokUrl && (
                    <Link
                      href={selectedVideo.tiktokUrl}
                      target="_blank"
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border border-pink-500/40"
                    >
                      <svg className="w-3.5 h-3.5 fill-current text-cyan-400" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                      </svg>
                      Ver Alcance en TikTok
                    </Link>
                  )}
                  <Link
                    href={`https://wa.me/51993147501?text=${encodeURIComponent(selectedVideo.whatsappMsg)}`}
                    target="_blank"
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Quiero el Agente
                  </Link>
                  <Link
                    href="https://www.youtube.com/@aurelioalfonsosolorzanorios"
                    target="_blank"
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm text-red-500">subscriptions</span>
                    Canal de YouTube
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ServiciosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#14161a]" />}>
      <ServiciosContent />
    </Suspense>
  );
}
