import requests

url = "https://project-control-ai-one.vercel.app/clases-grabadas"
r = requests.get(url)
print("HTTP Status Code:", r.status_code)
if "I72FS-n0bPo" in r.text:
    print("ENCONTRADO_EN_HTML_DIRECTO: SI")
else:
    print("ENCONTRADO_EN_HTML_DIRECTO: NO")
