# GUÍA DE PROMPTS — SESIÓN 02: PRESUPUESTO EN FORMATO PRESTO (USD), ANÁLISIS DE PRECIOS UNITARIOS (APU), LISTADO DE INSUMOS Y METRADOS CON IA

> **Curso:** Agente de IA: Presupuesto y programación (Domingos 10:00 a.m. a 1:00 p.m.)  
> **Sesión:** Sesión 02 (01/11/2026)  
> **Propósito:** Prompt maestro y flujo de trabajo utilizados en clase (con Claude / Agentes de IA) para analizar la carpeta integral de un proyecto de construcción (WBS, metrados, especificaciones técnicas y fuentes de costos), estructurar el presupuesto en formato **JSON** con sus **Análisis de Precios Unitarios (APU)** y **Listado de Insumos**, y generar el entregable en **Excel (`.xlsx`) con fórmulas dinámicas en formato Presto y en dólares (USD)**.

---

## 📌 Prompt Maestro: Generación de Presupuesto en JSON (con APU e Insumos) y Entregable en Excel Formato Presto en Dólares (USD)

Usa este prompt apuntando a la carpeta de trabajo del proyecto (que contiene el WBS, metrados, especificaciones técnicas y cotizaciones/parámetros):

```text
Dentro de la carpeta se encuentra la información de un proyecto de construcción, incluyendo el WBS, metrados, especificaciones técnicas y demás. Analiza todo el proyecto y genera un presupuesto en formato JSON, incorporando los análisis de PU y el listado de insumos. Además, crea un entregable en Excel con fórmulas dinámicas; el presupuesto debe estar en formato Presto y en dólares.
```

---

## 📌 Prompt Complementario: Extracción y Cuadratura de Metrados de Acero por Piso (`Metrado_Acero_Pisos_3_y_4.xlsx`)

Usa este prompt cuando necesites auditar o desglosar específicamente el metrado de acero corrugado $f_y = 4200\text{ kg/cm}^2$ por niveles, elementos estructurales y diámetros:

```text
Analiza la información de metrados y planos/memorias estructurales del proyecto y genera un libro en Excel (Metrado_Acero_Pisos_3_y_4.xlsx) con el desglose detallado del acero de refuerzo para los Pisos 3 y 4 por elemento estructural, diámetro de barra, longitud, número de piezas y peso total en kg, utilizando fórmulas dinámicas verificables.
```

---

## 🧭 Estructura Esperada de los Entregables Generados por el Agente

1. **Modelo Relacional del Presupuesto (`.json`):**
   - `metadata_proyecto`: Nombre del proyecto, moneda (`USD`), tipo de cambio referencial, jornada laboral (`8 h/día`) y fecha base.
   - `presupuesto_wbs`: Capítulos y partidas alineados al 100 % con la WBS maestra (`unidad`, `metrado`, `costo_unitario_usd`, `parcial_usd`).
   - `analisis_precios_unitarios` (`APU`): Desglose por partida de **Mano de Obra (MO)**, **Materiales (MAT)**, **Equipos y Herramientas (EQ)** y **Subcontratos (SC)** con rendimientos diarios, cuadrillas, cantidades unitarias y precios en USD.
   - `listado_insumos`: Catálogo consolidado de todos los recursos del proyecto (cantidades totales requeridas, precio unitario en USD y monto parcial conciliado con el Costo Directo).
2. **Libro de Trabajo en Excel (`.xlsx` — Formato Presto en USD con Fórmulas Vivas):**
   - **Hoja `Presupuesto (Formato Presto)`:** Jerarquía por capítulos y partidas con columnas `Código`, `Nat` (Capítulo / Partida), `Ud`, `Resumen / Descripción`, `CanPres` (Metrado), `PrPres` (Precio Unitario en USD referenciado al APU con `=`) e `ImpPres` (`=CanPres*PrPres`), más pie de presupuesto (Costo Directo, Gastos Generales, Utilidad, Subtotal, IGV y Presupuesto Total en USD).
   - **Hoja `APUs`:** Fichas completas de Análisis de Precios Unitarios vinculadas dinámicamente al catálogo de insumos y rendimientos.
   - **Hoja `Insumos / Recursos`:** Listado maestro de recursos agrupados por naturaleza (Mano de Obra, Materiales, Equipos, Subcontratos) cuya suma cuadra exactamente con el Costo Directo del presupuesto.
