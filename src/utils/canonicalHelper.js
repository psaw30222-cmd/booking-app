/**
 * AI-Optimized Canonical URL Helper for BookEase
 * Ensures proper canonicalization across all pages to prevent duplicate content issues
 */

// Canonical URL configuration mapping
const canonicalConfig = {
  // Homepage variations
  homepage: {
    paths: ['/', '/home', '/index'],
    canonical: 'https://bookease.com/'
  },
  
  // City pages with variations
  cities: {
    mumbai: {
      paths: ['/mumbai', '/mumbai-escorts', '/escorts-mumbai'],
      canonical: 'https://bookease.com/mumbai'
    },
    delhi: {
      paths: ['/delhi', '/delhi-escorts', '/escorts-delhi', '/ncr'],
      canonical: 'https://bookease.com/delhi'
    },
    bangalore: {
      paths: ['/bangalore', '/bangalore-escorts', '/escorts-bangalore'],
      canonical: 'https://bookease.com/bangalore'
    },
    pune: {
      paths: ['/pune', '/pune-escorts', '/escorts-pune'],
      canonical: 'https://bookease.com/pune'
    },
    hyderabad: {
      paths: ['/hyderabad', '/hyderabad-escorts', '/escorts-hyderabad'],
      canonical: 'https://bookease.com/hyderabad'
    },
    chennai: {
      paths: ['/chennai', '/chennai-escorts', '/escorts-chennai'],
      canonical: 'https://bookease.com/chennai'
    },
    kolkata: {
      paths: ['/kolkata', '/kolkata-escorts', '/escorts-kolkata'],
      canonical: 'https://bookease.com/kolkata'
    },
    ahmedabad: {
      paths: ['/ahmedabad', '/ahmedabad-escorts', '/escorts-ahmedabad'],
      canonical: 'https://bookease.com/ahmedabad'
    },
    goa: {
      paths: ['/goa', '/goa-escorts', '/escorts-goa'],
      canonical: 'https://bookease.com/goa'
    },
    jaipur: {
      paths: ['/jaipur', '/jaipur-escorts', '/escorts-jaipur'],
      canonical: 'https://bookease.com/jaipur'
    }
  },
  
  // Service pages
  services: {
    '1': {
      paths: ['/service/1', '/premium-companionship'],
      canonical: 'https://bookease.com/service/1'
    },
    '2': {
      paths: ['/service/2', '/discreet-meetings'],
      canonical: 'https://bookease.com/service/2'
    },
    '3': {
      paths: ['/service/3', '/event-companionship'],
      canonical: 'https://bookease.com/service/3'
    },
    '4': {
      paths: ['/service/4', '/travel-companions'],
      canonical: 'https://bookease.com/service/4'
    },
    '5': {
      paths: ['/service/5', '/dinner-dates'],
      canonical: 'https://bookease.com/service/5'
    },
    '6': {
      paths: ['/service/6', '/special-occasions'],
      canonical: 'https://bookease.com/service/6'
    }
  },
  
  // Legal and support pages
  legal: {
    terms: {
      paths: ['/terms', '/terms-and-conditions'],
      canonical: 'https://bookease.com/terms-and-conditions'
    },
    privacy: {
      paths: ['/privacy', '/privacy-policy'],
      canonical: 'https://bookease.com/privacy-policy'
    },
    cookie: {
      paths: ['/cookie-policy'],
      canonical: 'https://bookease.com/cookie-policy'
    },
    security: {
      paths: ['/security'],
      canonical: 'https://bookease.com/security'
    }
  },
  
  // Special pages
  special: {
    bakeca: {
      paths: ['/bakeca-incontri', '/bakeca'],
      canonical: 'https://bookease.com/bakeca-incontri'
    }
  }
};

/**
 * Get canonical URL for current path
 * @param {string} currentPath - Current URL path
 * @returns {string} Canonical URL
 */
export const getCanonicalUrl = (currentPath) => {
  // Normalize the path
  const normalizedPath = currentPath.toLowerCase().trim();
  
  // Check homepage variations
  if (canonicalConfig.homepage.paths.includes(normalizedPath)) {
    return canonicalConfig.homepage.canonical;
  }
  
  // Check city pages
  for (const [city, config] of Object.entries(canonicalConfig.cities)) {
    if (config.paths.includes(normalizedPath)) {
      return config.canonical;
    }
  }
  
  // Check service pages
  const serviceMatch = normalizedPath.match(/^\/service\/(\d+)$/);
  if (serviceMatch) {
    const serviceId = serviceMatch[1];
    if (canonicalConfig.services[serviceId]) {
      return canonicalConfig.services[serviceId].canonical;
    }
  }
  
  // Check legal pages
  for (const [page, config] of Object.entries(canonicalConfig.legal)) {
    if (config.paths.includes(normalizedPath)) {
      return config.canonical;
    }
  }
  
  // Check special pages
  for (const [page, config] of Object.entries(canonicalConfig.special)) {
    if (config.paths.includes(normalizedPath)) {
      return config.canonical;
    }
  }
  
  // Handle paginated content
  const paginationMatch = normalizedPath.match(/^(.*)\?page=(\d+)$/);
  if (paginationMatch) {
    const basePath = paginationMatch[1];
    const pageNumber = paginationMatch[2];
    // For page 1, use base URL as canonical
    if (pageNumber === '1') {
      return `https://bookease.com${basePath}`;
    }
    // For other pages, use the paginated URL as canonical
    return `https://bookease.com${normalizedPath}`;
  }
  
  // Handle filtered content (sort, filter parameters)
  const filterMatch = normalizedPath.match(/^(.*?)(\?.*sort=.*)$/);
  if (filterMatch) {
    // Use base path without filters as canonical
    return `https://bookease.com${filterMatch[1]}`;
  }
  
  // Default: return the current path as canonical if no match found
  return `https://bookease.com${normalizedPath}`;
};



/**
 * Generate hreflang tags for international targeting
 * @param {string} currentPath - Current URL path
 * @returns {Array} Array of hreflang link elements
 */
export const generateHreflangTags = (currentPath) => {
  const canonicalUrl = getCanonicalUrl(currentPath);
  const hreflangs = [];
  
  // Add x-default for international users
  hreflangs.push({
    rel: 'alternate',
    hrefLang: 'x-default',
    href: canonicalUrl
  });
  
  // Add English India locale
  hreflangs.push({
    rel: 'alternate',
    hrefLang: 'en-IN',
    href: canonicalUrl
  });
  
  // Add English US locale for international targeting
  hreflangs.push({
    rel: 'alternate',
    hrefLang: 'en-US',
    href: canonicalUrl
  });
  
  return hreflangs;
};

/**
 * Detect and log canonical issues for monitoring
 * @param {string} currentPath - Current URL path
 * @param {string} canonicalUrl - Generated canonical URL
 * @returns {Object} Issue report
 */
export const detectCanonicalIssues = (currentPath, canonicalUrl) => {
  const issues = [];
  
  // Check if current path matches canonical
  const normalizedCurrent = currentPath.toLowerCase().trim();
  const normalizedCanonical = new URL(canonicalUrl).pathname.toLowerCase().trim();
  
  if (normalizedCurrent !== normalizedCanonical) {
    issues.push({
      type: 'non_canonical_url',
      severity: 'warning',
      message: `Current path (${currentPath}) differs from canonical (${canonicalUrl})`,
      suggestedFix: `Redirect ${currentPath} to ${canonicalUrl}`
    });
  }
  
  // Check for parameter pollution
  if (currentPath.includes('?')) {
    const params = new URLSearchParams(currentPath.split('?')[1]);
    const problematicParams = ['utm_', 'gclid', 'fbclid'];
    
    for (const param of params.keys()) {
      if (problematicParams.some(prefix => param.startsWith(prefix))) {
        issues.push({
          type: 'tracking_parameter',
          severity: 'info',
          message: `Tracking parameter detected: ${param}`,
          suggestedFix: 'Consider using clean URLs or proper parameter handling'
        });
      }
    }
  }
  
  return {
    hasIssues: issues.length > 0,
    issues,
    canonicalUrl
  };
};

export default {
  getCanonicalUrl,
  generateHreflangTags,
  detectCanonicalIssues
};
