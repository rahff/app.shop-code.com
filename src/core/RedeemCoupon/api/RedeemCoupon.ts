import {CouponData} from '../../ScanQrcode/api/data';
import {TransactionInfo} from './data';
import {CashDrawerApi} from '../spi/CashDrawerApi';
import {CouponPuncher} from "../rules/CouponPuncher.ts";


export type RedeemCoupon = (coupon: CouponData, transaction_infos: TransactionInfo) => Promise<boolean>

export const redeemCouponCreator =
    (cash_drawer_api: CashDrawerApi, coupon_puncher: CouponPuncher) =>
    (coupon: CouponData, transaction_infos: TransactionInfo): Promise<boolean> => {
      const redeem_coupon_data = coupon_puncher(coupon, transaction_infos);
      return cash_drawer_api(redeem_coupon_data);
    }

