import React from 'react';
import { Settings as SettingsIcon, Clock } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Settings</h1>
        <p className="text-[#A0A0A8]">Manage your account preferences and shop configuration</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-full flex items-center justify-center mx-auto mb-6">
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-semibold text-[#2B2C34] font-['Inter'] mb-3">Settings Coming Soon</h2>
          <p className="text-[#A0A0A8] mb-6 leading-relaxed">
            We're working hard to bring you comprehensive settings to customize your Shop-Code experience. 
            This section will include account management, notification preferences, shop configuration, and more.
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