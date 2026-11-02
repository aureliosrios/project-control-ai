# GUÍA DE PROMPTS — SESIÓN 06: AJUSTE DE CRONOGRAMA JSON, AGENTE `.agente_cronograma` Y AUTOMATIZACIÓN VBA (`.bas`) EN MS PROJECT

> **Curso:** Agentes de IA: Presupuestos, EETT y Cronogramas (Grupo Tarde — 3:00 p.m. a 6:00 p.m.)  
> **Sesión:** Sesión 06 (01/11/2026)  
> **Propósito:** Secuencia oficial de prompts utilizados en clase para depurar duraciones sin decimales, comprimir el cronograma al plazo contractual (240 días) rebalanceando cuadrillas, generar/actualizar la macro `.bas` para **Microsoft Project** conciliada en Horas-Hombre (HH) con el presupuesto y empaquetar el agente especializado `.agente_cronograma`.

---

## 🧭 Flujo de Trabajo de la Sesión

1. **Normalización de Duraciones Enteras:** Eliminar decimales en las duraciones de las actividades del cronograma conforme a las bases contractuales.
2. **Generación de Macro `.bas` desde JSON:** Configurar calendario 7x8 corrido (8:00 a.m. – 4:00 p.m.), inicio `01/12/2026`, mes de 30 días, duración fija y tareas no condicionadas por el esfuerzo.
3. **Empaquetado del Agente:** Estructurar el agente evolutivo en la carpeta `.agente_cronograma`.
4. **Depuración de Visibilidad de Macro en VBA:** Asegurar que el procedimiento `Public Sub` sin argumentos y sin caracteres inválidos en `Attribute VB_Name` aparezca en la lista de macros (`Alt + F8`).
5. **Compresión a Plazo Contractual (240 días):** Rebalancear el número de cuadrillas en el modelo JSON para cumplir el plazo contractual.
6. **Conciliación de Horas-Hombre (HH) con el Presupuesto:** Inyectar el trabajo (`Work`) de cada actividad en el archivo `.bas` para cuadrar al 100 % con las horas del presupuesto.

---

## 📌 Prompt 00: Generación de Presupuesto en JSON (APU e Insumos) y Excel Formato Presto en Dólares (USD)

Usa este prompt apuntando a la carpeta de información del proyecto (WBS, metrados, especificaciones técnicas y costos):

```text
Dentro de la carpeta se encuentra la información de un proyecto de construcción, incluyendo el WBS, metrados, especificaciones técnicas y demás. Analiza todo el proyecto y genera un presupuesto en formato JSON, incorporando los análisis de PU y el listado de insumos. Además, crea un entregable en Excel con fórmulas dinámicas; el presupuesto debe estar en formato Presto y en dólares.
```

---

## 📌 Prompt 01: Ajuste de Duraciones a Días Enteros (Sin Decimales)

Usa este prompt cuando el cálculo teórico de duraciones ($D = \text{Metrado} / (\text{Rendimiento} \times N_{\text{cuad}})$) arroje duraciones fraccionarias y las bases establezcan duraciones enteras:

```text
¿Por qué la duración del proyecto es de 276.89 días? Debería expresarse como una duración sin decimales, ya que se establece que ninguna actividad puede tener decimales. Ajusta las duraciones de todas las actividades a números enteros y recalcula la duración total del proyecto.
```

---

## 📌 Prompt 02: Generación del Archivo `.bas` para MS Project y Creación del Agente Especializado

Usa este prompt para transformar el modelo `.json` del cronograma en un módulo VBA (`.bas`) importable en MS Project, registrando las reglas técnicas en un agente evolutivo:

```text
Generar el archivo .bas para MS Project a partir del archivo JSON, considerando lo siguiente:
1.- Fecha de inicio del proyecto: 01/12/2026;
2.- Crear un calendario nuevo de 7 días a la semana, incluyendo domingos y feriados;
3.- Horario laboral: 8:00 a.m. a 4:00 p.m., sin tiempo de refrigerio;
4.- Mes de 30 días;
5.- Tipo de duración: fija, con actividades no condicionadas por el esfuerzo.
Cada vez que se genere o actualice el archivo .bas, es importante crear y/o actualizar un agente especializado en la conversión de JSON a .bas.
```

---

## 📌 Prompt 03: Empaquetado del Agente Completo en la Carpeta `.agente_cronograma`

Usa este prompt para persistir el agente dentro del espacio de trabajo y reutilizarlo en futuros proyectos:

```text
Puedes generar el agente completo dentro de la carpeta de trabajo, nombrándolo como .agente_cronograma
```

---

## 📌 Prompt 04: Depuración de Visibilidad de la Macro en el Editor VBA de MS Project

Si al importar el archivo `.bas` en MS Project (`Alt + F11` → *File* → *Import File*) la macro no aparece listada en *View Macros* (`Alt + F8`), usa este prompt para corregir el encabezado `Attribute VB_Name`, eliminar `Option Private Module` o asegurar que el procedimiento principal sea `Public Sub ...()` sin parámetros:

```text
Revisa el archivo .bas; puedo importarlo en VBA, pero al intentar ejecutar la macro, no aparece disponible.
```

---

## 📌 Prompt 05: Compresión del Cronograma a 240 Días y Rebalanceo de Cuadrillas en JSON

Usa este prompt para ajustar la ruta crítica al plazo contractual objetivo incrementando y balanceando las cuadrillas en las actividades críticas/pivot:

```text
Crea un nuevo archivo JSON ajustando la duración del proyecto a 240 días, considerando también un reajuste en la cantidad de cuadrillas para cumplir con el plazo contractual.
```

---

## 📌 Prompt 06: Sincronización de Horas-Hombre (HH) del Presupuesto en el Archivo `.bas`

Usa este prompt para incorporar la columna de Trabajo (`Task.Work`) de cada actividad en la macro `.bas` de MS Project de modo que el total de Horas-Hombre del cronograma coincida exactamente con el presupuesto contractual:

```text
Actualiza el archivo .bas incluyendo las horas de cada actividad del proyecto, de manera que la suma total coincida con las horas del presupuesto.
```

---

## 🛠️ Notas Técnicas de Verificación en MS Project

1. **Importación del Módulo `.bas`:**
   - Abrir un proyecto en blanco en **MS Project**.
   - Presionar `Alt + F11` para abrir el editor de **Visual Basic for Applications (VBA)**.
   - Ir a **Archivo → Importar archivo... (`Ctrl + M`)** y seleccionar el archivo `.bas` generado.
2. **Ejecución de la Macro:**
   - Cerrar o minimizar el editor VBA y presionar `Alt + F8` (**Vista → Macros → Ver macros**).
   - Seleccionar la macro principal y hacer clic en **Ejecutar**.
3. **Verificación de Cuadratura:**
   - Activar la tarea resumen del proyecto (**Formato → Tarea de resumen del proyecto**).
   -Insertar las columnas **Duración**, **Trabajo (Work)**, **Comienzo**, **Fin** y **Predecesoras** para verificar que el plazo cierre en **240 días** y que la suma de **Trabajo (HH)** cuadre con el presupuesto.
