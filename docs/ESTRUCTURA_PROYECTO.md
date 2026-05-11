# Estructura del Proyecto | PCAI System v5.2

## 🏗️ Arquitectura de Carpetas (Next.js)

```
📦 project-control-ai/
├── 📁 app/                     # El corazón de la aplicación (App Router)
│   ├── 📁 components/          # Componentes compartidos (Navbar, Footer)
│   ├── 📁 consultoria/         # Página de servicios B2B
│   ├── 📁 formacion/           # Catálogo de cursos y ecosistema
│   ├── 📁 inscripcion/         # Formulario de registro con Supabase
│   ├── 📁 recursos/            # Descargas y herramientas
│   ├── 📁 clases-grabadas/     # Portal de contenido educativo
│   ├── 📄 layout.js            # Layout global (Navbar/Footer persistente)
│   ├── 📄 page.js              # Home Page (Landing Principal)
│   └── 📄 globals.css          # Estilos base y tokens NASA-Punk
│
├── 📁 lib/                     # Utilidades y clientes externos
│   └── 📄 supabase.js          # Cliente de base de datos
│
├── 📁 public/                  # Archivos estáticos públicos
│   └── 📁 images/              # Logotipos y recursos visuales
│
├── 📁 old_site/                # LEGACY: Versión antigua HTML/JS (Solo lectura)
│
├── 📄 vercel.json              # Configuración de rutas y rewrites para Vercel
├── 📄 tailwind.config.js       # Tokens de diseño y colores industriales
└── 📄 package.json             # Dependencias del sistema
```

## 🎨 Design System
El sistema utiliza una estética **NASA-Punk** definida en `tailwind.config.js` y `app/globals.css`, con los siguientes pilares:
- **Colores**: Slate-950 (Fondo), Cyan-500 (Acción), White/10 (Bordes vidriosos).
- **Tipografía**: Inter (Primaria), Material Symbols (Iconos).
- **Efectos**: Backdrop-blur, gradientes sutiles y micro-animaciones.

## 📡 Integraciones
1. **Supabase**: Maneja el almacenamiento de leads y datos de cursos.
2. **Hotmart**: Pasarela de pagos externa (links configurados en `app/formacion/page.js`).
3. **Vercel**: Hosting y gestión de dominios.

## 📑 Mantenimiento
Para realizar cambios en el contenido sin romper la estructura, consulta la [`GUIA_MANTENIMIENTO.md`](GUIA_MANTENIMIENTO.md).
