export interface CouponData {
  name: string,
  customer_id: string,
  shop_id: string,
  promo_id: string
  coupon_img: string,
  validity_date_range: DateRange
}

// Date format YYYY-MM-DD
export interface DateRange {
  start: string,
  end: string
}
