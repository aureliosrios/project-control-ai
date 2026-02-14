# Diagnóstico y Solución: Clases Grabadas No Visibles

## Problema Identificado

Los videos de YouTube en la página `clases-grabadas.html` no se visualizan correctamente. Este problema puede tener dos causas principales:

### 1. **Configuración del Código HTML** ✅ SOLUCIONADO

**Problema anterior:**
- El iframe de YouTube no tenía los parámetros necesarios para la reproducción embebida
- Faltaban permisos importantes como `autoplay` y `web-share`
- No se incluía el atributo `referrerpolicy`

**Solución aplicada:**
```html
<!-- ANTES -->
<iframe src="https://www.youtube.com/embed/VIDEO_ID">

<!-- DESPUÉS -->
<iframe src="https://www.youtube.com/embed/VIDEO_ID?autoplay=0&rel=0&modestbranding=1"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    referrerpolicy="strict-origin-when-cross-origin">
```

### 2. **Configuración de Privacidad en YouTube** ⚠️ REQUIERE VERIFICACIÓN

Los videos están marcados como "OCULTA" en el código. Para que los videos embebidos funcionen, deben estar configurados correctamente en YouTube.

## Cómo Verificar y Configurar los Videos en YouTube

### Paso 1: Verificar el Estado de Privacidad

Para cada video, verifica su configuración en YouTube Studio:

1. Ve a [YouTube Studio](https://studio.youtube.com)
2. Selecciona "Contenido" en el menú lateral
3. Encuentra cada video de la lista
4. Verifica la columna "Visibilidad"

### Paso 2: Configuración Correcta para Videos Embebidos

Los videos deben estar configurados como **"No listado"** (NO como "Privado"):

| Configuración | ¿Funciona Embebido? | Descripción |
|---------------|---------------------|-------------|
| **Público** | ✅ Sí | Cualquiera puede ver y buscar el video |
| **No listado** | ✅ Sí | Solo quienes tengan el enlace pueden verlo |
| **Privado** | ❌ NO | Solo tú y las personas que elijas pueden verlo |

### Paso 3: Cambiar la Configuración de Privacidad

Si tus videos están en "Privado", cámbialos a "No listado":

1. En YouTube Studio, haz clic en el video
2. En "Visibilidad", selecciona **"No listado"**
3. Asegúrate de que la opción **"Permitir inserción"** esté ACTIVADA
4. Guarda los cambios

### Paso 4: Verificar que la Inserción esté Permitida

1. Abre el video en YouTube Studio
2. Ve a la sección "Más opciones"
3. Busca la opción **"Permitir inserción"**
4. Asegúrate de que esté **ACTIVADA** (marcada)

## Lista de Videos a Verificar

Estos son los IDs de los videos que necesitas verificar en YouTube:

| Lección | ID del Video | Título |
|---------|--------------|--------|
| 01 | `2QxbQ8IY0Zc` | Configuración de Cerebros Digitales con NotebookLM |
| 02 | `QhgXgxZFmCY` | Generación Dinámica del WBS y Visualización HTML |
| 03 | `DQuA1ZFOXNQ` | Refinamiento de Alcances y Frentes de Trabajo |
| 04 | `R_LgivWPH30` | Ingeniería de Metrados Automática y "Gemas" |
| 05 | `y7p_4U-rTEA` | Automatización de APUs con Scripts VBA |
| 06 | `SXJ8Be4nhMU` | Elaboración de Oferta Técnica y Mermaid |

## Cómo Probar si Funciona

### Método 1: Abrir directamente en YouTube
Para cada video, prueba este enlace en tu navegador:
```
https://www.youtube.com/watch?v=ID_DEL_VIDEO
```

Por ejemplo:
```
https://www.youtube.com/watch?v=2QxbQ8IY0Zc
```

### Método 2: Probar el embed
Prueba el enlace de inserción:
```
https://www.youtube.com/embed/ID_DEL_VIDEO
```

Por ejemplo:
```
https://www.youtube.com/embed/2QxbQ8IY0Zc
```

Si este enlace muestra un error o dice "Video no disponible", el video está en **Privado** y necesitas cambiarlo a **No listado**.

## Solución Rápida: Verificación por Lotes

Puedes verificar todos los videos rápidamente abriendo estos enlaces:

1. https://www.youtube.com/embed/2QxbQ8IY0Zc
2. https://www.youtube.com/embed/QhgXgxZFmCY
3. https://www.youtube.com/embed/DQuA1ZFOXNQ
4. https://www.youtube.com/embed/R_LgivWPH30
5. https://www.youtube.com/embed/y7p_4U-rTEA
6. https://www.youtube.com/embed/SXJ8Be4nhMU

Si alguno muestra error, ese video necesita cambiar su configuración de privacidad.

## Resumen de Cambios Realizados

✅ **Código HTML actualizado** con:
- Parámetros de URL correctos (`autoplay=0&rel=0&modestbranding=1`)
- Permisos completos en el atributo `allow`
- Atributo `referrerpolicy` para mejor compatibilidad
- Configuración aplicada tanto al iframe inicial como a la función JavaScript

⚠️ **Pendiente de verificar**:
- Configuración de privacidad de los videos en YouTube
- Opción "Permitir inserción" activada para cada video

## Próximos Pasos

1. **Verifica cada video** usando los enlaces de prueba arriba
2. **Cambia a "No listado"** los videos que estén en "Privado"
3. **Activa "Permitir inserción"** en cada video
4. **Prueba la página** `clases-grabadas.html` en tu navegador
5. Si persiste el problema, revisa si hay restricciones de edad o geográficas en los videos

## Contacto de Soporte

Si después de seguir estos pasos los videos aún no se visualizan, puede haber otros factores:
- Restricciones de edad en los videos
- Restricciones geográficas
- Problemas con la cuenta de YouTube
- Videos eliminados o con strikes de copyright

---

**Fecha de actualización:** 2026-02-13
**Archivo modificado:** `clases-grabadas.html`
