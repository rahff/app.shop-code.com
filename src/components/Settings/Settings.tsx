import React from 'react';
import { Settings as SettingsIcon, Clock, CreditCard, Palette, Bell, Shield, HelpCircle } from 'lucide-react';

const Settings: React.FC = () => {
  const handleUpgradePlan = () => {
    // Navigate to upgrade plan page
    window.location.href = '/upgrade-plan';
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
      icon: Palette,
      title: 'Change Theme',
      description: 'Customize your dashboard appearance',
      action: 'Customize',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage your notification preferences',
      action: 'Configure',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
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
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Settings</h1>
        <p className="text-[#A0A0A8] text-sm sm:text-base">Manage your account preferences and shop configuration</p>
      </div>

      <div className="max-w-2xl">
        {/* Settings Options */}
        <div className="space-y-3 sm:space-y-4 mb-8">
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

        {/* Coming Soon Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-full flex items-center justify-center mx-auto mb-6">
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-semibold text-[#2B2C34] font-['Inter'] mb-3">More Settings Coming Soon</h2>
          <p className="text-[#A0A0A8] mb-6 leading-relaxed text-sm sm:text-base">
            We're continuously improving your Shop-Code experience. Advanced settings for analytics, 
            integrations, and team management will be available in upcoming updates.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-[#6C63FF] bg-[#6C63FF]/10 px-4 py-2 rounded-lg inline-flex">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Expected in next update</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;