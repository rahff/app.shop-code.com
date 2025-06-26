export interface PromoFormData {
  id: string;
  name: string;
  description: string;
  validity_date_start: string;
  validity_date_end: string;
  file_extension: string;
}

export interface ShopStatisticsState {
  name: string;
  convertion_rate: number;
  collected_customers: number;
  collected_revenue: number;
  nbr_of_promo: number;
}

export interface PromoStats {
  id: string;
  shop_id: string;
  name: string;
  created_at: string;
  validity_range: { start: string; end: string };
  nbr_of_issues: number;
  total_conversion: number;
  total_revenue: number;
  collected_customers: number;
}

export interface StatsPage {
  page: number;
  data: PromoStats[];
  per_page: number;
  nbr_of_page: number;
}