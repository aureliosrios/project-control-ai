import requests
import re

url = "https://project-control-ai-one.vercel.app/formacion"
r = requests.get(url, timeout=10)
print("Page status:", r.status_code)

# Find all script src
scripts = re.findall(r'src="(/_next/static/chunks/[^"]+)"', r.text)
print("Script src found:", scripts)

for s in scripts:
    s_url = f"https://project-control-ai-one.vercel.app{s}"
    s_res = requests.get(s_url, timeout=10)
    print(f"--- Chunk: {s} (size: {len(s_res.text)}) ---")
    if "B1" in s_res.text:
        print("  [FOUND B1]")
    if "B2" in s_res.text:
        print("  [FOUND B2]")
    if "O106954282N" in s_res.text:
        print("  [FOUND HOTMART ID O106954282N!]")
    if "Automatización de Cronogramas" in s_res.text:
        print("  [FOUND CURSO TITLE!]")
    if "Cronogramas" in s_res.text:
        print("  [FOUND 'Cronogramas']")
