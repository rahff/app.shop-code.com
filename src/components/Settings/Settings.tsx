import React, { useState } from 'react';
import { CreditCard, Shield, HelpCircle, UserPlus, Users, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ListCashiers } from '../../core/ListCashiers/api/ListCashiers';
import { CashierData } from '../../core/AddCashier/api/data';
import { localStorageApi } from '../../services/browser/LocalStorageBrowserApi';
import { HttpCashierListApi } from '../../services/external/HttpCashierListApi.ts';

const Settings: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cashiers, setCashiers] = useState<CashierData[]>([]);
  const [isLoadingCashiers, setIsLoadingCashiers] = useState(false);
  const [cashierError, setCashierError] = useState<string | null>(null);

  // Initialize cashier list service
  const cashierListApi = new HttpCashierListApi();
  const listCashiers = new ListCashiers(cashierListApi, localStorageApi);

  const handleUpgradePlan = () => {
    // Navigate to upgrade plan page
    window.location.href = '/upgrade-plan';
  };

  const handleAddCashier = () => {
    // Navigate to add cashier page
    window.location.href = '/add-cashier';
  };

  const handleHelpSupport = () => {
    // Navigate to help support page
    window.location.href = '/help-support';
  };

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      loadCashiers();
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const loadCashiers = () => {
    setIsLoadingCashiers(true);
    setCashierError(null);
    
    listCashiers.account_cashier().subscribe({
      next: (success) => {
        if (success) {
          setCashiers(listCashiers.state.cashier_list);
          setCashierError(listCashiers.state.error?.message || null);
        }
        setIsLoadingCashiers(false);
      },
      error: (error: unknown) => {
        console.log(error);
        setCashierError('Failed to load cashiers');
        setIsLoadingCashiers(false);
      }
    });
  };

  const deleteCashier = (cashierId: string) => {
    // Simulate delete operation
    setCashiers(prevCashiers => prevCashiers.filter(cashier => cashier.id !== cashierId));
    
    // In a real implementation, you would call the delete API here
    console.log('Deleting cashier:', cashierId);
    
    // Update local storage
    const updatedCashiers = cashiers.filter(cashier => cashier.id !== cashierId);
    localStorageApi.set_item('cashier_list', updatedCashiers);
  };

  // Reordered settings options according to specified order
  const settingsOptions = [
    {
      icon: CreditCard,
      title: 'Upgrade Plan',
      description: 'Unlock premium features and increase limits',
      action: 'Upgrade',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      onClick: handleUpgradePlan
    },
    {
      icon: UserPlus,
      title: 'Add Cashier',
      description: 'Create cashier accounts for your staff',
      action: 'Add Cashier',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      onClick: handleAddCashier
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Control your data and security settings',
      action: 'Manage',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help and contact our support team',
      action: 'Get Help',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      onClick: handleHelpSupport
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Settings</h1>
        <p className="text-[#A0A0A8] text-sm sm:text-base">Manage your account preferences and shop configuration</p>
      </div>

      <div className="max-w-2xl">
        {/* Cashier Management Section - positioned first */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:border-[#6C63FF]/20 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter']">Cashier Management</h3>
                <p className="text-[#A0A0A8] text-sm">View and manage your cashier accounts</p>
              </div>
            </div>
            <button 
              onClick={toggleDropdown}
              className="bg-[#6C63FF] hover:bg-[#5845E9] text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm flex items-center space-x-2"
            >
              <span>List Cashiers</span>
              {isDropdownOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Dropdown Content */}
          {isDropdownOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              {isLoadingCashiers ? (
                <div className="flex items-center justify-center py-4">
                  <div className="w-6 h-6 border-2 border-[#6C63FF]/30 border-t-[#6C63FF] rounded-full animate-spin"></div>
                  <span className="ml-2 text-[#A0A0A8]">Loading cashiers...</span>
                </div>
              ) : cashierError ? (
                <div className="text-center py-4">
                  <p className="text-red-600 text-sm">{cashierError}</p>
                  <button 
                    onClick={loadCashiers}
                    className="mt-2 text-[#6C63FF] hover:text-[#5845E9] text-sm font-medium"
                  >
                    Try again
                  </button>
                </div>
              ) : cashiers.length > 0 ? (
                <div className="space-y-2">
                  {cashiers.map((cashier) => (
                    <div key={cashier.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#6C63FF] rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {cashier.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#2B2C34] font-medium">{cashier.username}</span>
                          <p className="text-xs text-[#A0A0A8]">ID: {cashier.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteCashier(cashier.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                        aria-label={`Delete cashier ${cashier.username}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-[#A0A0A8] text-sm mb-2">No cashiers found</p>
                  <button 
                    onClick={handleAddCashier}
                    className="text-[#6C63FF] hover:text-[#5845E9] text-sm font-medium"
                  >
                    Add your first cashier
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Settings Options */}
        <div className="space-y-3 sm:space-y-4">
          {settingsOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:border-[#6C63FF]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${option.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${option.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter']">{option.title}</h3>
                      <p className="text-[#A0A0A8] text-sm">{option.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={option.onClick}
                    className="bg-[#6C63FF] hover:bg-[#5845E9] text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
                  >
                    {option.action}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Settings;