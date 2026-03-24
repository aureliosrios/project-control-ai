# CLAUDE.md — Project Control AI
> Contexto completo para IA. Lee este archivo antes de modificar cualquier cosa.

---

## 1. QUIÉN ES EL PROPIETARIO

**Ing. Aurelio Solorzano Rios**
- Fundador de Project Control AI — Academia & Consultoría
- Especialista en gestión/control de proyectos multidisciplinarios e IA aplicada a construcción
- Lema: *"Democraticemos la programación — gracias a la IA, la programación puede estar en las manos de todos"*
- Contacto: WhatsApp +51 993 147 501 (Perú)
- Imagen: `assets/images/Aurelio Solorzano.png`

---

## 2. MODELO DE NEGOCIO

```
1. Generar reputación y autoridad como experto en IA + ingeniería
2. Vender cursos asincrónicos escalables (plan de 20 micro-cursos)
3. Convertir clientes en servicios de consultoría de automatización (alto valor)
```

**Público objetivo:** Ingenieros y profesionales de construcción de habla hispana.

---

## 3. STACK TÉCNICO

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5 + Tailwind CSS (CDN) + Vanilla JS |
| Tipografía | Space Grotesk (títulos) · Inter (body) |
| Iconos | Google Material Symbols Outlined |
| Base de datos | Supabase (PostgreSQL) |
| Formularios | Google Sheets via Apps Script |
| Pagos | Hotmart (checkout) + PayPal + Yape + Plin + BCP |
| Videos | YouTube (unlisted/public) |
| Hospedaje | GitHub Pages → migración futura a Netlify/Cloudflare |
| Generación | `scripts/generar-cursos.js` (Node.js) |

### Design System
```css
/* Colores base */
--bg:           #020817  (fondo principal)
--surface:      #0b1323  (superficies)
--primary:      #a8e8ff  (cian claro)
--primary-cnt:  #00d4ff  (cian brillante — CTAs)
--secondary:    #f4630f  (naranja — "En Vivo")
--on-surface:   #dbe2f8  (texto principal)

/* Tailwind keys */
primary-container   → #00d4ff
secondary-container → #f4630f (naranja cursos En Vivo)
on-primary-container → #00586b
surface-container-lowest → #060e1d
```

---

## 4. ESTRUCTURA DE ARCHIVOS

```
project-control-ai/
│
├── CLAUDE.md                    ← este archivo
├── README.md                    ← documentación general
├── cursos.json                  ← FUENTE DE VERDAD de cursos sincrónicos
├── courses.json                 ← OBSOLETO, no usar
├── .gitignore
│
├── index.html                   ← Página de inicio
├── formacion.html               ← Centro de formación (sincrónico + asincrónico)
├── consultoria.html             ← Servicios de consultoría
├── recursos.html                ← Brochures + videos + curso asincrónico
├── inscripcion.html             ← Formulario de inscripción (Supabase)
├── academy.html                 ← Página academia (catálogo alternativo)
├── curso-licitaciones.html      ← Detalle del curso Licitaciones
├── clases-grabadas.html         ← Biblioteca de clases grabadas
├── verificar.html               ← Verificador de registros
├── validar.html                 ← Validador de datos
├── index Antigua.html           ← Backup de versión anterior (NO tocar)
│
├── assets/
│   ├── js/
│   │   ├── config.js            ← FUENTE DE VERDAD de URLs/claves/links
│   │   ├── main.js              ← Navbar móvil, scroll, animaciones, lazy load
│   │   └── utils.js             ← Helpers: formatFecha, validarDNI, WhatsApp, Hotmart
│   ├── css/
│   │   ├── styles-global.css    ← Variables CSS globales y componentes compartidos
│   │   └── index.css            ← Estilos específicos de index.html
│   ├── images/
│   │   ├── Logotipo.png
│   │   ├── Aurelio Solorzano.png
│   │   ├── hero_bg.png
│   │   ├── Licitaciones.png
│   │   ├── Control y gerencia.png
│   │   ├── Gestión Integral.png
│   │   ├── Automation.png
│   │   ├── Primavera P6.png
│   │   ├── BCP.png
│   │   └── Yape.png
│   └── brochures/
│       ├── Brochure_Curso_1_Licitaciones_360.pdf
│       ├── Brochure_Curso_2_EVM.pdf
│       ├── Brochure_Curso_3_IA_Despertar_Digital.pdf
│       ├── Brochure_Curso_4_Automation_Engineer.pdf
│       └── Brochure_Curso_5_Primavera_P6.pdf
│
├── scripts/
│   └── generar-cursos.js        ← Genera páginas HTML de cursos desde cursos.json
│
└── docs/
    ├── ESTRUCTURA_PROYECTO.md
    ├── guia-activar-insercion.html
    ├── test-videos.html
    └── legacy/                  ← Documentación anterior (referencia histórica)
```

---

## 5. CONFIGURACIÓN CENTRALIZADA — `assets/js/config.js`

**Este es el archivo más importante.** Centraliza todas las URLs y claves.

```javascript
PCAI_CONFIG = {
  supabase: {
    url: 'https://bpsumudexpywfffcwpun.supabase.co',
    key: 'sb_publishable_OzjgZjclmEDlDuVdLGuvQQ_SyX2aTy0'  // clave pública
  },
  googleSheets: {
    scriptUrl: 'https://script.google.com/macros/s/AKfycbw.../exec'
  },
  whatsapp: {
    contactNumber: '51993147501',
    defaultMessage: 'Hola Ing. Aurelio, deseo información de los cursos de Project Control AI'
  },
  hotmart: {
    licitaciones:      'https://pay.hotmart.com/N104187999C',
    evm:               'https://pay.hotmart.com/N104188538H',
    gestion_proyectos: 'https://pay.hotmart.com/K104218834V',
    automation:        'https://pay.hotmart.com/I104227016S',
    p6:                'https://pay.hotmart.com/Q104228911C',
    paypal_global:     'https://paypal.me/ProjectControlAI',
    academy_bundle:    'https://pay.hotmart.com/ACADEMY_BUNDLE_ID'  // pendiente ID real
  }
}
```

> **Seguridad:** La clave de Supabase es `sb_publishable_*` (pública). RLS debe estar activo en Supabase. La `googleSheets.scriptUrl` también es pública por diseño.

---

## 6. CATÁLOGO DE CURSOS

### 6A. Cursos En Vivo (Sincrónicos) — `cursos.json`

| ID | Nombre | Precio | Inicio | Horario | Nivel |
|----|--------|--------|--------|---------|-------|
| LIC | Licitaciones Inteligentes con IA | $75 / S/200 | 06 Abr 2026 | Lun-Mié 7-10 PM | Intermedio |
| GIP | Control y Gerencia EVM | $75 / S/200 | 14 Abr 2026 | Mar-Jue 7-10 PM | Intermedio |
| IAD | Gestión Integral de Proyectos con IA | $75 / S/200 | 19 Abr 2026 | Domingos 10 AM - 1 PM | Básico |
| PRO | Automation Engineer | $90 / S/300 | 05 Abr 2026 | Domingos 3-6 PM | Avanzado |
| P6  | Primavera P6 Profesional | $75 / S/200 | 03 Abr 2026 | Viernes 7-10 PM | Intermedio |
| EVM | Control y Gerencia EVM 4.0 | $75 / S/200 | 25 Mar 2026 | Sáb-Dom 7-10 PM | Experto |

**Automation Engineer requiere haber cursado Gestión Integral (IAD) como prerrequisito.**

### 6B. Curso Asincrónico Publicado — Hotmart

| Curso | Link | Precio |
|-------|------|--------|
| El Despertar de la IA en la Gestión de Proyectos (A1) | `https://go.hotmart.com/I104938744G` | $11.99 USD |

### 6C. Ecosistema Asincrónico — 20 Micro-cursos (Plan futuro)

6 rutas de aprendizaje, $11.99 USD cada micro-curso. Solo A1 publicado.

| Ruta | Nombre | Cursos | Color |
|------|--------|--------|-------|
| A | El Profesional que Despierta | 4 (A1–A4) | Verde |
| B | Especialista HSE / Calidad / Campo | 5 (B1–B5) | Azul |
| C | Ingeniero de Costos y Licitaciones | 4 (C1–C4) | Naranja |
| D | Administrador de Contratos | 4 (D1–D4) | Rojo |
| E | Planificador / Controller / PMO | 5 (E1–E5) | Púrpura |
| F | Ingeniería Élite / Automatizador | 5 (F1–F5) | Amarillo |

---

## 7. MÉTODOS DE PAGO

### Perú
| Método | Acción | Número/Cuenta |
|--------|--------|---------------|
| Yape | Mostrar número directamente | +51 993 147 501 |
| Plin | Mostrar número directamente | +51 993 147 501 |
| BCP Soles | WhatsApp (consultar datos) | wa.me/51993147501 |
| BCP Dólares | WhatsApp (consultar datos) | wa.me/51993147501 |

### Internacional
| Método | Acción |
|--------|--------|
| PayPal | Link directo: `paypal.me/ProjectControlAI` |
| Hotmart | **Cada curso tiene su propio enlace** (ver tabla 6A y 6B) |

> **Regla:** Hotmart en la sección de "Pagos Internacionales" es solo referencia informativa. Los botones de pago van en cada tarjeta de curso individualmente.

---

## 8. ARQUITECTURA DE `formacion.html`

La página principal de formación tiene esta lógica:

```
formacion.html
│
├── Header (H1 "Formación")
├── Toggle buttons [Asincrónico | En Vivo]  ← JavaScript showView()
│
├── #view-asinc (visible por defecto)
│   ├── Sección 1: Curso A1 "El Despertar" (banner destacado)
│   └── Sección 2: Ecosistema 20 micro-cursos
│       ├── Ruta A [acordeón abierto] ← toggleRoute('A')
│       ├── Ruta B [acordeón cerrado] ← toggleRoute('B')
│       ├── Ruta C [acordeón cerrado]
│       ├── Ruta D [acordeón cerrado]
│       ├── Ruta E [acordeón cerrado]
│       └── Ruta F [acordeón cerrado]
│
├── #view-sinc (oculto por defecto, .hidden)
│   └── Sección 3: 5 cursos En Vivo
│       └── Cada tarjeta tiene: precio + [Inscribirme] + [Pagar en Hotmart]
│
└── Sección Métodos de Pago (siempre visible)
    ├── Perú (Yape, Plin, BCP S/., BCP $)
    └── Internacional (PayPal, Hotmart — solo referencia)
```

**Funciones JS en formacion.html:**
- `showView('asinc'|'sinc')` — alterna entre las dos vistas
- `toggleRoute('A'|'B'|...'F')` — expande/colapsa rutas del ecosistema

---

## 9. CONVENCIONES DE CÓDIGO

### HTML
- Todas las páginas: `<html class="dark" lang="es">`
- Tailwind CSS via CDN: `https://cdn.tailwindcss.com?plugins=forms,container-queries`
- Sin framework JS (React, Vue, etc.) — Vanilla JS puro
- Navbar fixed, fondo `bg-[#020817]/60 backdrop-blur-xl`
- Glass morphism: `.glass-card { background: rgba(45,53,70,0.4); backdrop-filter: blur(12px) }`

### Convenciones de nombre de archivo
- Páginas en minúsculas con guión: `formacion.html`, `recursos.html`
- Imágenes con espacios y mayúsculas: `Aurelio Solorzano.png`, `Control y gerencia.png`
- Brochures PDF: `Brochure_Curso_N_NombreCurso.pdf`

### Tailwind config (inline en cada página)
```javascript
tailwind.config = {
  darkMode: "class",
  theme: { extend: {
    colors: {
      "primary-container": "#00d4ff",
      "on-primary-container": "#00586b",
      "secondary-container": "#f4630f",
      "surface": "#0b1323",
      "background": "#0b1323",
      "on-surface": "#dbe2f8",
      "on-surface-variant": "#bbc9cf",
      // ... ver cada HTML para lista completa
    },
    fontFamily: { "headline": ["Space Grotesk"], "body": ["Inter"] }
  }}
}
```

---

## 10. INTEGRACIONES EXTERNAS

### Supabase
- **Uso:** Registro de inscripciones, validación de certificados
- **Tabla principal:** `cursos` (nombres deben coincidir con `PLANTILLAS_CURSOS` en config.js)
- **Inicialización:** `initSupabase()` en config.js — usa `supabase.createClient()`
- **Seguridad:** RLS (Row Level Security) debe estar ACTIVO

### Google Sheets (Apps Script)
- **Uso:** Formularios de inscripción como respaldo
- **Endpoint:** POST al `scriptUrl` en config.js
- **Acción:** Guarda nombre, email, curso, fecha en hoja de cálculo

### Hotmart
- **Uso:** Checkout de pago para cursos sincrónicos y asincrónico A1
- **Formato enlaces sincrónicos:** `https://pay.hotmart.com/[ID]`
- **Formato enlace A1:** `https://go.hotmart.com/I104938744G`
- **Regla crítica:** Cada curso tiene su propio ID. No reutilizar IDs entre cursos.

### YouTube
- **Uso:** Videos de clases (unlisted/ocultos para alumnos, públicos para demos)
- **Acceso:** Mediante videoId en `cursos.json` → campo `lecciones[].videoId`
- **Visibilidad:** `"publica"` (visible en web) o `"oculta"` (solo con link directo)

---

## 11. REGLAS IMPORTANTES PARA LA IA

1. **No usar `courses.json`** — está obsoleto. Usar siempre `cursos.json`.
2. **No hardcodear links de Hotmart** sin verificar en `config.js` — cada curso tiene su ID único.
3. **El link de El Despertar usa `go.hotmart.com`**, no `pay.hotmart.com`.
4. **Brochures van en `assets/brochures/`**, no en `assets/pdf/`.
5. **No tocar `index Antigua.html`** — es backup de referencia histórica.
6. **La carpeta `.claude/`** está en `.gitignore` — nunca commitearla.
7. **Supabase key es pública** (`sb_publishable_*`) — no tratarla como secreto, pero RLS debe estar activo.
8. **Imágenes de cursos tienen espacios** en el nombre: `"Control y gerencia.png"` — usar comillas en HTML.
9. **Automation Engineer** tiene prerrequisito: debe haber cursado GIP (Gestión Integral).
10. **Hotmart en sección pagos** = solo referencia informativa. Los botones de pago van en cada tarjeta de curso.

---

## 12. PÁGINAS Y SU PROPÓSITO

| Página | Propósito | Sección activa en navbar |
|--------|-----------|--------------------------|
| `index.html` | Home: hero, cursos destacados, autoridad, testimonios | — |
| `formacion.html` | Catálogo completo (sinc + asinc + rutas) | Formación |
| `consultoria.html` | Servicios: Automatización, Dashboards, EVM con IA | Consultoría |
| `recursos.html` | Brochures PDF + videos grabados + El Despertar | Recursos |
| `inscripcion.html` | Formulario inscripción → Supabase + Google Sheets | — |
| `academy.html` | Vista alternativa del catálogo de cursos | — |
| `curso-licitaciones.html` | Detalle completo de Licitaciones (lecciones, videos) | — |
| `clases-grabadas.html` | Biblioteca de clases para ex-alumnos | — |
| `verificar.html` | Verificación de registros de alumnos | — |
| `validar.html` | Validación de datos de inscripción | — |

---

## 13. SCRIPT GENERADOR

```bash
# Genera páginas HTML individuales para cada curso desde cursos.json
node scripts/generar-cursos.js
```

Crea archivos `curso-[nombre].html` con:
- Reproductor YouTube embebido
- Lista de lecciones (GRATUITA / PREMIUM con candado)
- Toggle entre lecciones via JS
- Template completo auto-generado

---

*Última actualización: marzo 2026 · Mantenido por Ing. Aurelio Solorzano Rios*
