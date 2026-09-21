# Instrucciones de mantenimiento

La aplicación actual está en `app/` y utiliza Next.js 15.1.9. Sigue `AGENTS.md` y `docs/GUIA_MANTENIMIENTO.md`.

El catálogo comercial está en `data/cursos.json`; la oferta de consultoría está en `lib/oferta.js`. Los asistentes reutilizables están en `.agents/skills/`.

El documento anterior completo se conserva en `docs/legacy/CLAUDE_HTML.md` como referencia histórica, no como instrucciones del sistema activo.

No uses los archivos de `old_site/` como fuentes de la web actual. Las instrucciones anteriores de HTML, `assets/js/config.js` y generación de páginas estáticas describían esa versión histórica. Las matrículas y certificados tienen integraciones independientes que no se actualizan al cambiar el catálogo comercial.
