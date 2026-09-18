import requests
import re

urls = [
    "https://project-control-ai-one.vercel.app/formacion",
    "https://projectcontrolai.com/formacion"
]

for url in urls:
    print("=" * 60)
    print("PROBANDO URL:", url)
    try:
        r = requests.get(url, timeout=10, verify=False)
        print("Status Code:", r.status_code)
        
        # Check if 'B2' or 'MS Project' or 'O106954282N' is in HTML
        has_b4_id = "B4" in r.text
        has_hotmart_id = "S107662854J" in r.text
        has_title = "Primavera P6" in r.text
        
        print("B4 ID en HTML:", has_b4_id)
        print("Hotmart ID (S107662854J) en HTML principal:", has_hotmart_id)
        print("Titulo en HTML principal:", has_title)
        
        # Look into client JS chunks
        chunks = re.findall(r'/_next/static/chunks/[^"\']+\.js', r.text)
        print("Chunks de Next.js encontrados:", len(chunks))
        
        found_in_chunks = False
        for c in chunks:
            chunk_url = f"https://project-control-ai-one.vercel.app{c}"
            res = requests.get(chunk_url, timeout=10, verify=False)
            if "S107662854J" in res.text or "Automatización y Control en Primavera P6" in res.text:
                print(f"[CHUNK MATCH] Encontrado curso B4 en chunk: {c}")
                found_in_chunks = True
                break
                
        if not found_in_chunks:
            print("[ALERTA] NO se encontro B4 en los chunks de este despliegue.")
            
    except Exception as e:
        print("Error al consultar URL:", e)
