import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

const Home = () => {
  const topCities = [
    { name: "Mumbai", slug: "mumbai", count: "500+" },
    { name: "Delhi", slug: "delhi", count: "450+" },
    { name: "Bangalore", slug: "bangalore", count: "400+" },
    { name: "Pune", slug: "pune", count: "300+" },
    { name: "Hyderabad", slug: "hyderabad", count: "250+" },
    { name: "Chennai", slug: "chennai", count: "200+" },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BookEase",
    "url": "https://yourdomain.com",
    "description": "Premium adult companion and escort services directory in India",
    "audience": {
      "@type": "PeopleAudience",
      "requiredMinAge": 18
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://yourdomain.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Helmet>
        <title>BookEase - Book Adult Services & Escorts in India | Mumbai, Delhi, Bangalore</title>
        <meta name="description" content="Browse 2000+ verified adult companions and escort profiles in India. Available in Mumbai, Delhi, Bangalore, Pune. Safe, discreet booking. Professional service. 18+ only." />
        <meta name="keywords" content="escorts India, call girls Mumbai, Delhi companions, Bangalore escorts, adult services India, verified escorts, independent escorts, escort directory, massage services India" />
        <link rel="canonical" href="https://yourdomain.com/" />
        
        <meta property="og:title" content="BookEase - Premium Adult Services India" />
        <meta property="og:description" content="Browse 2000+ verified companions in major Indian cities. 18+" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Adult Companion Services in India
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Browse 2000+ verified profiles of escorts and companions. 
            Available 24/7 in major cities. Discreet, safe & professional. 18+ only.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/mumbai"
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            >
              Mumbai Escorts
            </Link>
            <Link 
              to="/delhi"
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            >
              Delhi Escorts
            </Link>
            <Link 
              to="/bangalore"
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            >
              Bangalore Escorts
            </Link>
          </div>
        </div>
      </section>

      {/* Top Cities */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Browse by City
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              to={`/${city.slug}`}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-neutral-200"
            >
              <h3 className="font-bold text-neutral-900 text-lg mb-2">{city.name}</h3>
              <span className="text-pink-600 font-semibold">{city.count} Profiles</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Featured Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            About BookEase - India's Premier Adult Services Directory
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Welcome to BookEase, India's most trusted platform for booking premium adult companion 
              services. We connect you with verified, professional escorts and companions across major 
              Indian cities including Mumbai, Delhi, Bangalore, Pune, Hyderabad, and more.
            </p>

            <h3>Why Choose BookEase?</h3>
            <ul>
              <li><strong>Verified Profiles:</strong> All companions are ID verified with authentic photos</li>
              <li><strong>24/7 Availability:</strong> Services available round the clock in all major cities</li>
              <li><strong>Discreet Service:</strong> Your privacy is our top priority</li>
              <li><strong>Safe Booking:</strong> Secure platform with trusted companions</li>
              <li><strong>Wide Selection:</strong> 2000+ profiles to choose from</li>
              <li><strong>Professional Service:</strong> Experienced, courteous companions</li>
            </ul>

            <h3>Cities We Serve</h3>
            <p>
              We provide comprehensive coverage across India's major metropolitan areas:
            </p>
            <ul>
              <li><Link to="/mumbai" className="text-pink-600 hover:underline">Mumbai Escorts</Link> - 500+ verified profiles</li>
              <li><Link to="/delhi" className="text-pink-600 hover:underline">Delhi Escorts</Link> - 450+ verified profiles</li>
              <li><Link to="/bangalore" className="text-pink-600 hover:underline">Bangalore Escorts</Link> - 400+ verified profiles</li>
              <li><Link to="/pune" className="text-pink-600 hover:underline">Pune Escorts</Link> - 300+ verified profiles</li>
              <li><Link to="/hyderabad" className="text-pink-600 hover:underline">Hyderabad Escorts</Link> - 250+ verified profiles</li>
            </ul>

            <h3>How It Works</h3>
            <ol>
              <li>Browse verified profiles in your preferred city</li>
              <li>Check availability, services offered, and rates</li>
              <li>Contact via phone or WhatsApp</li>
              <li>Confirm your booking details</li>
              <li>Enjoy professional, discreet service</li>
            </ol>

            <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg mt-6">
              <strong>Important:</strong> This service is restricted to adults aged 18 and above only. 
              We strictly comply with all applicable laws and regulations. Please ensure you are of 
              legal age before accessing our services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;