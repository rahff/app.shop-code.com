import {err, ok, Result} from '../../Common/api/CommonTypes';
import {Coupon} from '../../Model/Coupon';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {DateProvider} from '../../Common/spi/DateProvider';
import {Exception, NotRecognized, PromoExpired, PromoNotYetStarted, WrongShop} from '../../Common/api/Exception';
import {CouponData} from '../api/data';
import {SELECTED_SHOP_KEY} from '../../Common/constants';



export class QrcodeVerifier {
  public constructor(private local_storage: LocalStorageApi,
                     private date_provider: DateProvider) {}


  public verify(qrcode_data: string): Result<CouponData> {
    try {
      const coupon: Coupon = Coupon.from_json(qrcode_data);
      const shop_id = this.local_storage.get_item<string>(SELECTED_SHOP_KEY);
      const today = this.date_provider.today().getTime();
      return this.check_coupon_validity(coupon, today, shop_id!);
    }catch (_: any) {
      return err(new NotRecognized());
    }
  }

  private check_coupon_validity(coupon: Coupon, today: number, shop_id: string): Result {
    if(coupon.not_belong_to_the_shop(shop_id)) return err(new WrongShop());
    if(coupon.is_expired(today)) return err(new PromoExpired());
    if(coupon.is_not_started_yet(today)) return err(new PromoNotYetStarted());
    return ok(coupon.its_data());
  }
}
