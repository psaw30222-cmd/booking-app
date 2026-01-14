/**
 * AI-Optimized Twitter Card Manager for BookEase
 * Advanced Twitter card generation with multiple card types and dynamic content
 */

// Twitter Card configuration with AI-driven optimization
const twitterConfig = {
  defaults: {
    site: '@BookEase',
    creator: '@BookEase',
    domain: 'bookease.com'
  },
  
  // Different Twitter card types for various content
  cardTypes: {
    summary: {
      name: 'summary',
      description: 'Standard Twitter card with small image',
      useCases: ['blog posts', 'legal pages', 'general content'],
      imageRequired: false
    },
    summaryLargeImage: {
      name: 'summary_large_image',
      description: 'Large image Twitter card for visual content',
      useCases: ['city pages', 'service pages', 'homepage'],
      imageRequired: true
    },
    app: {
      name: 'app',
      description: 'App download card for mobile applications',
      useCases: ['app promotion', 'mobile downloads'],
      imageRequired: true
    },
    player: {
      name: 'player',
      description: 'Media player card for videos/audio',
      useCases: ['video content', 'audio testimonials'],
      imageRequired: true
    }
  },
  
  // Content-specific card type selection
  contentTypeMapping: {
    homepage: 'summary_large_image',
    city: 'summary_large_image',
    service: 'summary_large_image',
    blog: 'summary',
    legal: 'summary',
    special: 'summary_large_image'
  },
  
  // Default images for different card types
  defaultImages: {
    summary: 'https://bookease.com/images/twitter-summary-default.jpg',
    summaryLargeImage: 'https://bookease.com/images/twitter-large-default.jpg',
    app: 'https://bookease.com/images/twitter-app-default.jpg'
  }
};

/**
 * Generate optimized Twitter Card tags
 * @param {Object} pageData - Page metadata and content data
 * @returns {Array} Array of Twitter Card meta tag objects
 */
export const generateTwitterCardTags = (pageData) => {
  const {
    title,
    description,
    canonicalUrl,
    contentType = 'website',
    imageData = {},
    appData = {},
    playerData = {}
  } = pageData;
  
  const tags = [];
  
  // Determine appropriate card type
  const cardType = determineCardType(contentType, imageData);
  
  // Basic Twitter Card tags
  tags.push({ name: 'twitter:card', content: cardType });
  tags.push({ name: 'twitter:title', content: title });
  tags.push({ name: 'twitter:description', content: description });
  
  // Add site and creator handles
  tags.push({ name: 'twitter:site', content: twitterConfig.defaults.site });
  tags.push({ name: 'twitter:creator', content: twitterConfig.defaults.creator });
  
  // Handle image-based cards
  if (requiresImage(cardType)) {
    const imageUrl = imageData.url || getDefaultImageForCard(cardType, contentType);
    if (imageUrl) {
      tags.push({ name: 'twitter:image', content: imageUrl });
      
      // Add image alt text if available
      if (imageData.alt) {
        tags.push({ name: 'twitter:image:alt', content: imageData.alt });
      }
    }
  }
  
  // Handle app cards
  if (cardType === 'app' && appData) {
    tags.push(...generateAppCardTags(appData));
  }
  
  // Handle player cards
  if (cardType === 'player' && playerData) {
    tags.push(...generatePlayerCardTags(playerData));
  }
  
  return tags;
};

/**
 * Determine the appropriate Twitter card type based on content
 * @param {string} contentType - Type of content
 * @param {Object} imageData - Image data
 * @returns {string} Card type
 */
const determineCardType = (contentType, imageData) => {
  // Check if specific card type is forced
  if (imageData.forceCardType) {
    return imageData.forceCardType;
  }
  
  // Get default card type for content type
  const defaultCardType = twitterConfig.contentTypeMapping[contentType] || 'summary';
  
  // Upgrade to large image if image is available and content is visual
  if (defaultCardType === 'summary' && imageData.url && hasVisualContent(contentType)) {
    return 'summary_large_image';
  }
  
  return defaultCardType;
};

/**
 * Check if card type requires an image
 * @param {string} cardType - Twitter card type
 * @returns {boolean} Whether image is required
 */
const requiresImage = (cardType) => {
  return twitterConfig.cardTypes[cardType]?.imageRequired || false;
};

/**
 * Check if content type has visual elements
 * @param {string} contentType - Content type
 * @returns {boolean} Whether content is visual
 */
const hasVisualContent = (contentType) => {
  return ['homepage', 'city', 'service', 'special'].includes(contentType);
};

/**
 * Get default image for specific card type and content
 * @param {string} cardType - Twitter card type
 * @param {string} contentType - Content type
 * @returns {string} Default image URL
 */
const getDefaultImageForCard = (cardType, contentType) => {
  // Try content-type specific image first
  const contentImages = {
    city: `https://bookease.com/images/twitter-${contentType}-default.jpg`,
    service: `https://bookease.com/images/twitter-${contentType}-default.jpg`
  };
  
  if (contentImages[contentType]) {
    return contentImages[contentType];
  }
  
  // Fall back to card type default
  return twitterConfig.defaultImages[cardType] || twitterConfig.defaultImages.summary;
};

/**
 * Generate tags for app Twitter cards
 * @param {Object} appData - App metadata
 * @returns {Array} App card tags
 */
const generateAppCardTags = (appData) => {
  const {
    appId = {},
    appUrl = {},
    appName
  } = appData;
  
  const tags = [];
  
  // iOS app information
  if (appId.ios) {
    tags.push({ name: 'twitter:app:id:iphone', content: appId.ios });
    tags.push({ name: 'twitter:app:url:iphone', content: appUrl.ios || '' });
  }
  
  if (appId.ipad) {
    tags.push({ name: 'twitter:app:id:ipad', content: appId.ipad });
    tags.push({ name: 'twitter:app:url:ipad', content: appUrl.ipad || '' });
  }
  
  // Android app information
  if (appId.googleplay) {
    tags.push({ name: 'twitter:app:id:googleplay', content: appId.googleplay });
    tags.push({ name: 'twitter:app:url:googleplay', content: appUrl.googleplay || '' });
  }
  
  // App name
  if (appName) {
    tags.push({ name: 'twitter:app:name:iphone', content: appName });
    tags.push({ name: 'twitter:app:name:ipad', content: appName });
    tags.push({ name: 'twitter:app:name:googleplay', content: appName });
  }
  
  return tags;
};

/**
 * Generate tags for player Twitter cards
 * @param {Object} playerData - Player metadata
 * @returns {Array} Player card tags
 */
const generatePlayerCardTags = (playerData) => {
  const {
    playerUrl,
    playerWidth = '480',
    playerHeight = '270',
    streamUrl,
    streamContentType
  } = playerData;
  
  const tags = [];
  
  if (playerUrl) {
    tags.push({ name: 'twitter:player', content: playerUrl });
    tags.push({ name: 'twitter:player:width', content: playerWidth });
    tags.push({ name: 'twitter:player:height', content: playerHeight });
  }
  
  if (streamUrl) {
    tags.push({ name: 'twitter:player:stream', content: streamUrl });
    if (streamContentType) {
      tags.push({ name: 'twitter:player:stream:content_type', content: streamContentType });
    }
  }
  
  return tags;
};

/**
 * Generate Twitter-specific enhancements
 * @param {Object} pageData - Page metadata
 * @returns {Array} Additional Twitter tags
 */
export const generateTwitterEnhancements = (pageData) => {
  const tags = [];
  
  // Add deep link support
  if (pageData.deepLink) {
    tags.push({ name: 'twitter:deeplink', content: pageData.deepLink });
  }
  
  // Add app install banner for mobile
  if (pageData.mobileApp) {
    tags.push({ name: 'twitter:app:country', content: 'IN' });
  }
  
  // Add label1 and data1 for additional context
  if (pageData.label1 && pageData.data1) {
    tags.push({ name: 'twitter:label1', content: pageData.label1 });
    tags.push({ name: 'twitter:data1', content: pageData.data1 });
  }
  
  // Add label2 and data2 for additional context
  if (pageData.label2 && pageData.data2) {
    tags.push({ name: 'twitter:label2', content: pageData.label2 });
    tags.push({ name: 'twitter:data2', content: pageData.data2 });
  }
  
  return tags;
};

/**
 * Validate Twitter Card implementation
 * @param {Array} twitterTags - Generated Twitter card tags
 * @returns {Object} Validation report
 */
export const validateTwitterCards = (twitterTags) => {
  const requiredTags = ['twitter:card', 'twitter:title', 'twitter:description'];
  const foundTags = twitterTags.map(tag => tag.name);
  
  const missingTags = requiredTags.filter(tag => !foundTags.includes(tag));
  
  const validation = {
    isValid: missingTags.length === 0,
    missingTags,
    cardType: foundTags.includes('twitter:card') ? 
      twitterTags.find(tag => tag.name === 'twitter:card')?.content : 'unknown',
    totalTags: twitterTags.length,
    recommendations: []
  };
  
  // Add recommendations based on validation
  if (!foundTags.includes('twitter:image') && validation.cardType.includes('large_image')) {
    validation.recommendations.push('Add twitter:image for large image card type');
  }
  
  if (!foundTags.includes('twitter:site')) {
    validation.recommendations.push('Add twitter:site handle for brand recognition');
  }
  
  if (!foundTags.includes('twitter:creator')) {
    validation.recommendations.push('Add twitter:creator handle for content attribution');
  }
  
  return validation;
};

/**
 * Get Twitter Card preview data for testing
 * @param {Object} pageData - Page metadata
 * @returns {Object} Preview data structure
 */
export const getTwitterPreviewData = (pageData) => {
  const twitterTags = generateTwitterCardTags(pageData);
  
  return {
    cardType: twitterTags.find(tag => tag.name === 'twitter:card')?.content || 'summary',
    title: twitterTags.find(tag => tag.name === 'twitter:title')?.content || '',
    description: twitterTags.find(tag => tag.name === 'twitter:description')?.content || '',
    image: twitterTags.find(tag => tag.name === 'twitter:image')?.content || '',
    site: twitterTags.find(tag => tag.name === 'twitter:site')?.content || '',
    creator: twitterTags.find(tag => tag.name === 'twitter:creator')?.content || ''
  };
};

export default {
  generateTwitterCardTags,
  generateTwitterEnhancements,
  validateTwitterCards,
  getTwitterPreviewData,
  twitterConfig
};