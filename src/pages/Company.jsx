import React from 'react';
import { Helmet } from 'react-helmet-async';

const Company = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>About Us - Booking App</title>
        <meta name="description" content="Learn about our company, mission, values, and commitment to providing the best booking experience for our users." />
        <meta name="keywords" content="about us, company information, booking platform, mission, values" />
        <link rel="canonical" href="https://www.booking-app.com/company" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">About Our Company</h1>
          
          <p className="text-gray-600 mb-6">
            We are a leading booking platform dedicated to connecting users with the best services and experiences. 
            Our mission is to make booking simple, secure, and enjoyable for everyone around the world.
          </p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2015, our company started with a simple vision: to revolutionize the way people book services and experiences. 
              What began as a small team of passionate entrepreneurs has grown into a global platform serving millions of users worldwide. 
              Over the years, we've continuously evolved and improved our platform to meet the changing needs of our community.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              Our mission is to empower people to discover and book the perfect experiences with confidence. 
              We strive to create a seamless, secure, and enjoyable booking experience that exceeds expectations. 
              By connecting users with trusted service providers, we aim to make every booking a positive and memorable experience.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Integrity</h3>
                <p className="text-gray-600">
                  We conduct our business with honesty, transparency, and ethical practices. 
                  Trust is the foundation of everything we do.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously seek new and better ways to enhance the booking experience 
                  through technology and creative solutions.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Focus</h3>
                <p className="text-gray-600">
                  Our customers are at the heart of every decision we make. 
                  We're committed to understanding and exceeding their expectations.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Excellence</h3>
                <p className="text-gray-600">
                  We pursue excellence in everything we do, from our platform features 
                  to our customer service and partnerships.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
            <p className="text-gray-600 mb-6">
              Our diverse team of professionals includes experts in technology, customer service, 
              business development, and user experience. Together, we work to create the best possible 
              booking platform for our users. Our team members come from various backgrounds and 
              cultures, bringing unique perspectives and expertise to our company.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Technology</h2>
            <p className="text-gray-600 mb-4">
              We leverage cutting-edge technology to ensure our platform is fast, secure, and reliable. 
              Our technology stack includes:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>Cloud-based infrastructure for optimal performance and scalability</li>
              <li>Advanced security measures to protect user data and transactions</li>
              <li>Machine learning algorithms to provide personalized recommendations</li>
              <li>Mobile-first design for seamless experiences across all devices</li>
              <li>Real-time booking and availability systems</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Global Reach</h2>
            <p className="text-gray-600 mb-6">
              We operate in over 100 countries and support multiple languages and currencies. 
              Our global presence allows us to serve users and partners worldwide, 
              providing access to local experiences and services wherever they are.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sustainability Commitment</h2>
            <p className="text-gray-600 mb-6">
              We are committed to sustainable business practices and helping our partners 
              reduce their environmental impact. Through our platform, we promote eco-friendly 
              options and support sustainable tourism and service practices.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Community Impact</h2>
            <p className="text-gray-600 mb-6">
              Beyond our business operations, we actively contribute to the communities we serve. 
              We support local businesses, contribute to social causes, and work to create 
              positive economic opportunities through our platform.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Looking Forward</h2>
            <p className="text-gray-600">
              As we continue to grow, we remain committed to our core values and mission. 
              We're excited about the future and the opportunities to further enhance 
              the booking experience for our users while expanding our positive impact globally.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">10M+</div>
            <div className="text-gray-600">Happy Users</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600">Service Providers</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-600">Countries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;