import React, { useState, useEffect } from 'react';
import { Download, User, ExternalLink, Mail } from 'lucide-react';
import Loader from '../Common/Loader';

type IdProvider = 'facebook' | 'instagram' | 'tiktok' | 'email';

interface CustomerProfile {
  id: string;
  shop_id: string;
  username: string;
  account_link: string;
  id_provider: IdProvider;
  traffic_origin: string;
}

const CustomersView: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockCustomers: CustomerProfile[] = [
    {
      id: '1',
      shop_id: 'shop_123',
      username: 'sarah.johnson',
      account_link: 'https://facebook.com/sarah.johnson',
      id_provider: 'facebook',
      traffic_origin: 'facebook_ads'
    },
    {
      id: '2',
      shop_id: 'shop_123',
      username: 'mike_chen',
      account_link: 'https://instagram.com/mike_chen',
      id_provider: 'instagram',
      traffic_origin: 'instagram_story'
    },
    {
      id: '3',
      shop_id: 'shop_123',
      username: 'emma.rodriguez',
      account_link: 'mailto:emma.rodriguez@email.com',
      id_provider: 'email',
      traffic_origin: 'email_campaign'
    },
    {
      id: '4',
      shop_id: 'shop_123',
      username: 'alex.thompson',
      account_link: 'https://tiktok.com/@alexthompson',
      id_provider: 'tiktok',
      traffic_origin: 'tiktok_video'
    },
    {
      id: '5',
      shop_id: 'shop_123',
      username: 'lisa.wang',
      account_link: 'https://facebook.com/lisa.wang',
      id_provider: 'facebook',
      traffic_origin: 'facebook_post'
    },
    {
      id: '6',
      shop_id: 'shop_123',
      username: 'david.kim',
      account_link: 'https://instagram.com/david.kim',
      id_provider: 'instagram',
      traffic_origin: 'instagram_ads'
    },
    {
      id: '7',
      shop_id: 'shop_123',
      username: 'maria.santos',
      account_link: 'mailto:maria.santos@gmail.com',
      id_provider: 'email',
      traffic_origin: 'newsletter'
    },
    {
      id: '8',
      shop_id: 'shop_123',
      username: 'james.wilson',
      account_link: 'https://tiktok.com/@jameswilson',
      id_provider: 'tiktok',
      traffic_origin: 'tiktok_ads'
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setCustomers(mockCustomers);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return '📘';
      case 'instagram': return '📷';
      case 'tiktok': return '🎵';
      case 'email': return '✉️';
      default: return '🔗';
    }
  };

  const getPlatformColor = (provider: IdProvider) => {
    switch (provider) {
      case 'facebook': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'instagram': return 'text-pink-600 bg-pink-50 border-pink-200';
      case 'tiktok': return 'text-gray-800 bg-gray-50 border-gray-200';
      case 'email': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatTrafficOrigin = (origin: string) => {
    return origin.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleExportCSV = () => {
    const headers = ['Username', 'Account Link', 'ID Provider', 'Traffic Origin'];
    const csvContent = [
      headers.join(','),
      ...customers.map(customer => [
        `"${customer.username}"`,
        `"${customer.account_link}"`,
        customer.id_provider,
        customer.traffic_origin
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'customers.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAccountLinkClick = (customer: CustomerProfile) => {
    if (customer.id_provider === 'email') {
      window.location.href = customer.account_link;
    } else {
      window.open(customer.account_link, '_blank', 'noopener,noreferrer');
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Customer Profiles</h1>
          <p className="text-[#A0A0A8] text-sm sm:text-base">Manage your customer database and export data</p>
        </div>
        <Loader aria-label="Loading customer profiles..." />
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Customer Profiles</h1>
          <p className="text-[#A0A0A8] text-sm sm:text-base">Manage your customer database and export data</p>
        </div>
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-[#2B2C34] mb-2">No customer profiles found</h3>
          <p className="text-[#A0A0A8] max-w-md mx-auto">
            No customers have signed up yet. Share your promotional campaigns to start collecting customer profiles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Customer Profiles</h1>
        <p className="text-[#A0A0A8] text-sm sm:text-base">Manage your customer database and export data</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="text-sm text-[#A0A0A8]">
          <span className="font-medium text-[#2B2C34]">{customers.length}</span> customers
        </div>
        
        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-2 bg-[#6C63FF] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5845E9] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Export customer data as CSV"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#6C63FF]/20 group"
          >
            {/* Customer Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => handleAccountLinkClick(customer)}
                  className="flex items-center space-x-2 text-[#2B2C34] hover:text-[#6C63FF] transition-colors group-hover:text-[#6C63FF] focus:outline-none focus:text-[#6C63FF]"
                  aria-label={`Open ${customer.username}'s ${customer.id_provider} profile`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">
                      {customer.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold truncate">
                      {customer.username}
                    </h3>
                    <p className="text-sm text-[#A0A0A8] truncate">
                      {formatTrafficOrigin(customer.traffic_origin)}
                    </p>
                  </div>
                </button>
              </div>
              
              {/* Action Button */}
              <button
                onClick={() => handleAccountLinkClick(customer)}
                className="p-2 text-[#A0A0A8] hover:text-[#6C63FF] hover:bg-[#6C63FF]/10 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label={`Open ${customer.username}'s profile`}
              >
                {customer.id_provider === 'email' ? (
                  <Mail className="w-5 h-5" />
                ) : (
                  <ExternalLink className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Platform Badge */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleAccountLinkClick(customer)}
                className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-current focus:ring-opacity-20 ${getPlatformColor(customer.id_provider)}`}
                title={`Click to open ${customer.id_provider} profile`}
                aria-label={`Open ${customer.username}'s ${customer.id_provider} profile`}
              >
                <span className="text-base">{getPlatformIcon(customer.id_provider)}</span>
                <span className="capitalize font-semibold">{customer.id_provider}</span>
                {customer.id_provider === 'email' ? (
                  <Mail className="w-3 h-3" />
                ) : (
                  <ExternalLink className="w-3 h-3" />
                )}
              </button>
            </div>

            {/* Account Link Preview */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-[#A0A0A8] truncate font-mono">
                {customer.account_link}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Results Summary */}
      <div className="mt-8 text-center">
        <p className="text-sm text-[#A0A0A8]">
          Showing <span className="font-medium text-[#2B2C34]">{customers.length}</span> customer profiles
        </p>
      </div>
    </div>
  );
};

export default CustomersView;