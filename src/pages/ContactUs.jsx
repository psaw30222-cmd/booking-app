import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { trackEvent } from '../utils/analytics';



const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulate form submission
    setTimeout(() => {
      // Track contact form submission
      trackEvent('contact_submit', { method: 'form', page: 'contact-us' });

      setIsSubmitting(false);
      setSubmitMessage('Thank you for your message. Our team will contact you shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  // Contact information schema
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "BookEase",
      "url": "https://www.escortmumbaii.in",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9876543210",
        "contactType": "customer service",
        "availableLanguage": "English",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      }
    }
  };

  // FAQ schema for contact page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I contact BookEase support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can contact us through our contact form, WhatsApp, or email. We respond within 24 hours during business hours."
        }
      },
      {
        "@type": "Question",
        "name": "What information should I include when contacting support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Please include your name, contact details, and a clear description of your inquiry or issue. This helps us provide faster and more accurate assistance."
        }
      },
      {
        "@type": "Question",
        "name": "Is my communication with BookEase confidential?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all communications with BookEase are completely confidential and secure. We prioritize your privacy and data protection."
        }
      }
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
        "name": "Contact Us",
        "item": "https://www.escortmumbaii.in/contact-us"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Contact Us - Get in Touch with BookEase Support | 24/7 Available"
        description="Contact BookEase for verified escort services inquiries. 24/7 support, confidential communication, and professional assistance. Reach out via form, WhatsApp, or email."
        canonical="https://www.escortmumbaii.in/contact-us"
        entityType="contactpage"
        lang="en-IN"
        jsonLd={[contactSchema, faqSchema]}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          {
            name: 'keywords',
            content: 'contact BookEase, escort support, customer service, verified escorts contact, 24/7 support, confidential contact'
          }
        ]}
      />

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get in touch with our support team. We're here to help you with any questions about our verified escort services.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
            >
              WhatsApp Support
            </a>
            <a
              href="tel:+919876543210"
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="booking">Booking Assistance</option>
                  <option value="verification">Profile Verification</option>
                  <option value="safety">Safety Concerns</option>
                  <option value="technical">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-vertical"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitMessage && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">{submitMessage}</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Email Support</h3>
                    <p className="text-neutral-600">support@bookease.com</p>
                    <p className="text-sm text-neutral-500">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Phone Support</h3>
                    <a href="tel:+919876543210" className="text-neutral-600 hover:text-pink-600">+91 98765 43210</a>
                    <p className="text-sm text-neutral-500">24/7 available</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">WhatsApp</h3>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-pink-600">+91 98765 43210</a>
                    <p className="text-sm text-neutral-500">Instant messaging support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                <div className="border-b border-neutral-200 pb-4">
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    How quickly will I receive a response?
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    We typically respond within 24 hours during business hours. For urgent matters, please use WhatsApp for faster assistance.
                  </p>
                </div>

                <div className="border-b border-neutral-200 pb-4">
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Is my information secure?
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Yes, all communications are encrypted and confidential. We never share your personal information with third parties.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Can I remain anonymous?
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    We respect your privacy. You can choose to remain anonymous, though providing contact details helps us serve you better.
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/help-center"
                  className="text-pink-600 hover:text-pink-700 font-semibold"
                >
                  View All FAQs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
