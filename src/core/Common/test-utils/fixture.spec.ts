import {CouponData} from '../../ScanQrcode/api/data';
import {PromoData, PromoFormData} from '../../CreatePromo/api/data';
import {ShopData, ShopFormData} from '../../CreateShop/api/data';
import {Authentication} from '../../AuthenticationProvider/api/data';
import {PromoStatisticsState, PromoStats} from '../../PromoStatistics/api/data';
import {UserProfile} from '../../UserSession/api/data';
import {ShopStatisticsState} from '../../ShopStatistics/api/data';
import {image_uri} from '../../UploadImage/api/UploadFile';


export const fake_promo: CouponData = {
  customer_id: "coupon.customer_id",
  coupon_img: "http://localhost:8080/image.jpg",
  name: "Black Friday",
  shop_id: "coupon.shop_id",
  promo_id: "promo_id",
  validity_date_range: {
    start: "2025-05-03",
    end: "2025-05-04"
  }
}

export const fake_redeem_coupon = {
  id: "coupon_id",
  promo_id: "promo_id",
  shop_id: "coupon.shop_id",
  customer_id: "coupon.customer_id",
  scanned_at: "2025-05-03 12:00:00",
  validity_date_start: "2025-05-03",
  validity_date_end: "2025-05-04",
  transaction_amount: 49.99,
  is_customer_new: true
}


export const fake_transaction_info = {
  transaction_amount: fake_redeem_coupon.transaction_amount,
  is_customer_new: fake_redeem_coupon.is_customer_new
};

export const create_promo_with_valid_form_data: PromoFormData = {
  id: "promo_id",
  name: "Black Friday",
  validity_date_start: "2025-05-03",
  validity_date_end: "2025-05-03",
  description: "-50% on all items",
  file_extension: "png"
};
export const user_id = "user_id";
export const form_data_with_invalid_date_range: PromoFormData = {
  ...create_promo_with_valid_form_data,
  validity_date_start: "2025-05-05",
  validity_date_end: "2025-05-03"
};
export const fake_shop_data: ShopData = {
  name: "Quick du Marais",
  account_ref: user_id,
  logo: image_uri("shop_id", "png"),
  id: "shop_id",
  location: "Paris 15eme",
  createdAt: '2025-06-12',
  promoCount: 4
}

export const fake_promo_data: PromoData = {
  id: "promo_id",
  shop_id: fake_shop_data.id,
  created_at: "2025-05-01",
  description: create_promo_with_valid_form_data.description,
  validity_date_end: create_promo_with_valid_form_data.validity_date_end,
  validity_date_start: create_promo_with_valid_form_data.validity_date_start,
  coupon_img: image_uri("promo_id", "png"),
  name: create_promo_with_valid_form_data.name
};

export const signed_url = "http://localhost:8080/s3.signature.upload_authorization";
export const signed_url_wrong = "http://localhost:8080/s3.wrong.upload_authorization";
export const fake_file = new File([], "test.jpg");

export const fake_shop_form_data: ShopFormData = {
  name: fake_shop_data.name,
  location: fake_shop_data.location,
  file_identifier: "shop_id",
  file_extension: "png",
}

export const user_logged_in: Authentication = {user_id: user_id, token: "jwt123_token", role: "Business", account_ref: "account_ref"};
export const user_signed_up: Authentication = {user_id: user_id, token: "jwt123_token", role: null, account_ref: null};


export const accounts_shops: ShopData[] = [{
  account_ref: user_id, id: "shop_id", name: "shop_name",
  location: 'Paris 16ème',
  logo: 'http://localhost:8000/s3.account_ref/shop/logo.png',
  createdAt: "2025-06-12",
  promoCount: 4
}]


export const shop_id = "shop_id";
export const shop_promo_list: PromoData[] = [{
  shop_id,
  id: "promo_id",
  name: "promo_name",
  description: "promo_description",
  coupon_img: image_uri("promo_id", "png"),
  validity_date_start: "promo_start",
  validity_date_end: "promo_end",
  created_at: "promo_created_at"
}];

export const promo_id = "promo_id";

export const fake_promo_statistics: PromoStats = {
  id: "123",
  name: "Promo 1",
  created_at: "2025-04-15",
  shop_id: "shop_id",
  collected_customers: 55,
  nbr_of_issues: 62,
  total_conversion: 60,
  total_revenue: 2100,
  validity_range: {
    start: "2025-04-22",
    end: "2025-04-30",
  }
}

export const fake_user_profile: UserProfile = {
  account_ref: user_id,
  user_name: "rahff@gmail.com",
  role: "Business",
  region: "eu-west-3",
  account_usage: {
    nbr_of_promos: {current: 8, limit: 20},
    nbr_of_shop: {current: 2, limit: 2},
    nbr_of_staff_user: {current: 0, limit: 2}
  },
  config: {
    cognito_endpoint: "http://localhost:8080/cognito.endpoint",
    shop_service_endpoint: "http://localhost:8080/shop.service",
    user_service_endpoint: "http://localhost:8080/user.service",
  }
}

export const fake_user_profile_signup: UserProfile = {
  account_ref: user_id,
  user_name: "rahff@gmail.com",
  role: "Business",
  region: null,
  config: null,
  account_usage: {
    nbr_of_promos: {current: 0, limit: 20},
    nbr_of_shop: {current: 0, limit: 2},
    nbr_of_staff_user: {current: 0, limit: 2}
  }
}


export const fake_promo_stats_state: PromoStatisticsState = {
  promo_stats: {
    nbr_of_page: 1,
    data: [{...fake_promo_statistics}],
    page: 1,
    per_page: 1
  },
  error: null
}

export const fake_shop_stats: ShopStatisticsState = {
  name: "Quick de la Violette",
  collected_customers: 789,
  collected_revenue: 8560,
  conversion_rate: 94,
  nbr_of_promo: 12
}

export const fake_shop_statistics: ShopStatisticsState = {
  name: "Quick",
  nbr_of_promo: 22,
  conversion_rate: 95,
  collected_revenue: 1589,
  collected_customers: 124
}


export const fake_cashier_data = {username: "test", id: "cashier_id"};
export const fake_cashier_credentials = {username: "test", password: "123456"}
