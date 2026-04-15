'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { NewsCard } from '@/components/news-card';
import { Filters } from '@/components/filters';
import { Footer } from '@/components/footer';
import { filterArticles } from '@/lib/data';
import { Category, DigestData } from '@/lib/types';
import { Search } from 'lucide-react';

interface HomeClientProps {
  initialData: DigestData;
}

export default function HomeClient({ initialData }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'popularity'>('date');
  const [searchQuery, setSearchQuery] = useState('');

  const digestData = initialData;

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

  const featuredArticle = filteredArticles[0];
  const secondaryArticles = filteredArticles.slice(1, 4);
  const remainingArticles = filteredArticles.slice(4);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <Header edition={digestData.edition} />

      <Hero 
        articleCount={digestData.totalArticles}
        digestDate={digestData.date}
        edition={digestData.edition}
      />

      {/* News Section */}
      <section id="news" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="paper-rule-double pb-4 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-black mb-1">
                  À la une
                </h2>
                <p className="text-muted-foreground text-sm">
                  {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} 
                  {selectedCategory !== 'All' && ` dans ${selectedCategory}`}
                </p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-muted border border-border text-sm w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main content */}
            <div className="lg:col-span-9">
              {filteredArticles.length > 0 ? (
                <div className="space-y-8">
                  {/* Featured article */}
                  {featuredArticle && (
                    <div className="mb-8">
                      <NewsCard 
                        article={featuredArticle} 
                        index={0}
                        variant="featured"
                      />
                    </div>
                  )}

                  {/* Secondary articles */}
                  {secondaryArticles.length > 0 && (
                    <div className="paper-rule-double pt-8">
                      <h3 className="font-display text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-8 h-0.5 bg-primary"></span>
                        En continu
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-6">
                        {secondaryArticles.map((article, index) => (
                          <NewsCard 
                            key={article.id} 
                            article={article} 
                            index={index + 1}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Remaining articles - list view */}
                  {remainingArticles.length > 0 && (
                    <div className="paper-rule-double pt-8">
                      <h3 className="font-display text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-8 h-0.5 bg-muted-foreground"></span>
                        Autres articles
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-x-6">
                        {remainingArticles.map((article, index) => (
                          <NewsCard 
                            key={article.id} 
                            article={article} 
                            index={index + 4}
                            variant="compact"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center paper-border bg-card">
                  <div className="w-16 h-16 flex items-center justify-center mb-4 paper-border">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">Aucun article trouvé</h3>
                  <p className="text-muted-foreground">
                    Essayez de modifier vos filtres ou votre recherche
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3">
              <Filters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />

              {/* Mobile filters */}
              <div className="mt-8 lg:hidden">
                <div className="paper-border bg-card p-4">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4">Filtres</h4>
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
