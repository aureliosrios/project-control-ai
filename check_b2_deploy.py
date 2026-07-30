import requests
import re
import time

url = "https://project-control-ai-one.vercel.app/formacion"
print("Verificando despliegue en Vercel:", url)

for attempt in range(1, 6):
    try:
        r = requests.get(url, timeout=10)
        chunks = re.findall(r'/_next/static/chunks/[^"\']+\.js', r.text)
        found = False
        for c in chunks:
            chunk_url = f"https://project-control-ai-one.vercel.app{c}"
            res = requests.get(chunk_url, timeout=10)
            if "O106954282N" in res.text:
                print(f"✅ [ÉXITO] ¡Despliegue verificado en Vercel! Encontrado en chunk: {c}")
                found = True
                break
        if found:
            break
        else:
            print(f"⏳ Intentos {attempt}/5: Vercel procesando compilación... esperando 5 segundos.")
            time.sleep(5)
    except Exception as e:
        print(f"Error al conectar: {e}")
        time.sleep(3)
