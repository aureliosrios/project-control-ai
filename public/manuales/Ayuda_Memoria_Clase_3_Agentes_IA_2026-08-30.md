# 📝 MANUAL DE USUARIO Y AYUDA MEMORIA: SESIÓN 03
## CURSO: AGENTES DE IA (PRESUPUESTOS, EETT Y CRONOGRAMAS)

**Fecha de Sesión:** Domingo, 30 de Agosto de 2026  
**Horario:** 10:00 a.m. - 01:10 p.m. (Duración: 3 horas 10 minutos)  
**Docente / Facilitador:** Ing. Aurelio Solórzano Ríos  
**Plataforma:** Zoom Sincrónico | Project Control AI  
**Participantes Destacados:** Juan José Gómez, Vladimir Vargas, Henry, Reilly Espinoza, Joel Bernaola, Pavel Loyola, Víctor Quispe.

---

## 📌 1. Resumen Ejecutivo de la Sesión

En esta tercera sesión del curso **Agentes de IA: Presupuestos, EETT y Cronogramas**, se desarrolló a nivel avanzado la estructuración de la **Base de Datos Maestra Relacional en JSON** para la gestión, control y seguimiento integral de obras de construcción.

El Ing. Aurelio Solórzano demostró por qué la práctica tradicional de trabajar con archivos Excel o PDFs inconexos genera inconsistencias graves de información entre el área de costos, la oficina técnica de programación y la gerencia financiera. Se demostró cómo construir un **Cerebro Digital** único en formato **JSON Relacional**, desde el cual los Agentes de IA pueden computar y derivar con **100% de exactitud matemática**:
1. **Cronogramas de Vaciados de Concreto (Mixer logístico y m³ por frente).**
2. **Curva S y Cronograma de Avance Valorizado.**
3. **Flujo de Caja Proyectado (Cash Flow), determinando la necesidad de adelantos, factoring y préstamos bancarios.**
4. **Auditoría de Volúmenes y Detección de Discrepancias de Unidades ($m^3$, $m^2$, $ml$).**

---

## 💡 2. Puntos Clave y Conversación Desarrollada

### A. La Base de Datos Maestra Relacional en JSON
* **Single Source of Truth (Fuente Única de la Verdad):** En lugar de crear un archivo separado para el presupuesto y otro para el cronograma, se alimenta un esquema JSON relacional donde cada actividad posee: `id_item`, `descripcion`, `wbs_nivel`, `metrado_presupuesto`, `unidad`, `costo_unitario`, `duracion_dias`, `volumen_concreto_m3`, `fecha_inicio`, `fecha_fin` y `dependencias`.
* **Trazabilidad Bidireccional:** El presupuesto cuantifica el costo y el alcance contractual, mientras que el cronograma temporaliza los recursos. El JSON permite auditar que todo sol gastado en el presupuesto tenga su reflejo exacto en el tiempo.

### B. Auditoría de Volúmenes y 4 Causas de Discrepancia
Durante la clase, al comparar los resultados generados por los alumnos (Juan José Gómez, Vladimir Vargas y Henry), surgieron discrepancias en los volúmenes totales calculados por la IA:
1. **Discrepancia de Unidades:** El estándar S10 presupuesta encofrados o muros en $m^2$, mientras que el pedido de concreto y el análisis de vaciado requieren $m^3$.
2. **Criterio de Descomposición EDT / WBS:** Segmentación por niveles (Sótanos 1 y 2, Pisos típicos) vs entregables consolidados.
3. **Elementos Prefabricados vs Vaciados in Situ:** Inclusión o exclusión de elementos especiales en la cubicación de mixer.
4. **Capacidad de Despacho y Ratios:** Asignación de camiones mixer ($8 m^3$ por mixer) y restricciones de jornada de vaciado.

### C. Generación de la Curva S y Cronograma de Vaciados
* A partir del JSON maestro, los scripts de Python ejecutados por el agente calculan la distribución temporal del gasto acumulado (Curva S) y el calendario exacto de vaciados de concreto por día y semana.
* Se analizaron los "saltos abruptos" en la Curva S causados por hitos concentrados de vaciado de losas y zapatas.

### D. Flujo de Caja (Cash Flow) y Estrategia Financiera
* **Simulación de Adelanto Directo y de Materiales:** Se calculó cuánto tiempo de operación cubre el adelanto inicial y en qué mes exacto se produce el desfase de liquidez.
* **Toma de Decisiones:** Con el reporte de Cash Flow derivado por la IA, el Residente y el Gerente de Proyecto pueden acudir a la Gerencia de Finanzas con semanas de anticipación para tramitar líneas de **Factoring** o financiamiento bancario, evitando paralizaciones de obra por falta de liquidez.

### E. Flujo de Trabajo con Agentes (Antigravity vs Codex vs ChatGPT)
* **Antigravity AI:** Utilizado para la ingeniería pesada de datos, lectura de directorios y ejecución de scripts Python deterministas en carpetas temporales (`scratch/`).
* **Codex / ChatGPT:** Utilizados para generación rápida de estructuras intermedias, dashboards HTML y visualizadores interactivos.

---

## 🛠️ 3. Biblioteca de Prompts Clave de la Sesión

### 🎯 Prompt 1: Generador de JSON Maestro Relacional de Obra
```text
Actúa como Ingeniero Senior de Control de Proyectos (Project Control). Analiza el siguiente listado de presupuesto y cronograma de obra. Construye una Base de Datos Maestra Relacional en formato JSON que contenga:
1. "metadata": nombre_proyecto, fecha_corte, moneda, plazo_dias, monto_contractual_soles.
2. "actividades": array de objetos con las propiedades: id, wbs, descripcion, unidad, metrado, precio_unitario, parcial_soles, duracion_dias, predecesoras, fecha_inicio, fecha_fin, volumen_concreto_m3, requiere_mixer (boolean).
3. Asegura estricta cuadratura matemática: suma de parciales = monto_contractual.
```

### 🎯 Prompt 2: Auditor de Discrepancias de Metrados y Unidades
```text
Actúa como Auditor Técnico de Costos y Cronogramas. Inspecciona la base de datos JSON del proyecto y genera un informe de auditoría identificando:
1. Partidas presupuestadas en m2 o unidades que requieren volumen de concreto en m3 para vaciado.
2. Cuantificación total de concreto clasificado por tipo de elemento (Zapatas, Columnas, Muros, Losas).
3. Número estimado de viajes de camión Mixer (considerando capacidad de 8 m3/mixer) y programa logístico recomendado.
```

### 🎯 Prompt 3: Generador de Flujo de Caja (Cash Flow) y Análisis de Adelanto
```text
Actúa como Controller Financiero de Construcción. A partir del cronograma valorizado mensual en JSON, elabora una proyección de Flujo de Caja (Cash Flow) que incluya:
1. Ingresos por valorización mensual (con descuento de amortización de adelanto y fondo de garantía 10%).
2. Egresos proyectados de obra (materiales, mano de obra, equipos y subcontratos).
3. Saldo mensual neto y saldo acumulado.
4. Determinación del punto crítico de déficit de liquidez y recomendación de monto y plazo para Factoring o línea de crédito.
```

---

## 🚀 4. Acuerdos y Próximos Pasos

- [x] **Consolidación del JSON Relacional:** Cada alumno completará la depuración de su archivo JSON maestro con datos reales de su proyecto.
- [x] **Validación de Volúmenes:** Realizar el chequeo cruzado de metrados en $m^3$ para evitar discrepancias con los despachos de concreto.
- [ ] **Próxima Sesión:** 
  - Automatización de Adquisiciones y Gestión de Subcontratos conectada al JSON Maestro.
  - Creación del Skill de Valorizaciones Automáticas en Excel institucional.

---
*Manual generado para la plataforma de alumnos de Project Control AI.*
