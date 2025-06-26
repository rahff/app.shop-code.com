import {Observable} from 'rxjs';
import {RedeemCouponData} from '../api/data';



export interface CashDrawerApi {
  store_coupon(redeemed_coupon: RedeemCouponData): Observable<boolean>;
}
