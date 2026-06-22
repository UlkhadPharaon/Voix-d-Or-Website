#!/bin/bash
# Installation script for Ubuntu/Debian

echo "=========================================="
echo " Installation du Bot CM Studio Voix d'Or"
echo "=========================================="

# 1. Update and install dependencies
echo "[1/4] Installation de Python et venv..."
sudo apt-get update
sudo apt-get install -y python3 python3-venv python3-pip

# 2. Create virtual environment
echo "[2/4] Création de l'environnement virtuel..."
python3 -m venv venv
source venv/bin/activate

# 3. Install Python requirements
echo "[3/4] Installation des dépendances Python..."
pip install -r requirements.txt

# 4. Environment setup
echo "[4/4] Configuration..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Fichier .env créé. Pensez à l'éditer avec vos clés API :"
    echo "nano .env"
fi

echo "=========================================="
echo " Installation terminée !"
echo "=========================================="
echo "Pour lancer le bot :"
echo "  source venv/bin/activate"
echo "  python3 cm_studio_bot.py"
echo ""
echo "Note: pour un serveur de production, utilisez gunicorn ou créez un service systemd."
