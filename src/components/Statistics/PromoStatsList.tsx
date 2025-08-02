import React, { useEffect, useState } from 'react';
import { Calendar, TrendingUp, Users, Euro, Loader2, Plus } from 'lucide-react';
import { PromoStatisticsState, PromoStats } from "../../core/PromoStatistics/api/data.ts";
import { GetPromoStatistics } from "../../core/PromoStatistics/api/PromoStatistics.ts";
import { SortOption } from './SortControls';
import TopPromoCard from './TopPromoCard';

interface PromoStatsListProps {
  getPromoStatistics: GetPromoStatistics;
  shopId: string;
  selectedSort: SortOption;
}

const PromoStatsList: React.FC<PromoStatsListProps> = ({ getPromoStatistics, shopId, selectedSort }) => {
  const [promos, setPromos] = useState<PromoStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<{ primary_key: string; sort_key: string } | undefined>();
  const [hasMoreData, setHasMoreData] = useState(false);

  // Load initial data
  useEffect(() => {
    setIsLoading(true);
    setPromos([]);
    setLastEvaluatedKey(undefined);
    
    getPromoStatistics(shopId).then((state: PromoStatisticsState) => {
      console.log(state);
      setPromos([...state.promo_stats.data]);
      setLastEvaluatedKey(state.promo_stats.last_evaluated_key);
      setHasMoreData(!!state.promo_stats.last_evaluated_key);
      setIsLoading(false);
      console.log("promos", promos);
    });
  }, [getPromoStatistics, shopId]);

  // Sort promos based on selected criterion
  const sortedPromos = React.useMemo(() => {
    const sorted = [...promos].sort((a, b) => {
      switch (selectedSort) {
        case 'revenue':
          return b.total_revenue - a.total_revenue;
        case 'customers':
          return b.collected_customers - a.collected_customers;
        case 'conversion':
          return b.total_conversion - a.total_conversion;
        case 'issued':
          return b.nbr_of_issues - a.nbr_of_issues;
        default:
          return b.total_revenue - a.total_revenue;
      }
    });
    return sorted;
  }, [promos, selectedSort]);

  // Get top promo and remaining promos
  const topPromo = sortedPromos[0];
  const remainingPromo = sortedPromos.slice(1);
  const handleLoadMore = () => {
    if (hasMoreData && lastEvaluatedKey) {
      setIsLoadingMore(true);
      
      getPromoStatistics(shopId, lastEvaluatedKey).then((state: PromoStatisticsState) => {
        if (state.promo_stats?.data) {
          setPromos(prev => [...prev, ...state.promo_stats.data]);
          setLastEvaluatedKey(state.promo_stats.last_evaluated_key);
          setHasMoreData(!!state.promo_stats.last_evaluated_key);
        }
        setIsLoadingMore(false);
      });
    }
  };

  const canLoadMore = hasMoreData;

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

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg sm:text-xl font-semibold text-[#2B2C34] font-['Inter']">Performance Rankings</h3>
          <p className="text-[#A0A0A8] text-sm mt-1">Your promotional campaigns ranked by performance</p>
        </div>
        <div className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 text-[#6C63FF] animate-spin" />
            <p className="text-[#A0A0A8] text-sm">Loading promo statistics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!topPromo) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#2B2C34] mb-2">No promos found</h3>
          <p className="text-[#A0A0A8]">No promotional campaigns available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Promo Card */}
      <TopPromoCard 
        promo={topPromo} 
        sortCriterion={selectedSort}
        onViewDetails={(promo) => {
          console.log('Navigate to promo details:', promo.id);
          // TODO: Implement navigation to promo details
        }}
      />

      {remainingPromo.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold text-[#2B2C34] font-['Inter']">Other High Performers</h3>
            <p className="text-[#A0A0A8] text-sm mt-1">
              Remaining campaigns sorted by {selectedSort === 'revenue' ? 'revenue' : selectedSort === 'customers' ? 'customer acquisition' : selectedSort === 'conversion' ? 'conversion rate' : 'popularity'}
            </p>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden divide-y divide-gray-200">
            {remainingPromo.map((promo, index) => (
              <div key={promo.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#6C63FF]/10 rounded-lg flex items-center justify-center text-sm font-bold text-[#6C63FF]">
                      #{index + 2}
                    </div>
                    <h4 className="font-semibold text-[#2B2C34] flex-1 pr-2">{promo.name}</h4>
                  </div>
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

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider">
                    Rank & Promo Name
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
                {remainingPromo.map((promo, index) => (
                  <tr key={promo.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#6C63FF]/10 rounded-lg flex items-center justify-center text-sm font-bold text-[#6C63FF]">
                          #{index + 2}
                        </div>
                        <div>
                          <div className="font-medium text-[#2B2C34]">{promo.name}</div>
                          <div className="text-sm text-[#A0A0A8]">Created {formatDate(promo.created_at)}</div>
                        </div>
                      </div>
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

          {/* Load More Button */}
          {canLoadMore && (
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 text-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#6C63FF] text-white rounded-lg font-medium hover:bg-[#5845E9] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Load More</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromoStatsList;