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
        has_b2_id = "B2" in r.text
        has_hotmart_id = "O106954282N" in r.text
        has_title = "Automatización de Cronogramas" in r.text
        
        print("B2 ID en HTML:", has_b2_id)
        print("Hotmart ID (O106954282N) en HTML principal:", has_hotmart_id)
        print("Titulo en HTML principal:", has_title)
        
        # Look into client JS chunks
        chunks = re.findall(r'/_next/static/chunks/[^"\']+\.js', r.text)
        print("Chunks de Next.js encontrados:", len(chunks))
        
        found_in_chunks = False
        for c in chunks:
            chunk_url = f"https://project-control-ai-one.vercel.app{c}"
            res = requests.get(chunk_url, timeout=10, verify=False)
            if "O106954282N" in res.text:
                print(f"[CHUNK MATCH] Encontrado Hotmart ID en chunk: {c}")
                found_in_chunks = True
                
        if not found_in_chunks:
            print("[ALERTA] NO se encontro Hotmart ID en los chunks de este despliegue.")
            
    except Exception as e:
        print("Error al consultar URL:", e)
