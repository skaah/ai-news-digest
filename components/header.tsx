'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Newspaper } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/types';

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Archives', href: '/archives' },
  { label: 'Catégories', href: '/categories' },
];

function formatDate() {
  return new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface HeaderProps {
  edition?: number;
}

export function Header({ edition }: HeaderProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="bg-background">
      {/* Top bar */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
            <span>{formatDate()}</span>
            <span className="hidden sm:inline">Édition quotidienne — N°{edition ?? 1}</span>
            <div className="flex items-center gap-4">
              <span className="text-primary font-semibold">Météo IA: En veille</span>
            </div>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className={cn(
        'border-b-4 border-border transition-all duration-300',
        isScrolled ? 'sticky top-0 z-50 bg-background/95 backdrop-blur-sm' : ''
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="group">
              <div className="flex items-center gap-3 mb-2">
                <Newspaper className="w-8 h-8 text-primary" />
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
                  The AI Gazette
                </h1>
              </div>
              <p className="font-display text-sm sm:text-base italic text-muted-foreground tracking-wide">
                « Votre journal quotidien de l'Intelligence Artificielle »
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-b-2 border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
              <div className="w-px h-6 bg-border mx-2" />
              
              {CATEGORIES.slice(0, 4).map((cat) => (
                <Link
                  key={cat}
                  href={`/categories/${cat.toLowerCase()}`}
                  className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-9 pr-4 py-1.5 bg-muted border border-border text-sm w-48 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <ThemeToggle />

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-muted transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-muted">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-background transition-colors border-b border-border/20"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <p className="px-4 text-xs uppercase tracking-wider text-muted-foreground mb-2">Catégories</p>
                <div className="grid grid-cols-2 gap-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat}
                      href={`/categories/${cat.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:bg-background transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
