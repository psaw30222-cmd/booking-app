/**
 * AI-Optimized HTTPS Security Manager for BookEase
 * Implements enterprise-grade security headers and SSL best practices
 */

// Security configuration with industry best practices
const securityConfig = {
  // HSTS (HTTP Strict Transport Security) settings
  hsts: {
    maxAge: 31536000, // 1 year in seconds
    includeSubdomains: true,
    preload: true,
    applyToAllRoutes: true
  },
  
  // Content Security Policy configuration
  csp: {
    directives: {
      'default-src': ["'self'"],
      'script-src': [
        "'self'", 
        "'unsafe-inline'", // Needed for React/Google Analytics
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://connect.facebook.net"
      ],
      'style-src': [
        "'self'", 
        "'unsafe-inline'", // Needed for Tailwind CSS
        "https://fonts.googleapis.com"
      ],
      'img-src': [
        "'self'", 
        "data:", 
        "https:", 
        "http://" // Temporarily allow for mixed content migration
      ],
      'font-src': [
        "'self'", 
        "https://fonts.gstatic.com",
        "https://fonts.googleapis.com"
      ],
      'connect-src': [
        "'self'",
        "https://www.google-analytics.com",
        "https://analytics.google.com",
        "https://stats.g.doubleclick.net"
      ],
      'frame-src': ["'self'"],
      'object-src': ["'none'"],
      'media-src': ["'self'"],
      'child-src': ["'self'"],
      'form-action': ["'self'"],
      'base-uri': ["'self'"],
      'upgrade-insecure-requests': []
    }
  },
  
  // Other security headers
  headers: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': [
      'geolocation=()', 
      'microphone=()', 
      'camera=()',
      'payment=()',
      'usb=()'
    ].join(', '),
    'Expect-CT': 'max-age=86400, enforce'
  },
  
  // Mixed content protection
  mixedContent: {
    upgradeInsecureRequests: true,
    blockAllMixedContent: false, // False during migration period
    reportUri: '/api/security/mixed-content-report'
  }
};

/**
 * Generate security headers for HTTP responses
 * @returns {Object} Security headers object
 */
export const generateSecurityHeaders = () => {
  const headers = {};
  
  // HSTS Header
  const hstsValue = `max-age=${securityConfig.hsts.maxAge}; ` +
                   `${securityConfig.hsts.includeSubdomains ? 'includeSubDomains; ' : ''}` +
                   `${securityConfig.hsts.preload ? 'preload' : ''}`;
  headers['Strict-Transport-Security'] = hstsValue;
  
  // Content Security Policy
  const cspDirectives = Object.entries(securityConfig.csp.directives)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
  headers['Content-Security-Policy'] = cspDirectives;
  
  // Other security headers
  Object.entries(securityConfig.headers).forEach(([header, value]) => {
    headers[header] = value;
  });
  
  // Feature Policy (deprecated but still useful)
  headers['Feature-Policy'] = securityConfig.headers['Permissions-Policy'];
  
  return headers;
};

/**
 * Generate meta tags for client-side security
 * @returns {Array} Security meta tag objects
 */
export const generateSecurityMetaTags = () => {
  return [
    // CSP for inline scripts (as meta tag)
    {
      'http-equiv': 'Content-Security-Policy',
      content: "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com"
    },
    
    // Referrer policy as meta tag
    {
      name: 'referrer',
      content: securityConfig.headers['Referrer-Policy']
    },
    
    // Format detection for mobile
    {
      name: 'format-detection',
      content: 'telephone=no'
    }
  ];
};

/**
 * Check HTTPS status and provide recommendations
 * @param {Object} request - HTTP request object
 * @returns {Object} HTTPS status report
 */
export const checkHttpsStatus = (request) => {
  const protocol = request.protocol || (request.secure ? 'https' : 'http');
  const isHttps = protocol === 'https';
  
  const report = {
    isSecure: isHttps,
    protocol,
    recommendations: []
  };
  
  if (!isHttps) {
    report.recommendations.push('Upgrade to HTTPS immediately for security and SEO benefits');
    report.recommendations.push('Obtain SSL certificate from trusted CA');
    report.recommendations.push('Configure HSTS header for automatic HTTPS upgrading');
  } else {
    report.recommendations.push('HTTPS is properly configured');
    report.recommendations.push('Consider adding your domain to HSTS preload list');
  }
  
  // Check for mixed content issues
  const hasMixedContent = request.headers && request.headers['x-forwarded-proto'] === 'http';
  if (hasMixedContent) {
    report.recommendations.push('Fix mixed content issues by serving all resources over HTTPS');
  }
  
  return report;
};

/**
 * Generate redirect rules for HTTPS enforcement
 * @param {string} environment - Current environment (production/staging/development)
 * @returns {Array} Redirect rule objects
 */
export const generateHttpsRedirects = (environment = 'production') => {
  const redirects = [];
  
  // Only enforce HTTPS in production
  if (environment === 'production') {
    redirects.push({
      from: '^http://(.*)$',
      to: 'https://$1',
      statusCode: 301,
      condition: 'RequestProtocol == "HTTP"'
    });
    
    // WWW to non-WWW redirect (choose one canonical form)
    redirects.push({
      from: '^https://www\\.(.*)$',
      to: 'https://$1',
      statusCode: 301,
      condition: 'Host.StartsWith("www.")'
    });
  }
  
  return redirects;
};

/**
 * Security monitoring and reporting utilities
 */
export const securityMonitoring = {
  /**
   * Log security events
   */
  logEvent: (eventType, details) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      eventType,
      details,
      severity: getSeverityLevel(eventType)
    };
    
    // In production, send to security logging service
    if (import.meta.env.PROD) {
      console.log('SECURITY_EVENT:', JSON.stringify(logEntry));
      // Would integrate with actual logging service here
    }
    
    return logEntry;
  },
  
  /**
   * Generate security report
   */
  generateReport: () => {
    return {
      generatedAt: new Date().toISOString(),
      securityHeaders: generateSecurityHeaders(),
      configuration: securityConfig,
      recommendations: [
        'Regular security audits every quarter',
        'Monitor CSP violation reports',
        'Keep dependencies updated',
        'Review and rotate API keys regularly'
      ]
    };
  }
};

/**
 * Get severity level for security events
 */
const getSeverityLevel = (eventType) => {
  const severityMap = {
    'csp_violation': 'high',
    'mixed_content': 'medium',
    'hsts_preload': 'low',
    'certificate_expiring': 'critical',
    'security_header_missing': 'medium'
  };
  
  return severityMap[eventType] || 'low';
};

/**
 * Express.js middleware for security headers
 */
export const securityMiddleware = (req, res, next) => {
  // Apply security headers
  const securityHeaders = generateSecurityHeaders();
  Object.entries(securityHeaders).forEach(([header, value]) => {
    res.setHeader(header, value);
  });
  
  // Log security events
  if (req.protocol !== 'https') {
    securityMonitoring.logEvent('insecure_request', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.originalUrl
    });
  }
  
  next();
};

/**
 * Vercel/Vite configuration for security headers
 */
export const vercelSecurityConfig = {
  headers: [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Permissions-Policy',
          value: 'geolocation=(), microphone=(), camera=()'
        }
      ]
    }
  ]
};

export default {
  generateSecurityHeaders,
  generateSecurityMetaTags,
  checkHttpsStatus,
  generateHttpsRedirects,
  securityMonitoring,
  securityMiddleware,
  vercelSecurityConfig,
  securityConfig
};