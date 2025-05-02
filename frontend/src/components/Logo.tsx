
import React from 'react';

const Logo = ({ className, size = 'default' }: { className?: string, size?: 'default' | 'mini' }) => {
  if (size === 'mini') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg 
          className="w-8 h-8" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 2L2 7L12 12L22 7L12 2Z" 
            fill="#2563EB" 
            stroke="#2563EB" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M2 17L12 22L22 17" 
            stroke="#14B8A6" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M2 12L12 17L22 12" 
            stroke="#14B8A6" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        className="w-8 h-8 mr-2" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 2L2 7L12 12L22 7L12 2Z" 
          fill="#2563EB" 
          stroke="#2563EB" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M2 17L12 22L22 17" 
          stroke="#14B8A6" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M2 12L12 17L22 12" 
          stroke="#14B8A6" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-xl font-bold text-text-primary dark:text-white">InsightSprint</span>
    </div>
  );
};

export default Logo;