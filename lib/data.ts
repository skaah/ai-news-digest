import { NewsArticle, Category, DigestData } from './types';

// Sample data for initial render - will be replaced by real data collection
export const sampleArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'OpenAI dévoile GPT-5 : Capacités multimodales révolutionnaires',
    summary: 'OpenAI annonce les premiers détails de GPT-5, promettant une compréhension multimodale sans précédent. Le modèle serait capable de traiter simultanément du texte, des images, de l\'audio et de la vidéo avec une cohérence remarquable.',
    source: { name: 'TechCrunch', url: 'https://techcrunch.com', favicon: 'https://techcrunch.com/favicon.ico' },
    category: 'Product',
    tags: ['OpenAI', 'LLM', 'Multimodal'],
    publishedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    readTime: 5,
    originalUrl: 'https://techcrunch.com/ai/gpt5-multimodal',
  },
  {
    id: '2',
    title: 'Anthropic lance Claude 4 avec un contexte de 500K tokens',
    summary: 'Anthropic repousse les limites avec Claude 4, offrant une fenêtre de contexte record de 500 000 tokens. Cette avancée permet d\'analyser des livres entiers ou des bases de code complètes en une seule session.',
    source: { name: 'The Verge', url: 'https://theverge.com', favicon: 'https://theverge.com/favicon.ico' },
    category: 'Research',
    tags: ['Anthropic', 'LLM', 'Context Window'],
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
    readTime: 4,
    originalUrl: 'https://theverge.com/ai/claude4-context',
  },
  {
    id: '3',
    title: 'L\'UE adopte le premier cadre réglementaire complet sur l\'IA',
    summary: 'Le Parlement européen vote l\'AI Act, premier réglement mondial complet sur l\'intelligence artificielle. Ce texte classe les systèmes d\'IA par niveau de risque et impose des obligations strictes aux développeurs.',
    source: { name: 'Wired', url: 'https://wired.com', favicon: 'https://wired.com/favicon.ico' },
    category: 'Policy',
    tags: ['Regulation', 'EU', 'AI Act'],
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800',
    readTime: 6,
    originalUrl: 'https://wired.com/ai/eu-ai-act',
  },
  {
    id: '4',
    title: 'DeepMind résout un problème de mathématiques ouvert depuis 30 ans',
    summary: 'Les chercheurs de DeepMind ont développé un système d\'IA capable de résoudre le problème du pliage des protéines dans une configuration 3D complexe, ouvrant la voie à de nouvelles découvertes médicales.',
    source: { name: 'ArXiv', url: 'https://arxiv.org', favicon: 'https://arxiv.org/favicon.ico' },
    category: 'Research',
    tags: ['DeepMind', 'Science', 'Proteins'],
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
    readTime: 8,
    originalUrl: 'https://arxiv.org/abs/protein-folding',
  },
  {
    id: '5',
    title: 'Stability AI lève 200M$ pour ses modèles open source',
    summary: 'La startup Stability AI annonce une levée de fonds de 200 millions de dollars. L\'entreprise poursuit sa mission de démocratiser l\'IA générative avec des modèles ouverts accessibles à tous.',
    source: { name: 'TechCrunch', url: 'https://techcrunch.com', favicon: 'https://techcrunch.com/favicon.ico' },
    category: 'Funding',
    tags: ['Stability AI', 'Startup', 'Open Source'],
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800',
    readTime: 3,
    originalUrl: 'https://techcrunch.com/ai/stability-funding',
  },
  {
    id: '6',
    title: 'Tesla présente Optimus Gen 3 : Le robot humanoïde évolue',
    summary: 'Elon Musk dévoile la troisième génération du robot Optimus, capable de marcher, courir et manipuler des objets avec une dextérité proche de celle humaine. La production en série est prévue pour 2027.',
    source: { name: 'The Verge', url: 'https://theverge.com', favicon: 'https://theverge.com/favicon.ico' },
    category: 'Industry',
    tags: ['Tesla', 'Robotics', 'Humanoid'],
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    readTime: 4,
    originalUrl: 'https://theverge.com/ai/optimus-gen3',
  },
  {
    id: '7',
    title: 'Des chercheurs alertent sur les risques d\'AGI non alignée',
    summary: 'Un collectif de 100 chercheurs en IA publie une lettre ouverte appelant à un moratoire sur le développement des systèmes d\'AGI tant que les problèmes d\'alignement ne sont pas résolus.',
    source: { name: 'Wired', url: 'https://wired.com', favicon: 'https://wired.com/favicon.ico' },
    category: 'Ethics',
    tags: ['AI Safety', 'AGI', 'Alignment'],
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800',
    readTime: 7,
    originalUrl: 'https://wired.com/ai/agi-alignment-risks',
  },
  {
    id: '8',
    title: 'Google intègre Gemini dans tous ses produits Workspace',
    summary: 'Google annonce l\'intégration complète de Gemini dans Gmail, Docs, Sheets et Meet. L\'assistant IA devient disponible pour tous les utilisateurs Workspace sans coût supplémentaire.',
    source: { name: 'TechCrunch', url: 'https://techcrunch.com', favicon: 'https://techcrunch.com/favicon.ico' },
    category: 'Product',
    tags: ['Google', 'Gemini', 'Workspace'],
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909cfe?w=800',
    readTime: 3,
    originalUrl: 'https://techcrunch.com/ai/gemini-workspace',
  },
];

export function getDigestData(): DigestData {
  const articles = sampleArticles;
  return {
    date: new Date().toISOString(),
    articles,
    totalArticles: articles.length,
    lastUpdated: new Date().toISOString(),
  };
}

export function filterArticles(
  articles: NewsArticle[],
  category?: Category | 'All',
  searchQuery?: string,
  tags?: string[]
): NewsArticle[] {
  return articles.filter((article) => {
    if (category && category !== 'All' && article.category !== category) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = article.title.toLowerCase().includes(query);
      const matchesSummary = article.summary.toLowerCase().includes(query);
      const matchesTags = article.tags.some(tag => tag.toLowerCase().includes(query));
      if (!matchesTitle && !matchesSummary && !matchesTags) {
        return false;
      }
    }
    if (tags && tags.length > 0) {
      const hasMatchingTag = tags.some(tag => article.tags.includes(tag));
      if (!hasMatchingTag) {
        return false;
      }
    }
    return true;
  });
}
