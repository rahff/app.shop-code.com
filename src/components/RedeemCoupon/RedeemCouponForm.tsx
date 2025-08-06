// src/components/RedeemCoupon/RedeemCouponForm.tsx
import React, { useState } from 'react';
import { Euro, User, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CouponData } from '../../core/ScanQrcode/api/data';
import { TransactionInfo } from '../../core/RedeemCoupon/api/data';

interface RedeemCouponFormProps {
  coupon: CouponData;
  onSubmit: (transactionInfo: TransactionInfo) => void;
  isLoading?: boolean;
  error?: string | null;
  onCancel?: () => void;
}

const RedeemCouponForm: React.FC<RedeemCouponFormProps> = ({
  coupon,
  onSubmit,
  isLoading = false,
  error,
  onCancel
}) => {
  const { t } = useTranslation('global');
  const [transactionAmount, setTransactionAmount] = useState<string>('');
  const [isCustomerNew, setIsCustomerNew] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!transactionAmount.trim()) {
      errors.amount = t('redeemCoupon.transactionAmountRequired');
    } else {
      const amount = parseFloat(transactionAmount);
      if (isNaN(amount) || amount <= 0) {
        errors.amount = t('redeemCoupon.validAmountRequired');
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const transactionInfo: TransactionInfo = {
      transaction_amount: parseFloat(transactionAmount),
      is_customer_new: isCustomerNew
    };
    
    onSubmit(transactionInfo);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2B2C34] font-['Inter'] mb-2">{t('redeemCoupon.title')}</h1>
        <p className="text-[#A0A0A8]">{t('redeemCoupon.completeTransaction')}</p>
      </div>

      {/* Coupon Details Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src={coupon.coupon_img} 
            alt={coupon.name}
            className="w-12 h-12 rounded-lg object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-[#2B2C34] font-['Inter']">{coupon.name}</h3>
            <p className="text-sm text-[#A0A0A8]">{t('redeemCoupon.customer')}: {coupon.customer_id}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-[#A0A0A8]">
          <Calendar className="w-4 h-4 text-[#6C63FF]" />
          <span>{t('redeemCoupon.validPeriod')}: {formatDate(coupon.validity_date_range.start)} - {formatDate(coupon.validity_date_range.end)}</span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3" role="alert">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transaction Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-[#2B2C34] mb-2">
            {t('redeemCoupon.transactionAmount')} *
          </label>
          <div className="relative">
            <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A0A0A8]" />
            <input
              type="number"
              id="amount"
              step="0.01"
              min="0"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              className={`w-full pl-12 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors ${
                validationErrors.amount ? 'border-red-300 bg-red-50' : 'border-[#A0A0A8]'
              }`}
              placeholder="0.00"
              aria-describedby={validationErrors.amount ? "amount-error" : undefined}
              aria-invalid={!!validationErrors.amount}
            />
          </div>
          {validationErrors.amount && (
            <p id="amount-error" className="mt-1 text-sm text-red-600" role="alert">
              {validationErrors.amount}
            </p>
          )}
        </div>

        {/* Customer Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#2B2C34] mb-3 flex items-center">
            <User className="w-4 h-4 mr-2 text-[#6C63FF]" />
            {t('redeemCoupon.customerStatus')}
          </h3>
          
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="customer-status"
                checked={!isCustomerNew}
                onChange={() => setIsCustomerNew(false)}
                className="w-4 h-4 text-[#6C63FF] border-[#A0A0A8] focus:ring-[#6C63FF]/20"
              />
              <span className="text-sm text-[#2B2C34]">{t('redeemCoupon.returningCustomer')}</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="customer-status"
                checked={isCustomerNew}
                onChange={() => setIsCustomerNew(true)}
                className="w-4 h-4 text-[#6C63FF] border-[#A0A0A8] focus:ring-[#6C63FF]/20"
              />
              <span className="text-sm text-[#2B2C34]">{t('redeemCoupon.newCustomer')}</span>
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex space-x-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 border-2 border-[#6C63FF] text-[#6C63FF] rounded-lg font-medium hover:bg-[#6C63FF] hover:text-white transition-all duration-200"
            >
              {t('redeemCoupon.cancel')}
            </button>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-[#6C63FF] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#5845E9] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{t('redeemCoupon.processing')}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>{t('redeemCoupon.redeemCoupon')}</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RedeemCouponForm;