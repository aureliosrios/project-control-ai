"""Script para subir el video del Agente de Ingesta Excel a S10 Nativo a YouTube en modo PÚBLICO."""
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
    "id_name": "Ingesta_Excel_a_S10_SQL_Nativo",
    "file": Path(r"D:\Soluciones Agenticas\05 Ingesta Excel - S10\2026-10-29 17-38-37_Editado_Dinamico_1.1x_15x.mp4"),
    "title": "Agente de IA: Ingesta de Presupuestos Excel a S10 Nativo (SQL Server) | APU, WBS e Índices INEI",
    "tags": [
        "Agente IA", "S10", "S10 Presupuestos", "Excel a S10", "SQL Server", "APU",
        "Costos y Presupuestos", "Indices Unificados", "INEI", "Project Control AI",
        "Aurelio Solorzano", "Ingenieria Civil", "Oficina Tecnica", "Python", "T-SQL"
    ],
    "description": """🚀 AGENTE DE INTELIGENCIA ARTIFICIAL PARA INGESTA DE PRESUPUESTOS EXCEL A S10 NATIVO (SQL SERVER)
Demostración práctica en tiempo real: cómo un Agente de IA especializado en Ingeniería de Costos convierte un presupuesto completo en Excel (con títulos, partidas, APUs, insumos, subpartidas anidadas y pie de presupuesto) en registros directos del esquema nativo de S10 Presupuestos en SQL Server, 100% transaccional y auditable.

📌 ¿QUÉ HACE ESTE AGENTE DE INGESTA EXCEL A S10?
1️⃣ Ingesta Relacional Determinista y Jerarquía WBS:
   - Lee el libro maestro Excel del proyecto y estructura el árbol WBS (títulos y partidas en múltiples niveles).
   - Registra subpartidas anidadas con Tipo=2 y dependencias multinivel en PartidaDetalle.
   - Preserva metrados, rendimientos, cuadrillas y costos directos sin pérdida de precisión.

2️⃣ Homologación Total a Índices Unificados (INEI):
   - Mapea y valida el 100% de los recursos contra el catálogo oficial de los 68 Índices Unificados del INEI.
   - Reglas claras para subcontratos (IU 39), herramientas manuales (IU 37), combustibles/lubricantes (IU 34) e insumos porcentuales.
   - Cero recursos huérfanos o sin índice de reajuste.

3️⃣ Carga Atómica Transaccional en Base de Datos S10 (SQL Server):
   - Genera script T-SQL transaccional (BEGIN TRAN ... COMMIT).
   - Siembra catálogos base (Moneda, Unidad, Ubigeo, IndiceUnificado) si no existen.
   - Comprobación matemática estricta: Suma de Hoja = Suma de Insumos = Costo Directo. Si difiere en un centavo, ejecuta ROLLBACK automático.
   - Simulación en copia temporal para certificar compatibilidad total antes de abrirlo en S10 Presupuestos.

📲 ¿QUIERES IMPLEMENTAR O ADQUIRIR ESTE AGENTE PARA TU EMPRESA O PROYECTOS?
Comunícate directamente con el Ing. Aurelio Solórzano para coordinar acceso y consultoría:
👉 WhatsApp directo: https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20vi%20la%20guia%20del%20Agente%20de%20Ingesta%20Excel%20a%20S10%20y%20deseo%20adquirirlo
🎬 Alcance y resultado en TikTok: https://vt.tiktok.com/ZSgtw7FYv/
📞 Teléfono / WhatsApp: +51 993 147 501
🌐 Plataforma oficial: https://projectcontrolai.com/servicios?tab=agentes#agentes
🎓 Formación y Clases en Vivo: https://projectcontrolai.com/formacion

#AgenteIA #S10 #S10Presupuestos #ExcelaS10 #SQLServer #CostosYPresupuestos #IngenieriaCivil #OficinaTecnica #ProjectControlAI #AurelioSolorzano #Construccion #APU #Python
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
    print("=== SUBIENDO VIDEO AGENTE DE INGESTA EXCEL A S10 A YOUTUBE (MODO PÚBLICO) ===")
    session = get_authenticated_session()
    res = upload_video(session, VIDEO_INFO)
    print("Resultado:")
    print(json.dumps(res, indent=2))
    
    # Guardar resultado en archivo local para registro
    out_json = Path(r"D:\Project Control AI\project-control-ai\admin-ops\scripts\youtube_upload_s10_ingesta_result.json")
    out_json.write_text(json.dumps(res, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Registro guardado en: {out_json}")


if __name__ == "__main__":
    main()
