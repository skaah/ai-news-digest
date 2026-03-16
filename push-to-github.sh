#!/bin/bash

# 🚀 GitHub Repo Creator + Push Script

echo "=========================================="
echo "🤖 AI News Digest - GitHub Setup"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git n'est pas installé${NC}"
    exit 1
fi

# Get GitHub username
echo -e "${BLUE}📋 Configuration du repository${NC}"
echo ""
read -p "Entrez votre nom d'utilisateur GitHub: " USERNAME
read -p "Entrez votre email GitHub: " EMAIL
read -p "Entrez le nom du repo (défaut: ai-news-digest): " REPO_NAME
REPO_NAME=${REPO_NAME:-ai-news-digest}

echo ""
echo -e "${YELLOW}⚙️  Configuration Git...${NC}"
git config user.name "$USERNAME"
git config user.email "$EMAIL"

# Check if remote exists
if git remote | grep -q "origin"; then
    echo -e "${YELLOW}⚠️  Remote 'origin' existe déjà${NC}"
    git remote remove origin
fi

# Add new remote
echo -e "${BLUE}🔗 Ajout du remote...${NC}"
git remote add origin "https://github.com/$USERNAME/$REPO_NAME.git"

# Check if repo exists on GitHub
echo ""
echo -e "${YELLOW}📡 Vérification du repository GitHub...${NC}"
echo ""
echo "Si le repo n'existe pas encore, créez-le sur:"
echo -e "${GREEN}https://github.com/new${NC}"
echo ""
echo "Nom du repo: $REPO_NAME"
echo "Visibility: Public"
echo ""
read -p "Appuyez sur Entrée quand le repo est créé..."

# Add all files
echo ""
echo -e "${BLUE}📦 Ajout des fichiers...${NC}"
git add -A

# Commit
echo -e "${BLUE}💾 Commit...${NC}"
git commit -m "🚀 Initial commit: AI News Digest v1.0" || echo "Rien à committer"

# Push
echo ""
echo -e "${BLUE}📤 Push vers GitHub...${NC}"
if git push -u origin main; then
    echo ""
    echo -e "${GREEN}✅ Repository créé avec succès !${NC}"
    echo ""
    echo -e "${GREEN}🌐 URL du repo:${NC} https://github.com/$USERNAME/$REPO_NAME"
    echo ""
elif git push -u origin master; then
    echo ""
    echo -e "${GREEN}✅ Repository créé avec succès !${NC}"
    echo ""
    echo -e "${GREEN}🌐 URL du repo:${NC} https://github.com/$USERNAME/$REPO_NAME"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Erreur lors du push${NC}"
    echo "Vérifiez que le repo existe sur GitHub et que vous avez les droits d'accès"
    exit 1
fi

echo "=========================================="
echo -e "${GREEN}🎉 Prochaines étapes:${NC}"
echo "=========================================="
echo ""
echo "1. Activez GitHub Pages:"
echo "   → Allez sur https://github.com/$USERNAME/$REPO_NAME/settings/pages"
echo "   → Source: GitHub Actions"
echo ""
echo "2. Attendez le déploiement (2-3 minutes)"
echo ""
echo "3. Votre site sera disponible sur:"
echo -e "   ${GREEN}https://$USERNAME.github.io/$REPO_NAME/${NC}"
echo ""
echo "=========================================="
