import React, { useState } from 'react';
import { CreditCard, Shield, HelpCircle, UserPlus, Users, Trash2, ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ListCashiers } from '../../core/ListCashiers/api/ListCashiers';
import { CashierData } from '../../core/AddCashier/api/data';
import { localStorageApi } from '../../services/browser/LocalStorageBrowserApi';
import { AppRoute } from "../../core/Common/api/CommonTypes.ts";


interface SettingsProps {
  redirectUser: (destination: AppRoute) => void;
  listCashiers: ListCashiers;
}

const Settings: React.FC<SettingsProps> = ({ redirectUser, listCashiers }) => {
  const { t, i18n } = useTranslation('global');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cashiers, setCashiers] = useState<CashierData[]>([]);
  const [isLoadingCashiers, setIsLoadingCashiers] = useState(false);
  const [cashierError, setCashierError] = useState<string | null>(null);

  const handleUpgradePlan = () => {
    redirectUser('upgrade-plan');
  };

  const handleAddCashier = () => {
    redirectUser('add-cashier');
  };

  const handleHelpSupport = () => {
    redirectUser('help-support');
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      loadCashiers();
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const loadCashiers = () => {
    if (isLoadingCashiers) return; // Prevent multiple simultaneous calls
    
    setIsLoadingCashiers(true);
    setCashierError(null);
    
    listCashiers()
      .then((state) => {
        setCashiers(state.cashier_list);
        setCashierError(state.error?.message || null);
      })
      .catch((error) => {
        console.error('Failed to load cashiers:', error);
        setCashierError('Failed to load cashiers');
      })
      .finally(() => {
        setIsLoadingCashiers(false);
      });
  };

  const deleteCashier = (cashierId: string) => {
    try {
      const updatedCashiers = cashiers.filter(cashier => cashier.id !== cashierId);
      setCashiers(updatedCashiers);
      localStorageApi.set_item('cashier_list', updatedCashiers);
    } catch (error) {
      console.error('Failed to delete cashier:', error);
    }
  };

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
    <div className="page-background p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2B2C34] font-['Inter']">{t('settings.title')}</h1>
        </div>
        <p className="text-[#A0A0A8] text-sm sm:text-base">{t('settings.description')}</p>
      </div>

      <div className="flex justify-start md:justify-center">
        <div className="w-full max-w-2xl">
          <div className="glass-card p-4 sm:p-6 mb-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <Globe className="w-6 h-6 text-[#A0A0A8]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter']">{t('settings.language')}</h3>
                  <p className="text-[#A0A0A8] text-sm">{t('settings.languageDescription')}</p>
                </div>
              </div>
              <div className="ml-4">
                <select
                  value={i18n.resolvedLanguage}
                  onChange={handleLanguageChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] text-[#2B2C34] font-medium"
                  aria-label={t('settings.selectLanguage')}
                >
                  <option value="en">🇬🇧 English</option>
                  <option value="fr">🇫🇷 Français</option>
                </select>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 sm:p-6 mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-[#A0A0A8]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter']">{t('settings.cashierList')}</h3>
                  <p className="text-[#A0A0A8] text-sm">{t('settings.cashierListDescription')}</p>
                </div>
              </div>
              <button 
                onClick={toggleDropdown}
                disabled={isLoadingCashiers}
                className="btn-primary px-4 py-2 text-sm flex items-center space-x-2"
              >
                {isDropdownOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>

            {isDropdownOpen && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                {isLoadingCashiers ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="w-6 h-6 border-2 border-[#6C63FF]/30 border-t-[#6C63FF] rounded-full animate-spin"></div>
                    <span className="ml-2 text-[#A0A0A8]">{t('settings.loadingCashiers')}</span>
                  </div>
                ) : cashierError ? (
                  <div className="text-center py-4">
                    <p className="text-red-600 text-sm">{cashierError}</p>
                    <button 
                      onClick={loadCashiers}
                      disabled={isLoadingCashiers}
                      className="mt-2 text-[#6C63FF] hover:text-[#5845E9] text-sm font-medium"
                    >
                      {t('common.tryAgain')}
                    </button>
                  </div>
                ) : cashiers.length > 0 ? (
                  <div className="space-y-2">
                    {cashiers.map((cashier) => (
                      <div key={cashier.id} className="flex items-center justify-between p-3 bg-white/50 rounded-2xl hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-full flex items-center justify-center shadow-lg">
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
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-2xl transition-all duration-300 transform hover:scale-110"
                          aria-label={`Delete cashier ${cashier.username}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-[#A0A0A8] text-sm mb-2">{t('settings.noCashiers')}</p>
                    <button 
                      onClick={handleAddCashier}
                      className="text-[#6C63FF] hover:text-[#5845E9] text-sm font-medium transition-colors duration-300"
                    >
                      {t('settings.addFirstCashier')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6">
            {settingsOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className="glass-card p-4 sm:p-6 animate-fade-in-up">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${option.bgColor} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className={`w-6 h-6 ${option.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter']">{t(`settings.${option.title.toLowerCase().replace(/\s+/g, '')}`)}</h3>
                        <p className="text-[#A0A0A8] text-sm">{t(`settings.${option.title.toLowerCase().replace(/\s+/g, '')}Description`)}</p>
                      </div>
                    </div>
                    <button 
                      onClick={option.onClick}
                      className="btn-primary px-4 py-2 text-sm"
                    >
                      {t(`settings.${option.action.toLowerCase().replace(/\s+/g, '')}`)}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;