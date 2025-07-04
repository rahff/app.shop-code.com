import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import CreateShopForm from './CreateShopForm';
import { ShopFormData } from '../../core/CreateShop/api/data';
import {createShopFactory} from "../../factory/createShopFactory.ts";
import {AppRoute} from "../../App.tsx";


interface CreateShopPageProps {
  redirectUser: (destination: AppRoute, error?: string) => void;
}

const createShop = createShopFactory();

const CreateShopPage: React.FC<CreateShopPageProps> = ({redirectUser}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (formData: ShopFormData) => {
    setIsLoading(true);
    setError(null);
    createShop.create(formData).subscribe(redirection => {
      setIsLoading(false);
      redirectUser(redirection.path as AppRoute);
    })
  };

  const navigateToDashboard = () => {
    // Navigate to dashboard using redirectUser
    redirectUser('dashboard');
  };

  const handleGoBack = () => {
    // Navigate back to dashboard instead of previous page
    navigateToDashboard();
  };

  const handleCancel = () => {
    // Always navigate to dashboard on cancel
    navigateToDashboard();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back to dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-[#A0A0A8]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#2B2C34] font-['Inter']">Create New Shop</h1>
            <p className="text-sm text-[#A0A0A8]">Set up your shop profile</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <CreateShopForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          onCancel={handleCancel}
          redirectUser={redirectUser}
        />
      </main>
    </div>
  );
};

export default CreateShopPage;