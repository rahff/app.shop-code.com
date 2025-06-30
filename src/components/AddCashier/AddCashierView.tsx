import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import AddCashierForm from './AddCashierForm';

interface AddCashierViewProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

const AddCashierView: React.FC<AddCashierViewProps> = ({
  onComplete,
  onCancel
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigateToDashboard = () => {
    // Clear any route-specific state and navigate to dashboard
    window.history.pushState(null, '', '/');
    window.location.reload();
  };

  const handleGoBack = () => {
    // Navigate back to dashboard instead of previous page
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onCancel ? onCancel() : navigateToDashboard();
  };

  const handleSubmit = (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call for adding cashier
    setTimeout(() => {
      console.log('Adding cashier:', credentials);
      setIsLoading(false);
      // Navigate back to dashboard on success
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onComplete ? onComplete() : navigateToDashboard();
    }, 2000);
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
            <h1 className="text-xl font-bold text-[#2B2C34] font-['Inter']">Add Cashier</h1>
            <p className="text-sm text-[#A0A0A8]">Create a new cashier account for your staff</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <AddCashierForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default AddCashierView;