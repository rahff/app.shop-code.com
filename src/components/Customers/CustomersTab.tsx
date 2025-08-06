import React, { useState } from 'react';
import { BarChart3, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CustomersView from './CustomersView';

type TabKey = 'summary' | 'shop-customers';

interface Tab {
  label: string;
  key: TabKey;
  icon: React.ComponentType<any> | null;
}

const CustomersTab: React.FC = () => {
  const { t } = useTranslation('global');
  const [activeTab, setActiveTab] = useState<TabKey>('summary');

  const tabs: Tab[] = [
    { label: t('customers.summary'), key: 'summary', icon: null },
    { label: t('customers.shopCustomers'), key: 'shop-customers', icon: Users }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#2B2C34] mb-2">{t('customers.summary')}</h3>
            <p className="text-[#A0A0A8] max-w-md mx-auto">
              {t('customers.description')}
            </p>
          </div>
        );
      case 'shop-customers':
        return <CustomersView />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Customer tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-[#6C63FF] text-[#6C63FF]'
                    : 'border-transparent text-[#A0A0A8] hover:text-[#2B2C34] hover:border-gray-300'
                }`}
                aria-current={isActive ? 'page' : undefined}
                role="tab"
                aria-selected={isActive}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CustomersTab;