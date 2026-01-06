import React from 'react';
import { Helmet } from 'react-helmet-async';

const Support = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Support - Booking App</title>
        <meta name="description" content="Get help with your bookings, account issues, and general questions about our booking platform. Contact our support team for assistance." />
        <meta name="keywords" content="support, help, customer service, booking support, customer assistance" />
        <link rel="canonical" href="https://www.booking-app.com/support" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Support</h1>
          
          <p className="text-gray-600 mb-6">
            We're here to help you with any questions or issues you may have regarding our booking platform. 
            Our support team is available to assist you with account issues, booking problems, and general inquiries.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Frequently Asked Questions</h2>
              <p className="text-gray-600 mb-4">
                Find quick answers to common questions about our platform, bookings, payments, and account management.
              </p>
              <a href="/help-center" className="text-blue-600 hover:underline font-medium">
                Visit Help Center →
              </a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Support</h2>
              <p className="text-gray-600 mb-4">
                Need personalized assistance? Contact our support team directly for help with your specific issue.
              </p>
              <a href="/contact-us" className="text-blue-600 hover:underline font-medium">
                Contact Us →
              </a>
            </div>
          </div>
          
          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How Can We Help You?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800">Booking Issues</h3>
                <p className="text-gray-600">Problems with making, modifying, or canceling bookings</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800">Account Management</h3>
                <p className="text-gray-600">Issues with login, password, or account settings</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800">Payment Problems</h3>
                <p className="text-gray-600">Questions about billing, refunds, or payment methods</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800">Technical Issues</h3>
                <p className="text-gray-600">Problems with the website or app functionality</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Quick Help</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 font-semibold mr-2">•</span>
                <a href="/help-center#account" className="text-blue-600 hover:underline">Account Help</a>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-semibold mr-2">•</span>
                <a href="/help-center#booking" className="text-blue-600 hover:underline">Booking Issues</a>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-semibold mr-2">•</span>
                <a href="/help-center#payment" className="text-blue-600 hover:underline">Payment Questions</a>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-semibold mr-2">•</span>
                <a href="/help-center#cancellation" className="text-blue-600 hover:underline">Cancellation Policies</a>
              </li>
            </ul>
          </div>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Support Hours</h2>
            <p className="text-gray-600 mb-4">
              Our support team is available to assist you during the following hours:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li><strong>Monday - Friday:</strong> 8:00 AM - 8:00 PM</li>
              <li><strong>Saturday:</strong> 9:00 AM - 6:00 PM</li>
              <li><strong>Sunday:</strong> 10:00 AM - 4:00 PM</li>
            </ul>
            
            <p className="text-gray-600 mb-4">
              For urgent issues outside of these hours, please contact us through our emergency support line or email. 
              We strive to respond to all inquiries within 24 hours during business days.
            </p>
            
            <p className="text-gray-600">
              If you're experiencing a technical issue, please include your device information, browser type, and steps to reproduce the problem 
              when contacting our support team for faster resolution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;