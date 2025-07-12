import React from 'react';
import { ClipLoader } from 'react-spinners';

interface LoaderProps {
  'aria-label'?: string;
  size?: number;
  color?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  'aria-label': ariaLabel = 'Loading...',
  size = 40,
  color = '#6C63FF',
  className = ''
}) => {
  return (
    <div 
      className={`flex items-center justify-center py-16 ${className}`}
      role="status"
      aria-label={ariaLabel}
    >
      <div className="flex flex-col items-center space-y-4">
        <ClipLoader
          color={color}
          size={size}
          aria-hidden="true"
        />
        <p className="text-[#A0A0A8] text-sm font-medium">
          {ariaLabel}
        </p>
      </div>
    </div>
  );
};

export default Loader;