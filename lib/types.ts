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
  | 'Education';

export const CATEGORIES: Category[] = [
  'Research',
  'Product', 
  'Policy',
  'Funding',
  'Ethics',
  'Industry',
  'Education',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Research: 'bg-[#2c3e50] text-white border-[#2c3e50]',
  Product: 'bg-[#8b4513] text-white border-[#8b4513]',
  Policy: 'bg-[#1a1a1a] text-white border-[#1a1a1a]',
  Funding: 'bg-[#c41e3a] text-white border-[#c41e3a]',
  Ethics: 'bg-[#5c4033] text-white border-[#5c4033]',
  Industry: 'bg-[#4a5568] text-white border-[#4a5568]',
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
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
  ],
  Product: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    'https://images.unsplash.com/photo-1550009158-9ebf690be655?w=800',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
  ],
  Policy: [
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
    'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800',
    'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800',
  ],
  Funding: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
  ],
  Ethics: [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
  ],
  Industry: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
  ],
  Education: [
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
  ],
};

// Fonction utilitaire pour obtenir une image selon la catégorie
export function getCategoryImage(category: Category, index: number = 0): string {
  const images = CATEGORY_IMAGES[category];
  return images[index % images.length];
}

export interface DigestData {
  date: string;
  articles: NewsArticle[];
  totalArticles: number;
  lastUpdated: string;
}
