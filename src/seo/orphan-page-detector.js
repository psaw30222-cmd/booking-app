// Orphan Page Detector and Internal Linking Strategy
// Identifies disconnected pages and creates optimal linking structure

export class OrphanPageDetector {
  constructor(pages = []) {
    this.pages = pages;
    this.pageGraph = new Map(); // Maps pages to their links
    this.orphanPages = [];
    this.internalLinkingOpportunities = [];
    this.analysisResults = null;
  }

  // Add pages to analyze
  addPages(pages) {
    this.pages = [...this.pages, ...pages];
  }

  // Build page link graph
  buildPageGraph() {
    console.log('🕸️ Building page link graph...');
    
    // Initialize graph with all pages
    this.pages.forEach(page => {
      this.pageGraph.set(page.url, {
        page: page,
        inboundLinks: [],
        outboundLinks: [],
        contentTopics: this.extractContentTopics(page),
        semanticClusters: this.identifySemanticClusters(page)
      });
    });
    
    // Map links between pages
    this.pages.forEach(page => {
      const outboundLinks = this.extractInternalLinks(page);
      const pageInfo = this.pageGraph.get(page.url);
      
      pageInfo.outboundLinks = outboundLinks;
      
      // Update inbound links for linked pages
      outboundLinks.forEach(linkUrl => {
        if (this.pageGraph.has(linkUrl)) {
          const linkedPage = this.pageGraph.get(linkUrl);
          linkedPage.inboundLinks.push(page.url);
        }
      });
    });
  }

  // Extract internal links from page content
  extractInternalLinks(page) {
    const links = new Set();
    const baseUrl = 'https://bookease.com';
    
    // Extract from navigation/menu content
    if (page.navigation) {
      const navLinks = this.extractLinksFromHtml(page.navigation, baseUrl);
      navLinks.forEach(link => links.add(link));
    }
    
    // Extract from content HTML
    if (page.content) {
      const contentLinks = this.extractLinksFromHtml(page.content, baseUrl);
      contentLinks.forEach(link => links.add(link));
    }
    
    // Extract from footer links
    if (page.footer) {
      const footerLinks = this.extractLinksFromHtml(page.footer, baseUrl);
      footerLinks.forEach(link => links.add(link));
    }
    
    // Remove self-links and external links
    return Array.from(links).filter(link => 
      link !== page.url && 
      link.startsWith('/') &&
      this.pageGraph.has(link)
    );
  }

  // Extract links from HTML content
  extractLinksFromHtml(html, baseUrl) {
    const links = [];
    const linkRegex = /href=["']([^"']+)["']/gi;
    let match;
    
    while ((match = linkRegex.exec(html)) !== null) {
      let url = match[1];
      
      // Convert relative URLs to absolute
      if (url.startsWith('/')) {
        url = url;
      } else if (url.startsWith(baseUrl)) {
        url = url.replace(baseUrl, '');
      } else {
        continue; // Skip external links
      }
      
      // Clean URL (remove hash and query params for comparison)
      url = url.split('#')[0].split('?')[0];
      
      if (url) {
        links.push(url);
      }
    }
    
    return [...new Set(links)];
  }

  // Extract content topics using keyword analysis
  extractContentTopics(page) {
    const topics = new Set();
    
    // Extract from title
    if (page.title) {
      const titleTopics = this.extractTopicsFromText(page.title);
      titleTopics.forEach(topic => topics.add(topic));
    }
    
    // Extract from headings
    if (page.headings) {
      page.headings.forEach(heading => {
        const headingTopics = this.extractTopicsFromText(heading.text);
        headingTopics.forEach(topic => topics.add(topic));
      });
    }
    
    // Extract from meta description
    if (page.description) {
      const descTopics = this.extractTopicsFromText(page.description);
      descTopics.forEach(topic => topics.add(topic));
    }
    
    return Array.from(topics);
  }

  // Extract topics from text content
  extractTopicsFromText(text) {
    const topics = [];
    const topicKeywords = [
      'escort', 'escorts', 'companion', 'companions', 'service', 'services',
      'mumbai', 'delhi', 'bangalore', 'chennai', 'hyderabad', 'pune',
      'verified', 'booking', 'availability', 'profile', 'profiles',
      'massage', 'hotel', 'call', 'outcall', 'incall'
    ];
    
    const words = text.toLowerCase().split(/\s+/);
    
    topicKeywords.forEach(keyword => {
      if (words.some(word => word.includes(keyword))) {
        topics.push(keyword);
      }
    });
    
    return topics;
  }

  // Identify semantic clusters for pages
  identifySemanticClusters(page) {
    const clusters = [];
    
    // Location-based clustering
    const locations = ['mumbai', 'delhi', 'bangalore', 'chennai', 'hyderabad', 'pune'];
    const pageLocations = locations.filter(loc => 
      page.url.includes(loc) || 
      page.title.toLowerCase().includes(loc) ||
      page.description.toLowerCase().includes(loc)
    );
    
    if (pageLocations.length > 0) {
      clusters.push({
        type: 'location',
        values: pageLocations
      });
    }
    
    // Service-type clustering
    const serviceTypes = ['escort', 'companion', 'massage', 'dating'];
    const pageServices = serviceTypes.filter(service =>
      page.title.toLowerCase().includes(service) ||
      page.description.toLowerCase().includes(service) ||
      page.url.includes(service)
    );
    
    if (pageServices.length > 0) {
      clusters.push({
        type: 'service',
        values: pageServices
      });
    }
    
    return clusters;
  }

  // Identify orphan pages (pages with no inbound links)
  identifyOrphanPages() {
    console.log('🔍 Identifying orphan pages...');
    
    this.orphanPages = [];
    
    this.pageGraph.forEach((pageInfo, url) => {
      if (pageInfo.inboundLinks.length === 0 && url !== '/') {
        this.orphanPages.push({
          url: url,
          page: pageInfo.page,
          outboundLinks: pageInfo.outboundLinks.length,
          contentTopics: pageInfo.contentTopics,
          semanticClusters: pageInfo.semanticClusters,
          linkingOpportunities: this.findLinkingOpportunities(url)
        });
      }
    });
    
    return this.orphanPages;
  }

  // Find linking opportunities for orphan pages
  findLinkingOpportunities(orphanUrl) {
    const opportunities = [];
    const orphanInfo = this.pageGraph.get(orphanUrl);
    
    if (!orphanInfo) return opportunities;
    
    // Find pages with similar topics
    this.pageGraph.forEach((pageInfo, url) => {
      if (url === orphanUrl) return; // Skip self
      
      // Calculate similarity score
      const similarity = this.calculateSimilarity(orphanInfo, pageInfo);
      
      if (similarity > 0.3) { // Threshold for relevance
        opportunities.push({
          targetUrl: url,
          similarityScore: similarity,
          sharedTopics: this.getSharedTopics(orphanInfo.contentTopics, pageInfo.contentTopics),
          reason: this.generateLinkingReason(similarity, orphanInfo, pageInfo)
        });
      }
    });
    
    return opportunities.sort((a, b) => b.similarityScore - a.similarityScore);
  }

  // Calculate similarity between two pages
  calculateSimilarity(page1Info, page2Info) {
    let score = 0;
    
    // Topic similarity (40% weight)
    const sharedTopics = this.getSharedTopics(page1Info.contentTopics, page2Info.contentTopics);
    const topicSimilarity = sharedTopics.length / Math.max(page1Info.contentTopics.length, 1);
    score += topicSimilarity * 0.4;
    
    // Cluster similarity (30% weight)
    const clusterSimilarity = this.calculateClusterSimilarity(
      page1Info.semanticClusters, 
      page2Info.semanticClusters
    );
    score += clusterSimilarity * 0.3;
    
    // URL proximity (20% weight)
    const urlSimilarity = this.calculateUrlSimilarity(
      page1Info.page.url, 
      page2Info.page.url
    );
    score += urlSimilarity * 0.2;
    
    // Authority consideration (10% weight)
    const authorityScore = page2Info.inboundLinks.length > 5 ? 0.1 : 0;
    score += authorityScore * 0.1;
    
    return Math.min(1, score);
  }

  // Get shared topics between two pages
  getSharedTopics(topics1, topics2) {
    return topics1.filter(topic => topics2.includes(topic));
  }

  // Calculate cluster similarity
  calculateClusterSimilarity(clusters1, clusters2) {
    if (clusters1.length === 0 || clusters2.length === 0) return 0;
    
    let matches = 0;
    let total = 0;
    
    clusters1.forEach(cluster1 => {
      const matchingCluster = clusters2.find(c => c.type === cluster1.type);
      if (matchingCluster) {
        const sharedValues = cluster1.values.filter(v => matchingCluster.values.includes(v));
        matches += sharedValues.length;
        total += Math.max(cluster1.values.length, matchingCluster.values.length);
      } else {
        total += cluster1.values.length;
      }
    });
    
    return total > 0 ? matches / total : 0;
  }

  // Calculate URL similarity (structural proximity)
  calculateUrlSimilarity(url1, url2) {
    const parts1 = url1.split('/').filter(p => p);
    const parts2 = url2.split('/').filter(p => p);
    
    let commonParts = 0;
    const minLength = Math.min(parts1.length, parts2.length);
    
    for (let i = 0; i < minLength; i++) {
      if (parts1[i] === parts2[i]) {
        commonParts++;
      } else {
        break;
      }
    }
    
    return minLength > 0 ? commonParts / minLength : 0;
  }

  // Generate reason for linking opportunity
  generateLinkingReason(similarity, orphanInfo, pageInfo) {
    const reasons = [];
    
    if (similarity > 0.7) {
      reasons.push('Highly relevant content');
    } else if (similarity > 0.5) {
      reasons.push('Moderately relevant content');
    } else {
      reasons.push('Somewhat related content');
    }
    
    const sharedTopics = this.getSharedTopics(orphanInfo.contentTopics, pageInfo.contentTopics);
    if (sharedTopics.length > 0) {
      reasons.push(`Shared topics: ${sharedTopics.slice(0, 2).join(', ')}`);
    }
    
    return reasons.join('; ');
  }

  // Generate internal linking strategy
  generateInternalLinkingStrategy() {
    console.log('🔗 Generating internal linking strategy...');
    
    const strategy = {
      orphanPageSolutions: [],
      generalLinkingOpportunities: [],
      contentClusters: this.identifyContentClusters(),
      linkingHierarchy: this.buildLinkingHierarchy()
    };
    
    // Solutions for orphan pages
    this.orphanPages.forEach(orphan => {
      const topOpportunities = orphan.linkingOpportunities.slice(0, 3);
      
      strategy.orphanPageSolutions.push({
        orphanPage: orphan.url,
        linkingOpportunities: topOpportunities,
        recommendedActions: this.generateLinkingActions(orphan, topOpportunities)
      });
    });
    
    // General linking opportunities
    strategy.generalLinkingOpportunities = this.findGeneralLinkingOpportunities();
    
    return strategy;
  }

  // Identify content clusters for strategic linking
  identifyContentClusters() {
    const clusters = new Map();
    
    this.pageGraph.forEach((pageInfo, url) => {
      pageInfo.semanticClusters.forEach(cluster => {
        const clusterKey = `${cluster.type}:${cluster.values.join(',')}`;
        
        if (!clusters.has(clusterKey)) {
          clusters.set(clusterKey, {
            type: cluster.type,
            values: cluster.values,
            pages: []
          });
        }
        
        clusters.get(clusterKey).pages.push(url);
      });
    });
    
    return Array.from(clusters.values())
      .filter(cluster => cluster.pages.length > 1)
      .sort((a, b) => b.pages.length - a.pages.length);
  }

  // Build linking hierarchy (hub and spoke model)
  buildLinkingHierarchy() {
    const hubs = [];
    const spokes = [];
    
    this.pageGraph.forEach((pageInfo, url) => {
      const linkCount = pageInfo.inboundLinks.length + pageInfo.outboundLinks.length;
      
      if (linkCount > 10) {
        hubs.push({
          url: url,
          type: 'hub',
          linkCount: linkCount,
          connectedPages: [...pageInfo.inboundLinks, ...pageInfo.outboundLinks]
        });
      } else if (linkCount > 0) {
        spokes.push({
          url: url,
          type: 'spoke',
          linkCount: linkCount
        });
      }
    });
    
    return { hubs, spokes };
  }

  // Generate specific linking actions
  generateLinkingActions(orphanPage, opportunities) {
    const actions = [];
    
    opportunities.forEach((opp, index) => {
      actions.push({
        priority: index + 1,
        action: `Add link to "${orphanPage.url}" on "${opp.targetUrl}"`,
        anchorText: this.suggestAnchorText(orphanPage.page, opp.sharedTopics),
        placement: 'content section',
        reason: opp.reason
      });
    });
    
    return actions;
  }

  // Suggest appropriate anchor text
  suggestAnchorText(page, sharedTopics) {
    if (sharedTopics.length > 0) {
      return `${sharedTopics[0]} services`;
    }
    
    if (page.title) {
      return page.title.split(' - ')[0].toLowerCase();
    }
    
    return 'related services';
  }

  // Find general linking opportunities across all pages
  findGeneralLinkingOpportunities() {
    const opportunities = [];
    
    this.pageGraph.forEach((sourceInfo, sourceUrl) => {
      this.pageGraph.forEach((targetInfo, targetUrl) => {
        if (sourceUrl === targetUrl) return;
        
        const similarity = this.calculateSimilarity(sourceInfo, targetInfo);
        
        if (similarity > 0.4 && !sourceInfo.outboundLinks.includes(targetUrl)) {
          opportunities.push({
            from: sourceUrl,
            to: targetUrl,
            similarity: similarity,
            reason: this.generateLinkingReason(similarity, sourceInfo, targetInfo),
            anchorText: this.suggestAnchorText(targetInfo.page, 
              this.getSharedTopics(sourceInfo.contentTopics, targetInfo.contentTopics))
          });
        }
      });
    });
    
    return opportunities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 20); // Top 20 opportunities
  }

  // Run complete analysis
  analyze(pages = null) {
    if (pages) {
      this.addPages(pages);
    }
    
    console.log('🔍 Starting orphan page detection and internal linking analysis...');
    console.log(`Analyzing ${this.pages.length} pages...`);
    
    // Step 1: Build page graph
    this.buildPageGraph();
    
    // Step 2: Identify orphan pages
    const orphans = this.identifyOrphanPages();
    console.log(`Found ${orphans.length} orphan pages`);
    
    // Step 3: Generate linking strategy
    const strategy = this.generateInternalLinkingStrategy();
    
    // Step 4: Compile results
    this.analysisResults = {
      summary: {
        totalPages: this.pages.length,
        orphanPages: orphans.length,
        totalLinks: this.calculateTotalLinks(),
        linkingOpportunities: strategy.orphanPageSolutions.length + strategy.generalLinkingOpportunities.length
      },
      orphanPages: orphans,
      linkingStrategy: strategy,
      recommendations: this.generateRecommendations(orphans, strategy)
    };
    
    return this.analysisResults;
  }

  // Calculate total number of links
  calculateTotalLinks() {
    let total = 0;
    this.pageGraph.forEach(pageInfo => {
      total += pageInfo.outboundLinks.length;
    });
    return total;
  }

  // Generate overall recommendations
  generateRecommendations(orphans, strategy) {
    const recommendations = [];
    
    if (orphans.length > 0) {
      recommendations.push({
        priority: 'high',
        title: 'Orphan Page Resolution',
        description: `Fix ${orphans.length} orphan pages to improve site structure`,
        action: 'Implement linking strategy for orphan pages'
      });
    }
    
    const totalOpportunities = strategy.orphanPageSolutions.length + strategy.generalLinkingOpportunities.length;
    if (totalOpportunities > 10) {
      recommendations.push({
        priority: 'medium',
        title: 'Internal Linking Optimization',
        description: `Leverage ${totalOpportunities} linking opportunities to boost SEO`,
        action: 'Implement systematic internal linking improvements'
      });
    }
    
    if (orphans.length === 0 && totalOpportunities < 5) {
      recommendations.push({
        priority: 'low',
        title: 'Good Internal Linking Structure',
        description: 'Site has reasonable internal linking structure',
        action: 'Continue monitoring and periodic optimization'
      });
    }
    
    return recommendations;
  }
}

// Sample page data for testing
export const SAMPLE_PAGES_FOR_LINKING = [
  {
    url: '/',
    title: 'BookEase - Verified Companion Services',
    description: 'Find verified escorts and companion services across India',
    navigation: '<nav><a href="/mumbai">Mumbai</a><a href="/delhi">Delhi</a></nav>',
    content: '<p>Our services are available in major Indian cities including <a href="/mumbai">Mumbai</a> and <a href="/delhi">Delhi</a>.</p>',
    footer: '<footer><a href="/contact">Contact Us</a><a href="/privacy">Privacy Policy</a></footer>'
  },
  {
    url: '/mumbai',
    title: 'Mumbai Escorts - Verified Companion Services',
    description: 'Verified escorts in Mumbai Andheri, Bandra, Juhu',
    headings: [
      { level: 'h1', text: 'Mumbai Escorts' },
      { level: 'h2', text: 'Popular Areas' }
    ],
    content: '<p>Check out our <a href="/mumbai/escorts">Mumbai escort services</a>. Also see <a href="/delhi">Delhi escorts</a>.</p>'
  },
  {
    url: '/mumbai/escorts',
    title: 'Mumbai Escort Services',
    description: 'Premium escort services in Mumbai',
    content: '<p>Professional services in <a href="/mumbai">Mumbai</a>.</p>'
  },
  {
    url: '/delhi',
    title: 'Delhi Escorts - Verified Companion Services',
    description: 'Verified escorts in Delhi NCR',
    content: '<p>Services available in Delhi. See also <a href="/mumbai">Mumbai escorts</a>.</p>'
  },
  {
    url: '/orphan-test', // This should be identified as orphan
    title: 'Test Orphan Page',
    description: 'This page has no incoming links',
    content: '<p>Lonely orphan page content.</p>'
  }
];

// Utility function to run analysis
export const analyzeInternalLinking = (pages = SAMPLE_PAGES_FOR_LINKING) => {
  const detector = new OrphanPageDetector(pages);
  return detector.analyze();
};

export default OrphanPageDetector;