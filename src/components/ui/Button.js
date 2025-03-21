import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
