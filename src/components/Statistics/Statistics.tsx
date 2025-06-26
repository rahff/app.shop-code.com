import React from 'react';
import ShopMetrics from './ShopMetrics';
import PromoStatsTable from './PromoStatsTable';
import { ShopStatisticsState } from '../../types';

const Statistics: React.FC = () => {
  // Mock shop statistics data
  const mockShopStats: ShopStatisticsState = {
    name: "Joe's Coffee Shop",
    convertion_rate: 28.5,
    collected_customers: 1247,
    collected_revenue: 45680,
    nbr_of_promo: 8
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Analytics Dashboard</h1>
        <p className="text-[#A0A0A8]">Track your promotional campaigns performance and customer engagement</p>
      </div>

      <ShopMetrics shopStats={mockShopStats} />
      <PromoStatsTable />
    </div>
  );
};

export default Statistics;