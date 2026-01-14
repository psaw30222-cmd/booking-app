import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

/**
 * AI-Optimized Custom 404 Page for BookEase
 * Provides helpful navigation while maintaining SEO value
 */

const Custom404 = () => {
  const location = useLocation();
  const [suggestedPages, setSuggestedPages] = useState([]);
  
  // AI-powered page suggestions based on URL patterns
  const getSuggestions = () => {
    const path = location.pathname.toLowerCase();
    const suggestions = [];

    // City-based suggestions
    const cities = ['mumbai', 'delhi', 'bangalore', 'pune', 'hyderabad', 'chennai', 'kolkata', 'ahmedabad'];
    const matchedCity = cities.find(city => path.includes(city));

    if (matchedCity) {
      suggestions.push({
        title: `${matchedCity.charAt(0).toUpperCase() + matchedCity.slice(1)} Escorts`,
        path: `/${matchedCity}`,
        description: `Verified companion services in ${matchedCity}`,
        icon: '🏙️'
      });
    }

    // Service-based suggestions
    if (path.includes('service') || path.includes('escort') || path.includes('companion')) {
      suggestions.push({
        title: 'Premium Companionship',
        path: '/service/1',
        description: 'High-end escort services',
        icon: '👑'
      });
      suggestions.push({
        title: 'Discreet Meetings',
        path: '/service/2',
        description: 'Private and confidential services',
        icon: '🔒'
      });
    }

    // Location-based suggestions
    if (path.includes('location') || path.includes('area')) {
      suggestions.push({
        title: 'Mumbai',
        path: '/mumbai',
        description: 'Escort services in Mumbai',
        icon: '🌆'
      });
      suggestions.push({
        title: 'Delhi',
        path: '/delhi',
        description: 'Professional services in Delhi NCR',
        icon: '🏛️'
      });
    }

    // Add popular pages if no specific matches
    if (suggestions.length === 0) {
      suggestions.push({
        title: 'Mumbai Escorts',
        path: '/mumbai',
        description: 'Most popular destination for verified companions',
        icon: '⭐'
      });
      suggestions.push({
        title: 'Help Center',
        path: '/help-center',
        description: 'Get answers to common questions',
        icon: '❓'
      });
      suggestions.push({
        title: 'Blog',
        path: '/blog',
        description: 'Latest articles and guides',
        icon: '📝'
      });
    }

    // Always include homepage
    suggestions.unshift({
      title: 'Return to Homepage',
      path: '/',
      description: 'BookEase - Verified Companion Services',
      icon: '🏠'
    });

    return suggestions.slice(0, 6); // Limit to 6 suggestions
  };

  useEffect(() => {
    setSuggestedPages(getSuggestions());
  }, [location.pathname]);
  
  // AI-optimized SEO metadata for 404 page
  const seoData = {
    title: `Page Not Found | BookEase - Verified Companion Services`,
    description: `The page you're looking for doesn't exist. Find verified companion services in Mumbai, Delhi, Bangalore and other major Indian cities.`,
    canonical: `https://bookease.com/404`,
    entityType: 'website'
  };
  
  // Track 404 errors for analytics
  useEffect(() => {
    // Log 404 error for monitoring
    if (window.gtag) {
      window.gtag('event', '404_error', {
        page_location: window.location.href,
        referrer: document.referrer
      });
    }
  }, []);
  
  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        canonical={seoData.canonical}
        entityType={seoData.entityType}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center">
          {/* Error Header */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
              <span className="text-4xl font-bold text-red-600">404</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Oops! The page you're looking for doesn't exist.
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The URL <span className="font-mono bg-gray-100 px-2 py-1 rounded">{location.pathname}</span> could not be found. 
              Don't worry, we can help you find what you're looking for.
            </p>
          </div>
          
          {/* Helpful Navigation */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Navigation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedPages.map((page, index) => (
                <Link 
                  key={index}
                  to={page.path}
                  className="group block p-4 rounded-xl border-2 border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{page.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 group-hover:text-red-700 transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {page.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Search Option */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't find what you need?</h2>
            <p className="text-gray-600 mb-6">
              Try searching for specific services or locations
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for services, cities..."
                  className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer Navigation */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <Link to="/" className="hover:text-red-600 transition-colors">Homepage</Link>
            <span>•</span>
            <Link to="/help-center" className="hover:text-red-600 transition-colors">Help Center</Link>
            <span>•</span>
            <Link to="/contact-us" className="hover:text-red-600 transition-colors">Contact Us</Link>
            <span>•</span>
            <Link to="/sitemap" className="hover:text-red-600 transition-colors">Site Map</Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Verified Profiles</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Discreet Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Safe Booking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;