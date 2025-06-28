import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import QrcodeScannerView from './QrcodeScannerView';
import { CouponData } from '../../core/ScanQrcode/api/data';

const QrcodeScannerPage: React.FC = () => {
  const [scannedCoupon, setScannedCoupon] = useState<CouponData | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const handleScanSuccess = (coupon: CouponData) => {
    setScannedCoupon(coupon);
    setScanError(null);
    console.log('Scanned coupon:', coupon);
    // Here you could navigate to a coupon details page or redeem page
  };

  const handleScanError = (error: string) => {
    setScanError(error);
    setScannedCoupon(null);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleClose = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-[#A0A0A8]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#2B2C34] font-['Inter']">QR Code Scanner</h1>
            <p className="text-sm text-[#A0A0A8]">Scan customer coupons to redeem</p>
          </div>
        </div>
      </header>

      {/* Scanner Content */}
      <main className="relative">
        <QrcodeScannerView
          onScanSuccess={handleScanSuccess}
          onScanError={handleScanError}
          isActive={true}
          onClose={handleClose}
        />

        {/* Success/Error Messages */}
        {scannedCoupon && (
          <div className="absolute top-4 left-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 z-10">
            <h3 className="font-semibold text-green-800">Coupon Scanned Successfully!</h3>
            <p className="text-green-700 text-sm mt-1">{scannedCoupon.name}</p>
          </div>
        )}

        {scanError && (
          <div className="absolute top-4 left-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 z-10">
            <h3 className="font-semibold text-red-800">Scan Error</h3>
            <p className="text-red-700 text-sm mt-1">{scanError}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default QrcodeScannerPage;