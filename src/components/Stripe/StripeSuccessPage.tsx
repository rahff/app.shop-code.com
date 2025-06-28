import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Loader } from 'lucide-react';
import { subscriptionManager } from '../../factory/subscriptionManagerFactory';

const StripeSuccessPage: React.FC = () => {
  const [isConfirming, setIsConfirming] = useState(true);
  const [confirmationSuccess, setConfirmationSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Confirm the subscription with the backend
    subscriptionManager.handle_stripe_success().subscribe({
      next: (success) => {
        setIsConfirming(false);
        setConfirmationSuccess(success);
        if (!success) {
          setError('Failed to confirm your subscription. Please contact support.');
        }
      },
      error: (err) => {
        setIsConfirming(false);
        setConfirmationSuccess(false);
        setError('An error occurred while confirming your subscription.');
        console.error('Subscription confirmation error:', err);
      }
    });
  }, []);

  const handleContinue = () => {
    // Navigate back to dashboard
    window.location.href = '/';
  };

  if (isConfirming) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-[#6C63FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader className="w-8 h-8 text-[#6C63FF] animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-[#2B2C34] font-['Inter'] mb-4">
            Confirming Your Subscription
          </h1>
          <p className="text-[#A0A0A8] mb-6">
            Please wait while we confirm your payment and activate your new plan...
          </p>
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-[#6C63FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-[#6C63FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-[#6C63FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-[#2B2C34] font-['Inter'] mb-4">
            Subscription Error
          </h1>
          <p className="text-[#A0A0A8] mb-6">
            {error}
          </p>
          <div className="space-y-3">
            <button
              onClick={handleContinue}
              className="w-full bg-[#6C63FF] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#5845E9] transition-all duration-200"
            >
              Return to Dashboard
            </button>
            <button
              onClick={() => window.location.href = '/help-support'}
              className="w-full border-2 border-[#6C63FF] text-[#6C63FF] py-3 px-6 rounded-lg font-medium hover:bg-[#6C63FF] hover:text-white transition-all duration-200"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-[#2B2C34] font-['Inter'] mb-4">
          Welcome to Your New Plan! 🎉
        </h1>
        
        <p className="text-[#A0A0A8] mb-6">
          Your subscription has been successfully activated. You now have access to all the features of your new plan.
        </p>

        <div className="bg-[#6C63FF]/10 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-[#2B2C34] mb-2">What's Next?</h3>
          <ul className="text-sm text-[#A0A0A8] space-y-1 text-left">
            <li>• Create more shops and promos</li>
            <li>• Access advanced analytics</li>
            <li>• Use priority support</li>
            <li>• Explore new features</li>
          </ul>
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-[#6C63FF] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#5845E9] transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>Continue to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-xs text-[#A0A0A8] mt-4">
          You'll receive a confirmation email shortly with your receipt and plan details.
        </p>
      </div>
    </div>
  );
};

export default StripeSuccessPage;