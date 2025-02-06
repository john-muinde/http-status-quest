// src/components/ui/alert.jsx
import React from 'react';

const Alert = ({ children, variant = 'default', className = '' }) => {
  const baseStyle = 'p-4 rounded-lg border';
  const variants = {
    default: 'bg-white border-gray-200',
    destructive: 'bg-red-50 border-red-200 text-red-700',
  };

  return (
    <div className={`${baseStyle} ${variants[variant]} ${className}`} role="alert">
      {children}
    </div>
  );
};

const AlertTitle = ({ children, className = '' }) => (
  <h5 className={`mb-1 font-medium ${className}`}>
    {children}
  </h5>
);

const AlertDescription = ({ children, className = '' }) => (
  <div className={`text-sm ${className}`}>
    {children}
  </div>
);

export { Alert, AlertTitle, AlertDescription };