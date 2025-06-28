import React, { useState } from 'react';
import { ArrowLeft, Calendar, AlertCircle } from 'lucide-react';
import RedeemCouponForm from './RedeemCouponForm';
import { CouponData } from '../../core/ScanQrcode/api/data';
import { TransactionInfo } from '../../core/RedeemCoupon/api/data';

interface RedeemCouponViewProps {
  couponData: CouponData | null;
  onComplete?: () => void;
  onCancel?: () => void;
}

const RedeemCouponView: React.FC<RedeemCouponViewProps> = ({
  couponData,
  onComplete,
  onCancel
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If no coupon data, redirect back to dashboard
  if (!couponData) {
    React.useEffect(() => {
      onCancel?.();
    }, [onCancel]);
    return null;
  }

  const handleSubmit = (transactionInfo: TransactionInfo) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call to redeem coupon
    setTimeout(() => {
      console.log('Redeeming coupon:', { couponData, transactionInfo });
      setIsLoading(false);
      // Navigate back to dashboard on success
      onComplete?.();
    }, 2000);
  };

  const handleGoBack = () => {
    onCancel?.();
  };

  const handleFormCancel = () => {
    onCancel?.();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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
            <h1 className="text-xl font-bold text-[#2B2C34] font-['Inter']">Redeem Coupon</h1>
            <p className="text-sm text-[#A0A0A8]">Complete the transaction</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-md mx-auto px-4">
          {/* Coupon Display */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold text-[#2B2C34] font-['Inter'] mb-2">
                Scanned Coupon
              </h2>
            </div>
            
            {/* Coupon Image */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center">
                {couponData.coupon_img ? (
                  <img 
                    src={couponData.coupon_img} 
                    alt={couponData.name}
                    className="w-full h-full rounded-xl object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-white text-2xl font-bold">
                    {couponData.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Coupon Name */}
            <h3 className="text-xl font-bold text-[#2B2C34] font-['Inter'] text-center mb-3">
              {couponData.name}
            </h3>

            {/* Coupon Details */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#A0A0A8]">Customer ID:</span>
                <span className="text-[#2B2C34] font-medium">{couponData.customer_id}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-[#A0A0A8]">Valid Period:</span>
                <div className="flex items-center space-x-1 text-[#2B2C34]">
                  <Calendar className="w-4 h-4 text-[#6C63FF]" />
                  <span className="font-medium text-xs">
                    {formatDate(couponData.validity_date_range.start)} - {formatDate(couponData.validity_date_range.end)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3" role="alert">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Redeem Form */}
          <RedeemCouponForm
            coupon={couponData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            onCancel={handleFormCancel}
          />
        </div>
      </main>
    </div>
  );
};

export default RedeemCouponView;