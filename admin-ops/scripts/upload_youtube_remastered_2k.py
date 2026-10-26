"""Script automatizado para subir los videos remasterizados a 2K a YouTube en modo PÚBLICO."""
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

VIDEOS_TO_UPLOAD = [
    {
        "id_name": "Planeamiento_4D_5D",
        "file": Path(r"D:\Soluciones Agenticas\03 Curso de Planeamiento 4D\Videos_guia\Sesion_01_Planeamiento_Obra_4D5D_2K_YouTube.mp4"),
        "title": "Agente para Planeamiento de Obra 4D y 5D con IA | De Planos y Cronograma a Visor 3D [2K]",
        "tags": [
            "Agente IA", "Planeamiento de Obra", "BIM 4D", "BIM 5D", "Project Control AI",
            "Aurelio Solorzano", "Curva S", "Last Planner System", "Lookahead", "Three.js",
            "Construccion 4D", "Primavera P6", "MS Project", "Refineria Conchan", "Gateo Inverso", "Ingenieria Civil"
        ],
        "description": """🚀 AGENTE DE PLANEAMIENTO DE OBRA 4D Y 5D CON INTELIGENCIA ARTIFICIAL [VERSIÓN 2K HD]
Aprende cómo transformar tus Planos (DWG/DXF), Cronograma de Obra y Presupuesto en un Visor Web 3D interactivo en segundos con Inteligencia Artificial.

En este video te mostramos la guía práctica de aplicación de nuestro Agente de IA para Planeamiento y Control de Proyectos de Construcción e Ingeniería.

📌 ¿CÓMO FUNCIONA EL AGENTE?
1️⃣ Solo necesitas proporcionarle al Agente de IA tus insumos de obra:
   - Planos generales del proyecto (DWG / DXF / PDF).
   - Cronograma maestro de obra (Primavera P6, MS Project o Excel).
   - Presupuesto desglosado y EDT / WBS (APUs, costos directos e indirectos).
2️⃣ El Agente de IA analiza la geometría, vincula partidas con fechas y costos, y genera de forma 100% automatizada un VISOR 4D/5D INTERACTIVO en Three.js / WebGL.
3️⃣ En el visor interactivo podrás:
   - Modelar en 3D todo el proceso constructivo con semáforo dinámico de obra.
   - Navegar la línea de tiempo día a día (Simulación 4D temporal).
   - Monitorear el Presupuesto valorizado y Curva S (Dimensión 5D financiera y EVM).
   - Gestionar el Lookahead Planning (Last Planner System) a 4 semanas y cuantificar la cuadrilla de mano de obra en campo.

🏗️ CASO DE APLICACIÓN REAL EN EL VIDEO:
Proyecto de Ampliación de Capacidad de Almacenamiento en Refinería Conchán (Petroperú):
- Montaje de 2 Tanques de almacenamiento de 160,000 Bls (Norma API 650) por sistema de gateo inverso (jacking system).
- Cubeto de retención estanco de concreto armado de 755.4 metros lineales.
- Horizonte de 478 días calendario y presupuesto base de $16.8M USD.

⏱️ CAPÍTULOS / LÍNEA DE TIEMPO DEL VIDEO:
00:00 Introducción y presentación del proyecto
01:30 Insumos requeridos: Planos DWG, Cronograma y Presupuesto
03:15 Instrucciones y prompt maestro al Agente de Planeamiento 4D/5D
06:15 Procesamiento del Agente y generación de entidades 3D (Timelapse)
09:24 Visor 3D Interactivo: Inspección por el Ing. Aurelio Solórzano
10:30 Simulación 4D del proceso constructivo día a día
11:20 Control 5D: Curva S, Costo Devengado y Lookahead Semanal
12:45 ¿Cómo adquirir e implementar este Agente en tu empresa?

📲 ¿QUIERES TENER ESTE AGENTE PARA TUS PROYECTOS?
Comunícate directamente conmigo para adquirir el agente o solicitar una demostración personalizada:
👉 WhatsApp directo: https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20deseo%20adquirir%20el%20Agente%20de%20Planeamiento%20de%20Obra%204D5D
📞 Celular / WhatsApp: +51 993 147 501
🌐 Plataforma oficial: https://projectcontrolai.com
🎓 Cursos y Formación Agéntica: https://projectcontrolai.com/formacion

#AgenteIA #PlaneamientoDeObra #BIM4D #BIM5D #ProjectControlAI #PrimaveraP6 #CurvaS #LastPlannerSystem #IngenieriaCivil #Construccion #InteligenciaArtificial
"""
    },
    {
        "id_name": "Presupuesto_S10",
        "file": Path(r"D:\Soluciones Agenticas\01 Agente presupuesto tipo S10\Video Guia\Video_Guia_Agente_Presupuesto_S10_2K_YouTube.mp4"),
        "title": "Agente de IA para Presupuestos y APU Tipo S10 | Expediente a Excel con Fórmulas Vivas [2K]",
        "tags": [
            "Agente IA", "Presupuesto S10", "Costos y Presupuestos", "APU", "Formula Polinomica",
            "INEI", "Project Control AI", "Aurelio Solorzano", "Ingenieria Civil", "Openpyxl",
            "Cerebro Digital", "Grafo de Conocimiento", "Expediente Tecnico", "Metrados", "Construccion"
        ],
        "description": """🚀 AGENTE DE INTELIGENCIA ARTIFICIAL PARA PRESUPUESTOS Y APU TIPO S10 [VERSIÓN 2K HD]
Demostración operativa completa y en tiempo real: cómo un Agente de IA especializado transforma expedientes técnicos de ingeniería civil (Memoria Descriptiva, EETT, Planilla de Metrados y Cotizaciones en PDF/Excel) en un Presupuesto Profesional tipo S10 con trazabilidad matemática total y fórmulas vivas.

📌 ¿CÓMO FUNCIONA EL SISTEMA AGÉNTICO?
1️⃣ Ingesta Determinista y Cerebro Digital:
   - Procesa los PDFs y Excel originales sin alterar un solo dato.
   - Crea una Wiki navegable y un Grafo de Conocimiento (1,486 nodos y 3,420 relaciones).
   - Trazabilidad absoluta: cada partida, recurso y precio apunta a su localizador exacto (página y tabla del expediente).

2️⃣ Evaluación de 10 Compuertas de Calidad (G1 - G10):
   - G1 a G3: Validación de ingesta, metrados y parámetros generales (Moneda PEN/USD y tipo de cambio).
   - G4 a G10: Conflictos resueltos, APUs con rendimientos auditados, gastos generales desglosados y fórmula polinómica conforme a ley.

3️⃣ Cero Alucinaciones y Fórmulas Vivas en Excel:
   - Los cálculos matemáticos son ejecutados por un motor determinista en Python, no por un LLM adivinando números.
   - Genera un libro Excel nativo en openpyxl con celdas vivas: si modificas una cuadrilla o cotización en campo, todo el libro y el factor K se recalculan al instante.

4️⃣ Cumplimiento Normativo Peruano:
   - Fórmula polinómica según el D.S. N° 011-79-VC y la R.J. 016-2026-INEI (78 Índices Unificados).

🏗️ CASO REAL DEMOSTRADO EN EL VIDEO:
Proyecto EDU_SURQUILLO: Edificio Educativo de 6 pisos, 2 sótanos y azotea.
- 78 partidas estructuradas por WBS.
- 94 recursos vinculados con cotizaciones y códigos IU oficiales.
- Verificación cruzada automática con hashes criptográficos SHA-256 (manifest.json).

⏱️ LÍNEA DE TIEMPO Y CAPÍTULOS DEL VIDEO:
00:00 Introducción y Reto: Cero alucinaciones en ingeniería de costos
01:45 Inspección de insumos del expediente técnico (EDU_SURQUILLO)
03:30 Etapa 1: Ingesta determinista y creación del Cerebro Digital (Grafo y Wiki)
05:40 Etapa 2: Preparación del cerebro y parámetros obligatorios de moneda
07:20 Etapa 3: Sistema de 10 Compuertas de Calidad (G1 a G10)
09:30 Etapa 4: Emisión de la Revisión R01_Borrador y cálculo canónico
11:50 Auditoría del Excel Tipo S10: Demostración de fórmulas vivas y recálculo
14:10 Conclusiones, carpeta de entrega autocontenida y hashes SHA-256

📲 ¿QUIERES IMPLEMENTAR O ADQUIRIR ESTE AGENTE PARA TUS PROYECTOS?
Comunícate directamente con el Ing. Aurelio Solórzano para coordinar acceso y consultoría:
👉 WhatsApp directo: https://wa.me/51993147501?text=Hola%20Ing.%20Aurelio,%20vi%20la%20guia%20del%20Agente%20de%20Presupuestos%20Tipo%20S10%20y%20deseo%20adquirirlo
📞 Teléfono / WhatsApp: +51 993 147 501
🌐 Plataforma oficial: https://projectcontrolai.com/servicios?tab=agentes#agentes
🎓 Formación y Clases en Vivo: https://projectcontrolai.com/formacion

#AgenteIA #PresupuestosS10 #CostosYPresupuestos #IngenieriaCivil #ProjectControlAI #AurelioSolorzano #S10 #FormulaPolinomica #INEI #Construccion #InteligenciaArtificial
"""
    },
    {
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
]


def save_json(path, data):
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    tmp = p.with_suffix(".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    os.replace(tmp, p)


def get_authenticated_session():
    # Find first existing token
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
            except Exception as e:
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
    print("=== PIPELINE DE CARGA DE VIDEOS 2K A YOUTUBE (MODO PÚBLICO) ===")
    session = get_authenticated_session()
    results = []

    for idx, vinfo in enumerate(VIDEOS_TO_UPLOAD, 1):
        print(f"\n[{idx}/{len(VIDEOS_TO_UPLOAD)}] Preparando subida: {vinfo['title']}")
        res = upload_video(session, vinfo)
        results.append(res)

    print("\n" + "#" * 70)
    print("🎉 RESUMEN DE VIDEOS PUBLICADOS EN YOUTUBE:")
    for r in results:
        print(f"- {r['title']}")
        print(f"  Enlace: {r['url']}")
        print(f"  Video ID: {r['id']}")
    print("#" * 70)


if __name__ == "__main__":
    main()
