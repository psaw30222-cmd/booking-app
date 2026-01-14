import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteOrganizationJsonLd } from '../data/siteMeta';
import { getCanonicalUrl, generateHreflangTags } from '../utils/canonicalHelper';
import { generateSocialMediaMetadata } from '../utils/socialMediaManager';

// Enhanced SEO component with Technical SEO II & Advanced Schema support

const SEO = ({
  title,
  description,
  canonical,
  image,
  jsonLd = [],
  meta = [],
  lang = 'en',
  faqSchema = null,
  articleSchema = null,
  breadcrumbSchema = null,
  productSchema = null,
  reviewSchema = null,
  howToSchema = null,
  eventSchema = null,
  entityType = 'website',
  currentPath = null,
  // Web Core Vitals optimizations
  preloadResources = [],
  prefetchResources = [],
  dnsPrefetchDomains = [],
  // Social Media enhancements
  city = '',
  serviceName = '',
  socialMediaData = {}
}) => {
  const defaultTitle = 'BookEase - Premium Companion Services';
  const defaultDescription = 'Find verified, discreet companion services across major Indian cities. Safe bookings, verified profiles, and professional service.';

  // AI-optimized canonical URL processing
  const finalCanonical = canonical || getCanonicalUrl(currentPath || window?.location?.pathname || '/');

  // Enhanced hreflang tags for international SEO
  const hreflangTags = generateHreflangTags(currentPath || window?.location?.pathname || '/');

  // Enhanced meta tags for Technical SEO II
  const enhancedMeta = [
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'bingbot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-title', content: 'BookEase' },
    // Core Web Vitals optimization
    { name: 'theme-color', content: '#dc2626' },
    { name: 'msapplication-TileColor', content: '#dc2626' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
    ...(meta || [])
  ];

  // Build comprehensive JSON-LD structure with advanced schemas
  const buildJsonLdStructure = () => {
    const baseJsonLd = [siteOrganizationJsonLd];

    // Add advanced schema types
    if (productSchema) baseJsonLd.push(productSchema);
    if (reviewSchema) baseJsonLd.push(reviewSchema);
    if (howToSchema) baseJsonLd.push(howToSchema);
    if (eventSchema) baseJsonLd.push(eventSchema);

    // Add page-specific schemas
    if (articleSchema) baseJsonLd.push(articleSchema);
    if (faqSchema) baseJsonLd.push(faqSchema);
    if (breadcrumbSchema) baseJsonLd.push(breadcrumbSchema);

    // Add custom JSON-LD
    if (Array.isArray(jsonLd)) {
      baseJsonLd.push(...jsonLd);
    } else if (jsonLd) {
      baseJsonLd.push(jsonLd);
    }

    return baseJsonLd;
  };

  const jsonLdStructure = buildJsonLdStructure();
  
  // Generate AI-optimized social media metadata
  const socialMediaMetadata = generateSocialMediaMetadata({
    title: title || defaultTitle,
    description: description || defaultDescription,
    canonicalUrl: finalCanonical,
    contentType: entityType,
    imageData: { url: image },
    city,
    serviceName,
    ...socialMediaData
  });

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={finalCanonical} />
      
      {/* Hreflang tags for international SEO */}
      {hreflangTags.map((tag, index) => (
        <link key={`hreflang-${index}`} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
      ))}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* AI-Enhanced Social Media Tags */}
      {socialMediaMetadata.socialTags.map((tag, index) => {
        if (tag.property) {
          return <meta key={`og-${index}`} property={tag.property} content={tag.content} />;
        } else if (tag.name) {
          return <meta key={`twitter-${index}`} name={tag.name} content={tag.content} />;
        }
        return null;
      })}
      
      {/* Web Core Vitals: Resource hints for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />

      {/* Custom DNS prefetch domains */}
      {dnsPrefetchDomains.map((domain, index) => (
        <link key={`dns-prefetch-${index}`} rel="dns-prefetch" href={domain} />
      ))}

      {/* Critical resource preloading */}
      {preloadResources.map((resource, index) => (
        <link
          key={`preload-${index}`}
          rel="preload"
          href={resource.href}
          as={resource.as}
          type={resource.type}
          crossOrigin={resource.crossOrigin}
        />
      ))}

      {/* Resource prefetching */}
      {prefetchResources.map((resource, index) => (
        <link
          key={`prefetch-${index}`}
          rel="prefetch"
          href={resource.href}
          as={resource.as}
        />
      ))}

      {/* Enhanced meta tags */}
      {enhancedMeta.map((m, i) => (
        <meta key={`meta-${i}`} {...m} />
      ))}

      {/* Comprehensive JSON-LD structured data */}
      {jsonLdStructure.map((obj, i) => (
        <script
          key={`jsonld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj, null, 2) }}
        />
      ))}
    </Helmet>
  );
};

export default SEO;
