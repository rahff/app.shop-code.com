import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import {PromoData} from "../../core/CreatePromo/api/data.ts";


interface PromoCardProps {
  promo: PromoData;
  onViewDetails?: (promo: PromoData) => void;
}

const PromoCard: React.FC<PromoCardProps> = ({ promo, onViewDetails }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleViewDetails = () => {
    onViewDetails?.(promo);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:border-[#6C63FF]/20">
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter'] flex-1 pr-2">{promo.name}</h3>
      </div>
      
      <p className="text-[#A0A0A8] text-sm mb-4 line-clamp-2">{promo.description}</p>
      
      <div className="flex items-center space-x-2 text-sm">
        <Calendar className="w-4 h-4 text-[#6C63FF] flex-shrink-0" />
        <span className="font-medium text-[#6C63FF] truncate">
          {formatDate(promo.validity_date_start)} - {formatDate(promo.validity_date_end)}
        </span>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={handleViewDetails}
          className="flex items-center space-x-2 text-[#6C63FF] hover:text-[#5845E9] font-medium text-sm transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};

export default PromoCard;