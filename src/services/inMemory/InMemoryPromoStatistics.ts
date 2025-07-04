import {PromoStatisticApi} from "../../core/PromoStatistics/spi/PromoStatisticApi.ts";
import {Observable} from "rxjs";
import {PromoStatisticsState} from "../../core/PromoStatistics/api/data.ts";
import {fake_promo_stats_state} from "../../core/Common/test-utils/fixture.spec.ts";

export class InMemoryPromoStatistics implements PromoStatisticApi {

    public get_promo_statistics(shop_id: string, page: number): Observable<PromoStatisticsState> {
        console.log(shop_id, page);
        return new Observable(observer => {
            setTimeout(() => {
                observer.next({...fake_promo_stats_state});
            }, 500);
        });
    }
}

export const inMemoryPromoStatistics = new InMemoryPromoStatistics();