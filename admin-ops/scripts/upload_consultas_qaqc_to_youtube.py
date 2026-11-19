"""Script para subir el video del Agente de Consultas de Obra & Calidad QA/QC (Cerebro Digital) a YouTube en modo PÚBLICO."""
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
    "id_name": "Agente_Consultas_Obra_QAQC_Cerebro_Digital",
    "file": Path(r"d:\Soluciones Agenticas\14.-Gestión de calidad_Consultas con Cerebro digital\Video_Final_Audio_Mejorado.mp4"),
    "title": "Agente de IA: Cerebro Digital para Consultas de Obra y Calidad QA/QC (Civil y Metalmecánica)",
    "tags": [
        "Agente IA", "Cerebro Digital", "Calidad QA/QC", "Consultas de Obra", "RFI",
        "Compras Discrepantes", "Reclamos Contractuales", "API 653", "API 650", "ASME IX",
        "RNE", "GRI-GM13", "Project Control AI", "Aurelio Solorzano", "Ingenieria Civil"
    ],
    "description": """🚀 AGENTE DE INTELIGENCIA ARTIFICIAL: CEREBRO DIGITAL PARA CONSULTAS DE OBRA Y CALIDAD QA/QC
Demostración práctica en proyecto real civil y metalmecánico (parque de tanques TK-101/102/103 y área estanca HDPE): cómo auditar la documentación, eliminar incoherencias y construir un Cerebro Digital con Wiki + Grafo de Conocimiento para responder consultas internas y externas al instante.

📌 ¿QUÉ RESUELVE ESTE AGENTE?
1️⃣ Auditoría y saneamiento documental: paridad PDF/Word/Excel para el equipo y Markdown/JSON estructurado con IDs para la IA.
2️⃣ Selección normativa estricta: API 653, API 650, ASME V/IX, API RP 651/652, RNE E.050/E.060 y GRI-GM13 (segregando normas no aplicables como API 620).
3️⃣ Consultas Internas (Compras de Materiales): validación frente a EETT y normas para evitar rechazos en obra y penalidades (PEN-QA-02).
4️⃣ Consultas Externas (RFIs y Reclamos Contractuales): dictámenes trazables por partida_id con jerarquía documental, plazos 7/21 días y control de cambios CR-*.

📲 ¿QUIERES ADQUIRIR ESTE AGENTE O IMPLEMENTARLO EN TU EMPRESA?
👉 WhatsApp directo: https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20vi%20el%20video%20del%20Agente%20de%20Consultas%20de%20Obra%20y%20Calidad%20QA/QC%20y%20deseo%20adquirirlo
📞 Teléfono / WhatsApp: +51 993 147 501
🌐 Plataforma oficial: https://projectcontrolai.com/servicios?tab=agentes#agentes
🎓 Formación y Clases en Vivo: https://projectcontrolai.com/formacion

#AgenteIA #CerebroDigital #CalidadQAQC #RFI #ControlDeProyectos #API653 #IngenieriaCivil #Metalmecanica #ProjectControlAI #AurelioSolorzano
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
    out_json = Path(r"D:\Project Control AI\project-control-ai\admin-ops\scripts\youtube_upload_consultas_qaqc_result.json")
    save_json(out_json, res)
    print(json.dumps(res, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
