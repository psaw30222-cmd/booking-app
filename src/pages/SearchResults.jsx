import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { useSearch } from '../context/SearchContext';
import { services } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import Header from '../components/Header';

const SearchResults = () => {
  const { searchQuery, updateSearchQuery } = useSearch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    // Update search context when search results page loads
    if (query) {
      updateSearchQuery(query);
    }
  }, [query, updateSearchQuery]);

  // Filter services based on search query
  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(query.toLowerCase()) ||
    service.category.toLowerCase().includes(query.toLowerCase()) ||
    service.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title={`Search results for "${query}" — BookEase`}
        description={`Search results for "${query}" across our services. Find and book verified companions and services.`}
        canonical={`https://bookease.com/search?q=${encodeURIComponent(query)}`}
        meta={[{ name: 'keywords', content: `search results, ${query}` }]}
      />
      
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600 text-lg">
            {filteredServices.length} result{filteredServices.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-neutral-600 mb-4">No services found matching your search</p>
            <Link 
              to="/" 
              className="inline-block px-6 py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 transition-colors"
            >
              Browse All Services
            </Link>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
            {filteredServices.map((service, index) => (
              <div key={service.id} style={{animationDelay: `${index * 0.1}s`}}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;