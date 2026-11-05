import re
import requests

def test_production():
    print("=== VERIFICACIÓN EN VIVO DE PRODUCCIÓN VERCEL ===")
    base_url = "https://project-control-ai-one.vercel.app"
    
    # 1. Rutas principales
    routes = [
        "/",
        "/servicios",
        "/formacion",
        "/portal",
        "/clases-grabadas",
        "/verificar"
    ]
    all_ok = True
    for route in routes:
        r = requests.get(base_url + route, timeout=15)
        print(f"[{r.status_code}] {base_url + route}")
        if r.status_code != 200:
            all_ok = False
            
    # 2. Verificar Home HTML
    r_home = requests.get(base_url + "/", timeout=15)
    has_home_agent = "0LPG5_YoXlM" in r_home.text and "ZSpFeuU4Y" in r_home.text
    print(f"Home Page contiene Agente 7 (YouTube 0LPG5_YoXlM & TikTok ZSpFeuU4Y): {has_home_agent}")
    
    # 3. Verificar Servicios Chunks
    r_serv = requests.get(base_url + "/servicios", timeout=15)
    chunks = re.findall(r'/_next/static/chunks/[^\s"\'<>]+\.js', r_serv.text)
    found_chunk = False
    for c in chunks:
        js_url = base_url + c
        r_js = requests.get(js_url, timeout=15)
        if "agente-valorizaciones-publicas" in r_js.text and "0LPG5_YoXlM" in r_js.text:
            print(f"Servicios JS Bundle contiene Agente de Valorizaciones: True (Chunk: {c})")
            found_chunk = True
            break
            
    if all_ok and has_home_agent and found_chunk:
        print("\n✅ ¡DESPLIEGUE EN VERCEL CONFIRMADO Y OPERATIVO AL 100%!")
    else:
        print("\n⚠️ Verificación incompleta")

if __name__ == "__main__":
    test_production()
