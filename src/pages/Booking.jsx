import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { getVariantGallery } from "../data/variantGalleries";
import Header from "../components/Header";
import Button from "../components/Button";
import { trackEvent } from '../utils/analytics';

const phone = "9999999999";

/**
 * Booking Page - Complete booking flow with variant-specific galleries
 * Features:
 * - Service and variant summary
 * - Unique image gallery for each variant (based on variant ID)
 * - Date selection
 * - Time slot selection
 * - Barber selection
 * - Booking confirmation
 */
const Booking = () => {
  const navigate = useNavigate();
  const { currentBooking, updateBooking } = useBooking();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);

  // Redirect if no booking started
  if (!currentBooking || !currentBooking.service || !currentBooking.variant) {
    navigate("/");
    return null;
  }

  // Extract service and variant from currentBooking
  const { service, variant } = currentBooking;

  // Get the unique gallery for this specific variant
  const variantGallery = getVariantGallery(variant.id);

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime || !selectedBarber) {
      alert("Please select date, time, and barber");
      return;
    }

    // Update booking with selected details
    updateBooking({
      date: selectedDate,
      time: selectedTime,
      barber: selectedBarber,
    });

    // Analytics: user provided booking details (proceed to confirmation)
    trackEvent('add_payment_info', {
      service_id: service.id,
      service_name: service.name,
      value: service.price,
      currency: 'INR',
      date: selectedDate,
      time: selectedTime
    });

    // Navigate to confirmation
    navigate("/confirmation");
  };

  // Generate next 7 days
  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        day: weekdays[date.getDay()],
        date: date.getDate(),
        month: date.toLocaleString('default', { month: 'short' }),
        full: date.toLocaleDateString()
      });
    }
    return days;
  };

  const dates = getNextSevenDays();
  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
  
  // 12+ barbers with professional images
  const barbers = [
    { 
      name: "John Smith", 
      rating: 4.9, 
      experience: "5 years",
      image: "https://i.pravatar.cc/150?img=12",
      specialty: "Classic Cuts"
    },
    { 
      name: "Mike Johnson", 
      rating: 4.8, 
      experience: "4 years",
      image: "https://i.pravatar.cc/150?img=13",
      specialty: "Beard Styling"
    },
    { 
      name: "David Brown", 
      rating: 4.9, 
      experience: "6 years",
      image: "https://i.pravatar.cc/150?img=14",
      specialty: "Modern Fades"
    },
    { 
      name: "Alex Martinez", 
      rating: 4.7, 
      experience: "3 years",
      image: "https://i.pravatar.cc/150?img=15",
      specialty: "Hair Design"
    },
    { 
      name: "Chris Lee", 
      rating: 4.9, 
      experience: "7 years",
      image: "https://i.pravatar.cc/150?img=33",
      specialty: "Traditional Cuts"
    },
    { 
      name: "Ryan Garcia", 
      rating: 4.8, 
      experience: "5 years",
      image: "https://i.pravatar.cc/150?img=51",
      specialty: "Trendy Styles"
    },
    { 
      name: "Marcus Williams", 
      rating: 4.7, 
      experience: "4 years",
      image: "https://i.pravatar.cc/150?img=52",
      specialty: "Skin Fades"
    },
    { 
      name: "James Taylor", 
      rating: 4.9, 
      experience: "8 years",
      image: "https://i.pravatar.cc/150?img=53",
      specialty: "All Styles"
    },
    { 
      name: "Kevin Anderson", 
      rating: 4.8, 
      experience: "3 years",
      image: "https://i.pravatar.cc/150?img=54",
      specialty: "Creative Cuts"
    },
    { 
      name: "Tommy Robinson", 
      rating: 4.7, 
      experience: "5 years",
      image: "https://i.pravatar.cc/150?img=56",
      specialty: "Pompadours"
    },
    { 
      name: "Brandon Clark", 
      rating: 4.9, 
      experience: "6 years",
      image: "https://i.pravatar.cc/150?img=57",
      specialty: "Textured Cuts"
    },
    { 
      name: "Eric White", 
      rating: 4.8, 
      experience: "4 years",
      image: "https://i.pravatar.cc/150?img=58",
      specialty: "Buzz Cuts"
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pb-32">
      <Header showBack title="Book Appointment" />

      <div className="container mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">

        {/* SERVICE SUMMARY */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
          <div className="flex gap-3 sm:gap-4">
            <img
              src={variant.image}
              alt={variant.name}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl sm:rounded-2xl"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {service.category}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">
                {service.name}
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 mt-1 truncate">
                {variant.name}
              </p>
              <div className="flex items-center gap-3 sm:gap-4 mt-2">
                <span className="text-pink-600 font-bold text-lg sm:text-xl">
                  ${variant.price}
                </span>
                <span className="text-neutral-500 text-xs sm:text-sm flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {variant.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* VARIANT-SPECIFIC GALLERY */}
        {variantGallery.length > 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                  {variant.name} Gallery
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                  Examples of this specific style
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {variantGallery.length}
              </div>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
              {variantGallery.map((img, idx) => (
                <div 
                  key={idx}
                  className="relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group bg-neutral-100"
                >
                  <img 
                    src={img} 
                    alt={`${variant.name} Style ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                    Style #{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DATE SELECTION */}
        
      </div>
<div className="flex gap-3 w-full mt-4">
                        {/* CALL BUTTON */}
                        <a
                          href={`tel:${phone}`}
                          className="flex-1 flex items-center justify-center gap-2
                                     bg-[#c2186a] text-white
                                     py-3 rounded-xl
                                     font-semibold text-sm
                                     shadow-md hover:opacity-90 transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          Call
                        </a>

                        {/* WHATSAPP BUTTON */}
                        <a
                          href={`https://wa.me/91${phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2
                                     bg-[#25D366] text-white
                                     py-3 rounded-xl
                                     font-semibold text-sm
                                     shadow-md hover:opacity-90 transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 32 32"
                            fill="currentColor"
                          >
                            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.82.834 5.445 2.27 7.65L2 30l6.5-2.18A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5c-2.2 0-4.245-.65-5.96-1.77l-.43-.28-3.85 1.29 1.29-3.75-.28-.44A11.43 11.43 0 014.5 16C4.5 9.66 9.66 4.5 16 4.5S27.5 9.66 27.5 16 22.34 27.5 16 27.5z"/>
                          </svg>
                          WhatsApp
                        </a>
                      </div>

    </div>
  );
};

export default Booking;