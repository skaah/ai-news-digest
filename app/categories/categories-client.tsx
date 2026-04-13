'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FlaskConical, 
  Box, 
  Scale, 
  Coins, 
  ShieldAlert, 
  Building2, 
  GraduationCap,
  ArrowLeft,
  Newspaper
} from 'lucide-react';
import { CATEGORIES, CATEGORY_COLORS, Category } from '@/lib/types';
import { cn } from '@/lib/utils';

const categoryIcons: Record<Category, React.ElementType> = {
  Research: FlaskConical,
  Product: Box,
  Policy: Scale,
  Funding: Coins,
  Ethics: ShieldAlert,
  Industry: Building2,
  Education: GraduationCap,
};

const categoryDescriptions: Record<Category, string> = {
  Research: 'Avancées scientifiques, publications et découvertes',
  Product: 'Lancements de produits et nouvelles fonctionnalités',
  Policy: 'Régulations, lois et gouvernance de l\'IA',
  Funding: 'Investissements, levées de fonds et acquisitions',
  Ethics: 'Questions éthiques, sécurité et impacts sociétaux',
  Industry: 'Tendances du marché et actualités corporatives',
  Education: 'Formation, apprentissage et vulgarisation',
};

interface CategoriesContentProps {
  counts: Record<Category, number>;
}

export function CategoriesContent({ counts }: CategoriesContentProps) {
  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          Catégories
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Explorez les actualités par thématique. Chaque catégorie regroupe les articles 
          traitant des mêmes sujets pour faciliter votre veille.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((category, index) => {
          const Icon = categoryIcons[category];
          const count = counts[category] || 0;
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/categories/${category.toLowerCase()}`}>
                <div className={cn(
                  'glass rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer group',
                  'hover:scale-[1.02] border-2 border-transparent',
                  'hover:border-primary/20'
                )}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center',
                      CATEGORY_COLORS[category].split(' ')[0]
                    )}>
                      <Icon className="w-7 h-7" />
                    </div>
                    
                    {count > 0 && (
                      <span className="px-3 py-1 rounded-full bg-muted text-sm font-medium">
                        {count} article{count > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {category}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4">
                    {categoryDescriptions[category]}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Newspaper className="w-4 h-4" />
                    Voir les articles
                    <svg 
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 glass rounded-2xl p-6"
      >
        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {Object.values(counts).reduce((a, b) => a + b, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total articles</div>
          </div>
          
          <div className="w-px h-12 bg-border hidden sm:block" />
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{CATEGORIES.length}</div>
            <div className="text-sm text-muted-foreground">Catégories</div>
          </div>
          
          <div className="w-px h-12 bg-border hidden sm:block" />
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {Math.max(...Object.values(counts)) > 0 
                ? Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] 
                : '-'}
            </div>
            <div className="text-sm text-muted-foreground">Catégorie active</div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
