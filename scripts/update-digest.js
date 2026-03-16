#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 AI News Digest Updater\n');

async function updateDigest() {
  try {
    // 1. Collect news
    console.log('📰 Step 1: Collecting news...');
    const { collectNews } = require('./collect-news');
    await collectNews();
    
    // 2. Update markdown digest
    console.log('\n📝 Step 2: Updating ai-news-digest.md...');
    const digestPath = path.join(__dirname, '..', 'ai-news-digest.md');
    const dataPath = path.join(__dirname, '..', 'data', 'digest.json');
    
    const digestData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const markdown = generateMarkdown(digestData);
    fs.writeFileSync(digestPath, markdown);
    console.log('✅ Markdown updated');
    
    // 3. Git operations
    console.log('\n📤 Step 3: Pushing to GitHub...');
    
    const timestamp = new Date().toISOString();
    const commitMessage = `📰 Auto-update: ${digestData.totalArticles} articles - ${new Date().toLocaleDateString('fr-FR')}`;
    
    try {
      execSync('git add -A', { cwd: path.join(__dirname, '..') });
      execSync(`git commit -m "${commitMessage}"`, { cwd: path.join(__dirname, '..') });
      execSync('git push origin main', { cwd: path.join(__dirname, '..') });
      console.log('✅ Changes pushed to GitHub');
    } catch (gitError) {
      console.log('ℹ️  No changes to commit or push failed');
    }
    
    console.log('\n🎉 Update complete!');
    console.log(`   📅 ${new Date().toLocaleString('fr-FR')}`);
    console.log(`   📊 ${digestData.totalArticles} articles`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

function generateMarkdown(data) {
  const date = new Date(data.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  let md = `# 🤖 AI News Digest\n\n`;
  md += `> **Digest du ${date}**\n\n`;
  md += `Votre quotidien des avancées en Intelligence Artificielle.\n\n`;
  md += `---\n\n`;
  md += `## 📊 Statistiques\n\n`;
  md += `- **${data.totalArticles}** articles collectés\n`;
  md += `- Dernière mise à jour: ${new Date(data.lastUpdated).toLocaleString('fr-FR')}\n`;
  md += `- Sources: TechCrunch, The Verge, OpenAI, Anthropic, Google AI, ArXiv, MIT Tech Review\n\n`;
  md += `---\n\n`;
  md += `## 📰 Articles du jour\n\n`;
  
  // Group by category
  const byCategory = {};
  data.articles.forEach(article => {
    if (!byCategory[article.category]) byCategory[article.category] = [];
    byCategory[article.category].push(article);
  });
  
  for (const [category, articles] of Object.entries(byCategory)) {
    md += `### ${getCategoryEmoji(category)} ${category}\n\n`;
    
    articles.forEach(article => {
      md += `#### ${article.title}\n\n`;
      md += `> ${article.summary}\n\n`;
      md += `- **Source:** [${article.source.name}](${article.originalUrl})\n`;
      md += `- **Tags:** ${article.tags.map(t => `#${t}`).join(', ')}\n`;
      md += `- **Temps de lecture:** ${article.readTime} min\n`;
      md += `- **Publié:** ${new Date(article.publishedAt).toLocaleString('fr-FR')}\n\n`;
      md += `---\n\n`;
    });
  }
  
  md += `## 🔗 Liens utiles\n\n`;
  md += `- [🌐 Site web](https://ai-news-digest.vercel.app)\n`;
  md += `- [📱 GitHub](https://github.com/openclaw/ai-news-digest)\n`;
  md += `- [📡 RSS Feed](https://ai-news-digest.vercel.app/feed.xml)\n\n`;
  md += `---\n\n`;
  md += `*Curated with 🤖 and ☕ by AI News Digest*\n`;
  
  return md;
}

function getCategoryEmoji(category) {
  const emojis = {
    'Research': '🔬',
    'Product': '🚀',
    'Policy': '📜',
    'Funding': '💰',
    'Ethics': '⚖️',
    'Industry': '🏭',
    'Education': '🎓',
  };
  return emojis[category] || '📄';
}

updateDigest();
