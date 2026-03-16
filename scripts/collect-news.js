const Parser = require('rss-parser');
const fs = require('fs').promises;
const path = require('path');

const parser = new Parser();

// Sources RSS fiables pour l'actualité IA
const SOURCES = [
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    category: 'Industry',
  },
  {
    name: 'The Verge AI',
    url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml',
    category: 'Industry',
  },
  {
    name: 'MIT Technology Review',
    url: 'https://www.technologyreview.com/feed/',
    category: 'Research',
  },
  {
    name: 'OpenAI Blog',
    url: 'https://openai.com/blog/rss.xml',
    category: 'Product',
  },
  {
    name: 'Google AI Blog',
    url: 'https://ai.googleblog.com/feeds/posts/default',
    category: 'Research',
  },
  {
    name: 'Anthropic',
    url: 'https://www.anthropic.com/rss.xml',
    category: 'Product',
  },
  {
    name: 'ArXiv AI',
    url: 'http://export.arxiv.org/rss/cs.AI',
    category: 'Research',
  },
  {
    name: 'VentureBeat AI',
    url: 'https://venturebeat.com/category/ai/feed/',
    category: 'Funding',
  },
];

// Tags à détecter automatiquement
const TAG_PATTERNS = [
  { tag: 'OpenAI', patterns: [/openai/i, /gpt/i, /chatgpt/i] },
  { tag: 'Anthropic', patterns: [/anthropic/i, /claude/i] },
  { tag: 'Google', patterns: [/google/i, /gemini/i, /bard/i, /deepmind/i] },
  { tag: 'Meta', patterns: [/meta/i, /facebook/i, /llama/i] },
  { tag: 'LLM', patterns: [/llm/i, /large language model/i, /gpt/i, /claude/i, /gemini/i] },
  { tag: 'Computer Vision', patterns: [/vision/i, /image/i, /diffusion/i, /dall-e/i, /midjourney/i] },
  { tag: 'Robotics', patterns: [/robot/i, /robotics/i, /humanoid/i, /optimus/i] },
  { tag: 'AI Safety', patterns: [/safety/i, /alignment/i, /ethics/i, /risks/i] },
  { tag: 'Multimodal', patterns: [/multimodal/i, /multimodal/i] },
  { tag: 'Startup', patterns: [/startup/i, /funding/i, /raised/i, /million/i, /billion/i] },
  { tag: 'Hardware', patterns: [/gpu/i, /chip/i, /nvidia/i, /tpu/i, /processor/i] },
  { tag: 'Healthcare', patterns: [/health/i, /medical/i, /drug/i, /diagnosis/i] },
  { tag: 'Finance', patterns: [/finance/i, /trading/i, /crypto/i, /banking/i] },
];

function detectTags(title, summary) {
  const text = `${title} ${summary}`.toLowerCase();
  const detected = [];
  
  for (const { tag, patterns } of TAG_PATTERNS) {
    if (patterns.some(pattern => pattern.test(text))) {
      detected.push(tag);
    }
  }
  
  return detected.slice(0, 5); // Max 5 tags
}

function estimateReadTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

async function fetchRSS(source) {
  try {
    console.log(`📡 Fetching: ${source.name}`);
    const feed = await parser.parseURL(source.url);
    
    return feed.items.slice(0, 5).map(item => {
      const tags = detectTags(item.title || '', item.contentSnippet || item.summary || '');
      const summary = (item.contentSnippet || item.summary || '')
        .replace(/<[^>]*>/g, '')
        .substring(0, 200) + '...';
      
      return {
        id: generateId(),
        title: item.title || 'Sans titre',
        summary: summary,
        source: {
          name: source.name,
          url: new URL(item.link || '').origin,
          favicon: `https://www.google.com/s2/favicons?domain=${new URL(item.link || '').hostname}&sz=64`,
        },
        category: source.category,
        tags: tags,
        publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
        imageUrl: item.enclosure?.url || `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800`,
        readTime: estimateReadTime(summary),
        originalUrl: item.link || '#',
      };
    });
  } catch (error) {
    console.error(`❌ Error fetching ${source.name}:`, error.message);
    return [];
  }
}

async function collectNews() {
  console.log('🔍 Starting news collection...\n');
  
  const allArticles = [];
  
  for (const source of SOURCES) {
    const articles = await fetchRSS(source);
    allArticles.push(...articles);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
  }
  
  // Sort by date
  allArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  
  // Deduplicate by URL
  const seen = new Set();
  const unique = allArticles.filter(article => {
    if (seen.has(article.originalUrl)) return false;
    seen.add(article.originalUrl);
    return true;
  });
  
  const digestData = {
    date: new Date().toISOString(),
    articles: unique.slice(0, 20), // Keep top 20
    totalArticles: unique.length,
    lastUpdated: new Date().toISOString(),
  };
  
  // Save to data file
  const dataPath = path.join(__dirname, '..', 'data', 'digest.json');
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(digestData, null, 2));
  
  // Also save to public for static export
  const publicPath = path.join(__dirname, '..', 'public', 'data', 'digest.json');
  await fs.mkdir(path.dirname(publicPath), { recursive: true });
  await fs.writeFile(publicPath, JSON.stringify(digestData, null, 2));
  
  console.log(`\n✅ Collected ${unique.length} unique articles`);
  console.log(`💾 Saved to: ${dataPath}`);
  console.log(`📊 Categories: ${[...new Set(unique.map(a => a.category))].join(', ')}`);
  console.log(`🏷️  Top tags: ${[...new Set(unique.flatMap(a => a.tags))].slice(0, 10).join(', ')}`);
  
  return digestData;
}

if (require.main === module) {
  collectNews().catch(console.error);
}

module.exports = { collectNews };
