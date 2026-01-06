import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

/**
 * Header Component with back navigation
 */
const Header = ({ title, showBack = false }) => {
  const navigate = useNavigate();
  const { searchQuery, updateSearchQuery } = useSearch();
  const [query, setQuery] = useState('');

  // Initialize query with current searchQuery
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      updateSearchQuery(query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } else {
      // If query is empty, go to home page
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    updateSearchQuery('');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200 safe-top">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Back Button */}
          {showBack && (
            <button
              onClick={handleBack}
              className="thumb-zone -ml-2 mr-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Go back"
            >
              <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Search Bar - Show when not showing title or back button */}
          {!title && !showBack && (
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Search services, categories, or locations..."
                  className="w-full bg-gray-100 rounded-full py-2.5 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white focus:border-pink-500"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Logo - Show when no title and no back button */}
          {!title && !showBack && (
            <div 
              onClick={() => navigate('/')}
              className="cursor-pointer flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BE</span>
              </div>
              <span className="text-xl font-bold text-neutral-900">BookEase</span>
            </div>
          )}

          {/* Title - Show when explicitly provided */}
          {title && (
            <h1 className="text-xl font-bold text-neutral-900">{title}</h1>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;