// src/components/AddCashier/AddCashierForm.tsx
import React, { useState } from 'react';
import { User, Lock, AlertCircle, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AddCashierFormProps {
  onSubmit: (credentials: { username: string; password: string }) => void;
  isLoading?: boolean;
  error?: string | null;
}

const AddCashierForm: React.FC<AddCashierFormProps> = ({
  onSubmit,
  isLoading = false,
  error
}) => {
  const { t } = useTranslation('global');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Form validation following design system patterns
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      errors.username = t('addCashier.usernameRequired');
    } else if (formData.username.length < 3) {
      errors.username = t('addCashier.usernameMinLength');
    }
    
    if (!formData.password) {
      errors.password = t('addCashier.passwordRequired');
    } else if (formData.password.length < 6) {
      errors.password = t('addCashier.passwordMinLength');
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t('addCashier.passwordsDoNotMatch');
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit({
      username: formData.username,
      password: formData.password
    });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[#2B2C34] font-['Inter'] mb-2">{t('addCashier.title')}</h1>
        <p className="text-[#A0A0A8]">{t('addCashier.description')}</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3" role="alert">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-[#2B2C34] mb-2">
            {t('addCashier.username')} *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A0A0A8]" />
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              className={`w-full pl-12 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors ${
                validationErrors.username ? 'border-red-300 bg-red-50' : 'border-[#A0A0A8]'
              }`}
              placeholder={t('addCashier.usernamePlaceholder')}
              aria-describedby={validationErrors.username ? "username-error" : undefined}
              aria-invalid={!!validationErrors.username}
            />
          </div>
          {validationErrors.username && (
            <p id="username-error" className="mt-1 text-sm text-red-600" role="alert">
              {validationErrors.username}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#2B2C34] mb-2">
            {t('addCashier.password')} *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A0A0A8]" />
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className={`w-full pl-12 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors ${
                validationErrors.password ? 'border-red-300 bg-red-50' : 'border-[#A0A0A8]'
              }`}
              placeholder={t('addCashier.passwordPlaceholder')}
              aria-describedby={validationErrors.password ? "password-error" : undefined}
              aria-invalid={!!validationErrors.password}
            />
          </div>
          {validationErrors.password && (
            <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
              {validationErrors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-[#2B2C34] mb-2">
            {t('addCashier.confirmPassword')} *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A0A0A8]" />
            <input
              type="password"
              id="confirm-password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className={`w-full pl-12 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors ${
                validationErrors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-[#A0A0A8]'
              }`}
              placeholder={t('addCashier.confirmPasswordPlaceholder')}
              aria-describedby={validationErrors.confirmPassword ? "confirm-password-error" : undefined}
              aria-invalid={!!validationErrors.confirmPassword}
            />
          </div>
          {validationErrors.confirmPassword && (
            <p id="confirm-password-error" className="mt-1 text-sm text-red-600" role="alert">
              {validationErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#6C63FF] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#5845E9] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{t('addCashier.addingCashier')}</span>
            </div>
          ) : (
            t('addCashier.addCashier')
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCashierForm;