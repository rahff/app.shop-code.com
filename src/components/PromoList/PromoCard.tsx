import React from 'react';
import { Calendar, ExternalLink, Sparkles, TrendingUp } from 'lucide-react';
import {PromoData} from "../../core/CreatePromo/api/data.ts";

interface PromoCardProps {
  promo: PromoData;
  onViewDetails?: (promo: PromoData) => void;
}

const PromoCard: React.FC<PromoCardProps> = ({ promo, onViewDetails }) => {
  const handleViewDetails = () => {
    onViewDetails?.(promo);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isActive = () => {
    const now = new Date();
    const startDate = new Date(promo.validity_date_start);
    const endDate = new Date(promo.validity_date_end);
    return now >= startDate && now <= endDate;
  };

  const getStatusColor = () => {
    const now = new Date();
    const startDate = new Date(promo.validity_date_start);
    const endDate = new Date(promo.validity_date_end);
    
    if (now < startDate) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (now > endDate) return 'bg-gray-100 text-gray-600 border-gray-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const getStatusText = () => {
    const now = new Date();
    const startDate = new Date(promo.validity_date_start);
    const endDate = new Date(promo.validity_date_end);
    
    if (now < startDate) return 'Upcoming';
    if (now > endDate) return 'Expired';
    return 'Active';
  };

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[#6C63FF]/30 hover:bg-white">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/5 via-transparent to-[#5845E9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor()}`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${isActive() ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          {getStatusText()}
        </span>
      </div>

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 pr-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#2B2C34] font-['Inter'] group-hover:text-[#6C63FF] transition-colors duration-300">
                {promo.name}
              </h3>
              <p className="text-sm text-[#A0A0A8]">
                Created {formatDate(promo.created_at)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-[#A0A0A8] text-sm mb-6 line-clamp-2 leading-relaxed">
          {promo.description}
        </p>
        
        {/* Validity Period */}
        <div className="bg-gray-50/80 rounded-xl p-4 mb-6 group-hover:bg-[#6C63FF]/5 transition-colors duration-300">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-[#6C63FF]" />
            <span className="text-xs font-semibold text-[#6C63FF] uppercase tracking-wider">
              Valid Period
            </span>
          </div>
          <div className="text-sm font-medium text-[#2B2C34]">
            {formatDate(promo.validity_date_start)} - {formatDate(promo.validity_date_end)}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleViewDetails}
          className="w-full bg-gradient-to-r from-[#6C63FF] to-[#5845E9] hover:from-[#5845E9] hover:to-[#4A3BC7] text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl group-hover:scale-105 transform"
        >
          <TrendingUp className="w-4 h-4" />
          <span>View Details</span>
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#6C63FF]/10 to-[#5845E9]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-1 -left-1 w-16 h-16 bg-gradient-to-br from-[#5845E9]/10 to-[#4A3BC7]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{transitionDelay: '0.1s'}}></div>
    </div>
  );
};

export default PromoCard;