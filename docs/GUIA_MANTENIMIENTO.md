# Guía de Mantenimiento | PCAI System v5.2

Esta guía contiene los pasos necesarios para mantener el sistema actualizado sin necesidad de re-programar la estructura core.

## 1. Actualizar Links de Pago (Hotmart)
Los links de inscripción se gestionan directamente en los componentes de página.

- **Ubicación**: `app/formacion/page.js`
- **Procedimiento**:
  1. Busca la sección de "Cursos Síncronos" o "Cursos Asíncronos".
  2. Localiza el array de objetos de cursos.
  3. Cambia el valor de la propiedad `href` o el link del botón por el nuevo link de Hotmart.
  4. Guarda el archivo y haz `git push`.

## 2. Cambiar Precios y Fechas
- **Cursos Síncronos**: Se editan en `app/formacion/page.js`.
- **Cursos Asíncronos**: Se editan en el mismo archivo o en sus componentes respectivos.
- **Formulario de Inscripción**: Si necesitas cambiar los cursos disponibles en el selector, edita `app/inscripcion/page.js`.

## 3. Gestión de Imágenes
- Todas las imágenes nuevas deben subirse a `public/images/`.
- Referéncialas en el código como `/images/tu-imagen.png` (Next.js resuelve la carpeta public automáticamente).

## 4. Despliegue (Deploy)
El sistema está configurado con **CI/CD** (Integración Continua).
- Cada vez que haces un `git push origin main`, Vercel detecta el cambio y actualiza el sitio en segundos.
- **Link de Producción**: [https://project-control-ai-one.vercel.app](https://project-control-ai-one.vercel.app)

## 5. Troubleshooting (Problemas Comunes)
- **El sitio no se actualiza**: Asegúrate de que el commit se envió correctamente y revisa el dashboard de Vercel.
- **Error de "Create Next App"**: Limpia la caché de tu navegador (`Ctrl + Shift + R`).
- **Links rotos**: Verifica que las rutas en el `Navbar.js` coincidan con las carpetas dentro de `app/`.

---
*Para soporte técnico avanzado, contactar con el equipo de desarrollo de PCAI.*
