import React, {useEffect, useState} from 'react';
import {Plus} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PromoCard from './PromoCard';
import Loader from '../Common/Loader';
import {PromoListState} from "../../core/ListPromos/api/PromoList.ts";
import {AppRoute} from "../../App.tsx";
import {CREATE_PROMO_ROUTE} from "../../core/Common/constants.ts";
import PromoDetailsPage from '../PromoDetails/PromoDetailsPage';
import {PromoData} from "../../core/CreatePromo/api/data.ts";
import {promo_list_initial_state} from "../../services/external/getPromoList.ts";




interface PromoListComponentProps {
  redirectUser: (destination: AppRoute) => void;
  getPromoList: () => Promise<PromoListState>;
}

const PromoListComponent: React.FC<PromoListComponentProps> = ({ redirectUser, getPromoList }) => {
  const { t } = useTranslation('global');
  const [selectedPromo, setSelectedPromo] = useState<PromoData | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [state, setState] = useState<PromoListState>(promo_list_initial_state);
  const [isLoadingPromo, setIsLoadingPromo] = useState(true);

  useEffect(() => {
    setIsLoadingPromo(true);
    getPromoList().then((state) => {
      setState(state);
      setIsLoadingPromo(false);
    })
  },[getPromoList])

  const handleCreatePromo = () => {
    redirectUser(CREATE_PROMO_ROUTE);
  };

  const handleViewPromoDetails = (promo: PromoData) => {
    setSelectedPromo(promo);
    setShowDetails(true);
  };

  const handleBackFromDetails = () => {
    setShowDetails(false);
    setSelectedPromo(null);
  };

  if (showDetails && selectedPromo) {
    return (
      <PromoDetailsPage
        promoData={selectedPromo}
        isLoading={false}
        onBack={handleBackFromDetails}
        redirectUser={redirectUser}
      />
    );
  }

  // Show loader while fetching promos
  if (isLoadingPromo) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">{t('promos.title')}</h1>
          <p className="text-[#A0A0A8] text-sm sm:text-base">{t('promos.description')}</p>
        </div>
        <Loader aria-label="Loading promotional campaigns..." />
      </div>
    );
  }
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">{t('promos.title')}</h1>
        <p className="text-[#A0A0A8] text-sm sm:text-base">{t('promos.description')}</p>
      </div>

      <button
        onClick={handleCreatePromo}
        className="w-full bg-[#6C63FF] hover:bg-[#5845E9] text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl mb-6 sm:w-auto sm:mb-8"
      >
        <Plus className="w-5 h-5" />
        <span>{t('promos.createNew')}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {state.promos.map((promo) => (
          <PromoCard key={promo.id} promo={promo} onViewDetails={handleViewPromoDetails} />
        ))}
      </div>

      {state.promos.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#2B2C34] mb-2">{t('promos.noPromos')}</h3>
          <p className="text-[#A0A0A8] mb-6 px-4">{t('promos.noPromosDescription')}</p>
          <button
            onClick={handleCreatePromo}
            className="w-full bg-[#6C63FF] hover:bg-[#5845E9] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 max-w-xs mx-auto sm:w-auto"
          >
            {t('promos.createFirst')}
          </button>
        </div>
      )}
    </div>
  );
};

export default PromoListComponent;
