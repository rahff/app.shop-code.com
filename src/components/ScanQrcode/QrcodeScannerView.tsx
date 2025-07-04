// src/components/ScanQrcode/QrcodeScannerView.tsx
import React, { useState } from 'react';
import { Camera, AlertCircle, CheckCircle, QrCode, X } from 'lucide-react';
import {IDetectedBarcode, Scanner} from '@yudiel/react-qr-scanner';
import { CouponData } from '../../core/ScanQrcode/api/data';

interface QrcodeScannerViewProps {
  onScanSuccess: (coupon: CouponData) => void;
  onScanError: (error: string) => void;
  isActive?: boolean;
  onClose?: () => void;
}

const QrcodeScannerView: React.FC<QrcodeScannerViewProps> = ({
  onScanSuccess,
  onScanError,
  onClose
}) => {
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleScanResult = (result: IDetectedBarcode[]) => {
    setScanResult(result.map((r) => r.rawValue).join(''));
    setSuccess("QR Code scanned successfully!");
    setError(null);
    
    // Try to parse as coupon data and call success handler
    try {
      const couponData = JSON.parse(scanResult);
      onScanSuccess(couponData);
    } catch (parseError: unknown) {
      setError("Invalid qrcode!")
      console.log('Scanned non-JSON QR code:', parseError);
    }
  };

  const handleScanError = (error: unknown) => {
    console.error('QR Scan Error:', error);
    setError("Scan failed. Please try again.");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onScanError(error.message || "Scan failed");
  };

  const startScanning = () => {
    setIsScanning(true);
    setError(null);
    setSuccess(null);
    setScanResult('');
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  const handleClose = () => {
    stopScanning();
    if (onClose) {
      onClose();
    }
  };

  const handleCancel = () => {
    stopScanning();
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="scanner-title">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 id="scanner-title" className="text-lg font-semibold text-[#2B2C34] font-['Inter'] flex items-center">
            <QrCode className="w-5 h-5 mr-2 text-[#6C63FF]" />
            Scan QR Code
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close scanner"
          >
            <X className="w-5 h-5 text-[#A0A0A8]" />
          </button>
        </div>

        {/* Scanner Area */}
        <div className="p-4">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-square mb-4">
            {isScanning ? (
              <div className="w-full h-full relative">
                <Scanner
                  onScan={handleScanResult}
                  onError={handleScanError}
                  constraints={{
                    facingMode: 'environment' // Use back camera on mobile
                  }}
                  styles={{
                    container: {
                      width: '100%',
                      height: '100%'
                    },
                    video: {
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }
                  }}
                />
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 border-2 border-[#6C63FF] rounded-lg relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#6C63FF] rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#6C63FF] rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#6C63FF] rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#6C63FF] rounded-br-lg"></div>
                    
                    {/* Scanning Line Animation */}
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-[#6C63FF] animate-pulse"></div>
                  </div>
                </div>
                
                {/* Scanning Status */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-sm">Scanning...</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-white">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-[#A0A0A8]" />
                  <p className="text-[#A0A0A8]">Camera not active</p>
                </div>
              </div>
            )}
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2" role="alert">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2" role="alert">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-green-800 text-sm">{success}</p>
            </div>
          )}

          {/* Scan Result Display */}
          {scanResult && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm font-medium mb-1">Scanned result:</p>
              <p className="text-blue-700 text-xs break-all">{scanResult}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="text-center text-[#A0A0A8] text-sm mb-4">
            <p>Position the QR code within the frame to scan</p>
            <p className="mt-1">Make sure the code is clearly visible and well-lit</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {!isScanning ? (
              <button
                onClick={startScanning}
                className="flex-1 bg-[#6C63FF] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#5845E9] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Camera className="w-5 h-5" />
                <span>Start Scanning</span>
              </button>
            ) : (
              <button
                onClick={stopScanning}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all duration-200"
              >
                Stop Scanning
              </button>
            )}
            
            <button
              onClick={handleCancel}
              className="px-6 py-3 border-2 border-[#6C63FF] text-[#6C63FF] rounded-lg font-medium hover:bg-[#6C63FF] hover:text-white transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrcodeScannerView;