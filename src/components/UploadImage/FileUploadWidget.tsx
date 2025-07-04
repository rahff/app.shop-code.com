// src/components/UploadImage/FileUploadWidget.tsx
import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Image } from 'lucide-react';

interface FileUploadWidgetProps {
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  accept?: string;
  maxSize?: number; // in MB
  isLoading?: boolean;
  error?: string | null;
  uploadProgress?: number;
  currentFile?: File | null;
  label?: string;
  description?: string;
}

const FileUploadWidget: React.FC<FileUploadWidgetProps> = ({
  onFileSelect,
  onFileRemove,
  accept = "image/*",
  isLoading = false,
  error,
  uploadProgress = 0,
  currentFile,
  label = "Upload File",
  description = "PNG, JPG or GIF (MAX. 5MB)"
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file type for images
    if (accept.includes('image/') && !file.type.startsWith('image/')) {
      return 'Please select a valid image file';
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      return;
    }

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }

    onFileSelect(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileRemove?.();
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        aria-describedby={error ? "upload-error" : undefined}
      />

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`relative border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
          dragActive
            ? 'border-[#6C63FF] bg-[#6C63FF]/5'
            : error
            ? 'border-red-300 bg-red-50 hover:bg-red-100'
            : 'border-[#A0A0A8] hover:border-[#6C63FF] hover:bg-gray-50'
        } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={`Upload ${label.toLowerCase()}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFileDialog();
          }
        }}
      >
        {currentFile || preview ? (
          // File Selected State
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {preview ? (
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-[#6C63FF]/10 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-[#6C63FF]" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-[#2B2C34]">
                    {currentFile?.name || 'File selected'}
                  </p>
                  <p className="text-xs text-[#A0A0A8]">
                    {currentFile ? `${(currentFile.size / 1024 / 1024).toFixed(2)} MB` : ''}
                  </p>
                </div>
              </div>
              
              {!isLoading && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4 text-[#A0A0A8]" />
                </button>
              )}
            </div>

            {/* Upload Progress */}
            {isLoading && uploadProgress > 0 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-[#A0A0A8] mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
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
              </div>
            )}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <Upload className={`w-8 h-8 mb-3 ${error ? 'text-red-400' : 'text-[#A0A0A8]'}`} />
            <p className={`text-sm font-medium mb-1 ${error ? 'text-red-600' : 'text-[#2B2C34]'}`}>
              {label}
            </p>
            <p className={`text-xs text-center ${error ? 'text-red-500' : 'text-[#A0A0A8]'}`}>
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className={`text-xs mt-1 ${error ? 'text-red-500' : 'text-[#A0A0A8]'}`}>
              {description}
            </p>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="flex items-center space-x-2 text-[#6C63FF]">
              <div className="w-5 h-5 border-2 border-[#6C63FF]/30 border-t-[#6C63FF] rounded-full animate-spin" />
              <span className="text-sm font-medium">Uploading...</span>
            </div>
          </div>
        )}
      </div>

      {/* Success Message */}
      {currentFile && !isLoading && !error && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span>File uploaded successfully</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div id="upload-error" className="mt-2 flex items-center space-x-2 text-sm text-red-600" role="alert">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUploadWidget;