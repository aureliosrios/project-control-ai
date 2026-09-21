---
name: pcai-ops-identificar-cursos
description: Identifica, audita y concilia cursos entre Supabase y la web matriz de Project Control AI, generando planes SQL para altas sincrónicas o actualización de ediciones.
---

# Identificar y Conciliar Cursos (Supabase vs Web Matriz)

Este asistente se encarga de auditar la consistencia entre el catálogo de la web matriz (`data/cursos.json`) y la base de datos de producción en Supabase (`cursos`, `matriculas`, ediciones).

## Procedimiento Operativo

1. **Sincronización del estado de Supabase**:
   Ejecutar desde el directorio de administración (`D:\Project Control AI\Administración de datos`):
   ```bash
   node admin-ops/ops.js sync
   ```
   Esto genera o actualiza el snapshot más reciente en `admin-ops/data/db_snapshot_public.json`.

2. **Consulta y cruce comparativo**:
   Ejecutar:
   ```bash
   node admin-ops/ops.js cursos [termino_busqueda]
   ```
   Compara los cursos registrados en Supabase con los cursos sincrónicos activos en `data/cursos.json`.

3. **Diagnóstico de inconsistencias**:
   - Verificar si el curso existe con modalidad `sincronico` en Supabase.
   - Verificar si la edición (fecha y turno, ej: `"20/09/2026 - Tarde"`) coincide exactamente con la cohorte activa.
   - Si la cohorte tiene clases grabadas publicadas, comprobar concordancia con `data/cohortes.json`.

4. **Generación de planes de cambio (si se requiere)**:
   - **Alta de curso sincrónico en Supabase**:
     - *Opción directa CLI (Recomendada)*:
       ```bash
       node admin-ops/ops.js curso-uno --nombre "Nuevo Curso Sincrónico" --categoria "IA y Construcción" --horas 40 [--profesor UUID]
       ```
     - *Opción vía JSON*:
       ```bash
       node admin-ops/ops.js plan-curso entrada.json
       ```
   - **Actualización de fecha o edición de curso sincrónico**:
     - *Opción directa CLI (Recomendada)*:
       ```bash
       node admin-ops/ops.js fecha-uno --curso "Nombre del Curso" --edicion-anterior "23/08/2026" --edicion-nueva "20/09/2026 - Tarde" [--esperadas 15]
       ```
     - *Opción vía JSON*:
       ```bash
       node admin-ops/ops.js plan-fecha entrada.json
       ```
   El plan generado en `admin-ops/runs/<run>.sql` incluye locks transaccionales y hash SHA-256.

5. **Aplicación controlada**:
   Presentar el plan al usuario para su ejecución en Supabase SQL Editor o vía:
   ```bash
   node admin-ops/ops.js aplicar admin-ops/runs/<run>.json --apply
   ```
