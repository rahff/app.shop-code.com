import React, {useEffect, useState} from 'react';
import { ChevronLeft, ChevronRight, Calendar, TrendingUp, Users, Euro } from 'lucide-react';
import {promoStatisticsFactory} from "../../factory/promoStatisticsFactory.ts";
import {PromoStatisticsState} from "../../core/PromoStatistics/api/data.ts";

const promoStatistics = promoStatisticsFactory();


const PromoStatsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [state, setState] = useState<PromoStatisticsState>(promoStatistics.state);

  useEffect(() => {
    const onInit = () => {
      return promoStatistics.get_promo_statistics().subscribe(() => {
        setState({...promoStatistics.state});
      })
    }
    const subscription = onInit();
    return () => subscription.unsubscribe();
  }, [])

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
          {state.promo_stats.data.map((promo) => (
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
            {state.promo_stats.data.map((promo) => (
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
          <span className="hidden sm:inline">Showing {state.promo_stats.page + 1} to {Math.min(1 + state.promo_stats.per_page, state.promo_stats.data.length)} of {state.promo_stats.data.length} results</span>
          <span className="sm:hidden">{1}-{Math.min(1 + state.promo_stats.per_page, state.promo_stats.data.length)} of {state.promo_stats.data.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(state.promo_stats.page)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 text-[#2B2C34] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="hidden sm:flex items-center space-x-2">
            {Array.from({ length: state.promo_stats.nbr_of_page }, (_, i) => i + 1).map((page) => (
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
            <span className="text-sm text-[#2B2C34] font-medium">{currentPage} / {state.promo_stats.nbr_of_page}</span>
          </div>
          
          <button
            onClick={() => promoStatistics.get_promo_statistics(++state.promo_stats.page)}
            disabled={currentPage === state.promo_stats.nbr_of_page}
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