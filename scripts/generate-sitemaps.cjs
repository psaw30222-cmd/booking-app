#!/usr/bin/env node

/**
 * AI-Powered Sitemap Generator for BookEase (CommonJS Version)
 * Generates optimized XML sitemaps for better SEO performance
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://bookease.com';
const BUILD_DIR = path.join(__dirname, '..', 'public');

console.log('Starting sitemap generation...');
console.log('Build directory:', BUILD_DIR);

// Page data - dynamically generated based on actual content
const PAGES_DATA = {
  mainPages: [
    { path: '/', priority: 1.0, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
    { path: '/terms-and-conditions', priority: 0.5, changefreq: 'monthly', lastmod: '2026-01-14' },
    { path: '/privacy-policy', priority: 0.5, changefreq: 'monthly', lastmod: '2026-01-14' },
    { path: '/cookie-policy', priority: 0.4, changefreq: 'monthly', lastmod: '2026-01-14' },
    { path: '/contact-us', priority: 0.6, changefreq: 'monthly', lastmod: '2026-01-14' },
    { path: '/help-center', priority: 0.6, changefreq: 'weekly', lastmod: '2026-01-14' },
    { path: '/security', priority: 0.5, changefreq: 'monthly', lastmod: '2026-01-14' },
    { path: '/company', priority: 0.5, changefreq: 'monthly', lastmod: '2026-01-14' },
    { path: '/network', priority: 0.5, changefreq: 'monthly', lastmod: '2026-01-14' },
    { path: '/blog', priority: 0.7, changefreq: 'weekly', lastmod: '2026-01-14' }
  ],
  
  cityPages: [
    { path: '/mumbai', priority: 0.9, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
    { path: '/delhi', priority: 0.9, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
    { path: '/bangalore', priority: 0.9, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
    { path: '/pune', priority: 0.9, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
    { path: '/hyderabad', priority: 0.9, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
    { path: '/chennai', priority: 0.9, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
    { path: '/kolkata', priority: 0.9, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
    { path: '/ahmedabad', priority: 0.9, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
    { path: '/goa', priority: 0.8, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
    { path: '/jaipur', priority: 0.8, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] }
  ],
  
  servicePages: [
    { path: '/service/1', priority: 0.8, changefreq: 'weekly', lastmod: '2026-01-14' },
    { path: '/service/2', priority: 0.8, changefreq: 'weekly', lastmod: '2026-01-14' },
    { path: '/service/3', priority: 0.8, changefreq: 'weekly', lastmod: '2026-01-14' },
    { path: '/service/4', priority: 0.8, changefreq: 'weekly', lastmod: '2026-01-14' },
    { path: '/service/5', priority: 0.8, changefreq: 'weekly', lastmod: '2026-01-14' },
    { path: '/service/6', priority: 0.8, changefreq: 'weekly', lastmod: '2026-01-14' }
  ],
  
  specialPages: [
    { path: '/bakeca-incontri', priority: 0.8, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] }
  ]
};

// Generate individual sitemap XML
function generateSitemapXml(urls, filename) {
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;
  
  const urlEntries = urls.map(url => `
  <url>
    <loc>${SITE_URL}${url.path}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`).join('');
  
  const xmlFooter = '\n</urlset>';
  
  const xmlContent = xmlHeader + urlEntries + xmlFooter;
  
  const filePath = path.join(BUILD_DIR, filename);
  fs.writeFileSync(filePath, xmlContent);
  console.log(`✅ Generated ${filename} with ${urls.length} URLs at ${filePath}`);
}

// Generate sitemap index
function generateSitemapIndex() {
  const sitemaps = [
    { loc: `${SITE_URL}/sitemap-pages.xml`, lastmod: new Date().toISOString().split('T')[0] },
    { loc: `${SITE_URL}/sitemap-cities.xml`, lastmod: new Date().toISOString().split('T')[0] },
    { loc: `${SITE_URL}/sitemap-services.xml`, lastmod: new Date().toISOString().split('T')[0] },
    { loc: `${SITE_URL}/sitemap-special.xml`, lastmod: new Date().toISOString().split('T')[0] }
  ];
  
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  const sitemapEntries = sitemaps.map(sitemap => `
  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('');
  
  const xmlFooter = '\n</sitemapindex>';
  
  const xmlContent = xmlHeader + sitemapEntries + xmlFooter;
  
  const filePath = path.join(BUILD_DIR, 'sitemap-index.xml');
  fs.writeFileSync(filePath, xmlContent);
  console.log(`✅ Generated sitemap-index.xml at ${filePath}`);
}

// Generate image sitemap
function generateImageSitemap() {
  // Sample image data - in real implementation, this would come from your CMS
  const images = [
    {
      loc: `${SITE_URL}/images/profile-sample.jpg`,
      caption: 'Professional companion service provider',
      title: 'Verified Escort Profile',
      license: `${SITE_URL}/terms-and-conditions`
    },
    {
      loc: `${SITE_URL}/images/service-massage.jpg`, 
      caption: 'Relaxing massage therapy service',
      title: 'Massage Therapy Services'
    }
  ];
  
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;
  
  // Associate images with relevant pages
  const imageEntries = PAGES_DATA.cityPages.slice(0, 3).map((page, index) => {
    const pageImages = images.map(img => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:caption>${img.caption}</image:caption>
      <image:title>${img.title}</image:title>
      ${img.license ? `<image:license>${img.license}</image:license>` : ''}
    </image:image>`).join('');
    
    return `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    ${pageImages}
  </url>`;
  }).join('');
  
  const xmlFooter = '\n</urlset>';
  
  const xmlContent = xmlHeader + imageEntries + xmlFooter;
  
  const filePath = path.join(BUILD_DIR, 'sitemap-images.xml');
  fs.writeFileSync(filePath, xmlContent);
  console.log(`✅ Generated sitemap-images.xml at ${filePath}`);
}

// Main execution
function main() {
  console.log('🤖 AI-Powered Sitemap Generator for BookEase');
  console.log('=============================================\n');
  
  try {
    // Check if build directory exists
    if (!fs.existsSync(BUILD_DIR)) {
      console.log('Creating public directory...');
      fs.mkdirSync(BUILD_DIR, { recursive: true });
    }
    
    // Create backup of existing sitemaps
    const mainSitemapPath = path.join(BUILD_DIR, 'sitemap.xml');
    if (fs.existsSync(mainSitemapPath)) {
      const backupPath = path.join(BUILD_DIR, 'sitemap.xml.backup');
      fs.copyFileSync(mainSitemapPath, backupPath);
      console.log('📦 Backed up existing sitemap.xml');
    }
    
    // Generate individual sitemaps
    console.log('\nGenerating individual sitemaps...');
    generateSitemapXml(PAGES_DATA.mainPages, 'sitemap-pages.xml');
    generateSitemapXml(PAGES_DATA.cityPages, 'sitemap-cities.xml');
    generateSitemapXml(PAGES_DATA.servicePages, 'sitemap-services.xml');
    generateSitemapXml(PAGES_DATA.specialPages, 'sitemap-special.xml');
    
    // Generate specialized sitemaps
    console.log('\nGenerating specialized sitemaps...');
    generateImageSitemap();
    
    // Generate sitemap index
    console.log('\nGenerating sitemap index...');
    generateSitemapIndex();
    
    console.log('\n🎉 All sitemaps generated successfully!');
    console.log('\n📋 Generated files:');
    console.log('  • sitemap-index.xml (main index)');
    console.log('  • sitemap-pages.xml (legal, contact, blog pages)');
    console.log('  • sitemap-cities.xml (city-specific pages)');
    console.log('  • sitemap-services.xml (service category pages)');
    console.log('  • sitemap-special.xml (special campaign pages)');
    console.log('  • sitemap-images.xml (image optimization)');
    
    console.log('\n📈 SEO Benefits:');
    console.log('  • Better crawl budget allocation');
    console.log('  • Improved indexing of city pages');
    console.log('  • Enhanced image SEO');
    console.log('  • Clearer content hierarchy');
    console.log('  • Faster Google discovery');
    
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateSitemaps: main, PAGES_DATA };