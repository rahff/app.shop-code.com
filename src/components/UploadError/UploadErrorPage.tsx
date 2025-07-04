import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import {AppRoute} from "../../App.tsx";
import {APP_ROUTE} from "../../core/Common/constants.ts";

interface UploadErrorPageProps {
  redirectUser?: (path: AppRoute) => void;
}

const UploadErrorPage: React.FC<UploadErrorPageProps> = ({ redirectUser }) => {
  const handleGoBack = () => {
    if (redirectUser) {
      redirectUser(APP_ROUTE);
    } else {
      // Fallback navigation
      window.location.href = '/';
    }
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
            Something went wrong
          </h1>
          
          <p className="text-[#A0A0A8] mb-8 leading-relaxed">
            We encountered an issue while processing your file upload. Please try again or contact support if the problem persists.
          </p>

          {/* Action Button */}
          <button
            onClick={handleGoBack}
            className="w-full bg-[#6C63FF] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#5845E9] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Got it</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadErrorPage;