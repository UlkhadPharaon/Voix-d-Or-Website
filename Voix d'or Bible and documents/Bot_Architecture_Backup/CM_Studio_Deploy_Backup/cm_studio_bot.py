import os
import time
import json
import requests
import base64
from flask import Flask, request, jsonify
from apscheduler.schedulers.background import BackgroundScheduler
import fal_client
from dotenv import load_dotenv

# --- Configuration & Chargement de l'environnement ---
# Charge les variables d'environnement depuis le fichier .env
load_dotenv()

FAL_KEY = os.getenv("FAL_KEY")
os.environ["FAL_KEY"] = FAL_KEY if FAL_KEY else ""

NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")

WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN")
PHONE_ID = os.getenv("PHONE_ID")
ULKHAD_PHONE = os.getenv("ULKHAD_PHONE")

FB_PAGE_TOKEN = os.getenv("FB_PAGE_TOKEN")
FB_PAGE_ID = os.getenv("FB_PAGE_ID")

VERIFY_TOKEN = os.getenv("VERIFY_TOKEN", "voixdor_webhook_2026")

# --- Gestion des chemins dynamiques ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(BASE_DIR, "assets")

LOGO_PATH = os.path.join(ASSETS_DIR, "logo studio voix d'or.png")
BANNER_PATH = os.path.join(ASSETS_DIR, "Baniere voix d'or.png")
PROMPT_PACK_PATH = os.path.join(ASSETS_DIR, "studio_voix_dor_prompt_pack.txt")

app = Flask(__name__)
scheduler = BackgroundScheduler()

# Base de données rudimentaire en mémoire
state = {
    "status": "IDLE", # IDLE, WAITING_FOR_MEDIA, PROCESSING
    "current_brief": "",
    "media_url": None
}

def get_daily_brief():
    # Déterminer le pilier du jour basé sur le calendrier
    import datetime
    day = datetime.datetime.now().weekday()
    pillars = {
        0: "Motivation & Manifeste de marque",
        1: "Arsenal Technique",
        2: "Portfolio & Réalisation",
        3: "Behind The Scenes",
        4: "Témoignage ou Résultat client",
        5: "Culture & Identité Africaine",
        6: "Repos"
    }
    return pillars.get(day, "Contenu libre")

def send_whatsapp_message(to, text):
    if not WHATSAPP_TOKEN or not PHONE_ID:
        print("[WhatsApp] Erreur: Variables d'environnement manquantes.")
        return {}
        
    url = f"https://graph.facebook.com/v19.0/{PHONE_ID}/messages"
    headers = {
        "Authorization": f"Bearer {WHATSAPP_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": text}
    }
    response = requests.post(url, headers=headers, json=payload)
    print(f"[WhatsApp] Message envoyé à {to}. Statut: {response.status_code}")
    return response.json()

def trigger_daily_brief():
    print("[Cron] Déclenchement du brief quotidien...")
    brief = get_daily_brief()
    if brief == "Repos":
        print("Aujourd'hui c'est dimanche, pas de post.")
        return

    message = f"""🎬 BRIEF CONTENU — {brief}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CM STUDIO | VOIX D'OR

Pilier du jour : {brief}
Publication prévue dans 30 minutes.

📸 Envoie-moi une image/vidéo avec tes instructions pour le post, ou réponds simplement par du texte (ex: "Pas d'image, fais un post sur le mixage") et je générerai le visuel moi-même ! 🙏🏿"""

    send_whatsapp_message(ULKHAD_PHONE, message)
    state["status"] = "WAITING_FOR_MEDIA"
    state["current_brief"] = brief

def publish_to_facebook(image_url, message_text):
    print("[Facebook] Publication en cours...")
    if not FB_PAGE_ID or not FB_PAGE_TOKEN:
        print("[Facebook] Erreur: Variables d'environnement FB manquantes.")
        return {}
        
    url = f"https://graph.facebook.com/v19.0/{FB_PAGE_ID}/photos"
    headers = {
        "Authorization": f"Bearer {FB_PAGE_TOKEN}"
    }
    payload = {
        "url": image_url,
        "message": message_text,
        "published": "true"
    }
    response = requests.post(url, headers=headers, data=payload)
    print(f"[Facebook] Réponse: {response.json()}")
    return response.json()

def download_whatsapp_media(media_id):
    url = f"https://graph.facebook.com/v19.0/{media_id}"
    headers = {"Authorization": f"Bearer {WHATSAPP_TOKEN}"}
    res = requests.get(url, headers=headers).json()
    if "url" in res:
        media_url = res["url"]
        # Télécharger le fichier
        media_data = requests.get(media_url, headers=headers)
        file_path = os.path.join(BASE_DIR, f"media_{media_id}.jpg")
        with open(file_path, "wb") as f:
            f.write(media_data.content)
        return file_path
    return None

def image_to_base64(img_path):
    try:
        if os.path.exists(img_path):
            with open(img_path, "rb") as image_file:
                return base64.b64encode(image_file.read()).decode('utf-8')
    except Exception as e:
        print(f"[Base64 Error] {e}")
    return ""

def generate_optimized_prompt(image_path, user_instruction):
    print("[NVIDIA NIM] Demande d'orchestration à step-3.7-flash...")
    invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {NVIDIA_API_KEY}",
        "Accept": "application/json"
    }
    
    img_b64 = image_to_base64(image_path) if image_path else ""
    logo_b64 = image_to_base64(LOGO_PATH)
    banner_b64 = image_to_base64(BANNER_PATH)

    try:
        if os.path.exists(PROMPT_PACK_PATH):
            with open(PROMPT_PACK_PATH, "r", encoding="utf-8") as f:
                prompt_pack_content = f.read()
        else:
            prompt_pack_content = "Veuillez fournir le pack de prompts."
            print(f"[Alerte] Le fichier {PROMPT_PACK_PATH} est introuvable.")
    except Exception as e:
        prompt_pack_content = ""

    system_prompt = (
        "Tu es l'Orchestrateur Expert du Studio Voix d'Or. Ton rôle est de rédiger LE MEILLEUR PROMPT POSSIBLE pour le modèle d'image gpt-image-2 (Fal.ai). "
        "Le client te donne une image et des instructions. "
        "Tu DOIS te baser STRICTEMENT sur les règles et les exemples (IMAGE TO IMAGE - EDIT) fournis dans le 'PROMPT PACK' ci-dessous pour formuler ton prompt. "
        "Il est CRUCIAL de respecter les 'UNIVERSAL RULES' du pack : aucune exagération, pas de filtres sur-saturés, et conservation exacte de la personne. "
        "Ta réponse doit être UNIQUEMENT le prompt final en anglais, prêt à être envoyé à l'API. Ne mets pas de phrases d'introduction.\n\n"
        "=== DEBUT DU PROMPT PACK ===\n"
        f"{prompt_pack_content}\n"
        "=== FIN DU PROMPT PACK ===\n"
    )

    content_list = [
        {"type": "text", "text": system_prompt},
        {"type": "text", "text": f"Instruction de l'utilisateur: {user_instruction}"},
    ]

    if img_b64:
        content_list.append({"type": "text", "text": "Image cible à améliorer:"})
        content_list.append({"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{img_b64}"}})
    
    if logo_b64:
        content_list.append({"type": "text", "text": "Logo Voix d'Or à intégrer:"})
        content_list.append({"type": "image_url", "image_url": {"url": f"data:image/png;base64,{logo_b64}"}})
        
    if banner_b64:
        content_list.append({"type": "text", "text": "Bannière Voix d'Or à intégrer:"})
        content_list.append({"type": "image_url", "image_url": {"url": f"data:image/png;base64,{banner_b64}"}})

    payload = {
        "model": "stepfun-ai/step-3.7-flash",
        "messages": [{"role": "user", "content": content_list}],
        "max_tokens": 4096,
        "temperature": 0.4
    }

    try:
        response = requests.post(invoke_url, headers=headers, json=payload)
        data = response.json()
        message = data.get("choices", [{}])[0].get("message", {})
        optimized_prompt = message.get("content")
        
        if not optimized_prompt:
            optimized_prompt = message.get("reasoning_content") or message.get("reasoning")
            
        if not optimized_prompt:
            print("[NVIDIA NIM] Erreur ou contenu vide, fallback sur le prompt manuel.")
            send_whatsapp_message(ULKHAD_PHONE, "⚠️ L'Orchestrateur a rencontré une erreur. Utilisation du prompt par défaut.")
            return f"{user_instruction}. Style institutionnel Studio Voix d'Or."
            
        print(f"[NVIDIA NIM] Prompt généré : {optimized_prompt}")
        send_whatsapp_message(ULKHAD_PHONE, f"🧠 Orchestrateur : Prompt optimisé généré avec succès ! Le style et la charte sont appliqués. Lancement du rendu Fal.ai...")
        return optimized_prompt.strip()
    except Exception as e:
        print(f"[NVIDIA NIM Erreur] {e}")
        send_whatsapp_message(ULKHAD_PHONE, "⚠️ Erreur technique de l'Orchestrateur. Fallback activé.")
        return f"{user_instruction}."


def process_with_fal(prompt, image_path=None):
    print(f"[Fal.ai] Traitement de l'image (Image-to-Image: {image_path is not None})")
    
    optimized_prompt = generate_optimized_prompt(image_path, prompt)

    try:
        if image_path:
            url = fal_client.upload_file(image_path)
            
            # Uploader le logo comme référence si présent
            image_urls = [url]
            if os.path.exists(LOGO_PATH):
                logo_url = fal_client.upload_file(LOGO_PATH)
                image_urls.append(logo_url)
            
            result = fal_client.subscribe(
                "openai/gpt-image-2/edit",
                arguments={
                    "image_urls": image_urls,
                    "prompt": optimized_prompt,
                    "quality": "low",
                    "image_size": "square_hd"
                }
            )
        else:
            result = fal_client.subscribe(
                "openai/gpt-image-2",
                arguments={
                    "prompt": optimized_prompt,
                    "quality": "low",
                    "image_size": "square_hd"
                }
            )
        
        output_url = result.get('images', [{}])[0].get('url')
        if not output_url:
            output_url = result.get('image', {}).get('url')
            
        print(f"[Fal.ai] Image générée : {output_url}")
        send_whatsapp_message(ULKHAD_PHONE, "🎨 Chef-d'oeuvre terminé ! L'image finale a été générée. Préparation de la publication Facebook...")
        return output_url

    except Exception as e:
        print(f"[Erreur Fal.ai] {e}")
        send_whatsapp_message(ULKHAD_PHONE, "❌ Erreur critique lors de la génération de l'image sur Fal.ai.")
        return None

# --- Routes Webhook ---

@app.route("/webhook", methods=["GET"])
def verify():
    if request.args.get("hub.verify_token") == VERIFY_TOKEN:
        return request.args.get("hub.challenge"), 200
    return "Token invalide", 403

@app.route("/webhook", methods=["POST"])
def webhook():
    data = request.get_json()
    print("[WEBHOOK] Payload reçu :", json.dumps(data, indent=2))
    try:
        for entry in data.get("entry", []):
            for change in entry.get("changes", []):
                value = change.get("value", {})
                messages = value.get("messages", [])
                
                # S'assurer que messages est itérable
                if not messages:
                    print("[WEBHOOK] Aucun message trouvé dans payload (peut-être un statut).")
                    continue
                    
                for msg in messages:
                    sender = msg.get("from")
                    print(f"[WEBHOOK] Message de : {sender}, Attendu (ULKHAD) : {ULKHAD_PHONE}")
                    
                    if sender != ULKHAD_PHONE:
                        print(f"[WEBHOOK] Ignoré, sender != ULKHAD_PHONE")
                        continue 
                    
                    if msg.get("type") == "text" and msg["text"]["body"].strip() == "TEST_BOT_VPS":
                        state["status"] = "WAITING_FOR_MEDIA"
                        
                    if state["status"] == "WAITING_FOR_MEDIA":
                        state["status"] = "PROCESSING"
                        send_whatsapp_message(ULKHAD_PHONE, "📥 Média bien reçu, Ulkhad ! Début de l'analyse par l'Orchestrateur NVIDIA NIM...")

                        media_path = None
                        instruction = ""
                        
                        if msg.get("type") == "image":
                            media_id = msg["image"]["id"]
                            instruction = msg["image"].get("caption", "Améliore l'image.")
                            media_path = download_whatsapp_media(media_id)
                        elif msg.get("type") == "text":
                            instruction = msg["text"]["body"]
                        
                        final_image_url = process_with_fal(instruction, media_path)
                        
                        if final_image_url:
                            fb_caption = f"{instruction}\n\n#StudioVoixDor #Ouagadougou #CinemaAfricain"
                            publish_to_facebook(final_image_url, fb_caption)
                            send_whatsapp_message(ULKHAD_PHONE, f"✅ Publication réussie !\n\nLien de l'image : {final_image_url}")
                        else:
                            send_whatsapp_message(ULKHAD_PHONE, "❌ Erreur lors du traitement de l'image.")
                        
                        state["status"] = "IDLE"

    except Exception as e:
        print(f"[Erreur Webhook] {e}")

    return jsonify({"status": "ok"}), 200

if __name__ == "__main__":
    scheduler.add_job(trigger_daily_brief, 'cron', hour=10, minute=30)
    scheduler.start()
    
    print("[CM_STUDIO] Bot démarré. Webhook en écoute sur port 5000...")
    app.run(host="0.0.0.0", port=5000)
