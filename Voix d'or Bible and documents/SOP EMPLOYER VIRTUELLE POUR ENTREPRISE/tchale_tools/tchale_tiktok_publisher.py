import os
import requests
import argparse
import json
from dotenv import load_dotenv

load_dotenv()
ZERION_API_KEY = os.getenv("ZERION_API_KEY")

def publish_tiktok(video_path, caption):
    if not os.path.exists(video_path):
        return {"status": "error", "message": f"Le fichier vidéo {video_path} n'existe pas."}
        
    url = "https://api.zerion.io/tiktok/v1/publish" 
    headers = {"Authorization": f"Bearer {ZERION_API_KEY}"}
    
    # Envoi de la requête réelle à l'API Zernio
    try:
        with open(video_path, 'rb') as f:
            res = requests.post(url, headers=headers, files={'video': f}, data={'caption': caption})
        
        if res.status_code in [200, 201]:
            data = res.json()
            return {
                "status": "success",
                "message": "Vidéo uploadée et publiée avec succès sur TikTok via Zernio.",
                "video_id": data.get("video_id", "tiktok_published_id"),
                "caption_used": caption,
                "api_response": data
            }
        else:
            return {
                "status": "error", 
                "message": f"Erreur API Zernio ({res.status_code}): {res.text}"
            }
    except Exception as e:
        return {"status": "error", "message": f"Exception lors de la publication: {str(e)}"}

def fetch_tiktok_metrics(video_id):
    # Récupération réelle des métriques via l'API Zernio
    url = f"https://api.zerion.io/tiktok/v1/video/{video_id}/metrics"
    try:
        res = requests.get(url, headers={"Authorization": f"Bearer {ZERION_API_KEY}"})
        if res.status_code == 200:
            data = res.json()
            return {
                "status": "success",
                "video_id": video_id,
                "metrics": data.get("metrics", {}),
                "agent_insight": "Veuillez analyser ces métriques brutes pour décider de la marche à suivre."
            }
        else:
            return {"status": "error", "message": f"Erreur de récupération des métriques: {res.text}"}
    except Exception as e:
        return {"status": "error", "message": f"Exception: {str(e)}"}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="TikTok Publisher & Manager (Zerion API)")
    parser.add_argument("action", choices=["publish", "metrics"])
    parser.add_argument("--video", help="Chemin vers le fichier vidéo .mp4")
    parser.add_argument("--caption", help="Légende du post TikTok")
    parser.add_argument("--id", help="ID de la vidéo TikTok (pour metrics)")
    
    args = parser.parse_args()
    
    if args.action == "publish":
        if args.video and args.caption:
            print(json.dumps(publish_tiktok(args.video, args.caption), indent=2))
        else:
            print(json.dumps({"status": "error", "message": "Arguments --video et --caption requis."}))
    elif args.action == "metrics":
        if args.id:
            print(json.dumps(fetch_tiktok_metrics(args.id), indent=2))
        else:
            print(json.dumps({"status": "error", "message": "Argument --id requis."}))
