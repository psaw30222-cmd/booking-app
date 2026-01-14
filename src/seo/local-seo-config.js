// Local SEO Configuration and Tools
// Implements NAP consistency, citation management, and local optimization

export const LOCAL_SEO_CONFIG = {
  // Business Information - NAP (Name, Address, Phone)
  businessInfo: {
    name: "BookEase - Verified Companion Services",
    alternateNames: [
      "BookEase Escorts",
      "Verified Escort Services India",
      "Discreet Companion Booking"
    ],
    phone: {
      primary: "+91-9999999999",
      whatsapp: "+91-9999999999",
      tollFree: ""
    },
    address: {
      street: "Business District",
      locality: "Mumbai",
      region: "Maharashtra",
      postalCode: "400001",
      country: "India",
      countryCode: "IN"
    },
    coordinates: {
      latitude: 19.0760,
      longitude: 72.8777
    }
  },

  // Service Areas
  serviceAreas: [
    { city: "Mumbai", state: "Maharashtra", pinCodes: ["400001", "400002", "400003"] },
    { city: "Delhi", state: "Delhi", pinCodes: ["110001", "110002", "110003"] },
    { city: "Bangalore", state: "Karnataka", pinCodes: ["560001", "560002", "560003"] },
    { city: "Chennai", state: "Tamil Nadu", pinCodes: ["600001", "600002"] },
    { city: "Hyderabad", state: "Telangana", pinCodes: ["500001", "500002"] },
    { city: "Pune", state: "Maharashtra", pinCodes: ["411001", "411002"] },
    { city: "Kolkata", state: "West Bengal", pinCodes: ["700001", "700002"] },
    { city: "Ahmedabad", state: "Gujarat", pinCodes: ["380001", "380002"] },
    { city: "Goa", state: "Goa", pinCodes: ["403001", "403002"] },
    { city: "Jaipur", state: "Rajasthan", pinCodes: ["302001", "302002"] }
  ],

  // Google My Business Categories
  gmbCategories: [
    "Escort Service",
    "Companion Service", 
    "Dating Service",
    "Entertainment Service",
    "Personal Care Service"
  ],

  // Local Keywords by City
  localKeywords: {
    Mumbai: [
      "escorts in Mumbai",
      "Mumbai companion services",
      "verified escorts Mumbai",
      "Mumbai dating services",
      "professional escorts Mumbai"
    ],
    Delhi: [
      "escorts in Delhi",
      "Delhi companion services", 
      "verified escorts Delhi",
      "Delhi dating services"
    ],
    Bangalore: [
      "escorts in Bangalore",
      "Bangalore companion services",
      "verified escorts Bangalore"
    ]
  },

  // Citation Sources Priority
  citationSources: {
    tier1: [
      "google.com",
      "facebook.com", 
      "yelp.com",
      "justdial.com",
      "sulekha.com"
    ],
    tier2: [
      "indiaparenting.com",
      "magicbricks.com",
      "housing.com",
      "commonfloor.com"
    ],
    tier3: [
      "localdirectories.com",
      "city-specific directories"
    ]
  }
};

// NAP Consistency Checker
export const checkNAPConsistency = (businessData) => {
  const issues = [];
  
  // Check name consistency
  const nameVariations = [
    businessData.name.toLowerCase(),
    businessData.name.replace(/[-\s]/g, '').toLowerCase(),
    businessData.alternateNames.map(n => n.toLowerCase())
  ];
  
  // Check address format consistency
  const addressIssues = validateAddressFormat(businessData.address);
  if (addressIssues.length > 0) {
    issues.push(...addressIssues.map(issue => ({ type: 'address', message: issue })));
  }
  
  // Check phone number format
  const phoneIssues = validatePhoneNumbers(businessData.phone);
  if (phoneIssues.length > 0) {
    issues.push(...phoneIssues.map(issue => ({ type: 'phone', message: issue })));
  }
  
  return {
    isConsistent: issues.length === 0,
    issues: issues,
    score: Math.max(0, 100 - (issues.length * 10))
  };
};

// Address Format Validator
const validateAddressFormat = (address) => {
  const issues = [];
  
  if (!address.street || address.street.trim().length < 5) {
    issues.push("Street address is missing or too short");
  }
  
  if (!address.locality) {
    issues.push("City/locality is missing");
  }
  
  if (!address.region) {
    issues.push("State/region is missing");
  }
  
  if (!address.postalCode || !/^\d{6}$/.test(address.postalCode)) {
    issues.push("Invalid postal code format (should be 6 digits)");
  }
  
  return issues;
};

// Phone Number Validator
const validatePhoneNumbers = (phones) => {
  const issues = [];
  
  if (!phones.primary) {
    issues.push("Primary phone number is missing");
  } else if (!/^\+91-\d{10}$/.test(phones.primary)) {
    issues.push("Primary phone format should be +91-XXXXXXXXXX");
  }
  
  return issues;
};

// Generate Local Schema Markup
export const generateLocalBusinessSchema = (cityData) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": LOCAL_SEO_CONFIG.businessInfo.name,
    "alternateName": LOCAL_SEO_CONFIG.businessInfo.alternateNames,
    "description": `Verified companion services in ${cityData.city}. Professional, discreet, and safe escort services with verified profiles.`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": LOCAL_SEO_CONFIG.businessInfo.address.street,
      "addressLocality": cityData.city,
      "addressRegion": cityData.state,
      "postalCode": cityData.pinCodes[0],
      "addressCountry": LOCAL_SEO_CONFIG.businessInfo.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": LOCAL_SEO_CONFIG.businessInfo.coordinates.latitude,
      "longitude": LOCAL_SEO_CONFIG.businessInfo.coordinates.longitude
    },
    "telephone": LOCAL_SEO_CONFIG.businessInfo.phone.primary,
    "priceRange": "₹3000-₹50000",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday", 
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/bookease",
      "https://twitter.com/bookease",
      "https://www.instagram.com/bookease"
    ],
    "areaServed": {
      "@type": "Place",
      "name": cityData.city
    },
    "makesOffer": cityData.services.map(service => ({
      "@type": "Offer",
      "name": service.name,
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": service.minPrice,
        "maxPrice": service.maxPrice,
        "priceCurrency": "INR"
      }
    }))
  };
};

// Local Citation Builder
export const buildLocalCitations = async (cityData) => {
  const citations = [];
  
  // Tier 1 Citations (High Authority)
  for (const source of LOCAL_SEO_CONFIG.citationSources.tier1) {
    citations.push({
      source: source,
      priority: "high",
      submissionUrl: `https://${source}/submit-business`,
      status: "pending",
      lastChecked: new Date().toISOString()
    });
  }
  
  // Tier 2 Citations (Medium Authority) 
  for (const source of LOCAL_SEO_CONFIG.citationSources.tier2) {
    citations.push({
      source: source,
      priority: "medium",
      submissionUrl: `https://${source}/add-listing`,
      status: "pending",
      lastChecked: new Date().toISOString()
    });
  }
  
  return citations;
};

// Local SEO Score Calculator
export const calculateLocalSEOScore = (cityData) => {
  let score = 0;
  const factors = [];
  
  // GMB Optimization (25 points)
  if (cityData.gmbOptimized) {
    score += 25;
    factors.push({ factor: "Google My Business", points: 25 });
  } else {
    factors.push({ factor: "Google My Business", points: 0, needed: "Complete GMB profile" });
  }
  
  // NAP Consistency (20 points)
  const napCheck = checkNAPConsistency(LOCAL_SEO_CONFIG.businessInfo);
  score += Math.round(napCheck.score * 0.2);
  factors.push({ 
    factor: "NAP Consistency", 
    points: Math.round(napCheck.score * 0.2),
    details: napCheck.isConsistent ? "Perfect" : `${napCheck.issues.length} issues found`
  });
  
  // Citations (20 points)
  const citationCount = cityData.citations?.filter(c => c.status === "active").length || 0;
  const citationScore = Math.min(20, citationCount * 2);
  score += citationScore;
  factors.push({ 
    factor: "Local Citations", 
    points: citationScore,
    details: `${citationCount} active citations`
  });
  
  // Reviews (15 points)
  const reviewCount = cityData.reviews?.length || 0;
  const reviewScore = Math.min(15, reviewCount);
  score += reviewScore;
  factors.push({ 
    factor: "Online Reviews", 
    points: reviewScore,
    details: `${reviewCount} reviews`
  });
  
  // Local Content (20 points)
  const contentScore = cityData.hasLocalContent ? 20 : 0;
  score += contentScore;
  factors.push({ 
    factor: "Local Content", 
    points: contentScore,
    needed: contentScore === 0 ? "Create city-specific landing pages" : null
  });
  
  return {
    totalScore: score,
    maxScore: 100,
    grade: score >= 80 ? "A" : score >= 60 ? "B" : score >= 40 ? "C" : "D",
    factors: factors,
    recommendations: generateRecommendations(factors)
  };
};

// Generate Recommendations
const generateRecommendations = (factors) => {
  const recommendations = [];
  
  const lowFactors = factors.filter(f => f.points < 15);
  
  if (lowFactors.some(f => f.factor.includes("GMB"))) {
    recommendations.push("Complete and optimize Google My Business profile with photos and posts");
  }
  
  if (lowFactors.some(f => f.factor.includes("NAP"))) {
    recommendations.push("Fix NAP inconsistencies across all online directories");
  }
  
  if (lowFactors.some(f => f.factor.includes("Citations"))) {
    recommendations.push("Submit to high-authority local directories and citation sites");
  }
  
  if (lowFactors.some(f => f.factor.includes("Reviews"))) {
    recommendations.push("Encourage satisfied customers to leave positive reviews");
  }
  
  if (lowFactors.some(f => f.factor.includes("Content"))) {
    recommendations.push("Create city-specific landing pages with local keywords");
  }
  
  return recommendations;
};