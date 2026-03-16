# 🚀 AI News Digest - Setup Guide

## ✅ Ce qui est déjà fait

### 📁 Structure du projet
- ✅ Next.js 14 avec App Router
- ✅ Tailwind CSS + Design System complet
- ✅ Composants UI (Header, Hero, NewsCard, Filters, Footer)
- ✅ Dark/Light mode toggle
- ✅ Animations Framer Motion
- ✅ Responsive design

### 🤖 Automatisation
- ✅ Script de collecte RSS (`scripts/collect-news.js`)
- ✅ Script de mise à jour (`scripts/update-digest.js`)
- ✅ Cron job configuré (toutes les 6h)
- ✅ Workflow GitHub Actions

### 📦 Fichiers créés
```
ai-news-digest/
├── app/                   # Next.js App Router
├── components/            # Composants React
├── lib/                   # Types, utils, data
├── scripts/               # Scripts d'automatisation
├── data/                  # Données collectées
├── .github/workflows/     # CI/CD
├── README.md             # Documentation
└── ai-news-digest.md     # Digest markdown
```

---

## 🔧 Prochaines étapes

### 1. Créer le repo GitHub

Va sur https://github.com/new et crée un repo public nommé `ai-news-digest`.

Puis exécute :

```bash
cd /root/.openclaw/workspace/ai-news-digest
git remote add origin https://github.com/TON_USERNAME/ai-news-digest.git
git branch -M main
git push -u origin main
```

### 2. Déployer sur Vercel

Va sur https://vercel.com/new et importe ton repo GitHub.

Configuration :
- **Framework**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 3. Configurer les secrets GitHub (pour auto-deployment)

Dans ton repo GitHub → Settings → Secrets and variables → Actions, ajoute :

| Secret | Description | Comment l'obtenir |
|--------|-------------|-------------------|
| `VERCEL_TOKEN` | Token Vercel | https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | ID Organisation | Dans les project settings Vercel |
| `VERCEL_PROJECT_ID` | ID Projet | Dans les project settings Vercel |

---

## 🎨 Aperçu du design

### Palette de couleurs (Dark Mode)
- **Background**: `#0a0a0f` (deep space)
- **Cards**: `#1e1e2e` avec glassmorphism
- **Primary**: `#6366f1` (indigo)
- **Accent**: `#8b5cf6` (violet IA)
- **Secondary**: `#06b6d4` (cyan tech)

### Features
- 🔮 **Glassmorphism** sur les cards
- ✨ **Animations** Framer Motion
- 🌙 **Dark/Light** mode toggle
- 📱 **Mobile-first** responsive
- 🔍 **Recherche** full-text
- 🏷️ **Filtres** par catégorie/tag

---

## 📡 Sources de news configurées

1. TechCrunch AI
2. The Verge AI
3. MIT Technology Review
4. OpenAI Blog
5. Google AI Blog
6. Anthropic
7. ArXiv AI
8. VentureBeat AI

---

## 🔄 Workflow de mise à jour

Le site se met à jour automatiquement :

1. **Toutes les 6h** via le cron job local
2. **GitHub Actions** pour le déploiement auto
3. **Manuellement** avec `npm run update`

```bash
# Collecter les news
npm run collect

# Update + push GitHub
npm run update

# Dev local
npm run dev
```

---

## 🌐 URLs une fois déployé

- **Site**: `https://ai-news-digest.vercel.app`
- **Repo**: `https://github.com/TON_USERNAME/ai-news-digest`
- **API Data**: `https://ai-news-digest.vercel.app/data/digest.json`

---

## 📝 À personnaliser

1. **Logo** : Remplacer l'icône Brain dans `components/header.tsx`
2. **Couleurs** : Modifier les variables CSS dans `app/globals.css`
3. **Sources** : Ajouter des flux RSS dans `scripts/collect-news.js`
4. **SEO** : Mettre à jour les meta tags dans `app/layout.tsx`

---

## 🆘 Support

Si tu as des problèmes :
1. Vérifie que les dépendances sont installées : `npm install`
2. Teste en local : `npm run dev`
3. Vérifie les logs de collecte : `npm run collect`

---

*Projet créé le 16 Mars 2026 par OPENCLAW-DEV∞*
