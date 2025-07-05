import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Check, Calendar, ExternalLink, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PromoData } from '../../core/CreatePromo/api/data';
import { AppRoute } from '../../App';

interface PromoDetailsPageProps {
  promoData?: PromoData;
  onBack?: () => void;
  redirectUser?: (destination: AppRoute) => void;
}

interface CampaignLink {
  platform: string;
  icon: string;
  color: string;
  bgColor: string;
}

const PromoDetailsPage: React.FC<PromoDetailsPageProps> = ({
  promoData,
  onBack,
  redirectUser
}) => {
  const { t } = useTranslation('global');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!promoData);

  // Mock data for demonstration if no promoData provided
  const mockPromoData: PromoData = {
    id: 'promo_123',
    shop_id: 'shop_456',
    name: 'Summer Sale 2025',
    description: 'Get 30% off on all summer collection items. Valid for all clothing and accessories in our store.',
    validity_date_start: '2025-06-01',
    validity_date_end: '2025-08-31',
    coupon_img: 'https://images.pexels.com/photos/1028741/pexels-photo-1028741.jpeg?auto=compress&cs=tinysrgb&w=400',
    created_at: '2025-01-15'
  };

  const displayPromo = promoData || mockPromoData;

  // Campaign platforms with their styling
  const campaignPlatforms: CampaignLink[] = [
    {
      platform: 'Facebook',
      icon: '📘',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      platform: 'Instagram',
      icon: '📷',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      platform: 'TikTok',
      icon: '🎵',
      color: 'text-gray-800',
      bgColor: 'bg-gray-50'
    },
    {
      platform: 'GoogleAds',
      icon: '🔍',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      platform: 'Custom',
      icon: '⚙️',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  useEffect(() => {
    // Simulate loading if no promo data provided
    if (!promoData) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [promoData]);

  const generateCampaignUrl = (platform: string): string => {
    const trafficOrigin = platform.toLowerCase().replace(/\s+/g, '');
    return `https://promo.shop-code.com?promo_id=${displayPromo.id}&shop_id=${displayPromo.shop_id}&traffic_origin=${trafficOrigin}`;
  };

  const getQrCodeImageUrl = (): string => {
    // Extract file extension from coupon_img or default to png
    const fileExtension = displayPromo.coupon_img?.split('.').pop() || 'png';
    return `https://promo-assets.shop-code.com/${displayPromo.id}.${fileExtension}`;
  };

  const copyToClipboard = async (url: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(platform);
      
      // Clear the copied state after 2 seconds
      setTimeout(() => {
        setCopiedLink(null);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else if (redirectUser) {
      redirectUser('dashboard');
    }
  };

  const downloadQrCode = () => {
    const qrCodeUrl = getQrCodeImageUrl();
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${displayPromo.name.replace(/\s+/g, '_')}_QR_Code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Skeleton */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div>
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* Content Skeleton */}
        <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="w-full h-64 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="space-y-3">
                <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-full h-16 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back to promo list"
          >
            <ArrowLeft className="w-5 h-5 text-[#A0A0A8]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#2B2C34] font-['Inter']">Promo Details</h1>
            <p className="text-sm text-[#A0A0A8]">Manage your promotional campaign</p>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {copiedLink && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-top-2">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">Link copied ✅</span>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Promo Details */}
          <div className="space-y-6">
            {/* Promo Image Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#6C63FF] to-[#5845E9] flex items-center justify-center mb-4">
                {displayPromo.coupon_img ? (
                  <img 
                    src={displayPromo.coupon_img} 
                    alt={displayPromo.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-white text-6xl font-bold">
                    {displayPromo.name.charAt(0)}
                  </span>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter']">QR Code Image</h3>
                <button
                  onClick={downloadQrCode}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#6C63FF] text-white rounded-lg font-medium hover:bg-[#5845E9] transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Promo Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-[#2B2C34] font-['Inter'] mb-4">
                {displayPromo.name}
              </h2>
              
              <p className="text-[#A0A0A8] mb-6 leading-relaxed">
                {displayPromo.description}
              </p>

              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4 text-[#6C63FF]" />
                <span className="font-medium text-[#6C63FF]">
                  {formatDate(displayPromo.validity_date_start)} - {formatDate(displayPromo.validity_date_end)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Campaign Links */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#2B2C34] font-['Inter'] mb-2">
                  Campaign Links
                </h3>
                <p className="text-[#A0A0A8] text-sm">
                  Copy these links to track traffic from different social media platforms
                </p>
              </div>

              <div className="space-y-4">
                {campaignPlatforms.map((campaign) => {
                  const campaignUrl = generateCampaignUrl(campaign.platform);
                  const isCopied = copiedLink === campaign.platform;
                  
                  return (
                    <div
                      key={campaign.platform}
                      className="border border-gray-200 rounded-lg p-4 hover:border-[#6C63FF]/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${campaign.bgColor} rounded-lg flex items-center justify-center`}>
                            <span className="text-lg">{campaign.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#2B2C34] font-['Inter']">
                              {campaign.platform}
                            </h4>
                            <p className="text-xs text-[#A0A0A8]">
                              Track {campaign.platform.toLowerCase()} traffic
                            </p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => copyToClipboard(campaignUrl, campaign.platform)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            isCopied
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-[#A0A0A8] hover:bg-[#6C63FF]/10 hover:text-[#6C63FF]'
                          }`}
                          aria-label={`Copy ${campaign.platform} campaign link`}
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <code className="text-xs text-[#2B2C34] break-all font-mono">
                          {campaignUrl}
                        </code>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter'] mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-[#6C63FF] text-[#6C63FF] rounded-lg font-medium hover:bg-[#6C63FF] hover:text-white transition-all duration-200">
                  <ExternalLink className="w-4 h-4" />
                  <span>View Analytics</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-[#2B2C34] rounded-lg font-medium hover:bg-gray-200 transition-all duration-200">
                  <span>Edit Promo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PromoDetailsPage;