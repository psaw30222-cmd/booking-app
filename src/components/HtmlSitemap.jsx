import React from 'react';
import { Link } from 'react-router-dom';

/**
 * AI-Optimized HTML Sitemap Component for BookEase
 * Provides user-friendly navigation while maintaining SEO benefits
 */

// AI-optimized sitemap structure for better user experience
const SitemapSection = ({ title, pages, sectionClass = '' }) => (
  <div className={`mb-8 ${sectionClass}`}>
    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
      {title}
    </h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {pages.map((page, index) => (
        <li key={`${page.path}-${index}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100">
          <Link
            to={page.path}
            className="block group"
            title={page.description}
          >
            <h3 className="font-semibold text-blue-600 group-hover:text-blue-800 transition-colors mb-1">
              {page.title}
            </h3>
            <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              {page.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const HtmlSitemap = ({ className = '' }) => {
  // Organized sitemap data structure
  const sitemapData = {
    mainPages: [
      { path: '/', title: 'Home', description: 'Book verified companion services across India' },
      { path: '/blog', title: 'Blog', description: 'Latest articles and guides about our services' },
      { path: '/help-center', title: 'Help Center', description: 'Get answers to common questions' },
      { path: '/contact-us', title: 'Contact Us', description: 'Reach out to our support team' },
      { path: '/company', title: 'About Company', description: 'Learn about BookEase mission and values' },
      { path: '/network', title: 'Our Network', description: 'Discover our nationwide service network' }
    ],

    cityPages: [
      { path: '/mumbai', title: 'Mumbai Escorts', description: 'Verified companions in Mumbai' },
      { path: '/delhi', title: 'Delhi Escorts', description: 'Professional services in Delhi NCR' },
      { path: '/bangalore', title: 'Bangalore Escorts', description: 'Trusted escorts in Bangalore' },
      { path: '/pune', title: 'Pune Escorts', description: 'Discreet services in Pune' },
      { path: '/hyderabad', title: 'Hyderabad Escorts', description: 'Premium companions in Hyderabad' },
      { path: '/chennai', title: 'Chennai Escorts', description: 'Verified services in Chennai' },
      { path: '/kolkata', title: 'Kolkata Escorts', description: 'Professional escorts in Kolkata' },
      { path: '/ahmedabad', title: 'Ahmedabad Escorts', description: 'Trusted companions in Ahmedabad' },
      { path: '/goa', title: 'Goa Escorts', description: 'Vacation companion services in Goa' },
      { path: '/jaipur', title: 'Jaipur Escorts', description: 'Verified escorts in Jaipur' }
    ],

    servicePages: [
      { path: '/service/1', title: 'Premium Companionship', description: 'High-end escort services' },
      { path: '/service/2', title: 'Discreet Meetings', description: 'Private and confidential services' },
      { path: '/service/3', title: 'Event Companionship', description: 'Professional event attendance' },
      { path: '/service/4', title: 'Travel Companions', description: 'Accompanied travel experiences' },
      { path: '/service/5', title: 'Dinner Dates', description: 'Elegant dining companionship' },
      { path: '/service/6', title: 'Special Occasions', description: 'Companions for celebrations' }
    ],

    legalPages: [
      { path: '/terms-and-conditions', title: 'Terms & Conditions', description: 'Our service agreement' },
      { path: '/privacy-policy', title: 'Privacy Policy', description: 'How we protect your data' },
      { path: '/cookie-policy', title: 'Cookie Policy', description: 'Cookie usage information' },
      { path: '/security', title: 'Security', description: 'Safety measures and protocols' }
    ],

    specialPages: [
      { path: '/bakeca-incontri', title: 'Bakeca Incontri', description: 'Special companion services' }
    ]
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
      {/* SEO Header */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Complete Site Map
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Navigate our comprehensive directory of verified companion services across India. 
          Find exactly what you're looking for with our organized sitemap.
        </p>
      </header>

      {/* Main Navigation Section */}
      <SitemapSection 
        title="Main Pages" 
        pages={sitemapData.mainPages}
        sectionClass="bg-blue-50 p-6 rounded-xl"
      />

      {/* City Services Section */}
      <SitemapSection 
        title="City Services" 
        pages={sitemapData.cityPages}
        sectionClass="bg-green-50 p-6 rounded-xl"
      />

      {/* Service Types Section */}
      <SitemapSection 
        title="Service Categories" 
        pages={sitemapData.servicePages}
        sectionClass="bg-purple-50 p-6 rounded-xl"
      />

      {/* Legal Information Section */}
      <SitemapSection 
        title="Legal Information" 
        pages={sitemapData.legalPages}
        sectionClass="bg-yellow-50 p-6 rounded-xl"
      />

      {/* Special Services Section */}
      <SitemapSection 
        title="Special Services" 
        pages={sitemapData.specialPages}
        sectionClass="bg-red-50 p-6 rounded-xl"
      />

      {/* SEO Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><Link to="/help-center" className="hover:text-blue-600">Help Center</Link></li>
              <li><Link to="/contact-us" className="hover:text-blue-600">Contact Support</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600">Latest Articles</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Popular Cities</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><Link to="/mumbai" className="hover:text-blue-600">Mumbai Escorts</Link></li>
              <li><Link to="/delhi" className="hover:text-blue-600">Delhi Escorts</Link></li>
              <li><Link to="/bangalore" className="hover:text-blue-600">Bangalore Escorts</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Legal Info</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><Link to="/terms-and-conditions" className="hover:text-blue-600">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="/security" className="hover:text-blue-600">Security Measures</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          <p className="mt-2">© {new Date().getFullYear()} BookEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HtmlSitemap;