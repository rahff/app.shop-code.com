import React, {useEffect, useState} from 'react';
import {Plus} from 'lucide-react';
import PromoCard from './PromoCard';
import {PromoListState} from "../../core/ListPromos/api/PromoList.ts";
import {promoListFactory} from "../../factory/promoListFactory.ts";


const promoList = promoListFactory();

interface PromoListComponentProps {
  redirectUser: (destination: string) => void;
}

const PromoListComponent: React.FC<PromoListComponentProps> = ({ redirectUser }) => {
  const [state, setState] = useState<PromoListState>(promoList.state);
  
  useEffect(() => {
    const on_init = () => {
      return promoList.promo_of_shop("123").subscribe(() => {
        setState({...promoList.state});
      });
    }
    const subscription = on_init();
    return () => subscription.unsubscribe();
  },[])

  const handleCreatePromo = () => {
    // Navigate to create promo page using redirectUser
    redirectUser('create-promo');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Promo Campaigns</h1>
        <p className="text-[#A0A0A8] text-sm sm:text-base">Manage your promotional campaigns and track their performance</p>
      </div>

      <button 
        onClick={handleCreatePromo}
        className="w-full bg-[#6C63FF] hover:bg-[#5845E9] text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl mb-6 sm:w-auto sm:mb-8"
      >
        <Plus className="w-5 h-5" />
        <span>Create New Promo</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {state.promos.map((promo) => (
          <PromoCard key={promo.id} promo={promo} />
        ))}
      </div>

      {state.promos.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#2B2C34] mb-2">No promos yet</h3>
          <p className="text-[#A0A0A8] mb-6 px-4">Create your first promotional campaign to get started</p>
          <button 
            onClick={handleCreatePromo}
            className="w-full bg-[#6C63FF] hover:bg-[#5845E9] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 max-w-xs mx-auto sm:w-auto"
          >
            Create Your First Promo
          </button>
        </div>
      )}
    </div>
  );
};

export default PromoListComponent;