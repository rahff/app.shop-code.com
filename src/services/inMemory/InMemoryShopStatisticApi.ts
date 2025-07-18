import {Observable} from 'rxjs';
import {GetShopStatisticApi} from "../../core/ShopStatistics/spi/GetShopStatisticApi.ts";
import {ShopStatistics} from "../../core/ShopStatistics/api/data.ts";
import {fake_shop_statistics} from "../../core/Common/test-utils/fixture.spec.ts";




export class InMemoryShopStatisticApi implements GetShopStatisticApi {

  public constructor() {}

  public get_shop_statistics(shop_id: string): Observable<ShopStatistics> {
    console.log(shop_id);
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next({...fake_shop_statistics});
        subscriber.complete();
      }, 200)
    });
  }
}


export const inMemoryShopStatisticApi = new InMemoryShopStatisticApi();