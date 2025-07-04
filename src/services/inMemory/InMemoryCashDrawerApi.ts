import {CashDrawerApi} from "../../core/RedeemCoupon/spi/CashDrawerApi.ts";
import {RedeemCouponData} from "../../core/RedeemCoupon/api/data.ts";
import {Observable} from "rxjs";

export class InMemoryCashDrawerApi implements CashDrawerApi {

    public store_coupon(redeemed_coupon: RedeemCouponData): Observable<boolean> {
        return new Observable(observer => {
            setTimeout(() => {
                console.log(redeemed_coupon);
                observer.next(true);
                observer.complete();
            }, 500);
        });
    }
}

export const inMemoryCashDrawerApi = new InMemoryCashDrawerApi();