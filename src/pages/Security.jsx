import React from 'react';
import { Helmet } from 'react-helmet-async';

const Security = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Security - Booking App</title>
        <meta name="description" content="Learn about our security measures and commitment to protecting your personal information and bookings on our platform." />
        <meta name="keywords" content="security, data protection, platform security, account safety, booking security" />
        <link rel="canonical" href="https://www.booking-app.com/security" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Security</h1>
          
          <p className="text-gray-600 mb-6">
            Security is our top priority. We implement comprehensive measures to protect your personal information and ensure the safety of your bookings. 
            Our commitment to security spans across all aspects of our platform and operations.
          </p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Security Commitment</h2>
            <p className="text-gray-600 mb-6">
              We are committed to maintaining the highest standards of security to protect your personal information and booking data. 
              Our security practices are regularly reviewed and updated to address emerging threats and ensure compliance with industry standards.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Protection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Encryption</h3>
                <p className="text-gray-600">
                  All sensitive data is encrypted using industry-standard SSL/TLS protocols during transmission and AES-256 encryption at rest.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Access Controls</h3>
                <p className="text-gray-600">
                  We implement strict access controls to ensure that only authorized personnel can access sensitive data based on their role.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Regular Audits</h3>
                <p className="text-gray-600">
                  Our systems undergo regular security audits and penetration testing to identify and address potential vulnerabilities.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Compliance</h3>
                <p className="text-gray-600">
                  We comply with international security standards including PCI DSS for payment processing and GDPR for data protection.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Security</h2>
            <p className="text-gray-600 mb-4">We implement multiple layers of security to protect your account:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li><strong>Two-Factor Authentication (2FA):</strong> Optional but recommended for additional account protection</li>
              <li><strong>Secure Password Storage:</strong> Passwords are hashed using bcrypt with salt</li>
              <li><strong>Session Management:</strong> Secure session handling with automatic timeout</li>
              <li><strong>Account Monitoring:</strong> Continuous monitoring for suspicious activities</li>
              <li><strong>Secure Login:</strong> Protection against brute force attacks and unauthorized access</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Security</h2>
            <p className="text-gray-600 mb-4">We take extra precautions to ensure your payment information is secure:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>PCI DSS Level 1 compliance for payment processing</li>
              <li>Tokenization of payment information</li>
              <li>Third-party payment processors for additional security</li>
              <li>End-to-end encryption for all payment transactions</li>
              <li>Regular security assessments of payment systems</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Network Security</h2>
            <p className="text-gray-600 mb-4">Our infrastructure is protected by multiple security layers:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>Firewalls and intrusion detection systems</li>
              <li>DDoS protection and mitigation</li>
              <li>Regular security patches and updates</li>
              <li>Network segmentation to isolate sensitive systems</li>
              <li>Continuous monitoring of network traffic</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Security Best Practices for Users</h2>
            <p className="text-gray-600 mb-4">Help us protect your account by following these best practices:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>Use strong, unique passwords for your account</li>
              <li>Enable two-factor authentication if available</li>
              <li>Keep your login credentials private and secure</li>
              <li>Log out of your account when using shared devices</li>
              <li>Be cautious of phishing attempts and suspicious emails</li>
              <li>Regularly review your account activity and settings</li>
              <li>Update your password periodically</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Incident Response</h2>
            <p className="text-gray-600 mb-6">
              In the unlikely event of a security incident, we have a comprehensive incident response plan in place. 
              Our team is prepared to respond quickly to security threats, minimize any potential impact, and communicate transparently with affected users. 
              We continuously improve our security measures based on lessons learned from incidents and industry best practices.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Security Updates</h2>
            <p className="text-gray-600">
              We regularly update our security measures to address new threats and vulnerabilities. 
              You can stay informed about security updates by checking this page periodically or subscribing to our security bulletins.
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Report Security Issues</h2>
          <p className="text-gray-600 mb-4">
            If you discover a security vulnerability in our platform, please report it to us immediately through our responsible disclosure program.
          </p>
          <a 
            href="/how-to-report-scam" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Report Security Issue
          </a>
        </div>
      </div>
    </div>
  );
};

export default Security;