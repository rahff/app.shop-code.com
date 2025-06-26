export interface TransactionInfo {
  transaction_amount: number;
  is_customer_new: boolean
}


export interface RedeemCouponData {
  id: string,
  promo_id: string,
  shop_id: string,
  customer_id: string,
  scanned_at: string, // DateTime format YYYY-MM-DD HH:MM:SS
  validity_date_start: string, // Date format YYYY-MM-DD
  validity_date_end: string, // Date format YYYY-MM-DD
  transaction_amount: number,
  is_customer_new: boolean,
}
