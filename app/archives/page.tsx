import { promises as fs } from 'fs';
import { join } from 'path';
import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import ArchiveClient from './archive-client';
import { DigestData } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Archives | AI News Digest',
  description: 'Recherchez dans l\'historique des actualités IA',
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
    };
  } catch (error) {
    return {
      date: new Date().toISOString(),
      articles: [],
      totalArticles: 0,
      lastUpdated: new Date().toISOString(),
    };
  }
}

export default async function ArchivesPage() {
  const digestData = await getDigestData();
  
  return (
    <main className="min-h-screen gradient-mesh">
      <Header />
      <ArchiveClient initialData={digestData} />
      <Footer />
    </main>
  );
}
