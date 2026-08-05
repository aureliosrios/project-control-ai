import requests
import re

url = "https://project-control-ai-one.vercel.app/clases-grabadas"
r = requests.get(url)
chunks = re.findall(r'/_next/static/chunks/[^"\']+\.js', r.text)

print(f"Chunks encontrados en HTML: {len(chunks)}")
for c in chunks:
    chunk_url = f"https://project-control-ai-one.vercel.app{c}"
    content = requests.get(chunk_url).text
    if "AUT_CONST" in content or "02/08/2026" in content or "I72FS-n0bPo" in content:
        print(f"Match en {c}:")
        if "I72FS-n0bPo" in content:
            print("  - Contiene ID del 02/08: I72FS-n0bPo")
        if "-qJS3nmWZuA" in content:
            print("  - Contiene ID antiguo del 19/07: -qJS3nmWZuA")
