# Análisis y mejoras de Project Control AI

Revisión del repositorio y aplicación local: 21 de septiembre de 2026. Alcance: rediseño de inicio y consultoría B2B; optimización técnica de formación y componentes compartidos; asistentes de mantenimiento. No se publicó en producción ni se hicieron inscripciones, pagos o cambios de alumnos.

## Diagnóstico general

| Área | Hallazgo | Acción / prioridad restante |
|---|---|---|
| Inicio `/` | Mensaje «Ingeniería aumentada», panel ficticio de indicadores y promesas de 70%/0%; capacitación relegada al final. | Rediseñado para presentar capacitación y consultoría como las dos ofertas principales. Se retiraron cifras sin evidencia en el proyecto. |
| Consultoría `/consultoria` | Servicios premium B2B sin precio, alcance de reunión ni pasos claros. | Dos opciones: reunión gratuita de 15 minutos y consultoría a S/ 100 por hora. Temas concretos, alcance, preguntas frecuentes y solicitudes por WhatsApp. |
| Formación `/formacion` | Ocho JPEG sumaban 20,5 MB, renderizados con `img`; fechas y nombres mezclados con JSX; conteos escritos a mano. | `next/image`, carga diferida, tamaño adaptable y calidad 70. Catálogo compartido, conteos derivados y corrección del desbordamiento de pestañas/precios en móvil. Se conserva el diseño general. |
| Inscripción `/inscripcion` | Selector duplicado, fecha manual y curso cerrado aún seleccionable. El envío usa `no-cors` y muestra éxito sin verificar que Sheets guardó el registro. | Selector conectado al catálogo y curso preseleccionado desde formación; convocatorias cerradas deshabilitadas. Pendiente prioritario: respuesta verificable mediante un endpoint de servidor y manejo de errores del registro. |
| Recursos `/recursos` | Imágenes `fill` sin `sizes`. | Tamaños adaptables para evitar solicitar imágenes mayores que la tarjeta. Pendiente editorial: revisar correspondencia entre temarios y las convocatorias vigentes. |
| Portal `/portal` y grabaciones `/clases-grabadas` | Consultas a Supabase en cliente; acceso por DNI/localStorage y normalización de nombres en varias páginas. | Se preservó el comportamiento. Corregida únicamente una cadena JSX que impedía pasar lint. Revisar autenticación y políticas RLS con configuración real; el código cliente no permite concluir qué acceso está autorizado en la base. |
| Certificados `/verificar`, `/qc-admin`, `/admin/qc` | PDF y QR se importan al cargar la página; lógica de certificados duplicada. Build reporta aproximadamente 352–360 KB de JS inicial por ruta. | Optimización posterior recomendada: carga diferida de bibliotecas al generar el PDF y función compartida. Requiere casos de prueba de certificados sin consumir descargas reales. No se alteró la emisión. |
| Landing `/mobile` | Contenido comercial separado, con textos y campañas propios. | Se conserva por el alcance pedido. Conectar futuras campañas al catálogo y revisar sus fechas al actualizar cursos. |
| Navegación y pie | Marca «Industrial Systems», menú sin nombre accesible, enlaces de privacidad/términos con `#`. | Marca alineada a capacitación y consultoría; menú etiquetado, foco visible y respeto a movimiento reducido. Pendiente: contenido real para privacidad y términos; no se inventaron políticas. |
| Documentación y scripts | Guías apuntaban a HTML y fuentes que pertenecen a `old_site/`. Varios scripts solo buscaban IDs de videos de agosto. | Guías corregidas, instrucciones históricas archivadas y nueve scripts obsoletos eliminados tras revisar contenido y referencias. |

## Qué cambia para el usuario

En inicio puede elegir inmediatamente entre aprender con un curso y resolver una necesidad con consultoría. La página de consultoría explica qué se conversa gratis, qué trabajo corresponde a la sesión pagada y cómo coordinar. El precio se muestra en soles y no se promete resolver cualquier caso en una hora.

Los botones de consultoría abren WhatsApp con mensajes diferentes para la reunión gratuita y la consultoría. No representan una reserva confirmada. Se mantuvo el número +51 993 147 501.

## Rendimiento medido

Prueba local contra el optimizador real de Next.js: las ocho portadas, solicitadas a 640 px de ancho, calidad 70 y `Accept: image/webp`.

| Medición | Resultado |
|---|---:|
| Suma de originales JPEG | 20.500.881 bytes |
| Suma de respuestas WebP | 509.664 bytes |
| Reducción de bytes de esas imágenes | 97,5% |
| Rango por portada optimizada | 47–75 KB |

Esto mide peso de imágenes para esa variante, no significa que toda la web sea 97,5% más rápida. El navegador elige otras variantes según pantalla y densidad. Los originales permanecen intactos; no se redujo destructivamente su resolución. La primera transformación puede tener coste de CPU; producción depende de caché/CDN y conexión.

Inicio y consultoría siguen siendo páginas prerenderizadas sin añadir estado cliente propio ni bibliotecas de animación. Se retiraron grandes desenfoques animados y el panel decorativo de inicio. Para cuantificar LCP/INP/CLS en usuarios reales queda pendiente una medición en producción.

## Mantenimiento de cursos y asistentes

`data/cursos.json` contiene los 8 cursos grabados y 3 sincrónicos existentes. Formación e inscripción lo consumen. `registro` conserva nombres históricos de la integración aunque el nombre comercial difiera. Los cursos cerrados permanecen en el historial.

Se crearon tres asistentes en `.agents/skills/`:

1. `pcai-crear-curso`: reunir datos, crear la ficha y revisar su integración.
2. `pcai-actualizar-curso`: modificar contenido, fechas, horarios o importes conservando identidad e historial.
3. `pcai-revisar-web`: comprobar coherencia y funcionamiento después de cada cambio.

`AGENTS.md` dirige las solicitudes de cursos a estos asistentes. Son reutilizables durante el trabajo con el asistente, como se solicitó; no se ejecuta IA en segundo plano al guardar archivos. `npm run build` sí ejecuta automáticamente `check:cursos` y falla ante errores estructurales.

El validador comprueba IDs únicos, campos obligatorios, formatos de precio, rutas/colores admitidos, HTTPS y archivos locales. No valida comercialmente fechas, precios en pasarelas, reservas, pagos ni permisos de Supabase. Los horarios actuales son textos editoriales. Las instrucciones de asistentes exigen revisarlos, junto con PDF y campañas afectadas.

## Limpieza realizada

Retirados: `check_aug02_deploy.py`, `check_aug09_deploy.py`, `check_deploy.py`, `check_vercel_code.mjs`, `inspect_chunks.py`, `test_deploy_clean.py`, `test_fetch_formacion.py`, `test_html_direct.py` y `verify_vercel.py`.

Eran verificaciones puntuales de videos, cursos o cadenas de certificados de despliegues anteriores; no tenían referencias en los archivos activos revisados. Son recuperables desde Git. Se conservaron scripts de generación/revisión de PDF y el sitio histórico porque su posible utilidad es distinta. La antigua guía `CLAUDE.md` se conserva íntegra en `docs/legacy/CLAUDE_HTML.md`.

## Verificación y límites

- Compilación de producción: genera las 15 páginas estáticas.
- Lint: sin errores; quedan dos advertencias previas, fuente externa de iconos en layout e imagen de firma en verificar.
- Tres pruebas del catálogo: caso válido, IDs/archivos/enlaces inválidos y precios/rutas/estados inválidos.
- Tres habilidades: validación de estructura satisfactoria con `quick_validate.py`.
- Navegador local: navegación de portada a consultoría y formación; modalidad gratuita/por hora y mensajes de WhatsApp; filtro de ruta B con cuatro tarjetas; ficha de inscripción con curso seleccionado y cursos cerrados deshabilitados.
- No se enviaron formularios ni mensajes, no se probaron cobros ni se consumieron descargas de certificados.

## Siguientes mejoras recomendadas

1. Confirmar inscripciones con una respuesta de servidor verificable, antes de mostrar «Registro exitoso».
2. Sincronizar campañas de `/mobile` y brochures con el catálogo; confirmar el estado de S1, cuyo inicio publicado es 20/09/2026. No se cambió unilateralmente su convocatoria.
3. Optimizar bibliotecas de PDF y unificar generación de certificados con muestras de prueba.
4. Revisar acceso al portal y rutas administrativas con las políticas reales de Supabase, sin deducir seguridad por la interfaz.
5. Completar páginas reales de privacidad/términos y medir rendimiento en producción tras publicar.

Referencias técnicas: [Image de Next.js 15](https://nextjs.org/docs/15/app/api-reference/components/image) y [carga diferida de bibliotecas](https://nextjs.org/docs/15/app/guides/lazy-loading). La ruta local `node_modules/next/dist/docs/` indicada en AGENTS no existe en esta instalación.

Verificación visual final: portada y consultoría comprobadas a 390 px y 1440 px, sin desbordamiento horizontal. Formación comprobada a 360 px en ambas modalidades, también sin desbordamiento; filtros A/C muestran dos cursos y B cuatro. Portada C2 optimizada cargada y legible en móvil. Comparación automática del catálogo contra Git confirmó que los datos comerciales originales se conservaron (solo se añadió `registro` para integrar inscripción).
