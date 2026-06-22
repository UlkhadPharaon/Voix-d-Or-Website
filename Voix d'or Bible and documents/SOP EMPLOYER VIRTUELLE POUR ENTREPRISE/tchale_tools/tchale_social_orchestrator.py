import os
import requests
import argparse
import json
from dotenv import load_dotenv

load_dotenv()
FB_TOKEN = os.getenv("FB_PAGE_ACCESS_TOKEN")
PAGE_ID = os.getenv("FB_PAGE_ID")
GRAPH_API = "https://graph.facebook.com/v19.0"

def analyze_sentiment(text):
    text = text.lower()
    if any(word in text for word in ["lourd", "feu", "bastos", "fort", "🔥", "boss", "rapide"]):
        return "FAN_HARDCORE"
    if any(word in text for word in ["nul", "éclaté", "bruit", "wack", "nul"]):
        return "HATER"
    if any(word in text for word in ["feat", "prix", "contact", "studio", "booking", "manager"]):
        return "BUSINESS"
    return "NEUTRAL"

def fetch_and_analyze_comments():
    url = f"{GRAPH_API}/{PAGE_ID}/feed?fields=id,message,comments{{id,message,from}}&access_token={FB_TOKEN}&limit=5"
    res = requests.get(url)
    if res.status_code != 200:
        return {"status": "error", "message": res.text}
        
    data = res.json().get("data", [])
    analyzed_data = []
    
    for post in data:
        comments = post.get("comments", {}).get("data", [])
        for c in comments:
            # Ne pas analyser nos propres commentaires
            if str(c.get("from", {}).get("id")) == str(PAGE_ID):
                continue
                
            msg = c.get("message", "")
            analyzed_data.append({
                "post_id": post.get("id"),
                "comment_id": c.get("id"),
                "author": c.get("from", {}).get("name"),
                "message": msg,
                "sentiment": analyze_sentiment(msg)
            })
            
    return {"status": "success", "analyzed_comments": analyzed_data}

def batch_reply(responses_json_string):
    """
    S'attend à recevoir un JSON array comme chaine:
    [{"comment_id": "123", "reply": "Merci!"}, {"comment_id": "456", "reply": "T'es pas prêt."}]
    """
    try:
        responses = json.loads(responses_json_string)
    except Exception as e:
        return {"status": "error", "message": f"JSON payload invalide : {str(e)}"}
        
    results = []
    success_count = 0
    for r in responses:
        c_id = r.get("comment_id")
        msg = r.get("reply")
        if not c_id or not msg:
            continue
            
        url = f"{GRAPH_API}/{c_id}/comments"
        res = requests.post(url, data={"message": msg, "access_token": FB_TOKEN})
        results.append({"comment_id": c_id, "http_status": res.status_code})
        if res.status_code == 200:
            success_count += 1
            
    return {
        "status": "success", 
        "summary": f"{success_count}/{len(responses)} commentaires répondus.",
        "details": results
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Social Orchestrator - Sentiment Analysis & Batch Replying")
    parser.add_argument("action", choices=["analyze_comments", "batch_reply"])
    parser.add_argument("--payload", help="JSON string of an array of objects: [{'comment_id': 'id', 'reply': 'texte'}]")
    args = parser.parse_args()
    
    if args.action == "analyze_comments":
        print(json.dumps(fetch_and_analyze_comments(), indent=2))
    elif args.action == "batch_reply":
        if args.payload:
            print(json.dumps(batch_reply(args.payload), indent=2))
        else:
            print(json.dumps({"status": "error", "message": "--payload argument is required for batch_reply"}))
