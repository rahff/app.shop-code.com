export interface ShopData {
  id: string;
  account_ref: string;
  name: string;
  location: string;
  logo: string;
  createdAt: string;
  promoCount: number;
}

export interface ShopFormData {
  name: string;
  location: string;
  file_extension: string;
  file_identifier: string;
}
