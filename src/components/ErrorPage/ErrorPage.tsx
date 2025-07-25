import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {APP_ROUTE} from "../../core/Common/constants.ts";
import {AppRoute} from "../../core/Common/api/CommonTypes.ts";

interface UploadErrorPageProps {
  redirectUser: (path: AppRoute) => void;
}

const ErrorPage: React.FC<UploadErrorPageProps> = ({ redirectUser }) => {
  const { t } = useTranslation('global');

  const handleGoBack = () => {
      redirectUser(APP_ROUTE);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-lg">
          {/* Error Icon */}
          <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-bold text-[#2B2C34] font-['Inter'] mb-4">
            {t('errors.somethingWrong')}
          </h1>
          
          <p className="text-[#A0A0A8] mb-8 leading-relaxed">
            {t('errors.errorDescription')}
          </p>

          {/* Action Button */}
          <button
            onClick={handleGoBack}
            className="w-full bg-[#6C63FF] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#5845E9] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('errors.gotIt')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;