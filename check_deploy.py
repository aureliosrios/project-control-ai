import requests
import re
import time

url = "https://project-control-ai-one.vercel.app/formacion"
print("Verificando despliegue de B4 en Vercel...")

for i in range(15):
    try:
        r = requests.get(url, timeout=10)
        chunks = re.findall(r'/_next/static/chunks/[^"\']+\.js', r.text)
        found = False
        for c in chunks:
            chunk_url = f"https://project-control-ai-one.vercel.app{c}"
            content = requests.get(chunk_url, timeout=10).text
            if "S107662854J" in content or "Primavera P6" in content:
                print(f"[FOUND] ENCONTRADO EN VERCEL en chunk: {c}")
                found = True
                break
        if found:
            print("[SUCCESS] El curso B4 ya esta en linea en produccion!")
            break
        print(f"[WAIT] Esperando que Vercel termine la compilacion (intento {i+1}/15)...")
        time.sleep(10)
    except Exception as e:
        print("Error:", e)
        time.sleep(10)
