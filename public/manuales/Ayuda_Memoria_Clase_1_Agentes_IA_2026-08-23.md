# 📝 AYUDA MEMORIA: SESIÓN 01 - AGENTES DE IA (PRESUPUESTOS, EETT Y CRONOGRAMAS)
**Fecha:** Domingo, 23 de Agosto de 2026  
**Horario:** 10:00 a.m. - 01:12 p.m. (3 horas 12 minutos)  
**Docente / Facilitador:** Ing. Aurelio Solórzano Ríos  
**Plataforma:** Zoom Sincrónico | Project Control AI  
**Participantes Destacados:** Oswaldo Palacios, Pavel Loyola, Alumnos de la cohorte.

---

## 📌 1. Resumen Ejecutivo de la Sesión

En esta primera sesión del curso **Agentes de IA: Presupuestos, EETT y Cronogramas**, se sentaron las bases operativas e ingenieriles para la integración de agentes de Inteligencia Artificial locales y en la nube en los procesos de estimación de costos, especificaciones técnicas y programación de obras.

El Ing. Aurelio Solórzano inició con una comparativa técnica entre los distintos agentes de IA disponibles en el mercado (**Antigravity, Codex, Open Code, Claude**), fundamentando por qué **Antigravity** es la herramienta principal recomendada para ingeniería de construcción debido a su baja tasa de saturación de tokens y su capacidad para procesar proyectos de gran volumen sin interrupciones.

Durante la clase se realizaron demostraciones prácticas de conversión de documentación pesada de construcción (revistas de costos y presupuestos en PDF) a formatos estructurados ligeros (**Markdown .md y JSON**), explicando la razón por la cual los LLMs procesan de forma mucho más ágil y exacta los datos planos estructurados en comparación con los PDFs estáticos. Finalmente, se abrió un debate técnico sobre la creación de **Skills personalizadas** y scripts de Python para hacer que los presupuestos generados por IA dejen de ser genéricos y se vuelvan predecibles y matemáticamente exactos.

---

## 💡 2. Puntos Clave y Conversación Desarrollada

### A. Ecosistema de Agentes de IA y Gestión de Tokens
* **Antigravity como Entorno Principal:** El Ing. Aurelio destacó que Antigravity proporciona un amplio contexto de tokens, permitiendo trabajar durante semanas sin agotar la cuota, a diferencia de Claude donde la cuota suele agotarse en 3 a 4 días.
* **Agentes Secundarios:**
  * **Codex (OpenAI / ChatGPT):** Útil para tareas específicas de refactorización y lógica rápida.
  * **Open Code:** Alternativa 100% gratuita para automatizaciones secundarias.
* **Instalación Local vs Servidores Nube:** Aunque la interfaz corre en la máquina local, el procesamiento se conecta a los modelos optimizados de servidor, ofreciendo velocidad y control del espacio de trabajo.

### B. Notificaciones, Modos de Confirmación y Antigravity 2.0
* **Consulta de Oswaldo Palacios:** Preguntó sobre las notificaciones constantes en inglés y cómo gestionar el nivel de intervención de la IA.
* **Solución del Ing. Aurelio:**
  * Configurar la opción **3** en la notificaciones para reducir la frecuencia de preguntas interactivas y permitir que la IA trabaje con mayor autonomía.
  * Explicación de la diferencia entre **Antigravity 1.0** y **Antigravity 2.0**: Antigravity 1 permite visualizar en tiempo real todos los archivos y código que la IA va construyendo en el espacio de trabajo, lo cual genera mayor transparencia en la ingeniería de datos.

### C. Estructuración de Datos: De PDF a Markdown (.md) y JSON
* **Demostración Práctica:** Se mostró la conversión completa de una revista de costos en PDF a formato Markdown (`.md`).
* **Ventaja para los LLM:** Para un modelo de lenguaje, un PDF equivale a un documento impreso pesado; en cambio, el formato Markdown y JSON son ultra ligeros, permitiendo búsquedas instantáneas, análisis de partidas y extracción automática de precios unitarios sin alucinaciones.

### D. Presupuestos Reales vs Enfoque Flexible (Caso Pavel Loyola)
* **Intervención de Pavel Loyola:** Propuso trabajar sobre presupuestos reales de proyectos (ej. colegios u obras públicas) comenzando desde un PDF/Excel para llegar a un presupuesto meta.
* **Respuesta del Ing. Aurelio:** Confirmó que en el curso se abordarán casos reales, pero enfatizó que lo fundamental es dominar la flexibilidad de las estructuras JSON. Al dominar JSON, el ingeniero puede adaptar el flujo de IA a cualquier tipo de obra (edificaciones, carreteras, saneamiento o colegios).

### E. Creación de Skills y Scripts de Python (Hoja de Ruta Próxima Clase)
* **De Prompting "Torpe" a Automatización Fina:** Inicialmente, pedirle a una IA que haga un presupuesto directo por texto produce resultados aproximados o "torpes".
* **Creación de Skills:** La solución profesional radica en rescatar el conocimiento de la IA y encapsularlo en **Skills** y scripts en **Python** (usando librerías como `pandas`, `openpyxl`, `xlsxwriter`). Estos scripts fuerzan cálculos exactos de APUs y presupuestos sin errores de suma.

---

## 🛠️ 3. Herramientas y Tecnologías Mencionadas

1. **Antigravity (Google DeepMind):** Entorno principal de desarrollo con agentes de código.
2. **Codex / ChatGPT (OpenAI):** Agente de asistencia rápida en programación.
3. **Open Code:** Herramienta open-source de soporte.
4. **Markdown (.md):** Formato ligero de marcado de texto para bases de conocimiento.
5. **JSON (JavaScript Object Notation):** Formato estándar para estructuración de presupuestos, metrados y listas de partidas.
6. **Python (`openpyxl`, `xlsxwriter`):** Lenguaje para automatización de hojas de cálculo ejecutivas de presupuestos.

---

## 🚀 4. Acuerdos y Próximos Pasos (Tarea para el Próximo Domingo)

- [x] **Descarga e Instalación:** Los alumnos completarán la instalación local de Antigravity en sus equipos.
- [x] **Configuración:** Ajustar el nivel de confirmación de planes (Opción 3) para trabajo fluido.
- [ ] **Próxima Clase (Domingo 30 de Agosto):** 
  - Inicio de la elaboración práctica de un presupuesto con IA.
  - Creación paso a paso del primer **Skill en Python** para cálculo exacto de Análisis de Precios Unitarios (APUs).

---
*Documento generado automáticamente por Antigravity AI para la plataforma de alumnos de Project Control AI.*
