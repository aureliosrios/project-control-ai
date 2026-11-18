"""Script para subir la Sesión 1 (Fundamentos, Agentes y Entorno Local) a YouTube en modo PÚBLICO con contexto completo."""
import json
import os
import re
import sys
import time
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

from google.auth.transport.requests import AuthorizedSession, Request
from google.oauth2.credentials import Credentials

TOKEN_PATHS = [
    Path(r"D:\Project Control AI\project-control-ai\admin-ops\token_youtube.json"),
    Path(r"D:\Project Control AI\project-control-ai\token_youtube.json"),
    Path(r"D:\Project Control AI\Administración de datos\token_youtube.json"),
    Path(r"D:\Soluciones Agenticas\api_youtube\token_youtube.json"),
]

VIDEO_FILE = Path(r"\\?\C:\Users\HP\Downloads\Cursos Project Control\7.- Agentes de IA\Cursos zoom\04. Presupuestos y Planificación de Obras con IA (2026-11 Tarde) [En Ejecución]\Sesión 1 - Fundamentos, Agentes y Entorno (2026-11-15)\Sesion_01_Fundamentos_Agentes_y_Entorno_YouTube.mp4")

VIDEO_INFO = {
    "title": "Agentes de IA: Presupuestos y Planificación de Obra con IA | Sesión 1: Fundamentos y Entorno Local",
    "tags": [
        "Agentes de IA", "Presupuestos de Obra", "Planificacion de Obra", "Ingenieria Civil",
        "Oficina Tecnica", "Antigravity IDE", "OpenAI Codex", "Claude Code", "Gemini",
        "WBS", "EDT", "PMBOK", "Excel Dinamico", "Project Control AI", "Aurelio Solorzano",
        "Construccion", "Costos y Presupuestos", "Cronograma de Obra", "MS Project"
    ],
    "description": """🚀 CURSO MASTERCLASS: AGENTES DE IA PARA PRESUPUESTOS Y PLANIFICACIÓN DE OBRAS
Sesión 01: Fundamentos de Agentes de IA, Configuración de Entorno Local y Estructuración de WBS/Costos en Excel.
Dictado por el Ing. Aurelio Solórzano Ríos (Project Control AI).

📌 EN ESTA SESIÓN APRENDERÁS:
1️⃣ Paradigma de Inteligencia Artificial para Ingeniería:
   - ¿Por qué el chat en la nube (ChatGPT web) pierde el contexto al subir expedientes técnicos voluminosos (límite de 10-20 archivos)?
   - Ventajas deterministas del entorno local: lectura ilimitada de documentos técnicos, planos y planillas sin perder contexto mediante resúmenes acumulativos y arquitecturas agénticas.

2️⃣ Herramientas y Entornos de Trabajo:
   - Configuración de OpenAI Codex y Antigravity IDE en la máquina local.
   - Orquestación de modelos de lenguaje (Gemini Flash, Claude Code, GPT) conectados directamente a carpetas y workspaces del sistema operativo.
   - Creación de espacios de trabajo (Workspace) estructurados para proyectos de construcción.

3️⃣ Caso Práctico y Flujo de Control Técnico:
   - Generación de EDT / WBS (Work Breakdown Structure) bajo los estándares de la guía del PMBOK.
   - Automatización de archivos Excel directamente en el equipo: supuestos de diseño, desglose de alcance, duraciones tentativas y estructura de costos.
   - Modelamiento agéntico integral de un proyecto residencial / casa de campo (3,000 m², piscina, terraza, áreas verdes y sistema de riego tecnificado) con partidas y entregables de control.

⏱️ MARCAS DE TIEMPO (TIMESTAMPS):
00:00 Introducción y presentación del curso: Agentes de IA en Construcción
04:15 Requisitos de software, modelos y cuentas para el entorno agéntico
10:30 ¿Por qué trabajar en tu computador local vs. la nube? (Límites de tokens y contexto)
18:40 Instalación, configuración y primeros pasos en OpenAI Codex y Antigravity
27:10 Configuración del Workspace y estructura de carpetas de proyecto
35:20 Generación automatizada de EDT / WBS bajo lineamientos PMBOK
44:10 Creación directa de libros Excel con fórmulas vivas, supuestos y cronograma tentativo
51:30 Modelamiento agéntico de caso real: Proyecto Casa de Campo (3,000 m²)
56:45 Conclusiones, buenas prácticas y preparación para la Sesión 2 (APUs, S10 y Presto)

📲 CONTACTO DIRECTO Y FORMACIÓN PROFESIONAL:
¿Deseas implementar soluciones agénticas en tu empresa o capacitarte en nuestros programas de ingeniería con IA?
👉 WhatsApp directo con el Ing. Aurelio Solórzano: https://wa.me/51993147501
📞 Teléfono / WhatsApp: +51 993 147 501
🌐 Plataforma Oficial: https://projectcontrolai.com
🎓 Catálogo de Formación y Programas en Vivo: https://projectcontrolai.com/formacion

#AgentesDeIA #IngenieriaCivil #Presupuestos #PlanificacionDeObras #WBS #PMBOK #CostosYPresupuestos #ProjectControlAI #AurelioSolorzano #Antigravity #Codex #Construccion #OficinaTecnica #MSProject
"""
}


def load_credentials():
    for p in TOKEN_PATHS:
        if p.exists():
            try:
                data = json.loads(p.read_text(encoding="utf-8"))
                creds = Credentials.from_authorized_user_info(data)
                if creds.expired and creds.refresh_token:
                    creds.refresh(Request())
                    p.write_text(creds.to_json(), encoding="utf-8")
                    print(f"Token refrescado y guardado en: {p}")
                session = AuthorizedSession(creds)
                r = session.get("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true")
                if r.status_code == 200:
                    ch_title = r.json().get("items", [{}])[0].get("snippet", {}).get("title")
                    print(f"Canal autenticado: {ch_title} (usando {p.name})")
                    return session
            except Exception as e:
                print(f"Error cargando {p}: {e}")
    raise RuntimeError("No se encontró ningún token_youtube.json válido")


def get_resume_offset(session, upload_url, total_size):
    headers = {"Content-Range": f"bytes */{total_size}"}
    r = session.put(upload_url, headers=headers, timeout=30)
    if r.status_code == 308:
        rng = r.headers.get("Range")
        if rng:
            m = re.match(r"bytes=0-(\d+)", rng)
            if m:
                return int(m.group(1)) + 1
        return 0
    elif r.status_code in (200, 201):
        return -1
    else:
        r.raise_for_status()


def upload_video(session):
    video_path = VIDEO_FILE
    if not video_path.exists():
        raise FileNotFoundError(f"Video no encontrado en: {video_path}")

    total_size = video_path.stat().st_size
    print("\n" + "=" * 75)
    print(f"SUBIENDO VIDEO A YOUTUBE: {VIDEO_INFO['title']}")
    print(f"Archivo: {video_path.name}")
    print(f"Tamaño: {total_size / (1024 * 1024):.2f} MB ({total_size} bytes)")
    print("Modo de Privacidad: PUBLIC (Público)")
    print("=" * 75)

    metadata = {
        "snippet": {
            "title": VIDEO_INFO["title"],
            "description": VIDEO_INFO["description"],
            "tags": VIDEO_INFO["tags"],
            "categoryId": "27",  # Educación
            "defaultLanguage": "es",
            "defaultAudioLanguage": "es",
        },
        "status": {
            "privacyStatus": "public",
            "selfDeclaredMadeForKids": False,
        },
    }

    print("Iniciando sesión resumible con la API de YouTube v3...")
    init_res = session.post(
        "https://www.googleapis.com/upload/youtube/v3/videos",
        params={"uploadType": "resumable", "part": "snippet,status"},
        headers={
            "X-Upload-Content-Length": str(total_size),
            "X-Upload-Content-Type": "video/mp4",
        },
        json=metadata,
        timeout=60,
    )
    print(f"Init status: {init_res.status_code}")
    init_res.raise_for_status()
    upload_url = init_res.headers.get("Location")
    if not upload_url:
        raise ValueError("YouTube no devolvió una URL de subida resumible")

    print("Sesión creada con éxito. Transfiriendo bloques de 8 MB...")
    chunk_size = 8 * 1024 * 1024  # 8 MB
    uploaded_bytes = 0
    t0 = time.time()

    with video_path.open("rb") as f:
        while uploaded_bytes < total_size:
            chunk = f.read(chunk_size)
            chunk_len = len(chunk)
            start_byte = uploaded_bytes
            end_byte = uploaded_bytes + chunk_len - 1

            headers = {
                "Content-Type": "video/mp4",
                "Content-Length": str(chunk_len),
                "Content-Range": f"bytes {start_byte}-{end_byte}/{total_size}",
            }

            max_retries = 5
            for attempt in range(max_retries):
                try:
                    res = session.put(upload_url, headers=headers, data=chunk, timeout=120)
                    if res.status_code in (200, 201):
                        data = res.json()
                        video_id = data.get("id")
                        elapsed = time.time() - t0
                        print("\n" + "=" * 75)
                        print(f"✅ ¡SUBIDA COMPLETADA CON ÉXITO AL 100% EN {elapsed:.1f}s ({elapsed/60:.2f} min)!")
                        print(f"Video ID: {video_id}")
                        print(f"URL Corta: https://youtu.be/{video_id}")
                        print(f"URL Estudio: https://studio.youtube.com/video/{video_id}/edit")
                        print("=" * 75)

                        result_info = {
                            "video_id": video_id,
                            "url": f"https://youtu.be/{video_id}",
                            "title": VIDEO_INFO["title"],
                            "privacy": "public",
                            "uploaded_at": time.strftime("%Y-%m-%d %H:%M:%S"),
                        }
                        result_path = Path(r"D:\Project Control AI\project-control-ai\admin-ops\scripts\youtube_upload_sesion_01_result.json")
                        result_path.write_text(json.dumps(result_info, indent=2, ensure_ascii=False), encoding="utf-8")
                        return video_id
                    elif res.status_code == 308:
                        uploaded_bytes = end_byte + 1
                        pct = (uploaded_bytes / total_size) * 100
                        mb = uploaded_bytes / (1024 * 1024)
                        tot_mb = total_size / (1024 * 1024)
                        elapsed = time.time() - t0
                        speed = mb / elapsed if elapsed > 0 else 0
                        print(f"Progreso: {pct:5.1f}% | {mb:6.1f} / {tot_mb:6.1f} MB | {speed:4.2f} MB/s", end="\r", flush=True)
                        break
                    else:
                        print(f"\nRespuesta inesperada: HTTP {res.status_code}: {res.text}")
                except Exception as e:
                    print(f"\nError en intento {attempt+1}/{max_retries}: {e}")
                    time.sleep(3 * (attempt + 1))
                    offset = get_resume_offset(session, upload_url, total_size)
                    if offset == -1:
                        print("\nEl video ya se completó en el servidor.")
                        return None
                    elif offset is not None:
                        uploaded_bytes = offset
                        f.seek(uploaded_bytes)
                        break


def main():
    print("Autenticando con la API de YouTube...")
    session = load_credentials()
    upload_video(session)


if __name__ == "__main__":
    main()
