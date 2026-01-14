// International SEO Configuration with hreflang Implementation
// Supports multilingual targeting and country-specific SEO

export const INTERNATIONAL_SEO_CONFIG = {
  // Supported Languages and Countries
  languages: [
    {
      code: "en-IN",
      name: "English (India)",
      locale: "en_IN",
      currency: "INR",
      default: true
    },
    {
      code: "en-US", 
      name: "English (United States)",
      locale: "en_US",
      currency: "USD"
    },
    {
      code: "en-GB",
      name: "English (United Kingdom)", 
      locale: "en_GB",
      currency: "GBP"
    },
    {
      code: "en-AU",
      name: "English (Australia)",
      locale: "en_AU", 
      currency: "AUD"
    },
    {
      code: "en-CA",
      name: "English (Canada)",
      locale: "en_CA",
      currency: "CAD"
    }
  ],

  // Country Targeting Configuration
  countries: [
    {
      code: "IN",
      name: "India",
      topLevelDomain: ".in",
      currency: "INR",
      languages: ["en-IN"],
      targeted: true
    },
    {
      code: "US",
      name: "United States", 
      topLevelDomain: ".com",
      currency: "USD",
      languages: ["en-US"],
      targeted: true
    },
    {
      code: "GB",
      name: "United Kingdom",
      topLevelDomain: ".co.uk", 
      currency: "GBP",
      languages: ["en-GB"],
      targeted: true
    },
    {
      code: "AU",
      name: "Australia",
      topLevelDomain: ".com.au",
      currency: "AUD", 
      languages: ["en-AU"],
      targeted: true
    },
    {
      code: "CA",
      name: "Canada",
      topLevelDomain: ".ca",
      currency: "CAD",
      languages: ["en-CA"],
      targeted: true
    }
  ],

  // URL Structure Options
  urlStructures: {
    ccTLD: {
      description: "Country Code Top Level Domains",
      example: "bookease.co.uk, bookease.com.au",
      pros: ["Strong geo-targeting signal", "Clear country identification"],
      cons: ["Expensive", "Management complexity"]
    },
    subdirectory: {
      description: "Subdirectory structure",
      example: "bookease.com/in/, bookease.com/us/",
      pros: ["Easy to implement", "Cost-effective", "Centralized management"],
      cons: ["Weaker geo-signal than ccTLD"]
    },
    subdomain: {
      description: "Subdomain structure", 
      example: "in.bookease.com, us.bookease.com",
      pros: ["Good geo-targeting", "Separate hosting options"],
      cons: ["Requires separate configuration", "Link equity distribution"]
    },
    parameter: {
      description: "URL parameters",
      example: "bookease.com?country=in&lang=en",
      pros: ["Simple implementation"],
      cons: ["Poor user experience", "SEO complications"]
    }
  },

  // Chosen Implementation (subdirectory approach)
  chosenStructure: "subdirectory",
  baseUrl: "https://bookease.com",

  // Service Regions Mapping
  serviceRegions: {
    asia: {
      countries: ["IN"],
      services: ["escorts", "companions", "massage"],
      keywords: ["escort services", "companion booking", "verified escorts"]
    },
    northAmerica: {
      countries: ["US", "CA"],
      services: ["escorts", "companions", "dating"],
      keywords: ["escort services", "companion services", "dating companions"]
    },
    europe: {
      countries: ["GB", "AU"],
      services: ["escorts", "companions", "premium services"],
      keywords: ["escort services", "premium companions", "verified escorts"]
    }
  }
};

// Generate hreflang tags for a given page
export const generateHreflangTags = (currentPagePath, currentPageLang = "en-IN") => {
  const tags = [];
  
  // Self-referencing canonical
  tags.push({
    rel: "canonical",
    hrefLang: "x-default",
    href: `${INTERNATIONAL_SEO_CONFIG.baseUrl}${currentPagePath}`
  });

  // Generate hreflang for each language-country combination
  INTERNATIONAL_SEO_CONFIG.countries.forEach(country => {
    if (country.targeted) {
      const langCode = country.languages[0]; // Primary language
      
      // Skip if it's the current page to avoid duplication
      if (langCode === currentPageLang && currentPagePath.includes(`/${country.code.toLowerCase()}`)) {
        return;
      }

      let href;
      
      // Generate appropriate URL based on chosen structure
      switch (INTERNATIONAL_SEO_CONFIG.chosenStructure) {
        case "subdirectory":
          // Remove any existing country prefix and add the new one
          const cleanPath = currentPagePath.replace(/^\/(in|us|uk|au|ca)\//, '/');
          href = `${INTERNATIONAL_SEO_CONFIG.baseUrl}/${country.code.toLowerCase()}${cleanPath}`;
          break;
          
        case "subdomain":
          href = `https://${country.code.toLowerCase()}.${INTERNATIONAL_SEO_CONFIG.baseUrl.replace('https://', '')}${currentPagePath}`;
          break;
          
        default:
          href = `${INTERNATIONAL_SEO_CONFIG.baseUrl}${currentPagePath}`;
      }

      tags.push({
        rel: "alternate",
        hrefLang: `${langCode.split('-')[0]}-${country.code}`,
        href: href
      });
    }
  });

  return tags;
};

// Generate country-specific landing pages
export const generateCountryPages = (baseContent) => {
  const pages = [];

  INTERNATIONAL_SEO_CONFIG.countries.forEach(country => {
    if (country.targeted) {
      const countryCode = country.code.toLowerCase();
      
      pages.push({
        path: `/${countryCode}`,
        country: country,
        content: {
          ...baseContent,
          title: `${baseContent.title} in ${country.name}`,
          description: `Professional ${baseContent.serviceType} services in ${country.name}. Verified, discreet, and safe companion services with local providers.`,
          currency: country.currency,
          phoneNumber: getCountryPhoneNumber(country.code),
          legalDisclaimer: getLegalDisclaimer(country.code)
        }
      });
    }
  });

  return pages;
};

// Country-specific phone numbers
const getCountryPhoneNumber = (countryCode) => {
  const phoneNumbers = {
    "IN": "+91-9999999999",
    "US": "+1-555-123-4567", 
    "GB": "+44-20-1234-5678",
    "AU": "+61-2-1234-5678",
    "CA": "+1-416-123-4567"
  };
  
  return phoneNumbers[countryCode] || phoneNumbers["IN"];
};

// Legal disclaimers by country
const getLegalDisclaimer = (countryCode) => {
  const disclaimers = {
    "IN": "Services provided in accordance with Indian laws and regulations. Age verification required.",
    "US": "Services comply with US federal and state regulations. Must be 18+ to use services.",
    "GB": "Services operate within UK legal framework. Age verification and consent required.",
    "AU": "Services provided under Australian laws. Valid ID and age verification mandatory.",
    "CA": "Services comply with Canadian federal and provincial regulations. Age verification required."
  };
  
  return disclaimers[countryCode] || disclaimers["IN"];
};

// International keyword mapping
export const getInternationalKeywords = (serviceType, country) => {
  const keywordTemplates = {
    escorts: {
      "IN": ["verified escorts", "companion services", "escort booking", "discreet escorts"],
      "US": ["escort services", "companion dating", "verified escorts", "professional companions"],
      "GB": ["escort services uk", "london escorts", "verified companions", "premium escorts"],
      "AU": ["escort services australia", "sydney escorts", "verified companions", "brisbane escorts"],
      "CA": ["escort services canada", "toronto escorts", "verified companions", "vancouver escorts"]
    },
    companions: {
      "IN": ["companion services", "verified companions", "dating services", "social companions"],
      "US": ["companion services", "verified companions", "dating companions", "social escorts"],
      "GB": ["companion services uk", "london companions", "verified dating", "social escorts"],
      "AU": ["companion services australia", "sydney companions", "verified dating", "social escorts"],
      "CA": ["companion services canada", "toronto companions", "verified dating", "social escorts"]
    }
  };

  return keywordTemplates[serviceType]?.[country] || keywordTemplates["escorts"][country] || [];
};

// Currency conversion helper
export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  // Simplified exchange rates (would use real API in production)
  const exchangeRates = {
    "INR": 1,
    "USD": 0.012,
    "GBP": 0.0095,
    "AUD": 0.018,
    "CAD": 0.016
  };

  const amountInINR = amount * (exchangeRates[fromCurrency] || 1);
  return Math.round(amountInINR / (exchangeRates[toCurrency] || 1));
};

// International content adaptation
export const adaptContentForCountry = (content, country) => {
  return {
    ...content,
    title: `${content.title} in ${country.name}`,
    description: content.description.replace(
      "Indian cities", 
      `${country.name} locations`
    ),
    keywords: getInternationalKeywords(content.serviceType, country.code),
    currency: country.currency,
    phoneNumber: getCountryPhoneNumber(country.code),
    legalDisclaimer: getLegalDisclaimer(country.code),
    culturalNotes: getCulturalConsiderations(country.code)
  };
};

// Cultural considerations by country
const getCulturalConsiderations = (countryCode) => {
  const considerations = {
    "IN": "Respect for privacy and discretion is paramount. Services provided with utmost confidentiality.",
    "US": "Emphasis on professionalism and clear communication. All services provided legally and ethically.",
    "GB": "Focus on premium service delivery and British professionalism standards.",
    "AU": "Casual yet professional approach with emphasis on safety and clear boundaries.",
    "CA": "Polite and respectful service delivery with strong emphasis on consent and safety."
  };
  
  return considerations[countryCode] || considerations["IN"];
};

// International SEO Audit Helper
export const internationalSEOAudit = (pages) => {
  const audit = {
    totalPages: pages.length,
    hreflangTags: 0,
    canonicalTags: 0,
    missingTranslations: 0,
    issues: []
  };

  pages.forEach(page => {
    // Check for hreflang implementation
    if (page.hreflangTags && page.hreflangTags.length > 0) {
      audit.hreflangTags++;
    } else {
      audit.issues.push(`Missing hreflang tags for ${page.path}`);
    }

    // Check for canonical tags
    if (page.canonicalTag) {
      audit.canonicalTags++;
    } else {
      audit.issues.push(`Missing canonical tag for ${page.path}`);
    }

    // Check for translations
    const availableLanguages = Object.keys(page.translations || {});
    if (availableLanguages.length < INTERNATIONAL_SEO_CONFIG.languages.length - 1) {
      audit.missingTranslations++;
      audit.issues.push(`Incomplete translations for ${page.path}`);
    }
  });

  audit.score = Math.round(
    ((audit.hreflangTags + audit.canonicalTags) / (audit.totalPages * 2)) * 100
  );

  return {
    ...audit,
    recommendations: generateInternationalRecommendations(audit.issues)
  };
};

// Generate recommendations based on audit findings
const generateInternationalRecommendations = (issues) => {
  const recommendations = [];

  if (issues.some(issue => issue.includes("hreflang"))) {
    recommendations.push("Implement hreflang tags for all international pages");
  }

  if (issues.some(issue => issue.includes("canonical"))) {
    recommendations.push("Add self-referencing canonical tags to all pages");
  }

  if (issues.some(issue => issue.includes("translations"))) {
    recommendations.push("Complete translations for all target languages");
  }

  if (recommendations.length === 0) {
    recommendations.push("International SEO implementation is complete and optimized");
  }

  return recommendations;
};