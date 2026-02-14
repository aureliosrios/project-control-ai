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
   - `email`
   - `curso`
   - `metodo_pago`
   - `pago`
3. Cambia el nombre de la pestaña de `Hoja 1` a **`Alumnos`** (el script busca este nombre exacto).

## Paso 2: Configurar el Script
1. Dentro de tu Google Sheet, ve a **Extensiones > Apps Script**.
2. Borra todo el código que aparezca y pega el siguiente:

```javascript
/* 
   Project Control AI - Scripts de Automatización
   Guarda los datos del formulario y envía email de bienvenida
*/

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Alumnos");
    var data = e.parameter;
    
    // 1. GUARDAR EN EL SHEET
    var row = [
      new Date(),       // A: Fecha
      data.nombre,      // B: Nombre
      data.apellido,    // C: Apellido
      data.dni,         // D: DNI
      data.profesion,   // E: Profesion
      data.telefono,    // F: Telefono
      data.email,       // G: Email
      data.curso,       // H: Curso
      data.metodo_pago, // I: Medio_Pago
      data.pago || "NO" // J: Pago_Realizado
    ];

    sheet.appendRow(row);

    // 2. DISPARAR EL EMAIL DE BIENVENIDA
    enviarEmailRespuesta(data.email, data.nombre, data.curso);

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
    
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

function enviarEmailRespuesta(emailDestino, nombreAlumno, nombreCurso) {
  var asunto = "🚀 Registro Exitoso - Academia Project Control AI";
  
  var cuerpoHTML = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #f1f5f9; padding: 30px; border-radius: 15px; max-width: 600px; margin: auto; border: 1px solid #38bdf8;">
      <div style="text-align: center;">
        <h1 style="color: #38bdf8; margin-bottom: 5px;">Project Control AI</h1>
        <p style="color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem;">Consultoría & Academia Tecnológica</p>
      </div>
      <hr style="border: 0.5px solid #334155; margin: 20px 0;">
      <p style="font-size: 1.1rem;">Estimado/a <b>\${nombreAlumno}</b>,</p>
      <p>Es un gusto saludarte. Te confirmo que tu ficha de inscripción para el programa <b>\${nombreCurso}</b> ha sido procesada con éxito.</p>
      <div style="background-color: #1e293b; padding: 20px; border-left: 5px solid #38bdf8; margin: 25px 0;">
        <p style="margin: 0; color: #38bdf8; font-weight: bold;">Estatus del Registro:</p>
        <p style="margin: 5px 0; color: #ffffff;">Pendiente de Validación de Pago</p>
      </div>
      <p>Como <b>Director de Project Control AI</b>, te agradezco la confianza. Mi compromiso es brindarte las herramientas tecnológicas para liderar la transformación digital en nuestra industria.</p>
      <p><b>Próximos pasos:</b></p>
      <ul style="line-height: 1.6;">
        <li>Validación de tu voucher por nuestro equipo.</li>
        <li>Envío de cronograma y accesos a la plataforma educativa.</li>
      </ul>
      <div style="text-align: center; margin-top: 40px;">
        <p style="font-style: italic; color: #94a3b8;">"Transformamos datos en concreto y código en control."</p>
        <br>
        <p style="margin-bottom: 0;"><b>Ing. Aurelio Rios</b></p>
        <p style="margin-top: 5px; color: #38bdf8;">Director General | Project Control AI</p>
      </div>
    </div>
  `;

  GmailApp.sendEmail(emailDestino, asunto, "", {
    htmlBody: cuerpoHTML,
    name: "Project Control AI - Dirección",
    replyTo: "aureliosrios@gmail.com"
  });
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
