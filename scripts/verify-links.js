#!/usr/bin/env node
/**
 * Vérificateur de liens - Supprime les articles avec URLs mortes
 * Exécution: node scripts/verify-links.js
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const http = require('http');
const { execSync } = require('child_process');

const CONFIG = {
  digestPath: path.join(__dirname, '..', 'data', 'digest.json'),
  publicPath: path.join(__dirname, '..', 'public', 'data', 'digest.json'),
  timeout: 10000,
  userAgent: 'AI-News-Digest/1.0 (Link Checker)'
};

// Vérifier une URL
async function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const options = {
      method: 'HEAD',
      timeout: CONFIG.timeout,
      headers: {
        'User-Agent': CONFIG.userAgent
      }
    };
    
    const req = client.request(url, options, (res) => {
      // Accepter les redirections (301, 302) comme valides
      const valid = res.statusCode >= 200 && res.statusCode < 400;
      resolve({ 
        url, 
        status: res.statusCode, 
        valid: valid 
      });
    });
    
    req.on('error', (err) => {
      resolve({ url, status: 'ERROR', valid: false, error: err.message });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ url, status: 'TIMEOUT', valid: false });
    });
    
    req.end();
  });
}

// Charger le digest
async function loadDigest() {
  try {
    const data = await fs.readFile(CONFIG.digestPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return { date: new Date().toISOString(), articles: [], totalArticles: 0, lastUpdated: new Date().toISOString() };
  }
}

// Sauvegarder le digest
async function saveDigest(digest) {
  digest.totalArticles = digest.articles.length;
  digest.lastUpdated = new Date().toISOString();
  
  await fs.mkdir(path.dirname(CONFIG.digestPath), { recursive: true });
  await fs.writeFile(CONFIG.digestPath, JSON.stringify(digest, null, 2));
  
  await fs.mkdir(path.dirname(CONFIG.publicPath), { recursive: true });
  await fs.writeFile(CONFIG.publicPath, JSON.stringify(digest, null, 2));
}

// Vérifier tous les liens
async function verifyLinks() {
  console.log('🔍 Vérification des liens des articles...\n');
  
  const digest = await loadDigest();
  const articles = digest.articles || [];
  
  if (articles.length === 0) {
    console.log('⚠️ Aucun article à vérifier');
    return { removed: 0, checked: 0 };
  }
  
  const validArticles = [];
  const brokenArticles = [];
  
  for (const article of articles) {
    if (!article.originalUrl) {
      console.log(`⚠️ Pas d'URL pour: ${article.title}`);
      continue;
    }
    
    const result = await checkUrl(article.originalUrl);
    
    if (result.valid) {
      validArticles.push(article);
      console.log(`✅ [${result.status}] ${article.title.substring(0, 60)}...`);
    } else {
      brokenArticles.push({ ...article, error: result.status });
      console.log(`❌ [${result.status}] ${article.title.substring(0, 60)}...`);
    }
    
    // Petit délai pour ne pas spammer
    await new Promise(r => setTimeout(r, 300));
  }
  
  console.log(`\n📊 Résumé:`);
  console.log(`   ✅ Articles valides: ${validArticles.length}`);
  console.log(`   ❌ Articles supprimés: ${brokenArticles.length}`);
  
  if (brokenArticles.length > 0) {
    console.log(`\n🗑️  Articles supprimés:`);
    brokenArticles.forEach(a => console.log(`   - ${a.title} [${a.error}]`));
    
    // Mettre à jour le digest
    digest.articles = validArticles;
    await saveDigest(digest);
    console.log('\n💾 Digest mis à jour');
    
    // Commit et push si on est dans un repo git
    try {
      const hasChanges = execSync('git status --porcelain', { cwd: path.dirname(CONFIG.digestPath) }).toString().trim();
      if (hasChanges) {
        console.log('\n📤 Push des changements...');
        execSync('git add data/digest.json public/data/digest.json', { cwd: path.dirname(CONFIG.digestPath) });
        execSync('git commit -m "🧹 Auto: suppression articles avec liens morts"', { cwd: path.dirname(CONFIG.digestPath) });
        execSync('git push', { cwd: path.dirname(CONFIG.digestPath) });
        console.log('✅ Push effectué');
      }
    } catch (e) {
      console.log('⚠️ Impossible de push automatiquement:', e.message);
    }
  } else {
    console.log('\n✅ Tous les liens sont valides, aucune action nécessaire');
  }
  
  return { removed: brokenArticles.length, checked: articles.length };
}

// Exécution
verifyLinks().then(result => {
  console.log(`\n✨ Terminé: ${result.checked} vérifiés, ${result.removed} supprimés`);
  process.exit(0);
}).catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
