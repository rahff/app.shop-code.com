export interface PromoData {
   shop_id: string,
   id: string,
   name: string,
   description: string,
   coupon_img: string,
   validity_date_start: string,
   validity_date_end: string,
   created_at: string,
}

export interface PromoFormData {
  id: string
  name: string,
  description: string,
  validity_date_start: string,
  validity_date_end: string,
  file_extension: string,
}
