'use client';

import Link from 'next/link';
import { ExternalLink, Clock, Calendar } from 'lucide-react';
import { NewsArticle, CATEGORY_COLORS, getCategoryImage } from '@/lib/types';
import { formatTimeAgo, cn } from '@/lib/utils';

interface NewsCardProps {
  article: NewsArticle;
  index: number;
  variant?: 'default' | 'featured' | 'compact';
}

export function NewsCard({ article, index, variant = 'default' }: NewsCardProps) {
  const imageUrl = article.imageUrl && !article.imageUrl.includes('1677442136019-21780ecad995')
    ? article.imageUrl 
    : getCategoryImage(article.category, index);

  if (variant === 'featured') {
    return (
      <article className="group paper-border bg-card hover-lift cursor-pointer"
        onClick={() => window.open(article.originalUrl, '_blank', 'noopener,noreferrer')}
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden border-b md:border-b-0 md:border-r border-border">
            <img
              src={imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={cn(
                  'px-2 py-1 text-xs font-bold uppercase tracking-wider',
                  CATEGORY_COLORS[article.category]
                )}>
                  {article.category}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {article.source.name}
                </span>
              </div>
              
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                {article.summary}
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatTimeAgo(article.publishedAt)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime} min
              </div>
              <div className="ml-auto flex items-center gap-1 text-primary font-semibold">
                <span>Lire</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group flex gap-4 py-4 border-b border-border/50 cursor-pointer hover:bg-muted/30 transition-colors px-2"
        onClick={() => window.open(article.originalUrl, '_blank', 'noopener,noreferrer')}
      >
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden paper-border">
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              'text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5',
              CATEGORY_COLORS[article.category]
            )}>
              {article.category}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{article.source.name}</span>
          </div>
          
          <h4 className="font-display text-base font-bold leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h4>
          
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span>{formatTimeAgo(article.publishedAt)}</span>
            <span>{article.readTime} min</span>
          </div>
        </div>
      </article>
    );
  }

  // Default
  return (
    <article className="group paper-border bg-card hover-lift cursor-pointer flex flex-col h-full"
      onClick={() => window.open(article.originalUrl, '_blank', 'noopener,noreferrer')}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute top-3 left-3">
          <span className={cn(
            'px-2 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm',
            CATEGORY_COLORS[article.category]
          )}>
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <img 
            src={article.source.favicon || '/favicon.ico'} 
            alt=""
            className="w-4 h-4 rounded-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/favicon.ico';
            }}
          />
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{article.source.name}</span>
        </div>

        <h3 className="font-display text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
          {article.summary}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatTimeAgo(article.publishedAt)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime} min
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-primary">
            <span>Lire</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </article>
  );
}
