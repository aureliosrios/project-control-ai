# Guía de Configuración: Formulario a Google Sheets 📊

Sigue estos pasos para que los datos de tu página de inscripción se guarden automáticamente en una hoja de cálculo de Google.

## Paso 1: Preparar Google Sheets
1. Crea una nueva hoja de cálculo en [Google Sheets](https://sheets.new).
2. En la primera fila (encabezados), escribe exactamente estos nombres en las columnas:
   - `timestamp`
   - `nombre`
   - `apellido`
   - `dni`
   - `profesion`
   - `telefono`
   - `curso`
   - `metodo_pago`
   - `pago`
3. Asegúrate de que el nombre de la pestaña sea `Hoja 1` (o cámbialo en el código del script).

## Paso 2: Configurar el Script
1. Dentro de tu Google Sheet, ve a **Extensiones > Apps Script**.
2. Borra todo el código que aparezca y pega el siguiente:

```javascript
/* 
   Project Control AI - Scripts de Automatización
   Guarda los datos del formulario en Google Sheets
*/

var sheetName = 'Hoja 1'; // Nombre de la pestaña en tu Excel
var scriptProp = PropertiesService.getScriptProperties();

function initialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost (e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Esperar 10 segundos para evitar colisiones

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      if (header === 'timestamp') {
        return new Date();
      }
      return e.parameter[header] || '';
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': err }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
```

3. Haz clic en el icono de **Guardar** (disquete) y ponle de nombre "Script de Inscripción".
4. En la barra de herramientas, selecciona la función `initialSetup` y haz clic en **Ejecutar**. 
   - *Te pedirá permisos: Acéptalos todos (es posible que debas hacer clic en "Configuración avanzada" y "Ir a Script de Inscripción (no seguro)").*

## Paso 3: Desplegar como Aplicación Web
1. Haz clic en el botón azul **Implementar > Nueva implementación**.
2. Selecciona el tipo: **Aplicación web**.
3. Configuración:
   - Descripción: "Formulario Web"
   - Ejecutar como: **Yo** (tu correo)
   - Quién tiene acceso: **Cualquier persona** (Esto es clave para que el formulario funcione).
4. Haz clic en **Implementar**.
5. **Copia la "URL de la aplicación web"**.

## Paso 4: Vincular con tu HTML
1. Abre tu archivo `inscripcion.html`.
2. Busca la línea: `const scriptURL = '...';`
3. Pega allí la URL que copiaste.
4. Guarda los cambios.

---

## Paso 5: Publicar en GitHub 🚀
1. Entra a tu cuenta de GitHub y crea un nuevo repositorio (ej. `academia-web`).
2. Sube todos tus archivos (`index.html`, `inscripcion.html`, `styles.css`, `Logotipo.png`, etc.).
3. Ve a la pestaña **Settings** (Configuración) de tu repositorio.
4. En el menú de la izquierda, busca **Pages**.
5. En "Build and deployment", selecciona la rama `main` (o `master`) y la carpeta `/ (root)`.
6. Haz clic en **Save**.
7. ¡Listo! En unos minutos tu página estará en `https://tu-usuario.github.io/tu-repo/inscripcion.html`.
