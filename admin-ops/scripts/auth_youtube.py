import os
from google_auth_oauthlib.flow import InstalledAppFlow

YOUTUBE_SCOPE = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube"
]
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CLIENT_SECRETS_FILE = os.path.join(BASE_DIR, "client_secrets.json")
TOKEN_FILE = os.path.join(BASE_DIR, "token_youtube.json")

def main():
    print("Iniciando flujo de autenticación de YouTube...")
    flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, YOUTUBE_SCOPE)
    creds = flow.run_local_server(port=0, authorization_prompt_message='Por favor visita este URL para autorizar la aplicación: {url}')
    
    with open(TOKEN_FILE + '.tmp', 'w') as token:
        token.write(creds.to_json())
    os.replace(TOKEN_FILE + '.tmp', TOKEN_FILE)
    print("Autenticación exitosa! Nuevo 'token_youtube.json' guardado.")

if __name__ == "__main__":
    main()
