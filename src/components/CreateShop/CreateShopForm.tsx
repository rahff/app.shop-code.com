// src/components/CreateShop/CreateShopForm.tsx
import React, { useState } from 'react';
import { MapPin, AlertCircle, Store } from 'lucide-react';
import { ShopFormData } from '../../core/CreateShop/api/data';
import FileUploadWidget from '../UploadImage/FileUploadWidget';

interface CreateShopFormProps {
  onSubmit: (formData: ShopFormData) => void;
  isLoading?: boolean;
  error?: string | null;
  onCancel?: () => void;
  redirectUser?: (path: string) => void;
}

const CreateShopForm: React.FC<CreateShopFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  onCancel,
  redirectUser
}) => {
  const [formData, setFormData] = useState<Partial<ShopFormData>>({
    name: '',
    location: '',
    file_extension: 'png',
    file_identifier: ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  // Form validation using design system patterns
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      errors.name = 'Shop name is required';
    }
    
    if (!formData.location?.trim()) {
      errors.location = 'Location is required';
    }
    
    if (!selectedFile) {
      errors.file = 'Shop logo is required';
    }

    if (!uploadComplete) {
      errors.file = 'Please wait for file upload to complete';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const shopData: ShopFormData = {
      name: formData.name!,
      location: formData.location!,
      file_extension: formData.file_extension!,
      file_identifier: formData.file_identifier!
    };
    
    onSubmit(shopData);
  };

  const handleFileSelect = (file: File, identifier: string) => {
    setSelectedFile(file);
    setUploadComplete(true);
    const extension = file.name.split('.').pop()?.toLowerCase() || 'png';
    setFormData(prev => ({ 
      ...prev, 
      file_extension: extension,
      file_identifier: identifier
    }));
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setUploadComplete(false);
    setFormData(prev => ({ ...prev, file_extension: 'png', file_identifier: '' }));
  };

  const handleUploadError = () => {
    setUploadComplete(false);
    setValidationErrors(prev => ({ ...prev, file: 'Upload failed. Please try again.' }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Create New Shop</h1>
        <p className="text-[#A0A0A8]">Set up your shop to start managing promotional campaigns</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3" role="alert">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Shop Name */}
        <div>
          <label htmlFor="shop-name" className="block text-sm font-medium text-[#2B2C34] mb-2">
            Shop Name *
          </label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A0A0A8]" />
            <input
              type="text"
              id="shop-name"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full pl-12 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors ${
                validationErrors.name ? 'border-red-300 bg-red-50' : 'border-[#A0A0A8]'
              }`}
              placeholder="Enter your shop name"
              aria-describedby={validationErrors.name ? "name-error" : undefined}
              aria-invalid={!!validationErrors.name}
            />
          </div>
          {validationErrors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
              {validationErrors.name}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-[#2B2C34] mb-2">
            Location *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A0A0A8]" />
            <input
              type="text"
              id="location"
              value={formData.location || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className={`w-full pl-12 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors ${
                validationErrors.location ? 'border-red-300 bg-red-50' : 'border-[#A0A0A8]'
              }`}
              placeholder="Enter shop location (e.g., Paris 15ème)"
              aria-describedby={validationErrors.location ? "location-error" : undefined}
              aria-invalid={!!validationErrors.location}
            />
          </div>
          {validationErrors.location && (
            <p id="location-error" className="mt-1 text-sm text-red-600" role="alert">
              {validationErrors.location}
            </p>
          )}
        </div>

        {/* Logo Upload */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter'] mb-4 flex items-center">
            <Store className="w-5 h-5 mr-2 text-[#6C63FF]" />
            Shop Logo
          </h3>
          
          <FileUploadWidget
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            onUploadError={handleUploadError}
            currentFile={selectedFile}
            label="Upload Shop Logo"
            description="PNG, JPG or SVG (MAX. 2MB)"
            error={validationErrors.file}
            redirectUser={redirectUser}
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border-2 border-[#6C63FF] text-[#6C63FF] rounded-lg font-medium hover:bg-[#6C63FF] hover:text-white transition-all duration-200"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-[#6C63FF] text-white rounded-lg font-medium hover:bg-[#5845E9] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating Shop...</span>
              </div>
            ) : (
              'Create Shop'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateShopForm;