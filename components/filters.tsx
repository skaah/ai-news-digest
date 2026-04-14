'use client';

import { Filter, Calendar, Tag, TrendingUp, X } from 'lucide-react';
import { Category, CATEGORIES, TAGS, CATEGORY_COLORS } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FiltersProps {
  selectedCategory: Category | 'All';
  onCategoryChange: (category: Category | 'All') => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  sortBy: 'date' | 'popularity';
  onSortChange: (sort: 'date' | 'popularity') => void;
}

const categoryDotColors: Record<Category, string> = {
  Research: 'bg-[#2c3e50]',
  Product: 'bg-[#8b4513]',
  Policy: 'bg-[#1a1a1a]',
  Funding: 'bg-[#c41e3a]',
  Ethics: 'bg-[#5c4033]',
  Industry: 'bg-[#4a5568]',
  Hardware: 'bg-[#d97706]',
  Education: 'bg-[#2f855a]',
};

export function Filters({
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagToggle,
  sortBy,
  onSortChange,
}: FiltersProps) {
  return (
    <div className="sticky top-32 space-y-6">
      {/* Categories */}
      <div className="paper-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="font-display text-sm font-bold uppercase tracking-wider">Catégories</h3>
        </div>

        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange('All')}
            className={cn(
              'w-full flex items-center justify-between px-3 py-2 text-sm transition-colors border border-transparent',
              selectedCategory === 'All'
                ? 'bg-primary text-primary-foreground font-semibold'
                : 'hover:bg-muted text-muted-foreground'
            )}
          >
            <span>Toutes</span>
            <span className="text-xs opacity-60">All</span>
          </button>

          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 text-sm transition-colors border border-transparent',
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'hover:bg-muted text-muted-foreground'
              )}
            >
              <span>{category}</span>
              <span className={cn('w-2 h-2 rounded-full', categoryDotColors[category])} />
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="paper-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
          <Tag className="w-4 h-4 text-primary" />
          <h3 className="font-display text-sm font-bold uppercase tracking-wider">Tags</h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={cn(
                'px-2 py-1 text-[10px] uppercase tracking-wider border transition-all',
                selectedTags.includes(tag)
                  ? 'bg-primary text-primary-foreground border-primary font-semibold'
                  : 'bg-background text-muted-foreground border-border hover:border-foreground'
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {selectedTags.length > 0 && (
          <button
            onClick={() => selectedTags.forEach(onTagToggle)}
            className="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3 h-3" />
            Réinitialiser les tags
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="paper-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="font-display text-sm font-bold uppercase tracking-wider">Trier par</h3>
        </div>

        <div className="space-y-1">
          <button
            onClick={() => onSortChange('date')}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors border border-transparent',
              sortBy === 'date'
                ? 'bg-primary text-primary-foreground font-semibold'
                : 'hover:bg-muted text-muted-foreground'
            )}
          >
            <Calendar className="w-4 h-4" />
            Date de publication
          </button>

          <button
            onClick={() => onSortChange('popularity')}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors border border-transparent',
              sortBy === 'popularity'
                ? 'bg-primary text-primary-foreground font-semibold'
                : 'hover:bg-muted text-muted-foreground'
            )}
          >
            <TrendingUp className="w-4 h-4" />
            Popularité
          </button>
        </div>
      </div>
    </div>
  );
}
