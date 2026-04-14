'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Clock, Calendar, Search, Grid3X3 } from 'lucide-react';
import { NewsArticle, Category, CATEGORY_COLORS, CATEGORIES, getCategoryImage } from '@/lib/types';
import { formatTimeAgo, cn } from '@/lib/utils';
import { SafeImage } from '@/components/safe-image';

interface CategoryClientProps {
  category: Category;
  articles: NewsArticle[];
  totalArticles: number;
}

export default function CategoryClient({ category, articles, totalArticles }: CategoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredArticles = articles.filter(article => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const otherCategories = CATEGORIES.filter(c => c !== category);

  return (
    <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="paper-rule-double pb-6 mb-8">
        <div className="flex items-center gap-4 mb-4 text-sm">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Accueil
          </Link>
          
          <span className="text-muted-foreground">/</span>
          
          <Link 
            href="/categories" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
          >
            <Grid3X3 className="w-4 h-4" />
            Catégories
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className={cn(
              'inline-block px-2 py-1 text-xs font-bold uppercase tracking-wider mb-4',
              CATEGORY_COLORS[category]
            )}>
              {category}
            </span>
            
            <h1 className="font-display text-4xl sm:text-5xl font-black mb-2">
              {category}
            </h1>
            
            <p className="text-muted-foreground">
              {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} dans cette catégorie
              {totalArticles > 0 && ` sur ${totalArticles} au total`}
            </p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Rechercher dans ${category}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted border border-border focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-muted-foreground py-1">Autres catégories:</span>
        {otherCategories.map(otherCat => (
          <Link
            key={otherCat}
            href={`/categories/${otherCat.toLowerCase()}`}
            className="px-3 py-1 text-xs uppercase tracking-wider border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            {otherCat}
          </Link>
        ))}
      </div>

      <div className="space-y-6">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 paper-border bg-card">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-display text-xl font-bold mb-2">Aucun article trouvé</h3>
            <p className="text-muted-foreground">
              {searchQuery 
                ? "Aucun article ne correspond à votre recherche" 
                : "Aucun article dans cette catégorie pour le moment"}
            </p>
            
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Effacer la recherche
              </button>
            )}
          </div>
        ) : (
          filteredArticles.map((article, index) => (
            <article
              key={article.id}
              className="paper-border bg-card overflow-hidden hover-lift cursor-pointer group"
              onClick={() => window.open(article.originalUrl, '_blank', 'noopener,noreferrer')}
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-56 h-48 md:h-auto relative overflow-hidden border-b md:border-b-0 md:border-r border-border">
                  <SafeImage
                    src={article.imageUrl || getCategoryImage(article.category)}
                    fallback={getCategoryImage(article.category)}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={article.source.favicon || '/favicon.ico'}
                        alt=""
                        className="w-4 h-4 rounded-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/favicon.ico';
                        }}
                      />
                      <span className="text-sm text-muted-foreground uppercase tracking-wider">
                        {article.source.name}
                      </span>
                    </div>
                    
                    <span className="text-muted-foreground/50">•</span>
                    
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatTimeAgo(article.publishedAt)}
                    </span>
                    
                    <span className="text-muted-foreground/50">•</span>
                    
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} min
                    </span>
                  </div>
                  
                  <h2 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 4).map(tag => (
                        <span 
                          key={tag}
                          className="px-2 py-0.5 border border-border text-[10px] uppercase tracking-wider text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
