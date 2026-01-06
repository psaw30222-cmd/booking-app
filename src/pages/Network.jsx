import React from 'react';
import { Helmet } from 'react-helmet-async';

const Network = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Our Network - Booking App</title>
        <meta name="description" content="Explore our extensive network of service providers, partners, and locations that make our booking platform possible." />
        <meta name="keywords" content="network, service providers, partners, locations, booking network" />
        <link rel="canonical" href="https://www.booking-app.com/network" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Network</h1>
          
          <p className="text-gray-600 mb-6">
            Our extensive network of service providers, partners, and locations enables us to offer the best booking experiences to our users. 
            We work with trusted partners worldwide to ensure quality, reliability, and exceptional service across all our offerings.
          </p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Network Overview</h2>
            <p className="text-gray-600 mb-6">
              Our network spans across multiple continents and includes thousands of verified service providers, partners, and locations. 
              Each member of our network is carefully selected and regularly reviewed to maintain the high standards our users expect.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service Providers</h2>
            <p className="text-gray-600 mb-4">
              Our network includes a diverse range of service providers who offer various experiences and services:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Verified Partners</h3>
                <p className="text-gray-600">
                  All service providers in our network undergo a rigorous verification process to ensure quality and reliability.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Quality Standards</h3>
                <p className="text-gray-600">
                  We maintain strict quality standards and regularly review our partners to ensure consistent service delivery.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Diverse Offerings</h3>
                <p className="text-gray-600">
                  Our network includes providers offering a wide variety of services and experiences to meet diverse user needs.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Global Coverage</h3>
                <p className="text-gray-600">
                  Service providers are available in over 100 countries, offering local expertise and global accessibility.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Partnerships</h2>
            <p className="text-gray-600 mb-4">
              We collaborate with various partners to enhance our service offerings:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li><strong>Technology Partners:</strong> Companies that provide the technological infrastructure for our platform</li>
              <li><strong>Payment Partners:</strong> Secure payment processors that handle transactions safely</li>
              <li><strong>Marketing Partners:</strong> Organizations that help us reach and serve more users</li>
              <li><strong>Content Partners:</strong> Providers of travel guides, reviews, and destination information</li>
              <li><strong>Security Partners:</strong> Companies that help us maintain the highest security standards</li>
              <li><strong>Local Partners:</strong> Regional experts who provide localized service and support</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Global Reach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-gray-600">Countries</div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-600">Service Providers</div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600">Cities</div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Our network covers over 100 countries and thousands of cities worldwide. We continuously expand our network to serve more users 
              and provide access to new destinations and experiences. Our global reach allows users to find services and experiences no matter 
              where they are in the world.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Network Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800">Consistent Quality</h3>
                <p className="text-gray-600">
                  Our standardized processes and quality controls ensure consistent experiences across our entire network.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800">Local Expertise</h3>
                <p className="text-gray-600">
                  Network partners provide local knowledge and personalized service tailored to specific regions.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800">24/7 Support</h3>
                <p className="text-gray-600">
                  Our global network ensures support is available around the clock in multiple languages.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800">Competitive Pricing</h3>
                <p className="text-gray-600">
                  The scale of our network allows us to negotiate competitive rates for our users.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Joining Our Network</h2>
            <p className="text-gray-600 mb-4">
              We're always looking for qualified service providers to join our network. If you're interested in becoming a partner:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>You must meet our quality and safety standards</li>
              <li>Complete our verification and onboarding process</li>
              <li>Agree to our partner terms and service standards</li>
              <li>Participate in ongoing training and quality reviews</li>
              <li>Maintain excellent customer service ratings</li>
            </ul>
            
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Become a Network Partner</h3>
              <p className="text-gray-600 mb-4">
                Interested in joining our network as a service provider? Contact us to learn more about partnership opportunities.
              </p>
              <a href="/contact-us" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;