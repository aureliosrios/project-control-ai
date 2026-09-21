---
name: pcai-actualizar-curso
description: Actualiza datos de cursos de Project Control AI, incluidos precios, fechas, horarios y enlaces, conservando las referencias de inscripciones existentes.
---

# Actualizar un curso

Lee `docs/GUIA_MANTENIMIENTO.md` y localiza el curso por ID en `data/cursos.json`. Si el nombre coincide con varias ediciones, aclara cuál se modifica. Trabaja sobre el cambio solicitado sin reemplazar el catálogo completo.

Modifica solo los campos autorizados. Conserva `id` y `registro` salvo migración expresamente solicitada: `registro` se envía a Google Sheets y puede estar relacionado con nombres históricos de Supabase. No cambies matrículas ni certificados al actualizar una convocatoria comercial.

Precios: USD y soles son importes independientes, no una conversión implícita. Pregunta por el segundo solo si debe cambiar. Un precio web no cambia Hotmart ni PayPal; señala cualquier diferencia que requiera una actualización externa.

Fechas: valida calendario real, día de la semana, inicio anterior al fin y coherencia entre frecuencia, horas y sesiones. Especifica hora de Perú cuando corresponda. No reabras automáticamente una edición ni alteres grabaciones históricas. Para una nueva edición, confirma si se conserva o se crea una ficha.

Busca el valor anterior y el ID en `app/`, `data/` y `docs/` con `rg`. Revisa campañas de `/mobile`, recomendaciones editoriales y brochures. Distingue historial válido de duplicados comerciales vigentes. No modifiques `old_site/` para actualizar la web activa. Los PDF no cambian al editar el JSON: si están afectados, actualízalos dentro del encargo o registra el pendiente.

Ejecuta `.agents/skills/pcai-revisar-web/SKILL.md`. Entrega una comparación breve antes/después y los pendientes externos, sin presentar como sincronizados pagos, PDF o bases de datos que no se modificaron.
