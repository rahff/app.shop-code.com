import {fake_promo, fake_redeem_coupon, fake_transaction_info} from '../../Common/test-utils/fixture.spec';
import {RedeemCoupon} from './RedeemCoupon';
import {Observable, of} from 'rxjs';
import {CashDrawerApi} from '../spi/CashDrawerApi';
import {DateTimeProvider} from '../spi/DateTimeProvider';
import {IdGenerator} from '../../Common/spi/IdGenerator';
import SpyObj = jasmine.SpyObj;
import {CouponPuncher} from '../rules/CouponPuncher';
import {RedeemCouponData} from './data';



describe("A Cashier redeems a coupon", () => {
  let cash_drawer_api: FakeCashDrawer;
  let date_time_provider: SpyObj<DateTimeProvider>;
  let id_generator: SpyObj<IdGenerator>;
  let coupon_puncher: CouponPuncher;

  const the_cashier_punches_the_coupon = () => {
    date_time_provider.now.and.returnValue(new Date("2025-05-03T12:00:00Z"));
    id_generator.generate.and.returnValue(fake_redeem_coupon.id);
  }
  const the_redeemed_coupon_leaves_in_the_cash_drawer = (ok: boolean) => {
    expect(ok).toBeTrue();
    expect(cash_drawer_api.drawer).toContain(fake_redeem_coupon)
  }

  beforeEach(() => {
    cash_drawer_api = new FakeCashDrawer();
    date_time_provider = jasmine.createSpyObj("FakeDateTimeProvider", ["now"]);
    id_generator = jasmine.createSpyObj("FakeIdGenerator", ["generate"]);
    coupon_puncher = new CouponPuncher(date_time_provider, id_generator);
  })

  it("The cashier note transaction's relevant infos on the coupon", () => {
    the_cashier_punches_the_coupon();
    const redeem_coupon = new RedeemCoupon(cash_drawer_api, coupon_puncher);
    const result = redeem_coupon.redeem(fake_promo, fake_transaction_info);
    result.subscribe(the_redeemed_coupon_leaves_in_the_cash_drawer);
  })
})


class FakeCashDrawer implements CashDrawerApi {
  public drawer: RedeemCouponData[] = [];
  public store_coupon(redeemed_coupon: RedeemCouponData): Observable<boolean> {
    this.drawer.push(redeemed_coupon);
    return of(true);
  }
}
