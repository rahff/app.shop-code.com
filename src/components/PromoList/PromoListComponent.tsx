import React, {useEffect, useState} from 'react';
import {Plus, Sparkles, TrendingUp} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PromoCard from './PromoCard';
import Loader from '../Common/Loader';
import {GetPromoList, PromoListState} from "../../core/ListPromos/api/PromoList.ts";
import {CREATE_PROMO_ROUTE} from "../../core/Common/constants.ts";
import PromoDetailsPage from '../PromoDetails/PromoDetailsPage';
import {PromoData} from "../../core/CreatePromo/api/data.ts";
import {promo_list_initial_state} from "../../services/external/getPromoListApi.ts";
import {AppRoute} from "../../core/Common/api/CommonTypes.ts";

interface PromoListComponentProps {
  redirectUser: (destination: AppRoute) => void;
  getPromoList: GetPromoList;
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Modern Header Skeleton */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[#6C63FF] to-[#5845E9] rounded-xl animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>
          <Loader aria-label="Loading promotional campaigns..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Modern Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#2B2C34] to-[#4A4B57] bg-clip-text text-transparent font-['Inter']">
                {t('promos.title')}
              </h1>
            </div>
          </div>
          <p className="text-[#A0A0A8] text-lg leading-relaxed max-w-2xl">
            {t('promos.description')}
          </p>
        </div>

        {/* Create Promo CTA */}
        <div className="mb-8 sm:mb-12">
          <button
            onClick={handleCreatePromo}
            className="group relative overflow-hidden bg-gradient-to-r from-[#6C63FF] to-[#5845E9] hover:from-[#5845E9] hover:to-[#4A3BC7] text-white px-8 py-4 rounded-2xl font-semibold flex items-center space-x-3 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-lg">{t('promos.createNew')}</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </button>
        </div>

        {/* Promo Cards Grid */}
        {state.promos.length > 0 ? (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-[#6C63FF]" />
                  <span className="text-[#2B2C34] font-medium">
                    {state.promos.length} Active Campaign{state.promos.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="text-sm text-[#A0A0A8]">
                  Ready to engage customers
                </div>
              </div>
            </div>

            {/* Promo Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {state.promos.map((promo, index) => (
                <div
                  key={promo.id}
                  className="group transform transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <PromoCard 
                    promo={promo} 
                    onViewDetails={handleViewPromoDetails} 
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 sm:py-24">
            <div className="relative mb-8">
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-[#6C63FF] to-[#5845E9] rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-r from-[#5845E9] to-[#4A3BC7] rounded-full opacity-30 animate-bounce" style={{animationDelay: '0.5s'}}></div>
              
              {/* Main Icon */}
              <div className="relative w-24 h-24 bg-gradient-to-br from-[#6C63FF]/10 to-[#5845E9]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-[#6C63FF]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#6C63FF] to-[#5845E9] rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] mb-4 font-['Inter']">
              {t('promos.noPromos')}
            </h3>
            <p className="text-[#A0A0A8] text-lg mb-8 max-w-md mx-auto leading-relaxed">
              {t('promos.noPromosDescription')}
            </p>
            
            <button
              onClick={handleCreatePromo}
              className="group relative overflow-hidden bg-gradient-to-r from-[#6C63FF] to-[#5845E9] hover:from-[#5845E9] hover:to-[#4A3BC7] text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-lg">{t('promos.createFirst')}</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PromoListComponent;