# SOP V5 : DÉPLOIEMENT COMPLET DE L'EMPLOYÉ VIRTUEL HERMES (RÉVISION ARCHITECTURE)

Ce document centralise toutes les étapes critiques et les solutions aux pièges fréquents rencontrés lors du déploiement d'un agent IA Hermes sur un serveur VPS avec Meta (WhatsApp & Facebook). À utiliser pour chaque nouvelle intégration client.

---

## ÉTAPE 1 : Configuration Meta & Webhooks
1. **Création de l'App Meta** : Créer l'application, l'associer au Business Manager du client.
2. **Webhooks** : Configurer l'URL (Ngrok ou domaine VPS) et le token de vérification (`verify_token`).
3. **Abonnement** : S'assurer de cliquer sur "Manage" (Gérer) et cocher la case **`messages`**.
4. **⚠️ LE PIÈGE DU TRIANGLE ORANGE (Garde-fou Meta)** :
   - Si le numéro de téléphone dans le WhatsApp Manager affiche un triangle orange ⚠️ (nom d'affichage non approuvé ou entreprise non vérifiée), Meta **bloquera silencieusement** les messages entrants (pas de requête POST vers votre serveur).
   - *Solution* : Utiliser exclusivement un numéro ajouté à la liste des "Numéros Testeurs" de l'App Meta jusqu'à la vérification complète de l'entreprise.

---

## ÉTAPE 2 : Déploiement du Serveur (Uvicorn / FastAPI)
1. **Création du `.env`** : Ne jamais oublier les variables :
   - `WA_BUSINESS_API_TOKEN`
   - `WA_PHONE_ID`
   - `FB_PAGE_ACCESS_TOKEN`
   - `FB_PAGE_ID`
2. **Le script Webhook (`cm_studio_bot.py`)** : Il doit enregistrer les messages dans `inbox.json`.
3. **Démarrage** : Utiliser `nohup` ou `screen` pour garder Uvicorn actif : 
   `nohup uvicorn cm_studio_bot:app --host 0.0.0.0 --port 5000 &`

---

## ÉTAPE 3 : Configuration de l'Agent Hermes
1. **Création du Profil** : `hermes profile create nom_du_client`
2. **⚠️ LE PIÈGE DE L'IDENTITÉ (`SOUL.md`)** :
   - Ne pas modifier `soul.json` ou `prompt.txt`. 
   - Hermes charge sa personnalité **uniquement** depuis `~/.hermes/profiles/nom_du_client/SOUL.md`.
   - Modifiez ce fichier pour lui donner son rôle, son ton, et ses instructions strictes.

---

## ÉTAPE 4 : Architecture Webhook VS Architecture Gateway (LE CHOIX CRITIQUE)
Il existe deux manières de faire tourner Hermes. **IL NE FAUT JAMAIS MÉLANGER LES DEUX**.
1. **L'Architecture Webhook (Recommandée pour WhatsApp Business)** : L'agent "dort" et n'est réveillé que par un script Python quand un message arrive via l'API Meta. (C'est ce qu'on utilise avec `cm_studio_bot.py`).
2. **L'Architecture Gateway (Self-Chat / WhatsApp Web)** : L'agent est connecté h24 via `hermes gateway run` ou le service `hermes-webui` et lit tout en direct.
3. **⚠️ LE PIÈGE DE LA GUERRE DES CLONES** :
   - Si on active le service WebUI (`systemctl start hermes-webui`) EN MÊME TEMPS que le Webhook, les deux systèmes entrent en conflit et surconsomment l'API IA.
   - *Solution* : Toujours désactiver le WebUI si on utilise l'architecture Webhook :
     `systemctl stop hermes-webui` et `systemctl disable hermes-webui`.
   - **Ajouter à SOUL.md** : *INTERDICTION ABSOLUE d'exécuter la commande `hermes gateway run`. La gateway consomme l'API en boucle et bloque toutes tes réponses.*

---

## ÉTAPE 5 : Le Piège de la Mémoire (Sessions)
Même après un redémarrage, si l'agent continue de dire "Je suis Hermes", c'est qu'il se souvient de l'historique de la conversation WhatsApp.
- **La Règle d'Or** : Un LLM lit tout l'historique de chat pour générer sa réponse. S'il s'est trompé d'identité dans le passé, il persistera pour rester cohérent.
- *Solution* : À chaque changement radical d'identité, videz les sessions :
  `rm -rf ~/.hermes/profiles/nom_du_client/sessions/*`
  `rm -rf ~/.hermes/profiles/nom_du_client/memories/*`

---

## ÉTAPE 6 : L'Enfer du Quota API (429) et le Bug Fantôme
L'API NVIDIA (tiers gratuit) bloque violemment si on fait trop de requêtes par minute (Erreur `429 Too Many Requests`).
1. **⚠️ LE PIÈGE DU CRONJOB SPAMMEUR** : 
   - L'agent IA a tendance à créer des "Cronjobs" (ex: `Messenger Auto-Reply 1 min`) pour interroger lui-même les messages. Couplé au Webhook, cela épuise le quota en quelques minutes.
   - *Solution* : Supprimer le cron (`hermes cron delete ID`) et se fier UNIQUEMENT au Webhook qui est "Event-Driven" (Zéro gaspillage).
2. **⚠️ LE BUG FANTÔME (Perte de messages)** :
   - Dans `cm_studio_bot.py`, si le fichier d'attente `inbox_processing.json` est supprimé dans un bloc `finally:`, un plantage 429 de l'agent va causer la suppression du message AVANT qu'il ne soit traité.
   - Le système croira avoir lu le message, mais il sera englouti.

---

## ÉTAPE 7 : Les Outils (Tools) et Garde-fous
Pour automatiser l'agent, utilisez les scripts du fichier `Outils_Agent_Template.md` et installez-les dans le dossier du client.
1. **Le Spam de l'Inbox** : Le script `whatsapp_manager.py` **DOIT** contenir une ligne pour vider l'inbox (`{"messages": []}`) après lecture.
2. **Formatage de l'Output LLM** : Les LLMs ajoutent souvent des retours à la ligne échappés (`\n`, `\\n`, ou des guillemets). Les scripts Python doivent inclure `message.replace('\\n', '\n')` pour nettoyer la réponse.
3. **Médiathèque et Retouche d'Images (Fal.ai)** :
   - Consigne `SOUL.md` stricte pour la retouche : "INTERDICTION STRICTE d'écrire des scripts Python pour manipuler des images. Tu dois obligatoirement utiliser ton outil de génération via l'API Fal.ai."
