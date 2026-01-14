/**
 * AI-Optimized Social Media Manager for BookEase
 * Unified management of Open Graph and Twitter Card implementations
 */

import { 
  generateOpenGraphTags, 
  generateFacebookExtensions,
  generateVideoTags,
  generateAudioTags,
  validateOpenGraph 
} from './openGraphManager';

import { 
  generateTwitterCardTags,
  generateTwitterEnhancements,
  validateTwitterCards,
  getTwitterPreviewData
} from './twitterCardManager';

/**
 * Generate complete social media metadata
 * @param {Object} pageData - Comprehensive page metadata
 * @returns {Object} Complete social media tags and validation
 */
export const generateSocialMediaMetadata = (pageData) => {
  const {
    title,
    description,
    canonicalUrl,
    contentType = 'website',
    imageData = {},
    city = '',
    serviceName = '',
    articleData = {},
    appData = {},
    playerData = {},
    deepLink = '',
    label1 = '',
    data1 = '',
    label2 = '',
    data2 = ''
  } = pageData;
  
  // Prepare data for both systems
  const sharedData = {
    title,
    description,
    canonicalUrl,
    contentType,
    imageData,
    city,
    serviceName,
    articleData
  };
  
  // Generate Open Graph tags
  const ogTags = generateOpenGraphTags(sharedData);
  const facebookExtensions = generateFacebookExtensions(sharedData);
  
  // Generate Twitter Card tags
  const twitterData = {
    ...sharedData,
    appData,
    playerData,
    deepLink,
    label1,
    data1,
    label2,
    data2
  };
  
  const twitterTags = generateTwitterCardTags(twitterData);
  const twitterEnhancements = generateTwitterEnhancements(twitterData);
  
  // Combine all social media tags
  const allSocialTags = [
    ...ogTags,
    ...facebookExtensions,
    ...twitterTags,
    ...twitterEnhancements
  ];
  
  // Add video/audio tags if applicable
  if (playerData?.videoUrl) {
    allSocialTags.push(...generateVideoTags(playerData));
  }
  
  if (playerData?.audioUrl) {
    allSocialTags.push(...generateAudioTags(playerData));
  }
  
  // Validation
  const ogValidation = validateOpenGraph(ogTags);
  const twitterValidation = validateTwitterCards(twitterTags);
  
  return {
    // All generated tags
    socialTags: allSocialTags,
    
    // Individual tag sets
    openGraphTags: ogTags,
    facebookExtensions,
    twitterCardTags: twitterTags,
    twitterEnhancements,
    
    // Validation results
    validation: {
      openGraph: ogValidation,
      twitter: twitterValidation,
      overallValid: ogValidation.isValid && twitterValidation.isValid
    },
    
    // Preview data for testing
    previews: {
      twitter: getTwitterPreviewData(twitterData)
    }
  };
};



/**
 * Social media testing utilities
 */
export const socialMediaTesting = {
  /**
   * Generate test data for different page types
   */
  getTestData: (pageType) => {
    const testData = {
      homepage: {
        title: 'BookEase - Verified Companion Services Across India',
        description: 'Find verified, discreet companion services in Mumbai, Delhi, Bangalore and other major Indian cities. Safe bookings with verified profiles.',
        canonicalUrl: 'https://bookease.com/',
        contentType: 'homepage',
        imageData: {
          url: 'https://bookease.com/images/social/homepage-og.jpg',
          alt: 'BookEase - Verified Companion Services'
        }
      },
      
      cityPage: {
        title: 'Mumbai Escorts - Verified Companion Services | BookEase',
        description: 'Verified escorts and companion services in Mumbai. Discreet bookings with verified profiles. Professional service guaranteed.',
        canonicalUrl: 'https://bookease.com/mumbai',
        contentType: 'city',
        city: 'mumbai',
        imageData: {
          url: 'https://bookease.com/images/social/mumbai-og.jpg',
          alt: 'Verified Mumbai Companion Services'
        }
      },
      
      servicePage: {
        title: 'Premium Companionship Services | BookEase',
        description: 'High-end companion services for special occasions. Verified professionals with discreet service guarantee.',
        canonicalUrl: 'https://bookease.com/service/1',
        contentType: 'service',
        serviceName: 'Premium Companionship',
        imageData: {
          url: 'https://bookease.com/images/social/service-og.jpg',
          alt: 'Premium Companion Services'
        }
      },
      
      blogPost: {
        title: 'How to Choose the Right Companion Service | BookEase Blog',
        description: 'Expert guide on selecting verified companion services. Learn what to look for and how to ensure safe, professional experiences.',
        canonicalUrl: 'https://bookease.com/blog/choosing-right-companion',
        contentType: 'blog',
        articleData: {
          publishedTime: '2026-01-14T10:00:00Z',
          modifiedTime: '2026-01-14T10:00:00Z',
          author: 'BookEase Team',
          section: 'Guides'
        },
        imageData: {
          url: 'https://bookease.com/images/social/blog-og.jpg',
          alt: 'Companion Service Selection Guide'
        }
      }
    };
    
    return testData[pageType] || testData.homepage;
  },
  
  /**
   * Test social media metadata generation
   */
  testGeneration: (pageType) => {
    const testData = socialMediaTesting.getTestData(pageType);
    const result = generateSocialMediaMetadata(testData);
    
    console.log(`=== Social Media Test: ${pageType} ===`);
    console.log('Generated Tags Count:', result.socialTags.length);
    console.log('Open Graph Valid:', result.validation.openGraph.isValid);
    console.log('Twitter Valid:', result.validation.twitter.isValid);
    console.log('Overall Valid:', result.validation.overallValid);
    
    if (!result.validation.overallValid) {
      console.log('Issues Found:');
      if (!result.validation.openGraph.isValid) {
        console.log('  OG Issues:', result.validation.openGraph.missingTags);
      }
      if (!result.validation.twitter.isValid) {
        console.log('  Twitter Issues:', result.validation.twitter.missingTags);
      }
    }
    
    return result;
  }
};

export default {
  generateSocialMediaMetadata,
  socialMediaTesting
};