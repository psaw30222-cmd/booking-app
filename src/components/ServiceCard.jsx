import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ServiceCard - Displays service-level information only (no variants)
 * Used on Home page to show services in a clean, minimal layout
 */
const ServiceCard = ({ service }) => {
  return (
    <Link 
      to={`/service/${service.id}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-semibold text-neutral-800">
            {service.category}
          </span>
        </div>

        {/* Price Range Badge */}
        <div className="absolute bottom-4 right-4">
          <span className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            From ${Math.min(...service.variants.map(v => v.price))}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-pink-600 transition-colors">
          {service.name}
        </h3>
        
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {service.availability}
          </div>
          
          <div className="text-pink-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
            View Options →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;