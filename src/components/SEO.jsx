import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteOrganizationJsonLd } from '../data/siteMeta';

const SEO = ({
  title,
  description,
  canonical,
  image,
  jsonLd = [],
  meta = [],
  lang = 'en'
}) => {
  const defaultTitle = 'BookEase - Premium Companion Services';
  const defaultDescription = 'Find verified, discreet companion services across major Indian cities. Safe bookings, verified profiles, and professional service.';

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Extra meta entries */}
      {meta.map((m, i) => (
        <meta key={i} {...m} />
      ))}

      {/* JSON-LD structured data (site defaults merged with page-specific data) */}
      {(() => {
        const mergedJsonLd = [siteOrganizationJsonLd, ...(Array.isArray(jsonLd) ? jsonLd : (jsonLd ? [jsonLd] : []))];
        return mergedJsonLd.map((obj, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
        ));
      })()}
    </Helmet>
  );
};

export default SEO;
