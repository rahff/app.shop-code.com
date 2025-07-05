import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Check, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PromoData } from '../../core/CreatePromo/api/data';
import { AppRoute } from '../../App';

interface PromoDetailsPageProps {
  promoData?: PromoData;
  onBack?: () => void;
  redirectUser?: (destination: AppRoute) => void;
  isLoading?: boolean;
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
  redirectUser,
  isLoading: externalLoading = false
}) => {
  const { t } = useTranslation('global');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [internalLoading, setInternalLoading] = useState(!promoData);
  
  // Use external loading state if provided, otherwise use internal state
  const isLoading = externalLoading || internalLoading;

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
    if (!promoData && !externalLoading) {
      const timer = setTimeout(() => {
        setInternalLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    // If promo data is provided, stop internal loading
    if (promoData) {
      setInternalLoading(false);
    }
  }, [promoData, externalLoading]);

  const generateCampaignUrl = (platform: string): string => {
    const trafficOrigin = platform.toLowerCase().replace(/\s+/g, '');
    return `https://promo.shop-code.com?promo_id=${displayPromo.id}&shop_id=${displayPromo.shop_id}&traffic_origin=${trafficOrigin}`;
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleGoBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={t('promoDetails.goBack')}
            >
              <ArrowLeft className="w-5 h-5 text-[#A0A0A8]" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-[#2B2C34] font-['Inter']">{t('promoDetails.title')}</h1>
              <p className="text-sm text-[#A0A0A8]">{t('promoDetails.description')}</p>
            </div>
          </div>
        </header>

        {/* Loading Content */}
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-[#2B2C34] font-['Inter'] mb-2">
              Loading promo details...
            </h2>
            <p className="text-[#A0A0A8]">
              Please wait while we fetch your promotional campaign information
            </p>
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
            aria-label={t('promoDetails.goBack')}
          >
            <ArrowLeft className="w-5 h-5 text-[#A0A0A8]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#2B2C34] font-['Inter']">{t('promoDetails.title')}</h1>
            <p className="text-sm text-[#A0A0A8]">{t('promoDetails.description')}</p>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {copiedLink && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-top-2">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">{t('promoDetails.linkCopied')}</span>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Promo Details */}
          <div className="space-y-6">
            {/* Coupon Image Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter'] mb-4">Coupon Image</h3>
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#6C63FF] to-[#5845E9] flex items-center justify-center">
                {displayPromo.coupon_img ? (
                  <img 
                    src={displayPromo.coupon_img} 
                    alt={`${displayPromo.name} coupon`}
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
                  {t('promoDetails.campaignLinks')}
                </h3>
                <p className="text-[#A0A0A8] text-sm">
                  {t('promoDetails.campaignLinksDescription')}
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
                              {campaign.platform} ad link
                            </h4>
                            <p className="text-xs text-[#A0A0A8]">
                              Click to copy link for your {campaign.platform.toLowerCase()} ads
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => copyToClipboard(campaignUrl, campaign.platform)}
                        className={`w-full p-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                          isCopied
                            ? 'bg-green-100 text-green-600 border border-green-200'
                            : 'bg-gray-50 text-[#2B2C34] hover:bg-[#6C63FF]/10 hover:text-[#6C63FF] border border-gray-200 hover:border-[#6C63FF]/30'
                        }`}
                        aria-label={t('promoDetails.copyLink', { platform: campaign.platform })}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="font-medium">Link copied – paste into your ad</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span className="font-medium">Copy {campaign.platform.toLowerCase()} campaign link</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter'] mb-4">
                {t('promoDetails.quickActions')}
              </h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-[#6C63FF] text-[#6C63FF] rounded-lg font-medium hover:bg-[#6C63FF] hover:text-white transition-all duration-200">
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('promoDetails.viewAnalytics')}</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-[#2B2C34] rounded-lg font-medium hover:bg-gray-200 transition-all duration-200">
                  <span>{t('promoDetails.editPromo')}</span>
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