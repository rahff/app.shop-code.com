export interface PromoStats {
  id: string,
  shop_id: string,
  name: string,
  created_at: string,
  validity_range: DateRange,
  nbr_of_issues: number,
  total_conversion: number,
  total_revenue: number,
  collected_customers: number
}

export interface DateRange {
  start: string,
  end: string
}



export interface StatsPage {
  page: number;
  data: PromoStats[];
  per_page: number;
  nbr_of_page: number;
}

export interface PromoStatisticsState {
  promo_stats: StatsPage,
  error: {message: string} | null;
}

