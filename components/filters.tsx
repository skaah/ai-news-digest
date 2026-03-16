'use client';

import { motion } from 'framer-motion';
import { 
  Filter, 
  Calendar, 
  Newspaper, 
  Tag,
  TrendingUp,
  X
} from 'lucide-react';
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

export function Filters({
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagToggle,
  sortBy,
  onSortChange,
}: FiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-24 space-y-6"
    >
      {/* Categories */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="font-semibold">Catégories</h3>
        </div>

        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange('All')}
            className={cn(
              'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
              selectedCategory === 'All'
                ? 'bg-primary/20 text-primary'
                : 'hover:bg-muted/50 text-muted-foreground'
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
                'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                selectedCategory === category
                  ? 'bg-primary/20 text-primary'
                  : 'hover:bg-muted/50 text-muted-foreground'
              )}
            >
              <span>{category}</span>
              <span className={cn(
                'w-2 h-2 rounded-full',
                category === 'Research' && 'bg-purple-500',
                category === 'Product' && 'bg-cyan-500',
                category === 'Policy' && 'bg-amber-500',
                category === 'Funding' && 'bg-emerald-500',
                category === 'Ethics' && 'bg-rose-500',
                category === 'Industry' && 'bg-blue-500',
                category === 'Education' && 'bg-pink-500',
              )} />
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-4 h-4 text-secondary" />
          <h3 className="font-semibold">Tags</h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={cn(
                'px-3 py-1 rounded-full text-xs transition-all',
                selectedTags.includes(tag)
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
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
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-accent" />
          <h3 className="font-semibold">Trier par</h3>
        </div>

        <div className="space-y-1">
          <button
            onClick={() => onSortChange('date')}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
              sortBy === 'date'
                ? 'bg-primary/20 text-primary'
                : 'hover:bg-muted/50 text-muted-foreground'
            )}
          >
            <Calendar className="w-4 h-4" />
            Date de publication
          </button>

          <button
            onClick={() => onSortChange('popularity')}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
              sortBy === 'popularity'
                ? 'bg-primary/20 text-primary'
                : 'hover:bg-muted/50 text-muted-foreground'
            )}
          >
            <TrendingUp className="w-4 h-4" />
            Popularité
          </button>
        </div>
      </div>
    </motion.div>
  );
}
