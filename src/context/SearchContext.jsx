/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
    setIsSearchActive(query.trim() !== '');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchActive(false);
  };

  const value = {
    searchQuery,
    isSearchActive,
    updateSearchQuery,
    clearSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};