import React from 'react';
import FilterBannerActions, { FilterState } from './FilterBannerActions';
import PromoStatsList from './PromoStatsList';
import {GetPromoStatistics} from "../../core/PromoStatistics/api/PromoStatistics.ts";


interface StatisticsPropsComponent {
    shopId: string;
    getPromoStatistics: GetPromoStatistics;
}




const Statistics: React.FC<StatisticsPropsComponent> = ({getPromoStatistics, shopId}) => {
  const [filters, setFilters] = React.useState<FilterState>({
    nbr_of_issues: { min: null, max: null },
    total_conversion: { min: null, max: null },
    total_revenue: { min: null, max: null },
    collected_customers: { min: null, max: null }
  });

  const handleResetFilters = () => {
    setFilters({
      nbr_of_issues: { min: null, max: null },
      total_conversion: { min: null, max: null },
      total_revenue: { min: null, max: null },
      collected_customers: { min: null, max: null }
    });
  };


  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Analytics Dashboard</h1>
        <p className="text-[#A0A0A8] text-sm sm:text-base">Track your promotional campaigns performance and customer engagement</p>
      </div>

      <FilterBannerActions
        filters={filters}
        onFiltersChange={setFilters}
        onResetFilters={handleResetFilters}
      />
      
      <PromoStatsList
        getPromoStatistics={getPromoStatistics}
        shopId={shopId}
        filters={filters}
      />
    </div>
  );
};

export default Statistics;