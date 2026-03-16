# 🤖 AI News Digest

> Votre digest quotidien des avancées en Intelligence Artificielle

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Fonctionnalités

- 📰 **Agrégation automatique** - Collecte les news IA depuis 8+ sources fiables
- 🎨 **Design moderne** - Glassmorphism, animations fluides, dark mode
- 🔍 **Recherche & Filtres** - Par catégorie, tag, source, date
- 📱 **Responsive** - Mobile-first, PWA-ready
- 🔄 **Mise à jour auto** - Toutes les 6h via GitHub Actions
- 📊 **SEO optimisé** - Meta tags, sitemap, structured data

## 🎨 Design System

- **Background:** `#0a0a0f` (deep space)
- **Primary:** `#6366f1` (indigo)
- **Accent:** `#8b5cf6` (violet IA)
- **Secondary:** `#06b6d4` (cyan tech)
- **Typography:** Inter, Space Grotesk

## 🚀 Démarrage rapide

```bash
# Cloner le repo
git clone https://github.com/openclaw/ai-news-digest.git
cd ai-news-digest

# Installer les dépendances
npm install

# Lancer en mode dev
npm run dev

# Build pour production
npm run build
```

## 📁 Structure

```
ai-news-digest/
├── app/                    # Next.js App Router
│   ├── globals.css        # Styles globaux + design system
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── header.tsx
│   ├── hero.tsx
│   ├── news-card.tsx
│   ├── filters.tsx
│   ├── footer.tsx
│   └── theme-provider.tsx
├── lib/                   # Utils & types
│   ├── types.ts
│   ├── utils.ts
│   └── data.ts
├── scripts/               # Scripts d'automatisation
│   ├── collect-news.js    # Collecte RSS
│   └── update-digest.js   # Update + push GitHub
├── data/                  # Données collectées
│   └── digest.json
├── public/                # Assets statiques
└── ai-news-digest.md      # Digest en markdown
```

## 📡 Sources de données

- TechCrunch AI
- The Verge
- MIT Technology Review
- OpenAI Blog
- Google AI Blog
- Anthropic
- ArXiv AI
- VentureBeat

## 🔄 Automatisation

Le site se met à jour automatiquement toutes les 6h via GitHub Actions :

```yaml
# .github/workflows/update.yml
name: Update News Digest
on:
  schedule:
    - cron: '0 */6 * * *'  # Toutes les 6h
  workflow_dispatch:
```

Pour lancer manuellement :

```bash
npm run update
```

## 📝 Architecture des données

```typescript
interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: {
    name: string;
    url: string;
    favicon: string;
  };
  category: 'Research' | 'Product' | 'Policy' | 'Funding' | 'Ethics' | 'Industry';
  tags: string[];
  publishedAt: string;
  imageUrl: string;
  readTime: number;
  originalUrl: string;
}
```

## 🛠️ Technologies

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + CSS Variables
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Font:** Inter, Space Grotesk (Google Fonts)

## 🌐 Déploiement

Le site est déployé sur **Vercel** :

```bash
# Déployer
vercel --prod
```

URL de production : `https://ai-news-digest.vercel.app`

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Ouvrir une Pull Request

## 📄 Licence

MIT © 2026 AI News Digest

---

<p align="center">
  Curated with 🤖 and ☕
</p>
