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
  Research: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Product: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  Policy: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Funding: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Ethics: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  Industry: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Education: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
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

export interface DigestData {
  date: string;
  articles: NewsArticle[];
  totalArticles: number;
  lastUpdated: string;
}
