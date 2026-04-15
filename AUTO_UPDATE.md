# 🤖 AI News Digest - Auto-Update System

## Comment ça marche

Le site se met à jour **automatiquement toutes les 6 heures** via GitHub Actions.

### Processus

1. **Déclenchement** : Toutes les 6h (à :17 pour éviter les pics)
2. **Collecte** : Parse les flux RSS de sources EN/FR
3. **Dédoublonnage** : Vérifie URL et titre (80% similarité)
4. **Filtrage** : Garde uniquement les articles < 48h
5. **Mise à jour** : Met à jour `data/digest.json`
6. **Déploiement** : Build + deploy sur GitHub Pages

### Sources surveillées

**EN :**
- TechCrunch AI
- The Verge AI
- VentureBeat AI
- MIT Tech Review AI
- MIT News AI
- OpenAI News
- Hugging Face Blog
- Google AI Blog
- MarkTechPost
- ArXiv cs.AI

**FR :**
- Usine Digitale
- 01Net
- Le Monde Tech
- Numerama
- Maddyness

### Dédoublonnage

Un article est considéré comme doublon si :
- Même URL (insensible à la casse)
- Titre similaire à 80%+

### Conservation

- Maximum 50 articles
- Minimum 10 articles
- Priorité aux articles < 7 jours
- Fallback sur les plus récents si besoin

## Déclencher manuellement

Va sur :
👉 https://github.com/skaah/ai-news-digest/actions/workflows/update.yml

Clique sur **"Run workflow"** → **"Run workflow"**

## Vérifier le statut

- **Vert** 🟢 : Succès, site à jour
- **Jaune** 🟡 : En cours
- **Rouge** 🔴 : Erreur (voir les logs)

## Structure du digest.json

```json
{
  "date": "2026-04-14T10:00:00.000Z",
  "articles": [...],
  "totalArticles": 12,
  "lastUpdated": "2026-04-14T10:00:00.000Z"
}
```

## Catégories automatiques

- `Product` : Lancement, release
- `Research` : Paper, étude
- `Funding` : Investissement, levée
- `Policy` : Régulation, loi
- `Hardware` : Chip, GPU
- `Ethics` : Sécurité, éthique
- `Industry` : Défaut

## Tags automatiques

OpenAI, Anthropic, Google, Meta, Microsoft, Nvidia, LLM, Multimodal, Robotics, AI Safety, Startup, China...
