import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import UpgradePlanView from './UpgradePlanView';
import {DASHBOARD_ROUTE} from "../../core/Common/constants.ts";
import {
  checkoutRedirectionInitialState,
  CheckoutRedirectionState,
  GetCheckoutUrl
} from "../../core/Subscription/api/GetCheckoutUrl.ts";

interface UpgradePlanPageProps {
  redirectUser: () => void;
  getCheckoutUrl: GetCheckoutUrl
}

const UpgradePlanPage: React.FC<UpgradePlanPageProps> = ({redirectUser, getCheckoutUrl}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigateToDashboard = () => {
    redirectUser(DASHBOARD_ROUTE)
  };

  const handleUpgrade = (planId: string) => {
    setIsLoading(true);
    setError(null);
    getCheckoutUrl(planId).then((response: CheckoutRedirectionState) => {
      setIsLoading(false);
      if (response.checkoutUrl){
        window.location.href = response.checkoutUrl;
      }else setError(response.error?.message)

    })
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={navigateToDashboard}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back to dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-[#A0A0A8]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#2B2C34] font-['Inter']">Upgrade Plan</h1>
            <p className="text-sm text-[#A0A0A8]">Choose the perfect plan for your business</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <UpgradePlanView
          onUpgrade={handleUpgrade}
          handleGoBack={navigateToDashboard}
          isLoading={isLoading}
          error={error}
          currentPlan="basic"
        />
      </main>
    </div>
  );
};

export default UpgradePlanPage;