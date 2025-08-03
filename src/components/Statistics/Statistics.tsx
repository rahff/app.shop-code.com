import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SortControls, { SortOption } from './SortControls';
import PromoStatsList from './PromoStatsList';
import {GetPromoStatistics} from "../../core/PromoStatistics/api/PromoStatistics.ts";

interface StatisticsPropsComponent {
    getPromoStatistics: GetPromoStatistics;
}

const Statistics: React.FC<StatisticsPropsComponent> = ({getPromoStatistics}) => {
  const { t } = useTranslation('global');
  const [selectedSort, setSelectedSort] = React.useState<SortOption>('revenue');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text font-['Inter']">{t('statistics.title')}</h1>
        </div>
        <p className="text-[#A0A0A8] text-sm sm:text-base">{t('statistics.description')}</p>
      </div>

      {/* Sort Controls */}
      <div className="glass-card mb-6">
        <SortControls
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        />
      </div>
      
      {/* Promo Stats List with Top Promo */}
      <PromoStatsList
        getPromoStatistics={getPromoStatistics}
        selectedSort={selectedSort}
      />

    </div>
  );
};

export default Statistics;