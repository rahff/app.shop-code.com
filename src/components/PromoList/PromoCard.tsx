import React from 'react';
import { Calendar, FileText, Tag } from 'lucide-react';
import { PromoFormData } from '../../types';

interface PromoCardProps {
  promo: PromoFormData;
}

const PromoCard: React.FC<PromoCardProps> = ({ promo }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFileIcon = (extension: string) => {
    const iconClass = "w-4 h-4";
    switch (extension.toLowerCase()) {
      case 'pdf':
        return <FileText className={`${iconClass} text-red-500`} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Tag className={`${iconClass} text-green-500`} />;
      default:
        return <FileText className={`${iconClass} text-gray-500`} />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:border-[#6C63FF]/20">
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter'] flex-1 pr-2">{promo.name}</h3>
        <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md flex-shrink-0">
          {getFileIcon(promo.file_extension)}
          <span className="text-xs font-medium text-gray-600 uppercase">{promo.file_extension}</span>
        </div>
      </div>
      
      <p className="text-[#A0A0A8] text-sm mb-4 line-clamp-2">{promo.description}</p>
      
      <div className="flex items-center space-x-2 text-sm">
        <Calendar className="w-4 h-4 text-[#6C63FF] flex-shrink-0" />
        <span className="font-medium text-[#6C63FF] truncate">
          {formatDate(promo.validity_date_start)} - {formatDate(promo.validity_date_end)}
        </span>
      </div>
    </div>
  );
};

export default PromoCard;