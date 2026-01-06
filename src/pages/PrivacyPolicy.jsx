import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Privacy Policy - Booking App</title>
        <meta name="description" content="Our privacy policy explains how we collect, use, protect, and share your personal information when using our booking platform." />
        <meta name="keywords" content="privacy policy, data protection, personal information, data privacy, booking privacy" />
        <link rel="canonical" href="https://www.booking-app.com/privacy-policy" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
          
          <p className="text-gray-600 mb-6">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, protect, and share your personal information when you use our booking platform. 
            Please read this policy carefully to understand how we handle your data.
          </p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">We may collect the following types of information:</p>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>Name and contact information</li>
              <li>Email address and phone number</li>
              <li>Billing and payment information</li>
              <li>Location information</li>
              <li>Account preferences and settings</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Usage Data</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>IP address and browser type</li>
              <li>Pages visited and features used</li>
              <li>Time spent on our platform</li>
              <li>Links clicked and referrals</li>
              <li>Operating system and device information</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>To provide and maintain our booking services</li>
              <li>To process your bookings and payments</li>
              <li>To communicate with you about your bookings</li>
              <li>To personalize your experience on our platform</li>
              <li>To improve our services and user experience</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and property</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Legal Basis for Processing</h2>
            <p className="text-gray-600 mb-6">
              We process your personal data based on the following legal grounds: (1) to perform our contract with you; 
              (2) for our legitimate business interests; (3) with your consent; and (4) to comply with our legal obligations.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Sharing Your Information</h2>
            <p className="text-gray-600 mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>Service providers and business partners who assist us in operating our platform</li>
              <li>Third-party booking partners to fulfill your reservations</li>
              <li>Legal authorities when required by law</li>
              <li>Other parties with your consent</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
            <p className="text-gray-600 mb-6">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. We use industry-standard security protocols and regularly review our security measures to ensure 
              your data remains protected.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Retention</h2>
            <p className="text-gray-600 mb-6">
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. 
              The retention period may vary depending on the type of information and the purpose for which it was collected.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your information</li>
              <li><strong>Restriction:</strong> Request restriction of processing</li>
              <li><strong>Data Portability:</strong> Request transfer of your information to another service</li>
              <li><strong>Objection:</strong> Object to processing of your information</li>
              <li><strong>Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 mb-6">
              We use cookies and similar tracking technologies to enhance your experience on our platform. 
              Cookies help us understand how you use our services and allow us to improve your experience. 
              You can control cookies through your browser settings.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Third-Party Services</h2>
            <p className="text-gray-600 mb-6">
              Our platform may contain links to third-party websites or services. This Privacy Policy does not apply to those third-party sites. 
              We encourage you to review the privacy policies of any third-party services you visit.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Children's Privacy</h2>
            <p className="text-gray-600 mb-6">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children. 
              If you believe we have collected information from a child, please contact us immediately.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. International Transfers</h2>
            <p className="text-gray-600 mb-6">
              Your information may be transferred to and processed in countries other than your country of residence. 
              We ensure that appropriate safeguards are in place to protect your information during international transfers.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Updates to This Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this Privacy Policy from time to time. When we do, we will post the updated policy on this page and update the effective date. 
              We encourage you to review this policy periodically to stay informed about how we protect your information.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@booking-app.com" className="text-blue-600 hover:underline">privacy@booking-app.com</a> 
              or write to us at our registered office address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;