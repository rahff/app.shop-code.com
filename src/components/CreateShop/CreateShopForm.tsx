// src/components/CreateShop/CreateShopForm.tsx
import React, { useState } from 'react';
import { MapPin, Upload, AlertCircle, CheckCircle, Store } from 'lucide-react';
import { ShopFormData } from '../../core/CreateShop/api/data';

interface CreateShopFormProps {
  onSubmit: (formData: ShopFormData) => void;
  isLoading?: boolean;
  error?: string | null;
  onFileUpload?: (file: File) => void;
  uploadProgress?: number;
}

const CreateShopForm: React.FC<CreateShopFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  onFileUpload,
  uploadProgress = 0
}) => {
  const [formData, setFormData] = useState<Partial<ShopFormData>>({
    name: '',
    location: '',
    file_extension: 'png',
    file_identifier: ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Generate file identifier (would typically come from upload service)
    const fileIdentifier = crypto.randomUUID();
    
    const shopData: ShopFormData = {
      name: formData.name!,
      location: formData.location!,
      file_extension: formData.file_extension!,
      file_identifier: fileIdentifier
    };
    
    onSubmit(shopData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const extension = file.name.split('.').pop()?.toLowerCase() || 'png';
      setFormData(prev => ({ 
        ...prev, 
        file_extension: extension,
        file_identifier: crypto.randomUUID()
      }));
      onFileUpload?.(file);
    }
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
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter'] mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-[#6C63FF]" />
            Shop Logo
          </h3>
          
          <div className="space-y-4">
            <input
              type="file"
              id="logo-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              aria-describedby={validationErrors.file ? "file-error" : undefined}
            />
            
            <label
              htmlFor="logo-upload"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                validationErrors.file 
                  ? 'border-red-300 bg-red-50 hover:bg-red-100' 
                  : 'border-[#A0A0A8] hover:border-[#6C63FF] hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className={`w-8 h-8 mb-2 ${validationErrors.file ? 'text-red-400' : 'text-[#A0A0A8]'}`} />
                <p className={`text-sm ${validationErrors.file ? 'text-red-600' : 'text-[#A0A0A8]'}`}>
                  <span className="font-semibold">Click to upload logo</span> or drag and drop
                </p>
                <p className={`text-xs ${validationErrors.file ? 'text-red-500' : 'text-[#A0A0A8]'}`}>
                  PNG, JPG or SVG (MAX. 2MB)
                </p>
              </div>
            </label>
            
            {selectedFile && (
              <div className="flex items-center space-x-2 text-sm text-[#2B2C34]">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>{selectedFile.name}</span>
              </div>
            )}
            
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#6C63FF] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                  role="progressbar"
                  aria-valuenow={uploadProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            )}
            
            {validationErrors.file && (
              <p id="file-error" className="text-sm text-red-600" role="alert">
                {validationErrors.file}
              </p>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            className="px-6 py-3 border-2 border-[#6C63FF] text-[#6C63FF] rounded-lg font-medium hover:bg-[#6C63FF] hover:text-white transition-all duration-200"
            onClick={() => window.history.back()}
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