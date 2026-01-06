import React, { useState } from 'react';
import { Users } from 'lucide-react';

const TermsModal = ({ onAccept, onDecline, show = true }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleAccept = () => {
    if (isChecked) {
      console.log('Accept clicked');
      localStorage.setItem('ageVerified', 'true');
      if (onAccept) {
        onAccept();
      } else {
        // Default action: redirect to home page
        window.location.href = '/';
      }
    } else {
      alert('Please accept the terms and conditions');
    }
  };

  const handleDecline = () => {
    console.log('Decline clicked');
    if (onDecline) {
      onDecline();
    } else {
      // Default action: redirect away
      window.location.href = 'https://google.com';
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="flex items-center justify-center bg-gray-100 rounded-full p-4">
              <Users className="w-8 h-8 text-gray-400" strokeWidth={2} />
            </div>
            <div className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
              18+
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Please read the following warning<br />before continuing
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6 leading-relaxed">
          <span className="font-semibold">I am over 18 years old</span> and I accept the
          viewing of explicit texts and images
          intended for an <span className="font-semibold">adult audience</span>.
        </p>

        {/* Checkbox */}
        <div className="flex items-start mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mt-1 mr-3 w-4 h-4 accent-pink-600 cursor-pointer"
          />
          <label htmlFor="terms" className="text-gray-600 cursor-pointer select-none">
            I have read and accept the{' '}
            <span className="text-pink-600 font-medium">TERMS AND CONDITIONS</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleAccept}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
              isChecked
                ? 'bg-pink-600 hover:bg-pink-700 cursor-pointer'
                : 'bg-pink-400 hover:bg-pink-500 cursor-pointer'
            }`}
          >
            ACCEPT
          </button>
          <button
            onClick={handleDecline}
            className="w-full py-3 px-6 rounded-lg font-semibold text-pink-600 hover:bg-pink-50 transition-all"
          >
            DECLINE
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;