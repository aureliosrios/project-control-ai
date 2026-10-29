import urllib.request
import re

url = 'https://project-control-ai-one.vercel.app/servicios'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8')

scripts = re.findall(r'src="(/_next/static/chunks/[^"]+)"', html)
print(f"Total scripts found: {len(scripts)}")
found_in_chunks = False
for s in scripts:
    js_url = f"https://project-control-ai-one.vercel.app{s}"
    with urllib.request.urlopen(urllib.request.Request(js_url, headers={'User-Agent': 'Mozilla/5.0'})) as js_resp:
        content = js_resp.read().decode('utf-8', errors='ignore')
        if '1l2e-I65KtQ' in content:
            print(f"Found YouTube ID 1l2e-I65KtQ in chunk: {s}")
            found_in_chunks = True
        if 'ZSgtw7FYv' in content:
            print(f"Found TikTok ID ZSgtw7FYv in chunk: {s}")
        if 'S10' in content and 'Ingesta' in content:
            print(f"Found Ingesta S10 text in chunk: {s}")

if not found_in_chunks:
    print("Checking if content is directly in html...")
    print("In html:", '1l2e-I65KtQ' in html)
