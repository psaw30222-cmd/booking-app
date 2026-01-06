import React from 'react';
import { Helmet } from 'react-helmet-async';

const BakecaIncontri = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Bakeca Incontri - Booking App</title>
        <meta name="description" content="Bakeca Incontri - Connect with like-minded individuals in our specialized booking network for unique social experiences and encounters." />
        <meta name="keywords" content="bakeca incontri, social booking, meeting people, dating events, social experiences" />
        <link rel="canonical" href="https://www.booking-app.com/bakeca-incontri" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Bakeca Incontri</h1>
          
          <p className="text-gray-600 mb-6">
            Bakeca Incontri is a specialized section of our platform dedicated to connecting people for meaningful social experiences and encounters. 
            Our platform provides a safe and welcoming environment for individuals looking to meet others and share unique experiences together.
          </p>
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Bakeca Incontri</h2>
            <p className="text-gray-600 mb-6">
              Bakeca Incontri represents our commitment to creating diverse and inclusive experiences for our users. 
              This specialized network allows individuals to discover and book social experiences designed to bring people together in meaningful ways. 
              Whether you're looking to attend social events, group activities, or shared experiences, Bakeca Incontri offers a unique platform for connections.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
                <h3 className="font-semibold text-gray-800">Create Profile</h3>
                <p className="text-gray-600 text-sm">Set up your profile with interests and preferences</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
                <h3 className="font-semibold text-gray-800">Browse Events</h3>
                <p className="text-gray-600 text-sm">Discover social events and activities near you</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
                <h3 className="font-semibold text-gray-800">Connect</h3>
                <p className="text-gray-600 text-sm">Book experiences and meet like-minded people</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Safety and Security</h2>
            <p className="text-gray-600 mb-4">
              Your safety is our top priority on Bakeca Incontri. We implement strict verification processes and safety measures to ensure 
              a secure environment for all users. Our platform includes reporting tools and community guidelines to maintain a positive experience.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>Profile verification system</li>
              <li>Community reporting tools</li>
              <li>Secure messaging system</li>
              <li>Event safety guidelines</li>
              <li>Moderation and review processes</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Types of Experiences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Social Events</h3>
                <p className="text-gray-600">
                  Join group activities, parties, and social gatherings in your area. 
                  Connect with others who share your interests and hobbies.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Cultural Activities</h3>
                <p className="text-gray-600">
                  Attend cultural events, exhibitions, and educational experiences with like-minded individuals. 
                  Share in the appreciation of art, music, and culture.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Outdoor Adventures</h3>
                <p className="text-gray-600">
                  Participate in outdoor activities, hiking, sports, and adventure experiences. 
                  Meet people who share your love for nature and physical activities.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Learning Experiences</h3>
                <p className="text-gray-600">
                  Join workshops, classes, and learning sessions with others. 
                  Expand your knowledge while making new connections.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Community Guidelines</h2>
            <p className="text-gray-600 mb-4">
              To maintain a positive and respectful environment on Bakeca Incontri, we ask all users to follow our community guidelines:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>Treat all members with respect and kindness</li>
              <li>Be honest in your profile and interactions</li>
              <li>Respect others' boundaries and preferences</li>
              <li>Maintain privacy and confidentiality</li>
              <li>Report any inappropriate behavior immediately</li>
              <li>Follow local laws and regulations</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-6">
              Ready to join the Bakeca Incontri community? Sign up today to create your profile and start exploring social experiences in your area. 
              Our platform makes it easy to connect with others who share your interests and values.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Join Bakeca Incontri Today</h3>
              <p className="text-gray-600 mb-4">
                Create your profile and start connecting with like-minded individuals in your community.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BakecaIncontri;