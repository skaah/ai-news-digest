import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'AI News Digest | L\'IA en temps réel',
  description: 'Votre digest quotidien des avancées en Intelligence Artificielle. News, recherche, produits et analyses sourcées.',
  keywords: ['AI', 'Intelligence Artificielle', 'Machine Learning', 'Deep Learning', 'News', 'Tech'],
  authors: [{ name: 'AI News Digest' }],
  openGraph: {
    title: 'AI News Digest',
    description: 'Votre digest quotidien des avancées en Intelligence Artificielle',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider defaultTheme="dark" storageKey="ai-news-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
