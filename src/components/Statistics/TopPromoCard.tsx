import React from 'react';
import { Crown, Euro, Users, TrendingUp, Gift, ExternalLink } from 'lucide-react';
import { PromoStats } from '../../core/PromoStatistics/api/data';
import { SortOption } from './SortControls';

interface TopPromoCardProps {
  promo: PromoStats;
  sortCriterion: SortOption;
  onViewDetails?: (promo: PromoStats) => void;
}

const TopPromoCard: React.FC<TopPromoCardProps> = ({ 
  promo, 
  sortCriterion, 
  onViewDetails 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  console.log("top promo: ", promo)
  const getSortLabel = (criterion: SortOption) => {
    switch (criterion) {
      case 'revenue': return 'Top Revenue Generator';
      case 'customers': return 'Top Customer Magnet';
      case 'conversion': return 'Conversion Champion';
      case 'issued': return 'Most Popular Promo';
      default: return 'Top Performer';
    }
  };

  const getSortValue = (criterion: SortOption) => {
    switch (criterion) {
      case 'revenue': return `€${promo.total_revenue.toLocaleString()}`;
      case 'customers': return `${promo.collected_customers} customers`;
      case 'conversion': return `${promo.total_conversion} conversions`;
      case 'issued': return `${promo.nbr_of_issues} issued`;
      default: return '';
    }
  };

  const getSortIcon = (criterion: SortOption) => {
    switch (criterion) {
      case 'revenue': return Euro;
      case 'customers': return Users;
      case 'conversion': return TrendingUp;
      case 'issued': return Gift;
      default: return Crown;
    }
  };

  const SortIcon = getSortIcon(sortCriterion);

  return (
    <div className="relative bg-gradient-to-br from-[#6C63FF] to-[#5845E9] rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 mb-6">
      {/* Crown Badge */}
      <div className="absolute -top-3 left-6">
        <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
          <Crown className="w-3 h-3" />
          <span>TOP PROMO</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4 pt-2">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <SortIcon className="w-5 h-5 text-yellow-300" />
            <span className="text-yellow-300 text-sm font-medium">
              {getSortLabel(sortCriterion)}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-1">{promo.name}</h2>
          <p className="text-white/80 text-sm">
            Created {formatDate(promo.created_at)} • 
            Valid {formatDate(promo.validity_range.start)} - {formatDate(promo.validity_range.end)}
          </p>
        </div>
        
        {/* Primary Metric */}
        <div className="text-right">
          <div className="text-3xl font-bold text-yellow-300">
            {getSortValue(sortCriterion)}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Euro className="w-4 h-4 text-green-300" />
            <span className="text-white/80 text-xs font-medium">Revenue</span>
          </div>
          <div className="text-lg font-bold">€{promo.total_revenue.toLocaleString()}</div>
        </div>

        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Users className="w-4 h-4 text-blue-300" />
            <span className="text-white/80 text-xs font-medium">Customers</span>
          </div>
          <div className="text-lg font-bold">{promo.collected_customers}</div>
        </div>

        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-300" />
            <span className="text-white/80 text-xs font-medium">Conversions</span>
          </div>
          <div className="text-lg font-bold">{promo.total_conversion}</div>
        </div>

        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Gift className="w-4 h-4 text-orange-300" />
            <span className="text-white/80 text-xs font-medium">Issued</span>
          </div>
          <div className="text-lg font-bold">{promo.nbr_of_issues}</div>
        </div>
      </div>

      {/* Action Button */}
      {onViewDetails && (
        <button
          onClick={() => onViewDetails(promo)}
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group"
          aria-label={`View details for ${promo.name}`}
        >
          <span>View Promo Details</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      )}
    </div>
  );
};

export default TopPromoCard;