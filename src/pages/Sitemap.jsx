import React from 'react';
import HtmlSitemap from '../components/HtmlSitemap';
import SEO from '../components/SEO';

/**
 * Dedicated Sitemap Page for BookEase
 * Implements AI-optimized HTML sitemap for better SEO and user experience
 */

const SitemapPage = () => {
  // AI-optimized SEO metadata for the sitemap page
  const seoData = {
    title: 'Complete Site Map - BookEase | Verified Companion Services Directory',
    description: 'Navigate our comprehensive directory of verified companion services across India. Find escorts in Mumbai, Delhi, Bangalore and other major cities.',
    canonical: 'https://bookease.com/sitemap',
    image: 'https://bookease.com/images/sitemap-preview.jpg',
    jsonLd: [{
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'BookEase Sitemap',
      'url': 'https://bookease.com/',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://bookease.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }]
  };

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        canonical={seoData.canonical}
        image={seoData.image}
        jsonLd={seoData.jsonLd}
        entityType="website"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                BookEase Site Map
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Your comprehensive guide to finding verified companion services across India
              </p>
            </div>
          </div>
        </div>

        {/* Main Sitemap Content */}
        <main className="py-8">
          <HtmlSitemap />
        </main>

        {/* Additional SEO Elements */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Use Our Site Map?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Navigation</h3>
                <p className="text-gray-600">
                  Quickly find the services you need in your city with our organized directory structure
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Services</h3>
                <p className="text-gray-600">
                  All listed services are thoroughly verified for your safety and peace of mind
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Discovery</h3>
                <p className="text-gray-600">
                  Skip the search and go directly to what you're looking for with our intuitive layout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SitemapPage;