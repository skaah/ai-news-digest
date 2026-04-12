'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  Calendar,
  Search,
  Grid3X3
} from 'lucide-react';
import { NewsArticle, Category, CATEGORY_COLORS, CATEGORIES } from '@/lib/types';
import { formatTimeAgo, cn } from '@/lib/utils';

interface CategoryClientProps {
  category: Category;
  articles: NewsArticle[];
  totalArticles: number;
}

export default function CategoryClient({ category, articles, totalArticles }: CategoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtrer les articles par recherche
  const filteredArticles = articles.filter(article => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Autres catégories pour navigation rapide
  const otherCategories = CATEGORIES.filter(c => c !== category);

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Accueil
          </Link>
          
          <span className="text-muted-foreground">/</span>
          
          <Link 
            href="/categories" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Grid3X3 className="w-4 h-4" />
            Catégories
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className={cn(
              'inline-block px-3 py-1 rounded-full text-sm font-medium border mb-4',
              CATEGORY_COLORS[category]
            )}>
              {category}
            </span>
            
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-2">
              {category}
            </h1>
            
            <p className="text-muted-foreground">
              {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} dans cette catégorie
              {totalArticles > 0 && ` sur ${totalArticles} au total`}
            </p>
          </div>
          
          {/* Recherche */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Rechercher dans ${category}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </motion.div>

      {/* Autres catégories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground py-2">Autres catégories:</span>
          {otherCategories.map(otherCat => (
            <Link
              key={otherCat}
              href={`/categories/${otherCat.toLowerCase()}`}
              className="px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-primary/20 transition-colors text-sm"
            >
              {otherCat}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Liste des articles */}
      <div className="space-y-6">
        {filteredArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 glass rounded-2xl"
          >
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucun article trouvé</h3>
            <p className="text-muted-foreground">
              {searchQuery 
                ? "Aucun article ne correspond à votre recherche" 
                : "Aucun article dans cette catégorie pour le moment"}
            </p>
            
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground"
              >
                Effacer la recherche
              </button>
            )}
          </motion.div>
        ) : (
          filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => window.open(article.originalUrl, '_blank', 'noopener,noreferrer')}
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="w-full md:w-56 h-48 md:h-auto relative overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20 hidden md:block" />
                </div>
                
                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={article.source.favicon}
                        alt=""
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm text-muted-foreground">
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
                  
                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
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
                          className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </div>
  );
}
