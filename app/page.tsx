'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { NewsCard } from '@/components/news-card';
import { Filters } from '@/components/filters';
import { Footer } from '@/components/footer';
import { getDigestData, filterArticles } from '@/lib/data';
import { Category } from '@/lib/types';
import { Search } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'popularity'>('date');
  const [searchQuery, setSearchQuery] = useState('');

  const digestData = getDigestData();

  const filteredArticles = useMemo(() => {
    let articles = filterArticles(
      digestData.articles,
      selectedCategory,
      searchQuery || undefined,
      selectedTags.length > 0 ? selectedTags : undefined
    );

    if (sortBy === 'date') {
      articles = articles.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    return articles;
  }, [digestData.articles, selectedCategory, selectedTags, sortBy, searchQuery]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <main className="min-h-screen gradient-mesh">
      <Header />

      <Hero 
        articleCount={digestData.totalArticles}
        digestDate={digestData.date}
      />

      {/* News Section */}
      <section id="news" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl sm:text-4xl font-bold mb-2"
              >
                Dernières actualités
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground"
              >
                {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} 
                {selectedCategory !== 'All' && ` dans ${selectedCategory}`}
              </motion.p>
            </div>

            {/* Mobile Search */}
            <div className="lg:hidden relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="hidden lg:block">
              <Filters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {/* News Grid */}
            <div className="lg:col-span-3">
              {filteredArticles.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredArticles.map((article, index) => (
                    <NewsCard 
                      key={article.id} 
                      article={article} 
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Aucun article trouvé</h3>
                  <p className="text-muted-foreground">
                    Essayez de modifier vos filtres ou votre recherche
                  </p>
                </motion.div>
              )}

              {/* Mobile Filters Toggle */}
              <div className="lg:hidden mt-8">
                <Filters
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
