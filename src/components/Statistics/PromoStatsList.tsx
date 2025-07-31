import React, { useEffect, useState } from 'react';
import { Calendar, TrendingUp, Users, Euro, Loader2, Plus } from 'lucide-react';
import { PromoStatisticsState, PromoStats } from "../../core/PromoStatistics/api/data.ts";
import { GetPromoStatistics } from "../../core/PromoStatistics/api/PromoStatistics.ts";
import { FilterState } from './FilterBannerActions';

interface PromoStatsListProps {
  getPromoStatistics: GetPromoStatistics;
  shopId: string;
  filters: FilterState;
}

const PromoStatsList: React.FC<PromoStatsListProps> = ({ getPromoStatistics, shopId, filters }) => {
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
      if (state.promo_stats?.data) {
        // Sort by created_at descending (most recent first)
        const sortedData = [...state.promo_stats.data].sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setPromos(sortedData);
        setLastEvaluatedKey(state.promo_stats.last_evaluated_key);
        setHasMoreData(!!state.promo_stats.last_evaluated_key);
      }
      setIsLoading(false);
    });
  }, [getPromoStatistics, shopId]);

  // Apply filters to promos
  const filteredPromos = promos.filter((promo) => {
    return Object.entries(filters).every(([key, filter]) => {
      const value = promo[key as keyof PromoStats] as number;
      const { min, max } = filter;
      
      if (min !== null && value < min) return false;
      if (max !== null && value > max) return false;
      
      return true;
    });
  });

  const handleLoadMore = () => {
    if (hasMoreData && lastEvaluatedKey) {
      setIsLoadingMore(true);
      
      getPromoStatistics(shopId, lastEvaluatedKey).then((state: PromoStatisticsState) => {
        if (state.promo_stats?.data) {
          // Sort new data and append to existing promos
          const sortedNewData = [...state.promo_stats.data].sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setPromos(prev => [...prev, ...sortedNewData]);
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
          <h3 className="text-lg sm:text-xl font-semibold text-[#2B2C34] font-['Inter']">Recent Promos</h3>
          <p className="text-[#A0A0A8] text-sm mt-1">Latest promotional campaigns and their performance</p>
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h3 className="text-lg sm:text-xl font-semibold text-[#2B2C34] font-['Inter']">Recent Promos</h3>
        <p className="text-[#A0A0A8] text-sm mt-1">
          Latest promotional campaigns and their performance
          {filteredPromos.length !== promos.length && (
            <span className="ml-2 text-[#6C63FF]">({filteredPromos.length} of {promos.length} shown)</span>
          )}
        </p>
      </div>

      {filteredPromos.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#2B2C34] mb-2">No promos found</h3>
          <p className="text-[#A0A0A8]">
            {promos.length === 0 
              ? "No promotional campaigns available yet."
              : "No promos match your current filter criteria."
            }
          </p>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block lg:hidden divide-y divide-gray-200">
            {filteredPromos.map((promo) => (
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
                {filteredPromos.map((promo) => (
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
        </>
      )}
    </div>
  );
};

export default PromoStatsList;