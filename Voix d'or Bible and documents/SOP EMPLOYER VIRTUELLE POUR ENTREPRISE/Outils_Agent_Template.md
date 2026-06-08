# TEMPLATES DES OUTILS PYTHON POUR AGENT HERMES (V4)

Copiez-collez ces scripts dans le dossier de déploiement du client (ex: `/root/CM_Studio_Deploy/nom_du_client/`).

## 1. `whatsapp_manager.py`
Ce script gère la lecture des messages et l'envoi des réponses WhatsApp. Il inclut un nettoyage de l'inbox pour éviter les boucles, et un nettoyage du texte généré par le LLM.

```python
import os
import json
import argparse
import requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("WA_BUSINESS_API_TOKEN")
PHONE_ID = os.getenv("WA_PHONE_ID")
INBOX_FILE = "inbox.json"

def list_unread():
    if not os.path.exists(INBOX_FILE):
        print("No new messages.")
        return
    try:
        with open(INBOX_FILE, "r") as f:
            inbox = json.load(f)
    except Exception:
        print("No new messages (or file invalid).")
        return
        
    messages = inbox.get("messages", [])
    whatsapp_messages = [msg for msg in messages if msg.get("platform") == "whatsapp"]
    other_messages = [msg for msg in messages if msg.get("platform") != "whatsapp"]

    if not whatsapp_messages:
        print("No new messages.")
        return

    print("=== Unread WhatsApp Messages ===")
    for msg in whatsapp_messages:
        print(json.dumps(msg.get("data")))

    # GARDE-FOU INBOX : Ne conserver que les messages des autres plateformes (ex: Messenger)
    with open(INBOX_FILE, "w") as f:
        json.dump({"messages": other_messages}, f, indent=4)

def reply(to, message):
    # GARDE-FOU FORMATAGE : Nettoyer les sauts de lignes échappés générés par le LLM
    message = message.replace('\\n', '\n').strip('\"\'')
    
    url = f"https://graph.facebook.com/v19.0/{PHONE_ID}/messages"
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "text",
        "text": {"body": message}
    }
    res = requests.post(url, headers=headers, json=payload)
    if res.status_code == 200:
        print(f"Message sent successfully to {to}")
    else:
        print(f"Error {res.status_code}: {res.text}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["list-unread", "reply"])
    parser.add_argument("--to", help="Recipient phone number")
    parser.add_argument("--message", help="Message text")
    args = parser.parse_args()

    if args.action == "list-unread":
        list_unread()
    elif args.action == "reply":
        if args.to and args.message:
            reply(args.to, args.message)
        else:
            print("Missing --to or --message")
```

---

## 2. `facebook_manager.py`
Ce script permet de tout faire sur la page Facebook. Il intègre le nettoyage du texte (`\n`).

```python
import os
import argparse
import requests
import json
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("FB_PAGE_ACCESS_TOKEN")
PAGE_ID = os.getenv("FB_PAGE_ID")
REPLIED_COMMENTS_FILE = "replied_comments.json"

def clean_text(text):
    # Nettoyage des erreurs fréquentes des LLMs
    return text.replace('\\n', '\n').strip('\"\'')

def load_replied_comments():
    if os.path.exists(REPLIED_COMMENTS_FILE):
        try:
            with open(REPLIED_COMMENTS_FILE, "r") as f:
                return json.load(f)
        except:
            return []
    return []

def save_replied_comment(comment_id):
    replied = load_replied_comments()
    if comment_id not in replied:
        replied.append(comment_id)
        with open(REPLIED_COMMENTS_FILE, "w") as f:
            json.dump(replied, f)

def publish_post(message):
    message = clean_text(message)
    url = f"https://graph.facebook.com/v19.0/{PAGE_ID}/feed"
    payload = {"message": message, "access_token": TOKEN}
    res = requests.post(url, data=payload)
    print(res.status_code, res.text)

def publish_photo(image_path, message):
    message = clean_text(message)
    url = f"https://graph.facebook.com/v19.0/{PAGE_ID}/photos"
    if not os.path.exists(image_path):
        print(f"Error: File {image_path} not found.")
        return
    payload = {"message": message, "access_token": TOKEN}
    with open(image_path, "rb") as f:
        files = {"source": f}
        res = requests.post(url, data=payload, files=files)
    print(res.status_code, res.text)

def reply_comment(comment_id, message):
    message = clean_text(message)
    url = f"https://graph.facebook.com/v19.0/{comment_id}/comments"
    payload = {"message": message, "access_token": TOKEN}
    res = requests.post(url, data=payload)
    if res.status_code == 200:
        save_replied_comment(comment_id)
    print(res.status_code, res.text)

def list_comments():
    url = f"https://graph.facebook.com/v19.0/{PAGE_ID}/feed"
    params = {"fields": "id,message,comments{id,message,from}", "access_token": TOKEN, "limit": 5}
    res = requests.get(url, params=params)
    if res.status_code != 200:
        print(f"Error: {res.status_code} {res.text}")
        return
        
    replied_comments = load_replied_comments()
    data = res.json().get("data", [])
    
    print("=== Recent Posts and Comments ===")
    for post in data:
        print(f"Post ID: {post.get('id')} | Message: {post.get('message', 'No text')}")
        for comment in post.get("comments", {}).get("data", []):
            author = comment.get("from", {}).get("name", "Unknown")
            comment_id = comment.get('id')
            
            # Vérifier si l'agent a déjà répondu
            if comment_id in replied_comments:
                status = "[DÉJÀ RÉPONDU - IGNORER]"
            elif comment.get("from", {}).get("id") == PAGE_ID:
                status = "[COMMENTAIRE DE LA PAGE - IGNORER]"
            else:
                status = "[NOUVEAU - À TRAITER]"
                
            print(f"  -> Comment ID: {comment_id} | Author: {author} | Message: {comment.get('message')} {status}")

def get_stats():
    url = f"https://graph.facebook.com/v19.0/{PAGE_ID}/insights"
    params = {"metric": "page_impressions,page_engaged_users", "period": "day", "access_token": TOKEN}
    res = requests.get(url, params=params)
    if res.status_code != 200:
        url_fallback = f"https://graph.facebook.com/v19.0/{PAGE_ID}?fields=followers_count,fan_count&access_token={TOKEN}"
        print("Fallback Basic Stats:", requests.get(url_fallback).text)
        return
    print("=== Page Statistics ===")
    for metric in res.json().get("data", []):
        latest_val = metric.get("values", [])[-1].get("value", "N/A")
        print(f"{metric.get('name')}: {latest_val} ({metric.get('description')})")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["publish", "publish_photo", "reply_comment", "list_comments", "get_stats"])
    parser.add_argument("--message", help="Text to publish or reply")
    parser.add_argument("--comment_id", help="Comment ID to reply to")
    parser.add_argument("--image_path", help="Local path to the image file")
    args = parser.parse_args()

    if args.action == "publish" and args.message:
        publish_post(args.message)
    elif args.action == "publish_photo" and args.message and args.image_path:
        publish_photo(args.image_path, args.message)
    elif args.action == "reply_comment" and args.comment_id and args.message:
        reply_comment(args.comment_id, args.message)
    elif args.action == "list_comments":
        list_comments()
    elif args.action == "get_stats":
        get_stats()
    else:
        print("Missing required arguments.")
```

---

## 3. `usage_tracker.py` (GARDE-FOU ABONNEMENT CLIENT)
Ce script sert de proxy ou de limiteur. L'agent doit appeler ce script pour vérifier s'il a encore le droit d'envoyer des messages ce mois-ci, en fonction de l'offre du client.

```python
import json
import os
import sys
from datetime import datetime

USAGE_FILE = "client_usage.json"
# Configurer la limite selon le TIER du client (ex: Tier 1 = 100 actions/mois)
MONTHLY_LIMIT = int(os.getenv("CLIENT_MONTHLY_LIMIT", 100))

def check_usage():
    current_month = datetime.now().strftime("%Y-%m")
    
    # Création du fichier si inexistant
    if not os.path.exists(USAGE_FILE):
        with open(USAGE_FILE, "w") as f:
            json.dump({"month": current_month, "count": 0}, f)
            
    with open(USAGE_FILE, "r") as f:
        data = json.load(f)
        
    # Reset si nouveau mois
    if data.get("month") != current_month:
        data = {"month": current_month, "count": 0}
        
    if data["count"] >= MONTHLY_LIMIT:
        print(f"LIMIT_REACHED: Ce client a atteint sa limite mensuelle de {MONTHLY_LIMIT} actions.")
        sys.exit(1) # L'agent recevra une erreur et arrêtera ses actions
    else:
        data["count"] += 1
        with open(USAGE_FILE, "w") as f:
            json.dump(data, f)
        print(f"OK: Action autorisée. Usage actuel: {data['count']}/{MONTHLY_LIMIT}")
        sys.exit(0)

if __name__ == "__main__":
    check_usage()
```
*Note pour l'agent : Exécuter `python usage_tracker.py` AVANT chaque appel à whatsapp_manager ou facebook_manager. S'il renvoie LIMIT_REACHED, interrompre le workflow et notifier l'administrateur.*

---

## 4. `media_manager.py` (MÉDIATHÈQUE ET SAUVEGARDE)
Ce script permet à l'agent de sauvegarder les images envoyées par le patron via WhatsApp vers un dossier permanent pour les réutiliser dans ses publications.

```python
import os
import shutil
import argparse

MEDIA_LIB = "media_library"

def save_media(cache_path, new_name):
    if not os.path.exists(MEDIA_LIB):
        os.makedirs(MEDIA_LIB)
    if not os.path.exists(cache_path):
        print(f"Error: {cache_path} not found.")
        return
    dest = os.path.join(MEDIA_LIB, new_name)
    shutil.copy(cache_path, dest)
    print(f"Media saved successfully to {dest}")

def list_media():
    if not os.path.exists(MEDIA_LIB) or not os.listdir(MEDIA_LIB):
        print("Media library is empty.")
        return
    print("=== Media Library ===")
    for f in os.listdir(MEDIA_LIB):
        print(f"- {os.path.join(MEDIA_LIB, f)}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["save", "list"])
    parser.add_argument("--cache_path", help="Path to the original file in cache")
    parser.add_argument("--new_name", help="Name to save the file as in the library")
    args = parser.parse_args()

    if args.action == "save" and args.cache_path and args.new_name:
        save_media(args.cache_path, args.new_name)
    elif args.action == "list":
        list_media()
    else:
        print("Missing arguments for the chosen action.")
```

---

## 5. `messenger_manager.py` (MESSAGERIE FACEBOOK)
Ce script permet à l'agent de lire les messages de la page Facebook (Messenger) stockés dans `inbox.json` et d'y répondre en utilisant l'API Messenger, sans toucher aux messages WhatsApp.

```python
import os
import argparse
import requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("FB_PAGE_ACCESS_TOKEN")
PAGE_ID = os.getenv("FB_PAGE_ID")

def list_conversations():
    url = f"https://graph.facebook.com/v19.0/{PAGE_ID}/conversations"
    params = {
        "fields": "id,unread_count,updated_time,participants",
        "access_token": TOKEN
    }
    res = requests.get(url, params=params)
    if res.status_code != 200:
        print(f"Error fetching conversations: {res.status_code} {res.text}")
        return

    data = res.json().get("data", [])
    unread_convos = [c for c in data if c.get("unread_count", 0) > 0]
    
    if not unread_convos:
        print("No unread conversations.")
        return

    print("=== Unread Conversations ===")
    for c in unread_convos:
        participants = c.get("participants", {}).get("data", [])
        users = [p.get("name", "Unknown") for p in participants if p.get("id") != PAGE_ID]
        user_names = ", ".join(users) if users else "Unknown User"
        print(f"Conversation ID: {c.get('id')} | Unread: {c.get('unread_count')} | User: {user_names} | Updated: {c.get('updated_time')}")

def read_conversation(conversation_id):
    url = f"https://graph.facebook.com/v19.0/{conversation_id}/messages"
    params = {
        "fields": "message,from,created_time",
        "access_token": TOKEN,
        "limit": 5
    }
    res = requests.get(url, params=params)
    if res.status_code != 200:
        print(f"Error reading conversation: {res.status_code} {res.text}")
        return

    data = res.json().get("data", [])
    if not data:
        print("No messages found.")
        return

    print(f"=== Conversation {conversation_id} (Last 5 messages) ===")
    for msg in reversed(data):
        sender = msg.get("from", {}).get("name", "Unknown")
        text = msg.get("message", "[Attachment/Sticker]")
        print(f"[{msg.get('created_time')}] {sender}: {text}")

def reply(conversation_id, message):
    message = message.replace('\\n', '\n').strip('\"\'')
    url = f"https://graph.facebook.com/v19.0/{conversation_id}/messages"
    params = {"access_token": TOKEN}
    payload = {"message": message}
    res = requests.post(url, params=params, json=payload)
    if res.status_code == 200:
        print(f"Reply sent successfully to conversation {conversation_id}")
    else:
        print(f"Error sending reply: {res.status_code} {res.text}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["list-conversations", "read", "reply"])
    parser.add_argument("--conversation_id", help="Conversation ID to read or reply to")
    parser.add_argument("--message", help="Message text to send")
    args = parser.parse_args()

    if args.action == "list-conversations":
        list_conversations()
    elif args.action == "read":
        if args.conversation_id:
            read_conversation(args.conversation_id)
        else:
            print("Missing --conversation_id")
    elif args.action == "reply":
        if args.conversation_id and args.message:
            reply(args.conversation_id, args.message)
        else:
            print("Missing --conversation_id or --message")
```

---

## 6. `cm_studio_bot.py` (WEBHOOK EVENT-DRIVEN)
Ce script remplace l'ancienne approche par Cronjob. Il utilise FastAPI pour recevoir les Webhooks de Meta (WhatsApp et Facebook) et déclenche l'agent Hermes de manière asynchrone (en arrière-plan) pour qu'il traite les messages instantanément. Il inclut un système de verrou (Lock) pour empêcher le déclenchement de multiples instances de l'agent en même temps (anti-spam).

```python
import os
import json
import asyncio
from fastapi import FastAPI, Request, BackgroundTasks
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

INBOX_FILE = "inbox.json"
LOCK_FILE = "agent_running.lock"

def save_to_inbox(data, platform):
    if not os.path.exists(INBOX_FILE):
        with open(INBOX_FILE, "w") as f:
            json.dump({"messages": []}, f)
            
    with open(INBOX_FILE, "r") as f:
        inbox = json.load(f)
        
    inbox["messages"].append({
        "platform": platform,
        "data": data
    })
    
    with open(INBOX_FILE, "w") as f:
        json.dump(inbox, f, indent=4)

async def trigger_agent(platform):
    """Trigger the Hermes agent if not already running."""
    if os.path.exists(LOCK_FILE):
        # Agent is already processing a batch
        return
        
    try:
        # Create lock
        open(LOCK_FILE, 'w').close()
        
        prompt = f"TRIGGER SYSTEM : Nouveaux événements reçus sur {platform}. Utilise tes outils (whatsapp_manager, messenger_manager, ou facebook_manager) pour lister les messages non lus ou les commentaires et y répondre immédiatement. N'oublie pas de vérifier à la fois WhatsApp et Messenger s'il y a du nouveau."
        
        # Run agent in background
        cmd = ["hermes", "--profile", "vo_community_manager", "chat", "--prompt", prompt]
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        
        # Wait for the agent to finish its run
        await process.communicate()
        
    finally:
        # Release lock
        if os.path.exists(LOCK_FILE):
            os.remove(LOCK_FILE)

@app.get("/webhook")
async def verify_webhook(request: Request):
    mode = request.query_params.get("hub.mode")
    token = request.query_params.get("hub.verify_token")
    challenge = request.query_params.get("hub.challenge")
    if mode and token:
        return int(challenge)
    return {"status": "ok"}

@app.post("/webhook")
async def receive_webhook(request: Request, background_tasks: BackgroundTasks):
    body = await request.json()
    platform = "unknown"
    if body.get("object") == "whatsapp_business_account":
        save_to_inbox(body, "whatsapp")
        platform = "WhatsApp"
    elif body.get("object") == "page":
        save_to_inbox(body, "facebook")
        platform = "Facebook/Messenger"
    else:
        save_to_inbox(body, "unknown")
        
    # Trigger the agent asynchronously
    background_tasks.add_task(trigger_agent, platform)
    return {"status": "received"}

if __name__ == "__main__":
    import uvicorn
    # Clear stale lock if server restarted
    if os.path.exists(LOCK_FILE):
        os.remove(LOCK_FILE)
    uvicorn.run(app, host="0.0.0.0", port=5000)
```
