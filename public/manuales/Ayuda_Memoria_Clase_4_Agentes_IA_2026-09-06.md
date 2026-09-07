# 📝 GUÍA DEL ALUMNO Y AYUDA MEMORIA: SESIÓN 04
## CURSO: AGENTES DE IA (PRESUPUESTOS, EETT Y CRONOGRAMAS)

**Fecha de Sesión:** Domingo, 06 de Septiembre de 2026  
**Horario:** 
- Parte 1 (09:55 a.m. - 10:21 a.m. | 26 min)
- Parte 2 (10:24 a.m. - 01:00 p.m. | 2 horas 36 min)  
**Docente / Facilitador:** Ing. Aurelio Solórzano Ríos  
**Plataforma:** Zoom Sincrónico | Project Control AI  
**Participantes Destacados:** Henry, Pavel Loyola, Joel Bernaola, Oswaldo Palacios, Sergio Quispe, Glodomier Argamonte, Reilly Espinoza, Noé, Miriam.

---

## 📌 1. Resumen Ejecutivo de la Sesión

En esta cuarta sesión del curso **Agentes de IA: Presupuestos, EETT y Cronogramas**, se abordó la arquitectura y construcción integral del **Cerebro Digital de Proyecto** mediante la metodología de **Bóvedas de 3 Pilares y Grafos de Conocimiento (Obsidian / Markdown / Wikilinks)**, orientada a la **generación automatizada y rigurosamente trazable de Especificaciones Técnicas (EETT)** y matrices WBS.

El Ing. Aurelio Solórzano profundizó en resolver dos grandes retos de ingeniería:
1. **La pérdida de trazabilidad en presupuestos masivos:** Análisis del caso real de un proyecto de carretera de **S/. 283 Millones** recibido en PDF (generado en Presto), demostrando por qué no se debe pedir a la IA una conversión directa a ciegas, sino estructurar primero la jerarquía de relaciones (Partida ➔ Subpartida ➔ APU ➔ Insumo) garantizando cuadratura matemática en JSON antes de exportar a Excel.
2. **El flujo estratégico de Control de Proyecto Diario:** La conversión de reportes de campo heterogéneos (avance físico, tareo, almacén, maquinaria y subcontratas) a Markdown diario y su integración en un **JSON Maestro Acumulativo** para auditoría del Valor Ganado (EVM: PV vs EV vs AC) por cuadrilla o frente específico.
3. **Construcción del Cerebro Digital de 3 Pilares en Obsidian:** Integración de los documentos de ingeniería (estudios geotécnicos, planos y memorias) con la biblioteca normativa peruana (RNE E.050, E.060, E.020, E.030, DS 011-2019-TR) para alimentar agentes en **Antigravity**, **Claude Code** y **Codex**.
4. **Generación Trazable de EETT:** Matriz canónica de **13 capítulos y 78 partidas**, con elaboración secuencial (1 a 1) en 8 secciones técnicas estandarizadas para evitar alucinaciones y omisiones de tolerancias críticas.

---

## 💡 2. Puntos Clave y Conversación Desarrollada en Clase

### A. Trazabilidad Matemática en Grandes Presupuestos (Caso S/. 283 Millones)
* **El Problema del PDF No Nativo:** Un cliente/alumno recibió un expediente de carretera de más de S/. 283 Millones en PDF. La empresa proyectista no entregó los nativos de Presto o S10. Al intentar convertirlo directo a JSON con prompts genéricos, surgieron discrepancias matemáticas repetitivas.
* **La Solución Metodológica:**
  1. *Paso 1:* Instruir a la IA a leer la información sin crear JSON todavía. Comprender y definir la taxonomía: Partida contractual, Subpartida técnica, Rendimiento/Cuadrilla de APU y Recursos unitarios.
  2. *Paso 2:* Formular las reglas de cuadratura: la sumatoria de costos parciales de insumos debe igualar el Costo Directo de la partida y el costo total del presupuesto.
  3. *Paso 3:* Una vez auditado y validado en JSON, compilar el archivo Excel con fórmulas nativas vivas (`SUM`, `PRODUCT`), no números fijos.

### B. Flujo Diario de Control de Obras: Markdown + JSON Acumulativo
* **¿Markdown o JSON para los reportes diarios?**
  * **Markdown:** Es el formato ideal de captura inicial a las 6:00 - 7:00 p.m., ya que registra fielmente el texto del tareador, almacenero, operador de equipo y contratista sin fricción.
  * **JSON Acumulativo:** El agente procesa el Markdown del día y actualiza un único JSON maestro acumulativo de obra.
* **Trazabilidad EVM (Earned Value Management) por Frente:**
  * **Earned Value (EV):** Metrados ejecutados validados por el ingeniero de campo.
  * **Actual Cost (AC):** Costos reales consolidados del tareador (HH), almacén (materiales), maquinaria (HM) y facturas de subcontratos.
  * **Planned Value (PV):** Cronograma de línea base programado.
  * *Ventaja de los Agentes:* En lugar de esperar 4 días a fin de mes para detectar pérdidas globales, el agente identifica en segundos cuál frente (ej. vaciado de zapatas vs muros) o qué capataz específico está rindiendo bajo la línea base.

### C. La Realidad de Obsidian: Mito vs Metodología
* **Desmitificación Visual:** Obsidian es una herramienta visual (vista gráfica de nodos). La aplicación en sí no hace la ingeniería ni reemplaza al agente.
* **El Verdadero Valor (La Metodología de Grafos):** Lo potente es la estructuración interna de **Wikilinks (`[[nodo]]`)** y carpetas interconectadas:
  * **Pilar 1 (Documentos del Proyecto):** Estudios de suelos, planos de replanteo, memorias descriptivas.
  * **Pilar 2 (Biblioteca Normativa):** RNE (E.050, E.060, E.020, E.030), normas de seguridad y manuales MTC.
  * **Pilar 3 (Grafo de Especificaciones Técnicas y WBS):** Nodos relacionales que vinculan cada actividad con su sustento legal y normativo.
* **Optimización del Context Window:** No sobrecargar el modelo con miles de páginas de planos o estudios geológicos completos; se deben extraer resúmenes ejecutivos y tablas de parámetros clave (cotas, tolerancias, resistencias, capacidad portante) en Markdown de pocos kilobytes.

### D. Matriz Canónica de 78 Partidas y 13 Capítulos
* Se estructuró el proyecto de edificación educativa (6 pisos, 2 sótanos y azotea) en una matriz en Excel y JSON con columnas independientes:
  1. `Item_WBS` y `Descripcion_Partida`
  2. `Metrado` y `Unidad` (S10)
  3. `Criterio_Memoria_Descriptiva` (alcance y logística de faena)
  4. `Estudio_Basico_Fuente` (parámetros geotécnicos, cotas de cimentación)
  5. `Plano_Referencia` (lámina, escala y detalles)
  6. `Normativa_Tecnica_Vinculante` (artículos específicos del RNE y decretos supremos)
  7. `Procedimiento_Constructivo_Detallado`
  8. `Requisitos_Seguridad_SST` (EPPs, protocolos DS 011-2019-TR y RNE G.050)

### E. Estrategia de Redacción de Especificaciones Técnicas (EETT)
* **Regla de Oro:** **Generación Incremental (1 a 1)**.
  * Si se solicita a la IA generar 50 o 200 páginas en un solo prompt masivo, la IA tiende a condensar, generalizar, obviar tolerancias y alucinar.
  * La generación iterativa supervisada asegura que cada partida cumpla rigurosamente las **8 secciones canónicas**.
* **Las 8 Secciones Obligatorias de una EETT de Alta Ingeniería:**
  1. *Descripción y Delimitación Espacial de la Partida.*
  2. *Especificaciones de Materiales Certificados.*
  3. *Equipos, Maquinaria y Herramientas Requeridas.*
  4. *Procedimiento Constructivo Paso a Paso.*
  5. *Control de Calidad y Ensayos Críticos de Recepción.*
  6. *Tolerancias Dimensionales y Parámetros de Aceptación/Rechazo.*
  7. *Seguridad, Salud en el Trabajo y Medio Ambiente (SST).*
  8. *Método de Medición y Base de Pago.*

---

## 🛠️ 3. Biblioteca de Prompts Clave de la Sesión

### 🎯 Prompt 1: Configuración del Cerebro Digital de 3 Pilares en Obsidian
```text
Actúa como Arquitecto de Información Técnica, Coordinador BIM Documental y Especialista en Normativas de Construcción. 
Construye desde cero el CEREBRO DIGITAL para elaborar las Especificaciones Técnicas del proyecto.

Dispones exclusivamente de dos fuentes de entrada:
- Carpeta 1: Documentos Técnicos del Proyecto (memorias descriptivas, estudios básicos, planos de ingeniería).
- Carpeta 2: Biblioteca Normativa Técnica (RNE, normas técnicas peruanas y seguridad SST).

Reglas Innegociables:
1. Trata las entradas como solo lectura; no alteres los originales.
2. Estructura un baúl canónico de Obsidian organizado en 3 Pilares:
   - Pilar 1: Documentos del Proyecto indexados y resumidos en Markdown.
   - Pilar 2: Biblioteca Normativa con extracción de artículos vinculantes.
   - Pilar 3: Grafo de Conocimiento y Nodos Relacionales con Wikilinks [[nodo]].
3. Realiza inventario, depuración de archivos huérfanos y auditoría de vínculos cruzados.
```

### 🎯 Prompt 2: Matriz de Trazabilidad Integral (WBS, Planos y Normas)
```text
Actúa como Ingeniero Senior de Costos y Especificaciones Técnicas.
A partir del Cerebro Digital estructurado, genera una Matriz Canónica de Trazabilidad Integral en formato JSON y Excel profesional (formato S10).

La matriz debe contener 13 capítulos y 78 partidas de estructuras con columnas estrictamente independientes:
1. Item y Código WBS
2. Descripción de Partida
3. Unidad y Metrado Contractual
4. Criterio técnico extraído de la Memoria Descriptiva
5. Parámetros del Estudio Básico / Geotécnico fuente (cota cimentación, q_adm, tipo suelo)
6. Referencia de Lámina y Plano de Detalle
7. Norma Técnica Vinculante (Código y artículo específico)
8. Procedimiento Constructivo
9. Requisitos de Seguridad y Control de Calidad (DS 011-2019-TR / G.050)
```

### 🎯 Prompt 3: Generador Incremental de Especificaciones Técnicas (8 Secciones)
```text
Actúa como Ingeniero Supervisor y Proyectista Principal de Estructuras.
Utilizando el Cerebro Digital y la Matriz de Trazabilidad, elabora la Especificación Técnica para la partida:
[INDICAR CÓDIGO Y PARTIDA, ej: 01.01 Movilización y Desmovilización de Maquinaria]

Estructura obligatoria en Markdown en 8 secciones:
1. Delimitación espacial y alcance operativo de la faena.
2. Especificaciones de materiales e insumos (certificaciones requeridas).
3. Equipos y maquinaria pesada asignada (tonelaje, capacidad y estado).
4. Procedimiento constructivo paso a paso.
5. Controles de calidad y ensayos de laboratorio exigidos.
6. Tolerancias dimensionales y criterios de aceptación/rechazo.
7. Disposiciones de Seguridad, Salud y Medio Ambiente (SST).
8. Método de medición y condiciones para la base de pago.

Desarrolla el contenido con rigor técnico de obra real, sin textos genéricos ni omisiones.
```

### 🎯 Prompt 4: Empaquetador de Skill Portable de Cerebro Digital
```text
Actúa como Ingeniero de Automatización de Inteligencia Artificial.
Con el conocimiento y flujo de trabajo consolidado en esta sesión, empaqueta un SKILL PORTABLE en una carpeta independiente denominada 'cerebro_digital_eett'.

El Skill debe contener:
1. SKILL.md con YAML frontmatter, descripción operativa, directivas de auditoría de entradas y reglas de salida.
2. Scripts de Python auxiliares para indexación de carpetas, generación de Wikilinks y exportación a Excel profesional.
3. Templates de matrices de trazabilidad y prompts estandarizados para ser reutilizados en cualquier nuevo proyecto de edificación, saneamiento o viales.
```

---

## 🚀 4. Acuerdos y Próximos Pasos para los Alumnos

- [x] **Configuración de Bóveda:** Vincular Obsidian a la carpeta del proyecto y verificar la vista gráfica depurada (sin archivos huérfanos).
- [x] **Matriz de Trazabilidad:** Validar que su archivo Excel contenga las 78 partidas vinculadas a normativas y planos.
- [ ] **Asignación Obligatoria:** Redactar **05 Especificaciones Técnicas en Word (.docx)** con diseño profesional de empresa (encabezado, pie de página, logotipo y las 8 secciones canónicas).
- [ ] **Próxima Sesión:** 
  - Automatización de Presupuestos y APU mediante Skills de Python en Antigravity y Codex.
  - Empaquetado definitivo de Skills de Cronogramas vinculados a MS Project.
- [ ] **Nuevo Inicio de Curso:** Domingo 20 de Septiembre de 2026 (Horario: 3:00 p.m. - 6:00 p.m.).

---
*Manual pedagógico oficial para la plataforma de alumnos de Project Control AI.*
