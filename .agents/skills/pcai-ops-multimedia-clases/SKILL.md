---
name: pcai-ops-multimedia-clases
description: Descarga grabaciones de Zoom, las sube a YouTube en modo oculto (unlisted) con protocolo reanudable y las publica en el portal de clases grabadas.
---

# Flujo Multimedia: Zoom ➡️ YouTube ➡️ Portal de Alumnos

Este asistente automatiza el pipeline de procesamiento de clases sincrónicas desde su grabación en Zoom hasta su publicación en el portal privado del alumno.

## Requisitos de Entorno

Desde `D:\Project Control AI\Administración de datos`:
- Credenciales en `.env`: `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`.
- Token de YouTube OAuth: `token_youtube.json` (si expiró o no existe, ejecutar `python admin-ops/scripts/auth_youtube.py`).

## Procedimiento Paso a Paso

### 1. Listar y Seleccionar Grabación de Zoom
Consultar las grabaciones disponibles en el rango de fechas (máximo 28 días):
```bash
python admin-ops/media.py list --from 2026-09-01 --to 2026-09-21
```
Identificar el `uuid` de la reunión y el `id` del archivo MP4 (`recording_files`).

### 2. Preparar el Trabajo Atómico (`prepare`)
Generar la tarjeta del trabajo en `admin-ops/jobs/<id>.json`:
```bash
python admin-ops/media.py prepare \
  --from 2026-09-01 --to 2026-09-21 \
  --meeting "<MEETING_UUID>" \
  --recording "<RECORDING_ID>" \
  --course "Agentes de IA: Presupuestos, EETT y Cronogramas" \
  --edition "20/09/2026 - Tarde" \
  --key "AGENTES_IA_TARDE" \
  --lesson "01" \
  --title "Lección 01: Fundamentos de Agentes y Presupuestos" \
  --description "Sesión grabada del 20 de Septiembre del curso Agentes de IA."
```
Esto crea `admin-ops/jobs/<job_id>.json` con bloqueo seguro anti-colisiones.

### 3. Descargar con Verificación SHA-256
```bash
python admin-ops/media.py download admin-ops/jobs/<job_id>.json
```
El archivo se descarga como `.mp4.part` y solo tras validar tamaño y encabezado `ftyp` se renombra atómicamente a `<job_id>.mp4` en `temp_videos/`.

### 4. Subir a YouTube (Resumable Upload)
```bash
python admin-ops/media.py upload admin-ops/jobs/<job_id>.json --apply
```
Sube en fragmentos de 8 MB con consulta de offset al servidor para tolerar interrupciones de red.

### 5. Verificar Procesamiento en YouTube
```bash
python admin-ops/media.py verify admin-ops/jobs/<job_id>.json
```
Confirma que el video está procesado (`status = processed`) y configurado como oculto (`privacyStatus = unlisted`).

### 6. Publicar en el Catálogo de la Matriz Web
Incorporar la lección en `data/clases-grabadas.json` y respaldar la anterior:
```bash
node admin-ops/publish.js admin-ops/jobs/<job_id>.json --apply
```

### 7. Limpieza de Archivos de Video Locales
Una vez verificada la publicación y desplegado el portal, ejecutar:
```bash
python admin-ops/cleanup.py --apply
```
Elimina el archivo MP4 local de `temp_videos/` liberando espacio en disco de manera segura.
