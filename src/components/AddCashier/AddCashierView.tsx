import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import AddCashierForm from './AddCashierForm';
import {addCashierFactory} from "../../factory/addCashierFactory.ts";


const addCashierModule = addCashierFactory()
interface AddCashierViewProps {
  onComplete: () => void;
  onCancel: () => void;
}

const AddCashierView: React.FC<AddCashierViewProps> = ({onComplete, onCancel}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleGoBack = () => {
    onCancel();
  };

  const handleSubmit = (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    
    addCashierModule.add_cashier(credentials).then(() => {
      setIsLoading(false);
      onComplete();
    });
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