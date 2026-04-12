'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { DigestData, NewsArticle, CATEGORY_COLORS } from '@/lib/types';
import { formatTimeAgo, cn } from '@/lib/utils';

interface ArchiveClientProps {
  initialData: DigestData;
}

export default function ArchiveClient({ initialData }: ArchiveClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<string | 'all'>('all');

  const allArticles = initialData.articles || [];
  
  // Extraire toutes les catégories uniques
  const categories = useMemo(() => {
    const cats = new Set(allArticles.map(a => a.category));
    return Array.from(cats).sort();
  }, [allArticles]);

  // Filtrer les articles
  const filteredArticles = useMemo(() => {
    return allArticles.filter(article => {
      // Filtre recherche
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesSummary = article.summary.toLowerCase().includes(query);
        const matchesTags = article.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSummary && !matchesTags) return false;
      }
      
      // Filtre catégorie
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }
      
      // Filtre date
      if (dateFilter !== 'all') {
        const articleDate = new Date(article.publishedAt);
        const now = new Date();
        const daysDiff = (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (dateFilter === 'week' && daysDiff > 7) return false;
        if (dateFilter === 'month' && daysDiff > 30) return false;
        if (dateFilter === 'quarter' && daysDiff > 90) return false;
      }
      
      return true;
    }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [allArticles, searchQuery, selectedCategory, dateFilter]);

  // Grouper par mois pour l'affichage
  const groupedArticles = useMemo(() => {
    const groups: Record<string, NewsArticle[]> = {};
    filteredArticles.forEach(article => {
      const date = new Date(article.publishedAt);
      const key = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
      if (!groups[key]) groups[key] = [];
      groups[key].push(article);
    });
    return groups;
  }, [filteredArticles]);

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          Archives
        </h1>
        <p className="text-muted-foreground text-lg">
          {allArticles.length} articles dans l'historique • Recherchez par mot-clé, catégorie ou date
        </p>
      </motion.div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 mb-8"
      >
        <div className="grid md:grid-cols-3 gap-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher dans les archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Filtre catégorie */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Filtre date */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">Toutes les dates</option>
            <option value="week">7 derniers jours</option>
            <option value="month">30 derniers jours</option>
            <option value="quarter">3 derniers mois</option>
          </select>
        </div>

        {/* Tags rapides */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-sm text-muted-foreground">Tags populaires:</span>
          {['OpenAI', 'Google', 'Anthropic', 'LLM', 'Robotics', 'Policy'].map(tag => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="text-sm px-3 py-1 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Résultats */}
      <div className="space-y-8">
        {filteredArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucun article trouvé</h3>
            <p className="text-muted-foreground">
              Essayez avec d'autres termes de recherche ou filtres
            </p>
          </motion.div>
        ) : (
          Object.entries(groupedArticles).map(([month, articles], groupIndex) => (
            <motion.div
              key={month}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                {month}
              </h2>
              
              <div className="space-y-4">
                {articles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => window.open(article.originalUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Image */}
                      <div className="w-full md:w-48 h-28 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={cn(
                            'px-2 py-0.5 rounded-full text-xs font-medium border',
                            CATEGORY_COLORS[article.category]
                          )}>
                            {article.category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime} min
                          </span>
                        </div>
                        
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {article.summary}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={article.source.favicon}
                              alt=""
                              className="w-4 h-4 rounded"
                            />
                            <span className="text-xs text-muted-foreground">
                              {article.source.name}
                            </span>
                            <span className="text-muted-foreground/50">•</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(article.publishedAt)}
                            </span>
                          </div>
                          
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
