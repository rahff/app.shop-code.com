import React from 'react';
import ShopMetrics from './ShopMetrics';
import PromoStatsTable from './PromoStatsTable';



const Statistics: React.FC = () => {



  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Analytics Dashboard</h1>
        <p className="text-[#A0A0A8] text-sm sm:text-base">Track your promotional campaigns performance and customer engagement</p>
      </div>

      <ShopMetrics/>
      <PromoStatsTable />
    </div>
  );
};

export default Statistics;