import {RedeemCouponData} from '../api/data';



export type CashDrawerApi = (redeemed_coupon: RedeemCouponData) => Promise<boolean>;

