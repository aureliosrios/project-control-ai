---
name: pcai-ops-despliegue-vercel
description: Ejecuta el checklist de control de calidad (catálogo, linter, tests y build) y despliega la plataforma a producción en Vercel con verificación en vivo.
---

# Despliegue y Control de Calidad en Vercel

Este asistente coordina la validación técnica previa y el despliegue a producción de la aplicación web Next.js (`project-control-ai`) hacia Vercel.

## Checklist Obligatorio Pre-Despliegue

Antes de cualquier despliegue o actualización a producción, deben ejecutarse y aprobarse todos los pasos de calidad en la matriz `project-control-ai`:

```bash
npm run check:cursos
npm run test:cursos
npm run lint
npm run build
```

O de forma automatizada mediante el validador integral:
```bash
python "D:\Project Control AI\Administración de datos\admin-ops\deploy.py" check
```

## Procedimiento de Despliegue

### 1. Despliegue a Producción
Desde `D:\Project Control AI\project-control-ai`:
```bash
vercel deploy --prod
```
O utilizando el script operativo:
```bash
python "D:\Project Control AI\Administración de datos\admin-ops\deploy.py" production --apply
```

### 2. Verificación de Salud en Producción
Una vez finalizado el despliegue, comprobar la disponibilidad de las rutas principales:
- Home: `https://project-control-ai-one.vercel.app/`
- Catálogo de Formación: `https://project-control-ai-one.vercel.app/formacion`
- Portal del Alumno: `https://project-control-ai-one.vercel.app/portal`
- Clases Grabadas: `https://project-control-ai-one.vercel.app/clases-grabadas`
- Verificación de Certificados: `https://project-control-ai-one.vercel.app/verificar`

### 3. Verificación de Bundle de Video Publicado (si aplica)
Para comprobar que una nueva lección publicada en `data/clases-grabadas.json` fue incluida en el bundle compilado de producción:
```bash
python "D:\Project Control AI\Administración de datos\admin-ops\deploy.py" verify https://project-control-ai-one.vercel.app "D:\Project Control AI\Administración de datos\admin-ops\jobs\<job_id>.json"
```
