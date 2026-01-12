import React, { useState } from 'react';
import SEO from '../components/SEO';

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = {
    general: {
      title: 'General Questions',
      icon: 'ℹ️',
      articles: [
        {
          id: 1,
          title: 'How do I create an account?',
          content: 'To create an account, click on the "Sign Up" button in the top right corner of our homepage. Fill in your details including name, email address, and password. Verify your email address by clicking the link sent to your inbox, and you\'re ready to start booking!'
        },
        {
          id: 2,
          title: 'How do I reset my password?',
          content: 'If you\'ve forgotten your password, click on the "Forgot Password" link on the login page. Enter your email address and we\'ll send you instructions to reset your password. Check your inbox and follow the steps to create a new password.'
        },
        {
          id: 3,
          title: 'How do I update my profile information?',
          content: 'To update your profile, log in to your account and click on your profile icon in the top right corner. Select "Account Settings" and you can update your personal information, contact details, and preferences.'
        }
      ]
    },
    booking: {
      title: 'Booking Issues',
      icon: '📅',
      articles: [
        {
          id: 4,
          title: 'How do I make a booking?',
          content: 'To make a booking, browse our services and select the one you\'re interested in. Choose your preferred date and time, enter your details, and complete the payment process. You\'ll receive a confirmation email with your booking details.'
        },
        {
          id: 5,
          title: 'Can I modify my booking?',
          content: 'Yes, you can modify your booking depending on the service provider\'s policies. Go to "My Bookings" in your account, find the booking you want to modify, and click "Modify". Note that some changes may incur additional fees.'
        },
        {
          id: 6,
          title: 'How do I cancel a booking?',
          content: 'To cancel a booking, go to "My Bookings" in your account, find the booking you want to cancel, and click "Cancel". Cancellation policies vary by service provider, and refunds are processed according to their specific terms.'
        }
      ]
    },
    payment: {
      title: 'Payment Questions',
      icon: '💳',
      articles: [
        {
          id: 7,
          title: 'What payment methods do you accept?',
          content: 'We accept various payment methods including credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and other digital payment methods. The available options will be displayed during the checkout process.'
        },
        {
          id: 8,
          title: 'Is my payment information secure?',
          content: 'Yes, we use industry-standard security measures to protect your payment information. All transactions are processed through secure, encrypted connections, and we comply with PCI DSS standards for payment security.'
        },
        {
          id: 9,
          title: 'When will I be charged?',
          content: 'You will be charged at the time of booking. The exact amount will be displayed before you confirm your booking, and you\'ll receive a receipt via email once the payment is processed successfully.'
        }
      ]
    },
    cancellation: {
      title: 'Cancellation Policies',
      icon: '🔄',
      articles: [
        {
          id: 10,
          title: 'What is the cancellation policy?',
          content: 'Cancellation policies vary by service provider. Some services offer free cancellation up to 24 hours before the booking, while others may have different terms. Check the specific cancellation policy for each booking in your confirmation email.'
        },
        {
          id: 11,
          title: 'How do I request a refund?',
          content: 'Refunds are processed according to the service provider\'s policy. If eligible, refunds will be issued to the original payment method within 5-10 business days. You can request a refund through "My Bookings" in your account.'
        },
        {
          id: 12,
          title: 'When will I receive my refund?',
          content: 'Refunds are typically processed within 5-10 business days after cancellation, though this may vary depending on your payment method and financial institution. You\'ll receive an email notification when your refund is processed.'
        }
      ]
    }
  };

  const allArticles = [];
  Object.values(categories).forEach(category => {
    allArticles.push(...category.articles);
  });

  const filteredArticles = searchQuery
    ? allArticles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories[activeCategory].articles;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SEO
        title="Help Center — FAQs & Support | BookEase"
        description="Find answers to frequently asked questions about booking, payments, cancellations, and account management in our comprehensive help center."
        canonical="https://bookease.com/help-center"
        meta={[{ name: 'keywords', content: 'help center, faq, booking help, customer support' }]}
      />
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Help Center</h1>
          <p className="text-gray-600 mb-6">
            Find answers to common questions and get help with your bookings, account, and more.
          </p>
          
          <div className="mb-8">
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {!searchQuery && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {Object.entries(categories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`p-4 rounded-lg text-left transition-colors ${
                    activeCategory === key
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-gray-800">{category.title}</h3>
                </button>
              ))}
            </div>
          )}
          
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div key={article.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{article.title}</h3>
                <p className="text-gray-600">{article.content}</p>
              </div>
            ))}
          </div>
          
          {filteredArticles.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">Try different keywords or browse our help categories.</p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">
            If you can't find what you're looking for, our support team is here to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact-us"
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-center hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/support"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-center hover:bg-gray-50 transition-colors"
            >
              Visit Support Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;