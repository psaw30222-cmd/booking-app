/**
 * AI-Powered Redirect Management System for BookEase
 * Handles 301, 302 redirects and meta refresh with intelligent routing
 */

// Redirect types
const RedirectType = {
  PERMANENT: '301',    // Permanent redirect
  TEMPORARY: '302',    // Temporary redirect
  META_REFRESH: 'meta' // Client-side redirect
};

// Redirect reasons
const RedirectReason = {
  PAGE_REMOVED: 'page_removed',
  URL_STRUCTURE_CHANGED: 'url_structure_changed',
  DOMAIN_MIGRATION: 'domain_migration',
  TYPO_FIX: 'typo_fix',
  MERGE_DUPLICATES: 'merge_duplicates',
  MAINTENANCE: 'maintenance',
  GEO_REDIRECT: 'geo_redirect'
};

// Redirect configuration
const redirectConfig = {
  // Permanent redirects (301) - for moved/renamed content
  permanentRedirects: [
    // Old URL structure cleanup
    { from: '/escort/mumbai', to: '/mumbai', reason: RedirectReason.URL_STRUCTURE_CHANGED },
    { from: '/escort/delhi', to: '/delhi', reason: RedirectReason.URL_STRUCTURE_CHANGED },
    { from: '/escort/bangalore', to: '/bangalore', reason: RedirectReason.URL_STRUCTURE_CHANGED },
    
    // Common typos and variations
    { from: '/mumbia', to: '/mumbai', reason: RedirectReason.TYPO_FIX },
    { from: '/delhi-ncr', to: '/delhi', reason: RedirectReason.MERGE_DUPLICATES },
    { from: '/bengaluru', to: '/bangalore', reason: RedirectReason.MERGE_DUPLICATES },
    
    // Old service page URLs
    { from: '/premium-escorts', to: '/service/1', reason: RedirectReason.URL_STRUCTURE_CHANGED },
    { from: '/discreet-services', to: '/service/2', reason: RedirectReason.URL_STRUCTURE_CHANGED },
    
    // Legacy URLs
    { from: '/old-homepage', to: '/', reason: RedirectReason.PAGE_REMOVED },
    { from: '/index-old', to: '/', reason: RedirectReason.PAGE_REMOVED }
  ],
  
  // Temporary redirects (302) - for maintenance or temporary moves
  temporaryRedirects: [
    // Maintenance pages
    { from: '/checkout', to: '/maintenance', reason: RedirectReason.MAINTENANCE, duration: '24h' },
    { from: '/booking', to: '/maintenance', reason: RedirectReason.MAINTENANCE, duration: '24h' },
    
    // Seasonal promotions
    { from: '/valentines-special', to: '/special-offer', reason: RedirectReason.TEMPORARY, duration: 'seasonal' },
    
    // A/B testing routes
    { from: '/new-booking-flow', to: '/booking', reason: RedirectReason.TEMPORARY, duration: 'testing' }
  ],
  
  // Client-side redirects (meta refresh) - for specific cases
  metaRedirects: [
    // Slow redirects for user awareness
    { from: '/under-construction', to: '/', reason: RedirectReason.MAINTENANCE, delay: 5 },
    
    // Geo-based redirects (would integrate with IP geolocation)
    { from: '/international', to: '/', reason: RedirectReason.GEO_REDIRECT, delay: 3 }
  ]
};

/**
 * Generate redirect rules for different platforms
 */
export const generateRedirectRules = (platform) => {
  switch (platform) {
    case 'vercel':
      return generateVercelRedirects();
    case 'nginx':
      return generateNginxRedirects();
    case 'apache':
      return generateApacheRedirects();
    default:
      return generateGenericRedirects();
  }
};

/**
 * Generate Vercel redirect configuration
 */
const generateVercelRedirects = () => {
  const redirects = [];
  
  // Permanent redirects
  redirectConfig.permanentRedirects.forEach(redirect => {
    redirects.push({
      source: redirect.from,
      destination: redirect.to,
      permanent: true
    });
  });
  
  // Temporary redirects
  redirectConfig.temporaryRedirects.forEach(redirect => {
    redirects.push({
      source: redirect.from,
      destination: redirect.to,
      permanent: false
    });
  });
  
  return redirects;
};

/**
 * Generate Nginx redirect configuration
 */
const generateNginxRedirects = () => {
  const nginxConfig = [];
  
  nginxConfig.push('# Permanent redirects (301)');
  redirectConfig.permanentRedirects.forEach(redirect => {
    nginxConfig.push(`rewrite ^${redirect.from}$ ${redirect.to} permanent;`);
  });
  
  nginxConfig.push('\n# Temporary redirects (302)');
  redirectConfig.temporaryRedirects.forEach(redirect => {
    nginxConfig.push(`rewrite ^${redirect.from}$ ${redirect.to} redirect;`);
  });
  
  return nginxConfig.join('\n');
};

/**
 * Generate Apache .htaccess redirects
 */
const generateApacheRedirects = () => {
  const htaccess = [];
  
  htaccess.push('# Permanent redirects (301)');
  redirectConfig.permanentRedirects.forEach(redirect => {
    htaccess.push(`Redirect 301 ${redirect.from} ${redirect.to}`);
  });
  
  htaccess.push('\n# Temporary redirects (302)');
  redirectConfig.temporaryRedirects.forEach(redirect => {
    htaccess.push(`Redirect 302 ${redirect.from} ${redirect.to}`);
  });
  
  return htaccess.join('\n');
};

/**
 * Generate generic redirect map for application-level handling
 */
const generateGenericRedirects = () => {
  const redirectMap = new Map();
  
  // Combine all redirects
  [...redirectConfig.permanentRedirects, ...redirectConfig.temporaryRedirects]
    .forEach(redirect => {
      redirectMap.set(redirect.from, {
        destination: redirect.to,
        type: redirect.reason === RedirectReason.MAINTENANCE ? '302' : '301',
        reason: redirect.reason
      });
    });
  
  return redirectMap;
};

/**
 * React component for client-side redirects
 */
export const RedirectComponent = ({ from, to, type = '301', delay = 0 }) => {
  const [countdown, setCountdown] = useState(delay);
  
  useEffect(() => {
    // Handle immediate redirects
    if (delay === 0) {
      if (type === '301') {
        window.location.replace(to);
      } else {
        window.location.href = to;
      }
      return;
    }
    
    // Handle delayed redirects
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = to;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [to, type, delay]);
  
  if (delay === 0) {
    return null; // No UI needed for immediate redirects
  }
  
  return (
    <div className="redirect-page">
      <h1>Redirecting...</h1>
      <p>You will be redirected to <a href={to}>{to}</a> in {countdown} seconds.</p>
      <button onClick={() => window.location.href = to}>
        Go Now
      </button>
    </div>
  );
};

/**
 * Express.js middleware for server-side redirects
 */
export const redirectMiddleware = (req, res, next) => {
  const redirectMap = generateGenericRedirects();
  const normalizedPath = req.path.toLowerCase();
  
  if (redirectMap.has(normalizedPath)) {
    const redirectInfo = redirectMap.get(normalizedPath);
    
    // Log redirect for analytics
    console.log(`Redirecting ${normalizedPath} to ${redirectInfo.destination} (${redirectInfo.type})`);
    
    // Send appropriate redirect
    if (redirectInfo.type === '301') {
      res.redirect(301, redirectInfo.destination);
    } else {
      res.redirect(302, redirectInfo.destination);
    }
    
    return;
  }
  
  next();
};

/**
 * Redirect management utility functions
 */
export const redirectUtils = {
  /**
   * Add new redirect rule
   */
  addRedirect: (from, to, type = '301', reason = 'custom') => {
    const newRedirect = { from, to, reason };
    
    if (type === '301') {
      redirectConfig.permanentRedirects.push(newRedirect);
    } else {
      redirectConfig.temporaryRedirects.push(newRedirect);
    }
    
    console.log(`Added ${type} redirect: ${from} → ${to}`);
  },
  
  /**
   * Remove redirect rule
   */
  removeRedirect: (from) => {
    const removeFromArray = (arr) => {
      const index = arr.findIndex(r => r.from === from);
      if (index !== -1) {
        arr.splice(index, 1);
        return true;
      }
      return false;
    };
    
    const removed = removeFromArray(redirectConfig.permanentRedirects) || 
                   removeFromArray(redirectConfig.temporaryRedirects);
    
    if (removed) {
      console.log(`Removed redirect: ${from}`);
    }
    
    return removed;
  },
  
  /**
   * Check for redirect loops
   */
  detectLoops: () => {
    const allRedirects = [
      ...redirectConfig.permanentRedirects,
      ...redirectConfig.temporaryRedirects
    ];
    
    const redirectMap = new Map();
    allRedirects.forEach(r => redirectMap.set(r.from, r.to));
    
    const loops = [];
    
    for (const [from, to] of redirectMap) {
      const visited = new Set([from]);
      let current = to;
      
      while (redirectMap.has(current)) {
        if (visited.has(current)) {
          loops.push({ loop: [...visited, current], start: from });
          break;
        }
        
        visited.add(current);
        current = redirectMap.get(current);
        
        // Prevent infinite checking
        if (visited.size > 10) break;
      }
    }
    
    return loops;
  },
  
  /**
   * Generate redirect chain visualization
   */
  getRedirectChain: (startPath) => {
    const allRedirects = [
      ...redirectConfig.permanentRedirects,
      ...redirectConfig.temporaryRedirects
    ];
    
    const redirectMap = new Map();
    allRedirects.forEach(r => redirectMap.set(r.from, r.to));
    
    const chain = [startPath];
    let current = startPath;
    
    while (redirectMap.has(current) && chain.length < 10) {
      current = redirectMap.get(current);
      if (chain.includes(current)) {
        chain.push(`${current} (LOOP DETECTED)`);
        break;
      }
      chain.push(current);
    }
    
    return chain;
  }
};

/**
 * Automated redirect optimization
 */
export const autoRedirectOptimizer = {
  /**
   * Analyze 404 errors and suggest redirects
   */
  analyze404s: (errorLog) => {
    const suggestions = [];
    const urlCounts = {};
    
    // Count 404 occurrences by URL
    errorLog.forEach(entry => {
      if (entry.statusCode === 404) {
        const path = new URL(entry.url).pathname;
        urlCounts[path] = (urlCounts[path] || 0) + 1;
      }
    });
    
    // Generate suggestions for frequently accessed 404s
    Object.entries(urlCounts)
      .filter(([url, count]) => count > 5) // More than 5 accesses
      .forEach(([url, count]) => {
        const suggestion = suggestRedirect(url);
        if (suggestion) {
          suggestions.push({
            url,
            count,
            suggestedRedirect: suggestion,
            confidence: calculateConfidence(url, count)
          });
        }
      });
    
    return suggestions;
  },
  
  /**
   * Suggest redirect based on URL patterns
   */
  suggestRedirect: (url) => {
    const patterns = [
      { pattern: /\/escort\/(.+)/, replacement: '/$1' },
      { pattern: /\/service\/(\d+)\/.*/, replacement: '/service/$1' },
      { pattern: /\/([^\/]+)-escorts/, replacement: '/$1' },
      { pattern: /\/(mumbia|bombay)/, replacement: '/mumbai' },
      { pattern: /\/(bengaluru|banglr)/, replacement: '/bangalore' }
    ];
    
    for (const { pattern, replacement } of patterns) {
      if (pattern.test(url)) {
        return url.replace(pattern, replacement);
      }
    }
    
    return null;
  },
  
  /**
   * Calculate confidence level for redirect suggestion
   */
  calculateConfidence: (url, accessCount) => {
    let confidence = Math.min(accessCount / 10, 1); // Base on access count
    
    // Boost confidence for clear patterns
    if (url.includes('-escorts') || url.includes('/escort/')) {
      confidence += 0.3;
    }
    
    if (url.includes('mumbia') || url.includes('bengaluru')) {
      confidence += 0.2;
    }
    
    return Math.min(confidence, 1);
  }
};

export default {
  generateRedirectRules,
  RedirectComponent,
  redirectMiddleware,
  redirectUtils,
  autoRedirectOptimizer,
  RedirectType,
  RedirectReason
};