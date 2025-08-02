import React, { useState, useEffect } from 'react';
import { Download, User, ExternalLink, Mail, Calendar, QrCode } from 'lucide-react';
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

type SortField = 'username' | 'id_provider' | 'traffic_origin';
type SortDirection = 'asc' | 'desc';

const CustomersView: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('username');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

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

  // Sort customers
  useEffect(() => {
    let sorted = [...customers];

    // Sort customers
    sorted.sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setCustomers(sorted);
  }, [sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

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
      case 'facebook': return 'text-blue-600 bg-blue-50';
      case 'instagram': return 'text-pink-600 bg-pink-50';
      case 'tiktok': return 'text-gray-800 bg-gray-50';
      case 'email': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
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
    return <Loader aria-label="Loading customer profiles..." />;
  }

  if (customers.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <User className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-[#2B2C34] mb-2">No customer profiles found</h3>
        <p className="text-[#A0A0A8] max-w-md mx-auto">
          No customers have signed up yet. Share your promotional campaigns to start collecting customer profiles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#2B2C34] font-['Inter']">Customer Profiles</h2>
          <p className="text-[#A0A0A8] text-sm">Manage your customer database and export data</p>
        </div>
        
        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-2 bg-[#6C63FF] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5845E9] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 transition-all duration-200"
          aria-label="Export customer data as CSV"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('username')}
                  aria-sort={sortField === 'username' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('username');
                    }
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <span>Username</span>
                    {sortField === 'username' && (
                      <span className="text-[#6C63FF]">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider">
                  Account Link
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('id_provider')}
                  aria-sort={sortField === 'id_provider' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('id_provider');
                    }
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <span>ID Provider</span>
                    {sortField === 'id_provider' && (
                      <span className="text-[#6C63FF]">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('traffic_origin')}
                  aria-sort={sortField === 'traffic_origin' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('traffic_origin');
                    }
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <span>Traffic Origin</span>
                    {sortField === 'traffic_origin' && (
                      <span className="text-[#6C63FF]">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleAccountLinkClick(customer)}
                      className="flex items-center space-x-2 text-[#6C63FF] hover:text-[#5845E9] font-medium transition-colors"
                      aria-label={`Open ${customer.username}'s ${customer.id_provider} profile`}
                    >
                      <span>{customer.username}</span>
                      {customer.id_provider === 'email' ? (
                        <Mail className="w-4 h-4" />
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-[#2B2C34] font-mono text-sm">
                    {customer.account_link}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleAccountLinkClick(customer)}
                      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors hover:opacity-80 ${getPlatformColor(customer.id_provider)}`}
                      title={`Click to open ${customer.id_provider} profile`}
                      aria-label={`Open ${customer.username}'s ${customer.id_provider} profile`}
                    >
                      <span>{getPlatformIcon(customer.id_provider)}</span>
                      <span className="capitalize">{customer.id_provider}</span>
                      {customer.id_provider === 'email' ? (
                        <Mail className="w-3 h-3" />
                      ) : (
                        <ExternalLink className="w-3 h-3" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-[#2B2C34] text-sm">
                    {customer.traffic_origin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <button
                  onClick={() => handleAccountLinkClick(customer)}
                  className="flex items-center space-x-2 text-[#6C63FF] hover:text-[#5845E9] font-medium transition-colors mb-1"
                  aria-label={`Open ${customer.username}'s ${customer.id_provider} profile`}
                >
                  <span className="text-lg font-semibold">{customer.username}</span>
                  {customer.id_provider === 'email' ? (
                    <Mail className="w-4 h-4" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                </button>
                <p className="text-sm text-[#A0A0A8]">From: {customer.traffic_origin}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleAccountLinkClick(customer)}
                className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors hover:opacity-80 ${getPlatformColor(customer.id_provider)}`}
                title={`Click to open ${customer.id_provider} profile`}
                aria-label={`Open ${customer.username}'s ${customer.id_provider} profile`}
              >
                <span>{getPlatformIcon(customer.id_provider)}</span>
                <span className="capitalize">{customer.id_provider}</span>
                {customer.id_provider === 'email' ? (
                  <Mail className="w-3 h-3" />
                ) : (
                  <ExternalLink className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Results Summary */}
      <div className="text-center text-sm text-[#A0A0A8]">
        Showing {customers.length} customers
      </div>
    </div>
  );
};

export default CustomersView;