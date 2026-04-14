# Skill: Actualización de Fechas de Cursos

Este documento describe el procedimiento estándar para actualizar el calendario de cursos en el ecosistema de **Project Control AI**.

## 📂 Archivos a Modificar (Orden de Prioridad)

Para una sincronización completa, se deben actualizar los siguientes archivos:

1.  **`cursos.json` (Source of Truth)**
    *   **Ubicación**: Raíz del proyecto.
    *   **Qué cambiar**: Actualizar los campos `fechaInicio` y los objetos `playlist` (si contienen metadatos de inicio). También actualizar las fechas de las `lecciones` individuales siguiendo la frecuencia del curso.
    *   *Nota*: Este archivo es el más importante ya que alimenta scripts y lógica dinámica.

2.  **`assets/js/config.js`**
    *   **Ubicación**: `assets/js/config.js`.
    *   **Qué cambiar**: Actualizar el array `CURSOS_DISPONIBLES`.
    *   *Importante*: El formato debe ser `Month DD, YYYY HH:MM:SS` para que el contador de cuenta regresiva funcione correctamente.

3.  **`index.html`**
    *   **Ubicación**: Raíz del proyecto.
    *   **Qué cambiar**: Actualizar las etiquetas de fecha en las tarjetas de la sección "Próximos Inicios" (aprox. línea 190).
    *   *Formato*: `📅 Inicio: DD/MM`.

4.  **`formacion.html`**
    *   **Ubicación**: Raíz del proyecto.
    *   **Qué cambiar**: Actualizar los badges de "Inicio" en cada una de las 5 tarjetas de curso del catálogo.

5.  **`mobile-landing.html`**
    *   **Ubicación**: Raíz del proyecto.
    *   **Qué cambiar**: Actualizar las fechas de inicio en la sección de "Cursos Síncronos".

## 🛠️ Procedimiento de Propagación

### 1. Actualización Manual
Modificar los archivos mencionados arriba asegura que la navegación principal y el catálogo estén al día.

### 2. Generación de Páginas Individuales (Opcional)
Si se desea generar o actualizar las páginas de detalle de cada curso:
*   **Script**: `node scripts/generar-cursos.js`
*   **⚠️ Advertencia**: El script genera archivos con nombres basados en el campo `nombre` de `cursos.json`. Si ya existen archivos con nombres diferentes (curtos), el script creará archivos nuevos. Asegúrate de verificar los nombres antes de ejecutarlo masivamente.

## ✅ Lista de Verificación (Checklist)
- [ ] Verificaste que el día de la semana de la fecha de inicio coincida con el horario (ej. si inicia lunes, que la fecha sea un lunes).
- [ ] Actualizaste `config.js` para los contadores.
- [ ] Actualizaste `index.html` para la página principal.
- [ ] Actualizaste `mobile-landing.html` para usuarios móviles.
- [ ] Actualizaste el catálogo en `formacion.html`.
