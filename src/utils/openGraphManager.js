/**
 * AI-Optimized Open Graph Manager for BookEase
 * Advanced social sharing optimization with dynamic content generation
 */

// Enhanced Open Graph configuration with AI-driven defaults
const ogConfig = {
  defaults: {
    siteName: 'BookEase',
    locale: 'en_IN',
    type: 'website',
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: 'BookEase - Verified Companion Services Across India'
  },
  
  // Dynamic image generation based on content type
  imageTemplates: {
    homepage: {
      url: 'https://bookease.com/images/og-homepage.jpg',
      alt: 'BookEase - Find Verified Companion Services in Major Indian Cities',
      width: 1200,
      height: 630
    },
    cityPage: {
      url: 'https://bookease.com/images/og-city-template.jpg',
      alt: 'Verified {city} Companion Services - BookEase',
      width: 1200,
      height: 630
    },
    servicePage: {
      url: 'https://bookease.com/images/og-service-template.jpg',
      alt: '{serviceName} Services - Professional Companion Matching',
      width: 1200,
      height: 630
    },
    blogPost: {
      url: 'https://bookease.com/images/og-blog-template.jpg',
      alt: '{title} - BookEase Blog',
      width: 1200,
      height: 630
    }
  },
  
  // Content-specific Open Graph enhancements
  contentTypes: {
    homepage: {
      type: 'website',
      section: 'Services',
      tags: ['escorts', 'companion', 'booking', 'india']
    },
    city: {
      type: 'place',
      section: 'Locations',
      tags: ['local', 'verified', 'discreet', 'professional']
    },
    service: {
      type: 'product',
      section: 'Services',
      tags: ['premium', 'verified', 'discreet', 'professional']
    },
    blog: {
      type: 'article',
      section: 'Blog',
      tags: ['guides', 'tips', 'safety', 'services']
    }
  }
};

/**
 * Generate enhanced Open Graph tags with AI optimization
 * @param {Object} pageData - Page metadata and content data
 * @returns {Array} Array of Open Graph meta tag objects
 */
export const generateOpenGraphTags = (pageData) => {
  const {
    title,
    description,
    canonicalUrl,
    contentType = 'website',
    imageData = {},
    city = '',
    serviceName = '',
    articleData = {}
  } = pageData;
  
  const tags = [];
  
  // Basic Open Graph tags
  tags.push({ property: 'og:title', content: title });
  tags.push({ property: 'og:description', content: description });
  tags.push({ property: 'og:url', content: canonicalUrl });
  tags.push({ property: 'og:site_name', content: ogConfig.defaults.siteName });
  tags.push({ property: 'og:locale', content: ogConfig.defaults.locale });
  tags.push({ property: 'og:type', content: ogConfig.contentTypes[contentType]?.type || 'website' });
  
  // Enhanced image handling with fallbacks
  const imageUrl = imageData.url || getImageForContentType(contentType, { city, serviceName });
  if (imageUrl) {
    tags.push({ property: 'og:image', content: imageUrl });
    tags.push({ property: 'og:image:width', content: ogConfig.defaults.imageWidth.toString() });
    tags.push({ property: 'og:image:height', content: ogConfig.defaults.imageHeight.toString() });
    tags.push({ property: 'og:image:alt', content: imageData.alt || getDefaultImageAlt(contentType, { city, serviceName }) });
  }
  
  // Content-type specific enhancements
  switch (contentType) {
    case 'city':
      if (city) {
        tags.push({ property: 'place:location:latitude', content: getCityCoordinates(city).lat });
        tags.push({ property: 'place:location:longitude', content: getCityCoordinates(city).lng });
        tags.push({ property: 'business:contact_data:country_name', content: 'India' });
      }
      break;
      
    case 'service':
      if (serviceName) {
        tags.push({ property: 'product:brand', content: 'BookEase' });
        tags.push({ property: 'product:availability', content: 'in stock' });
        tags.push({ property: 'product:condition', content: 'new' });
      }
      break;
      
    case 'blog':
      if (articleData.publishedTime) {
        tags.push({ property: 'article:published_time', content: articleData.publishedTime });
      }
      if (articleData.modifiedTime) {
        tags.push({ property: 'article:modified_time', content: articleData.modifiedTime });
      }
      if (articleData.author) {
        tags.push({ property: 'article:author', content: articleData.author });
      }
      if (articleData.section) {
        tags.push({ property: 'article:section', content: articleData.section });
      }
      break;
  }
  
  // Enhanced engagement tags
  tags.push({ property: 'og:determiner', content: '' }); // Auto-detect determiner
  
  // Facebook-specific enhancements
  tags.push({ property: 'fb:app_id', content: import.meta.env.REACT_APP_FACEBOOK_APP_ID || '' });
  
  return tags;
};

/**
 * Get appropriate image URL based on content type
 * @param {string} contentType - Type of content (homepage, city, service, blog)
 * @param {Object} context - Context data (city, serviceName)
 * @returns {string} Image URL
 */
const getImageForContentType = (contentType, context = {}) => {
  const template = ogConfig.imageTemplates[contentType];
  if (!template) return ogConfig.imageTemplates.homepage.url;
  
  // For dynamic content, return template URL
  if (contentType === 'city' && context.city) {
    return template.url; // Would be dynamically generated in production
  }
  
  if (contentType === 'service' && context.serviceName) {
    return template.url; // Would be dynamically generated in production
  }
  
  return template.url;
};

/**
 * Generate appropriate image alt text
 * @param {string} contentType - Content type
 * @param {Object} context - Context data
 * @returns {string} Alt text
 */
const getDefaultImageAlt = (contentType, context = {}) => {
  const template = ogConfig.imageTemplates[contentType];
  if (!template) return ogConfig.defaults.imageAlt;
  
  let altText = template.alt;
  
  // Replace placeholders with actual values
  if (context.city) {
    altText = altText.replace('{city}', context.city.charAt(0).toUpperCase() + context.city.slice(1));
  }
  
  if (context.serviceName) {
    altText = altText.replace('{serviceName}', context.serviceName);
  }
  
  if (context.title) {
    altText = altText.replace('{title}', context.title);
  }
  
  return altText;
};

/**
 * Get city coordinates for location-based Open Graph tags
 * @param {string} city - City name
 * @returns {Object} Latitude and longitude
 */
const getCityCoordinates = (city) => {
  const coordinates = {
    mumbai: { lat: '19.0760', lng: '72.8777' },
    delhi: { lat: '28.7041', lng: '77.1025' },
    bangalore: { lat: '12.9716', lng: '77.5946' },
    pune: { lat: '18.5204', lng: '73.8567' },
    hyderabad: { lat: '17.3850', lng: '78.4867' },
    chennai: { lat: '13.0827', lng: '80.2707' },
    kolkata: { lat: '22.5726', lng: '88.3639' },
    ahmedabad: { lat: '23.0225', lng: '72.5714' },
    goa: { lat: '15.2993', lng: '74.1240' },
    jaipur: { lat: '26.9124', lng: '75.7873' }
  };
  
  return coordinates[city.toLowerCase()] || { lat: '20.5937', lng: '78.9629' }; // India center
};

/**
 * Generate Facebook-specific Open Graph extensions
 * @param {Object} pageData - Page metadata
 * @returns {Array} Facebook-specific meta tags
 */
export const generateFacebookExtensions = (pageData) => {
  const tags = [];
  
  // Facebook App ID (would be set in environment variables)
  const appId = import.meta.env.REACT_APP_FACEBOOK_APP_ID;
  if (appId) {
    tags.push({ property: 'fb:app_id', content: appId });
  }
  
  // Facebook admins (for page insights)
  const admins = import.meta.env.REACT_APP_FACEBOOK_ADMINS;
  if (admins) {
    tags.push({ property: 'fb:admins', content: admins });
  }
  
  // Enhanced engagement features
  tags.push({ property: 'fb:pages', content: import.meta.env.REACT_APP_FACEBOOK_PAGES || '' });
  
  return tags;
};

/**
 * Generate video-specific Open Graph tags
 * @param {Object} videoData - Video metadata
 * @returns {Array} Video Open Graph tags
 */
export const generateVideoTags = (videoData) => {
  const {
    videoUrl,
    videoSecureUrl,
    videoType = 'video/mp4',
    videoWidth = '1280',
    videoHeight = '720'
  } = videoData;
  
  if (!videoUrl) return [];
  
  const tags = [
    { property: 'og:video', content: videoUrl },
    { property: 'og:video:secure_url', content: videoSecureUrl || videoUrl },
    { property: 'og:video:type', content: videoType },
    { property: 'og:video:width', content: videoWidth },
    { property: 'og:video:height', content: videoHeight }
  ];
  
  return tags;
};

/**
 * Generate audio-specific Open Graph tags
 * @param {Object} audioData - Audio metadata
 * @returns {Array} Audio Open Graph tags
 */
export const generateAudioTags = (audioData) => {
  const {
    audioUrl,
    audioSecureUrl,
    audioType = 'audio/mp3'
  } = audioData;
  
  if (!audioUrl) return [];
  
  const tags = [
    { property: 'og:audio', content: audioUrl },
    { property: 'og:audio:secure_url', content: audioSecureUrl || audioUrl },
    { property: 'og:audio:type', content: audioType }
  ];
  
  return tags;
};

/**
 * Validate Open Graph implementation
 * @param {Array} ogTags - Generated Open Graph tags
 * @returns {Object} Validation report
 */
export const validateOpenGraph = (ogTags) => {
  const requiredTags = ['og:title', 'og:description', 'og:url', 'og:type'];
  const foundTags = ogTags.map(tag => tag.property);
  
  const missingTags = requiredTags.filter(tag => !foundTags.includes(tag));
  
  const validation = {
    isValid: missingTags.length === 0,
    missingTags,
    totalTags: ogTags.length,
    recommendations: []
  };
  
  // Add recommendations based on content type
  if (!foundTags.includes('og:image')) {
    validation.recommendations.push('Add og:image for better social sharing');
  }
  
  if (!foundTags.includes('og:locale')) {
    validation.recommendations.push('Specify og:locale for international targeting');
  }
  
  return validation;
};

export default {
  generateOpenGraphTags,
  generateFacebookExtensions,
  generateVideoTags,
  generateAudioTags,
  validateOpenGraph,
  ogConfig
};