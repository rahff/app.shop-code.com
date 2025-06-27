import {Observable} from 'rxjs';
import {ShopStatisticApi} from "../../core/ShopStatistics/spi/ShopStatisticApi.ts";
import {ShopStatisticsState} from "../../core/ShopStatistics/api/data.ts";
import {fake_shop_statistics} from "../../core/Common/test-utils/fixture.spec.ts";




export class HttpShopStatisticApi implements ShopStatisticApi {

  public constructor() {}

  public get_shop_statistics(shop_id: string): Observable<ShopStatisticsState> {
    console.log(shop_id);
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next({...fake_shop_statistics});
        subscriber.complete();
      }, 200)
    });
  }
}
