import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import LazyImage from '../components/LazyImage';
import { services } from '../data/services';

const phone = "07633807420";

const MumbaiEscortServices = () => {
  const premiumServices = services.slice(0, 4);

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Mumbai Escort Services 2026 — 500+ Verified Profiles | BookEase"
        description=" 500+ verified Mumbai escorts  Andheri, Bandra, Juhu  24/7 service  Safe booking. Book premium companions. 18+ only. Verified today!"
        canonical="https://www.escortmumbaii.in/mumbai-escort-services"
      />
      <Header showBack title="Mumbai Escort Services" />

      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Mumbai Escort Services 2026
          </h1>
          <p className="text-xl mb-6">
            Complete guide to finding and booking verified escorts in Mumbai.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={`tel:+91${phone}`} className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold">
              Call Now
            </a>
            <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Featured Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MumbaiEscortServices;
