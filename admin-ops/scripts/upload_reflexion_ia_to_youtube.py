"""Script para subir el video de Reflexión sobre la IA y las Herramientas del Conocimiento a YouTube en modo PÚBLICO."""
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
]

VIDEO_INFO = {
    "id_name": "Reflexion_IA_Herramientas_Conocimiento",
    "file": Path(r"D:\Agentes de IA\Agente Varios\Varios varios Varios\Reflexión IA\Reflexion_IA_Google_Flow_Completo.mp4"),
    "title": "¿La IA nos hará dejar de pensar? | Evolución de las herramientas del conocimiento",
    "tags": [
        "Inteligencia Artificial", "IA", "Educacion", "Pensamiento Critico", "Reflexion IA",
        "Historia de la Tecnologia", "ChatGPT", "Gemini", "Project Control AI",
        "Aurelio Solorzano", "Aprendizaje", "Agentes de IA"
    ],
    "description": """🧠 ¿LA INTELIGENCIA ARTIFICIAL NOS HARÁ DEJAR DE PENSAR?
Cada vez que aparece una herramienta nueva, vuelve el mismo miedo. Pero la historia demuestra que el problema nunca fue la herramienta, sino aprender a pensar mejor con ella.

⏳ EL PATRÓN HISTÓRICO:
• ~370 a.C. (Escritura): Temían que destruyera la memoria → permitió acumular ciencia.
• 1450 (Imprenta): Temían que dejaran de memorizar → hizo circular el conocimiento.
• 1985 (Calculadora): Temían el fin de las matemáticas → hacer cuentas ≠ saber razonar.
• 1990s (Excel y CAD): Temían olvidar calcular → liberó tiempo para diseñar.
• 2005 (Internet): Temían que copiaran todo → encontrar información ≠ entenderla.
• 2010s (GPS): Temían perder la orientación → seguir una flecha ≠ leer el camino.
• 2026 (IA): Temen que dejemos de pensar → tener una respuesta ≠ haber aprendido.

💡 CONCLUSIÓN:
Las herramientas no reemplazan el pensamiento de quien las domina; solo elevan el estándar. La ventaja no está en acumular más herramientas de IA, sino en hacer mejores preguntas, verificar fuentes reales y conservar siempre tu criterio.

🌐 Conoce nuestras soluciones agénticas y formación en:
👉 https://projectcontrolai.com
📲 WhatsApp directo: https://wa.me/51993147501

#InteligenciaArtificial #ReflexionIA #PensamientoCritico #Educacion #AgentesIA #ProjectControlAI #AurelioSolorzano
"""
}


def save_json(path, data):
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    tmp = p.with_suffix(".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    os.replace(tmp, p)


def get_authenticated_session():
    found_token = next((tp for tp in TOKEN_PATHS if tp.exists()), None)
    if not found_token:
        raise FileNotFoundError(f"Token no encontrado en: {TOKEN_PATHS}")
    print(f"Cargando credenciales OAuth desde: {found_token}")
    creds = Credentials.from_authorized_user_file(found_token)
    if creds.expired and creds.refresh_token:
        print("Refrescando token OAuth de YouTube...")
        creds.refresh(Request())
        creds_json = json.loads(creds.to_json())
        for tp in TOKEN_PATHS:
            try:
                save_json(tp, creds_json)
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
    print(f"SUBIENDO VIDEO A YOUTUBE: {vinfo['title']} ({total_size / (1024 * 1024):.2f} MB)")

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
    if init_res.status_code != 200:
        print(f"Init response ({init_res.status_code}): {init_res.text}")
    init_res.raise_for_status()
    upload_url = init_res.headers.get("Location")
    if not upload_url:
        raise ValueError("YouTube no devolvió una URL de subida resumible")

    chunk_size = 8 * 1024 * 1024
    uploaded_bytes = 0
    t0 = time.time()

    with video_path.open("rb") as f:
        while uploaded_bytes < total_size:
            chunk = f.read(chunk_size)
            chunk_len = len(chunk)
            headers = {
                "Content-Type": "video/mp4",
                "Content-Length": str(chunk_len),
                "Content-Range": f"bytes {uploaded_bytes}-{uploaded_bytes + chunk_len - 1}/{total_size}",
            }
            for attempt in range(5):
                try:
                    res = session.put(upload_url, headers=headers, data=chunk, timeout=120)
                    if res.status_code in (200, 201):
                        data = res.json()
                        video_id = data.get("id")
                        print(f"\nSUBIDA COMPLETADA en {time.time() - t0:.1f}s -> Video ID: {video_id}")
                        return {
                            "name": vinfo["id_name"],
                            "id": video_id,
                            "url": f"https://youtu.be/{video_id}",
                            "title": vinfo["title"],
                        }
                    elif res.status_code == 308:
                        uploaded_bytes = next_offset(res)
                        f.seek(uploaded_bytes)
                        break
                    else:
                        print(f"Respuesta {res.status_code}: {res.text}")
                        time.sleep(2)
                except Exception as ex:
                    print(f"Reintento {attempt + 1}: {ex}")
                    time.sleep(3)
                    if attempt == 4:
                        raise
    raise RuntimeError("Subida terminada sin confirmación de ID por YouTube")


def main():
    session = get_authenticated_session()
    res = upload_video(session, VIDEO_INFO)
    out_json = Path(r"D:\Project Control AI\project-control-ai\admin-ops\scripts\youtube_upload_reflexion_ia_result.json")
    save_json(out_json, res)
    print(json.dumps(res, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
