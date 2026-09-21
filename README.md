# Project Control AI

Web de capacitación y consultoría en construcción e inteligencia artificial. Aplicación Next.js 15.1.9, React 19 y Tailwind CSS.

- `app/`: rutas activas y componentes compartidos en `app/components/`.
- `data/cursos.json`: catálogo comercial utilizado por formación e inscripción.
- `lib/oferta.js`: condiciones y contacto de consultoría.
- `lib/supabase.js`: cliente del servicio de alumnos y certificados.
- `public/`: imágenes, brochures y materiales.
- `.agents/skills/`: asistentes reutilizables para crear, actualizar y revisar cursos.
- `scripts/`: validación del catálogo y sus pruebas.
- `old_site/`: archivo histórico, sin uso en las rutas actuales.

```sh
npm install
npm run dev
```

Antes de publicar: `npm run check:cursos`, `npm run test:cursos`, `npm run lint` y `npm run build`.

Consulta [Mantenimiento](docs/GUIA_MANTENIMIENTO.md) y [Análisis de mejoras](docs/ANALISIS_MEJORAS.md). Los cambios locales no se publican automáticamente hasta ejecutar el flujo de despliegue del proyecto.

WhatsApp: +51 993 147 501.
