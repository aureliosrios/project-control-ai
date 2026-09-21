---
name: pcai-revisar-web
description: Revisa consistencia comercial, enlaces, imágenes y funcionamiento de Project Control AI después de crear o actualizar cursos, o ante una solicitud de optimización de la web.
---

# Revisar la web

Lee el diff y limita las correcciones a la solicitud activa. Usa `docs/ANALISIS_MEJORAS.md` como contexto, no como autorización para rehacer todas las páginas.

Ejecuta `npm run check:cursos`, `npm run test:cursos`, `npm run lint` y `npm run build`. El validador verifica estructura, IDs, formatos de precios y recursos locales; no verifica calendarios, pagos remotos, disponibilidad ni accesos privados. Revisa esos aspectos de forma explícita según los campos cambiados.

En una vista local verifica `/formacion`: filtros A/B/C, conteos, pestañas de grabados/en vivo, imágenes legibles y enlaces de inscripción con el curso seleccionado. Verifica `/inscripcion` sin enviar formularios reales. Inscripciones cerradas deben conservar su estado. Si cambian portada o consultoría, comprueba navegación y CTA de WhatsApp sin enviar mensajes.

Revisa móvil (360–390 px) y escritorio: sin desplazamiento horizontal, botones accesibles por teclado, contraste y jerarquía legible. Mide bytes transferidos y tamaño de imágenes si se cambia su compresión; no declares una mejora de velocidad solo porque compila. No elimines originales, scripts operativos o material académico sin revisar referencias y propósito.

Tras crear o actualizar cursos, corrige fallos reproducibles dentro del alcance y entrega resultados concretos. Separa bloqueos de advertencias previas y limita las afirmaciones a lo comprobado. Estos controles se ejecutan al trabajar con el asistente; no hay un agente permanente observando archivos.
