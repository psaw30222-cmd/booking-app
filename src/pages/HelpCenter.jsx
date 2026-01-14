import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

// Import SEO strategy files
import aeoStrategy from '../seo/aeo-content-strategy.json';
import zeroClickOptimization from '../seo/zero-click-optimization.json';

const HelpCenter = () => {
  // Prepare FAQ schema for structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ...aeoStrategy.faqSections.generalSafety.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      })),
      ...aeoStrategy.faqSections.bookingProcess.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    ]
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.escortmumbaii.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Help Center",
        "item": "https://bookease.com/help-center"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Help Center - Frequently Asked Questions | BookEase"
        description="Get answers to common questions about booking escorts, safety, verification, and services. Find information about rates, locations, and booking processes."
        canonical="https://www.escortmumbaii.in/help-center"
        entityType="webpage"
        lang="en-IN"
        faqSchema={faqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { 
            name: 'keywords', 
            content: 'escort help, booking questions, safety FAQs, escort services help, booking process, verification help'
          }
        ]}
      />

      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Help Center
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Find answers to frequently asked questions about our services, booking process, safety measures, and more.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Links */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6 text-center">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link 
              to="#safety" 
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-neutral-200"
            >
              <h3 className="font-bold text-neutral-900 mb-2">Safety & Verification</h3>
              <p className="text-sm text-neutral-600">Learn about safety measures</p>
            </Link>
            <Link 
              to="#booking" 
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-neutral-200"
            >
              <h3 className="font-bold text-neutral-900 mb-2">Booking Process</h3>
              <p className="text-sm text-neutral-600">How to book safely</p>
            </Link>
            <Link 
              to="#services" 
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-neutral-200"
            >
              <h3 className="font-bold text-neutral-900 mb-2">Services & Pricing</h3>
              <p className="text-sm text-neutral-600">Service types and costs</p>
            </Link>
          </div>
        </section>

        {/* Safety & Verification FAQ */}
        <section id="safety" className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 border-b pb-4">
            Safety & Verification
          </h2>
          
          <div className="space-y-6">
            {aeoStrategy.faqSections.generalSafety.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  {faq.answer}
                </p>
                
                {/* Related keywords for SEO */}
                <div className="flex flex-wrap gap-2">
                  {faq.targetKeywords.map((keyword, kwIndex) => (
                    <span 
                      key={kwIndex}
                      className="inline-block bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Process FAQ */}
        <section id="booking" className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 border-b pb-4">
            Booking Process
          </h2>
          
          <div className="space-y-6">
            {aeoStrategy.faqSections.bookingProcess.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  {faq.answer}
                </p>
                
                {/* Related keywords for SEO */}
                <div className="flex flex-wrap gap-2">
                  {faq.targetKeywords.map((keyword, kwIndex) => (
                    <span 
                      key={kwIndex}
                      className="inline-block bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Service Information FAQ */}
        <section id="services" className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 border-b pb-4">
            Services & Pricing
          </h2>
          
          <div className="space-y-6">
            {aeoStrategy.faqSections.serviceInformation.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  {faq.answer}
                </p>
                
                {/* Related keywords for SEO */}
                <div className="flex flex-wrap gap-2">
                  {faq.targetKeywords.map((keyword, kwIndex) => (
                    <span 
                      key={kwIndex}
                      className="inline-block bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Direct Answer Box for High-Value Queries */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Quick Answers to Common Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-neutral-900 mb-2">
                Escort rates in India?
              </h3>
              <p className="text-neutral-700 text-sm">
                Rates range from ₹2,000-50,000+ depending on services and location. Basic companionship starts at ₹2,000/hour while premium VIP services can cost ₹20,000+/hour.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-neutral-900 mb-2">
                How to verify escort authenticity?
              </h3>
              <p className="text-neutral-700 text-sm">
                Check verified badges on BookEase, request video calls, confirm government ID, read platform reviews, and use secure booking channels with customer protection.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-neutral-700 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is ready to help you with any inquiries about our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact-us" 
              className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors"
            >
              Contact Support
            </Link>
            <Link 
              to="/chat" 
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors border border-pink-200"
            >
              Live Chat
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpCenter;