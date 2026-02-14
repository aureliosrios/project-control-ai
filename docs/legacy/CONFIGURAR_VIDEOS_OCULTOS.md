# 🎥 Cómo Permitir que Videos Ocultos se Visualicen en tu Página Web

## ✅ Situación Actual

- **Video 1 (Clase 1):** PÚBLICO ✅ - Se puede visualizar
- **Videos 2-6:** OCULTOS (No listados) ⚠️ - Se abren en YouTube pero NO en la página web

## 🔍 Diagnóstico del Problema

**Síntoma:** Los videos se abren cuando haces clic en el enlace de YouTube, pero NO se visualizan en el iframe embebido de tu página web.

**Causa:** Los videos ocultos (no listados) tienen **desactivada** la opción **"Permitir inserción"** en YouTube.

## 📋 Solución Paso a Paso

### Para CADA video oculto (Videos 2, 3, 4, 5 y 6):

### Paso 1: Ir a YouTube Studio
1. Abre [YouTube Studio](https://studio.youtube.com)
2. Inicia sesión con tu cuenta
3. Haz clic en **"Contenido"** en el menú lateral izquierdo

### Paso 2: Seleccionar el Video
1. Busca el video por su título o ID:
   - Video 2: `QhgXgxZFmCY` - Generación Dinámica del WBS
   - Video 3: `DQuA1ZFOXNQ` - Refinamiento de Alcances
   - Video 4: `R_LgivWPH30` - Ingeniería de Metrados
   - Video 5: `y7p_4U-rTEA` - Automatización de APUs
   - Video 6: `SXJ8Be4nhMU` - Elaboración de Oferta Técnica

2. Haz clic en el **título del video** o en el ícono de **lápiz** (editar)

### Paso 3: Activar "Permitir Inserción"

#### Opción A: Desde la Vista de Detalles
1. En la página de edición del video, busca la sección **"Más opciones"** (puede estar al final)
2. Expande **"Más opciones"** si está colapsado
3. Busca la casilla **"Permitir inserción"** o **"Allow embedding"**
4. **ACTIVA** esta casilla (debe quedar marcada ✓)
5. Haz clic en **"Guardar"** en la parte superior derecha

#### Opción B: Desde Configuración Avanzada
1. En la página de edición del video, ve a la pestaña **"Configuración avanzada"**
2. Desplázate hacia abajo hasta encontrar **"Distribución"**
3. Busca la opción **"Permitir inserción"**
4. **ACTIVA** esta opción
5. Haz clic en **"Guardar"**

### Paso 4: Verificar la Configuración de Privacidad

Mientras estás editando el video, verifica que:
- **Visibilidad:** Debe estar en **"No listado"** (NO en "Privado")
- **Permitir inserción:** Debe estar **ACTIVADA** ✓

### Paso 5: Guardar Cambios
1. Asegúrate de hacer clic en **"Guardar"** o **"Guardar cambios"**
2. Espera la confirmación de que los cambios se guardaron

## 🧪 Cómo Verificar que Funcionó

### Método 1: Prueba Rápida en el Navegador
Abre este enlace en tu navegador (reemplaza `ID_DEL_VIDEO`):
```
https://www.youtube.com/embed/ID_DEL_VIDEO
```

**Ejemplo para Video 2:**
```
https://www.youtube.com/embed/QhgXgxZFmCY
```

**Resultados esperados:**
- ✅ **CORRECTO:** El video se reproduce en la página
- ❌ **INCORRECTO:** Aparece mensaje "La reproducción en otros sitios web ha sido desactivada por el propietario del video"

### Método 2: Usar la Página de Prueba
1. Abre el archivo `test-videos.html` en tu navegador
2. Verifica que todos los videos se visualicen correctamente
3. Si alguno no funciona, repite los pasos para ese video

### Método 3: Verificar en tu Página Real
1. Abre `clases-grabadas.html` en tu navegador
2. Verifica que el primer video se cargue
3. Haz clic en cada lección de la lista lateral
4. Todos los videos deberían cambiar y reproducirse correctamente

## 📊 Checklist de Configuración

Para cada video oculto, verifica:

### Video 2: `QhgXgxZFmCY`
- [ ] Visibilidad: No listado
- [ ] Permitir inserción: ACTIVADO
- [ ] Guardado correctamente
- [ ] Probado en navegador

### Video 3: `DQuA1ZFOXNQ`
- [ ] Visibilidad: No listado
- [ ] Permitir inserción: ACTIVADO
- [ ] Guardado correctamente
- [ ] Probado en navegador

### Video 4: `R_LgivWPH30`
- [ ] Visibilidad: No listado
- [ ] Permitir inserción: ACTIVADO
- [ ] Guardado correctamente
- [ ] Probado en navegador

### Video 5: `y7p_4U-rTEA`
- [ ] Visibilidad: No listado
- [ ] Permitir inserción: ACTIVADO
- [ ] Guardado correctamente
- [ ] Probado en navegador

### Video 6: `SXJ8Be4nhMU`
- [ ] Visibilidad: No listado
- [ ] Permitir inserción: ACTIVADO
- [ ] Guardado correctamente
- [ ] Probado en navegador

## 🎯 Resumen Visual

```
ANTES (No funciona en página web):
┌─────────────────────────────────────┐
│ YouTube Studio                      │
├─────────────────────────────────────┤
│ Visibilidad: No listado        ✓   │
│ Permitir inserción:            ✗   │  ← PROBLEMA
└─────────────────────────────────────┘

DESPUÉS (Funciona en página web):
┌─────────────────────────────────────┐
│ YouTube Studio                      │
├─────────────────────────────────────┤
│ Visibilidad: No listado        ✓   │
│ Permitir inserción:            ✓   │  ← SOLUCIÓN
└─────────────────────────────────────┘
```

## ⚠️ Notas Importantes

1. **Los cambios pueden tardar unos minutos** en aplicarse. Si no funciona inmediatamente, espera 2-3 minutos y recarga la página.

2. **No cambies los videos a "Público"** si quieres mantenerlos ocultos. "No listado" es la configuración correcta para videos que solo quieres compartir con quienes tengan el enlace.

3. **"Permitir inserción" es independiente de la visibilidad.** Puedes tener un video "No listado" con inserción permitida, que es exactamente lo que necesitas.

4. **El Video 1 (público) ya funciona** porque los videos públicos tienen la inserción permitida por defecto.

## 🔧 Solución Rápida por Lotes

Si tienes muchos videos, puedes configurarlos todos a la vez:

1. En YouTube Studio, ve a **"Contenido"**
2. **Selecciona múltiples videos** (marca las casillas junto a cada video)
3. Haz clic en **"Editar"** en la parte superior
4. Selecciona **"Más opciones"**
5. Activa **"Permitir inserción"** para todos
6. Haz clic en **"Actualizar videos"**

## 📞 Si Aún No Funciona

Si después de seguir estos pasos los videos aún no se visualizan:

1. **Verifica que guardaste los cambios** en YouTube Studio
2. **Limpia la caché del navegador** (Ctrl + Shift + Delete)
3. **Prueba en modo incógnito** para descartar problemas de caché
4. **Verifica que no haya restricciones de edad** en los videos
5. **Asegúrate de que los videos no tengan strikes de copyright**

## ✅ Confirmación Final

Una vez que hayas configurado todos los videos, deberías poder:
- ✅ Ver todos los videos en `clases-grabadas.html`
- ✅ Cambiar entre videos haciendo clic en la lista lateral
- ✅ Compartir la página con tus estudiantes
- ✅ Los videos seguirán siendo "ocultos" (no aparecerán en búsquedas de YouTube)
- ✅ Solo las personas con el enlace de tu página podrán verlos

---

**Última actualización:** 2026-02-13  
**Archivos relacionados:** `clases-grabadas.html`, `test-videos.html`
