# Actualizar fechas de cursos

Esta guía sustituye las instrucciones del sitio HTML anterior.

1. Localizar el curso por ID en `data/cursos.json`, sección `sincronicos`.
2. Modificar `inicio`, `fin`, `horario` y `sesiones` según datos confirmados. Comprobar días de la semana, duración y hora de Perú. Conservar `registro` y el historial de alumnos.
3. Revisar campañas en `app/mobile/page.js`, recomendaciones de formación y el PDF correspondiente si muestran las fechas anteriores. No confundir una edición pasada con la convocatoria que se modifica.
4. Ejecutar el asistente `.agents/skills/pcai-revisar-web/SKILL.md` y los controles descritos en `GUIA_MANTENIMIENTO.md`.

El catálogo y el selector de inscripción consumen el mismo JSON. `old_site/cursos.json` y los HTML históricos no son fuentes de la aplicación activa. Los PDF, matrículas y certificados no se actualizan automáticamente al editar el catálogo.
