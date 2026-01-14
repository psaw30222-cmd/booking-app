import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholder = '/placeholder-image.jpg',
  loading = 'lazy',
  decoding = 'async',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!loading || loading === 'eager');
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer for better lazy loading performance
  useEffect(() => {
    if (loading === 'eager' || priority) {
      return;
    }

    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.1
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loading, priority]);

  // Handle image load
  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Handle image error
  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Check if image is already loaded
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && isInView) {
      setIsLoading(false);
    }
  }, [isInView]);

  // AI-optimized alt text generation helper
  const generateAltText = (baseAlt) => {
    // Add semantic keywords and location context
    const semanticKeywords = [
      'verified', 'professional', 'discreet', 'safe', 'premium'
    ];
    
    // Extract location and service from URL if not provided
    const urlParts = src?.split('/') || [];
    const fileName = urlParts[urlParts.length - 1]?.split('.')[0] || '';
    
    if (!baseAlt && fileName) {
      // Generate AI-like alt text based on filename
      const parts = fileName.split('-');
      const serviceType = parts[0] || 'escort';
      const location = parts[1] || 'India';
      const area = parts[2] || 'major cities';
      
      return `Verified ${serviceType} ${location} - Professional companion in ${area} - ID verified profile`;
    }
    
    return baseAlt || `Verified escort service image - Professional companion`;
  };

  const optimizedAlt = generateAltText(alt);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Loading State */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Image unavailable</div>
        </div>
      )}

      {/* Actual Image */}
      <img
        ref={imgRef}
        src={hasError ? placeholder : src}
        alt={optimizedAlt}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${hasError ? 'blur-sm' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {/* SEO Enhancement - Hidden but crawlable text */}
      <div className="sr-only">
        Image of {optimizedAlt}. Part of verified escort services in India.
        Professional companions available 24/7 with discreet, safe booking.
      </div>
    </div>
  );
};

export default LazyImage;