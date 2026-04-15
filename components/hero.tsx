import { Calendar, Newspaper } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface HeroProps {
  articleCount: number;
  digestDate: string;
  edition: number;
}

export function Hero({ articleCount, digestDate, edition }: HeroProps) {
  return (
    <section className="border-b-2 border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main headline */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                Édition du jour
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                N°{edition}
              </span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-4">
              Intelligence Artificielle :
              <span className="block text-primary italic">
                Le quotidien de demain
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl drop-cap">
              Toutes les avancées majeures de l'IA, curated et sourcées pour vous. 
              Recherche, produits, régulations et analyses dans un format journalistique 
              accessible et rigoureux.
            </p>
          </div>
          
          {/* Side info */}
          <div className="lg:col-span-4 border-l-0 lg:border-l border-border lg:pl-8">
            <div className="space-y-6">
              <div className="paper-border p-4 bg-muted">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-xs uppercase tracking-widest font-semibold">Date de parution</span>
                </div>
                <p className="font-display text-xl">{formatDate(digestDate)}</p>
              </div>
              
              <div className="paper-border p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Newspaper className="w-4 h-4 text-primary" />
                  <span className="text-xs uppercase tracking-widest font-semibold">En ce numéro</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-border/20 pb-1">
                    <span className="text-sm text-muted-foreground">Articles</span>
                    <span className="font-display text-lg font-bold">{articleCount}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/20 pb-1">
                    <span className="text-sm text-muted-foreground">Sources</span>
                    <span className="font-display text-lg font-bold">20+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Langues</span>
                    <span className="font-display text-lg font-bold">FR · EN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
