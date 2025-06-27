// src/components/ListCashiers/CashierListView.tsx
import React from 'react';
import { User, Plus, AlertCircle } from 'lucide-react';
import { CashierData } from '../../core/AddCashier/api/data';

interface CashierListViewProps {
  cashiers: CashierData[];
  isLoading?: boolean;
  error?: { message: string } | null;
  onAddCashier?: () => void;
}

const CashierListView: React.FC<CashierListViewProps> = ({
  cashiers,
  isLoading = false,
  error,
  onAddCashier
}) => {
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Cashier Management</h1>
        <p className="text-[#A0A0A8] text-sm sm:text-base">Manage cashier accounts for your shop</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3" role="alert">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800 text-sm">{error.message}</p>
        </div>
      )}

      {/* Add Cashier Button */}
      <button 
        onClick={onAddCashier}
        className="w-full sm:w-auto bg-[#6C63FF] hover:bg-[#5845E9] text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl mb-6 sm:mb-8"
      >
        <Plus className="w-5 h-5" />
        <span>Add New Cashier</span>
      </button>

      {/* Cashier List */}
      {cashiers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cashiers.map((cashier) => (
            <div
              key={cashier.id}
              className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:border-[#6C63FF]/20"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter'] truncate">
                    {cashier.username}
                  </h3>
                  <p className="text-[#A0A0A8] text-sm">Cashier Account</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#A0A0A8]">ID: {cashier.id.slice(0, 8)}...</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#2B2C34] mb-2">No cashiers yet</h3>
          <p className="text-[#A0A0A8] mb-6 px-4">Add cashier accounts to allow staff to use the scanning interface</p>
          <button 
            onClick={onAddCashier}
            className="w-full sm:w-auto bg-[#6C63FF] hover:bg-[#5845E9] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Add Your First Cashier
          </button>
        </div>
      )}
    </div>
  );
};

export default CashierListView;