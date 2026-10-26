"""Script para subir el video del Agente de Presupuestos Presto a YouTube en modo PÚBLICO."""
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
    "id_name": "Presupuesto_Presto",
    "file": Path(r"D:\Soluciones Agenticas\02 Agente presupuesto tipo Presto\2026-10-24 20-43-37_Editado_Dinamico_1.1x_15x.mp4"),
    "title": "Agente de IA para Presupuestos y APU Tipo Presto | De Expediente a Excel y BC3 con Fórmulas Vivas",
    "tags": [
        "Agente IA", "Presupuesto Presto", "Costos y Presupuestos", "APU", "Presto RIB",
        "FIEBDC", "BC3", "Project Control AI", "Aurelio Solorzano", "Ingenieria Civil",
        "Openpyxl", "Cerebro Digital", "Grafo de Conocimiento", "Expediente Tecnico", "Metrados", "Construccion"
    ],
    "description": """🚀 AGENTE DE INTELIGENCIA ARTIFICIAL PARA PRESUPUESTOS Y APU TIPO PRESTO [EXCEL & BC3]
Demostración operativa completa y en tiempo real: cómo un Agente de IA especializado transforma expedientes técnicos de ingeniería civil y edificación (Memoria Descriptiva, EETT, Planilla de Metrados y Cotizaciones en PDF/Excel) en un Presupuesto Profesional en formato Presto (RIB Software) con trazabilidad matemática total, fórmulas vivas y archivo nativo BC3 (FIEBDC-3/2020).

📌 ¿CÓMO FUNCIONA EL SISTEMA AGÉNTICO EN FORMATO PRESTO?
1️⃣ Ingesta Determinista y Cerebro Digital:
   - Procesa los PDFs y Excel originales sin alterar un solo dato ni alucinar valores.
   - Construye una Wiki técnica estructurada y un Grafo de Conocimiento navegable.
   - Trazabilidad absoluta: cada partida, código de concepto, recurso y cotización apunta a su localizador exacto en el expediente.

2️⃣ Estructuración en Formato Presto (RIB Software):
   - Jerarquía WBS multinivel: Capítulos, Subcapítulos, Partidas y Precios Unitarios Descompuestos.
   - Clasificación por Naturalezas: Mano de Obra, Maquinaria/Equipo, Materiales y Subcontratas.
   - Desglose riguroso de Costes Indirectos (Gastos Generales Fijos y Variables) y Beneficio Industrial (Utilidad).

3️⃣ Cero Alucinaciones y Fórmulas Vivas en Excel + Exportación BC3:
   - Libro Excel nativo con fórmulas 100% vivas: recálculo automático instantáneo si ajustas cualquier rendimiento o precio de insumo.
   - Archivo estándar BC3 (FIEBDC-3/2020) generado y validado para importación directa en Presto u otros softwares de presupuestos.
   - Verificación de consistencia y balanceo matemático automatizado.

🏗️ CASO REAL DEMOSTRADO EN EL VIDEO:
Proyecto EDU_SURQUILLO: Edificio Educativo de 6 pisos, 2 sótanos y azotea.
- Estructura completa de partidas y metrados.
- APUs descompuestos por naturaleza.
- Libro oficial Excel Presto y archivo estándar de intercambio .bc3.

⏱️ LÍNEA DE TIEMPO DEL VIDEO:
00:00 Introducción al Agente de Presupuestos en formato Presto
01:30 Insumos del expediente técnico (Memoria, EETT, Metrados y Cotizaciones)
03:45 Procesamiento agéntico y construcción del Cerebro Digital
06:30 Generación del Presupuesto en Excel con formato Presto y fórmulas vivas
09:15 Descomposición de Precios Unitarios (APUs) y naturalezas
11:40 Generación y validación del archivo BC3 (FIEBDC) para Presto
13:30 Auditoría final, carpeta autocontenida y verificación matemática

📲 ¿QUIERES IMPLEMENTAR O ADQUIRIR ESTE AGENTE PARA TUS PROYECTOS?
Comunícate directamente con el Ing. Aurelio Solórzano para coordinar acceso y consultoría:
👉 WhatsApp directo: https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20vi%20la%20guia%20del%20Agente%20de%20Presupuestos%20Tipo%20Presto%20y%20deseo%20adquirirlo
📞 Teléfono / WhatsApp: +51 993 147 501
🌐 Plataforma oficial: https://projectcontrolai.com/servicios?tab=agentes#agentes
🎓 Formación y Clases en Vivo: https://projectcontrolai.com/formacion

#AgenteIA #PresupuestosPresto #Presto #CostosYPresupuestos #BC3 #FIEBDC #IngenieriaCivil #ProjectControlAI #AurelioSolorzano #Construccion #InteligenciaArtificial
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
            "categoryId": "27",  # Educación / Tecnología
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
    print("=== SUBIENDO VIDEO AGENTE PRESTO A YOUTUBE (MODO PÚBLICO) ===")
    session = get_authenticated_session()
    res = upload_video(session, VIDEO_INFO)
    print("Resultado:")
    print(json.dumps(res, indent=2))


if __name__ == "__main__":
    main()
