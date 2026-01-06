import React from 'react';

/**
 * Reusable Input Component
 * @param {string} label - Input label
 * @param {string} error - Error message
 * @param {string} type - Input type (text, email, tel, date, etc.)
 */
const Input = ({ 
  label, 
  error, 
  type = 'text',
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          w-full px-4 py-3 
          bg-white border-2 border-neutral-200 
          rounded-xl 
          text-neutral-900 placeholder-neutral-400
          transition-all duration-200
          focus:border-primary-500 focus:ring-2 focus:ring-primary-100
          disabled:bg-neutral-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;