import React from 'react';
import { TrendingUp, Users, Euro, Gift, ChevronDown } from 'lucide-react';

export type SortOption = 'revenue' | 'customers' | 'conversion' | 'issued';

interface SortControlsProps {
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  className?: string;
}

const SortControls: React.FC<SortControlsProps> = ({ 
  selectedSort, 
  onSortChange, 
  className = '' 
}) => {
  const sortOptions = [
    {
      value: 'revenue' as const,
      label: 'Most Revenue',
      description: 'Highest earning promos first',
      icon: Euro,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      value: 'customers' as const,
      label: 'Most Customers',
      description: 'Highest customer acquisition',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      value: 'conversion' as const,
      label: 'Best Conversion',
      description: 'Highest conversion rates',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      value: 'issued' as const,
      label: 'Most Popular',
      description: 'Most coupons issued',
      icon: Gift,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const selectedOption = sortOptions.find(option => option.value === selectedSort);

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="sort-select" className="block text-sm font-medium text-[#2B2C34] mb-2">
        Sort by Performance
      </label>
      
      {/* Custom Select Dropdown */}
      <div className="relative">
        <select
          id="sort-select"
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 text-[#2B2C34] font-medium focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-all duration-200 cursor-pointer hover:border-[#6C63FF]/50"
          aria-label="Sort promotional campaigns by performance metric"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-[#A0A0A8]" />
        </div>
      </div>

      {/* Selected option description */}
      {selectedOption && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-[#A0A0A8]">
          <selectedOption.icon className={`w-4 h-4 ${selectedOption.color}`} />
          <span>{selectedOption.description}</span>
        </div>
      )}

      {/* Alternative: Button-based sort controls for better UX */}
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2">
        {sortOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedSort === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? `${option.bgColor} ${option.color} ring-2 ring-current ring-opacity-20`
                  : 'bg-gray-50 text-[#A0A0A8] hover:bg-gray-100 hover:text-[#2B2C34]'
              }`}
              aria-pressed={isSelected}
              aria-label={`Sort by ${option.label.toLowerCase()}`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{option.label}</span>
              <span className="sm:hidden">{option.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SortControls;