"""Script para subir el video del Agente de Estados de Pago (Valorización) - Obra Privada a YouTube en modo PÚBLICO."""
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
    "id_name": "Agente_Estados_de_Pago_EDP_Privado",
    "file": Path(r"D:\Soluciones Agenticas\09_Agente_Estado de pago (Valorización)\04_VIDEO_EDITADO\2026-11-13 18-09-16_editado.mp4"),
    "title": "Agente de IA: Estados de Pago (Valorización) en Obra Privada | Sustento de Metrados Trazable",
    "tags": [
        "Agente IA", "Estados de Pago", "EDP", "Valorizaciones", "Obra Privada",
        "Suma Alzada", "Reporte Diario", "Protocolos QA QC", "Ordenes de Cambio",
        "RFI", "Transmittals", "Project Control AI", "Aurelio Solorzano",
        "Ingenieria Civil", "Oficina Tecnica", "FIDIC", "NEC4", "PMI"
    ],
    "description": """🚀 AGENTE DE INTELIGENCIA ARTIFICIAL PARA ESTADOS DE PAGO (VALORIZACIÓN) EN OBRA PRIVADA
Demostración práctica del Agente EDP Privado: cómo preparar los Estados de Pago mensuales de una obra privada a suma alzada (referencias FIDIC · NEC4 · PMI) cruzando los documentos reales de obra para que cada metrado certificado tenga su sustento trazable: reporte diario, protocolo de cierre u orden de cambio.

📥 ENTRADA DE DATOS (7 GRUPOS DE INSUMOS EN 01_INSUMOS):
1️⃣ Presupuesto con APU (JSON, Excel S10, resumen): partidas, metrados y precios unitarios.
2️⃣ Cronograma de Línea Base LB-0: contraste y contexto zonificado.
3️⃣ Reportes Diarios de Obra (DPR): avance diario por actividad y zona (Excel/JSON).
4️⃣ Protocolos de Cierre QA/QC: liberación, firmas de residente/supervisor y metrado protocolizado.
5️⃣ Ingeniería (RFI y Transmittals): logs y PDFs individuales con rastro documental y SLA.
6️⃣ Gestión del Cambio (Change Orders / Credit Variations): cambios aprobados, EOT y parámetros contractuales.
7️⃣ Estado de Pago Anterior (Excel): acumulados, pie de liquidación, criterio y fecha de corte.

⚙️ VALIDACIÓN Y CRITERIO DE CERTIFICACIÓN:
- Pipeline en 13 pasos con identificación automática por rol y validaciones V01–V14 / E00–E04 (si falta un insumo o hay inconsistencia, reporta ERROR y no calcula).
- Respeta la decisión del profesional y del cliente con selector de criterio en una sola celda:
  • Criterio 1: Solo lo protocolizado (actividades con protocolo firmado al corte).
  • Criterio 2: Protocolizado + reporte diario (DPR).
- Respeta la moneda de los insumos (US$, S/, pesos) y deja los bloques de firma para las personas.

📤 SALIDA DE DATOS (03_SALIDA):
- Libro Excel oficial por periodo con 8 hojas y FÓRMULAS VIVAS (recálculo verificado con LibreOffice):
  • Resumen_EDP (liquidación financiera y líquido a pagar)
  • Contrato_Vigente (contrato original + CO − CV)
  • Valorizacion_Contractual (partidas, anterior, actual, acumulado y saldo)
  • Valorizacion_Cambios (CO y CV)
  • Sustento_Metrados (trazabilidad fila por actividad-zona con selector de criterio)
  • Sustento_Metrados_CO (metrados verificados de cada Change Order)
  • Sustento_Documental (DPR, protocolos, RFI, órdenes y transmittals del mes)
  • Parametros (GG, utilidad, IGV, anticipos y cortes)
- Archivo JSON estructurado, Informe Ejecutivo en Markdown, Matriz Consolidada multi-EDP y reportes de verificación (S01–S08).

📲 ¿QUIERES IMPLEMENTAR O ADQUIRIR ESTE AGENTE PARA TU EMPRESA O PROYECTOS?
Comunícate directamente con el Ing. Aurelio Solórzano para coordinar acceso y consultoría:
👉 WhatsApp directo: https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20vi%20el%20video%20del%20Agente%20de%20Estados%20de%20Pago%20(Valorizaci%C3%B3n)%20-%20Obra%20Privada%20y%20deseo%20adquirirlo
📞 Teléfono / WhatsApp: +51 993 147 501
🌐 Plataforma oficial: https://projectcontrolai.com/servicios?tab=agentes#agentes
🎓 Formación y Clases en Vivo: https://projectcontrolai.com/formacion

#AgenteIA #EstadosDePago #Valorizaciones #ObraPrivada #ControlDeProyectos #OficinaTecnica #ProjectControlAI #AurelioSolorzano #IngenieriaCivil #Construccion
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
    print(f"Init status: {init_res.status_code}")
    if init_res.status_code != 200:
        print(f"Init response: {init_res.text}")
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
    print("=== SUBIENDO VIDEO AGENTE DE ESTADOS DE PAGO (EDP PRIVADO) A YOUTUBE (MODO PÚBLICO) ===")
    session = get_authenticated_session()
    res = upload_video(session, VIDEO_INFO)
    print("Resultado:")
    print(json.dumps(res, indent=2))

    out_json = Path(r"D:\Project Control AI\project-control-ai\admin-ops\scripts\youtube_upload_edp_privado_result.json")
    out_json.write_text(json.dumps(res, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Registro guardado en: {out_json}")


if __name__ == "__main__":
    main()

