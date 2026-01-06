import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';

/**
 * Confirmation Page - Review booking before final confirmation
 */
const Confirmation = () => {
  const navigate = useNavigate();
  const { currentBooking, confirmBooking } = useBooking();

  // Redirect if no booking in progress
  if (!currentBooking || !currentBooking.date || !currentBooking.customerInfo) {
    navigate('/');
    return null;
  }

  const { service, date, time, customerInfo } = currentBooking;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleConfirm = () => {
    confirmBooking();
    navigate('/success');
  };

  const handleEdit = () => {
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-32">
      <Header showBack title="Confirm Booking" />

      <div className="container mx-auto px-4 py-6">
        {/* Success Animation */}
        <div className="text-center mb-6 animate-scale-in">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Almost Done!</h1>
          <p className="text-neutral-600">Please review your booking details</p>
        </div>

        {/* Booking Summary */}
        <div className="space-y-4">
          {/* Service Details */}
          <Card className="p-5 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-900">Service Details</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
              >
                Change
              </Button>
            </div>
            <div className="flex gap-4">
              <img 
                src={service.image} 
                alt={service.name}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="font-bold text-neutral-900 mb-1">{service.name}</h3>
                <p className="text-sm text-neutral-600 mb-2">{service.category}</p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-neutral-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {service.duration}
                  </span>
                  <span className="font-bold text-primary-600">${service.price}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Date & Time */}
          <Card className="p-5 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-900">Date & Time</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleEdit}
              >
                Edit
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-neutral-600">Date</div>
                  <div className="font-semibold text-neutral-900">{formatDate(date)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-neutral-600">Time</div>
                  <div className="font-semibold text-neutral-900">{time}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Customer Information */}
          <Card className="p-5 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-900">Your Information</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleEdit}
              >
                Edit
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-neutral-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <div className="text-sm text-neutral-600">Name</div>
                  <div className="font-medium text-neutral-900">{customerInfo.name}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-neutral-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="text-sm text-neutral-600">Email</div>
                  <div className="font-medium text-neutral-900">{customerInfo.email}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-neutral-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <div className="text-sm text-neutral-600">Phone</div>
                  <div className="font-medium text-neutral-900">{customerInfo.phone}</div>
                </div>
              </div>
              {customerInfo.notes && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-neutral-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <div>
                    <div className="text-sm text-neutral-600">Notes</div>
                    <div className="font-medium text-neutral-900">{customerInfo.notes}</div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Price Summary */}
          <Card className="p-5 bg-primary-50 border-2 border-primary-200 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-neutral-700">Service Price</span>
              <span className="font-semibold text-neutral-900">${service.price}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-primary-200">
              <span className="text-lg font-bold text-neutral-900">Total Amount</span>
              <span className="text-2xl font-bold text-primary-600">${service.price}</span>
            </div>
          </Card>

          {/* Terms */}
          <div className="text-center text-sm text-neutral-600 px-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            By confirming, you agree to our Terms of Service and Cancellation Policy
          </div>
        </div>
      </div>

      {/* Sticky Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-neutral-200 p-4 safe-bottom z-50">
        <div className="container mx-auto space-y-3">
          <Button 
            size="lg" 
            fullWidth 
            onClick={handleConfirm}
            className="shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Confirm Booking
          </Button>
          <Button 
            variant="outline" 
            size="md" 
            fullWidth 
            onClick={handleEdit}
          >
            Edit Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;