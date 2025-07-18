import {DateTimeProvider} from '../spi/DateTimeProvider';
import {IdGenerator} from '../../Common/spi/IdGenerator';
import {CouponData} from '../../ScanQrcode/api/data';
import {RedeemCouponData, TransactionInfo} from '../api/data';

export type CouponPuncher = (coupon: CouponData, transaction_infos: TransactionInfo) => RedeemCouponData;

const format_date_time = (date: Date): string => {
    const [day, time] = date.toISOString().split('T');
    return `${day} ${time.slice(0, 8)}`; // "YYYY-MM-DD HH:mm:ss"
}
export const punch_couponCreator = ( date_time_provider: DateTimeProvider, id_generator: IdGenerator) =>
    (coupon: CouponData, transaction_infos: TransactionInfo): RedeemCouponData => {
      const scanned_at: string = format_date_time(date_time_provider.now());
      const id: string = id_generator.generate();
      return {
        id,
        promo_id: coupon.promo_id,
        shop_id: coupon.shop_id,
        customer_id: coupon.customer_id,
        scanned_at,
        validity_date_start: coupon.validity_date_range.start,
        validity_date_end: coupon.validity_date_range.end,
        transaction_amount: transaction_infos.transaction_amount,
        is_customer_new: transaction_infos.is_customer_new,
      }

}


