import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

const phone = "07633807420";

const MassageEscortServices = () => {
  const massageServices = services.filter(service => 
    service.name.toLowerCase().includes('massage') || 
    service.description.toLowerCase().includes('massage')
  ).slice(0, 6);

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Massage Escort Services 2026 — Professional Massage Companions"
        description="Verified massage escort services with professional companions offering sensual massage experiences. Discreet booking and verified profiles."
        canonical="https://www.escortmumbaii.in/massage-escort-services"
        entityType="article"
        lang="en-IN"
      />
      
      <Header showBack title="Massage Escort Services" />
      
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Professional Massage Escort Services</h1>
          <p className="text-xl max-w-3xl">
            Verified companions offering professional massage services with discretion and expertise.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {massageServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MassageEscortServices;