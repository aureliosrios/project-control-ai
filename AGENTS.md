<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Proyecto actual y asistentes de mantenimiento

La aplicación activa usa Next.js 15.1.9 y App Router (`app/`). `old_site/` y `docs/legacy/` son referencias históricas, no fuentes de la web actual. Si la documentación local de Next no existe, consulta la documentación oficial de la versión instalada.

Los datos comerciales de cursos están en `data/cursos.json`; los consumen formación e inscripción. Las condiciones de consultoría están en `lib/oferta.js`. Lee `docs/GUIA_MANTENIMIENTO.md` antes de cambiar estos datos.

Aplica el asistente correspondiente para solicitudes de cursos:

- Crear un curso: `.agents/skills/pcai-crear-curso/SKILL.md`.
- Cambiar contenido, precios, fechas o horarios: `.agents/skills/pcai-actualizar-curso/SKILL.md`.
- Revisar calidad después de crear o modificar un curso: `.agents/skills/pcai-revisar-web/SKILL.md`.

Los asistentes se ejecutan durante una solicitud de trabajo; no son procesos autónomos ni publican por sí solos. Tras cambios de cursos, ejecuta `npm run check:cursos`, `npm run test:cursos`, `npm run lint` y `npm run build`. El build incluye la validación del catálogo. Una edición comercial no autoriza cambios de matrículas, certificados, pagos externos ni despliegues.
