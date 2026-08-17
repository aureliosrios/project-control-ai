# MANUAL MAESTRO DE INGENIERÍA DE PROMPTS
## Curso: Agentes de IA: Presupuestos, EETT y Cronogramas
### Material de Soporte - Clase 1 (16/08/2026)

Este manual contiene las directrices, marcos de trabajo (frameworks) y plantillas de prompts optimizados para ingeniería civil, control de proyectos y presupuestos. Está diseñado para ser utilizado tanto en clientes premium en la nube como en entornos locales y libres (**Codex** y **Openco**).

---

## 1. El Concepto Clave: Estructurar es Poder
En la gestión de proyectos de construcción tradicionales, el flujo de información suele ser caótico: actas de obra en texto, especificaciones en Word sin jerarquías, presupuestos en PDFs estáticos. 

Para que un **Agente de IA** pueda procesar esta información, automatizar tareas y generar análisis, debemos migrar del texto informal a **tres formatos clave**:
1. **Markdown (`.md`)**: Excelente para la jerarquía visual y redacción de EETT.
2. **JSON (`.json`)**: El estándar para la manipulación y transferencia de datos estructurados (partidas, metrados, insumos).
3. **HTML (`.html`)**: Para construir reportes interactivos, visores de cronogramas y páneles dinámicos.

---

## 2. Diferencia Crítica: Modelos Cloud vs. Modelos Locales (Openco)

Cuando interactúes con agentes de IA, debes entender qué tipo de motor de lenguaje estás utilizando:

| Característica | Modelos Cloud Premium (Antigravity / Claude / GPT-4o) | Modelos Libres / Locales (Openco / DeepSeek / Qwen) |
| :--- | :--- | :--- |
| **Ventaja** | Alto entendimiento del contexto, tolerancia a prompts cortos o vagos, razonamiento avanzado. | 100% gratuito, confidencialidad total de los datos de tu empresa. |
| **Desventaja** | Pago por suscripción / consumo de tokens en la nube. | Mayor propensión a "alucinar" o saltarse restricciones si el prompt es ambiguo. |
| **Estrategia de Prompt** | **Conversacional e Instructivo**: Se le puede dar una directriz general y refinar sobre la marcha. | **Súper Estructurado y Restrictivo**: Requiere delimitadores (`###`), roles explícitos y restricciones negativas claras. |

---

## 3. El Framework "C.R.I.E.D" para Construcción
Para redactar prompts infalibles en entornos libres como **Openco**, utiliza siempre la estructura **C.R.I.E.D**:

1. **C - Contexto**: Define el alcance del proyecto (ej: "Vivienda unifamiliar de 2 pisos, 100 m² por piso").
2. **R - Rol**: Define el perfil experto de la IA (ej: "Actúa como un Ingeniero de Presupuestos experto en formato S10").
3. **I - Input (Entrada)**: Delimita la información que debe procesar usando etiquetas claras (ej: `[TEXTO DE ENTRADA] ... [/TEXTO DE ENTRADA]`).
4. **E - Entregable (Output)**: Especifica el formato exacto de salida (ej: "JSON estructurado con llaves específicas").
5. **D - Directrices Críticas (Restricciones)**: Reglas que la IA no debe romper bajo ninguna circunstancia (ej: "No agregues introducciones, escribe únicamente el bloque de código").

---

## 4. Plantillas de Prompts de Clase 1

### A. Generación de Lista de Actividades y WBS (WBS/EDT)
Este prompt genera una estructura de descomposición del trabajo (EDT/WBS) limpia en formato JSON para estimaciones preliminares.

```text
Actúa como un Gerente de Control de Proyectos y Planificador Senior.
Genera la Estructura de Descomposición del Trabajo (EDT/WBS) en formato JSON para un proyecto de construcción de una vivienda unifamiliar de 2 pisos con 100 m² por planta.

Estructura el JSON jerárquicamente hasta un cuarto nivel.
Esquema requerido para cada nodo:
{
  "id": "Código del WBS (ej. 01.01.02)",
  "nombre": "Nombre del entregable o actividad",
  "nivel": Número de nivel (del 1 al 4),
  "metrado_estimado": Valor numérico representativo de la actividad,
  "unidad": "Unidad de medida estándar (m2, m3, kg, gl, und, etc.)"
}

Organiza los niveles de la siguiente forma:
- Nivel 1: Proyecto General
- Nivel 2: Fases (Obras Provisionales, Estructuras, Arquitectura, Instalaciones)
- Nivel 3: Sub-fases (ej. Movimiento de tierras, Concreto Armado)
- Nivel 4: Actividades Ejecutables (ej. Excavación manual, Concreto en Zapatas)

RESTRICCIÓN CRÍTICA: Retorna únicamente el código JSON crudo. No agregues explicaciones, textos introductorios ni bloques explicativos antes o después de la estructura JSON.
```

### B. Análisis de Precios Unitarios (APU Tipo S10)
Este prompt toma una partida en lenguaje natural y la estructura como un Análisis de Precios Unitarios completo (mano de obra, materiales, equipos) listo para exportación.

```text
Actúa como un Especialista en Costos y Presupuestos (Especialista APU) familiarizado con el formato de presupuestos S10.
Toma la siguiente información técnica e informal de una partida de construcción y genera su Análisis de Precio Unitario (APU) en un objeto JSON estructurado.

[INFORMACIÓN DE PARTIDA]
Partida: Concreto en Zapatas f'c=210 kg/cm2.
Rendimiento establecido: 20 m3/día.
Cuadrilla estándar de vaciado: 0.2 Capataz, 1 Operario, 2 Oficiales, 6 Peones.
Insumos requeridos: Concreto premezclado (m3, costo 340 soles), Gasolina para vibradora (gal, costo 18 soles).
Equipos: Vibrador de concreto 2" (costo de alquiler 15 soles/hora), herramientas manuales (3% de la mano de obra).
[/INFORMACIÓN DE PARTIDA]

Estructura el objeto JSON de salida exactamente así:
{
  "partida": "Nombre de la partida",
  "rendimiento": "Rendimiento diario con unidad (ej. 20 m3/dia)",
  "analisis_costo": {
    "mano_de_obra": [
      { "recurso": "Nombre del puesto", "cuadrilla": valor_decimal, "unidad": "hh", "precio_unitario_hora": valor_referencial_soles }
    ],
    "materiales": [
      { "recurso": "Nombre del material", "unidad": "unidad_medida", "cantidad_por_unidad_partida": valor_decimal, "precio_unitario": valor_soles }
    ],
    "equipos": [
      { "recurso": "Nombre de equipo/herramienta", "cuadrilla": valor_decimal, "unidad": "hm", "precio_unitario_hora": valor_soles }
    ]
  }
}

RESTRICCIONES IMPORTANTES:
1. Calcula la cantidad de horas-hombre (hh) y horas-máquina (hm) necesarias utilizando la fórmula estándar: (Cuadrilla * 8 horas) / Rendimiento.
2. Utiliza salarios referenciales actuales de construcción civil (Operario: 26.50/h, Oficial: 21.80/h, Peón: 19.70/h, Capataz: 32.00/h).
3. Entrega únicamente el objeto JSON sin envoltorios conversacionales de saludo ni despedida.
```

### C. Conversión de EETT a Markdown Profesional
Este prompt toma una especificación informal o descriptiva desordenada y la transforma en un documento estructurado de especificaciones técnicas.

```text
Actúa como un Ingeniero Revisor de Expedientes Técnicos.
Toma el siguiente fragmento desordenado de especificación técnica y reescríbelo en formato Markdown (.md) profesional y jerárquico.

[TEXTO DESORDENADO]
En la partida de movimiento de tierras para cimientos, primero se tiene que hacer el trazo de niveles usando estación total o nivel de ingeniero. El metrado se saca midiendo el volumen en m3 de tierra excavada. La excavación se hace a mano con pico y lampa y si es terreno duro se usa retroexcavadora pequeña. El pago es por metro cúbico. Las herramientas a usar son picos, palas y carretillas tipo buggie. El supervisor debe verificar la profundidad antes de vaciar el solado.
[/TEXTO DESORDENADO]

El documento Markdown resultante debe seguir esta estructura exacta usando cabeceras de Markdown:
# ESPECIFICACIONES TÉCNICAS
## PARTIDA: EXCAVACIÓN PARA CIMIENTOS
### 1. Descripción del Trabajo
(Describe el alcance general aquí)
### 2. Equipos y Herramientas
(Listado en viñetas de las herramientas y maquinaria necesarias)
### 3. Método de Ejecución
(Pasos cronológicos y controles técnicos, incluyendo trazos, excavación y aceptación de niveles)
### 4. Método de Medición
(Cómo se calcula el volumen y cuál es la unidad oficial)
### 5. Condiciones de Pago
(Descripción de la base de pago por m3 ejecutado y aprobado por la supervisión)

RESTRICCIÓN: Retorna únicamente el código Markdown.
```

---

## 5. Consejos Prácticos para la Práctica Interactiva
Cuando uses el **Conversor EETT** interactivo de la clase de hoy en el portal de alumnos:
1. Copia un texto descriptivo rápido sobre cualquier partida (por ejemplo: *"Para los muros de ladrillo usaremos ladrillo King Kong de 18 huecos asentado con mortero 1:5. Se medirá en metros cuadrados y el pago es al precio unitario"*).
2. Haz clic en **A Markdown** para observar cómo la lógica estructurada jerarquiza el método de medición y las bases de pago de forma inmediata.
3. Haz clic en **A JSON** para ver cómo un agente de IA traduce este bloque de texto en propiedades y tipos de variables (números, strings) legibles para otros softwares.
