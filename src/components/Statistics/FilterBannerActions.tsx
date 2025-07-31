import React, { useState } from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export interface FilterState {
  nbr_of_issues: { min: number | null; max: number | null };
  total_conversion: { min: number | null; max: number | null };
  total_revenue: { min: number | null; max: number | null };
  collected_customers: { min: number | null; max: number | null };
}

interface FilterBannerActionsProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onResetFilters: () => void;
}

const FilterBannerActions: React.FC<FilterBannerActionsProps> = ({
  filters,
  onFiltersChange,
  onResetFilters
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (
    field: keyof FilterState,
    type: 'min' | 'max',
    value: string
  ) => {
    const numValue = value === '' ? null : Number(value);
    onFiltersChange({
      ...filters,
      [field]: {
        ...filters[field],
        [type]: numValue
      }
    });
  };

  const filterFields = [
    { key: 'nbr_of_issues' as const, label: 'Issues', icon: '📊' },
    { key: 'total_conversion' as const, label: 'Conversions', icon: '🔄' },
    { key: 'total_revenue' as const, label: 'Revenue (€)', icon: '💰' },
    { key: 'collected_customers' as const, label: 'Customers', icon: '👥' }
  ];

  const hasActiveFilters = Object.values(filters).some(
    filter => filter.min !== null || filter.max !== null
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#6C63FF]/10 rounded-lg flex items-center justify-center">
            <Filter className="w-5 h-5 text-[#6C63FF]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter']">Filter Promos</h3>
            <p className="text-[#A0A0A8] text-sm">Filter promotional campaigns by performance metrics</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-[#A0A0A8] hover:text-[#6C63FF] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isExpanded
                ? 'bg-[#6C63FF] text-white'
                : 'border-2 border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white'
            }`}
          >
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          {filterFields.map((field) => (
            <div key={field.key} className="space-y-2">
              <label className="block text-sm font-medium text-[#2B2C34]">
                <span className="mr-2">{field.icon}</span>
                {field.label}
              </label>
              
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters[field.key].min ?? ''}
                  onChange={(e) => handleFilterChange(field.key, 'min', e.target.value)}
                  className="flex-1 px-3 py-2 border border-[#A0A0A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters[field.key].max ?? ''}
                  onChange={(e) => handleFilterChange(field.key, 'max', e.target.value)}
                  className="flex-1 px-3 py-2 border border-[#A0A0A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filterFields.map((field) => {
              const filter = filters[field.key];
              if (filter.min === null && filter.max === null) return null;
              
              return (
                <span
                  key={field.key}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#6C63FF]/10 text-[#6C63FF]"
                >
                  {field.label}: {filter.min ?? '∞'} - {filter.max ?? '∞'}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBannerActions;