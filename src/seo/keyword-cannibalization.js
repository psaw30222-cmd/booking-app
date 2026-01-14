// Keyword Cannibalization Analyzer
// Identifies and resolves competing pages targeting the same keywords

export class KeywordCannibalizationAnalyzer {
  constructor(pages = []) {
    this.pages = pages;
    this.keywordMap = new Map();
    this.cannibalizationIssues = [];
    this.analysisResults = null;
  }

  // Add pages to analyze
  addPages(pages) {
    this.pages = [...this.pages, ...pages];
  }

  // Extract keywords from page content
  extractKeywords(page) {
    const keywords = new Set();
    
    // Extract from title
    if (page.title) {
      const titleKeywords = this.extractKeywordsFromText(page.title, 3);
      titleKeywords.forEach(kw => keywords.add(kw));
    }
    
    // Extract from meta description
    if (page.description) {
      const descKeywords = this.extractKeywordsFromText(page.description, 2);
      descKeywords.forEach(kw => keywords.add(kw));
    }
    
    // Extract from headings (H1, H2)
    if (page.headings) {
      page.headings.forEach(heading => {
        const headingKeywords = this.extractKeywordsFromText(heading.text, 2);
        headingKeywords.forEach(kw => keywords.add(kw));
      });
    }
    
    // Extract from URL
    if (page.url) {
      const urlKeywords = this.extractKeywordsFromUrl(page.url);
      urlKeywords.forEach(kw => keywords.add(kw));
    }
    
    return Array.from(keywords);
  }

  // Extract keywords from text content
  extractKeywordsFromText(text, maxWords = 3) {
    const keywords = [];
    const stopWords = new Set([
      'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was',
      'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new',
      'now', 'old', 'see', 'two', 'who', 'boy', 'did', 'man', 'men', 'put', 'too', 'use',
      'very', 'way', 'well', 'will', 'with', 'book', 'ease', 'escort', 'service', 'services'
    ]);
    
    // Split into words and clean
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));
    
    // Extract 1-word, 2-word, and 3-word phrases
    for (let i = 0; i < words.length; i++) {
      // Single words
      keywords.push(words[i]);
      
      // Two-word phrases
      if (i < words.length - 1) {
        keywords.push(`${words[i]} ${words[i + 1]}`);
      }
      
      // Three-word phrases (if requested)
      if (maxWords >= 3 && i < words.length - 2) {
        keywords.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
      }
    }
    
    return [...new Set(keywords)];
  }

  // Extract keywords from URL
  extractKeywordsFromUrl(url) {
    const keywords = [];
    const urlParts = url.split('/').filter(part => part && !part.includes('.') && part.length > 2);
    
    urlParts.forEach(part => {
      // Split hyphenated or underscored parts
      const segments = part.split(/[-_]/);
      segments.forEach(segment => {
        if (segment.length > 2) {
          keywords.push(segment.toLowerCase());
        }
      });
      
      // Add full segment if it's meaningful
      if (segments.length > 1 && part.length > 4) {
        keywords.push(part.toLowerCase());
      }
    });
    
    return keywords;
  }

  // Map keywords to pages
  mapKeywordsToPages() {
    this.pages.forEach(page => {
      const keywords = this.extractKeywords(page);
      
      keywords.forEach(keyword => {
        if (!this.keywordMap.has(keyword)) {
          this.keywordMap.set(keyword, []);
        }
        
        this.keywordMap.get(keyword).push({
          page: page,
          keyword: keyword,
          keywordDensity: this.calculateKeywordDensity(page, keyword)
        });
      });
    });
  }

  // Calculate keyword density for a page
  calculateKeywordDensity(page, keyword) {
    let totalCount = 0;
    let keywordCount = 0;
    
    // Count in title
    if (page.title) {
      const titleMatches = (page.title.toLowerCase().match(new RegExp(keyword, 'gi')) || []).length;
      keywordCount += titleMatches * 3; // Weight title higher
      totalCount += page.title.split(/\s+/).length * 3;
    }
    
    // Count in description
    if (page.description) {
      const descMatches = (page.description.toLowerCase().match(new RegExp(keyword, 'gi')) || []).length;
      keywordCount += descMatches * 2; // Weight description
      totalCount += page.description.split(/\s+/).length * 2;
    }
    
    // Count in content (if available)
    if (page.content) {
      const contentMatches = (page.content.toLowerCase().match(new RegExp(keyword, 'gi')) || []).length;
      keywordCount += contentMatches;
      totalCount += page.content.split(/\s+/).length;
    }
    
    return totalCount > 0 ? (keywordCount / totalCount) * 100 : 0;
  }

  // Identify cannibalization issues
  identifyCannibalizationIssues() {
    this.cannibalizationIssues = [];
    
    this.keywordMap.forEach((pagesForKeyword, keyword) => {
      if (pagesForKeyword.length > 1) {
        // Sort by keyword density (highest first)
        const sortedPages = [...pagesForKeyword].sort((a, b) => b.keywordDensity - a.keywordDensity);
        
        // Check if there's significant overlap
        const densityDifference = sortedPages[0].keywordDensity - sortedPages[sortedPages.length - 1].keywordDensity;
        
        if (densityDifference > 2 || sortedPages[0].keywordDensity > 3) {
          this.cannibalizationIssues.push({
            keyword: keyword,
            competingPages: sortedPages,
            severity: this.calculateIssueSeverity(sortedPages),
            recommendedAction: this.determineRecommendedAction(sortedPages)
          });
        }
      }
    });
    
    return this.cannibalizationIssues;
  }

  // Calculate issue severity
  calculateIssueSeverity(competingPages) {
    const maxDensity = Math.max(...competingPages.map(p => p.keywordDensity));
    const pageCount = competingPages.length;
    
    if (maxDensity > 5 && pageCount >= 3) return 'high';
    if (maxDensity > 3 && pageCount >= 2) return 'medium';
    return 'low';
  }

  // Determine recommended action
  determineRecommendedAction(competingPages) {
    const sortedPages = [...competingPages].sort((a, b) => b.keywordDensity - a.keywordDensity);
    const primaryPage = sortedPages[0];
    const secondaryPages = sortedPages.slice(1);
    
    if (primaryPage.keywordDensity > 8) {
      return {
        type: 'consolidate',
        primaryPage: primaryPage.page.url,
        pagesToRedirect: secondaryPages.map(p => p.page.url),
        reason: 'High keyword density on primary page'
      };
    } else if (secondaryPages.some(p => p.keywordDensity > 4)) {
      return {
        type: 'differentiate',
        pages: competingPages.map(p => p.page.url),
        reason: 'Multiple pages with significant keyword usage'
      };
    } else {
      return {
        type: 'optimize',
        pages: competingPages.map(p => p.page.url),
        reason: 'Low-level cannibalization - minor optimization needed'
      };
    }
  }

  // Generate content differentiation suggestions
  generateDifferentiationSuggestions(issue) {
    const suggestions = [];
    const pages = issue.competingPages.map(p => p.page);
    
    // Suggest different focus keywords for each page
    pages.forEach((page, index) => {
      const alternativeKeywords = this.findAlternativeKeywords(page, issue.keyword);
      suggestions.push({
        page: page.url,
        currentKeyword: issue.keyword,
        suggestedKeywords: alternativeKeywords.slice(0, 3),
        contentAdjustment: `Focus on ${alternativeKeywords[0] || 'related terms'} instead of "${issue.keyword}"`
      });
    });
    
    return suggestions;
  }

  // Find alternative keywords for a page
  findAlternativeKeywords(page, targetKeyword) {
    const alternatives = [];
    
    // Look for semantically related terms
    const semanticMap = {
      'escort': ['companion', 'dating service', 'personal companion'],
      'escorts': ['companions', 'dating services', 'personal companions'],
      'mumbai': ['bombay', 'mumbai city', 'financial capital'],
      'delhi': ['ncr', 'national capital', 'delhi ncr'],
      'bangalore': ['bengaluru', 'silicon valley of india', 'tech hub']
    };
    
    const baseWord = targetKeyword.split(' ')[0];
    if (semanticMap[baseWord]) {
      alternatives.push(...semanticMap[baseWord]);
    }
    
    // Add location modifiers
    if (page.url.includes('mumbai')) {
      alternatives.push(`${targetKeyword} in mumbai`, `mumbai ${targetKeyword}`);
    } else if (page.url.includes('delhi')) {
      alternatives.push(`${targetKeyword} in delhi`, `delhi ${targetKeyword}`);
    }
    
    return [...new Set(alternatives)];
  }

  // Run complete analysis
  analyze(pages = null) {
    if (pages) {
      this.addPages(pages);
    }
    
    console.log('🔍 Starting keyword cannibalization analysis...');
    console.log(`Analyzing ${this.pages.length} pages...`);
    
    // Step 1: Map keywords to pages
    this.mapKeywordsToPages();
    console.log(`Mapped keywords to ${this.keywordMap.size} unique keywords`);
    
    // Step 2: Identify cannibalization issues
    const issues = this.identifyCannibalizationIssues();
    console.log(`Found ${issues.length} cannibalization issues`);
    
    // Step 3: Generate detailed analysis
    this.analysisResults = this.generateDetailedAnalysis();
    
    return this.analysisResults;
  }

  // Generate detailed analysis report
  generateDetailedAnalysis() {
    const highSeverity = this.cannibalizationIssues.filter(i => i.severity === 'high');
    const mediumSeverity = this.cannibalizationIssues.filter(i => i.severity === 'medium');
    const lowSeverity = this.cannibalizationIssues.filter(i => i.severity === 'low');
    
    return {
      summary: {
        totalPages: this.pages.length,
        totalKeywords: this.keywordMap.size,
        totalIssues: this.cannibalizationIssues.length,
        severityBreakdown: {
          high: highSeverity.length,
          medium: mediumSeverity.length,
          low: lowSeverity.length
        }
      },
      issues: this.cannibalizationIssues.map(issue => ({
        ...issue,
        differentiationSuggestions: this.generateDifferentiationSuggestions(issue)
      })),
      recommendations: this.generateOverallRecommendations(),
      actionPlan: this.generateActionPlan()
    };
  }

  // Generate overall recommendations
  generateOverallRecommendations() {
    const recommendations = [];
    
    const highIssues = this.cannibalizationIssues.filter(i => i.severity === 'high');
    if (highIssues.length > 0) {
      recommendations.push({
        priority: 'urgent',
        title: 'High Severity Issues',
        description: `Address ${highIssues.length} high-severity cannibalization issues immediately`,
        action: 'Consolidate or redirect competing pages'
      });
    }
    
    const mediumIssues = this.cannibalizationIssues.filter(i => i.severity === 'medium');
    if (mediumIssues.length > 0) {
      recommendations.push({
        priority: 'high',
        title: 'Medium Severity Issues',
        description: `Optimize ${mediumIssues.length} medium-severity keyword conflicts`,
        action: 'Differentiate content focus and keywords'
      });
    }
    
    if (this.cannibalizationIssues.length === 0) {
      recommendations.push({
        priority: 'low',
        title: 'Great Job!',
        description: 'No significant keyword cannibalization issues detected',
        action: 'Continue monitoring keyword usage'
      });
    }
    
    return recommendations;
  }

  // Generate action plan
  generateActionPlan() {
    const actionPlan = [];
    
    this.cannibalizationIssues.forEach((issue, index) => {
      actionPlan.push({
        id: index + 1,
        issue: `Keyword conflict: "${issue.keyword}"`,
        severity: issue.severity,
        pagesAffected: issue.competingPages.length,
        recommendedAction: issue.recommendedAction.type,
        estimatedEffort: this.estimateEffort(issue.recommendedAction.type),
        steps: this.generateActionSteps(issue)
      });
    });
    
    return actionPlan;
  }

  // Estimate effort for different action types
  estimateEffort(actionType) {
    const effortMap = {
      consolidate: 'High (requires redirects and content merging)',
      differentiate: 'Medium (content optimization and keyword adjustment)',
      optimize: 'Low (minor content tweaks)'
    };
    return effortMap[actionType] || 'Medium';
  }

  // Generate specific action steps
  generateActionSteps(issue) {
    const steps = [];
    
    switch (issue.recommendedAction.type) {
      case 'consolidate':
        steps.push(
          'Choose primary page to keep',
          'Merge valuable content from secondary pages',
          'Set up 301 redirects from secondary to primary pages',
          'Update internal links to point to primary page'
        );
        break;
        
      case 'differentiate':
        steps.push(
          'Assign unique focus keywords to each page',
          'Modify title tags and meta descriptions',
          'Adjust heading structure and content focus',
          'Update internal linking strategy'
        );
        break;
        
      case 'optimize':
        steps.push(
          'Reduce keyword repetition in secondary pages',
          'Add more specific long-tail variations',
          'Improve content quality and depth',
          'Monitor performance after changes'
        );
        break;
    }
    
    return steps;
  }
}

// Predefined page data for analysis
export const SAMPLE_PAGES = [
  {
    url: '/mumbai',
    title: 'Mumbai Escorts 2026 - Verified Profiles | BookEase',
    description: '500+ verified Mumbai escorts in Andheri, Bandra, Juhu. Available tonight. 24/7 service.',
    headings: [
      { level: 'h1', text: 'Mumbai Escorts - Verified Companion Services' },
      { level: 'h2', text: 'Top Areas in Mumbai' },
      { level: 'h2', text: 'Verified Escort Profiles' }
    ]
  },
  {
    url: '/mumbai/escorts',
    title: 'Mumbai Escort Services - Premium Companions | BookEase',
    description: 'Premium escort services in Mumbai. Verified companions for social events and private meetings.',
    headings: [
      { level: 'h1', text: 'Mumbai Escort Services' },
      { level: 'h2', text: 'Our Mumbai Escorts' }
    ]
  },
  {
    url: '/delhi',
    title: 'Delhi Escorts - Verified Companion Services | BookEase',
    description: 'Verified Delhi escorts and companion services. Available across Delhi NCR.',
    headings: [
      { level: 'h1', text: 'Delhi Escorts - Premium Companion Services' }
    ]
  },
  {
    url: '/escort-services',
    title: 'Escort Services Across India | BookEase',
    description: 'Verified escort services in Mumbai, Delhi, Bangalore and other major cities.',
    headings: [
      { level: 'h1', text: 'Escort Services India' },
      { level: 'h2', text: 'Mumbai Escort Services' },
      { level: 'h2', text: 'Delhi Escort Services' }
    ]
  }
];

// Utility function to run analysis
export const analyzeKeywordCannibalization = (pages = SAMPLE_PAGES) => {
  const analyzer = new KeywordCannibalizationAnalyzer(pages);
  return analyzer.analyze();
};

// Export for direct usage
export default KeywordCannibalizationAnalyzer;