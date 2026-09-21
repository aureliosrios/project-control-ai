---
name: pcai-crear-curso
description: Crea un curso grabado o en vivo en el catálogo de Project Control AI y comprueba su integración con formación e inscripción.
---

# Crear un curso

Trabaja desde la raíz de este repositorio. Lee `docs/GUIA_MANTENIMIENTO.md` y `data/cursos.json`.

Determina modalidad, nombre, ruta A/B/C si es grabado, precio y moneda, contenido, imagen/temario, enlaces reales y estado de inscripción. Para cursos en vivo pide también inicio, fin, horario con zona horaria, sesiones y nombre de registro. Solicita únicamente datos comerciales que falten; no inventes precios, fechas ni destinos de pago. Si faltan datos esenciales, prepara una propuesta fuera del catálogo publicado y explica qué falta.

Añade el objeto a `asincronicos` o `sincronicos` en `data/cursos.json`, siguiendo un registro de esa modalidad. Usa un ID nuevo y estable. `registro` es la clave textual enviada a la integración de inscripción; comprueba su compatibilidad antes de escogerla. Conserva cursos anteriores salvo indicación del usuario. Solo usa `cerrado: false` para una convocatoria autorizada, con `destacado` informado.

Formación, contadores, listado de cursos disponibles e inscripción se derivan del catálogo. Revisa recomendaciones editoriales en `app/formacion/page.js`, campañas en `app/mobile/page.js` y PDF si el usuario quiere incluir el curso allí: no se generan automáticamente. Matrículas, clases privadas, certificados y productos de Hotmart requieren su propia configuración; añadir una tarjeta no los crea.

Usa imágenes locales en `public/cursos/`, conserva los originales y aprovecha `next/image`, `sizes` y compresión moderada. Comprueba el texto pequeño de las portadas.

Termina con el flujo de `.agents/skills/pcai-revisar-web/SKILL.md`. Informa los cambios, las validaciones y cualquier integración pendiente. No publiques ni alteres servicios externos sin autorización para esa operación.
