export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: {
    name: string;
    url: string;
    favicon?: string;
  };
  category: Category;
  tags: string[];
  publishedAt: string;
  imageUrl?: string;
  readTime: number;
  originalUrl: string;
}

export type Category =
  | 'Research'
  | 'Product'
  | 'Policy'
  | 'Funding'
  | 'Ethics'
  | 'Industry'
  | 'Hardware'
  | 'Education';

export const CATEGORIES: Category[] = [
  'Research',
  'Product',
  'Policy',
  'Funding',
  'Ethics',
  'Industry',
  'Hardware',
  'Education',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Research: 'bg-[#2c3e50] text-white border-[#2c3e50]',
  Product: 'bg-[#8b4513] text-white border-[#8b4513]',
  Policy: 'bg-[#1a1a1a] text-white border-[#1a1a1a]',
  Funding: 'bg-[#c41e3a] text-white border-[#c41e3a]',
  Ethics: 'bg-[#5c4033] text-white border-[#5c4033]',
  Industry: 'bg-[#4a5568] text-white border-[#4a5568]',
  Hardware: 'bg-[#d97706] text-white border-[#d97706]',
  Education: 'bg-[#2f855a] text-white border-[#2f855a]',
};

export const TAGS = [
  'LLM',
  'Computer Vision',
  'Robotics',
  'AI Safety',
  'Multimodal',
  'OpenAI',
  'Anthropic',
  'Google',
  'Meta',
  'Startup',
  'Hardware',
  'Healthcare',
  'Climate',
  'Finance',
];

export const CATEGORY_IMAGES: Record<Category, string[]> = {
  Research: [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
  ],
  Product: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
  ],
  Policy: [
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
    'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800',
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800',
  ],
  Funding: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
  ],
  Ethics: [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
    'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
  ],
  Industry: [
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800',
  ],
  Hardware: [
    'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800',
  ],
  Education: [
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
  ],
};

// Fonction utilitaire pour obtenir une image selon la catégorie
export function getCategoryImage(category: Category, index: number = 0): string {
  const images = CATEGORY_IMAGES[category] || CATEGORY_IMAGES['Industry'];
  return images[index % images.length];
}

export interface DigestData {
  date: string;
  articles: NewsArticle[];
  totalArticles: number;
  lastUpdated: string;
}
