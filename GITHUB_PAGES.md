# 🚀 GitHub Pages Deployment Guide

## Option 1: Script Automatique (Recommandé)

```bash
cd /root/.openclaw/workspace/ai-news-digest
./push-to-github.sh
```

Le script va :
1. Demander ton username/email GitHub
2. Configurer le remote
3. Push tous les fichiers
4. Te donner les instructions pour activer GitHub Pages

---

## Option 2: Commandes Manuelles

### Étape 1: Créer le repo sur GitHub

Va sur https://github.com/new
- **Repository name**: `ai-news-digest`
- **Visibility**: Public
- ✅ Initialize with README (optionnel)
- Clique sur **Create repository**

### Étape 2: Push le code

```bash
cd /root/.openclaw/workspace/ai-news-digest

# Configurer Git (si pas déjà fait)
git config user.name "Ton Nom"
git config user.email "ton@email.com"

# Ajouter le remote
git remote add origin https://github.com/TON_USERNAME/ai-news-digest.git

# Push
git branch -M main
git push -u origin main
```

### Étape 3: Activer GitHub Pages

1. Va sur `https://github.com/TON_USERNAME/ai-news-digest/settings/pages`
2. Sous **Build and deployment** → **Source**, sélectionne **GitHub Actions**
3. Le workflow `.github/workflows/pages.yml` va s'exécuter automatiquement

### Étape 4: Voir le résultat

Attends 2-3 minutes, puis va sur :
```
https://TON_USERNAME.github.io/ai-news-digest/
```

---

## 🔄 Mise à jour automatique

Le workflow GitHub Actions est configuré pour :
- **Se déclencher** à chaque push sur `main`
- **Collecter** les news toutes les 6h (cron)
- **Déployer** automatiquement sur GitHub Pages

---

## 🐛 Si ça ne marche pas

### Erreur d'authentification
```bash
# Si tu as un token GitHub
git remote set-url origin https://TOKEN@github.com/USERNAME/ai-news-digest.git
```

### Erreur "branch main already exists"
```bash
git push -f origin main
```

### Vérifier le statut
```bash
git status
git log --oneline -3
git remote -v
```

---

## 📦 Structure du zip

Le fichier `ai-news-digest.zip` contient :
- ✅ Tout le code source Next.js
- ✅ Scripts de collecte automatique
- ✅ Workflows GitHub Actions
- ✅ Documentation complète

---

*Projet prêt au déploiement !*
