'use client';

import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Clock, 
  Bookmark,
  Share2,
  Calendar
} from 'lucide-react';
import { NewsArticle, CATEGORY_COLORS, getCategoryImage } from '@/lib/types';
import { formatTimeAgo, cn } from '@/lib/utils';

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export function NewsCard({ article, index }: NewsCardProps) {
  // Utiliser l'image de l'article ou une image de catégorie variée
  const imageUrl = article.imageUrl && !article.imageUrl.includes('1677442136019-21780ecad995')
    ? article.imageUrl 
    : getCategoryImage(article.category, index);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative glass rounded-2xl overflow-hidden hover-lift cursor-pointer"
      onClick={() => window.open(article.originalUrl, '_blank', 'noopener,noreferrer')}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            'px-3 py-1 rounded-full text-xs font-medium border',
            CATEGORY_COLORS[article.category]
          )}>
            {article.category}
          </span>
        </div>

        {/* Source Favicon Overlay */}
        <div className="absolute bottom-3 right-3">
          <div className="w-10 h-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow-lg">
            <img 
              src={article.source.favicon || '/favicon.ico'} 
              alt=""
              className="w-6 h-6 rounded-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/favicon.ico';
              }}
            />
          </div>
        </div>

        {/* Actions - stop propagation to prevent card click */}
        <div 
          className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="p-2 rounded-lg bg-background/80 backdrop-blur hover:bg-background transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Bookmark logic here
            }}
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <button 
            className="p-2 rounded-lg bg-background/80 backdrop-blur hover:bg-background transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Share logic here
            }}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-display font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {article.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-0.5 rounded-md bg-muted/50 text-xs text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            {/* Source */}
            <div className="flex items-center gap-2">
              <img 
                src={article.source.favicon || '/favicon.ico'} 
                alt=""
                className="w-4 h-4 rounded-sm"
              />
              <span className="text-xs text-muted-foreground">{article.source.name}</span>
            </div>

            <span className="text-muted-foreground/50">•</span>

            {/* Date */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {formatTimeAgo(article.publishedAt)}
            </div>

            <span className="text-muted-foreground/50">•</span>

            {/* Read Time */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {article.readTime} min
            </div>
          </div>

          {/* Link indicator */}
          <div className="flex items-center gap-1 text-xs text-primary">
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
