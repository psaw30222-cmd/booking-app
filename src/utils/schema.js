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
