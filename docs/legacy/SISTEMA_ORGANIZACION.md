# 📚 Sistema de Organización - Project Control AI Academy

## 🎯 Visión General

Este documento define el sistema de organización completo para escalar la academia desde 5 cursos hasta 50+ cursos manteniendo orden y facilidad de navegación.

---

## 📋 Nomenclatura Estándar (El "Códice")

### Códigos de Curso

Cada curso tiene un código único de 2-3 letras:

| Código | Nombre del Curso | Estado |
|--------|------------------|--------|
| **LIC** | Licitaciones Inteligentes con IA | ✅ Activo |
| **GIP** | Control y Gerencia EVM (Gestión Integral de Proyectos) | ✅ Activo |
| **IAD** | IA para el Despertar Digital | ✅ Activo |
| **PRO** | Productividad con Agentes IA | ✅ Activo |
| **P6** | Primavera P6 Profesional | ✅ Activo |
| **AUT** | Automation Engineering | 🔜 Futuro |
| **BIM** | BIM y Modelado Digital | 🔜 Futuro |
| **CON** | Gestión Contractual y Claims | 🔜 Futuro |
| **DAT** | Ingeniería de Datos para ConTech | 🔜 Futuro |

### Formato de Títulos en YouTube

**Formato Estándar:**
```
[CODIGO-##] Nombre del Curso - Clase ##: Título de la Lección
```

**Ejemplos Reales:**
```
[LIC-01] Licitaciones Inteligentes - Clase 01: Configuración de Cerebros Digitales
[GIP-02] Control y Gerencia EVM - Clase 02: Baseline y Curva S
[P6-03] Primavera P6 - Clase 03: Nivelación de Recursos
[IAD-01] IA Despertar Digital - Clase 01: Introducción a ChatGPT
```

### Beneficios de esta Nomenclatura

✅ **Búsqueda Rápida:** En YouTube Studio, busca "LIC-" y aparecen todos los videos de Licitaciones  
✅ **Orden Automático:** Los videos se ordenan alfabéticamente por código  
✅ **Identificación Visual:** Sabes inmediatamente a qué curso pertenece cada video  
✅ **Escalabilidad:** Puedes tener 100 cursos sin confusión  

---

## 🗂️ Estructura de Archivos

### Archivos Principales

```
📁 Pagina WEB Project Control AI/
├── 📄 index.html                    # Página principal (catálogo de cursos)
├── 📄 cursos.json                   # Base de datos centralizada
├── 📄 inscripcion.html              # Formulario de inscripción
├── 📄 clases-grabadas.html          # Página legacy (mantener por compatibilidad)
│
├── 📁 Cursos Individuales/
│   ├── 📄 curso-licitaciones.html   # [LIC] Licitaciones
│   ├── 📄 curso-evm.html            # [GIP] Control y Gerencia EVM
│   ├── 📄 curso-ia-despertar.html   # [IAD] IA Despertar Digital
│   ├── 📄 curso-productividad.html  # [PRO] Productividad
│   ├── 📄 curso-primavera-p6.html   # [P6] Primavera P6
│   └── ...                          # Futuros cursos
│
├── 📁 assets/
│   ├── 📄 styles-global.css
│   ├── 📄 config.js
│   └── 📄 utils.js
│
├── 📁 Brochures/
│   ├── 📄 Brochure_Curso_1_Licitaciones_360.pdf
│   ├── 📄 Brochure_Curso_2_EVM.pdf
│   └── ...
│
└── 📁 Imagenes/
    ├── 🖼️ Curso 1.png
    ├── 🖼️ Curso 2.png
    └── ...
```

---

## 🎬 Workflow para Nuevos Cursos

### Checklist Completo (Copiar y Pegar)

Cada vez que crees un nuevo curso, sigue este protocolo:

#### ✅ FASE 1: Preparación del Contenido

- [ ] **Grabar las sesiones** (Zoom, OBS, etc.)
- [ ] **Procesar con FFmpeg** (si es necesario unir partes o reparar)
- [ ] **Crear miniaturas** para cada video (1280x720px)
- [ ] **Preparar materiales** (PDFs, plantillas, scripts)
- [ ] **Crear brochure** del curso

#### ✅ FASE 2: Subida a YouTube

- [ ] **Asignar código** al curso (ej: LIC, GIP, etc.)
- [ ] **Subir videos** con nomenclatura estándar:
  ```
  [CODIGO-01] Nombre Curso - Clase 01: Título
  [CODIGO-02] Nombre Curso - Clase 02: Título
  ...
  ```
- [ ] **Configurar Clase 01** como **PÚBLICA** (marketing)
- [ ] **Configurar Clases 02-06** como **OCULTAS/NO LISTADAS**
- [ ] **Activar "Permitir inserción"** en TODAS las clases
- [ ] **Crear Playlist** del curso (puede ser oculta)
- [ ] **Agregar descripciones** con enlaces a la web

#### ✅ FASE 3: Actualizar Base de Datos

- [ ] **Editar `cursos.json`** y agregar:
  - Información del curso
  - Lista de lecciones con IDs de YouTube
  - Enlaces de pago
  - Materiales
- [ ] **Verificar formato JSON** (usar jsonlint.com)

#### ✅ FASE 4: Crear Página del Curso

- [ ] **Duplicar** `curso-licitaciones.html`
- [ ] **Renombrar** a `curso-[nombre].html`
- [ ] **Actualizar contenido:**
  - Título del curso
  - Descripción
  - Precio
  - Horario
  - Fecha de inicio
  - Array de lecciones en JavaScript
  - Enlaces de inscripción
  - Brochure
- [ ] **Probar** que todos los videos se reproduzcan

#### ✅ FASE 5: Integración en Index

- [ ] **Agregar tarjeta** del curso en `index.html` (sección #cursos)
- [ ] **Actualizar contador** de cursos disponibles
- [ ] **Verificar enlaces** de navegación

#### ✅ FASE 6: Testing y Publicación

- [ ] **Probar en navegador** local
- [ ] **Verificar responsive** (móvil/tablet)
- [ ] **Probar todos los videos** se reproduzcan
- [ ] **Verificar formulario** de inscripción
- [ ] **Commit a GitHub** con mensaje descriptivo
- [ ] **Verificar en GitHub Pages** que todo funcione

---

## 🏗️ Organización en YouTube

### 1. Playlists por Curso

Crea una playlist para cada curso:

**Nombre de Playlist:**
```
[CODIGO] Nombre del Curso - Project Control AI
```

**Ejemplos:**
```
[LIC] Licitaciones Inteligentes con IA - Project Control AI
[GIP] Control y Gerencia EVM - Project Control AI
[P6] Primavera P6 Profesional - Project Control AI
```

**Configuración:**
- **Visibilidad:** Oculta (solo accesible con el link)
- **Orden:** Manual (Clase 01, 02, 03...)
- **Descripción:** Incluir enlace a la página del curso

### 2. Secciones en el Canal (Marketing)

Configura tu canal de YouTube con secciones:

**Sección 1: "Clases Maestras Gratuitas"**
- Solo las Clase 01 de cada curso (públicas)
- Sirve como catálogo para atraer clientes

**Sección 2: "Cursos Completos"** (opcional)
- Enlaces a las playlists completas
- Solo visible para suscriptores

### 3. Configuración de Videos

| Tipo | Visibilidad | Inserción | Uso |
|------|-------------|-----------|-----|
| **Clase 01** | Pública | ✅ Activada | Marketing / Demo gratuita |
| **Clases 02-06** | No listada | ✅ Activada | Contenido premium |

---

## 🌐 Estructura de Navegación Web

### Flujo del Usuario

```
1. index.html (Catálogo)
   ↓
2. curso-[nombre].html (Página del curso)
   ↓
3. Video Clase 01 (Gratis) → Usuario ve demo
   ↓
4. Click en Clase 02 → Mensaje: "Inscríbete"
   ↓
5. inscripcion.html (Formulario)
   ↓
6. Pago → Acceso completo
```

### Jerarquía de Páginas

```
📄 index.html
   ├── 🎓 curso-licitaciones.html
   ├── 🎓 curso-evm.html
   ├── 🎓 curso-ia-despertar.html
   ├── 🎓 curso-productividad.html
   └── 🎓 curso-primavera-p6.html

📄 inscripcion.html (común para todos)
```

---

## 📊 Base de Datos Centralizada (cursos.json)

### Estructura del Archivo

El archivo `cursos.json` contiene TODA la información de los cursos:

```json
{
  "cursos": [
    {
      "id": "LIC",
      "codigo": "LIC",
      "nombre": "Licitaciones Inteligentes con IA",
      "descripcion": "...",
      "precio": { "soles": 200, "dolares": 75 },
      "lecciones": [
        {
          "numero": "01",
          "codigo": "LIC-01",
          "titulo": "...",
          "videoId": "2QxbQ8IY0Zc",
          "visibilidad": "publica"
        }
      ]
    }
  ]
}
```

### Ventajas de cursos.json

✅ **Única fuente de verdad** - Toda la info en un solo lugar  
✅ **Fácil de actualizar** - Cambias un precio y se actualiza en toda la web  
✅ **Escalable** - Puedes tener 100 cursos sin problemas  
✅ **Automatizable** - Puedes generar páginas automáticamente (futuro)  

---

## 🔄 Mantenimiento Continuo

### Tareas Semanales

- [ ] Revisar comentarios en YouTube
- [ ] Actualizar fechas de inicio en `cursos.json`
- [ ] Verificar que todos los videos se reproduzcan
- [ ] Responder consultas de inscripción

### Tareas Mensuales

- [ ] Analizar métricas de YouTube Analytics
- [ ] Actualizar precios si es necesario
- [ ] Agregar nuevos materiales a cursos existentes
- [ ] Crear contenido de marketing (Clase 01 de nuevos cursos)

### Tareas Trimestrales

- [ ] Revisar y actualizar contenido de cursos antiguos
- [ ] Planificar nuevos cursos
- [ ] Optimizar SEO de la página web
- [ ] Backup de todos los archivos

---

## 🚀 Escalabilidad

### Cómo Crecer de 5 a 50 Cursos

1. **Mantén la nomenclatura** - Siempre usa códigos de 2-3 letras
2. **Actualiza cursos.json** - Es tu única fuente de verdad
3. **Duplica templates** - Usa `curso-licitaciones.html` como base
4. **Organiza por categorías** - Agrupa cursos similares
5. **Automatiza** - Considera usar scripts para generar páginas

### Categorías Futuras

```
📚 Gestión de Proyectos
   ├── [GIP] Control y Gerencia EVM
   ├── [P6] Primavera P6
   └── [CON] Gestión Contractual

🤖 Inteligencia Artificial
   ├── [IAD] IA Despertar Digital
   ├── [PRO] Productividad con Agentes IA
   └── [LIC] Licitaciones Inteligentes

🏗️ Ingeniería y Construcción
   ├── [BIM] BIM y Modelado Digital
   ├── [AUT] Automation Engineering
   └── [DAT] Ingeniería de Datos
```

---

## 📝 Plantillas Rápidas

### Template: Nuevo Video en YouTube

```
Título: [CODIGO-##] Nombre Curso - Clase ##: Título de la Lección
Descripción:
---
🎓 Curso: [Nombre del Curso]
📚 Lección ##: [Título]

🔗 Inscríbete al curso completo:
https://[tu-web]/curso-[nombre].html

📥 Materiales del curso:
[Enlaces a materiales]

---
© 2025 Project Control AI
https://[tu-web]
```

### Template: Nueva Entrada en cursos.json

```json
{
  "numero": "##",
  "codigo": "XXX-##",
  "titulo": "Título de la Lección",
  "descripcion": "Descripción breve",
  "videoId": "YOUTUBE_ID",
  "duracion": "3 horas",
  "visibilidad": "oculta",
  "materiales": []
}
```

---

## ✅ Checklist de Verificación Final

Antes de publicar un nuevo curso, verifica:

- [ ] ✅ Todos los videos tienen nomenclatura correcta
- [ ] ✅ Clase 01 es PÚBLICA
- [ ] ✅ Clases 02-06 son OCULTAS
- [ ] ✅ "Permitir inserción" está ACTIVADO en todos
- [ ] ✅ Playlist creada y configurada
- [ ] ✅ `cursos.json` actualizado
- [ ] ✅ Página del curso creada
- [ ] ✅ Enlaces en `index.html` agregados
- [ ] ✅ Brochure PDF subido
- [ ] ✅ Imágenes optimizadas
- [ ] ✅ Todos los videos se reproducen correctamente
- [ ] ✅ Formulario de inscripción funciona
- [ ] ✅ Precios actualizados
- [ ] ✅ Fechas de inicio correctas

---

## 🎯 Próximos Pasos Recomendados

1. **Implementar sistema de autenticación** - Para dar acceso automático a alumnos inscritos
2. **Crear dashboard de alumno** - Donde puedan ver su progreso
3. **Automatizar generación de páginas** - Script que lee `cursos.json` y genera HTMLs
4. **Integrar con Google Sheets** - Para gestionar inscripciones automáticamente
5. **Agregar sistema de comentarios** - Para que alumnos hagan preguntas

---

**Última actualización:** 2026-02-13  
**Versión:** 1.0  
**Autor:** Project Control AI Academy
