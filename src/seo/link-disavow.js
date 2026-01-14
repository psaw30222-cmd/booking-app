// Link Disavow Tool and Toxic Backlink Management
// Identifies harmful backlinks and generates disavow files for Google

export class LinkDisavowManager {
  constructor(config = {}) {
    this.config = {
      domain: 'bookease.com',
      thresholdScores: {
        spamScore: 70,
        toxicityScore: 60,
        authorityScore: 30,
        relevanceScore: 40
      },
      ...config
    };
    
    this.backlinks = [];
    this.toxicLinks = [];
    this.disavowCandidates = [];
    this.analysisResults = null;
  }

  // Add backlinks for analysis
  addBacklinks(backlinks) {
    this.backlinks = [...this.backlinks, ...backlinks];
  }

  // Analyze backlinks for toxicity
  analyzeBacklinks(backlinks = null) {
    if (backlinks) {
      this.addBacklinks(backlinks);
    }
    
    console.log('🔍 Analyzing backlinks for toxicity...');
    console.log(`Processing ${this.backlinks.length} backlinks...`);
    
    this.toxicLinks = [];
    this.disavowCandidates = [];
    
    this.backlinks.forEach(link => {
      const toxicityScore = this.calculateToxicityScore(link);
      
      if (toxicityScore.toxicity > this.config.thresholdScores.toxicityScore) {
        this.toxicLinks.push({
          ...link,
          toxicityScore: toxicityScore,
          shouldDisavow: toxicityScore.toxicity > 80,
          riskLevel: this.determineRiskLevel(toxicityScore.toxicity)
        });
      }
    });
    
    // Separate definite candidates from potential ones
    this.disavowCandidates = this.toxicLinks.filter(link => link.shouldDisavow);
    
    this.analysisResults = this.generateAnalysisReport();
    return this.analysisResults;
  }

  // Calculate toxicity score for a backlink
  calculateToxicityScore(backlink) {
    let toxicity = 0;
    const factors = {};
    
    // Spam score factor (30% weight)
    const spamScore = this.calculateSpamScore(backlink);
    toxicity += spamScore * 0.3;
    factors.spamScore = spamScore;
    
    // Domain authority factor (25% weight)
    const authorityScore = this.calculateAuthorityScore(backlink);
    toxicity += (100 - authorityScore) * 0.25; // Lower authority = higher toxicity
    factors.authorityScore = authorityScore;
    
    // Relevance factor (20% weight)
    const relevanceScore = this.calculateRelevanceScore(backlink);
    toxicity += (100 - relevanceScore) * 0.2; // Lower relevance = higher toxicity
    factors.relevanceScore = relevanceScore;
    
    // Link quality factor (15% weight)
    const qualityScore = this.calculateLinkQualityScore(backlink);
    toxicity += (100 - qualityScore) * 0.15;
    factors.qualityScore = qualityScore;
    
    // Behavioral factors (10% weight)
    const behavioralScore = this.calculateBehavioralScore(backlink);
    toxicity += (100 - behavioralScore) * 0.1;
    factors.behavioralScore = behavioralScore;
    
    return {
      toxicity: Math.min(100, Math.round(toxicity)),
      factors: factors
    };
  }

  // Calculate spam score
  calculateSpamScore(backlink) {
    let score = 0;
    
    // Check for spam indicators
    const spamIndicators = [
      { pattern: /\.tk$|\.ml$|\.ga$|\.cf$/, weight: 20 },
      { pattern: /casino|poker|pharma|viagra/i, weight: 25 },
      { pattern: /free|buy|cheap|discount/i, weight: 15 },
      { pattern: /\d{5,}/, weight: 10 }, // Many numbers
      { pattern: /[^\w\s]{5,}/, weight: 10 } // Many special characters
    ];
    
    spamIndicators.forEach(indicator => {
      if (indicator.pattern.test(backlink.sourceUrl || backlink.domain)) {
        score += indicator.weight;
      }
    });
    
    // Check anchor text spam
    if (backlink.anchorText) {
      const anchorLength = backlink.anchorText.length;
      if (anchorLength > 50) score += 10; // Very long anchor text
      if (backlink.anchorText.split(/\s+/).length > 7) score += 5; // Too many words
    }
    
    return Math.min(100, score);
  }

  // Calculate domain authority score
  calculateAuthorityScore(backlink) {
    // In real implementation, this would use actual DA/PA metrics
    // For simulation, using domain characteristics
    
    const trustedDomains = [
      'google.com', 'facebook.com', 'twitter.com', 'linkedin.com',
      'youtube.com', 'instagram.com', 'wikipedia.org'
    ];
    
    const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.ru', '.cn'];
    
    let score = 50; // Base score
    
    // Trusted domains get high scores
    if (trustedDomains.some(domain => backlink.domain.includes(domain))) {
      score = 90;
    }
    
    // Suspicious TLDs get low scores
    if (suspiciousTlds.some(tld => backlink.domain.endsWith(tld))) {
      score = Math.max(10, score - 30);
    }
    
    // Penalize for suspicious patterns
    if (/^\d+\.\d+\.\d+\.\d+$/.test(backlink.domain)) {
      score = Math.max(5, score - 20); // IP addresses
    }
    
    return score;
  }

  // Calculate relevance score
  calculateRelevanceScore(backlink) {
    const relevantKeywords = [
      'escort', 'companion', 'dating', 'service', 'verified',
      'mumbai', 'delhi', 'bangalore', 'india', 'adult'
    ];
    
    let score = 30; // Base relevance score
    
    // Check domain relevance
    const domainRelevance = relevantKeywords.filter(keyword => 
      backlink.domain.toLowerCase().includes(keyword)
    ).length;
    score += domainRelevance * 10;
    
    // Check anchor text relevance
    if (backlink.anchorText) {
      const anchorRelevance = relevantKeywords.filter(keyword =>
        backlink.anchorText.toLowerCase().includes(keyword)
      ).length;
      score += anchorRelevance * 15;
    }
    
    return Math.min(100, score);
  }

  // Calculate link quality score
  calculateLinkQualityScore(backlink) {
    let score = 50;
    
    // Context quality indicators
    const qualityIndicators = {
      follow: 20,        // Do-follow links are generally better
      branded: 15,       // Branded anchor text
      natural: 10,       // Natural link placement
      editorial: 25      // Editorial/approved links
    };
    
    // Apply quality bonuses
    if (backlink.linkType === 'follow') score += qualityIndicators.follow;
    if (backlink.context === 'editorial') score += qualityIndicators.editorial;
    if (backlink.anchorText && backlink.anchorText.toLowerCase().includes(this.config.domain.split('.')[0])) {
      score += qualityIndicators.branded;
    }
    
    // Penalize for low-quality indicators
    if (backlink.context === 'comment') score -= 15;
    if (backlink.context === 'forum') score -= 10;
    if (backlink.linkType === 'ugc') score -= 5;
    
    return Math.max(0, Math.min(100, score));
  }

  // Calculate behavioral score
  calculateBehavioralScore(backlink) {
    let score = 50;
    
    // Temporal factors
    if (backlink.firstSeen) {
      const ageInDays = (Date.now() - new Date(backlink.firstSeen).getTime()) / (1000 * 60 * 60 * 24);
      if (ageInDays < 30) score -= 20; // Very new links are suspicious
      else if (ageInDays > 365) score += 15; // Older links are more trustworthy
    }
    
    // Velocity factors (if available)
    if (backlink.linkVelocity && backlink.linkVelocity > 100) {
      score -= 25; // Too many links too quickly
    }
    
    // Geographic factors
    if (backlink.country && ['RU', 'CN', 'IN'].includes(backlink.country)) {
      score -= 10; // Some geographic patterns are more suspicious
    }
    
    return Math.max(0, Math.min(100, score));
  }

  // Determine risk level based on toxicity score
  determineRiskLevel(toxicityScore) {
    if (toxicityScore >= 85) return 'severe';
    if (toxicityScore >= 70) return 'high';
    if (toxicityScore >= 50) return 'medium';
    return 'low';
  }

  // Generate Google disavow file
  generateDisavowFile(format = 'google') {
    if (format === 'google') {
      return this.generateGoogleDisavowFile();
    } else if (format === 'bing') {
      return this.generateBingDisavowFile();
    }
    throw new Error('Unsupported disavow format');
  }

  // Generate Google disavow file format
  generateGoogleDisavowFile() {
    const disavowLines = [
      '# BookEase Link Disavow File',
      '# Generated on: ' + new Date().toISOString(),
      '# Total toxic links identified: ' + this.disavowCandidates.length,
      ''
    ];
    
    this.disavowCandidates.forEach(link => {
      if (link.domain) {
        disavowLines.push(`domain:${link.domain}`);
      } else if (link.sourceUrl) {
        disavowLines.push(`exact:${link.sourceUrl}`);
      }
    });
    
    return disavowLines.join('\n');
  }

  // Generate Bing disavow file format
  generateBingDisavowFile() {
    const disavowLines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<disavow xmlns="http://bing.com/webmaster/tools/disavow">',
      '  <version>1.0</version>',
      `  <generated>${new Date().toISOString()}</generated>`,
      '  <urls>'
    ];
    
    this.disavowCandidates.forEach(link => {
      if (link.sourceUrl) {
        disavowLines.push(`    <url>${link.sourceUrl}</url>`);
      }
    });
    
    disavowLines.push('  </urls>');
    disavowLines.push('</disavow>');
    
    return disavowLines.join('\n');
  }

  // Generate detailed analysis report
  generateAnalysisReport() {
    const riskLevels = {
      severe: this.toxicLinks.filter(l => l.riskLevel === 'severe').length,
      high: this.toxicLinks.filter(l => l.riskLevel === 'high').length,
      medium: this.toxicLinks.filter(l => l.riskLevel === 'medium').length,
      low: this.toxicLinks.filter(l => l.riskLevel === 'low').length
    };
    
    return {
      summary: {
        totalBacklinks: this.backlinks.length,
        toxicLinks: this.toxicLinks.length,
        disavowCandidates: this.disavowCandidates.length,
        riskDistribution: riskLevels
      },
      toxicLinks: this.toxicLinks,
      disavowCandidates: this.disavowCandidates,
      recommendations: this.generateRecommendations(),
      disavowFile: this.generateDisavowFile('google')
    };
  }

  // Generate recommendations based on analysis
  generateRecommendations() {
    const recommendations = [];
    
    if (this.disavowCandidates.length > 0) {
      recommendations.push({
        priority: 'urgent',
        title: 'Immediate Disavow Action Required',
        description: `Disavow ${this.disavowCandidates.length} severely toxic backlinks`,
        action: 'Submit disavow file to Google Search Console immediately'
      });
    }
    
    const highRiskLinks = this.toxicLinks.filter(l => l.riskLevel === 'high' && !l.shouldDisavow);
    if (highRiskLinks.length > 0) {
      recommendations.push({
        priority: 'high',
        title: 'Monitor High-Risk Links',
        description: `Monitor ${highRiskLinks.length} high-risk backlinks`,
        action: 'Set up monitoring and consider disavowing if patterns worsen'
      });
    }
    
    const mediumRiskLinks = this.toxicLinks.filter(l => l.riskLevel === 'medium');
    if (mediumRiskLinks.length > 0) {
      recommendations.push({
        priority: 'medium',
        title: 'Periodic Review Recommended',
        description: `Review ${mediumRiskLinks.length} medium-risk backlinks quarterly`,
        action: 'Regular monitoring and assessment'
      });
    }
    
    if (this.toxicLinks.length === 0) {
      recommendations.push({
        priority: 'low',
        title: 'Healthy Backlink Profile',
        description: 'No toxic backlinks detected in current analysis',
        action: 'Continue regular backlink monitoring'
      });
    }
    
    return recommendations;
  }

  // Monitor link profile changes over time
  compareLinkProfiles(previousAnalysis, currentAnalysis) {
    const changes = {
      newToxicLinks: [],
      resolvedToxicLinks: [],
      changedRiskLevels: []
    };
    
    // Find new toxic links
    const currentToxicUrls = new Set(currentAnalysis.toxicLinks.map(l => l.sourceUrl || l.domain));
    const previousToxicUrls = new Set(previousAnalysis.toxicLinks.map(l => l.sourceUrl || l.domain));
    
    currentToxicUrls.forEach(url => {
      if (!previousToxicUrls.has(url)) {
        changes.newToxicLinks.push(url);
      }
    });
    
    // Find resolved toxic links
    previousToxicUrls.forEach(url => {
      if (!currentToxicUrls.has(url)) {
        changes.resolvedToxicLinks.push(url);
      }
    });
    
    return changes;
  }
}

// Sample backlink data for testing
export const SAMPLE_BACKLINKS = [
  {
    sourceUrl: 'https://spam-site-123.tk/buy-cheap-escorts',
    domain: 'spam-site-123.tk',
    anchorText: 'buy cheap escorts now!!!',
    linkType: 'follow',
    context: 'comment',
    firstSeen: '2024-01-15'
  },
  {
    sourceUrl: 'https://legitimate-blog.com/mumbai-escort-review',
    domain: 'legitimate-blog.com',
    anchorText: 'Mumbai escort services',
    linkType: 'follow',
    context: 'editorial',
    firstSeen: '2023-06-01'
  },
  {
    sourceUrl: 'https://forum-discussion.ru/free-escort-links',
    domain: 'forum-discussion.ru',
    anchorText: 'click here for free escorts',
    linkType: 'follow',
    context: 'forum',
    firstSeen: '2024-03-10'
  },
  {
    sourceUrl: 'https://trusted-news.com/verified-escort-services-india',
    domain: 'trusted-news.com',
    anchorText: 'verified escort services',
    linkType: 'follow',
    context: 'news',
    firstSeen: '2022-12-01'
  },
  {
    sourceUrl: 'https://casino-games.ml/free-poker-money',
    domain: 'casino-games.ml',
    anchorText: 'escort services casino bonus',
    linkType: 'follow',
    context: 'sidebar',
    firstSeen: '2024-02-20'
  }
];

// Utility function to analyze backlinks
export const analyzeBacklinksForDisavow = (backlinks = SAMPLE_BACKLINKS) => {
  const manager = new LinkDisavowManager();
  return manager.analyzeBacklinks(backlinks);
};

// Export for direct usage
export default LinkDisavowManager;