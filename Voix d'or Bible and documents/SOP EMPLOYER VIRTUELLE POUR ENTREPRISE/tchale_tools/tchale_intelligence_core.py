import os
import requests
import argparse
import json
from dotenv import load_dotenv
import time

load_dotenv()
APIFY_TOKEN = os.getenv("APIFY_API_TOKEN")

def run_deep_trend_analysis(target_keyword):
    # Logs intermédiaires supprimés, on ne renvoie QUE du JSON propre 
    # pour que le LLM puisse parser la réponse nativement.
    
    url = f"https://api.apify.com/v2/acts/clockworks~tiktok-scraper/runs?token={APIFY_TOKEN}"
    payload = {
        "hashtags": [target_keyword],
        "resultsPerPage": 20,
        "shouldDownloadVideos": False
    }
    
    res = requests.post(url, json=payload)
    if res.status_code != 201:
        return {"status": "error", "message": f"Apify API error: {res.text}"}
        
    run_data = res.json().get("data", {})
    run_id = run_data.get("id")
    dataset_id = run_data.get("defaultDatasetId")
    
    # Attente réelle et récupération du dataset Apify
    # Pour ne pas bloquer trop longtemps, on limite le nombre de requêtes
    max_retries = 30
    dataset_id = run_data.get("defaultDatasetId")
    
    for _ in range(max_retries):
        time.sleep(5)
        run_status_url = f"https://api.apify.com/v2/acts/runs/{run_id}?token={APIFY_TOKEN}"
        status_res = requests.get(run_status_url)
        if status_res.status_code == 200:
            status_data = status_res.json().get("data", {})
            if status_data.get("status") == "SUCCEEDED":
                break
            elif status_data.get("status") in ["FAILED", "ABORTED", "TIMED-OUT"]:
                return {"status": "error", "message": f"Apify run failed with status: {status_data.get('status')}"}
                
    # Fetch results from dataset
    dataset_url = f"https://api.apify.com/v2/datasets/{dataset_id}/items?token={APIFY_TOKEN}"
    dataset_res = requests.get(dataset_url)
    if dataset_res.status_code != 200:
        return {"status": "error", "message": "Impossible de récupérer les résultats de l'API Apify."}
        
    items = dataset_res.json()
    
    trends = {
        "status": "success",
        "dataset_id": dataset_id,
        "items_found": len(items),
        "raw_items": items[:5], # Renvoie les 5 premiers résultats bruts
        "actionable_insights": [
            f"La recherche sur {target_keyword} a retourné {len(items)} éléments. A vous de croiser avec l'actualité de Gareth.",
            "Utilisez ces données brutes pour formuler des recommandations précises sur les audios et hashtags à utiliser."
        ],
        "suggested_prompt_to_artist": f"Bro, regarde les résultats sur {target_keyword}. J'ai besoin d'un freestyle ciblé dessus."
    }
    
    return trends

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Intelligence Core - Scraping et Analyse de Trends")
    parser.add_argument("action", choices=["analyze"])
    parser.add_argument("--keyword", required=True)
    args = parser.parse_args()
    
    if args.action == "analyze":
        result = run_deep_trend_analysis(args.keyword)
        # Sortie standard 100% JSON pour parsering facile par l'agent
        print(json.dumps(result, indent=2))
