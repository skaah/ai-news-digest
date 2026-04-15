import { promises as fs } from 'fs';
import { join } from 'path';
import { Metadata } from 'next';
import { DigestData } from '@/lib/types';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: 'The AI Gazette | Intelligence Artificielle',
  description: 'Votre journal quotidien des avancées en Intelligence Artificielle. News, recherche, produits et analyses sourcées.',
};

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
    console.error('Error loading digest data:', error);
    return {
      date: new Date().toISOString(),
      articles: [],
      totalArticles: 0,
      lastUpdated: new Date().toISOString(),
      edition: 1,
    };
  }
}

export default async function Home() {
  const digestData = await getDigestData();
  return <HomeClient initialData={digestData} />;
}
