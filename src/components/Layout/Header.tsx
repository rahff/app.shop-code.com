import React from 'react';
import { QrCode, ArrowLeft, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {UserProfile} from "../../core/UserSession/api/data.ts";

interface HeaderProps {
  onChooseAnotherShop?: () => void;
  userProfile: UserProfile;
}

const Header: React.FC<HeaderProps> = ({ onChooseAnotherShop, userProfile }) => {
  const { t } = useTranslation('global');

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#2B2C34] font-['Inter']">{t('bootstrap.title')}</h1>
            <p className="text-sm text-[#A0A0A8] hidden sm:block">{t('navigation.dashboard')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Choose Another Shop Button */}
          {onChooseAnotherShop && (
            <button
              onClick={onChooseAnotherShop}
              className="flex items-center space-x-2 px-4 py-2 border-2 border-[#6C63FF] text-[#6C63FF] rounded-lg font-medium hover:bg-[#6C63FF] hover:text-white transition-all duration-200 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t('navigation.chooseAnotherShop')}</span>
              <span className="sm:hidden">{t('navigation.myShops')}</span>
            </button>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#6C63FF] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">{userProfile.user_name.slice(0,1).toUpperCase()}</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-[#2B2C34]">{userProfile.user_name}</p>
              <p className="text-xs text-[#A0A0A8]">{userProfile.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;