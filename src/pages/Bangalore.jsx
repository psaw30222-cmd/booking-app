import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

const phone = "9999999999";

const Bangalore = () => {
  // Filter services available in Bangalore
  const bangaloreServices = services.slice(0, 6);

  const popularAreas = [
    { name: "Andheri", slug: "andheri", count: 150 },
    { name: "Bandra", slug: "bandra", count: 120 },
    { name: "Juhu", slug: "juhu", count: 95 },
    { name: "Powai", slug: "powai", count: 80 },
    { name: "Colaba", slug: "colaba", count: 75 },
    { name: "Worli", slug: "worli", count: 65 },
    { name: "Lower Parel", slug: "lower-parel", count: 60 },
    { name: "Malad", slug: "malad", count: 55 },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "BookEase Mumbai - Adult Companion Services",
    "image": "https://yourdomain.com/mumbai-banner.jpg",
    "description": "Premium adult companion and escort services in Mumbai. Verified profiles, discreet service, 24/7 availability.",
    "priceRange": "₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "url": "https://yourdomain.com/mumbai",
    "telephone": `+91-${phone}`,
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "327",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://yourdomain.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Mumbai",
        "item": "https://yourdomain.com/mumbai"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Helmet>
        <title>Escorts in Mumbai | Premium Call Girls & Companions Mumbai 24/7 | BookEase</title>
        <meta name="description" content="Book verified escorts & call girls in Mumbai. 500+ profiles in Andheri, Bandra, Juhu & all areas. Independent companions available 24/7. Discreet, safe & professional service. Call now!" />
        <meta name="keywords" content="escorts Mumbai, call girls Mumbai, Mumbai escorts, Andheri escorts, Bandra call girls, Juhu escorts, Mumbai companions, independent escorts Mumbai, verified escorts, adult services Mumbai, massage Mumbai, VIP escorts Mumbai, Russian escorts Mumbai, hotel escorts Mumbai" />
        <link rel="canonical" href="https://yourdomain.com/mumbai" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Premium Escorts & Call Girls in Mumbai - BookEase" />
        <meta property="og:description" content="Browse 500+ verified escort profiles in Mumbai. Available 24/7 in all areas. Safe & discreet." />
        <meta property="og:url" content="https://yourdomain.com/mumbai" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://yourdomain.com/mumbai-og.jpg" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Escorts in Mumbai - BookEase" />
        <meta name="twitter:description" content="500+ verified escorts in Mumbai. 24/7 availability." />
        <meta name="twitter:image" content="https://yourdomain.com/mumbai-twitter.jpg" />
        
        {/* Alternate Languages */}
        <link rel="alternate" hreflang="en-in" href="https://yourdomain.com/mumbai" />
        <link rel="alternate" hreflang="en" href="https://yourdomain.com/mumbai" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <Header showBack title="Mumbai Escorts" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 opacity-90">
            <Link to="/" className="hover:underline">Home</Link> 
            <span className="mx-2">›</span> 
            <span>Mumbai</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Escorts & Companions in Mumbai
          </h1>
          <p className="text-xl mb-6 max-w-3xl">
            Browse 500+ verified profiles of premium escorts and independent companions 
            available 24/7 across all areas of Mumbai. Discreet, safe, and professional service.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href={`tel:+91${phone}`}
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
            <a 
              href={`https://wa.me/91${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Popular Areas */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Popular Areas in Mumbai
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularAreas.map((area) => (
              <Link
                key={area.slug}
                to={`/mumbai/${area.slug}`}
                className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow border border-neutral-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-neutral-900">{area.name}</h3>
                  <span className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full">
                    {area.count}
                  </span>
                </div>
                <p className="text-sm text-neutral-600">
                  {area.count} verified profiles
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Available Services in Mumbai
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bangaloreServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
          <h2>About Escort Services in Mumbai</h2>
          <p>
            Mumbai, the city of dreams, is home to India's most vibrant adult entertainment scene. 
            Our platform connects you with verified, professional escorts and companions across all 
            major areas of Mumbai including Andheri, Bandra, Juhu, Powai, and beyond.
          </p>

          <h3>Why Choose BookEase Mumbai?</h3>
          <ul>
            <li><strong>Verified Profiles:</strong> All companions are verified with ID proof and photos</li>
            <li><strong>24/7 Availability:</strong> Services available round the clock in all areas</li>
            <li><strong>Discreet Service:</strong> Your privacy is our top priority</li>
            <li><strong>Safe Booking:</strong> Secure platform with trusted payment options</li>
            <li><strong>Wide Selection:</strong> 500+ profiles to choose from</li>
            <li><strong>Professional Service:</strong> Experienced, courteous companions</li>
          </ul>

          <h3>Popular Services in Mumbai</h3>
          <p>
            Our Mumbai companions offer a wide range of services including:
          </p>
          <ul>
            <li>Companionship for social events</li>
            <li>Travel companionship</li>
            <li>Dinner dates</li>
            <li>Hotel visits (incall/outcall)</li>
            <li>Body massage services</li>
            <li>GFE (Girlfriend Experience)</li>
            <li>VIP escort services</li>
          </ul>

          <h3>Coverage Areas</h3>
          <p>
            We serve all major areas of Mumbai including but not limited to: Andheri East & West, 
            Bandra, Juhu, Powai, Lower Parel, Worli, Colaba, Fort, Churchgate, Marine Drive, 
            Malabar Hill, Versova, Goregaon, Malad, Kandivali, Borivali, Vile Parle, Santacruz, 
            Khar, Dadar, Parel, and Mumbai Central.
          </p>

          <h3>How to Book</h3>
          <p>
            Booking is simple and secure:
          </p>
          <ol>
            <li>Browse verified profiles in your preferred area</li>
            <li>Check availability and rates</li>
            <li>Contact via phone or WhatsApp</li>
            <li>Confirm your booking details</li>
            <li>Enjoy professional, discreet service</li>
          </ol>

          <h3>Safety & Discretion</h3>
          <p>
            Your safety and privacy are paramount. All our companions are:
          </p>
          <ul>
            <li>ID verified and background checked</li>
            <li>Bound by strict confidentiality agreements</li>
            <li>Professional and experienced</li>
            <li>Health conscious and hygiene focused</li>
          </ul>

          <h3>Pricing Information</h3>
          <p>
            Rates vary based on duration, service type, and companion experience. Typical ranges:
          </p>
          <ul>
            <li>1 Hour: ₹5,000 - ₹15,000</li>
            <li>2 Hours: ₹8,000 - ₹25,000</li>
            <li>Full Night: ₹20,000 - ₹50,000+</li>
            <li>VIP/Premium: Custom rates</li>
          </ul>

          <h3>Contact Us</h3>
          <p>
            For bookings and inquiries:
          </p>
          <p>
            📞 Phone: <a href={`tel:+91${phone}`}>+91-{phone}</a><br />
            💬 WhatsApp: <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
          </p>
          
          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only. 
            We strictly comply with all applicable laws and regulations. Please ensure you are of 
            legal age before accessing our services.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Are the profiles verified?
              </h3>
              <p className="text-neutral-600">
                Yes, all profiles on our platform are verified with ID proof and authentic photos. 
                We conduct thorough background checks to ensure safety and authenticity.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What areas do you cover in Mumbai?
              </h3>
              <p className="text-neutral-600">
                We cover all major areas of Mumbai including Andheri, Bandra, Juhu, Powai, Lower Parel, 
                Worli, Colaba, and many more. Our companions are available across the city 24/7.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                How do I make a booking?
              </h3>
              <p className="text-neutral-600">
                Simply browse profiles, select your preferred companion, and contact us via phone or WhatsApp. 
                Our team will help you complete the booking process securely and discreetly.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Is the service discreet?
              </h3>
              <p className="text-neutral-600">
                Absolutely. Your privacy is our top priority. All bookings are handled with complete 
                confidentiality, and our companions are professional and discreet.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-neutral-600">
                We accept cash payments. All rates are confirmed at the time of booking, with no hidden charges.
              </p>
            </div>
          </div>
        </section>

        {/* Other Cities */}
        <section className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Explore Other Cities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Delhi", slug: "delhi" },
              { name: "Bangalore", slug: "bangalore" },
              { name: "Pune", slug: "pune" },
              { name: "Hyderabad", slug: "hyderabad" },
              { name: "Chennai", slug: "chennai" },
              { name: "Kolkata", slug: "kolkata" },
              { name: "Ahmedabad", slug: "ahmedabad" },
              { name: "Jaipur", slug: "jaipur" },
            ].map((city) => (
              <Link
                key={city.slug}
                to={`/${city.slug}`}
                className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
              >
                <span className="font-semibold text-neutral-900">{city.name}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* Sticky Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 safe-bottom z-50 md:hidden">
        <div className="flex gap-3">
          <a 
            href={`tel:+91${phone}`}
            className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-pink-700 transition-colors"
          >
            Call Now
          </a>
          <a 
            href={`https://wa.me/91${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-600 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bangalore;
