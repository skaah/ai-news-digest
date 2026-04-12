#!/bin/bash
# Script de mise à jour manuelle pour AI News Digest
# Usage: ./update-news.sh

echo "🤖 AI News Digest - Manual Update"
echo "=================================="

# Vérifier si on est dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Exécutez ce script depuis le dossier ai-news-digest"
    exit 1
fi

echo ""
echo "📦 Installation des dépendances..."
npm ci

echo ""
echo "🔍 Collecte des news..."
node scripts/collect-news.js

echo ""
echo "📋 Copie vers public..."
mkdir -p public/data
cp data/digest.json public/data/digest.json

echo ""
echo "🏗️  Build..."
npm run build

echo ""
echo "📤 Commit et push..."
git add -A
git commit -m "📰 Manual update: $(date +'%Y-%m-%d %H:%M')"
git push

echo ""
echo "✅ Mise à jour terminée !"
echo "🌐 Le site sera mis à jour dans 2-3 minutes"
