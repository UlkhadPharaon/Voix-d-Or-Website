# SOP V4 : DÉPLOIEMENT COMPLET DE L'EMPLOYÉ VIRTUEL HERMES (SANS BUGS)

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

## ÉTAPE 4 : Lancement et Conflits de la Gateway
1. **Démarrage de la Gateway** :
   `nohup hermes --profile nom_du_client gateway run > gateway.log 2>&1 &`
2. **⚠️ LE PIÈGE DU CACHE DAEMON** :
   - Si vous modifiez `SOUL.md` *après* avoir lancé la gateway, l'agent gardera l'ancienne identité en mémoire vive.
   - *Solution* : Tuez le processus avant de relancer : `pkill -f 'gateway run'`
3. **⚠️ LE CONFLIT DE PROFILS (Course aux messages)** :
   - Ne faites **jamais** tourner le profil `default` et le profil du client en même temps sur le même numéro WhatsApp (Self-Chat). Le profil par défaut interceptera les messages et répondra avec l'identité générique "Je suis Hermes créé par Nous Research".
   - *Solution* : Assurez-vous qu'un seul `gateway run` est actif (`ps aux | grep gateway`).

---

## ÉTAPE 5 : Le Piège de la Mémoire (Sessions)
Même après un redémarrage, si l'agent continue de dire "Je suis Hermes", c'est qu'il se souvient de l'historique de la conversation WhatsApp.
- **La Règle d'Or** : Un LLM lit tout l'historique de chat pour générer sa réponse. S'il s'est trompé d'identité dans le passé, il persistera pour rester cohérent.
- *Solution* : À chaque changement radical d'identité, videz les sessions :
  `rm -rf ~/.hermes/profiles/nom_du_client/sessions/*`
  `rm -rf ~/.hermes/profiles/nom_du_client/memories/*`

---

## ÉTAPE 6 : Les Outils (Tools) et Garde-fous
Pour automatiser l'agent, utilisez les scripts du fichier `Outils_Agent_Template.md` et installez-les dans le dossier du client.
1. **Le Spam de l'Inbox** : Le script `whatsapp_manager.py` **DOIT** contenir une ligne pour vider l'inbox (`{"messages": []}`) après lecture, sinon l'agent répondra en boucle.
2. **Formatage de l'Output LLM** : Les LLMs ajoutent souvent des retours à la ligne échappés (`\n`, `\\n`, ou des guillemets) dans leurs arguments de commande. Les scripts Python doivent inclure `message.replace('\\n', '\n')` pour nettoyer la réponse.
3. **Garde-fous (Limites Client)** : Pour empêcher un client (Tier 1 ou 2) d'exploser le budget API, intégrez le script `usage_tracker.py` qui vérifie les limites avant de laisser l'agent envoyer un message ou une image. L'architecture Event-Driven inclut également un Lock system (`agent_running.lock`) dans le webhook pour empêcher de lancer plusieurs instances de l'agent en même temps lors d'un pic de messages.
4. **Médiathèque et Retouche d'Images (Fal.ai)** :
   - Ajoutez le script `media_manager.py` pour que l'agent puisse archiver les images envoyées par le patron sur WhatsApp dans un dossier permanent (`media_library`).
   - **Consigne `SOUL.md` stricte pour la retouche** : Ajoutez dans le prompt de l'agent : *"INTERDICTION STRICTE d'écrire des scripts Python (comme PIL) pour manipuler des images ou ajouter un logo. Pour intégrer le logo du Studio Voix d'Or sur une image, tu dois obligatoirement utiliser ton outil natif de génération/édition d'image via l'API Fal.ai (modèle `gpt image 2 edit` ou équivalent, paramètre de qualité `medium`). Passe le logo comme image de référence (image prompt/mask) afin que le modèle génère le rendu et intègre le logo de manière subtile, organique et naturelle."*

---
*Ce SOP V4 garantit un déploiement fluide en évitant les blocages Meta, les crises d'identité LLM, et la surconsommation de crédits.*
