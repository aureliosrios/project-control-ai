# Project Control AI - Estructura del Proyecto

## 📁 Organización de Carpetas

```
📦 Pagina WEB Project Control AI/
│
├── 📁 assets/                      # Recursos estáticos compartidos
│   ├── 📁 css/                     # Hojas de estilo
│   │   ├── styles-global.css       # Estilos globales compartidos
│   │   └── index.css               # Estilos específicos del index
│   │
│   ├── 📁 js/                      # Scripts JavaScript
│   │   ├── config.js               # Configuración (Supabase, etc)
│   │   ├── utils.js                # Funciones utilitarias
│   │   └── main.js                 # Script principal del index
│   │
│   ├── 📁 images/                  # Imágenes del sitio
│   │   ├── Logotipo.png
│   │   ├── Curso 1.png
│   │   ├── hero_bg.png
│   │   ├── BCP.png
│   │   └── Yape.png
│   │
│   └── 📁 brochures/               # PDFs de brochures
│       ├── Brochure_Curso_1_Licitaciones_360.pdf
│       ├── Brochure_Curso_2_EVM.pdf
│       └── ...
│
├── 📁 scripts/                     # Scripts de desarrollo
│   └── generar-cursos.js           # Generador automático de páginas
│
├── 📁 docs/                        # Documentación del proyecto
│   ├── README_SISTEMA.md
│   ├── CONFIGURAR_VIDEOS_OCULTOS.md
│   ├── test-videos.html            # Página de testing
│   └── guia-activar-insercion.html # Guía de configuración
│
├── 📄 index.html                   # Página principal
├── 📄 clases-grabadas.html         # Visualizador de clases
├── 📄 curso-licitaciones.html      # Página de curso individual
├── 📄 inscripcion.html             # Formulario de inscripción
├── 📄 verificar.html               # Portal de certificados
└── 📄 cursos.json                  # Base de datos de cursos

```

## 🎯 Archivos Principales

### HTML Públicos
- **index.html**: Página de inicio con información de cursos
- **clases-grabadas.html**: Reproductor de clases con lista de lecciones
- **curso-licitaciones.html**: Página detallada de curso específico
- **inscripcion.html**: Formulario de registro de estudiantes
- **verificar.html**: Sistema de descarga de certificados

### Configuración y Datos
- **cursos.json**: Define todos los cursos, lecciones y metadata

### Scripts de Desarrollo
- **scripts/generar-cursos.js**: Genera páginas HTML de cursos automáticamente desde `cursos.json`

## 🔧 Cómo Usar

### Generar nuevas páginas de curso
```bash
cd "c:\Antigravity\Pagina WEB Project Control AI"
node scripts/generar-cursos.js
```

### Agregar un nuevo curso
1. Edita `cursos.json` agregando la estructura del curso
2. Ejecuta el generador: `node scripts/generar-cursos.js`
3. Se creará automáticamente `curso-[nombre].html`

## 📝 Notas Importantes

- Todos los assets compartidos están en `/assets/`
- Las imágenes siempre se referencian como `assets/images/nombre.png`
- Los estilos globales están en `assets/css/styles-global.css`
- La documentación técnica va en `/docs/`
- Los scripts de desarrollo van en `/scripts/`

## 🚀 Para Subir a GitHub

Asegúrate de **NO** incluir:
- Archivos temporales (`.tmp`, backups)
- Configuraciones locales sensibles
- Node modules (si instalas dependencias)

Archivos esenciales para el repositorio:
- Todos los HTML de la raíz
- Carpeta `assets/` completa
- `cursos.json`
- `scripts/generar-cursos.js`
- Documentación en `docs/`
