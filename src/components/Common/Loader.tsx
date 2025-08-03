import React from 'react';
import { Loader2 } from 'lucide-react';

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
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
            <Loader2
              className="animate-spin text-white"
              size={size}
              aria-hidden="true"
            />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
        </div>
        <p className="text-[#A0A0A8] text-lg font-medium gradient-text">
          {ariaLabel}
        </p>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-[#6C63FF] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-[#5845E9] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-[#4A3BC7] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;