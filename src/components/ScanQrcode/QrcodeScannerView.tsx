// src/components/ScanQrcode/QrcodeScannerView.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Camera, AlertCircle, CheckCircle, QrCode, X } from 'lucide-react';
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
  isActive = false,
  onClose
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Simulate QR code scanning (in real implementation, would use a QR code library)
  const startScanning = async () => {
    try {
      setError(null);
      setSuccess(null);
      setIsScanning(true);

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Simulate scanning process
      setTimeout(() => {
        // Mock successful scan
        const mockCoupon: CouponData = {
          name: "Summer Sale 2025",
          customer_id: "customer_123",
          shop_id: "shop_456",
          promo_id: "promo_789",
          coupon_img: "https://example.com/coupon.jpg",
          validity_date_range: {
            start: "2025-06-01",
            end: "2025-08-31"
          }
        };
        
        setSuccess("QR Code scanned successfully!");
        onScanSuccess(mockCoupon);
        stopScanning();
      }, 3000);

    } catch (err) {
      const errorMessage = "Camera access denied or not available";
      setError(errorMessage);
      onScanError(errorMessage);
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (isActive) {
      startScanning();
    } else {
      stopScanning();
    }

    return () => {
      stopScanning();
    };
  }, [isActive]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="scanner-title">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 id="scanner-title" className="text-lg font-semibold text-[#2B2C34] font-['Inter'] flex items-center">
            <QrCode className="w-5 h-5 mr-2 text-[#6C63FF]" />
            Scan QR Code
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close scanner"
            >
              <X className="w-5 h-5 text-[#A0A0A8]" />
            </button>
          )}
        </div>

        {/* Scanner Area */}
        <div className="p-4">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-square mb-4">
            {isScanning ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  aria-label="Camera feed for QR code scanning"
                />
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-[#6C63FF] rounded-lg relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#6C63FF] rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#6C63FF] rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#6C63FF] rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#6C63FF] rounded-br-lg"></div>
                    
                    {/* Scanning Line Animation */}
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-[#6C63FF] animate-pulse"></div>
                  </div>
                </div>
                
                {/* Loading Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-sm">Scanning...</span>
                  </div>
                </div>
              </>
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
            
            {onClose && (
              <button
                onClick={onClose}
                className="px-6 py-3 border-2 border-[#6C63FF] text-[#6C63FF] rounded-lg font-medium hover:bg-[#6C63FF] hover:text-white transition-all duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrcodeScannerView;