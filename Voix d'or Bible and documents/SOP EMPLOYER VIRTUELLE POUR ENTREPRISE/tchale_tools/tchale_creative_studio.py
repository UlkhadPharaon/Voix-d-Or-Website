import os
import requests
import argparse
import base64
import json
from dotenv import load_dotenv

load_dotenv()
FAL_KEY = os.getenv("FAL_KEY")

def generate_campaign_assets(image_path, base_prompt):
    if not os.path.exists(image_path):
        return {"status": "error", "message": f"Image {image_path} introuvable."}

    with open(image_path, "rb") as img_file:
        img_data = base64.b64encode(img_file.read()).decode("utf-8")
        
    ext = os.path.splitext(image_path)[1].lower()
    mime = "image/png" if ext == ".png" else "image/jpeg"
    data_url = f"data:{mime};base64,{img_data}"

    url = "https://fal.run/fal-ai/gpt-image-2/edit"
    headers = {"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"}
    
    # Prompt enrichi automatiquement pour garantir la qualité
    enhanced_prompt = f"{base_prompt} - High end studio photography, cinematic lighting, 8k resolution, photorealistic, Vogue editorial style"
    
    payload = {
        "image_url": data_url,
        "prompt": enhanced_prompt,
        "quality": "medium" # Qualité fixée selon consigne
    }
    
    try:
        res = requests.post(url, headers=headers, json=payload, timeout=60)
        if res.status_code == 200:
            result = res.json()
            image_url = result.get("image", {}).get("url") or result.get("images", [{}])[0].get("url")
            
            return {
                "status": "success",
                "original_prompt": base_prompt,
                "campaign_assets": {
                    "main_cover_url": image_url,
                    "ig_story_url": image_url, # Demo
                    "epk_header_url": image_url
                },
                "recommended_captions": [
                    "Le futur du rap africain est en marche. ⚡️ #GarethLafia",
                    "Nouvelle ère. Nouveau son. Vous n'êtes pas prêts."
                ]
            }
        else:
            return {"status": "error", "message": f"Fal API Error: {res.text}"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Creative Studio - Génération de bundles d'images pour campagnes")
    parser.add_argument("action", choices=["generate_campaign"])
    parser.add_argument("--image", required=True, help="Chemin vers l'image de base")
    parser.add_argument("--prompt", required=True, help="Prompt de base")
    args = parser.parse_args()
    
    if args.action == "generate_campaign":
        print(json.dumps(generate_campaign_assets(args.image, args.prompt), indent=2))
