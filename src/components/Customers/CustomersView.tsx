import React, { useState, useEffect } from 'react';
import { Download, User, ExternalLink, Mail, Calendar, QrCode } from 'lucide-react';
import Loader from '../Common/Loader';

interface AccountLink {
  platform: 'facebook' | 'instagram' | 'tiktok' | 'email';
  url: string;
}

interface CustomerProfile {
  id: string;
  displayName: string;
  code: string;
  qrCodeUrl: string;
  accountLink: AccountLink;
  createdAt: string;
}

type SortField = 'displayName' | 'code' | 'createdAt';
type SortDirection = 'asc' | 'desc';

const CustomersView: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Mock data
  const mockCustomers: CustomerProfile[] = [
    {
      id: '1',
      displayName: 'Sarah Johnson',
      code: 'CUST001',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CUST001',
      accountLink: { platform: 'facebook', url: 'https://facebook.com/sarah.johnson' },
      createdAt: '2025-01-15T10:30:00Z'
    },
    {
      id: '2',
      displayName: 'Mike Chen',
      code: 'CUST002',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CUST002',
      accountLink: { platform: 'instagram', url: 'https://instagram.com/mike_chen' },
      createdAt: '2025-01-14T15:45:00Z'
    },
    {
      id: '3',
      displayName: 'Emma Rodriguez',
      code: 'CUST003',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CUST003',
      accountLink: { platform: 'email', url: 'mailto:emma.rodriguez@email.com' },
      createdAt: '2025-01-13T09:20:00Z'
    },
    {
      id: '4',
      displayName: 'Alex Thompson',
      code: 'CUST004',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CUST004',
      accountLink: { platform: 'tiktok', url: 'https://tiktok.com/@alexthompson' },
      createdAt: '2025-01-12T14:10:00Z'
    },
    {
      id: '5',
      displayName: 'Lisa Wang',
      code: 'CUST005',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CUST005',
      accountLink: { platform: 'facebook', url: 'https://facebook.com/lisa.wang' },
      createdAt: '2025-01-11T11:30:00Z'
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

      if (sortField === 'createdAt') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

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
      setSortDirection(field === 'createdAt' ? 'desc' : 'asc');
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

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'facebook': return 'text-blue-600 bg-blue-50';
      case 'instagram': return 'text-pink-600 bg-pink-50';
      case 'tiktok': return 'text-gray-800 bg-gray-50';
      case 'email': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleExportCSV = () => {
    const headers = ['Display Name', 'Code', 'Platform', 'Account URL', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...customers.map(customer => [
        `"${customer.displayName}"`,
        customer.code,
        customer.accountLink.platform,
        `"${customer.accountLink.url}"`,
        customer.createdAt
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

  const handleAccountLinkClick = (accountLink: AccountLink) => {
    if (accountLink.platform === 'email') {
      window.location.href = accountLink.url;
    } else {
      window.open(accountLink.url, '_blank', 'noopener,noreferrer');
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
          Ask your shop owner to Generate QR-codes via promo.shop-code.com.
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
                  onClick={() => handleSort('displayName')}
                  aria-sort={sortField === 'displayName' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('displayName');
                    }
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <span>Customer Name</span>
                    {sortField === 'displayName' && (
                      <span className="text-[#6C63FF]">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('code')}
                  aria-sort={sortField === 'code' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('code');
                    }
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <span>Code</span>
                    {sortField === 'code' && (
                      <span className="text-[#6C63FF]">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider">
                  QR Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider">
                  Account
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-[#2B2C34] uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('createdAt')}
                  aria-sort={sortField === 'createdAt' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('createdAt');
                    }
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <span>Created</span>
                    {sortField === 'createdAt' && (
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
                      onClick={() => handleAccountLinkClick(customer.accountLink)}
                      className="flex items-center space-x-2 text-[#6C63FF] hover:text-[#5845E9] font-medium transition-colors"
                      aria-label={`Open ${customer.displayName}'s ${customer.accountLink.platform} profile`}
                    >
                      <span>{customer.displayName}</span>
                      {customer.accountLink.platform === 'email' ? (
                        <Mail className="w-4 h-4" />
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-[#2B2C34] font-mono text-sm">
                    {customer.code}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => window.open(customer.qrCodeUrl, '_blank')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label={`Download QR code for ${customer.displayName}`}
                    >
                      <QrCode className="w-5 h-5 text-[#6C63FF]" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleAccountLinkClick(customer.accountLink)}
                      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors hover:opacity-80 ${getPlatformColor(customer.accountLink.platform)}`}
                      title={`Click to open ${customer.accountLink.platform} profile`}
                      aria-label={`Open ${customer.displayName}'s ${customer.accountLink.platform} profile`}
                    >
                      <span>{getPlatformIcon(customer.accountLink.platform)}</span>
                      <span className="capitalize">{customer.accountLink.platform}</span>
                      {customer.accountLink.platform === 'email' ? (
                        <Mail className="w-3 h-3" />
                      ) : (
                        <ExternalLink className="w-3 h-3" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-[#A0A0A8] text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(customer.createdAt)}</span>
                    </div>
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
                  onClick={() => handleAccountLinkClick(customer.accountLink)}
                  className="flex items-center space-x-2 text-[#6C63FF] hover:text-[#5845E9] font-medium transition-colors mb-1"
                  aria-label={`Open ${customer.displayName}'s ${customer.accountLink.platform} profile`}
                >
                  <span className="text-lg font-semibold">{customer.displayName}</span>
                  {customer.accountLink.platform === 'email' ? (
                    <Mail className="w-4 h-4" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                </button>
                <p className="text-sm text-[#A0A0A8] font-mono">{customer.code}</p>
              </div>
              <button
                onClick={() => window.open(customer.qrCodeUrl, '_blank')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={`Download QR code for ${customer.displayName}`}
              >
                <QrCode className="w-5 h-5 text-[#6C63FF]" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleAccountLinkClick(customer.accountLink)}
                className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors hover:opacity-80 ${getPlatformColor(customer.accountLink.platform)}`}
                title={`Click to open ${customer.accountLink.platform} profile`}
                aria-label={`Open ${customer.displayName}'s ${customer.accountLink.platform} profile`}
              >
                <span>{getPlatformIcon(customer.accountLink.platform)}</span>
                <span className="capitalize">{customer.accountLink.platform}</span>
                {customer.accountLink.platform === 'email' ? (
                  <Mail className="w-3 h-3" />
                ) : (
                  <ExternalLink className="w-3 h-3" />
                )}
              </button>
              
              <div className="flex items-center space-x-2 text-sm text-[#A0A0A8]">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(customer.createdAt)}</span>
              </div>
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