import { promises as fs } from 'fs';
import { join } from 'path';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import CategoryClient from './category-client';
import { DigestData, CATEGORIES, Category } from '@/lib/types';

interface CategoryPageProps {
  params: { category: string };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = CATEGORIES.find(
    c => c.toLowerCase() === params.category.toLowerCase()
  );
  
  if (!category) {
    return { title: 'Catégorie non trouvée' };
  }
  
  return {
    title: `${category} | AI News Digest`,
    description: `Actualités IA dans la catégorie ${category}`,
  };
}

async function getDigestData(): Promise<DigestData> {
  try {
    const dataPath = join(process.cwd(), 'data', 'digest.json');
    const fileContents = await fs.readFile(dataPath, 'utf8');
    const data = JSON.parse(fileContents);
    return {
      date: data.date || new Date().toISOString(),
      articles: data.articles || [],
      totalArticles: data.totalArticles || data.articles?.length || 0,
      lastUpdated: data.lastUpdated || new Date().toISOString(),
      edition: data.edition || 1,
    };
  } catch (error) {
    return {
      date: new Date().toISOString(),
      articles: [],
      totalArticles: 0,
      lastUpdated: new Date().toISOString(),
      edition: 1,
    };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find(
    c => c.toLowerCase() === params.category.toLowerCase()
  ) as Category;
  
  if (!category) {
    notFound();
  }
  
  const digestData = await getDigestData();
  
  // Filtrer les articles de cette catégorie
  const categoryArticles = digestData.articles.filter(
    article => article.category === category
  );
  
  return (
    <main className="min-h-screen gradient-mesh">
      <Header edition={digestData.edition} />
      <CategoryClient 
        category={category} 
        articles={categoryArticles}
        totalArticles={digestData.totalArticles}
      />
      <Footer />
    </main>
  );
}
