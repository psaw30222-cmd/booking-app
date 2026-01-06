import React from 'react';
import { Helmet } from 'react-helmet-async';

const HowToReportScam = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>How to Report a Scam - Booking App</title>
        <meta name="description" content="Learn how to identify and report fraudulent activity or scams on our booking platform to help keep our community safe." />
        <meta name="keywords" content="report scam, fraud prevention, safety, suspicious activity, booking scams" />
        <link rel="canonical" href="https://www.booking-app.com/how-to-report-scam" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">How to Report a Scam</h1>
          
          <p className="text-gray-600 mb-6">
            Your safety is our top priority. If you encounter fraudulent activity or suspicious behavior on our platform, 
            please report it immediately. By reporting scams, you help protect other users and maintain the integrity of our community.
          </p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Identifying Potential Scams</h2>
            <p className="text-gray-600 mb-4">Be aware of these common signs of fraudulent activity:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50">
                <h3 className="font-semibold text-gray-800">Unsolicited Contact</h3>
                <p className="text-gray-600">Unexpected messages requesting personal information or payments outside our platform</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50">
                <h3 className="font-semibold text-gray-800">Too Good to Be True</h3>
                <p className="text-gray-600">Deals or offers that seem unusually attractive compared to market rates</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50">
                <h3 className="font-semibold text-gray-800">Pressure Tactics</h3>
                <p className="text-gray-600">Urgent requests for immediate payment or personal information</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50">
                <h3 className="font-semibold text-gray-800">Suspicious Payment Methods</h3>
                <p className="text-gray-600">Requests for payment through unconventional methods or platforms</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Report Suspicious Activity</h2>
            <p className="text-gray-600 mb-4">If you encounter suspicious activity, follow these steps:</p>
            <ol className="list-decimal pl-6 mb-6 space-y-3 text-gray-600">
              <li><strong>Do not engage</strong> with the suspicious party or provide any personal information</li>
              <li><strong>Document the interaction</strong> by taking screenshots of conversations, profiles, or listings</li>
              <li><strong>Report immediately</strong> using our reporting system or contact our support team</li>
              <li><strong>Block the user</strong> if possible to prevent further contact</li>
              <li><strong>Do not complete any transactions</strong> with the suspicious party</li>
            </ol>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reporting Channels</h2>
            <div className="space-y-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Report Through Our Platform</h3>
                <p className="text-gray-600 mb-2">Use the "Report" button available on suspicious profiles, listings, or messages.</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Report Now
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Contact Our Security Team</h3>
                <p className="text-gray-600">
                  Email: <a href="mailto:security@booking-app.com" className="text-blue-600 hover:underline">security@booking-app.com</a>
                </p>
                <p className="text-gray-600">
                  Phone: +1 (555) 123-4567 (Select option 3 for security reports)
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Emergency Report</h3>
                <p className="text-gray-600">
                  For urgent security issues, use our emergency reporting form. Our team will respond within 2 hours.
                </p>
                <a href="/contact-us" className="text-blue-600 hover:underline">Submit Emergency Report</a>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information to Include in Your Report</h2>
            <p className="text-gray-600 mb-4">When reporting suspicious activity, please include:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>User ID or listing ID of the suspicious party</li>
              <li>Details of the suspicious activity or communication</li>
              <li>Date and time of the interaction</li>
              <li>Any screenshots or evidence of the suspicious activity</li>
              <li>Your account information (for verification purposes)</li>
              <li>Specific type of scam you encountered</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Happens After You Report</h2>
            <p className="text-gray-600 mb-4">Once you submit a report:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
                <h3 className="font-semibold text-gray-800">Review</h3>
                <p className="text-gray-600 text-sm">Our security team reviews your report within 24 hours</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
                <h3 className="font-semibold text-gray-800">Investigation</h3>
                <p className="text-gray-600 text-sm">We investigate the reported activity thoroughly</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
                <h3 className="font-semibold text-gray-800">Action</h3>
                <p className="text-gray-600 text-sm">Appropriate action is taken against the violator</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              You will receive a confirmation of your report within 24 hours. If further information is needed, our team will contact you. 
              After our investigation, we'll provide an update on the action taken, while respecting privacy and security considerations.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Safety Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Always Use Our Platform</h3>
                <p className="text-gray-600 text-sm">
                  Complete all transactions through our platform. Never send payments directly to service providers or use external payment methods.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Verify Before Booking</h3>
                <p className="text-gray-600 text-sm">
                  Check reviews, ratings, and verification status before making any bookings or payments.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Secure Your Account</h3>
                <p className="text-gray-600 text-sm">
                  Use a strong password and enable two-factor authentication to protect your account from unauthorized access.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Trust Your Instincts</h3>
                <p className="text-gray-600 text-sm">
                  If something feels off or too good to be true, trust your instincts and avoid the interaction.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Legal Recourse</h2>
            <p className="text-gray-600">
              In cases of financial fraud or identity theft, we recommend also reporting the incident to local authorities 
              and your financial institution. We will cooperate fully with law enforcement agencies during their investigations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToReportScam;