import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import CreatePromoForm from './CreatePromoForm';
import { PromoFormData } from '../../core/CreatePromo/api/data';

const CreatePromoPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (formData: PromoFormData) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Creating promo:', formData);
      setIsLoading(false);
      // Navigate back to dashboard
      window.location.href = '/';
    }, 2000);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-[#A0A0A8]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#2B2C34] font-['Inter']">Create New Promo</h1>
            <p className="text-sm text-[#A0A0A8]">Design your promotional campaign</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <CreatePromoForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default CreatePromoPage;