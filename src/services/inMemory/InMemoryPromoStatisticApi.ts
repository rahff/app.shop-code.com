import {PromoStatisticApi} from "../../core/PromoStatistics/spi/PromoStatisticApi.ts";
import {Observable} from "rxjs";
import {PromoStatisticsState} from "../../core/PromoStatistics/api/data.ts";
import {fake_promo_stats_state} from "../../core/Common/test-utils/fixture.spec.ts";


export class InMemoryPromoStatisticApi implements PromoStatisticApi {

  public constructor() {}

  public get_promo_statistics(shop_id: string, page: number): Observable<PromoStatisticsState> {
    console.log(shop_id, page)
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next({...fake_promo_stats_state});
        subscriber.complete();
      }, 200)
    })
  }
}


export const inMemoryPromoStatisticApi = new InMemoryPromoStatisticApi();