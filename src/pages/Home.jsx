import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

// Import AEO content strategy
import aeoStrategy from '../seo/aeo-content-strategy.json';

// Import enhanced schema utilities for Technical SEO II
import {
  buildEnhancedOrganizationSchema,
  buildProductSchema,
  buildReviewSchema
} from '../utils/schema';

const Home = () => {
  const topCities = [
    { name: "Mumbai", slug: "mumbai", count: "500+" },
    { name: "Delhi", slug: "delhi", count: "450+" },
    { name: "Bangalore", slug: "bangalore", count: "400+" },
    { name: "Pune", slug: "pune", count: "300+" },
    { name: "Hyderabad", slug: "hyderabad", count: "250+" },
    { name: "Chennai", slug: "chennai", count: "200+" },
  ];

  // Enhanced structured data with FAQ schema for AEO
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BookEase",
    "url": "https://www.escortmumbaii.in",
    "description": "Premium verified adult companion and escort services directory in India with 2000+ profiles",
    "audience": {
      "@type": "PeopleAudience",
      "requiredMinAge": 18
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.escortmumbaii.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // FAQ Schema for featured snippets
  const faqSchema = aeoStrategy.faqSections.generalSafety;
  
  // Article schema for blog content
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Complete Guide to Verified Escort Services in India",
    "description": "Learn how to safely find and book verified escorts through reputable platforms like BookEase",
    "author": {
      "@type": "Organization",
      "name": "BookEase Editorial Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BookEase",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.escortmumbaii.in/logo.png"
      }
    },
    "datePublished": new Date().toISOString().split('T')[0],
    "dateModified": new Date().toISOString().split('T')[0]
  };

  // Voice-optimized FAQ schema for rich snippets
  const voiceFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I find verified escorts in Mumbai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can find verified escorts in Mumbai through reputable platforms like BookEase that offer ID-verified profiles with authentic photos. Look for companions in popular areas like Andheri, Bandra, and Juhu who are available 24/7 with discreet, safe service. Always verify authenticity before booking."
        }
      },
      {
        "@type": "Question",
        "name": "Are escort services available tonight in Delhi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, verified escort services are available tonight in Delhi through platforms like BookEase. You can find companions in Connaught Place, Karol Bagh, and other NCR areas who offer 24/7 service with real-time availability updates and safe, discreet booking options."
        }
      },
      {
        "@type": "Question",
        "name": "What safety measures should I take when booking escorts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Always verify the escort's identity through video call first, use reputable platforms with ID verification, share your location with trusted friends, and meet in safe, populated areas initially. Book through official channels and confirm pricing before meeting to ensure a safe, discreet experience."
        }
      }
    ]
  };

  // Enhanced Organization schema for Technical SEO II
  const enhancedOrgSchema = buildEnhancedOrganizationSchema();

  // Product schemas for featured services
  const productSchemas = services.slice(0, 3).map(service => {
    const sampleReviews = [
      { author: "Anonymous Client", rating: 5, text: "Excellent service, highly professional and discreet.", date: "2026-01-10" },
      { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience.", date: "2026-01-08" }
    ];
    return buildProductSchema(service, sampleReviews);
  });

  // Review schemas for testimonials
  const reviewSchemas = [
    buildReviewSchema({
      author: "Satisfied Client",
      rating: 5,
      text: "Outstanding service from BookEase. Verified companions, safe booking, and professional experience.",
      date: "2026-01-12"
    }, "BookEase Escort Services"),
    buildReviewSchema({
      author: "Premium Member",
      rating: 5,
      text: "Best platform for verified escorts in India. 24/7 availability and complete discretion guaranteed.",
      date: "2026-01-10"
    }, "BookEase Escort Services")
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Verified Escorts India 2026 — 2000+ Profiles | BookEase Premium"
        description="✓ 2000+ verified escorts ✓ 500+ cities ✓ 24/7 service ✓ 100% discreet. Book premium companions in Mumbai, Delhi, Bangalore. 18+ only. Verified today!"
        canonical="https://www.escortmumbaii.in/"
        entityType="website"
        jsonLd={[websiteSchema, articleSchema, enhancedOrgSchema, ...productSchemas, ...reviewSchemas]}
        faqSchema={voiceFaqSchema}
        meta={[{ name: 'keywords', content: 'verified escorts India, escorts in India, 2000+ verified profiles, 500+ cities, 24/7 escort service, safe escort booking' }]}
        // Web Core Vitals optimizations
        preloadResources={[
          { href: '/logo.png', as: 'image', type: 'image/png' },
          { href: '/hero-image.jpg', as: 'image', type: 'image/jpeg' }
        ]}
        prefetchResources={[
          { href: '/mumbai', as: 'document' },
          { href: '/delhi', as: 'document' }
        ]}
        dnsPrefetchDomains={[
          'https://fonts.googleapis.com',
          'https://fonts.gstatic.com',
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com'
        ]}
      />

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Verified Escorts India 2026 — Premium Companion Services Across 500+ Cities
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Browse 2000+ verified profiles of independent escorts and professional companions.
            Available 24/7 across major Indian cities with discreet meetings, safe transactions, and confidential service. 18+ only.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/mumbai"
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            >
              Mumbai Escorts
            </Link>
            <Link 
              to="/delhi"
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            >
              Delhi Escorts
            </Link>
            <Link 
              to="/bangalore"
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            >
              Bangalore Escorts
            </Link>
          </div>
        </div>
      </section>

      {/* Top Cities */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Browse by City
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              to={`/${city.slug}`}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-neutral-200"
            >
              <h3 className="font-bold text-neutral-900 text-lg mb-2">{city.name}</h3>
              <span className="text-pink-600 font-semibold">{city.count} Profiles</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Featured Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* FAQ Section for AEO Optimization */}
      <section className="container mx-auto px-4 py-12 bg-white rounded-2xl shadow-sm">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Voice-optimized FAQ for featured snippets */}
          <div className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-neutral-900 mb-3 flex items-start gap-3">
              <span className="text-pink-600 font-bold text-lg">Q1.</span>
              How can I find verified escorts in Mumbai?
            </h3>
            <div className="ml-8">
              <p className="text-neutral-700 leading-relaxed">
                You can find verified escorts in Mumbai through reputable platforms like BookEase that offer ID-verified profiles with authentic photos. Look for companions in popular areas like Andheri, Bandra, and Juhu who are available 24/7 with discreet, safe service. Always verify authenticity before booking.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-block bg-pink-50 text-pink-700 px-2 py-1 rounded text-sm">Mumbai escorts</span>
                <span className="inline-block bg-pink-50 text-pink-700 px-2 py-1 rounded text-sm">verified profiles</span>
                <span className="inline-block bg-pink-50 text-pink-700 px-2 py-1 rounded text-sm">Andheri escorts</span>
              </div>
            </div>
          </div>
          
          <div className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-neutral-900 mb-3 flex items-start gap-3">
              <span className="text-pink-600 font-bold text-lg">Q2.</span>
              Are escort services available tonight in Delhi?
            </h3>
            <div className="ml-8">
              <p className="text-neutral-700 leading-relaxed">
                Yes, verified escort services are available tonight in Delhi through platforms like BookEase. You can find companions in Connaught Place, Karol Bagh, and other NCR areas who offer 24/7 service with real-time availability updates and safe, discreet booking options.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-block bg-pink-50 text-pink-700 px-2 py-1 rounded text-sm">Delhi escorts</span>
                <span className="inline-block bg-pink-50 text-pink-700 px-2 py-1 rounded text-sm">available tonight</span>
                <span className="inline-block bg-pink-50 text-pink-700 px-2 py-1 rounded text-sm">24/7 service</span>
              </div>
            </div>
          </div>
          
          <div className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-neutral-900 mb-3 flex items-start gap-3">
              <span className="text-pink-600 font-bold text-lg">Q3.</span>
              What safety measures should I take when booking escorts?
            </h3>
            <div className="ml-8">
              <p className="text-neutral-700 leading-relaxed">
                Always verify the escort's identity through video call first, use reputable platforms with ID verification, share your location with trusted friends, and meet in safe, populated areas initially. Book through official channels and confirm pricing before meeting to ensure a safe, discreet experience.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-block bg-pink-50 text-pink-700 px-2 py-1 rounded text-sm">safety tips</span>
                <span className="inline-block bg-pink-50 text-pink-700 px-2 py-1 rounded text-sm">ID verified</span>
                <span className="inline-block bg-pink-50 text-pink-700 px-2 py-1 rounded text-sm">safe booking</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/help-center" 
              className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors"
            >
              View All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            About BookEase - India's Premier Adult Services Directory
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Welcome to BookEase, India's most trusted platform for booking premium adult companion 
              services. We connect you with verified, professional escorts and independent companions across major 
              Indian cities including Mumbai, Delhi, Bangalore, Pune, Hyderabad, and more. Our trusted platform 
              ensures safe transactions and discreet meetings for all clients.
            </p>

            <h3 className="text-xl font-bold text-neutral-900 mt-6 mb-3">Why Choose BookEase?</h3>
            <ul>
              <li><strong>Verified Profiles:</strong> All companions are <Link to="/safety" className="text-pink-600 hover:underline">ID verified with authentic photos</Link>, ensuring complete transparency and trust for safe bookings with verified authenticity</li>
              <li><strong>24/7 Availability:</strong> Services available round the clock in all major cities with <Link to="/help-center" className="text-pink-600 hover:underline">real-time availability updates</Link> and immediate booking options</li>
              <li><strong>Discreet Service:</strong> Your privacy is our top priority with confidential booking, discreet meetings, and secure transactions</li>
              <li><strong>Safe Booking:</strong> Secure platform with trusted companions, verified authenticity guarantees, and background-checked profiles</li>
              <li><strong>Wide Selection:</strong> 2000+ verified profiles of independent escorts and professional companions across 500+ cities</li>
              <li><strong>Professional Service:</strong> Experienced, courteous companions with background-checked profiles and premium companion services</li>
            </ul>

            <h3 className="text-xl font-bold text-neutral-900 mt-6 mb-3">Cities We Serve</h3>
            <p>
              We provide comprehensive coverage across India's major metropolitan areas:
            </p>
            <ul>
              <li><Link to="/mumbai" className="text-pink-600 hover:underline">Mumbai Escorts</Link> - 500+ verified profiles</li>
              <li><Link to="/delhi" className="text-pink-600 hover:underline">Delhi Escorts</Link> - 450+ verified profiles</li>
              <li><Link to="/bangalore" className="text-pink-600 hover:underline">Bangalore Escorts</Link> - 400+ verified profiles</li>
              <li><Link to="/pune" className="text-pink-600 hover:underline">Pune Escorts</Link> - 300+ verified profiles</li>
              <li><Link to="/hyderabad" className="text-pink-600 hover:underline">Hyderabad Escorts</Link> - 250+ verified profiles</li>
            </ul>

            <h3 className="text-xl font-bold text-neutral-900 mt-6 mb-3">How It Works</h3>
            <ol>
              <li>Browse verified profiles in your preferred city</li>
              <li>Check availability, services offered, and rates</li>
              <li>Contact via phone or WhatsApp</li>
              <li>Confirm your booking details</li>
              <li>Enjoy professional, discreet service</li>
            </ol>

            <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg mt-6">
              <strong>Important:</strong> This service is restricted to adults aged 18 and above only. 
              We strictly comply with all applicable laws and regulations. Please ensure you are of 
              legal age before accessing our services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;