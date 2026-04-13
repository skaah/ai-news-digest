import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'The AI Gazette | Intelligence Artificielle',
  description: 'Votre journal quotidien des avancées en Intelligence Artificielle. News, recherche, produits et analyses sourcées.',
  keywords: ['AI', 'Intelligence Artificielle', 'Machine Learning', 'Deep Learning', 'News', 'Tech'],
  authors: [{ name: 'The AI Gazette' }],
  openGraph: {
    title: 'The AI Gazette',
    description: 'Votre journal quotidien des avancées en Intelligence Artificielle',
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
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
