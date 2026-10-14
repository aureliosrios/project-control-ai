# 02. Generar EETT por partida

Lee primero `00_replica_minima/GUIA_PASO_A_PASO.md` y `00_replica_minima/herramientas/cerebro-digital-eett-skill/SKILL.md`. Usa las rutas y alcance de `configuracion_proyecto.json`. Las entradas son de solo lectura. No inventes datos ni ocultes su naturaleza sintética. Obtén el total de partidas de la WBS vigente. Registra faltantes y contradicciones; bloquea las partidas afectadas. Los originales prevalecen sobre los derivados.

Confirmar auditoría del cerebro conforme y vigente. Para cada WBS habilitada:

1. Construir paquete de evidencia: alcance, unidad/cantidad, estudios, memorias, planos reales, normas autorizadas, parámetros, interfaces, controles y medición. Leer cada fuente citada.
2. Redactar una EETT principal en `03_cerebro_digital_eett/07_especificaciones_tecnicas_generadas/` usando `assets/eett_item_template.md` y `references/authoring-and-review.md`.
3. Mantener nueve secciones: identificación; objeto/alcance; condiciones previas; recursos/requisitos; ejecución; calidad/aceptación; seguridad/ambiente/interfaces; medición; trazabilidad.
4. Usar tabla Control | Criterio de aceptación | Registro mínimo. Incluir solo equipos y materiales propios de la actividad; no inventar tolerancias o frecuencias.
5. Registrar fuente y localizador exacto de cada requisito. Conservar los detalles de hash en catálogo o nodo y una matriz compacta de referencias en la EETT. La norma de metrados sustenta medición.
6. Concentrar condiciones generales repetidas en `GENERALIDADES_EETT.md` y citar apartados aplicables. Mantener requisitos particulares en cada partida.
7. Guardar como BORRADOR_TRAZABLE; revisar cada lote. No declarar aprobación por terminar la redacción.

Entregar EETT, paquetes de evidencia y brechas reales. No generar Word todavía.

## Control para proyecto de gran envergadura

Antes de operar, leer `03_cerebro_digital_eett/09_gestion_proyecto/MANUAL_OPERACION_PROYECTO.md`. Revisar línea base, WBS controlada, evidencia exacta, requisitos, ITP, fuentes habilitadas, roles, cambios y entregas. Ejecutar `brain_ops.py audit` con perfil educativo o contractual explícito. La conformidad educativa permite consulta y revisión del caso; no sustituye la aprobación técnica ni autoriza el Word contractual. No completar requisitos normativos desconocidos con hipótesis educativas.


## Continuar este proyecto organizado

Leer `LEEME_INICIO.md`, `00_replica_minima/configuracion_proyecto.json` y `03_cerebro_digital_eett/06_gate_preparacion_eett/PLAN_GENERACION_EETT.md`. No ejecutar ingesta ni configurar de nuevo los controles existentes.

Hay una versión previa de EETT principales. Trabajar por capítulos, conservar una sola EETT principal por WBS y respaldar cada archivo antes de corregir. Los archivos cortos de enlace no son duplicados técnicos.

En el caso educativo se permite consultar, organizar y revisar borradores con la naturaleza sintética declarada. Para redactar un requisito técnico nuevo, recuperar evidencia exacta; si falta, registrar una brecha y detener esa parte. No confundir operación educativa con conformidad para generación técnica aprobada. No consolidar Word de emisión mientras el gate contractual esté bloqueado.
