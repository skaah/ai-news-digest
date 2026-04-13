'use client';

import Link from 'next/link';
import { Newspaper, Mail, ArrowUp } from 'lucide-react';

const footerLinks = {
  sections: [
    { label: 'Accueil', href: '/' },
    { label: 'Archives', href: '/archives' },
    { label: 'Catégories', href: '/categories' },
  ],
  legal: [
    { label: 'À Propos', href: '/' },
    { label: 'Mentions légales', href: '/legal' },
    { label: 'Confidentialité', href: '/privacy' },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t-4 border-border bg-background mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter band */}
        <div className="py-8 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold mb-1">Abonnez-vous à notre édition</h3>
              <p className="text-sm text-muted-foreground">
                Recevez le meilleur de l'IA directement dans votre boîte mail.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="pl-10 pr-4 py-2 bg-muted border border-border text-sm w-64 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Newspaper className="w-6 h-6 text-primary" />
                <span className="font-display text-2xl font-black">The AI Gazette</span>
              </Link>
              
              <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                Votre journal quotidien des avancées en Intelligence Artificielle. 
                Sourcé, vérifié, accessible.
              </p>
              
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} The AI Gazette. Tous droits réservés.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4 border-b border-border pb-2">Sections</h4>
              <ul className="space-y-2">
                {footerLinks.sections.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-4 border-b border-border pb-2">Légal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Rédigé avec soin. Curated avec 🤖 et ☕.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:text-primary transition-colors"
            aria-label="Retour en haut"
          >
            Retour en haut
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
