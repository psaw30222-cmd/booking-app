import React from 'react';
import { Helmet } from 'react-helmet-async';

const Legal = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Legal Information - Booking App</title>
        <meta name="description" content="Access all legal documents including terms and conditions, privacy policy, cookie policy, and other important legal information for our booking platform." />
        <meta name="keywords" content="legal, terms and conditions, privacy policy, cookie policy, legal documents, booking legal" />
        <link rel="canonical" href="https://www.booking-app.com/legal" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Legal Information</h1>
          
          <p className="text-gray-600 mb-6">
            Welcome to our Legal Information hub. Here you'll find all the important legal documents that govern your use of our booking platform. 
            Please review these documents carefully to understand your rights and responsibilities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Terms & Conditions</h2>
              <p className="text-gray-600 mb-3">Our terms of service that govern your use of the platform and booking services.</p>
              <a href="/terms-and-conditions" className="text-blue-600 hover:underline font-medium">
                Read Terms & Conditions →
              </a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Privacy Policy</h2>
              <p className="text-gray-600 mb-3">Information about how we collect, use, and protect your personal data.</p>
              <a href="/privacy-policy" className="text-blue-600 hover:underline font-medium">
                Read Privacy Policy →
              </a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Cookie Policy</h2>
              <p className="text-gray-600 mb-3">Details about how we use cookies and similar tracking technologies.</p>
              <a href="/cookie-policy" className="text-blue-600 hover:underline font-medium">
                Read Cookie Policy →
              </a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Security</h2>
              <p className="text-gray-600 mb-3">Information about how we protect your data and secure our platform.</p>
              <a href="/security" className="text-blue-600 hover:underline font-medium">
                Learn about Security →
              </a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">How to Report a Scam</h2>
              <p className="text-gray-600 mb-3">If you encounter fraudulent activity or suspicious behavior, please report it to us immediately.</p>
              <a href="/how-to-report-scam" className="text-blue-600 hover:underline font-medium">
                Report a Scam →
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Important Legal Notes</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <h3 className="font-semibold text-gray-800">User Agreement</h3>
              <p className="text-gray-600">By using our platform, you agree to comply with all terms and conditions outlined in our user agreement.</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <h3 className="font-semibold text-gray-800">Data Protection</h3>
              <p className="text-gray-600">We are committed to protecting your privacy and personal information in accordance with applicable data protection laws.</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <h3 className="font-semibold text-gray-800">Liability</h3>
              <p className="text-gray-600">Our liability is limited as specified in our terms and conditions. Please read carefully before using our services.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;