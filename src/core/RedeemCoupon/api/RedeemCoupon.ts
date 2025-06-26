import {CouponData} from '../../ScanQrcode/api/data';
import {TransactionInfo} from './data';
import {Observable} from 'rxjs';
import {CashDrawerApi} from '../spi/CashDrawerApi';
import {CouponPuncher} from '../rules/CouponPuncher';



export class RedeemCoupon {

  public constructor(private cash_drawer_api: CashDrawerApi,
                     private coupon_puncher: CouponPuncher) {}

  public redeem(coupon: CouponData, transaction_infos: TransactionInfo): Observable<boolean> {
    const redeem_coupon_data = this.coupon_puncher.punch_coupon(coupon, transaction_infos);
    return this.cash_drawer_api.store_coupon(redeem_coupon_data);
  }
}

