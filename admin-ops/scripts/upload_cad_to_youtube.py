"""Script para subir el video del Agente de Digitalización de Planos (PDF, PNG, JPG a DWG) a YouTube en modo PÚBLICO."""
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

VIDEO_INFO = {
    "id_name": "Digitalizacion_PDF_PNG_JPG_a_DWG",
    "file": Path(r"D:\Soluciones Agenticas\04 Digitalización PDF, PNG a DWG\Videos\Video_Final_Optimizado.mp4"),
    "title": "Agente de IA para Digitalización de Planos PDF, PNG y JPG a DWG | Restitución CAD Automatizada",
    "tags": [
        "Agente IA", "PDF a DWG", "PNG a DWG", "JPG a DWG", "AutoCAD", "Digitalizacion de Planos",
        "Vectorizacion CAD", "DXF a DWG", "Project Control AI", "Aurelio Solorzano", "Ingenieria Civil",
        "Estructuras", "ezdxf", "PyMuPDF", "Oficina Tecnica", "Construccion"
    ],
    "description": """🚀 AGENTE DE INTELIGENCIA ARTIFICIAL PARA DIGITALIZACIÓN DE PLANOS (PDF, PNG, JPG A DWG / DXF)
Demostración práctica en tiempo real: cómo un Agente de IA especializado en Ingeniería y CAD restituye, vectoriza y estandariza planos desde formatos PDF (vectoriales o escaneados), imágenes PNG y JPG hacia archivos nativos editables de AutoCAD (.DWG y .DXF R2018) con precisión milimétrica, capas ordenadas por disciplina, bloques reutilizables y lámina configurada en espacio papel.

📌 ¿CÓMO FUNCIONA EL AGENTE DIGITALIZADOR CAD?
1️⃣ Diagnóstico y Calibración Geométrica Escala 1:1:
   - Analiza metadatos, capas OCG del PDF, trazos vectoriales, textos, grosores y resolución de imágenes.
   - Calibra automáticamente el factor de escala tomando como referencia las cotas escritas del plano para restituir toda la geometría en milímetros reales (1:1) en el Espacio Modelo.
   - Separa múltiples vistas con diferentes escalas (1:100, 1:50, 1:20) y genera sus respectivos Viewports calibrados en Espacio Papel (Layout A1/A0).

2️⃣ Estandarización Profesional por Capas y Bloques (ISO / AIA):
   - Organiza y conserva las capas por disciplina (Estructuras, Arquitectura, Civil, Mecánica, Eléctrica, Ejes, Cotas, Textos, Achurados y Cajetín).
   - Detecta geometría repetitiva (pernos, placas, símbolos, perfiles, burbujas de ejes) y la convierte en bloques nativos reutilizables (INSERT).
   - Reconstruye rellenos y patrones como entidades HATCH cerradas, polilíneas optimizadas (LWPOLYLINE) y textos editables.

3️⃣ Conversión Nativa con AutoCAD Core Console y Control de Calidad:
   - Valida geométricamente las cotas principales (error menor a 0.06%), cero capas vacías y cero entidades sueltas en capa 0.
   - Compila a .DWG nativo mediante AutoCAD Core Console ejecutando AUDIT y PURGE automáticos (0 errores).
   - Genera comparativa visual lado a lado (Plano Fuente vs. Plano Restituido) e Informe Técnico de Digitalización en Markdown.

🏗️ CASO REAL DEMOSTRADO EN EL VIDEO:
Plano Estructural e Industrial: Almacén de Químicos — Planta, Techo y Pórtico (P58-100-PL-ME-001):
- 84 capas estructuradas y 24,465 entidades en espacio modelo.
- 5 vistas independizadas (escalas 1:100, 1:50 y 1:20) con 5 viewports calibrados en lámina A1.
- Verificación de ejes a 5,000 mm, 55,000 mm y 9,400 mm con precisión superior al 99.93%.

📲 ¿QUIERES IMPLEMENTAR O ADQUIRIR ESTE AGENTE PARA TUS PROYECTOS?
Comunícate directamente con el Ing. Aurelio Solórzano para coordinar acceso y consultoría:
👉 WhatsApp directo: https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20vi%20la%20guia%20del%20Agente%20de%20Digitalizacion%20de%20Planos%20a%20DWG%20y%20deseo%20adquirirlo
🎬 Alcance en TikTok: https://vt.tiktok.com/ZSg4H7Urm/
📞 Teléfono / WhatsApp: +51 993 147 501
🌐 Plataforma oficial: https://projectcontrolai.com/servicios?tab=agentes#agentes
🎓 Formación y Clases en Vivo: https://projectcontrolai.com/formacion

#AgenteIA #PDFaDWG #AutoCAD #PlanosCAD #DigitalizacionDePlanos #IngenieriaCivil #OficinaTecnica #ProjectControlAI #AurelioSolorzano #Construccion #InteligenciaArtificial
"""
}


def save_json(path, data):
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    tmp = p.with_suffix(".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    os.replace(tmp, p)


def get_authenticated_session():
    found_token = None
    for tp in TOKEN_PATHS:
        if tp.exists():
            found_token = tp
            break

    if not found_token:
        raise FileNotFoundError(f"Token no encontrado en ninguna ruta conocida: {TOKEN_PATHS}")

    print(f"Cargando credenciales OAuth desde: {found_token}")
    creds = Credentials.from_authorized_user_file(found_token)
    if creds.expired and creds.refresh_token:
        print("Refrescando token OAuth de YouTube...")
        creds.refresh(Request())
        creds_json = json.loads(creds.to_json())
        for tp in TOKEN_PATHS:
            try:
                save_json(tp, creds_json)
                print(f"Token sincronizado en: {tp}")
            except Exception:
                pass

    if not creds.valid:
        raise ValueError("Token de YouTube no válido. Ejecute auth_youtube.py")

    return AuthorizedSession(creds)


def next_offset(response):
    val = response.headers.get("Range", "")
    if not val:
        return 0
    m = re.fullmatch(r"bytes=0-(\d+)", val)
    if not m:
        raise ValueError(f"Range header inesperado: {val}")
    return int(m[1]) + 1


def upload_video(session, vinfo):
    video_path = vinfo["file"]
    if not video_path.exists():
        raise FileNotFoundError(f"Video no encontrado en: {video_path}")

    total_size = video_path.stat().st_size
    print("\n" + "=" * 70)
    print(f"SUBIENDO VIDEO A YOUTUBE: {vinfo['title']}")
    print(f"Archivo: {video_path.name}")
    print(f"Tamaño: {total_size / (1024 * 1024):.2f} MB")
    print("Modo de Privacidad: PUBLIC (Público)")
    print("=" * 70)

    metadata = {
        "snippet": {
            "title": vinfo["title"],
            "description": vinfo["description"],
            "tags": vinfo["tags"],
            "categoryId": "27",
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
                        print("\n" + "=" * 70)
                        print(f"✅ ¡SUBIDA COMPLETADA CON ÉXITO AL 100% EN {elapsed:.1f}s ({elapsed/60:.2f} min)!")
                        print(f"Video ID: {video_id}")
                        print(f"URL Corta: https://youtu.be/{video_id}")
                        print(f"URL Completa: https://www.youtube.com/watch?v={video_id}")
                        print(f"Estado de Privacidad: {data.get('status', {}).get('privacyStatus')}")
                        print("=" * 70 + "\n")
                        return {
                            "name": vinfo["id_name"],
                            "id": video_id,
                            "url": f"https://youtu.be/{video_id}",
                            "title": vinfo["title"]
                        }
                    elif res.status_code == 308:
                        uploaded_bytes = next_offset(res)
                        pct = (uploaded_bytes / total_size) * 100
                        mb_up = uploaded_bytes / (1024 * 1024)
                        mb_tot = total_size / (1024 * 1024)
                        sys.stdout.write(f"\r  Progreso: {pct:.1f}% ({mb_up:.2f} / {mb_tot:.2f} MB)")
                        sys.stdout.flush()
                        f.seek(uploaded_bytes)
                        break
                    else:
                        print(f"\nRespuesta inesperada {res.status_code}: {res.text}. Reintentando...")
                        time.sleep(2)
                except Exception as ex:
                    print(f"\nReintento {attempt+1} por problema de conexión: {ex}")
                    time.sleep(3)
                    if attempt == max_retries - 1:
                        raise

    raise RuntimeError("Subida terminada sin confirmación de ID por YouTube")


def main():
    print("=== SUBIENDO VIDEO AGENTE DIGITALIZADOR CAD A YOUTUBE (MODO PÚBLICO) ===")
    session = get_authenticated_session()
    res = upload_video(session, VIDEO_INFO)
    print("Resultado:")
    print(json.dumps(res, indent=2))


if __name__ == "__main__":
    main()
