// src/components/UploadImage/FileUploadWidget.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Image, Loader2 } from 'lucide-react';
import {UploadFile} from "../../core/UploadImage/api/UploadFile.ts";

interface FileUploadWidgetProps {
  signedUrl: string | null;
  selectedFile: File | null;
  fileIdentifier: string | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  onUploadComplete: () => void;
  onUploadError: () => void;
  uploadFile: UploadFile
}

const FileUploadWidget: React.FC<FileUploadWidgetProps> = ({
  signedUrl,
  selectedFile,
  onFileSelect,
  onFileRemove,
  uploadFile,
  onUploadComplete,
  onUploadError,

}) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-upload when signedUrl and selectedFile are available
  useEffect(() => {
    if (signedUrl && selectedFile && !isUploading && !uploadComplete) {
      handleUpload().catch(() => {
        setUploadError(true);
      });
    }
  }, [signedUrl, selectedFile, isUploading, uploadComplete]);

  // Create preview when file is selected
  useEffect(() => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  }, [selectedFile]);

  const handleUpload = async () => {
    if(!selectedFile || ! signedUrl) return;
    setIsUploading(true);
    setUploadError(false);
    setUploadProgress(50);
    uploadFile(selectedFile, signedUrl).then((state) => {
      if(state.error) {
        setUploadError(true);
        onUploadError();
        setIsUploading(false);
      }
      setUploadProgress(100);
      setUploadComplete(true);
      setIsUploading(false);
      onUploadComplete();
    })
  };

  const validateFile = (file: File): string | null => {

    // Check file type for images
    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file';
    }
    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      return;
    }

    // Reset upload state
    setUploadComplete(false);
    setUploadError(false);
    setUploadProgress(0);
    
    onFileSelect?.(file);
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
    setUploadComplete(false);
    setUploadError(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileRemove?.();
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Show loader if waiting for signedUrl or selectedFile
  if (!signedUrl) {
    return (
      <div className="w-full">
        <div className="border-2 border-dashed border-[#A0A0A8] rounded-lg p-8">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 mb-3 text-[#6C63FF] animate-spin" />
            <p className="text-sm font-medium text-[#2B2C34] mb-1">
              Loading upload configuration...
            </p>
            <p className="text-xs text-[#A0A0A8]">
              Please wait while we prepare the upload
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={'image/'}
        onChange={handleInputChange}
        className="hidden"
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
            : uploadError
            ? 'border-red-300 bg-red-50 hover:bg-red-100'
            : uploadComplete
            ? 'border-green-300 bg-green-50'
            : 'border-[#A0A0A8] hover:border-[#6C63FF] hover:bg-gray-50'
        } ${isUploading ? 'pointer-events-none opacity-75' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={"Upload image"}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isUploading) {
            e.preventDefault();
            openFileDialog();
          }
        }}
      >
        {selectedFile ? (
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
                    {selectedFile.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-[#A0A0A8]">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {(isUploading || uploadComplete || uploadError) && (
                      <span className={`text-xs font-medium ${
                        uploadComplete ? 'text-green-600' :
                        uploadError ? 'text-red-600' :
                        'text-[#6C63FF]'
                      }`}>
                        {isUploading ? 'Uploading...' :
                         uploadComplete ? 'Upload Complete' :
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
              <Upload className={`w-8 h-8 mb-3 ${uploadError ? 'text-red-400' : 'text-[#A0A0A8]'}`} />
            )}
            <p className={`text-sm font-medium mb-1 ${uploadError ? 'text-red-600' : 'text-[#2B2C34]'}`}>
              {isUploading ? 'Uploading...' : "image"}
            </p>
            {!isUploading && (
              <>
                <p className={`text-xs text-center ${uploadError ? 'text-red-500' : 'text-[#A0A0A8]'}`}>
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className={`text-xs mt-1 ${uploadError ? 'text-red-500' : 'text-[#A0A0A8]'}`}>
                  {"I don't know what it's doing here ..."}
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Success Message */}
      {uploadComplete && !uploadError && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span>File uploaded successfully</span>
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-red-600" role="alert">
          <AlertCircle className="w-4 h-4" />
          <span>Upload failed. Please try again.</span>
        </div>
      )}
    </div>
  );
};

export default FileUploadWidget;