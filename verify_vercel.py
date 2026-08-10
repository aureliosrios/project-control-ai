import requests
import re

def check():
    url = "https://project-control-ai-one.vercel.app/clases-grabadas"
    r = requests.get(url)
    chunks = re.findall(r'/_next/static/chunks/[^"\']+\.js', r.text)
    for c in chunks:
        chunk_url = f"https://project-control-ai-one.vercel.app{c}"
        if "jnL8GbiH3zI" in requests.get(chunk_url).text:
            print("DESPLEGADO_EN_VERCEL_EXITOSAMENTE")
            return True
    print("PENDIENTE_DE_DESPLIEGUE")
    return False

if __name__ == "__main__":
    check()
