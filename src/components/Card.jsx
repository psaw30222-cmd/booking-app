import React from 'react';

/**
 * Reusable Card Component
 * @param {string} variant - 'default', 'elevated', 'bordered'
 * @param {boolean} clickable - Add hover effects for clickable cards
 */
const Card = ({ 
  children, 
  variant = 'default',
  clickable = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseStyles = 'bg-white rounded-2xl transition-all duration-200';
  
  const variants = {
    default: 'shadow-sm',
    elevated: 'shadow-lg',
    bordered: 'border-2 border-neutral-200'
  };
  
  const clickableStyles = clickable 
    ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1 active:scale-98' 
    : '';
  
  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${clickableStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;