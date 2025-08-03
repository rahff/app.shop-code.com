import React from 'react';
import { QrCode, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {UserProfile} from "../../core/UserSession/api/data.ts";

interface HeaderProps {
  userProfile: UserProfile;
}

const Header: React.FC<HeaderProps> = ({ userProfile }) => {
  const { t } = useTranslation('global');

  return (
    <header className="glass-card border-0 border-b border-white/20 px-4 py-4 sm:px-6 lg:px-8 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-2xl flex items-center justify-center shadow-lg animate-float">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text font-['Inter']">{t('bootstrap.title')}</h1>
            <p className="text-sm text-[#A0A0A8] hidden sm:block">{t('navigation.dashboard')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-semibold">{userProfile.user_name.slice(0,1).toUpperCase()}</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-[#2B2C34]">{userProfile.user_name}</p>
              <span className="modern-badge text-xs">{userProfile.role}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;