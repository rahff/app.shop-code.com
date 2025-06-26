import React from 'react';
import { Plus } from 'lucide-react';
import PromoCard from './PromoCard';
import { PromoFormData } from '../../types';

const PromoList: React.FC = () => {
  // Mock data for demonstration
  const mockPromos: PromoFormData[] = [
    {
      id: '1',
      name: 'Summer Sale 2025',
      description: 'Get 30% off on all summer collection items. Valid for all clothing and accessories.',
      validity_date_start: '2025-06-01',
      validity_date_end: '2025-08-31',
      file_extension: 'pdf'
    },
    {
      id: '2',
      name: 'Coffee Loyalty Program',
      description: 'Buy 5 coffees, get the 6th one free. Perfect for our regular customers.',
      validity_date_start: '2025-01-01',
      validity_date_end: '2025-12-31',
      file_extension: 'jpg'
    },
    {
      id: '3',
      name: 'Weekend Special',
      description: 'Special weekend discounts on selected items every Saturday and Sunday.',
      validity_date_start: '2025-01-15',
      validity_date_end: '2025-03-15',
      file_extension: 'png'
    }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Promo Campaigns</h1>
          <p className="text-[#A0A0A8]">Manage your promotional campaigns and track their performance</p>
        </div>
        <button className="bg-[#6C63FF] hover:bg-[#5845E9] text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />
          <span>Create Promo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPromos.map((promo) => (
          <PromoCard key={promo.id} promo={promo} />
        ))}
      </div>

      {mockPromos.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#2B2C34] mb-2">No promos yet</h3>
          <p className="text-[#A0A0A8] mb-6">Create your first promotional campaign to get started</p>
          <button className="bg-[#6C63FF] hover:bg-[#5845E9] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
            Create Your First Promo
          </button>
        </div>
      )}
    </div>
  );
};

export default PromoList;