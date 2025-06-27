// src/components/Subscription/UpgradePlanView.tsx
import React from 'react';
import { Crown, Check, ArrowRight, AlertCircle } from 'lucide-react';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  recommended?: boolean;
}

interface UpgradePlanViewProps {
  onUpgrade: (planId: string) => void;
  isLoading?: boolean;
  error?: string | null;
  currentPlan?: string;
}

const UpgradePlanView: React.FC<UpgradePlanViewProps> = ({
  onUpgrade,
  isLoading = false,
  error,
  currentPlan = 'basic'
}) => {
  const plans: Plan[] = [
    {
      name: 'Basic',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for getting started with promotional campaigns',
      features: [
        { name: 'Up to 2 shops', included: true },
        { name: 'Up to 20 promos per month', included: true },
        { name: 'Basic analytics', included: true },
        { name: '2 staff users', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom branding', included: false }
      ]
    },
    {
      name: 'Pro',
      price: '€29',
      period: 'per month',
      description: 'Scale your business with advanced features and analytics',
      recommended: true,
      features: [
        { name: 'Unlimited shops', included: true },
        { name: 'Unlimited promos', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Up to 10 staff users', included: true },
        { name: 'Priority support', included: true },
        { name: 'Custom branding', included: true },
        { name: 'API access', included: true },
        { name: 'White-label solution', included: false }
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'Tailored solution for large businesses and franchises',
      features: [
        { name: 'Everything in Pro', included: true },
        { name: 'Unlimited staff users', included: true },
        { name: 'White-label solution', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'SLA guarantee', included: true },
        { name: 'On-premise deployment', included: true },
        { name: 'Custom training', included: true }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-8 sm:mb-12">
        <div className="w-16 h-16 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center mx-auto mb-6">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2B2C34] font-['Inter'] mb-4">
          Upgrade Your Plan
        </h1>
        <p className="text-[#A0A0A8] text-lg max-w-2xl mx-auto">
          Choose the perfect plan to scale your promotional campaigns and grow your business
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3 max-w-2xl mx-auto" role="alert">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`relative bg-white rounded-xl border-2 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl ${
              plan.recommended
                ? 'border-[#6C63FF] shadow-lg scale-105'
                : 'border-gray-200 hover:border-[#6C63FF]/30'
            } ${currentPlan.toLowerCase() === plan.name.toLowerCase() ? 'ring-2 ring-[#6C63FF]/20' : ''}`}
          >
            {/* Recommended Badge */}
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#6C63FF] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recommended
                </span>
              </div>
            )}

            {/* Current Plan Badge */}
            {currentPlan.toLowerCase() === plan.name.toLowerCase() && (
              <div className="absolute top-4 right-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  Current Plan
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#2B2C34] font-['Inter'] mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-[#2B2C34]">{plan.price}</span>
                {plan.period && (
                  <span className="text-[#A0A0A8] ml-2">/{plan.period}</span>
                )}
              </div>
              <p className="text-[#A0A0A8] text-sm">{plan.description}</p>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    feature.included 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {feature.included ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <span className="w-2 h-2 bg-gray-400 rounded-full" />
                    )}
                  </div>
                  <span className={`text-sm ${
                    feature.included ? 'text-[#2B2C34]' : 'text-[#A0A0A8]'
                  }`}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <button
              onClick={() => onUpgrade(plan.name.toLowerCase())}
              disabled={isLoading || currentPlan.toLowerCase() === plan.name.toLowerCase()}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                currentPlan.toLowerCase() === plan.name.toLowerCase()
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : plan.recommended
                  ? 'bg-[#6C63FF] text-white hover:bg-[#5845E9] shadow-lg hover:shadow-xl'
                  : 'border-2 border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : currentPlan.toLowerCase() === plan.name.toLowerCase() ? (
                <span>Current Plan</span>
              ) : plan.name === 'Enterprise' ? (
                <>
                  <span>Contact Sales</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Upgrade to {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-12 sm:mt-16 text-center">
        <h2 className="text-2xl font-bold text-[#2B2C34] font-['Inter'] mb-4">
          Questions about upgrading?
        </h2>
        <p className="text-[#A0A0A8] mb-6">
          Our team is here to help you choose the right plan for your business
        </p>
        <button className="bg-white border-2 border-[#6C63FF] text-[#6C63FF] px-6 py-3 rounded-lg font-medium hover:bg-[#6C63FF] hover:text-white transition-all duration-200">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default UpgradePlanView;