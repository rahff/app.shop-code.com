// src/components/UploadImage/FileUploadWidget.tsx
import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Image, Loader2 } from 'lucide-react';
import { UploadStatus } from '../../core/UploadImage/api/UploadFile';
import { uploadFileFactory } from '../../factory/uploadFileFactory';
import {AppRoute} from "../../App.tsx";
import {ERROR_PAGE_ROUTE} from "../../core/Common/constants.ts";
import {Observable, Subscription} from "rxjs";

interface FileUploadWidgetProps {
  onFileSelect: (file: File, fileIdentifier: string) => void;
  onFileRemove: () => void;
  onUploadError: () => void;
  fileIdentifier: string;
  isLoading: boolean;
  error: string | null;
  currentFile: File | null;
  label: string;
  description: string;
  redirectUser: (path: AppRoute) => void;
}


const FileUploadWidget: React.FC<FileUploadWidgetProps> = ({
  onFileSelect,
  onFileRemove,
  onUploadError,
  fileIdentifier,
  isLoading = false,
  error,
  currentFile,
  label = "Upload File",
  description = "PNG, JPG or GIF (MAX. 5MB)",
  redirectUser
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("None");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadFileService = uploadFileFactory();

  const validateFile = (file: File): string | null => {
    // Check file type for images
    if (accept.includes('image/') && !file.type.startsWith('image/')) {
      return 'Please select a valid image file';
    }
    return null;
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
      onFileSelect(e.dataTransfer.files[0], fileIdentifier);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setSelectedFile(null);
    setUploadStatus("None");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileRemove?.();
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const isUploading = uploadStatus === "Pending";
  const uploadFailed = uploadStatus === "Failed";
  const uploadSucceeded = uploadStatus === "Ok";

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={'image/'}
        onChange={handleInputChange}
        className="hidden"
        aria-describedby={error ? "upload-error" : undefined}
        disabled={isUploading}
      />

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!isUploading ? openFileDialog : undefined}
        className={`relative border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
          dragActive
            ? 'border-[#6C63FF] bg-[#6C63FF]/5'
            : error || uploadFailed
            ? 'border-red-300 bg-red-50 hover:bg-red-100'
            : uploadSucceeded
            ? 'border-green-300 bg-green-50'
            : 'border-[#A0A0A8] hover:border-[#6C63FF] hover:bg-gray-50'
        } ${isUploading || isLoading ? 'pointer-events-none opacity-75' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={`Upload ${label.toLowerCase()}`}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isUploading) {
            e.preventDefault();
            openFileDialog();
          }
        }}
      >
        {selectedFile || currentFile ? (
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
                    {selectedFile?.name || currentFile?.name || 'File selected'}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-[#A0A0A8]">
                      {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : ''}
                    </p>
                    {uploadStatus !== "None" && (
                      <span className={`text-xs font-medium ${
                        uploadStatus === "Ok" ? 'text-green-600' :
                        uploadStatus === "Failed" ? 'text-red-600' :
                        'text-[#6C63FF]'
                      }`}>
                        {uploadStatus === "Pending" ? 'Uploading...' :
                         uploadStatus === "Ok" ? 'Upload Complete' :
                         'Upload Failed'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {!isUploading && (
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
            {isUploading && uploadProgress > 0 && (
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
            {isUploading ? (
              <Loader2 className="w-8 h-8 mb-3 text-[#6C63FF] animate-spin" />
            ) : (
              <Upload className={`w-8 h-8 mb-3 ${error || uploadFailed ? 'text-red-400' : 'text-[#A0A0A8]'}`} />
            )}
            <p className={`text-sm font-medium mb-1 ${error || uploadFailed ? 'text-red-600' : 'text-[#2B2C34]'}`}>
              {isUploading ? 'Uploading...' : label}
            </p>
            {!isUploading && (
              <>
                <p className={`text-xs text-center ${error || uploadFailed ? 'text-red-500' : 'text-[#A0A0A8]'}`}>
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className={`text-xs mt-1 ${error || uploadFailed ? 'text-red-500' : 'text-[#A0A0A8]'}`}>
                  {description}
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Success Message */}
      {uploadSucceeded && !error && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span>File uploaded successfully</span>
        </div>
      )}

      {/* Error Message */}
      {(error || uploadFailed) && (
        <div id="upload-error" className="mt-2 flex items-center space-x-2 text-sm text-red-600" role="alert">
          <AlertCircle className="w-4 h-4" />
          <span>{error || 'Upload failed. Please try again.'}</span>
        </div>
      )}
    </div>
  );
};

export default FileUploadWidget;