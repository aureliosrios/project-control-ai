import requests
import re

url = "https://project-control-ai-one.vercel.app/clases-grabadas"
r = requests.get(url)
chunks = re.findall(r'/_next/static/chunks/[^"\']+\.js', r.text)

print(f"Total chunks encontrados: {len(chunks)}")
found = False
for c in chunks:
    chunk_url = f"https://project-control-ai-one.vercel.app{c}"
    content = requests.get(chunk_url).text
    if "-qJS3nmWZuA" in content or "HgttITI9PU0" in content:
        print(f"[FOUND] ENCONTRADO EN VERCEL: {c}")
        found = True
        break

if not found:
    print("[WAIT] Esperando actualización de build en Vercel...")
