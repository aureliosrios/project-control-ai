import requests
import re
import time

def check_deployment():
    url = "https://project-control-ai-one.vercel.app/clases-grabadas"
    print("Verificando despliegue en Vercel...")
    
    for attempt in range(1, 15):
        try:
            r = requests.get(url)
            chunks = re.findall(r'/_next/static/chunks/[^"\']+\.js', r.text)
            found = False
            for c in chunks:
                chunk_url = f"https://project-control-ai-one.vercel.app{c}"
                content = requests.get(chunk_url).text
                if "I72FS-n0bPo" in content:
                    print(f"✅ [DESPLEGADO] El video I72FS-n0bPo ya se encuentra en Vercel! (Chunk: {c})")
                    found = True
                    return True
            print(f"⏳ Intentando intento {attempt}/15... Despliegue en proceso en Vercel...")
        except Exception as e:
            print(f"Error comprobando: {e}")
        time.sleep(5)
    
    print("❌ Aún no se refleja en Vercel.")
    return False

if __name__ == "__main__":
    check_deployment()
