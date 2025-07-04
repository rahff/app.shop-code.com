// src/components/CreatePromo/CreatePromoForm.tsx
import React, { useEffect, useState } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { PromoFormData } from '../../core/CreatePromo/api/data';
import FileUploadWidget from '../UploadImage/FileUploadWidget';
import { AppRoute } from "../../App.tsx";
import { uploadFileFactory } from "../../factory/uploadFileFactory.ts";
import { ERROR_PAGE_ROUTE } from "../../core/Common/constants.ts";

interface CreatePromoFormProps {
  onSubmit: (formData: PromoFormData) => void;
  isLoading?: boolean;
  error?: string | null;
  onCancel?: () => void;
  redirectUser: (path: AppRoute) => void;
}

const CreatePromoForm: React.FC<CreatePromoFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  onCancel,
  redirectUser
}) => {
  const [formData, setFormData] = useState<Partial<PromoFormData>>({
    name: '',
    description: '',
    validity_date_start: '',
    validity_date_end: '',
    file_extension: 'png',
    id: ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [fileIdentifier, setFileIdentifier] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadService] = useState(() => uploadFileFactory());

  // Get signed URL when component mounts
  useEffect(() => {
    uploadService.get_upload_url().subscribe({
      next: (success) => {
        if (success) {
          setSignedUrl(uploadService.upload_state.signed_url);
          setFileIdentifier(uploadService.upload_state.file_identifier);
          setFormData(prev => ({
            ...prev,
            id: uploadService.upload_state.file_identifier || ''
          }));
        } else {
          // Redirect to error page if getting signed URL fails
          redirectUser(ERROR_PAGE_ROUTE);
        }
      },
      error: () => {
        redirectUser(ERROR_PAGE_ROUTE);
      }
    });
  }, [uploadService, redirectUser]);

  // Form validation using design system error patterns
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      errors.name = 'Promo name is required';
    }
    
    if (!formData.description?.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!formData.validity_date_start) {
      errors.validity_date_start = 'Start date is required';
    }
    
    if (!formData.validity_date_end) {
      errors.validity_date_end = 'End date is required';
    }
    
    // Date range validation (matching InvalidDateRange exception)
    if (formData.validity_date_start && formData.validity_date_end) {
      if (new Date(formData.validity_date_start) > new Date(formData.validity_date_end)) {
        errors.validity_date_end = 'End date must be after start date';
      }
    }
    
    if (!selectedFile) {
      errors.file = 'Coupon image is required';
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
    
    const promoData: PromoFormData = {
      id: fileIdentifier || crypto.randomUUID(),
      name: formData.name!,
      description: formData.description!,
      validity_date_start: formData.validity_date_start!,
      validity_date_end: formData.validity_date_end!,
      file_extension: formData.file_extension!
    };
    
    onSubmit(promoData);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const extension = file.name.split('.').pop()?.toLowerCase() || 'png';
    setFormData(prev => ({ ...prev, file_extension: extension }));
    setUploadComplete(false);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setUploadComplete(false);
    setFormData(prev => ({ ...prev, file_extension: 'png' }));
  };

  const handleUploadComplete = () => {
    setUploadComplete(true);
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.file;
      return newErrors;
    });
  };

  const handleUploadError = () => {
    setUploadComplete(false);
    setValidationErrors(prev => ({ ...prev, file: 'Upload failed. Please try again.' }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Create New Promo</h1>
        <p className="text-[#A0A0A8]">Design your promotional campaign to engage customers</p>
      </div>

      {/* Error Alert - Using design system error styling */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3" role="alert">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Promo Name - Using design system input styling */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#2B2C34] mb-2">
            Promo Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors ${
              validationErrors.name ? 'border-red-300 bg-red-50' : 'border-[#A0A0A8]'
            }`}
            placeholder="Enter promo name"
            aria-describedby={validationErrors.name ? "name-error" : undefined}
            aria-invalid={!!validationErrors.name}
          />
          {validationErrors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
              {validationErrors.name}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[#2B2C34] mb-2">
            Description *
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors resize-none ${
              validationErrors.description ? 'border-red-300 bg-red-50' : 'border-[#A0A0A8]'
            }`}
            placeholder="Describe your promotional offer"
            aria-describedby={validationErrors.description ? "description-error" : undefined}
            aria-invalid={!!validationErrors.description}
          />
          {validationErrors.description && (
            <p id="description-error" className="mt-1 text-sm text-red-600" role="alert">
              {validationErrors.description}
            </p>
          )}
        </div>

        {/* Date Range - Using design system card styling for grouping */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter'] mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[#6C63FF]" />
            Validity Period
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-[#2B2C34] mb-2">
                Start Date *
              </label>
              <input
                type="date"
                id="start-date"
                value={formData.validity_date_start || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, validity_date_start: e.target.value }))}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors ${
                  validationErrors.validity_date_start ? 'border-red-300 bg-red-50' : 'border-[#A0A0A8]'
                }`}
                aria-describedby={validationErrors.validity_date_start ? "start-date-error" : undefined}
                aria-invalid={!!validationErrors.validity_date_start}
              />
              {validationErrors.validity_date_start && (
                <p id="start-date-error" className="mt-1 text-sm text-red-600" role="alert">
                  {validationErrors.validity_date_start}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-[#2B2C34] mb-2">
                End Date *
              </label>
              <input
                type="date"
                id="end-date"
                value={formData.validity_date_end || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, validity_date_end: e.target.value }))}
                className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors ${
                  validationErrors.validity_date_end ? 'border-red-300 bg-red-50' : 'border-[#A0A0A8]'
                }`}
                aria-describedby={validationErrors.validity_date_end ? "end-date-error" : undefined}
                aria-invalid={!!validationErrors.validity_date_end}
              />
              {validationErrors.validity_date_end && (
                <p id="end-date-error" className="mt-1 text-sm text-red-600" role="alert">
                  {validationErrors.validity_date_end}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* File Upload - Using design system card and button styling */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter'] mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[#6C63FF]" />
            Coupon Image
          </h3>
          
          <FileUploadWidget
            signedUrl={signedUrl}
            selectedFile={selectedFile}
            fileIdentifier={fileIdentifier}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            label="Upload Coupon Image"
            description="PNG, JPG or GIF (MAX. 5MB)"
            maxSize={5}
          />
          
          {validationErrors.file && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {validationErrors.file}
            </p>
          )}
        </div>

        {/* Submit Button - Using design system primary button */}
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
            disabled={isLoading || !uploadComplete}
            className="px-6 py-3 bg-[#6C63FF] text-white rounded-lg font-medium hover:bg-[#5845E9] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating Promo...</span>
              </div>
            ) : (
              'Create Promo'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePromoForm;