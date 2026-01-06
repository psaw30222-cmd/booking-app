import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Terms and Conditions - Booking App</title>
        <meta name="description" content="Complete terms and conditions for using our booking platform. Read our terms of service, user responsibilities, and platform usage guidelines." />
        <meta name="keywords" content="terms and conditions, terms of service, booking terms, user agreement, platform terms" />
        <link rel="canonical" href="https://www.booking-app.com/terms-and-conditions" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms and Conditions</h1>
          
          <p className="text-gray-600 mb-6">
            Welcome to our booking platform. These terms and conditions outline the rules and regulations for using our website and booking services. 
            By accessing this website and using our services, you accept these terms and conditions in full.
          </p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-6">
              These terms and conditions govern your use of our booking platform and any related services provided by our company. 
              Your use of our platform constitutes acceptance of these terms. If you disagree with any part of these terms, you must not use our platform.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Interpretation and Definitions</h2>
            <p className="text-gray-600 mb-4">For the purposes of these Terms and Conditions:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li><strong>Application</strong> refers to the software program provided by the Company downloaded by You on any electronic device</li>
              <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to the operator of the platform</li>
              <li><strong>Country</strong> refers to Italy</li>
              <li><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet</li>
              <li><strong>Service</strong> refers to the platform operated by the Company</li>
              <li><strong>Terms and Conditions</strong> (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service</li>
              <li><strong>Third-party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service</li>
              <li><strong>Website</strong> refers to our platform accessible from the provided URL</li>
              <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Account Terms</h2>
            <p className="text-gray-600 mb-4">A User Account is required for most aspects of our Service.</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>You must be 18 years of age or older to create an account</li>
              <li>You must provide accurate and complete information when creating your account</li>
              <li>You are responsible for maintaining the security of your account and password</li>
              <li>You are responsible for all activities that occur under your account</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">As a user of our platform, you agree to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Use the platform in compliance with all applicable laws and regulations</li>
              <li>Not use the platform for any illegal or unauthorized purpose</li>
              <li>Respect the intellectual property rights of others</li>
              <li>Not engage in any conduct that restricts or inhibits anyone's use of the platform</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Booking Services</h2>
            <p className="text-gray-600 mb-4">Our booking services are subject to the following terms:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>All bookings are subject to availability</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment is required at the time of booking</li>
              <li>Cancellations and refunds are subject to the specific policies of each service provider</li>
              <li>We act as an intermediary and do not provide the actual services being booked</li>
              <li>We are not responsible for the quality or availability of services provided by third parties</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Payment Terms</h2>
            <p className="text-gray-600 mb-6">
              All payments must be made through our secure payment processing system. We accept various forms of payment including credit cards, 
              debit cards, and other electronic payment methods. All payments are processed securely and in compliance with applicable financial regulations.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Cancellation and Refund Policy</h2>
            <p className="text-gray-600 mb-4">Cancellation and refund policies vary by service provider:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>Each service provider has their own cancellation and refund policies</li>
              <li>Refunds are processed according to the policies of the specific service provider</li>
              <li>We are not responsible for processing refunds for services provided by third parties</li>
              <li>Refund requests must be made directly to the service provider</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              To the maximum extent permitted by law, in no event shall the Company be liable for any indirect, incidental, special, consequential or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Governing Law</h2>
            <p className="text-gray-600 mb-6">
              These Terms shall be governed and construed in accordance with the laws of Italy, without regard to its conflict of law provisions. 
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
              If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. 
              What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:legal@booking-app.com" className="text-blue-600 hover:underline">legal@booking-app.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;