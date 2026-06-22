import os
import time
import json
import requests
import base64
from flask import Flask, request, jsonify
from apscheduler.schedulers.background import BackgroundScheduler
import fal_client
from dotenv import load_dotenv
from PIL import Image

# --- Configuration & Chargement de l'environnement ---
# Charge les variables d'environnement depuis le fichier .env
load_dotenv()

FAL_KEY = os.getenv("FAL_KEY", "8f63dce9-183c-4801-8e8d-443af62a0e4b:52606f0412e8dfaacb5eeea0280e2a4f")
os.environ["FAL_KEY"] = FAL_KEY

NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY", "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")

WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN", "EAAKyrjgDWhIBRpncYTJsQ2JDbVswrg39JcTg6Co6gagxO2jEIhQut5YHB2g89La4hEqfFB5HZC5WDfQz1jGGP1u4IS74phsYKuQfLZBm6WvdfiOxzMImxl9l65xzLiZAsZAZBze4Ejzfas2kk1pHeiRZCX0jnTVsXAqKIhgmeXcX3xeauyZBqzaeAZBYU5USrxBLnQZDZD")
PHONE_ID = os.getenv("PHONE_ID", "1129547510244474")
ULKHAD_PHONE = os.getenv("ULKHAD_PHONE", "22605830599")

FB_PAGE_TOKEN = os.getenv("FB_PAGE_TOKEN", "EAAKyrjgDWhIBRmFBHUfX56L24M3XRpbcBEOZCQ25oqKvxS4Utp8zCmXgmEUvTSmLyF32rIWr7guAZAWzjgOQwhLZCkUQRSppctyCu03kHbXnTLLOMEpJUHzqj4Md0GAD4D52ax3wmvYVk47CT97grqORuTGywLiVIOhJ4KbsasIrwf3ZC0uumFCca2pa1YEqs5U0TLoZD")
FB_PAGE_ID = os.getenv("FB_PAGE_ID", "105423604376866")
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
processed_messages = set()

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

    # Planifier le fallback dans 30 minutes
    from datetime import datetime, timedelta
    run_date = datetime.now() + timedelta(minutes=30)
    scheduler.add_job(fallback_job, 'date', run_date=run_date, args=[brief])
    print(f"[Cron] Fallback programmé pour {run_date}")

def fallback_job(brief):
    if state["status"] == "WAITING_FOR_MEDIA" and state["current_brief"] == brief:
        print("[Fallback] Aucune réponse de Ulkhad après 30 minutes. Lancement automatique.")
        send_whatsapp_message(ULKHAD_PHONE, "⏱️ Délai de 30 minutes écoulé sans réponse. Je génère le post automatiquement pour le pilier du jour !")
        state["status"] = "PROCESSING"
        
        # Instruction par défaut basée sur le brief
        instruction = f"Fais un post inspirant et professionnel sur le thème : {brief}"
        
        # On passe m_path=None pour qu'il génère le fond bleu et superpose le logo
        import threading
        threading.Thread(target=background_processing_task, args=(instruction, None), daemon=True).start()

def publish_to_facebook(image_url, message_text):
    print("[Facebook] Publication en cours...")
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
        file_path = f"media_{media_id}.jpg"
        with open(file_path, "wb") as f:
            f.write(media_data.content)
        return file_path
    return None

def generate_orchestration(user_instruction):
    print("[NVIDIA NIM] Orchestration (Texte + Image)...")
    invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {NVIDIA_API_KEY}",
        "Accept": "application/json"
    }
    system_prompt = """RÔLE : Tu es l'IA "VOIX D'OR STRATEGIST", l'expert ultime en Social Media Management et Direction Artistique pour la structure "VOIX D’OR". Ton objectif est de dominer le paysage audiovisuel mondial en produisant du contenu à haute conversion, alliant Luxe, Afro-futurisme et Technologie de pointe.

ADN DE LA MARQUE (VOIX D'OR) :
- Nom : "Voix d'Or" (et non "Studio Voix d'Or").
- Identité : Prestige, Richesse, Royauté, Tradition "New Gen".
- Couleurs : Jaune-Or (#FFD700), Noir Mat, Blanc Pur.
- Esthétique : Design épuré, motifs traditionnels (Wax, Bogolan, Faso Dan Fani) intégrés de manière sobre et moderne (Afro-minimalisme).
- Ton : Ambitieux, inspirant, professionnel, sans détour (Direct-to-point).

VOS CAPACITÉS DE GÉNÉRATION :
Pour chaque requête, tu dois impérativement fournir une réponse JSON structurée avec deux champs :
1. "textOutput" : Contenu textuel adapté au réseau (Storytelling engageant, questions ouvertes, hashtags premium).
2. "imagePrompt" : Prompt ultra-détaillé en ANGLAIS pour le générateur d'images.

DIRECTIVES :
- Ne jamais édulcorer. Excellence niveau Harvard/Disney.
- PROMPT IMAGE : Style Cinématographique, 8K, éclairage dramatique, texture dorée métallique. Inclure motifs culturels Burkinabè modernisés."""

    # Self-Improvement Context Injection
    memory_file = "/root/CM_Studio_Deploy/best_performing_context.json"
    try:
        import os, json
        if os.path.exists(memory_file):
            with open(memory_file, "r", encoding="utf-8") as f:
                best_posts = json.load(f)
            system_prompt += "\n\nCONTEXTE D'AUTO-AMÉLIORATION (POSTS PERFORMANTS RÉCENTS) :\n"
            system_prompt += "Voici les structures de posts qui ont récemment généré le plus d'engagement. Inspire-toi de leur ton et de leur format, mais innove :\n"
            for p in best_posts:
                if isinstance(p, dict):
                    system_prompt += f"- {p.get('message', '')}\n"
                elif isinstance(p, str):
                    system_prompt += f"- {p}\n"
    except Exception as e:
        print(f"[NVIDIA NIM] Erreur lecture mémoire : {e}")

    payload = {
        "model": "meta/llama3-70b-instruct",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Génère le contenu JSON pour la requête suivante : {user_instruction}"}
        ],
        "max_tokens": 1024,
        "temperature": 0.7,
        "response_format": {"type": "json_object"}
    }
    
    try:
        res = requests.post(invoke_url, headers=headers, json=payload)
        res_json = res.json()
        if "choices" in res_json:
            content = res_json["choices"][0]["message"]["content"].strip()
            # Extract JSON safely from markdown backticks or just string search
            match = re.search(r'```json\s*(.*?)\s*```', content, re.DOTALL)
            if not match:
                match = re.search(r'\{.*\}', content, re.DOTALL)
            
            content = match.group(1) if match and match.lastindex == 1 else (match.group(0) if match else content)
            try:
                data = json.loads(content)
                return data.get("textOutput"), data.get("imagePrompt")
            except Exception as e:
                print(f"[JSON Error] {e} on content: {content}")
                return None, None
        else:
            print(f"[Erreur NVIDIA] Réponse inattendue: {res_json}")
    except Exception as e:
        print(f"[Erreur NVIDIA Orchestration] {e}")
    return None, None

def image_to_base64(img_path):
    try:
        with open(img_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
    except:
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
        with open(PROMPT_PACK_PATH, "r", encoding="utf-8") as f:
            prompt_pack_content = f.read()
    except Exception as e:
        prompt_pack_content = ""

    system_prompt = (
        "Tu es l'Orchestrateur Expert du Studio Voix d'Or. Ton rôle est de rédiger LE MEILLEUR PROMPT POSSIBLE pour le modèle d'image gpt-image-2 (Fal.ai). "
        "Le client te donne une image et des instructions. "
        "Tu DOIS te baser STRICTEMENT sur les règles et les exemples (IMAGE TO IMAGE - EDIT) fournis dans le 'PROMPT PACK' ci-dessous pour formuler ton prompt. "
        "Si l'utilisateur ne fournit PAS d'image (media_path est None), tu DOIS générer un visuel environnemental, architectural, abstrait ou de matériel professionnel. "
        "REGLE ABSOLUE 1 : N'inclus JAMAIS aucun humain, aucun visage, aucune silhouette dans le prompt. Reste concentré sur l'ambiance, les objets, l'art, l'architecture ou le matériel. "
        "REGLE ABSOLUE 2 : Le design doit être ultra MINIMALISTE et ÉPURÉ. NE PAS surcharger avec des textes ou des overlays inutiles. PAS de gros blocs 'Expertise Audio' ou de descriptions longues sur l'image.\n"
        "REGLE ABSOLUE 3 : Si tu dois inclure un numéro de téléphone, utilise STRICTEMENT '+226 57 26 59 15'. Ne l'invente jamais.\n"
        "Ta réponse doit être UNIQUEMENT le prompt final en anglais, prêt à être envoyé à l'API. Ne mets pas de phrases d'introduction ni de bloc de raisonnement.\n\n"
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
        "model": "meta/llama3-70b-instruct",
        "messages": [{"role": "user", "content": content_list}],
        "max_tokens": 1000,
        "temperature": 0.3
    }

    try:
        response = requests.post(invoke_url, headers=headers, json=payload)
        data = response.json()
        message = data.get("choices", [{}])[0].get("message", {})
        optimized_prompt = message.get("content")
        
        # Pour les modèles de raisonnement, le contenu final peut être vide si coupé, 
        # ou se trouver dans le raisonnement
        if not optimized_prompt:
            optimized_prompt = message.get("reasoning_content") or message.get("reasoning")
            
        if not optimized_prompt:
            # Fallback en cas où le contenu est vide (ex: erreur de longueur ou refus)
            print("[NVIDIA NIM] Erreur ou contenu vide, fallback sur le prompt manuel.")
            return f"{user_instruction}. Style institutionnel Studio Voix d'Or, luxueux, tons or et noir profond. INTERDIT de modifier les visages humains ou le matériel."
        print(f"[NVIDIA NIM] Prompt généré : {optimized_prompt}")
        return optimized_prompt.strip()
    except Exception as e:
        print(f"[NVIDIA NIM Erreur] {e}")
        return f"{user_instruction}. Style institutionnel Studio Voix d'Or, luxueux, tons or et noir profond. INTERDIT de modifier les visages humains ou le matériel."


def process_with_fal(prompt, image_path=None):
    print(f"[Fal.ai] Traitement de l'image (Image-to-Image: {image_path is not None})")
    
    # Génération du prompt optimisé par NVIDIA NIM
    optimized_prompt = generate_optimized_prompt(image_path, prompt)

    try:
        if image_path:
            url = fal_client.upload_file(image_path)
            logo_url = fal_client.upload_file(LOGO_PATH)
            
            # OpenAI DALL-E 2 Edit strict limit is 1000 chars. Truncate to 950 to be safe.
            safe_prompt = optimized_prompt[:950]
            
            result = fal_client.subscribe(
                "openai/gpt-image-2/edit",
                arguments={
                    "image_urls": [url, logo_url],
                    "prompt": safe_prompt,
                    "quality": "medium", # Passé en medium pour la prod
                    "image_size": "square_hd"
                }
            )
        else:
            # Génération pure Text-to-Image avec contraintes strictes
            result = fal_client.subscribe(
                "openai/gpt-image-2",
                arguments={
                    "prompt": optimized_prompt,
                    "quality": "medium",
                    "image_size": "square_hd"
                }
            )
        
        output_url = result.get('images', [{}])[0].get('url')
        if not output_url:
            output_url = result.get('image', {}).get('url')
            
        print(f"[Fal.ai] Image générée : {output_url}")
        return output_url

    except Exception as e:
        print(f"[Erreur Fal.ai] {e}")
        return None

def load_replied_comments():
    if os.path.exists(REPLIED_COMMENTS_FILE):
        try:
            with open(REPLIED_COMMENTS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []

def save_replied_comment(comment_id):
    comments = load_replied_comments()
    if comment_id not in comments:
        comments.append(comment_id)
        with open(REPLIED_COMMENTS_FILE, "w", encoding="utf-8") as f:
            json.dump(comments[-1000:], f) # Garder les 1000 derniers

def process_facebook_comment(value):
    comment_id = value.get("comment_id")
    post_id = value.get("post_id")
    message = value.get("message", "")
    from_user = value.get("from", {})
    from_id = from_user.get("id")
    from_name = from_user.get("name", "Utilisateur")

    # 1. Ne pas répondre à nous-mêmes
    if str(from_id) == str(FB_PAGE_ID):
        print("[Facebook Comment] Ignoré (auteur = page elle-même).")
        return

    # 2. Ne pas répondre deux fois
    replied = load_replied_comments()
    if comment_id in replied:
        print(f"[Facebook Comment] Déjà traité ({comment_id}).")
        return

    print(f"[Facebook Comment] Nouveau de {from_name} : {message}")
    
    # 3. Interroger Hermes
    prompt = (
        f"Tu es l'agent CM Studio Voix d'Or. "
        f"L'utilisateur {from_name} a laissé ce commentaire sur la page Facebook : '{message}'.\n"
        f"1. Rédige une réponse professionnelle, polie et haut de gamme, digne du Directeur de la Communication du Studio Voix d'Or. "
        f"Mets cette réponse EXACTEMENT entre les balises [REPLY_START] et [REPLY_END]. Reste très concis (2 phrases max).\n"
        f"2. Si le commentaire de l'utilisateur est une question (ex: prix, devis, service), ou une critique négative, "
        f"écris [ALERT: YES] juste avant [REPLY_START]. Si ce n'est qu'un compliment simple ou un encouragement, écris [ALERT: NO]."
    )
    
    try:
        print(f"[Hermes] Exécution de l'agent pour le commentaire...")
        result = subprocess.run(
            ["hermes", "--profile", "cm_studio", "chat", "-Q", "-q", prompt],
            capture_output=True, text=True, check=True
        )
        output = result.stdout
        
        # Filtrer le raisonnement interne éventuel
        output = re.sub(r'<think>.*?</think>', '', output, flags=re.DOTALL)
        
        match = re.search(r'\[REPLY_START\](.*?)\[REPLY_END\]', output, re.DOTALL)
        alert_match = re.search(r'\[ALERT:\s*(YES|NO)\]', output, re.IGNORECASE)
        
        needs_alert = True
        if alert_match and alert_match.group(1).upper() == "NO":
            needs_alert = False

        if match:
            reply_text = match.group(1).strip()
            print(f"[Hermes] Réponse prête : {reply_text}")
            
            # 4. Publier sur Facebook
            pure_comment_id = comment_id.split("_")[-1] if "_" in comment_id else comment_id
            url = f"https://graph.facebook.com/v21.0/{pure_comment_id}/comments"
            headers = {"Authorization": f"Bearer {FB_PAGE_TOKEN}"}
            res = requests.post(url, headers=headers, json={"message": reply_text}).json()
            print(f"[Facebook] Publication de la réponse : {res}")
            
            save_replied_comment(comment_id)
            
            # 5. Notifier WhatsApp si c'est pertinent
            if needs_alert:
                notify_msg = (
                    f"🔔 *Alerte Commentaire Facebook*\n\n"
                    f"👤 *De* : {from_name}\n"
                    f"💬 *Message* : {message}\n\n"
                    f"🤖 *Réponse publiée par Hermes* :\n{reply_text}"
                )
                send_whatsapp_message(ULKHAD_PHONE, notify_msg)
            else:
                print("[Hermes] Pas d'alerte WhatsApp nécessaire (commentaire simple).")
                
        else:
            print("[Hermes] Échec d'extraction des balises.")
            print(f"Sortie brute : {output}")
            
    except Exception as e:
        print(f"[Erreur Hermes/Commentaires] {e}")


@app.route("/webhook", methods=["GET"])
def verify():
    if request.args.get("hub.verify_token") == VERIFY_TOKEN:
        return request.args.get("hub.challenge"), 200
    return "Token invalide", 403

@app.route("/webhook", methods=["POST"])
def webhook():
    data = request.get_json()
    try:
        for entry in data.get("entry", []):
            for change in entry.get("changes", []):
                # Interception des commentaires (feed)
                if change.get("field") == "feed":
                    val = change.get("value", {})
                    if val.get("item") == "comment" and val.get("verb") == "add":
                        import threading
                        threading.Thread(target=process_facebook_comment, args=(val,), daemon=True).start()
                        continue
                        
                messages = change.get("value", {}).get("messages", [])
                for msg in messages:
                    msg_id = msg.get("id")
                    if msg_id in processed_messages:
                        continue
                    processed_messages.add(msg_id)
                    
                    sender = msg.get("from")
                    print(f"[WEBHOOK] Message de : {sender}, Attendu (ULKHAD) : {ULKHAD_PHONE}")
                    
                    if sender != ULKHAD_PHONE:
                        print(f"[WEBHOOK] Ignoré, sender != ULKHAD_PHONE")
                        continue 
                    
                    if msg.get("type") == "text" and msg["text"]["body"].strip() == "TEST_BOT_VPS":
                        state["status"] = "WAITING_FOR_MEDIA"
                        
                    # Si le bot est en IDLE et reçoit un message, on accepte comme une requête spontanée
                    if state["status"] == "IDLE" and msg.get("type") in ["text", "image"]:
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
                        
                        import threading
                        threading.Thread(target=background_processing_task, args=(instruction, media_path), daemon=True).start()

    except Exception as e:
        print(f"[Erreur Webhook] {e}")

    return jsonify({"status": "ok"}), 200

def background_processing_task(inst, m_path):
    # Générer le texte de publication et le prompt image (Orchestration JSON)
    fb_cap, img_prompt = generate_orchestration(inst)
    
    if not fb_cap:
        fb_cap = f"{inst}\n\n#VoixDOr #Ouagadougou #CinemaAfricain"
    if not img_prompt:
        img_prompt = inst
    
    # Si aucun média n'est fourni, on crée un fond uni Voix d'Or pour forcer le mode Image-to-Image
    if not m_path:
        blank_path = os.path.join(BASE_DIR, "assets", "blank_canvas.jpg")
        if not os.path.exists(blank_path):
            img = Image.new('RGB', (1024, 1024), color=(10, 31, 92)) # #0A1F5C Dark Navy
            img.save(blank_path)
        m_path = blank_path
    
    final_img_url = process_with_fal(img_prompt, m_path)
    if final_img_url:
        fb_res = publish_to_facebook(final_img_url, fb_cap)
        if fb_res.get("id"):
            send_whatsapp_message(ULKHAD_PHONE, f"✅ Publication réussie sur la page !\n\nLégende générée :\n{fb_cap}\n\nLien de l'image (copie) : {final_img_url}")
        else:
            send_whatsapp_message(ULKHAD_PHONE, f"⚠️ L'image est générée mais la publication Facebook a échoué.\n\nLégende prévue :\n{fb_cap}\n\nLien de l'image : {final_img_url}")
    else:
        send_whatsapp_message(ULKHAD_PHONE, "❌ Erreur lors du traitement de l'image.")
    state["status"] = "IDLE"

if __name__ == "__main__":
    # Planification automatique quotidienne à 18h00
    scheduler.add_job(trigger_daily_brief, 'cron', hour=18, minute=0)
    scheduler.start()
    
    # APPEL DE TEST IMMÉDIAT AU DÉMARRAGE :
    trigger_daily_brief()
    
    print("[CM_STUDIO] Bot démarré. Webhook en écoute sur port 5000...")
    app.run(host="0.0.0.0", port=5000)
