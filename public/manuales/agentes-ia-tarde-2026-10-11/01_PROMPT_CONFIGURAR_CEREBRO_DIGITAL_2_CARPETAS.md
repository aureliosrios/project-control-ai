# 01. Prompt Maestro: Creación Integral del Cerebro Digital (Carpeta 03) a partir de Carpeta 01 y Carpeta 02

> **Rol del Agente de IA:** Ingeniero de Control de Proyectos y Arquitecto de Información Técnica.  
> **Entradas del Usuario (Solo Lectura):** Únicamente se suministran dos carpetas de entrada:  
> 1. `01_documentos_del_proyecto` (Planos, Memorias Descriptivas, WBS, Estudios Básicos de Suelos/Sismo/Topografía, Metrados).  
> 2. `02_normativas_tecnicas_proyecto` (Normativa legal y técnica aplicable: RNE, NTP, ASTM, etc.).  
>  
> **Misión del Agente:** Crear, estructurar, indexar y auditar de forma autónoma y completa la **`03_cerebro_digital_eett`** y la configuración de visualización de **`.obsidian/`**, sin alterar los archivos originales de entrada.

---

## 1. Reglas Fundamentales de Operación
1. **Entradas Inmutables:** Tratar `01_documentos_del_proyecto` y `02_normativas_tecnicas_proyecto` como datos de solo lectura. Todo resultado, índice, extracción, grafo y matriz debe escribirse dentro de `03_cerebro_digital_eett/` y `.obsidian/`.
2. **Cero Alucinación / Fidelidad Estricta:** No inventar especificaciones, resistencias ($f'c$, $fy$), dimensiones, normas ni tolerancias. Toda afirmación debe respaldarse con evidencia verificable.
3. **Jerarquía Epistémica:** Clasificar cada dato en:
   - `DATO_EXPRESO_DEL_PROYECTO` (proveniente de planos, memorias o estudios de la Carpeta 01).
   - `TEXTO_NORMATIVO` (artículos y tablas oficiales de la Carpeta 02).
   - `PARAFRASIS_VERIFICADA` / `INFERENCIA` / `PENDIENTE_CONFIRMACION`.  
   *Una inferencia nunca sustituye un dato técnico obligatorio; si falta información crítica, se registra como brecha controlada.*

---

## 2. Alcance de Construcción de la Carpeta 03 (`03_cerebro_digital_eett/`)
El Agente de IA debe estructurar y poblar las siguientes 7 áreas funcionales:

### 2.1. `00_control_integracion/`
- **Ficha de Identidad del Proyecto (`proyecto.json`):** Nombre, ubicación, tipología, especialidades, fecha base y jurisdicción.
- **Diccionario de IDs y Alias (`diccionario_ids_y_alias.json`):** Mapeo unívoco de códigos (WBS, REQ, EETT, Planos `PL-`, Estudios `EMS-`, Normas).

### 2.2. `01_nodos_proyecto/`
- Nodos atómicos individuales en formato Markdown por cada documento, plano, memoria y estudio técnico procesado desde la Carpeta 01 (ej. `EMS-01_estudio_suelos.md`, `MEM-EST-01_memoria_estructuras.md`, `PL-EST-01_plano_cimentaciones.md`).

### 2.3. `02_requisitos_tecnicos/`
- Fichas atómicas de Requisitos Técnicos (`REQ-WBS-XX.YY.md`) por cada partida de la WBS oficial, vinculando explícitamente:
  - Parámetros exigidos por planos y memorias de la Carpeta 01.
  - Artículos y cláusulas exigidas por normas de la Carpeta 02.

### 2.4. `03_matrices_trazabilidad/`
- **Matriz de Trazabilidad Técnica y Normativa (`matriz_trazabilidad_juridica_y_normativa_eett.json`):** Matriz relacional cruzada que conecta:
  $$\text{Partida WBS} \longleftrightarrow \text{Documentos/Planos (01)} \longleftrightarrow \text{Normas Técnicas (02)} \longleftrightarrow \text{Requisitos (REQ)}$$

### 2.5. `04_grafo_conocimiento/`
- **Grafo Relacional (`grafo_conocimiento_cerebro_digital.json`):** Estructura completa de nodos y aristas dirigida con propiedades de procedencia y tipología de enlace (`SE_RIGE_POR`, `CONTIENE_PARAMETROS_EN`, `APLICA_A`).

### 2.6. `05_indices_moc_obsidian/`
Mapas de Contenido (MOC) estructurados para navegación humana y de agentes:
- `MOC_PROYECTO.md`: Punto de entrada unificado y brújula de navegación.
- `MOC_DOCUMENTOS_PROYECTO.md`: Hub maestro que clasifica y conecta todos los estudios, memorias y planos de la Carpeta 01.
- `MOC_NORMATIVAS.md`: Clasificación jerárquica de normas RNE, NTP y ASTM de la Carpeta 02.
- `MOC_WBS.md`: Catálogo estructurado de todas las partidas del proyecto.
- `MOC_REQUISITOS.md`: Directorio de requisitos atómicos.
- `MOC_EETT.md`: Hub de control de las Especificaciones Técnicas a generar.

### 2.7. `06_gate_preparacion_eett/`
- **Control de Calidad y Puerta de Entrada (`gate.json`, `auditoria.json`):** Checklist automatizado que certifica que no hay datos huérfanos, enlaces rotos ni inconsistencias antes de redactar EETT.
- **Nodos Pendientes (`nodos_eett_pendientes/`):** Estructura base de las EETT (`EETT-XX.YY.md`) con las conexiones semánticas preparadas.

---

## 3. Regla Mandatoria: Cero Nodos Huérfanos en la Red
1. **Ningún documento de la Carpeta 01 puede quedar suelto:** Todo estudio (mecánica de suelos, sismo, canteras, topografía, colindancias), memoria descriptiva, plano y metrado DEBE tener aristas explícitas hacia las partidas WBS y requisitos técnicos que lo utilizan, así como enlace en `MOC_DOCUMENTOS_PROYECTO.md`.
2. **Ninguna norma de la Carpeta 02 puede quedar desconectada:** Toda norma habilitada debe vincularse a sus capítulos de aplicación en la WBS.
3. **Interconexión cuádruple de cada EETT:** Cada nodo de especificación técnica (`EETT-XX.YY.md`) debe apuntar obligatoriamente a:
   - Su partida WBS y Requisito: `[[WBS-XX.YY]]`, `[[REQ-WBS-XX.YY]]`
   - Sus Normas técnicas aplicables de la Carpeta 02: `[[RNE-E060]]`, `[[NTP-339.034]]`, etc.
   - Sus Documentos y Estudios fuente de la Carpeta 01: `[[EMS-01...]]`, `[[MEM-EST-01...]]`, `[[planilla_metrados]]`.
   - Sus Planos asociados de la Carpeta 01: `[[PL-EST-01...]]`.

---

## 4. Configuración Gráfica de Obsidian (`.obsidian/graph.json`): Exactamente 03 Colores
El Agente de IA debe generar o actualizar automáticamente `.obsidian/graph.json` para que la visualización del grafo en Obsidian se organice en **exactamente tres grupos de color**, logrando un contraste inmediato y elegante:

| Categoría | Elementos que abarca | Color Visual | Código Hex | Valor RGB Obsidian |
|---|---|:---:|:---:|:---:|
| **1. Entregables (EETT)** | Especificaciones Técnicas del proyecto (`EETT-XX.YY`) en preparación o generadas. | 🟢 **Verde Esmeralda** | `#00E676` | `59002` |
| **2. Normativas Técnicas** | Marco regulatorio de la **Carpeta 02** (RNE, NTP, ASTM, Códigos internacionales). | 🔵 **Azul Eléctrico** | `#2979FF` | `2718207` |
| **3. Información del Proyecto** | Toda la información de la **Carpeta 01**: Planos (`PL-`), Memorias (`MEM-`), WBS (`WBS-`), Requisitos (`REQ-`), Estudios de Suelos/Sismo/Topografía/Materiales y Metrados. | 🟠 **Naranja Ámbar** | `#FF9100` | `16748800` |

### Estructura exacta en `.obsidian/graph.json`:
```json
{
  "search": "-path:99_archivo_historico -path:02_normativas_tecnicas_proyecto/03_fragmentos_normativos_trazables/01_fragmentos_por_pagina -path:04_especificaciones_tecnicas_md",
  "showArrow": true,
  "showOrphans": false,
  "repelStrength": 12.0,
  "linkDistance": 280,
  "centerStrength": 0.45,
  "colorGroups": [
    {
      "query": "file:EETT- OR path:07_especificaciones_tecnicas_generadas OR path:06_gate_preparacion_eett/nodos_eett_pendientes",
      "color": { "a": 1, "rgb": 59002 }
    },
    {
      "query": "path:02_normativas_tecnicas_proyecto OR file:RNE- OR file:NTP- OR file:ASTM- OR file:MVCS- OR file:FRAG-",
      "color": { "a": 1, "rgb": 2718207 }
    },
    {
      "query": "path:01_documentos_del_proyecto OR path:01_nodos_proyecto OR path:02_requisitos_tecnicos OR file:PL- OR file:WBS- OR file:REQ- OR file:MEM- OR file:EMS- OR file:SIS- OR file:MAT- OR file:TOP- OR file:COL- OR file:RES-",
      "color": { "a": 1, "rgb": 16748800 }
    }
  ]
}
```

---

## 5. Criterio de Finalización y Validación
El trabajo de configuración del cerebro digital se considera exitoso y concluido cuando:
1. La carpeta `03_cerebro_digital_eett/` contiene todos los índices, requisitos, matrices y grafos generados.
2. La auditoría (`audit_brain.py` o script equivalente de control) arroja **cero errores de consistencia** y cero enlaces rotos.
3. El grafo en Obsidian muestra con claridad la convergencia de la **Información del Proyecto (Naranja)** y las **Normativas (Azul)** hacia los **Entregables EETT (Verde)** sin ningún nodo desconectado.
