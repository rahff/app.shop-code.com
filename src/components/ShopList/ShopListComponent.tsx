import React, { useState } from 'react';
import { Plus, MapPin, Calendar, ArrowRight } from 'lucide-react';
import {ShopData} from "../../core/CreateShop/api/data.ts";


interface ShopListComponentProps {
  onShopSelect: (shop: ShopData) => void;
}

const ShopListComponent: React.FC<ShopListComponentProps> = ({ onShopSelect }) => {
  // Mock shop data
  const [shops] = useState<ShopData[]>([
    {
      id: '1',
      name: "Joe's Coffee Shop",
      location: 'Paris 15ème',
      logo: '/logo.png',
      createdAt: '2025-01-15',
      promoCount: 8,
      account_ref: ''
    },
    {
      id: '2',
      name: 'Quick du Marais',
      location: 'Paris 4ème',
      logo: '/logo.png',
      createdAt: '2025-01-10',
      promoCount: 12,
      account_ref: ''
    }
  ]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleShopClick = (shop: ShopData) => {
    onShopSelect(shop);
  };

  const handleCreateShop = () => {
    // Navigate to create shop page
    window.location.href = '/shop/create';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#2B2C34] font-['Inter']">My Shops</h1>
              <p className="text-[#A0A0A8] mt-1">Select a shop to manage your promotional campaigns</p>
            </div>
            <button 
              onClick={handleCreateShop}
              className="bg-[#6C63FF] hover:bg-[#5845E9] text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Create New Shop</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>
      </header>

      {/* Shop List */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {shops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => handleShopClick(shop)}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#6C63FF]/20 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center flex-shrink-0">
                      <img 
                        src={shop.logo} 
                        alt={`${shop.name} logo`}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-[#2B2C34] font-['Inter'] group-hover:text-[#6C63FF] transition-colors duration-200">
                        {shop.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-[#A0A0A8] text-sm mt-1">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{shop.location}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#A0A0A8] group-hover:text-[#6C63FF] transition-colors duration-200 flex-shrink-0" />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-[#A0A0A8]">
                    <Calendar className="w-4 h-4" />
                    <span>Created {formatDate(shop.createdAt)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#6C63FF]/10 text-[#6C63FF]">
                      {shop.promoCount} promos
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-[#2B2C34] mb-2">No shops yet</h3>
            <p className="text-[#A0A0A8] mb-8 max-w-md mx-auto">
              Create your first shop to start managing promotional campaigns and engaging with customers.
            </p>
            <button 
              onClick={handleCreateShop}
              className="bg-[#6C63FF] hover:bg-[#5845E9] text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Your First Shop
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopListComponent;