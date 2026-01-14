// Enhanced schema utilities for Technical SEO II & Advanced Schema implementation

export function buildServiceJsonLd(service, variant = null) {
  const offer = variant ? {
    "@type": "Offer",
    "price": variant.price,
    "priceCurrency": "INR",
    "url": `https://bookease.com/service/${service.id}`,
    "availability": "http://schema.org/InStock"
  } : undefined;

  const json = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.category || service.name,
    "name": service.name,
    "description": service.description || `Book ${service.name} with verified companions on BookEase.`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "BookEase",
      "url": "https://bookease.com"
    },
    "areaServed": service.city ? { "@type": "City", "name": service.city } : undefined,
  };

  if (offer) json.offers = offer;
  if (service.aggregateRating) json.aggregateRating = service.aggregateRating;

  return json;
}

// Product schema for service listings
export function buildProductSchema(service, reviews = []) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": service.name,
    "description": service.description,
    "image": service.image || "https://bookease.com/default-service-image.jpg",
    "brand": {
      "@type": "Brand",
      "name": "BookEase"
    },
    "category": service.category,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": service.price || "5000",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "BookEase"
      }
    }
  };

  if (reviews.length > 0) {
    productSchema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": calculateAverageRating(reviews),
      "reviewCount": reviews.length,
      "bestRating": 5,
      "worstRating": 1
    };
    productSchema.review = reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.text
    }));
  }

  return productSchema;
}

// Review schema for testimonials
export function buildReviewSchema(review, itemReviewed) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": itemReviewed,
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": review.text,
    "datePublished": review.date || new Date().toISOString().split('T')[0]
  };
}

// HowTo schema for booking guides
export function buildHowToSchema(guide) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": guide.name,
    "description": guide.description,
    "image": guide.image,
    "estimatedCost": guide.estimatedCost || {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": "5000"
    },
    "supply": guide.supply || [],
    "tool": guide.tool || [],
    "step": guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image,
      "url": step.url
    }))
  };
}

// Enhanced Organization schema
export function buildEnhancedOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AdultEntertainment",
    "name": "BookEase",
    "alternateName": "Book Ease",
    "url": "https://www.escortmumbaii.in",
    "logo": "https://www.escortmumbaii.in/logo.png",
    "description": "India's premier verified escort and companion services directory with 2000+ verified profiles across major cities",
    "telephone": "+91-9999999999",
    "email": "support@escortmumbaii.in",
    "sameAs": [
      "https://www.facebook.com/escortmumbaii",
      "https://twitter.com/escortmumbaii",
      "https://www.instagram.com/escortmumbaii"
    ],
    "knowsAbout": [
      "Escort services",
      "Companion services",
      "Adult entertainment",
      "Verification services",
      "Booking platforms"
    ],
    "knowsLanguage": ["English", "Hindi"],
    "serviceArea": {
      "@type": "Place",
      "name": "India",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    },
    "founder": {
      "@type": "Person",
      "name": "BookEase Team"
    },
    "dateCreated": "2024",
    "offers": {
      "@type": "Offer",
      "name": "Verified Escort Booking Services",
      "description": "Secure platform connecting clients with verified adult companions across India",
      "category": "Adult Entertainment Services"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "327",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

// Event schema for special promotions
export function buildEventSchema(event) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "location": {
      "@type": "Place",
      "name": event.location.name,
      "address": event.location.address
    },
    "organizer": {
      "@type": "Organization",
      "name": "BookEase"
    },
    "offers": {
      "@type": "Offer",
      "name": event.offerName,
      "description": event.offerDescription,
      "price": event.price,
      "priceCurrency": "INR"
    }
  };
}

// Helper function to calculate average rating
function calculateAverageRating(reviews) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
}
