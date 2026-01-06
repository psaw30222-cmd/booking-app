import React from 'react';
import { Helmet } from 'react-helmet-async';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Cookie Policy - Booking App</title>
        <meta name="description" content="Learn about how we use cookies and similar tracking technologies on our booking platform to enhance your experience." />
        <meta name="keywords" content="cookie policy, cookies, tracking technologies, data collection, booking cookies" />
        <link rel="canonical" href="https://www.booking-app.com/cookie-policy" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Cookie Policy</h1>
          
          <p className="text-gray-600 mb-6">
            This Cookie Policy explains how we use cookies and similar tracking technologies on our booking platform. 
            By using our platform, you consent to the use of cookies as described in this policy.
          </p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. What Are Cookies?</h2>
            <p className="text-gray-600 mb-6">
              Cookies are small text files that are stored on your device when you visit our website. They help us recognize your device 
              and remember certain information about your browsing session. Cookies can be "session" cookies (temporary, deleted when you close 
              your browser) or "persistent" cookies (stay on your device for a longer period).
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Types of Cookies We Use</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Essential Cookies</h3>
            <p className="text-gray-600 mb-4">
              These cookies are necessary for our platform to function properly. They enable basic features like page navigation, 
              access to secure areas, and maintaining your session.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Performance Cookies</h3>
            <p className="text-gray-600 mb-4">
              These cookies help us understand how visitors interact with our platform by collecting and reporting information 
              about page visits, load times, and error messages. This helps us improve our platform's performance.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Functionality Cookies</h3>
            <p className="text-gray-600 mb-4">
              These cookies allow our platform to remember choices you make (such as language preference, region, or account information) 
              and provide enhanced, personalized features.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Targeting/Advertising Cookies</h3>
            <p className="text-gray-600 mb-6">
              These cookies may be set through our services by our advertising partners. They may be used by those companies 
              to build a profile of your interests and show you relevant advertisements on other sites.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Cookies</h2>
            <p className="text-gray-600 mb-4">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>To remember your preferences and settings</li>
              <li>To improve your experience on our platform</li>
              <li>To analyze how our platform is used</li>
              <li>To provide personalized content and recommendations</li>
              <li>To deliver relevant advertising</li>
              <li>To prevent fraud and ensure security</li>
              <li>To measure the effectiveness of our marketing campaigns</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Third-Party Cookies</h2>
            <p className="text-gray-600 mb-6">
              We may allow third-party service providers to place cookies on our platform to provide certain services. 
              These third parties may use cookies to collect information about your online activities across different websites. 
              The following third parties may place cookies through our platform:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>Analytics providers (such as Google Analytics)</li>
              <li>Advertising networks</li>
              <li>Social media platforms</li>
              <li>Payment processors</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Managing Cookies</h2>
            <p className="text-gray-600 mb-4">You can control and manage cookies in several ways:</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Browser Settings</h3>
            <p className="text-gray-600 mb-4">
              Most web browsers allow you to control cookies through their settings preferences. You can typically:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>Block all cookies</li>
              <li>Allow all cookies</li>
              <li>Delete cookies</li>
              <li>Block third-party cookies</li>
              <li>Receive notifications when cookies are placed</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Cookie Consent Manager</h3>
            <p className="text-gray-600 mb-6">
              Our platform may include a cookie consent manager that allows you to select which categories of cookies you wish to allow.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cookie Duration</h2>
            <p className="text-gray-600 mb-6">
              The cookies we use have different durations. Some cookies are session cookies that expire when you close your browser. 
              Others are persistent cookies that remain on your device for longer periods, typically ranging from a few days to several years. 
              The specific duration depends on the purpose of the cookie and our business needs.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Updates to This Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, 
              legal, or regulatory reasons. When we make changes, we will update the "Last Updated" date at the top of this policy. 
              We encourage you to review this policy periodically.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about this Cookie Policy, please contact us at <a href="mailto:privacy@booking-app.com" className="text-blue-600 hover:underline">privacy@booking-app.com</a> 
              or write to us at our registered office address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;