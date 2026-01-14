/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  // Initialize state from localStorage or use defaults
  const [currentBooking, setCurrentBooking] = useState(() => {
    const savedBooking = localStorage.getItem('currentBooking');
    return savedBooking ? JSON.parse(savedBooking) : null;
  });

  const [bookingHistory, setBookingHistory] = useState(() => {
    const savedHistory = localStorage.getItem('bookingHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Persist current booking to localStorage whenever it changes
  useEffect(() => {
    if (currentBooking) {
      localStorage.setItem('currentBooking', JSON.stringify(currentBooking));
    } else {
      localStorage.removeItem('currentBooking');
    }
  }, [currentBooking]);

  // Persist booking history to localStorage
  useEffect(() => {
    localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));
  }, [bookingHistory]);

  // Start a new booking with selected service and variant
  const startBooking = (service, variant) => {
    const booking = {
      id: Date.now(),
      service,
      variant,
      date: null,
      time: null,
      customerInfo: null,
      status: 'draft',
      createdAt: new Date().toISOString()
    };
    setCurrentBooking(booking);
  };

  // Update booking details
  const updateBooking = (updates) => {
    setCurrentBooking(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Confirm and save booking to history
  const confirmBooking = () => {
    if (!currentBooking) return;

    const confirmedBooking = {
      ...currentBooking,
      status: 'confirmed',
      confirmedAt: new Date().toISOString()
    };

    setBookingHistory(prev => [confirmedBooking, ...prev]);
    setCurrentBooking(null);
    
    return confirmedBooking;
  };

  // Cancel current booking
  const cancelBooking = () => {
    setCurrentBooking(null);
  };

  // Clear booking history
  const clearHistory = () => {
    setBookingHistory([]);
  };

  // Get booking by ID from history
  const getBookingById = (id) => {
    return bookingHistory.find(booking => booking.id === id);
  };

  const value = {
    currentBooking,
    bookingHistory,
    startBooking,
    updateBooking,
    confirmBooking,
    cancelBooking,
    clearHistory,
    getBookingById
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};