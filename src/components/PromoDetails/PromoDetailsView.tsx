import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PromoDetailsPage from './PromoDetailsPage';
import { PromoData } from '../../core/CreatePromo/api/data';
import { AppRoute } from '../../App';

interface PromoDetailsViewProps {
  redirectUser: (destination: AppRoute) => void;
}

const PromoDetailsView: React.FC<PromoDetailsViewProps> = ({ redirectUser }) => {
  const { promoId } = useParams<{ promoId: string }>();
  const [promoData, setPromoData] = useState<PromoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromoData = async () => {
      if (!promoId) {
        setError('Promo ID not found');
        setIsLoading(false);
        return;
      }

      try {
        // Simulate API call - replace with actual API call
        setTimeout(() => {
          // Mock promo data - replace with actual API response
          const mockPromo: PromoData = {
            id: promoId,
            shop_id: 'shop_123',
            name: 'Summer Sale 2025',
            description: 'Get 30% off on all summer collection items. Valid for all clothing and accessories in our store.',
            validity_date_start: '2025-06-01',
            validity_date_end: '2025-08-31',
            coupon_img: 'https://images.pexels.com/photos/1028741/pexels-photo-1028741.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: '2025-01-15'
          };
          
          setPromoData(mockPromo);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load promo data');
        setIsLoading(false);
      }
    };

    fetchPromoData();
  }, [promoId]);

  const handleBack = () => {
    redirectUser('dashboard');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5845E9] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <PromoDetailsPage
      promoData={promoData || undefined}
      onBack={handleBack}
      redirectUser={redirectUser}
    />
  );
};

export default PromoDetailsView;