# 📝 GUÍA DEL ALUMNO Y AYUDA MEMORIA: SESIÓN 05
## CURSO: AGENTES DE IA (PRESUPUESTOS, EETT Y CRONOGRAMAS)

**Fecha de Sesión:** Domingo, 13 de Septiembre de 2026  
**Horario:** 10:00 a.m. - 01:00 p.m. (Duración: 3 horas)  
**Docente / Facilitador:** Ing. Aurelio Solórzano Ríos  
**Plataforma:** Zoom Sincrónico | Project Control AI  
**Participantes Destacados:** Reilly Espinoza, Juan José Gómez, Eber, Oswaldo Palacios, Glodomier Argamonte, Henry, Víctor.

---

## 📌 1. Resumen Ejecutivo de la Sesión

En esta quinta sesión del curso **Agentes de IA: Presupuestos, EETT y Cronogramas**, se consolidó el ciclo de vida de las **Especificaciones Técnicas (EETT) Trazables**, el empaquetamiento sistemático de **Agent Skills** (`.agents/skills/`) y se dio inicio a la transición metodológica hacia la formulación del **Presupuesto y Análisis de Precios Unitarios (APU) Trazables** en JSON, Presto y S10.

El Ing. Aurelio Solórzano Ríos estructuró la clase alrededor de cinco pilares fundamentales:
1. **La Auditoría de las 3 Opciones de Trabajo con IA:** Demostración de por qué subir PDFs o expedientes directos a la IA (Opción 1) es inaceptablemente riesgoso en ingeniería por pérdida silenciosa de tolerancias y parámetros; frente a la Opción 2 (formatos ligeros Markdown/JSON para obras de mediana envergadura) y la Opción 3 (Cerebro Digital con Grafos y Wikilinks para expedientes masivos y normativas de más de 1,000 páginas).
2. **Jerarquía de Profundidad en EETT:** Calibración de extensión técnica según la criticidad de la partida (Nivel 1: 800–1,200 palabras para elementos estructurales críticos como zapatas premezcladas con bomba y muros pantalla; Nivel 2: 450–700 palabras para partidas estándar; Nivel 3: 250–400 palabras para obras provisionales).
3. **Empaquetamiento Oficial de Agent Skills (`.agents/skills/`):** El principio innegociable de *capturar el aprendizaje del agente*: tras iterar y validar un estándar técnico, empaquetarlo en un Skill portable antes de apagar la computadora para garantizar reutilización en Antigravity, Claude Code o Codex.
4. **Compilación y Control de Calidad en Word con Python:** Depuración de artefactos de renderizado Markdown (signos de escape, dobles/triples asteriscos, tablas desalineadas) y aplicación de plantillas corporativas con carátula, hoja de firmas institucional y tabla de contenido.
5. **Transición al Presupuesto Trazable:** Demostración de que el presupuesto no nace de bases de datos estáticas o "copiar y pegar" del S10 tradicional, sino de la trazabilidad viva entre la Memoria Descriptiva, las EETT y cotizaciones reales del mercado auditadas en JSON.

---

## 💡 2. Puntos Clave y Conversación Desarrollada en Clase

### A. Evaluación Comparativa: Las 3 Opciones de Arquitectura
* **Opción 1 (Ingesta Directa de PDFs/Word):**
  * Consiste en adjuntar los PDFs escaneados o documentos Word a ChatGPT, Claude o Gemini y pedir la generación de entregables técnicos.
  * *Veredicto:* **Totalmente descartada por alto riesgo.** El modelo sufre degradación de atención en ventanas de contexto extensas, omite especificaciones clave de laboratorio (ensayos de probetas a 7, 14 y 28 días, asentamiento de slump) y alucina tolerancias que comprometen la responsabilidad legal del proyectista.
* **Opción 2 (Formato Ligero en Markdown y JSON):**
  * La información se estructura previamente en texto plano optimizado (Markdown) y datos clave estructurados (JSON).
  * *Veredicto:* **Recomendada para proyectos pequeños a medianos** (hasta 100–200 páginas). La IA comprende perfectamente la semántica y responde con agilidad y coherencia.
* **Opción 3 (Cerebro Digital con Grafos y Trazabilidad Estricta):**
  * Arquitectura con Bóvedas de 3 Pilares, Wikilinks (`[[nodo]]`) y Matriz de Trazabilidad WBS-Norma-Plano.
  * *Veredicto:* **Obligatoria para expedientes técnicos reales.** Solo la normativa peruana (RNE E.020, E.030, E.050, E.060, G.050) supera las 1,000 páginas; la Opción 3 asegura trazabilidad matemática y respaldo normativo inexpugnable.

### B. Niveles de Criticidad y Extensión Técnica en EETT
* **Regla de Proporcionalidad Técnica:** Dedicar 1,200 palabras a describir un cerco provisional de malla rachel es ineficiente; en contraparte, describir una zapata de concreto premezclado o un muro pantalla en 300 palabras compromete la seguridad estructural de la obra.
* **Clasificación Canónica:**
  1. **Nivel 1 (Alta Descripción - Críticas):** 800 a 1,200 palabras. Elementos estructurales masivos, cimentaciones profundas, cisternas, cuartos de bombas y losas postensadas.
  2. **Nivel 2 (Descripción Estándar):** 450 a 700 palabras. Tabiquería, acabados arquitectónicos, instalaciones sanitarias y eléctricas estándar.
  3. **Nivel 3 (Sintética - Apoyo Menor):** 250 a 400 palabras. Limpieza del terreno, trazo inicial, cartel de obra y cerramientos perimétricos temporales.

### C. Caso Práctico Desarrollado: Partida 05.01 Zapatas y Partida 06.05 Cuarto de Bombas
* Se auditó la partida **05.01: Zapata - Concreto Premezclado f'c = 280 kg/cm² vaciado con bomba telescópica**:
  * Delimitación en sótanos (-5.00 a -5.80 m de cota de cimentación).
  * Inclusión de prohibición expresa: *“Queda terminantemente prohibida la elaboración de concreto en obra mediante mezcladoras tipo trompo; todo concreto estructural provendrá de planta industrial dosificadora”*.
  * Vinculación obligatoria a láminas estructurales y estudio geotécnico (capacidad portante $q_{adm}$).
* Juan José Gómez presentó la partida **06.05: Cuarto de Bombas - Estructura Monolítica de Concreto Premezclado**, destacando la inclusión de criterios de impermeabilización integral y vibrado por capas.

### D. Empaquetamiento de Conocimiento en Agent Skills (`.agents/skills/`)
* **El Problema del Conocimiento Efímero:** Al interactuar con el agente en un IDE (Antigravity, Codex, Claude Code), tras múltiples ciclos de prueba-error, el agente logra comprender el estándar corporativo. Si se apaga la máquina o se cierra la sesión sin empaquetar, ese entrenamiento se pierde.
* **La Solución Metodológica:**
  * Crear la estructura `.agents/skills/skill_especificaciones_tecnicas/` con su correspondiente `SKILL.md` (metadata, prompts, reglas de validación y plantillas).
  * Esta carpeta se convierte en un activo de ingeniería portable: se puede transferir a cualquier proyecto, repositorio o estación de trabajo sin reconfigurar prompts desde cero.

### E. Compilación y Control de Calidad en Word (Python-docx)
* **Revisión del Trabajo de Alumnos:**
  * Reilly Espinoza presentó un volumen consolidado de **348 páginas de EETT**.
  * El facilitador enfatizó: si bien el agente puede compilar 78 partidas en 3 minutos, la ingeniería responsable exige revisión incremental (1 a 1) o auditorías cruzadas entre agentes (ej. generar en Antigravity y auditar con Codex o Claude).
* **Filtros de Saneamiento con Scripts:**
  * Al compilar de Markdown a Word (`.docx`), suelen filtrarse asteriscos (`**`, `***`), caracteres de escape o renderizados defectuosos de fórmulas.
  * Se implementaron scripts en Python para sanear la tipografía, ajustar el interlineado a 1.5 líneas, aplicar carátula con metadatos oficiales y generar la hoja de firmas colegiadas (CIP).

### F. Transición hacia el Presupuesto Trazable y APUs
* **¿Quién Alimenta al Presupuesto?**
  * La base del presupuesto son la **Memoria Descriptiva** y las **Especificaciones Técnicas**. Los estudios básicos (suelos, topografía) ya deben estar absorbidos dentro de las EETT.
* **Mito del S10 Tradicional vs Agentes de IA:**
  * Tradicionalmente se recurría a bases de datos históricas de S10 o revistas de costos donde el 70% era estático y el 30% se ajustaba manualmente (muchas veces arrastrando cuadrillas obsoletas de mezcladoras manuales de hace 20 años).
  * Con Agentes de IA, el análisis se vuelve 90% automatizado y 10% de validación experta: el agente lee las EETT, extrae el equipo real especificado (bomba telescópica vs estacionaria, mixer de $8\text{ m}^3$) y vincula cotizaciones web actualizadas.
* **Regla Innegociable de Auditoría:**
  * Nunca pedir a la IA que "invente" un costo unitario sin darle la fuente de datos.
  * Todo presupuesto debe modelarse primero en un **JSON Maestro Integrado**, auditarse matemáticamente y finalmente exportarse a Excel en formatos estándar de la industria: **S10** y **Presto**.

---

## 🛠️ 3. Biblioteca de Prompts Clave de la Sesión

### 🎯 Prompt 1: Calibrador de Criticidad y Redacción de EETT
```text
Actúa como Ingeniero Senior de Especificaciones Técnicas y Coordinador de Control de Proyectos.
Analiza la partida contractual seleccionada dentro del expediente del proyecto:
[INDICAR CÓDIGO Y NOMBRE DE PARTIDA, ej: 05.01 ZAPATAS CONCRETO PREMEZCLADO F'C=280 KG/CM2]

Determina su nivel de criticidad según el estándar del proyecto:
- Nivel 1 (Crítica / Estructural): 800 a 1,200 palabras.
- Nivel 2 (Estándar / Acabados): 450 a 700 palabras.
- Nivel 3 (Sintética / Auxiliar): 250 a 400 palabras.

Redacta la especificación técnica en Markdown cumpliendo rigurosamente las 8 secciones canónicas:
1. Objetivo técnico y delimitación espacial (cotas, niveles de cimentación y exclusiones).
2. Especificaciones de materiales (certificaciones de calidad, RNE y normas ASTM).
3. Equipos y maquinaria (especificación de bombas de impulsión, mixers y vibradores).
4. Procedimiento constructivo secuencial y logística de vaciado.
5. Control de calidad y ensayos críticos (muestreo de probetas a 7, 14 y 28 días, revenimiento/slump).
6. Tolerancias dimensionales y criterios de rechazo de mezclas.
7. Seguridad y salud en el trabajo (SST - DS 011-2019-TR y RNE G.050).
8. Método de medición y bases de pago según la unidad contractual oficial.
```

### 🎯 Prompt 2: Empaquetador de Agent Skill Oficial
```text
Actúa como Arquitecto de Agentes y Especialista en Metodología Antigravity.
Toma la configuración, prompts validados y reglas de control de calidad aplicadas en la sesión actual y compila un Agent Skill oficial y portable.

Crea dentro de la carpeta '.agents/skills/skill_especificaciones_tecnicas/' el archivo SKILL.md con la siguiente estructura:
1. YAML frontmatter con nombre, descripción clara y lista de herramientas requeridas.
2. Directivas de ejecución paso a paso para la generación de EETT trazables.
3. Reglas de saneamiento de Markdown a Word para eliminar caracteres residuales (** y ***).
4. Esquema relacional de validación contra el JSON maestro de presupuesto.
```

### 🎯 Prompt 3: Compilador de EETT a Documento Word Profesional
```text
Actúa como Desarrollador de Automatización Documental en Python.
Desarrolla un script con la librería python-docx que tome todos los archivos Markdown de especificaciones técnicas de la carpeta de trabajo y genere un documento Word (.docx) profesional de entrega oficial.

Requisitos del entregable:
1. Carátula institucional con datos del proyecto, ubicación, cliente y consultor.
2. Hoja oficial de firmas y sellos para profesionales responsables (Especialista en Estructuras, Residente, Supervisor).
3. Tabla de contenido e índice general paginado automáticamente.
4. Aplicación de paleta corporativa y tipografía estandarizada (interlineado 1.5).
5. Filtro de depuración para suprimir caracteres residuales de escape o asteriscos de Markdown.
```

### 🎯 Prompt 4: Formulador de APUs y Presupuesto Trazable en JSON y Excel
```text
Actúa como Ingeniero de Costos y Presupuestos Senior.
A partir de la Memoria Descriptiva, las Especificaciones Técnicas y la Matriz WBS consolidadas:
1. Genera los Análisis de Precios Unitarios (APU) para las 78 partidas del proyecto.
2. Modela los rendimientos y cuadrillas considerando los equipos reales especificados en las EETT (suministro con mixer y bomba de concreto, sin elaboración manual).
3. Integra cotizaciones reales de insumos y tarifas oficiales de mano de obra (CAPECO / Construcción Civil).
4. Estructura el entregable en un JSON Maestro Integrado con auditoría de consistencia matemática.
5. Exporta el presupuesto estructurado a hojas de cálculo Excel profesional en formatos compatibles con S10 y Presto.
```

---

## 📋 4. Asignaciones y Tareas para el Alumno

1. **Revisión de Grabación Sincrónica:** Repasar la grabación oficial en la plataforma para verificar los detalles de calibración de EETT y uso de scripts.
2. **Empaquetado de Skill Personal:** Crear en su entorno de trabajo local la carpeta `.agents/skills/` y registrar el Skill de Especificaciones Técnicas validado.
3. **Entrega de Presupuesto Preliminar en Excel y JSON:**
   - Formular los APUs y presupuesto integral de estructuras según el plan de trabajo compartido en clase.
   - Enviar por los canales oficiales el archivo JSON auditado y el Excel en formato compatible S10/Presto.
4. **Preparación para la Sesión 06:** Instalar y verificar entornos de análisis de datos para el cierre de presupuestos y generación de curvas de valor ganado (EVM).

---
*Project Control AI &copy; 2026 - Academia de Ingeniería y Control de Proyectos con Inteligencia Artificial.*
