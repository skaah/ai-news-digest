import { promises as fs } from 'fs';
import { join } from 'path';
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CATEGORIES, Category } from '@/lib/types';
import { CategoriesContent } from './categories-client';

export const metadata: Metadata = {
  title: 'Catégories | The AI Gazette',
  description: 'Explorez les actualités IA par catégorie',
};

async function getCategoryCounts(): Promise<Record<Category, number>> {
  try {
    const dataPath = join(process.cwd(), 'data', 'digest.json');
    const fileContents = await fs.readFile(dataPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    const counts: Record<Category, number> = {} as Record<Category, number>;
    CATEGORIES.forEach(cat => counts[cat] = 0);
    
    data.articles?.forEach((article: any) => {
      if (article.category && CATEGORIES.includes(article.category as Category)) {
        counts[article.category as Category]++;
      }
    });
    
    return counts;
  } catch {
    return {} as Record<Category, number>;
  }
}

export default async function CategoriesPage() {
  const counts = await getCategoryCounts();
  
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <CategoriesContent counts={counts} />
      </div>
      
      <Footer />
    </main>
  );
}
