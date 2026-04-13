#!/usr/bin/env node
/**
 * AI News Collector
 * Recherche et collecte les dernières news IA en FR/EN
 * Évite les doublons par URL et titre
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');

const CONFIG = {
  maxArticles: 20,
  minArticles: 10,
  digestPath: path.join(__dirname, '..', 'data', 'digest.json'),
  publicPath: path.join(__dirname, '..', 'public', 'data', 'digest.json'),
  // Sources RSS fiables
  rssSources: [
    // EN sources
    { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', lang: 'en' },
    { name: 'The Verge AI', url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml', lang: 'en' },
    { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/', lang: 'en' },
    { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/', lang: 'en' },
    // FR sources
    { name: 'Usine Digitale', url: 'https://www.usine-digitale.fr/rss', lang: 'fr' },
    { name: '01Net', url: 'https://www.01net.com/rss/', lang: 'fr' },
    { name: 'Le Monde Tech', url: 'https://www.lemonde.fr/technologies/rss_full.xml', lang: 'fr' }
  ],
  // Sources à ignorer
  blockedSources: ['GitHub AI News'],
  blockedUrls: ['github.com/ikaijua', 'ia-info.fr']
};

// Images par catégorie pour variabiliser les previews
const CATEGORY_IMAGES = {
  Research: [
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
  ],
  Product: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    'https://images.unsplash.com/photo-1550009158-9ebf690be655?w=800',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
  ],
  Policy: [
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
    'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800',
    'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800',
  ],
  Funding: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
  ],
  Ethics: [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
  ],
  Industry: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
  ],
  Education: [
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
  ],
  Hardware: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    'https://images.unsplash.com/photo-1555664424-778a69022365?w=800',
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800',
  ],
};

// Fonction pour obtenir une image aléatoire selon la catégorie
function getCategoryImage(category) {
  const images = CATEGORY_IMAGES[category] || CATEGORY_IMAGES.Industry;
  return images[Math.floor(Math.random() * images.length)];
}
async function parseRSS(url) {
  return new Promise((resolve, reject) => {
    const data = [];
    https.get(url, (res) => {
      let xml = '';
      res.on('data', chunk => xml += chunk);
      res.on('end', () => {
        try {
          // Extraction basique des items RSS
          const items = xml.match(/\u003citem\u003e[\s\S]*?\u003c\/item\u003e/g) || [];
          const articles = items.slice(0, 5).map(item => {
            const title = item.match(/\u003ctitle\u003e\u003c!\[CDATA\[(.*?)\]\]\u003e\u003c\/title\u003e/)?.[1] ||
                         item.match(/\u003ctitle\u003e(.*?)\u003c\/title\u003e/)?.[1] || '';
            const link = item.match(/\u003clink\u003e(.*?)\u003c\/link\u003e/)?.[1] || '';
            const desc = item.match(/\u003cdescription\u003e\u003c!\[CDATA\[(.*?)\]\]\u003e\u003c\/description\u003e/)?.[1] ||
                        item.match(/\u003cdescription\u003e(.*?)\u003c\/description\u003e/)?.[1] || '';
            const pubDate = item.match(/\u003cpubDate\u003e(.*?)\u003c\/pubDate\u003e/)?.[1] || new Date().toISOString();
            
            return { title, link, description: desc.replace(/\u003c[^\u003e]*>/g, '').substring(0, 300), pubDate };
          });
          resolve(articles);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Détecter catégorie
function detectCategory(title, desc) {
  const text = (title + ' ' + desc).toLowerCase();
  if (text.includes('product') || text.includes('launch') || text.includes('lancement')) return 'Product';
  if (text.includes('research') || text.includes('paper') || text.includes('study') || text.includes('recherche')) return 'Research';
  if (text.includes('funding') || text.includes('investment') || text.includes('levée') || text.includes('million') || text.includes('billion')) return 'Funding';
  if (text.includes('policy') || text.includes('regulation') || text.includes('law') || text.includes('eu') || text.includes('régulation')) return 'Policy';
  if (text.includes('chip') || text.includes('gpu') || text.includes('hardware') || text.includes('puce')) return 'Hardware';
  if (text.includes('ethics') || text.includes('safety') || text.includes('risk') || text.includes('éthique')) return 'Ethics';
  return 'Industry';
}

// Extraire tags
function extractTags(title, desc) {
  const text = title + ' ' + desc;
  const tags = [];
  const patterns = [
    ['OpenAI', /openai|gpt|chatgpt|dall-e/i],
    ['Anthropic', /anthropic|claude/i],
    ['Google', /google|gemini|bard|deepmind/i],
    ['Meta', /meta|facebook|llama/i],
    ['Microsoft', /microsoft|copilot|azure/i],
    ['Nvidia', /nvidia|gpu/i],
    ['LLM', /llm|large language model/i],
    ['Multimodal', /multimodal|text-to-image/i],
    ['Robotics', /robot|humanoid|optimus/i],
    ['AI Safety', /safety|alignment|ethics|risk/i],
    ['Startup', /startup|unicorn/i],
    ['China', /china|chinese|deepseek|alibaba|baidu/i]
  ];
  
  for (const [tag, regex] of patterns) {
    if (regex.test(text)) tags.push(tag);
  }
  return tags.slice(0, 5);
}

// Générer ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Vérifier doublon
function isDuplicate(article, existing) {
  const url = article.link?.toLowerCase();
  const title = article.title?.toLowerCase().trim();
  
  return existing.some(a => {
    if (a.originalUrl?.toLowerCase() === url) return true;
    if (a.title?.toLowerCase().trim() === title) return true;
    // Similarité 80%
    const existingTitle = a.title?.toLowerCase().trim();
    if (!existingTitle || !title) return false;
    const words1 = title.split(/\s+/);
    const words2 = existingTitle.split(/\s+/);
    const common = words1.filter(w => words2.includes(w));
    return (common.length / Math.max(words1.length, words2.length)) > 0.8;
  });
}

// Charger digest
async function loadDigest() {
  try {
    const data = await fs.readFile(CONFIG.digestPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return { date: new Date().toISOString(), articles: [], totalArticles: 0, lastUpdated: new Date().toISOString() };
  }
}

// Sauvegarder digest
async function saveDigest(digest) {
  await fs.mkdir(path.dirname(CONFIG.digestPath), { recursive: true });
  await fs.writeFile(CONFIG.digestPath, JSON.stringify(digest, null, 2));
  
  await fs.mkdir(path.dirname(CONFIG.publicPath), { recursive: true });
  await fs.writeFile(CONFIG.publicPath, JSON.stringify(digest, null, 2));
}

// Vérifier si une source ou URL est bloquée
function isBlocked(sourceName, url) {
  // Vérifier le nom de la source
  if (CONFIG.blockedSources.some(blocked => sourceName?.includes(blocked))) {
    return true;
  }
  // Vérifier l'URL
  if (CONFIG.blockedUrls.some(blocked => url?.includes(blocked))) {
    return true;
  }
  return false;
}

// Collecter les news
async function collectNews() {
  console.log('🔍 Collecting AI News...\n');
  
  const digest = await loadDigest();
  const existing = digest.articles || [];
  console.log(`📊 Current: ${existing.length} articles`);
  
  const newArticles = [];
  
  // Parser les sources RSS
  for (const source of CONFIG.rssSources) {
    try {
      console.log(`📡 Fetching: ${source.name}`);
      const items = await parseRSS(source.url);
      
      for (const item of items) {
        if (!item.title || !item.link) continue;
        
        // Vérifier si source/URL bloquée
        if (isBlocked(source.name, item.link)) {
          console.log(`   🚫 Skip (blocked source): ${item.title.substring(0, 50)}...`);
          continue;
        }
        
        // Vérifier doublon
        if (isDuplicate(item, [...existing, ...newArticles])) {
          console.log(`   ⏭️  Skip (duplicate): ${item.title.substring(0, 50)}...`);
          continue;
        }
        
        // Vérifier si récent (< 48h)
        const pubDate = new Date(item.pubDate);
        const age = Date.now() - pubDate.getTime();
        if (age > 48 * 60 * 60 * 1000) {
          console.log(`   ⏭️  Skip (old): ${item.title.substring(0, 50)}...`);
          continue;
        }
        
        const article = {
          id: generateId(),
          title: item.title.trim(),
          summary: (item.description || '').substring(0, 280) + '...',
          source: {
            name: source.name,
            url: new URL(item.link).origin,
            favicon: `https://www.google.com/s2/favicons?domain=${new URL(item.link).hostname}&sz=64`
          },
          category: detectCategory(item.title, item.description),
          tags: extractTags(item.title, item.description),
          publishedAt: item.pubDate,
          imageUrl: getCategoryImage(detectCategory(item.title, item.description)),
          readTime: Math.max(1, Math.ceil((item.title + item.description).split(/\s+/).length / 200)),
          originalUrl: item.link
        };
        
        newArticles.push(article);
        console.log(`   ✅ Added: ${article.title.substring(0, 50)}...`);
      }
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}`);
    }
    
    // Petit délai entre les requêtes
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log(`\n📈 Found ${newArticles.length} new articles`);
  
  // Fusionner et trier
  const allArticles = [...newArticles, ...existing]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, CONFIG.maxArticles);
  
  // Garder uniquement articles récents (< 7 jours) si assez
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentArticles = allArticles.filter(a => new Date(a.publishedAt).getTime() > sevenDaysAgo);
  
  digest.articles = recentArticles.length >= CONFIG.minArticles ? recentArticles : allArticles.slice(0, CONFIG.minArticles);
  digest.totalArticles = digest.articles.length;
  digest.lastUpdated = new Date().toISOString();
  digest.date = new Date().toISOString();
  
  await saveDigest(digest);
  
  console.log(`\n✅ Digest updated:`);
  console.log(`   📰 ${digest.totalArticles} articles`);
  console.log(`   🆕 ${newArticles.length} new`);
  console.log(`   🕐 ${new Date().toLocaleString('fr-FR')}`);
}

collectNews().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
