import requests
import re
import time

def check_deployment():
    url = "https://project-control-ai-one.vercel.app/clases-grabadas"
    print("Verificando despliegue en Vercel para la clase del 09/08/2026 (ID: jnL8GbiH3zI)...")
    
    for attempt in range(1, 20):
        try:
            r = requests.get(url)
            chunks = re.findall(r'/_next/static/chunks/[^"\']+\.js', r.text)
            found = False
            for c in chunks:
                chunk_url = f"https://project-control-ai-one.vercel.app{c}"
                content = requests.get(chunk_url).text
                if "jnL8GbiH3zI" in content:
                    print(f"\n✅ [DESPLEGADO EN VERCEL] El video jnL8GbiH3zI ya está activo en Vercel! (Encontrado en Chunk: {c})")
                    found = True
                    return True
            print(f"⏳ Intento {attempt}/20: Vercel está construyendo y desplegando el nuevo commit...")
        except Exception as e:
            print(f"Error comprobando: {e}")
        time.sleep(4)
    
    print("❌ Aún no se refleja en Vercel.")
    return False

if __name__ == "__main__":
    check_deployment()
