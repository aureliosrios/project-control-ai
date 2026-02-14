// ============================================
// GENERADOR AUTOMÁTICO DE PÁGINAS DE CURSO
// ============================================
// Este script lee cursos.json y genera automáticamente
// las páginas HTML para cada curso.
//
// USO FUTURO: Cuando tengas muchos cursos, este script
// te ahorrará tiempo generando páginas automáticamente.
//
// Para usar: node scripts/generar-cursos.js (desde la raíz)
// ============================================

const fs = require('fs');
const path = require('path');

// Cargar datos de cursos
// Asumimos que se ejecuta desde la raíz, si no, ajustamos la ruta
const cursosPath = path.join(process.cwd(), 'cursos.json');
let cursosData;

try {
    if (fs.existsSync(cursosPath)) {
        cursosData = JSON.parse(fs.readFileSync(cursosPath, 'utf8'));
    } else {
        // Fallback si estamos dentro de la carpeta scripts
        cursosData = JSON.parse(fs.readFileSync(path.join(__dirname, '../cursos.json'), 'utf8'));
    }
} catch (error) {
    console.error("❌ Error al leer cursos.json:", error.message);
    process.exit(1);
}

// Template HTML base
function generarPaginaCurso(curso) {
    const lecciones = curso.lecciones.map((leccion, index) => {
        return `{ id: "${leccion.videoId}", num: "${leccion.numero}", codigo: "${leccion.codigo}", status: "${leccion.visibilidad === 'publica' ? 'GRATUITA' : 'PREMIUM'}", title: "${leccion.titulo}", desc: "${leccion.descripcion}", locked: ${leccion.visibilidad !== 'publica'} }`;
    }).join(',\n            ');

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${curso.nombre} | Project Control AI</title>
    
    <!-- SHARED ASSETS -->
    <link rel="stylesheet" href="assets/css/styles-global.css">
    <script src="assets/js/config.js"></script>
    <script src="assets/js/utils.js"></script>
    
    <!-- Icono Favicon -->
    <link rel="icon" type="image/svg+xml"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>">
    
    <!-- Estilos inline para evitar dependencias externas -->
    <style>
        /* Estilos básicos para el curso */
        body { font-family: 'Inter', sans-serif; background-color: #020617; color: #f1f5f9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="container nav-brand">
            <a href="index.html" class="logo-container">
                <img src="assets/images/Logotipo.png" alt="Project Control AI" class="logo-img" style="height:50px;">
            </a>
            <a href="index.html#cursos" class="back-link">Volver a Cursos</a>
        </div>
    </nav>

    <section class="course-header" style="padding: 3rem 0; background: rgba(34, 211, 238, 0.05);">
        <div class="container">
            <h1 class="course-title" style="font-size: 2.5rem; margin-bottom: 1rem;">${curso.nombre}</h1>
            <div class="course-meta" style="display: flex; gap: 15px; margin-bottom: 1.5rem;">
                <span class="meta-badge">📅 ${curso.sesiones} Sesiones</span>
                <span class="meta-badge">⏱️ ${curso.duracion}</span>
                <span class="meta-badge">📊 Nivel: ${curso.nivel}</span>
            </div>
            <p>${curso.descripcion}</p>
        </div>
    </section>

    <main class="video-section" style="padding: 3rem 0;">
        <div class="container">
            <div class="video-grid" style="display: grid; grid-template-columns: 1fr 350px; gap: 2rem;">
                <div>
                    <div class="main-player" id="playerContainer" style="aspect-ratio: 16/9; background:#000; border-radius:20px; overflow:hidden;">
                        <a id="videoLink" href="https://www.youtube.com/watch?v=${curso.lecciones[0]?.videoId}" target="_blank" class="youtube-thumbnail-container" style="background-image: url('https://img.youtube.com/vi/${curso.lecciones[0]?.videoId}/maxresdefault.jpg')">
                            <div class="play-button-overlay">
                                <svg viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                            <div class="thumbnail-hint">Hacer clic para ver en YouTube</div>
                        </a>
                    </div>
                    <div class="video-info" style="margin-top: 1.5rem;">
                        <span id="videoStatus" class="video-status status-public">CLASE GRATUITA</span>
                        <h2 id="currentVideoTitle" class="video-title">${curso.lecciones[0]?.titulo}</h2>
                        <p id="videoDesc">${curso.lecciones[0]?.descripcion}</p>
                    </div>
                </div>
                
                <div class="lesson-list">
                    <h3>📚 Contenido del Curso</h3>
                    <div id="lessonsContainer"></div>
                </div>
            </div>
        </div>
    </main>

    <script>
        const lessons = [
            ${lecciones}
        ];

        const lessonsContainer = document.getElementById('lessonsContainer');
        const videoLink = document.getElementById('videoLink');
        const currentVideoTitle = document.getElementById('currentVideoTitle');
        const videoStatus = document.getElementById('videoStatus');
        const videoDesc = document.getElementById('videoDesc');

        function loadLessons() {
            lessonsContainer.innerHTML = '';
            lessons.forEach((lesson, index) => {
                const item = document.createElement('div');
                item.className = \`lesson-item \${index === 0 ? 'active' : ''} \${lesson.locked ? 'locked' : ''}\`;

                if (!lesson.locked) {
                    item.onclick = () => selectLesson(index);
                } else {
                    item.onclick = () => alert('🔒 Lección exclusiva para inscritos.');
                }

                item.innerHTML = \`
                    <div class="lesson-thumb" style="background-image: url('https://img.youtube.com/vi/\${lesson.id}/mqdefault.jpg')"></div>
                    <div class="lesson-details">
                        <span class="lesson-num">\${lesson.codigo}</span>
                        <span class="lesson-name">\${lesson.title}</span>
                    </div>
                \`;
                lessonsContainer.appendChild(item);
            });
        }

        function selectLesson(index) {
            const lesson = lessons[index];
            document.querySelectorAll('.lesson-item').forEach((el, i) => el.classList.toggle('active', i === index));
            
            videoLink.href = \`https://www.youtube.com/watch?v=\${lesson.id}\`;
            videoLink.style.backgroundImage = \`url('https://img.youtube.com/vi/\${lesson.id}/maxresdefault.jpg')\`;
            
            currentVideoTitle.innerText = lesson.title;
            videoDesc.innerText = lesson.desc;
            videoStatus.innerText = lesson.status;
            videoStatus.className = \`video-status \${lesson.status === 'GRATUITA' ? 'status-public' : 'status-locked'}\`;
        }

        window.onload = loadLessons;
    </script>
</body>
</html>`;
}

// Generar páginas para todos los cursos
if (cursosData.cursos) {
    cursosData.cursos.forEach(curso => {
        if (curso.lecciones && curso.lecciones.length > 0) {
            // Nombre de archivo limpio: curso-nombre-del-curso.html
            const nombreArchivo = `curso-${curso.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.html`;
            const contenidoHTML = generarPaginaCurso(curso);

            // Determinar ruta de salida (siempre en la raíz del proyecto)
            const outputPath = path.join(process.cwd(), nombreArchivo);

            fs.writeFileSync(outputPath, contenidoHTML, 'utf8');
            console.log(`✅ Generado: ${nombreArchivo}`);
        } else {
            console.log(`⏭️  Saltado: ${curso.nombre} (sin lecciones)`);
        }
    });
    console.log('\n🎉 ¡Páginas generadas exitosamente!');
} else {
    console.error("❌ No se encontró la propiedad 'cursos' en el archivo JSON.");
}

// ============================================
// NOTAS DE USO:
// ============================================
// 1. Este script requiere Node.js instalado
// 2. Ejecutar desde la raíz del proyecto: node scripts/generar-cursos.js
// 3. Generará automáticamente archivos HTML para cada curso
// 4. Solo genera páginas para cursos con lecciones definidas
// ============================================
