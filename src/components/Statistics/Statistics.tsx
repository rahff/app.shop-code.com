import React from 'react';
import { useTranslation } from 'react-i18next';
import SortControls, { SortOption } from './SortControls';
import PromoStatsList from './PromoStatsList';
import {GetPromoStatistics} from "../../core/PromoStatistics/api/PromoStatistics.ts";

interface StatisticsPropsComponent {
    shopId: string;
    getPromoStatistics: GetPromoStatistics;
}

const Statistics: React.FC<StatisticsPropsComponent> = ({getPromoStatistics, shopId}) => {
  const { t } = useTranslation('global');
  const [selectedSort, setSelectedSort] = React.useState<SortOption>('revenue');

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">{t('statistics.title')}</h1>
        <p className="text-[#A0A0A8] text-sm sm:text-base">{t('statistics.description')}</p>
      </div>

      {/* Sort Controls */}
      <SortControls
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        className="mb-6"
      />
      
      {/* Promo Stats List with Top Promo */}
      <PromoStatsList
        getPromoStatistics={getPromoStatistics}
        shopId={shopId}
        selectedSort={selectedSort}
      />

    </div>
  );
};

export default Statistics;