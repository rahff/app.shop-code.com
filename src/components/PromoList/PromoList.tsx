import React from 'react';
import { Plus } from 'lucide-react';
import PromoCard from './PromoCard';
import {PromoData} from "../../core/CreatePromo/api/data.ts";


const PromoList: React.FC = () => {
  // Mock data for demonstration
  const mockPromos: PromoData[] = [
    {
      id: '1',
      name: 'Summer Sale 2025',
      description: 'Get 30% off on all summer collection items. Valid for all clothing and accessories.',
      validity_date_start: '2025-06-01',
      validity_date_end: '2025-08-31',
      shop_id: "",
      coupon_img: "",
      created_at: ""
    },
    {
      id: '2',
      name: 'Coffee Loyalty Program',
      description: 'Buy 5 coffees, get the 6th one free. Perfect for our regular customers.',
      validity_date_start: '2025-01-01',
      validity_date_end: '2025-12-31',
      shop_id: "",
      coupon_img: "",
      created_at: ""
    },
    {
      id: '3',
      name: 'Weekend Special',
      description: 'Special weekend discounts on selected items every Saturday and Sunday.',
      validity_date_start: '2025-01-15',
      validity_date_end: '2025-03-15',
      shop_id: "",
      coupon_img: "",
      created_at: ""
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Promo Campaigns</h1>
        <p className="text-[#A0A0A8] text-sm sm:text-base">Manage your promotional campaigns and track their performance</p>
      </div>

      <button className="w-full bg-[#6C63FF] hover:bg-[#5845E9] text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl mb-6 sm:w-auto sm:mb-8">
        <Plus className="w-5 h-5" />
        <span>Create New Promo</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {mockPromos.map((promo) => (
          <PromoCard key={promo.id} promo={promo} />
        ))}
      </div>

      {mockPromos.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#2B2C34] mb-2">No promos yet</h3>
          <p className="text-[#A0A0A8] mb-6 px-4">Create your first promotional campaign to get started</p>
          <button className="w-full bg-[#6C63FF] hover:bg-[#5845E9] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 max-w-xs mx-auto sm:w-auto">
            Create Your First Promo
          </button>
        </div>
      )}
    </div>
  );
};

export default PromoList;