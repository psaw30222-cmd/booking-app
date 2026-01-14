/**
 * AI-Powered Broken Link Detection System for BookEase
 * Automated link checking with intelligent prioritization and fixing suggestions
 */

// Configuration for link checking
const linkCheckerConfig = {
  // URLs to check
  baseUrl: 'https://bookease.com',
  
  // Common internal links to monitor
  internalLinks: [
    '/', '/mumbai', '/delhi', '/bangalore', '/pune', '/hyderabad', 
    '/chennai', '/kolkata', '/ahmedabad', '/goa', '/jaipur',
    '/service/1', '/service/2', '/service/3', '/service/4', '/service/5', '/service/6',
    '/terms-and-conditions', '/privacy-policy', '/cookie-policy', '/contact-us',
    '/help-center', '/security', '/company', '/network', '/blog',
    '/bakeca-incontri'
  ],
  
  // External links to monitor (important partners, resources)
  externalLinks: [
    'https://www.google.com',
    'https://www.facebook.com',
    'https://twitter.com'
  ],
  
  // Checking intervals (in milliseconds)
  checkIntervals: {
    critical: 300000,    // 5 minutes for high-priority links
    important: 3600000,  // 1 hour for medium-priority links
    routine: 86400000    // 24 hours for low-priority links
  },
  
  // Retry configuration
  retryAttempts: 3,
  retryDelay: 5000, // 5 seconds between retries
};

/**
 * Link status classification
 */
const LinkStatus = {
  WORKING: 'working',
  BROKEN: 'broken',
  REDIRECT: 'redirect',
  TIMEOUT: 'timeout',
  ERROR: 'error'
};

/**
 * Priority levels for link checking
 */
const Priority = {
  CRITICAL: 'critical',    // Homepage, main city pages
  IMPORTANT: 'important',  // Service pages, legal pages
  ROUTINE: 'routine'       // Blog posts, less critical pages
};

/**
 * Check single URL status
 * @param {string} url - URL to check
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Object>} Link status result
 */
export const checkLinkStatus = async (url, timeout = 10000) => {
  const startTime = Date.now();
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'manual', // Don't follow redirects automatically
      headers: {
        'User-Agent': 'BookEase-Link-Checker/1.0'
      }
    });
    
    clearTimeout(timeoutId);
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    return {
      url,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      redirected: response.redirected,
      responseTime,
      timestamp: new Date().toISOString(),
      type: classifyLinkType(response.status)
    };
    
  } catch (error) {
    const endTime = Date.now();
    
    if (error.name === 'AbortError') {
      return {
        url,
        status: 0,
        statusText: 'Timeout',
        ok: false,
        redirected: false,
        responseTime: endTime - startTime,
        timestamp: new Date().toISOString(),
        type: LinkStatus.TIMEOUT,
        error: error.message
      };
    }
    
    return {
      url,
      status: 0,
      statusText: 'Error',
      ok: false,
      redirected: false,
      responseTime: endTime - startTime,
      timestamp: new Date().toISOString(),
      type: LinkStatus.ERROR,
      error: error.message
    };
  }
};

/**
 * Classify link status based on HTTP response
 */
const classifyLinkType = (statusCode) => {
  if (statusCode >= 200 && statusCode < 300) {
    return LinkStatus.WORKING;
  } else if (statusCode >= 300 && statusCode < 400) {
    return LinkStatus.REDIRECT;
  } else if (statusCode === 404) {
    return LinkStatus.BROKEN;
  } else if (statusCode === 408 || statusCode === 504) {
    return LinkStatus.TIMEOUT;
  } else {
    return LinkStatus.ERROR;
  }
};

/**
 * Check multiple links with prioritization
 * @param {Array} links - Array of link objects with url and priority
 * @returns {Promise<Array>} Array of link check results
 */
export const checkMultipleLinks = async (links) => {
  const results = [];
  
  // Sort links by priority
  const sortedLinks = [...links].sort((a, b) => {
    const priorityOrder = { critical: 0, important: 1, routine: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  
  // Check links with appropriate delays based on priority
  for (const link of sortedLinks) {
    const result = await checkLinkStatus(link.url);
    results.push({ ...result, priority: link.priority });
    
    // Add delay between checks to avoid overwhelming servers
    const delay = link.priority === 'critical' ? 100 : 
                  link.priority === 'important' ? 500 : 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  return results;
};

/**
 * Generate priority-based link list
 * @returns {Array} Links with priorities
 */
export const generateLinkList = () => {
  const links = [];
  
  // Critical links (homepage and main cities)
  const criticalUrls = ['/', '/mumbai', '/delhi', '/bangalore'];
  criticalUrls.forEach(url => {
    links.push({
      url: `${linkCheckerConfig.baseUrl}${url}`,
      priority: Priority.CRITICAL
    });
  });
  
  // Important links (services and legal)
  const importantUrls = [
    ...linkCheckerConfig.internalLinks.filter(url => 
      !criticalUrls.includes(url) && 
      (url.startsWith('/service/') || 
       url.includes('terms') || 
       url.includes('privacy') || 
       url.includes('contact'))
    )
  ];
  
  importantUrls.forEach(url => {
    links.push({
      url: `${linkCheckerConfig.baseUrl}${url}`,
      priority: Priority.IMPORTANT
    });
  });
  
  // Routine links (remaining pages)
  const routineUrls = linkCheckerConfig.internalLinks.filter(url => 
    !criticalUrls.includes(url) && !importantUrls.includes(url)
  );
  
  routineUrls.forEach(url => {
    links.push({
      url: `${linkCheckerConfig.baseUrl}${url}`,
      priority: Priority.ROUTINE
    });
  });
  
  return links;
};

/**
 * Analyze link check results and generate report
 * @param {Array} results - Link check results
 * @returns {Object} Analysis report
 */
export const analyzeLinkResults = (results) => {
  const analysis = {
    totalLinks: results.length,
    workingLinks: results.filter(r => r.type === LinkStatus.WORKING).length,
    brokenLinks: results.filter(r => r.type === LinkStatus.BROKEN).length,
    redirectLinks: results.filter(r => r.type === LinkStatus.REDIRECT).length,
    timeoutLinks: results.filter(r => r.type === LinkStatus.TIMEOUT).length,
    errorLinks: results.filter(r => r.type === LinkStatus.ERROR).length,
    averageResponseTime: 0,
    brokenLinksDetails: [],
    fixSuggestions: []
  };
  
  // Calculate average response time
  const validTimes = results
    .filter(r => r.responseTime > 0)
    .map(r => r.responseTime);
  
  if (validTimes.length > 0) {
    analysis.averageResponseTime = validTimes.reduce((a, b) => a + b, 0) / validTimes.length;
  }
  
  // Collect broken links details
  analysis.brokenLinksDetails = results
    .filter(r => r.type === LinkStatus.BROKEN)
    .map(r => ({
      url: r.url,
      status: r.status,
      statusText: r.statusText,
      priority: r.priority
    }));
  
  // Generate fix suggestions
  analysis.fixSuggestions = generateFixSuggestions(analysis.brokenLinksDetails);
  
  return analysis;
};

/**
 * Generate suggestions for fixing broken links
 * @param {Array} brokenLinks - Array of broken link details
 * @returns {Array} Fix suggestions
 */
const generateFixSuggestions = (brokenLinks) => {
  const suggestions = [];
  
  brokenLinks.forEach(link => {
    const suggestion = {
      url: link.url,
      priority: link.priority,
      suggestedAction: '',
      confidence: 'medium'
    };
    
    // Common URL patterns and fixes
    if (link.url.includes('/escort')) {
      suggestion.suggestedAction = 'Redirect to /service/1 or appropriate service page';
      suggestion.confidence = 'high';
    } else if (link.url.includes('/profile')) {
      suggestion.suggestedAction = 'Redirect to /service/2 or create profile listing page';
      suggestion.confidence = 'high';
    } else if (link.url.endsWith('/')) {
      suggestion.suggestedAction = 'Try removing trailing slash or check if page exists';
      suggestion.confidence = 'medium';
    } else {
      suggestion.suggestedAction = 'Investigate URL structure and create appropriate redirect';
      suggestion.confidence = 'low';
    }
    
    suggestions.push(suggestion);
  });
  
  return suggestions;
};

/**
 * Automated link checking scheduler
 */
export class LinkCheckerScheduler {
  constructor() {
    this.isRunning = false;
    this.checkInterval = null;
  }
  
  /**
   * Start automated link checking
   */
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('🚀 Starting automated link checker...');
    
    // Run immediate check
    this.runCheck();
    
    // Schedule periodic checks
    this.checkInterval = setInterval(() => {
      this.runCheck();
    }, linkCheckerConfig.checkIntervals.routine);
  }
  
  /**
   * Stop automated link checking
   */
  stop() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    console.log('🛑 Stopped automated link checker');
  }
  
  /**
   * Run single link check cycle
   */
  async runCheck() {
    try {
      console.log('🔍 Running link check...', new Date().toISOString());
      
      const links = generateLinkList();
      const results = await checkMultipleLinks(links);
      const analysis = analyzeLinkResults(results);
      
      // Log results
      console.log(`✅ Checked ${analysis.totalLinks} links`);
      console.log(`🟢 Working: ${analysis.workingLinks}`);
      console.log(`🔴 Broken: ${analysis.brokenLinks}`);
      console.log(`🟡 Redirects: ${analysis.redirectLinks}`);
      console.log(`⏱️ Average response time: ${Math.round(analysis.averageResponseTime)}ms`);
      
      // Alert on broken links
      if (analysis.brokenLinks > 0) {
        console.warn(`⚠️ Found ${analysis.brokenLinks} broken links:`);
        analysis.brokenLinksDetails.forEach(link => {
          console.warn(`  ${link.url} (${link.priority})`);
        });
      }
      
      // Store results for monitoring dashboard
      this.storeResults(analysis);
      
    } catch (error) {
      console.error('❌ Link check failed:', error.message);
    }
  }
  
  /**
   * Store results for monitoring
   */
  storeResults(analysis) {
    // In production, this would save to database or monitoring service
    localStorage.setItem('link-check-results', JSON.stringify({
      timestamp: new Date().toISOString(),
      analysis
    }));
  }
  
  /**
   * Get stored results
   */
  getStoredResults() {
    const stored = localStorage.getItem('link-check-results');
    return stored ? JSON.parse(stored) : null;
  }
}

/**
 * React hook for link checking in components
 */
export const useLinkChecker = () => {
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  const checkLinks = async () => {
    setChecking(true);
    setError(null);
    
    try {
      const links = generateLinkList();
      const results = await checkMultipleLinks(links);
      const analysis = analyzeLinkResults(results);
      setResults(analysis);
      return analysis;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setChecking(false);
    }
  };
  
  return { checking, results, error, checkLinks };
};

export default {
  checkLinkStatus,
  checkMultipleLinks,
  generateLinkList,
  analyzeLinkResults,
  LinkCheckerScheduler,
  useLinkChecker,
  LinkStatus,
  Priority
};