'use client';

import { motion } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Rss, 
  Heart,
  Coffee,
  Mail,
  ArrowUp
} from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'News du Jour', href: '#news' },
    { label: 'Archives', href: '#archives' },
    { label: 'Catégories', href: '#categories' },
    { label: 'Newsletter', href: '#newsletter' },
  ],
  resources: [
    { label: 'RSS Feed', href: '/feed.xml' },
    { label: 'API', href: '/api' },
    { label: 'Documentation', href: '/docs' },
  ],
  legal: [
    { label: 'À Propos', href: '#about' },
    { label: 'Mentions légales', href: '/legal' },
    { label: 'Confidentialité', href: '/privacy' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/ainewsdigest', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/ainewsdigest', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/openclaw/ai-news-digest', label: 'GitHub' },
  { icon: Rss, href: '/feed.xml', label: 'RSS' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="font-display font-bold text-xl">
                AI<span className="text-gradient">Digest</span>
              </span>
            </div>
            
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Votre digest quotidien des avancées en Intelligence Artificielle. 
              Curated with 🤖 and ☕
            </p>

            {/* Newsletter */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                S'abonner
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © 2026 AI News Digest. Curated with 
            <span className="inline-flex">🤖</span> 
            and 
            <Coffee className="w-4 h-4" />
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
