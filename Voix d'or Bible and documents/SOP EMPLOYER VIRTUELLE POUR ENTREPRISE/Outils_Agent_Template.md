# TEMPLATES DES OUTILS PYTHON POUR AGENT HERMES (V5)

Copiez-collez ces scripts dans le dossier de déploiement du client (ex: `/root/CM_Studio_Deploy/nom_du_client/`).

## 1. `whatsapp_manager.py`
Ce script gère la lecture des messages WhatsApp reçus (depuis le fichier traité par rotation `inbox_processing.json`) et l'envoi des réponses WhatsApp via l'API Cloud de Meta.

```python
import os
import json
import argparse
import requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("WA_BUSINESS_API_TOKEN")
PHONE_ID = os.getenv("WA_PHONE_ID")
INBOX_FILE = "inbox_processing.json"

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

    if not whatsapp_messages:
        print("No new messages.")
        return

    print("=== Unread WhatsApp Messages ===")
    has_message = False
    
    for msg in whatsapp_messages:
        data = msg.get("data", {})
        for entry in data.get("entry", []):
            for change in entry.get("changes", []):
                value = change.get("value", {})
                
                # Mappage des noms de contacts
                contacts = {}
                for contact in value.get("contacts", []):
                    wa_id = contact.get("wa_id")
                    name = contact.get("profile", {}).get("name", "Unknown")
                    contacts[wa_id] = name
                
                # Lecture des messages
                for message in value.get("messages", []):
                    has_message = True
                    sender_id = message.get("from")
                    sender_name = contacts.get(sender_id, "Unknown")
                    msg_type = message.get("type", "unknown")
                    
                    if msg_type == "text":
                        body = message.get("text", {}).get("body", "")
                        print(f"[Plateforme: WhatsApp] De: {sender_id} ({sender_name}) | Type: text | Message: {body}")
                    elif msg_type == "image":
                        image_id = message.get("image", {}).get("id", "")
                        print(f"[Plateforme: WhatsApp] De: {sender_id} ({sender_name}) | Type: image | Media ID: {image_id} (dis-lui que tu as reçu l'image)")
                    else:
                        print(f"[Plateforme: WhatsApp] De: {sender_id} ({sender_name}) | Type: {msg_type}")

    if not has_message:
        print("Aucun message texte ou image trouvé (uniquement des accusés de réception).")

    # Nettoyage automatique du fichier de traitement
    try:
        os.remove(INBOX_FILE)
    except:
        pass

def reply(to, message):
    # Nettoyage des sauts de lignes échappés du LLM
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
Ce script gère la publication de posts et de photos sur le mur de la page Facebook, ainsi que la réponse aux commentaires publics sur les posts ```python
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
    params = {"fields": "id,message,comments{id,message,from,comments{id,message,from}}", "access_token": TOKEN, "limit": 100}
    res = requests.get(url, params=params)
    if res.status_code != 200:
        print(f"Error: {res.status_code} {res.text}")
        return
        
    replied_comments = load_replied_comments()
    data = res.json().get("data", [])
    has_unanswered = False
    print("=== Recent Posts and Comments ===")
    
    def process_comment(comment):
        nonlocal has_unanswered
        author = comment.get("from", {}).get("name", "Unknown")
        comment_id = comment.get('id')
        
        if comment_id in replied_comments:
            pass
        elif str(comment.get("from", {}).get("id")) == str(PAGE_ID):
            pass
        else:
            status = "[NOUVEAU - A TRAITER]"
            has_unanswered = True
            print(f"  -> Comment ID: {comment_id} | Author: {author} | Message: {comment.get('message')} {status}")
            
        for reply in comment.get("comments", {}).get("data", []):
            process_comment(reply)

    for post in data:
        for comment in post.get("comments", {}).get("data", []):
            process_comment(comment)
                
    if not has_unanswered:
         print("Aucun nouveau commentaire a traiter.")

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

def get_post_stats():
    url = f"https://graph.facebook.com/v19.0/{PAGE_ID}/published_posts"
    params = {
        "fields": "id,message,created_time,likes.summary(true),comments.summary(true),shares", 
        "access_token": TOKEN, 
        "limit": 10
    }
    res = requests.get(url, params=params)
    if res.status_code != 200:
        print(f"Error: {res.status_code} {res.text}")
        return
        
    posts = res.json().get('data', [])
    if not posts:
        print("Aucun post trouve.")
        return
        
    print("=== ENGAGEMENT DES DERNIERS POSTS ===")
    for post in posts:
        msg = post.get('message', '[Image/Video sans texte]')[:60].replace('\\n', ' ')
        date = post.get('created_time', '')[:10]
        likes = post.get('likes', {}).get('summary', {}).get('total_count', 0)
        comments = post.get('comments', {}).get('summary', {}).get('total_count', 0)
        shares = post.get('shares', {}).get('count', 0)
        
        print(f"[{date}] {msg}...")
        print(f"   ❤️ Likes: {likes} | 💬 Commentaires: {comments} | 🔄 Partages: {shares}")
        print("-" * 40)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["publish", "publish_photo", "reply_comment", "list_comments", "get_stats", "get_post_stats"])
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
    elif args.action == "get_post_stats":
        get_post_stats()
    else:
        print("Missing required arguments.")
```st_comments()
```

---

## 3. `usage_tracker.py` (GARDE-FOU ABONNEMENT)
Ce script est exécuté avant chaque action de l'agent pour vérifier si la limite mensuelle de messages autorisés pour le client n'est pas dépassée.

```python
import json
import os
import sys
from datetime import datetime

USAGE_FILE = "client_usage.json"
MONTHLY_LIMIT = int(os.getenv("CLIENT_MONTHLY_LIMIT", 100))

def check_usage():
    current_month = datetime.now().strftime("%Y-%m")
    
    if not os.path.exists(USAGE_FILE):
        with open(USAGE_FILE, "w") as f:
            json.dump({"month": current_month, "count": 0}, f)
            
    with open(USAGE_FILE, "r") as f:
        data = json.load(f)
        
    if data.get("month") != current_month:
        data = {"month": current_month, "count": 0}
        
    if data["count"] >= MONTHLY_LIMIT:
        print(f"LIMIT_REACHED: Limite mensuelle de {MONTHLY_LIMIT} actions atteinte.")
        sys.exit(1)
    else:
        data["count"] += 1
        with open(USAGE_FILE, "w") as f:
            json.dump(data, f)
        print(f"OK: Action autorisée. Usage: {data['count']}/{MONTHLY_LIMIT}")
        sys.exit(0)

if __name__ == "__main__":
    check_usage()
```

---

## 4. `media_manager.py` (MÉDIATHÈQUE CLOUD)
Permet à l'agent de sauvegarder dans un dossier permanent (`media_library`) les fichiers médias (comme des photos ou audios de référence) envoyés par l'administrateur.

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
    print(f"Media saved to {dest}")

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
    parser.add_argument("--cache_path", help="Path to cached file")
    parser.add_argument("--new_name", help="Destination file name")
    args = parser.parse_args()

    if args.action == "save" and args.cache_path and args.new_name:
        save_media(args.cache_path, args.new_name)
    elif args.action == "list":
        list_media()
```

---

## 5. `messenger_manager.py` (FACEBOOK MESSENGER)
Gère l'extraction des conversations privées non lues reçues via le fichier de rotation et l'envoi de réponses privées. **Intègre un marquage automatique comme "lu" (`mark_seen`) pour éviter le spam de réponses infinies.**

```python
import os
import argparse
import requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("FB_PAGE_ACCESS_TOKEN")
PAGE_ID = os.getenv("FB_PAGE_ID")
GRAPH = "https://graph.facebook.com/v19.0"
INBOX_FILE = "inbox_processing.json"

def _get_psid_from_conversation(conversation_id):
    url = f"{GRAPH}/{conversation_id}"
    params = {"fields": "participants", "access_token": TOKEN}
    r = requests.get(url, params=params)
    r.raise_for_status()
    participants = r.json().get("participants", {}).get("data", [])
    for p in participants:
        if str(p.get("id")) != str(PAGE_ID):
            return p.get("id")
    return None

def mark_seen(conversation_id):
    psid = _get_psid_from_conversation(conversation_id)
    if not psid:
        print(f"PSID not found to mark conversation {conversation_id} as seen.")
        return
    url = f"{GRAPH}/me/messages"
    payload = {
        "recipient": {"id": psid},
        "sender_action": "mark_seen"
    }
    res = requests.post(url, params={"access_token": TOKEN}, json=payload)
    if res.status_code == 200:
        print(f"Conversation {conversation_id} marked as seen.")
    else:
        print(f"Error marking seen: {res.text}")

def list_conversations():
    # Envoi direct des messages non lus provenant du fichier webhook trié
    if not os.path.exists(INBOX_FILE):
        print("No unread conversations.")
        return
        
    try:
        with open(INBOX_FILE, "r") as f:
            inbox = json.load(f)
    except:
        print("No unread conversations.")
        return
        
    messages = inbox.get("messages", [])
    fb_messages = [msg for msg in messages if msg.get("platform") == "facebook"]
    
    if not fb_messages:
        print("No unread conversations.")
        return
        
    print("=== Unread Conversations ===")
    for entry in fb_messages:
        # Traitement direct du payload Messenger reçu par Webhook
        data = entry.get("data", {})
        for entry_item in data.get("entry", []):
            for messaging in entry_item.get("messaging", []):
                sender_id = messaging.get("sender", {}).get("id")
                # Cherche s'il y a un message texte
                msg_text = messaging.get("message", {}).get("text", "")
                if sender_id and msg_text:
                    print(f"Conversation ID: {sender_id} | User PSID: {sender_id} | Message: {msg_text}")

def reply(conversation_id, message):
    message = message.replace('\\n', '\n').strip('\"\'')
    
    # Étape critique : marquer comme lu avant d'envoyer
    mark_seen(conversation_id)
    
    url = f"{GRAPH}/me/messages"
    payload = {
        "messaging_product": "messenger",
        "recipient": {"id": conversation_id}, # Sur webhook, l'ID de l'expéditeur est le PSID
        "message": {"text": message},
    }
    res = requests.post(url, params={"access_token": TOKEN}, json=payload)
    if res.status_code == 200:
        print(f"Reply sent successfully to PSID {conversation_id}")
    else:
        print(f"Error sending reply: {res.status_code} {res.text}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["list-conversations", "reply"])
    parser.add_argument("--conversation_id", help="Sender PSID")
    parser.add_argument("--message", help="Message text")
    args = parser.parse_args()

    if args.action == "list-conversations":
        list_conversations()
    elif args.action == "reply":
        if args.conversation_id and args.message:
            reply(args.conversation_id, args.message)
        else:
            print("Missing parameters")
```

---

## 6. `cm_studio_bot.py` (SERVEUR WEBHOOK EVENT-DRIVEN & LOCKS)
Ce serveur FastAPI reçoit les webhooks, effectue la rotation atomique des fichiers inbox et gère le verrou de concurrence avec suppression des verrous expirés (stales).

```python
import os
import json
import asyncio
import time
import shutil
from fastapi import FastAPI, Request, BackgroundTasks
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

INBOX_FILE = "inbox.json"
INBOX_PROC_FILE = "inbox_processing.json"
LOCK_FILE = "agent_running.lock"

# Nettoyage des verrous expirés au démarrage
if os.path.exists(LOCK_FILE):
    try:
        os.remove(LOCK_FILE)
    except:
        pass

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
    # Vérification et suppression des verrous bloqués (stale locks > 5 minutes)
    if os.path.exists(LOCK_FILE):
        lock_age = time.time() - os.path.getmtime(LOCK_FILE)
        if lock_age > 300: # 5 minutes
            try:
                os.remove(LOCK_FILE)
            except:
                pass
        else:
            return # Agent déjà actif, on ignore
            
    try:
        # Création du verrou
        open(LOCK_FILE, 'w').close()
        
        # Rotation atomique de l'inbox pour éviter les pertes d'événements
        if os.path.exists(INBOX_FILE):
            shutil.move(INBOX_FILE, INBOX_PROC_FILE)
        else:
            return # Aucun nouveau message réel
            
        prompt = f"TRIGGER SYSTEM : Nouveaux événements reçus sur {platform}. Utilise tes outils (whatsapp_manager, messenger_manager, ou facebook_manager) pour répondre immédiatement aux messages non lus dans inbox_processing.json. Vérifie toutes les plateformes."
        
        cmd = ["/usr/local/lib/hermes-agent/venv/bin/hermes", "--profile", "vo_community_manager", "chat", "-q", prompt]
        
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        
        stdout, stderr = await process.communicate()
        
        # Journalisation
        with open("agent_runs.log", "a", encoding="utf-8") as f:
            f.write(f"--- RUN {platform} ({time.strftime('%Y-%m-%d %H:%M:%S')}) ---\nSTDOUT: {stdout.decode(errors='ignore')}\nSTDERR: {stderr.decode(errors='ignore')}\n\n")
            
    except Exception as e:
        with open("agent_runs.log", "a", encoding="utf-8") as f:
            f.write(f"--- ERROR {platform} ({time.strftime('%Y-%m-%d %H:%M:%S')}) ---\n{str(e)}\n\n")
    finally:
        if os.path.exists(LOCK_FILE):
            try:
                os.remove(LOCK_FILE)
            except:
                pass

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
        is_just_status = True
        for entry in body.get("entry", []):
            for change in entry.get("changes", []):
                value = change.get("value", {})
                if "messages" in value:
                    is_just_status = False
                    break
        if is_just_status:
            return {"status": "ignored"}
            
        save_to_inbox(body, "whatsapp")
        platform = "WhatsApp"
        
    elif body.get("object") == "page":
        is_own_comment = False
        PAGE_ID = os.getenv("FB_PAGE_ID")
        for entry in body.get("entry", []):
            for change in entry.get("changes", []):
                value = change.get("value", {})
                if value.get("from", {}).get("id") == PAGE_ID:
                    is_own_comment = True
                    break
        if is_own_comment:
            return {"status": "ignored"}
            
        save_to_inbox(body, "facebook")
        platform = "Facebook"
    else:
        return {"status": "ignored"}
        
    background_tasks.add_task(trigger_agent, platform)
    return {"status": "received"}
```

---

## 7. `cron_agent.sh` (WRAPPER CRON DE SECOURS STABLE)
Ce script shell doit être mis en place via crontab toutes les 10 minutes (`*/10 * * * *`). Il configure les encodages indispensables pour éviter les plantages d'emojis.

```bash
#!/bin/bash
# Forcer l'encodage UTF-8 et charger le PATH
export LANG=C.UTF-8
export PYTHONIOENCODING=utf-8
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

CD_DIR="/root/CM_Studio_Deploy/vo_community_manager"
cd "$CD_DIR" || exit 1

LOCK_FILE="agent_running.lock"
INBOX_FILE="inbox.json"
INBOX_PROC_FILE="inbox_processing.json"

# Détection et purge du verrou bloqué (> 5 min)
if [ -f "$LOCK_FILE" ]; then
    LOCK_AGE=$(( $(date +%s) - $(stat -c %Y "$LOCK_FILE") ))
    if [ "$LOCK_AGE" -gt 300 ]; then
        echo "Stale lock detected ($LOCK_AGE seconds). Removing it."
        rm -f "$LOCK_FILE"
    else
        echo "Agent is already running. Exiting."
        exit 0
    fi
fi

# Si aucun nouveau message n'est en attente, on s'arrête
if [ ! -f "$INBOX_FILE" ]; then
    echo "No new messages in inbox.json. Exiting."
    exit 0
fi

# Création du verrou et rotation de l'inbox
touch "$LOCK_FILE"
mv "$INBOX_FILE" "$INBOX_PROC_FILE"

echo "Executing Cron Fallback Agent..."
timeout 240 /usr/local/lib/hermes-agent/venv/bin/hermes --profile vo_community_manager chat -q "TRIGGER SYSTEM CRON : Tâche planifiée de secours. Utilise tes outils pour traiter les messages non lus de inbox_processing.json immédiatement."

# Retrait du verrou
rm -f "$LOCK_FILE"
```
