import React from 'react';
import ShopMetrics from './ShopMetrics';
import PromoStatsTable from './PromoStatsTable';
import {GetPromoStatistics} from "../../core/PromoStatistics/api/PromoStatistics.ts";
import {GetShopStatistics} from "../../core/ShopStatistics/api/ShopStatistics.ts";


interface StatisticsPropsComponent {
    shopId: string;
    getPromoStatistics: GetPromoStatistics;
    getShopStatistics: GetShopStatistics;
}




const Statistics: React.FC<StatisticsPropsComponent> = ({getPromoStatistics, shopId, getShopStatistics}) => {



  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Analytics Dashboard</h1>
        <p className="text-[#A0A0A8] text-sm sm:text-base">Track your promotional campaigns performance and customer engagement</p>
      </div>

      <ShopMetrics
          shopId={shopId}
          getShopStatistics={getShopStatistics}
      />
      <PromoStatsTable
          getPromoStatistics={getPromoStatistics}
          shopId={shopId}
      />
    </div>
  );
};

export default Statistics;