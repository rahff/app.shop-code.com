import React, {useEffect, useState} from 'react';
import { TrendingUp, Users, Euro, Gift, Loader2 } from 'lucide-react';

import {
  GetShopStatistics,
  shopStatisticsInitialState,
  ShopStatisticsState
} from "../../core/ShopStatistics/api/ShopStatistics.ts";

interface ShopStatisticsComponentProps {
  getShopStatistics: GetShopStatistics;
  shopId: string;
}


const ShopMetrics: React.FC<ShopStatisticsComponentProps> = ({getShopStatistics, shopId}) => {
  const [state, setState] = useState<ShopStatisticsState>(shopStatisticsInitialState);

  useEffect(() => {
    getShopStatistics(shopId).then(setState)
  }, []);

  // Show loader while data is loading
  if (!state.shopStats) {
    return (
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 text-[#6C63FF] animate-spin" />
            <p className="text-[#A0A0A8] text-sm">Loading shop metrics...</p>
          </div>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      label: 'Conversion Rate',
      value: `${state.shopStats.conversion_rate}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Collected Customers',
      value: state.shopStats.collected_customers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Total Revenue',
      value: `€${state.shopStats.collected_revenue.toLocaleString()}`,
      icon: Euro,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Active Promos',
      value: state.shopStats.nbr_of_promo.toString(),
      icon: Gift,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="mb-6 sm:mb-8">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#2B2C34] font-['Inter'] mb-2">{state.shopStats.name} Overview</h2>
        <p className="text-[#A0A0A8] text-sm sm:text-base">Key performance metrics for your shop</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${metric.color}`} />
                </div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-[#2B2C34] mb-1">{metric.value}</h3>
              <p className="text-[#A0A0A8] text-xs sm:text-sm">{metric.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopMetrics;