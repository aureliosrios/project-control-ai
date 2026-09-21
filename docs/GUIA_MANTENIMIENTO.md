# Mantenimiento de Project Control AI

La web activa es Next.js 15.1.9 (App Router). Ejecutar los comandos desde la raíz del repositorio. `old_site/` conserva el sitio anterior; sus HTML y scripts no alimentan las páginas actuales.

## Cursos: fuente de datos

Editar `data/cursos.json`. Los listados `asincronicos` y `sincronicos` alimentan `/formacion`; los sincrónicos también alimentan el selector de `/inscripcion`. Los conteos y el listado de cursos disponibles por ruta se calculan desde esos datos.

- Grabados: `id`, `ruta` (A/B/C), `imagen`, `nombre`, `precio` (por ejemplo `$15.99 USD`), `tag`, `link` de compra y `brochure`.
- En vivo: `id`, `nombre`, `registro`, `precio` USD, `precioSoles`, `tag`, `desc`, `casoReal`, `inicio`, `fin`, `horario`, `sesiones`, `link` (`/inscripcion`), `hotmart`, `paypal`, `colorKey` (cyan/blue/orange), `cerrado`. `brochure` es opcional y `destacado` se requiere si la convocatoria está abierta.
- `registro` conserva el nombre usado por la integración histórica de inscripción. No cambiarlo al renombrar comercialmente un curso sin revisar el mapeo de matrículas.
- `cerrado: true` conserva el curso en el historial e impide seleccionarlo en el formulario. Reabrir únicamente una convocatoria confirmada.
- Fechas y horarios son textos editoriales: verificar el calendario, día de la semana, duración y zona horaria manualmente. Los importes USD y PEN son independientes.

Editar el JSON no modifica precios de Hotmart/PayPal, PDF, grabaciones, certificados ni bases de datos. Las recomendaciones editoriales de formación y las campañas de `/mobile` también requieren revisión si el cambio las afecta. Los enlaces de inscripción de formación incluyen el nombre de registro para preseleccionar el curso.

## Asistentes reutilizables

Disponibles en `.agents/skills/`, con rutas de selección en `AGENTS.md`:

- `pcai-crear-curso`: preparar e incorporar un curso con datos confirmados.
- `pcai-actualizar-curso`: actualizar precios, fechas, horarios o contenido sin perder referencias históricas.
- `pcai-revisar-web`: revisar coherencia, funcionamiento, accesibilidad y rendimiento después del cambio.

Ejemplos de solicitud:

- «Usa pcai-crear-curso para añadir un curso grabado de la ruta B. Estos son sus datos: ...»
- «Usa pcai-actualizar-curso: cambia S1 a este horario y estos precios: ...»
- «Usa pcai-revisar-web para revisar los cambios del catálogo antes de publicar».

Son instrucciones para el asistente que trabaja en el proyecto, no procesos permanentes ni un sistema que invoca IA al guardar un archivo. El control automático del catálogo sí se ejecuta durante el build.

## Consultoría

`lib/oferta.js` concentra tarifa, duración gratuita y WhatsApp: S/ 100 por hora, reunión inicial gratuita de 15 minutos. Inicio y consultoría consumen estos datos. Los botones solo abren una solicitud de coordinación: no confirman reservas ni realizan cobros.

## Imágenes

Conservar originales en `public/cursos/` y `public/images/`. Las portadas de formación usan `next/image`, `sizes`, carga diferida y calidad 70 para servir versiones adaptadas. Revisar legibilidad antes de bajar más la calidad, pues contienen texto. No recomprimir PDF, firmas o QR como si fueran fotografías.

## Comprobaciones

```sh
npm run check:cursos
npm run test:cursos
npm run lint
npm run build
npm run start -- --port 3000
```

El validador comprueba estructura, IDs, formatos y archivos locales; no comprueba calendarios ni destinos de pago remotos. El build vuelve a ejecutarlo. Probar filtros, pestañas, enlaces y selección de inscripción en escritorio y móvil. No enviar formularios ni pagos reales como parte de una comprobación visual.

Publicar requiere un paso separado según el flujo de Git/Vercel. No asumir que cambios locales ya están desplegados. Consultar `docs/ANALISIS_MEJORAS.md` para hallazgos pendientes fuera del alcance de esta entrega.
