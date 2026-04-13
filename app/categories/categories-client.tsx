'use client';

import Link from 'next/link';
import { ArrowLeft, Newspaper, FlaskConical, Box, Scale, Coins, ShieldAlert, Building2, GraduationCap } from 'lucide-react';
import { CATEGORIES, CATEGORY_COLORS, Category } from '@/lib/types';

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
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  
  return (
    <>
      <div className="paper-rule-double pb-6 mb-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 text-sm uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        
        <h1 className="font-display text-4xl sm:text-5xl font-black mb-2">
          Catégories
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Explorez les actualités par thématique. Chaque catégorie regroupe les articles 
          traitant des mêmes sujets pour faciliter votre veille.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((category) => {
          const Icon = categoryIcons[category];
          const count = counts[category] || 0;
          
          return (
            <Link key={category} href={`/categories/${category.toLowerCase()}`}>
              <div className="paper-border bg-card p-6 hover-lift cursor-pointer group h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 flex items-center justify-center paper-border ${CATEGORY_COLORS[category].split(' ')[0]} text-white`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  {count > 0 && (
                    <span className="font-display text-2xl font-bold">
                      {count}
                    </span>
                  )}
                </div>
                
                <h2 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {category}
                </h2>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {categoryDescriptions[category]}
                </p>
                
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
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
          );
        })}
      </div>

      <div className="mt-12 paper-border bg-card p-6">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="text-center">
            <div className="font-display text-3xl font-bold">{total}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Total articles</div>
          </div>
          
          <div className="w-px h-12 bg-border hidden sm:block" />
          
          <div className="text-center">
            <div className="font-display text-3xl font-bold">{CATEGORIES.length}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Catégories</div>
          </div>
          
          <div className="w-px h-12 bg-border hidden sm:block" />
          
          <div className="text-center">
            <div className="font-display text-3xl font-bold">
              {Math.max(...Object.values(counts)) > 0 
                ? Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] 
                : '-'}
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Catégorie active</div>
          </div>
        </div>
      </div>
    </>
  );
}
