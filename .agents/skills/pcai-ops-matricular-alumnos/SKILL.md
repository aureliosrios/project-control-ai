---
name: pcai-ops-matricular-alumnos
description: Matricula alumnos de forma individual o grupal/masiva en Supabase, generando credenciales del portal, código PCAI correlativo seguro y registro transaccional.
---

# Matrícula de Alumnos (Individual y Masiva)

Este asistente gestiona la incorporación segura y atómica de estudiantes en las tablas `estudiantes`, `alumnos_activos` y `matriculas` de Supabase.

## Reglas Críticas de Integridad

- **Identidad Única**: El DNI debe ser exactamente de 8 dígitos numéricos (como texto). Si un DNI ya existe en la base de datos con otro nombre o apellido, el sistema aborta la transacción para evitar suplantaciones.
- **Credenciales del Portal**: Si el alumno es nuevo, se le crea cuenta en `alumnos_activos` con código correlativo `PCAI-2024-XXX` (sin truncarse tras 999) y contraseña inicial igual a su DNI. Si el alumno ya existía, se preserva intacta su contraseña previa.
- **Idempotencia**: Si el alumno ya está matriculado en ese curso y edición, no se duplica la fila.

## Métodos de Ejecución

### Opción A: Matrícula Individual Rápida (Línea de Comandos)

Ejecutar desde `D:\Project Control AI\Administración de datos`:
```bash
node admin-ops/ops.js matricular-uno \
  --curso "Agentes de IA: Presupuestos, EETT y Cronogramas" \
  --edicion "20/09/2026 - Tarde" \
  --dni 12345678 \
  --nombre "Juan" \
  --apellido "Perez" \
  [--vip] \
  [--email "juan@ejemplo.com"] \
  [--telefono "+51999999999"] \
  [--profesion "Ingeniero Civil"]
```

### Opción B: Matrícula Masiva / Grupal (Vía Archivo JSON)

1. Crear un archivo temporal (ej. `alumnos_lote.json`):
   ```json
   {
     "curso": "Agentes de IA: Presupuestos, EETT y Cronogramas",
     "edicion": "20/09/2026 - Tarde",
     "alumnos": [
       {
         "dni": "12345678",
         "nombre": "Juan",
         "apellido": "Perez",
         "vip": true,
         "email": "juan@ejemplo.com",
         "telefono": "+51999999999",
         "profesion": "Ingeniero Civil"
       },
       {
         "dni": "87654321",
         "nombre": "Maria",
         "apellido": "Gomez",
         "vip": false
       }
     ]
   }
   ```

2. Generar el plan SQL sellado:
   ```bash
   node admin-ops/ops.js plan-matricula alumnos_lote.json
   ```

## Aplicación y Verificación

1. Revisar el archivo `.sql` generado en `admin-ops/runs/`.
2. Aplicar la transacción:
   - Opción 1 (Directa por CLI):
     ```bash
     node admin-ops/ops.js aplicar admin-ops/runs/<run>.json --apply
     ```
   - Opción 2 (Supabase SQL Editor): Copiar el contenido del `.sql` en el SQL Editor del panel web de Supabase y ejecutar.
3. Sincronizar el estado local para confirmar:
   ```bash
   node admin-ops/ops.js sync
   ```
