#!/bin/bash

# 🚀 Setup script for AI News Digest

echo "🤖 AI News Digest - Setup"
echo "========================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${BLUE}📦 Initializing Git repository...${NC}"
    git init
    git branch -M main
fi

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Create necessary directories
echo -e "${BLUE}📁 Creating directories...${NC}"
mkdir -p data public/data

# Make scripts executable
chmod +x scripts/collect-news.js
chmod +x scripts/update-digest.js

# Initial data collection
echo -e "${BLUE}🔍 Collecting initial news...${NC}"
node scripts/collect-news.js

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Create a GitHub repository: https://github.com/new"
echo "  2. Add remote: git remote add origin https://github.com/YOUR_USERNAME/ai-news-digest.git"
echo "  3. Push: git add -A && git commit -m 'Initial commit' && git push -u origin main"
echo "  4. Connect to Vercel: https://vercel.com/new"
echo "  5. Add secrets to GitHub for auto-deployment"
echo ""
echo "To run locally:"
echo "  npm run dev"
echo ""
echo "To manually update news:"
echo "  npm run update"
