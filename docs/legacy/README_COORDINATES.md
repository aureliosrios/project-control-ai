# Guia de Coordenadas de Certificación - Project Control AI (V5.0)

Este documento sirve como memoria auxiliar para el posicionamiento de los elementos dinámicos en la plantilla maestra del certificado PDF (`plantilla_maestra.pdf`).

## Información General
- **Librería utilizada:** `pdf-lib` (JavaScript)
- **Versión actual de Guía:** 5.0
- **Versión de Software asociada:** `verificar.html` v6.9
- **Unidades:** Puntos tipográficos (Points)

---

## Coordenadas de Elementos (Página 1)

### 1. Nombre del Alumno
- **Texto:** Nombre completo en Mayúsculas (`data.nombre_confirmado`).
- **Fuente:** `Helvetica-Bold`
- **Tamaño:** 21 pt
- **Color:** `rgb(0.98, 0.75, 0.14)` (Dorado/Amarillo)
- **Eje X:** `(Ancho de página / 2) - (Ancho del texto / 2) - 103`
- **Eje Y:** `430`
- **Nota:** Centrado respecto al área de texto principal con un ajuste de -103 puntos a la izquierda.

### 2. Texto de Detalle
- **Texto:** "con una duración de [horas] horas, impartido del [DD/MM/YYYY] al [DD/MM/YYYY] en modalidad online."
- **Formato Fecha:** `es-PE` (Latinoamericano)
- **Fuente:** `Helvetica-Bold`
- **Tamaño:** 11 pt
- **Color:** `rgb(0.2, 0.2, 0.2)` (Gris Oscuro)
- **Eje X:** `(Ancho de página / 2) - (Ancho del texto / 2) - 105`
- **Eje Y:** `288`
- **Nota:** Alineado visualmente con el texto estático de la plantilla.

### 3. Código QR
- **Dimensiones:** 80x80 px
- **Eje X:** `714`
- **Eje Y:** `86`
- **Nota:** Ubicado en la barra lateral derecha, centrado dentro del recuadro blanco inferior.

### 4. ID del Folio (Código de Verificación)
- **Texto:** "[Código del Certificado]" (Ej: PCAI-2026-024)
- **Fuente:** `Helvetica` (Regular)
- **Tamaño:** 7 pt
- **Color:** `rgb(1, 1, 1)` (Blanco)
- **Eje X:** `722`
- **Eje Y:** `65`

### 5. Firma del Instructor (Aurelio Solórzano)
- **Escala:** Ultra-discreta (v6.9)
- **Dimensiones:** 100x120 px
- **Eje X:** `472`
- **Eje Y:** `115`
- **Nota:** Factor de escala para asemejar a la firma del director (estilo vertical y compacto).

### 6. Información del Instructor (Texto)
- **Base X (Centro):** 522
- **Nombre:** 11 pt, `Helvetica-Bold`, Negro, **Y: 72**
- **CIP:** 10 pt, `Helvetica-Bold`, Negro, **Y: 58**

---

## Coordenadas de Elementos (Página 2 - Reverso)

### 1. Periodo de Impartición
- **Texto:** "Periodo de impartición: del [fecha] al [fecha]"
- **Fuente:** `Helvetica-Bold`
- **Tamaño:** 12 pt
- **Eje X:** `(Ancho de página / 2) - 130`
- **Eje Y:** `75`

### 2. Fecha de Impresión (Stamp de Auditoría)
- **Texto:** "Fecha de Impresión: DD/MM/YYYY HH:mm"
- **Fuente:** `Helvetica` (Regular)
- **Tamaño:** 8 pt
- **Color:** `rgb(0.3, 0.3, 0.3)` (Gris discreto)
- **Eje X:** `Ancho - anchoTexto - 50` (Alineado a la derecha)
- **Eje Y:** `53`
- **Nota:** Ubicado cerca del borde de la zona achurada inferior para registro de impresión.

---

## Historial de Versiones Relevantes
- **V4.1:** Reversión de QR a X (714) y Y (86).
- **V5.0 (Actual):** 
    - Inclusión de Firma Instructor Redimensionada (100x120).
    - Inclusión de Sello de Impresión en Reverso (Y: 53) en esquina derecha.
    - Cambio de formato de fecha a `es-PE` (DD/MM/YYYY).
    - Documentación de información del Instructor (Nombre y CIP).
