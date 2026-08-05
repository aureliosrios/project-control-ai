import requests
import re

url = "https://project-control-ai-one.vercel.app/clases-grabadas"
r = requests.get(url)
chunks = re.findall(r'/_next/static/chunks/[^"\']+\.js', r.text)

found = False
for c in chunks:
    chunk_url = f"https://project-control-ai-one.vercel.app{c}"
    content = requests.get(chunk_url).text
    if "I72FS-n0bPo" in content:
        found = True
        break

if found:
    print("STATUS: DESPLEGADO_EN_VERCEL_OK")
else:
    print("STATUS: AUN_EN_DESPLIEGUE")
