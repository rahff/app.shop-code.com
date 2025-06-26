import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, TrendingUp, Users, Euro } from 'lucide-react';
import {PromoStats} from "../../core/PromoStatistics/api/data.ts";


const PromoStatsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock data for demonstration
  const mockPromoStats: PromoStats[] = [
    {
      id: '1',
      shop_id: 'shop1',
      name: 'Summer Sale 2025',
      created_at: '2025-01-15T10:00:00Z',
      validity_range: { start: '2025-06-01', end: '2025-08-31' },
      nbr_of_issues: 245,
      total_conversion: 89,
      total_revenue: 15420,
      collected_customers: 156
    },
    {
      id: '2',
      shop_id: 'shop1',
      name: 'Coffee Loyalty Program',
      created_at: '2025-01-01T09:00:00Z',
      validity_range: { start: '2025-01-01', end: '2025-12-31' },
      nbr_of_issues: 1200,
      total_conversion: 340,
      total_revenue: 8900,
      collected_customers: 280
    },
    {
      id: '3',
      shop_id: 'shop1',
      name: 'Weekend Special',
      created_at: '2025-01-10T14:30:00Z',
      validity_range: { start: '2025-01-15', end: '2025-03-15' },
      nbr_of_issues: 89,
      total_conversion: 23,
      total_revenue: 2340,
      collected_customers: 45
    },
    {
      id: '4',
      shop_id: 'shop1',
      name: 'New Year Blast',
      created_at: '2024-12-28T16:00:00Z',
      validity_range: { start: '2025-01-01', end: '2025-01-07' },
      nbr_of_issues: 567,
      total_conversion: 123,
      total_revenue: 12800,
      collected_customers: 98
    },
    {
      id: '5',
      shop_id: 'shop1',
      name: 'Valentine Special',
      created_at: '2025-02-01T11:00:00Z',
      validity_range: { start: '2025-02-10', end: '2025-02-16' },
      nbr_of_issues: 234,
      total_conversion: 67,
      total_revenue: 5600,
      collected_customers: 78
    }
  ];

  const perPage = 5;
  const totalPages = Math.ceil(mockPromoStats.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentData = mockPromoStats.slice(startIndex, startIndex + perPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatValidityRange = (range: { start: string; end: string }) => {
    return `${formatDate(range.start)} - ${formatDate(range.end)}`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h3 className="text-lg sm:text-xl font-semibold text-[#2B2C34] font-['Inter']">Promo Performance</h3>
        <p className="text-[#A0A0A8] text-sm mt-1">Detailed analytics for each promotional campaign</p>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden">
        <div className="divide-y divide-gray-200">
          {currentData.map((promo) => (
            <div key={promo.id} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-[#2B2C34] flex-1 pr-2">{promo.name}</h4>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 flex-shrink-0">
                  {promo.nbr_of_issues} issues
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-[#A0A0A8] mb-3">
                <Calendar className="w-4 h-4 text-[#6C63FF]" />
                <span className="text-xs">{formatValidityRange(promo.validity_range)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Euro className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-xs text-[#A0A0A8]">Revenue</p>
                    <p className="font-semibold text-[#2B2C34]">€{promo.total_revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-[#A0A0A8]">Conversions</p>
                    <p className="font-semibold text-[#2B2C34]">{promo.total_conversion}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider">
                Promo Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider">
                Validity Range
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider">
                Total Revenue
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider">
                Conversions
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider">
                Customers
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider">
                Issues
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((promo) => (
              <tr key={promo.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div className="font-medium text-[#2B2C34]">{promo.name}</div>
                  <div className="text-sm text-[#A0A0A8]">Created {formatDate(promo.created_at)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2 text-sm text-[#2B2C34]">
                    <Calendar className="w-4 h-4 text-[#6C63FF]" />
                    <span>{formatValidityRange(promo.validity_range)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Euro className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-[#2B2C34]">€{promo.total_revenue.toLocaleString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-[#2B2C34]">{promo.total_conversion}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-[#2B2C34]">{promo.collected_customers}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {promo.nbr_of_issues}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-[#A0A0A8]">
          <span className="hidden sm:inline">Showing {startIndex + 1} to {Math.min(startIndex + perPage, mockPromoStats.length)} of {mockPromoStats.length} results</span>
          <span className="sm:hidden">{startIndex + 1}-{Math.min(startIndex + perPage, mockPromoStats.length)} of {mockPromoStats.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 text-[#2B2C34] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="hidden sm:flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  currentPage === page
                    ? 'bg-[#6C63FF] text-white'
                    : 'text-[#2B2C34] hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <div className="sm:hidden flex items-center space-x-2">
            <span className="text-sm text-[#2B2C34] font-medium">{currentPage} / {totalPages}</span>
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 text-[#2B2C34] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoStatsTable;