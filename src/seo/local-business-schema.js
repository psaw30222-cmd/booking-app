// Enhanced Local Business Schema Generator
// Creates comprehensive schema markup for city-specific pages

export class LocalBusinessSchemaGenerator {
  constructor(config) {
    this.config = {
      businessName: "BookEase - Verified Companion Services",
      businessType: "AdultEntertainment",
      description: "Professional verified companion and escort services with discreet booking across major cities.",
      address: {
        street: "Business District",
        locality: "Mumbai",
        region: "Maharashtra",
        postalCode: "400001",
        country: "IN"
      },
      coordinates: {
        latitude: 19.0760,
        longitude: 72.8777
      },
      phone: "+91-9999999999",
      email: "info@bookease.com",
      website: "https://bookease.com",
      priceRange: "₹3000-₹50000",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, Bank Transfer",
      ...config
    };
  }

  // Generate complete Local Business schema for a specific city
  generateCitySchema(cityData) {
    return {
      "@context": "https://schema.org",
      "@type": "AdultEntertainment",
      "name": `${this.config.businessName} - ${cityData.city}`,
      "alternateName": [
        `${cityData.city} Escorts`,
        `Verified Escorts ${cityData.city}`,
        `${cityData.city} Companion Services`
      ],
      "description": this.generateCityDescription(cityData),
      "address": {
        "@type": "PostalAddress",
        "streetAddress": this.config.address.street,
        "addressLocality": cityData.city,
        "addressRegion": cityData.state,
        "postalCode": cityData.primaryPinCode,
        "addressCountry": this.config.address.country
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.coordinates?.latitude || this.config.coordinates.latitude,
        "longitude": cityData.coordinates?.longitude || this.config.coordinates.longitude
      },
      "telephone": this.config.phone,
      "email": this.config.email,
      "url": `https://bookease.com/${cityData.slug || cityData.city.toLowerCase()}`,
      "sameAs": [
        "https://www.facebook.com/bookease",
        "https://twitter.com/bookease", 
        "https://www.instagram.com/bookease"
      ],
      "priceRange": this.config.priceRange,
      "currenciesAccepted": this.config.currenciesAccepted,
      "paymentAccepted": this.config.paymentAccepted,
      "openingHoursSpecification": this.generateOpeningHours(),
      "areaServed": {
        "@type": "Place",
        "name": cityData.city,
        "containsPlace": cityData.areas.map(area => ({
          "@type": "Place",
          "name": area
        }))
      },
      "makesOffer": this.generateServiceOffers(cityData.services),
      "review": this.generateSampleReviews(cityData.city),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "156",
        "bestRating": "5",
        "worstRating": "1"
      },
      "founder": {
        "@type": "Person",
        "name": "BookEase Team"
      },
      "dateCreated": "2024-01-01",
      "knowsAbout": [
        "Escort Services",
        "Companion Services", 
        "Dating Services",
        "Discreet Meetings"
      ]
    };
  }

  // Generate city-specific description
  generateCityDescription(cityData) {
    const serviceCount = cityData.services.length;
    const areaCount = cityData.areas.length;
    
    return `Verified companion and escort services in ${cityData.city}. Professional, discreet, and safe services with ${serviceCount}+ service options across ${areaCount}+ locations. Book verified escorts for social events, dinner dates, and private meetings.`;
  }

  // Generate opening hours specification
  generateOpeningHours() {
    return [
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
    ];
  }

  // Generate service offers for the city
  generateServiceOffers(services) {
    return services.map(service => ({
      "@type": "Offer",
      "name": service.name,
      "description": service.description,
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": service.minPrice,
        "maxPrice": service.maxPrice,
        "priceCurrency": "INR"
      },
      "itemOffered": {
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "category": service.category
      }
    }));
  }

  // Generate sample reviews for credibility
  generateSampleReviews(city) {
    const sampleReviews = [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Verified Client"
        },
        "datePublished": "2024-12-15",
        "reviewBody": `Outstanding service in ${city}. Professional, punctual, and completely discreet. Will definitely book again.`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person", 
          "name": "Regular Customer"
        },
        "datePublished": "2024-12-10",
        "reviewBody": `Great experience with the ${city} team. Excellent communication and quality service. Highly recommended.`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Satisfied Client"
        },
        "datePublished": "2024-12-05",
        "reviewBody": `Professional service and verified profiles. Made my business trip much more enjoyable. Thank you ${city} team!`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4",
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    ];

    // Add city name to reviews
    return sampleReviews.map(review => ({
      ...review,
      reviewBody: review.reviewBody.replace('{city}', city)
    }));
  }

  // Generate FAQ schema for city page
  generateCityFAQSchema(cityData) {
    const faqs = [
      {
        "@type": "Question",
        "name": `What services do you offer in ${cityData.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We provide verified companion services, escort services, sensual massage, and dating companionship in ${cityData.city}. All our providers are verified and professionally trained.`
        }
      },
      {
        "@type": "Question",
        "name": `How do I book services in ${cityData.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Booking is simple and discreet. Visit our website, select your preferred service and provider, choose date/time, and complete secure payment. Confirmation is sent immediately.`
        }
      },
      {
        "@type": "Question",
        "name": `Are your services safe and legal in ${cityData.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, all our services operate within legal frameworks. We verify all providers, maintain strict privacy policies, and ensure client safety and consent at all times.`
        }
      },
      {
        "@type": "Question",
        "name": `What are your prices in ${cityData.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Prices vary by service type and duration. Standard companionship starts at ₹3000/hour, premium services range from ₹8000-15000, and overnight packages are ₹25000+.`
        }
      }
    ];

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs
    };
  }

  // Generate Breadcrumb schema
  generateBreadcrumbSchema(cityData) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://bookease.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Cities",
          "item": "https://bookease.com/cities"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": cityData.city,
          "item": `https://bookease.com/${cityData.slug || cityData.city.toLowerCase()}`
        }
      ]
    };
  }

  // Generate complete schema package for a city
  generateCompleteCitySchema(cityData) {
    return {
      localBusiness: this.generateCitySchema(cityData),
      faq: this.generateCityFAQSchema(cityData),
      breadcrumb: this.generateBreadcrumbSchema(cityData)
    };
  }
}

// City data configuration
export const CITY_DATA = {
  mumbai: {
    city: "Mumbai",
    state: "Maharashtra",
    slug: "mumbai",
    primaryPinCode: "400001",
    coordinates: { latitude: 19.0760, longitude: 72.8777 },
    areas: ["Andheri", "Bandra", "Colaba", "Dadar", "Juhu", "Malad", "Powai", "Thane"],
    services: [
      {
        name: "Premium Escort Services",
        description: "High-class verified escorts for social events and private meetings",
        category: "Companions",
        minPrice: 5000,
        maxPrice: 25000
      },
      {
        name: "Sensual Massage",
        description: "Professional body-to-body and tantric massage services",
        category: "Body Massage", 
        minPrice: 3000,
        maxPrice: 7000
      },
      {
        name: "Hotel Call Services",
        description: "Discreet hotel visit services across 5-star properties",
        category: "Outcall",
        minPrice: 6000,
        maxPrice: 30000
      }
    ]
  },
  delhi: {
    city: "Delhi",
    state: "Delhi",
    slug: "delhi",
    primaryPinCode: "110001",
    coordinates: { latitude: 28.6139, longitude: 77.2090 },
    areas: ["Connaught Place", "Dwarka", "Greater Kailash", "Karol Bagh", "Lajpat Nagar", "Nehru Place", "Okhla", "Punjabi Bagh"],
    services: [
      {
        name: "Verified Companions",
        description: "Trusted verified companions for social and business events",
        category: "Companions",
        minPrice: 4500,
        maxPrice: 20000
      },
      {
        name: "Escort Services",
        description: "Professional escort services with verified profiles",
        category: "Escort",
        minPrice: 5000,
        maxPrice: 25000
      }
    ]
  },
  bangalore: {
    city: "Bangalore",
    state: "Karnataka", 
    slug: "bangalore",
    primaryPinCode: "560001",
    coordinates: { latitude: 12.9716, longitude: 77.5946 },
    areas: ["Indiranagar", "Koramangala", "MG Road", "Whitefield", "HSR Layout", "Jayanagar", "Electronic City", "Marathahalli"],
    services: [
      {
        name: "Independent Escorts",
        description: "Direct contact verified independent companions",
        category: "Independent",
        minPrice: 4000,
        maxPrice: 18000
      },
      {
        name: "Premium Dating",
        description: "High-end dating and companionship services",
        category: "Dating",
        minPrice: 8000,
        maxPrice: 35000
      }
    ]
  }
};

// Export utility function
export const generateAllCitySchemas = () => {
  const generator = new LocalBusinessSchemaGenerator();
  const schemas = {};
  
  Object.entries(CITY_DATA).forEach(([key, cityData]) => {
    schemas[key] = generator.generateCompleteCitySchema(cityData);
  });
  
  return schemas;
};