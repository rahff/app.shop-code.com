import {Observable} from 'rxjs';
import {PromoStatisticsState} from '../api/data';


export interface PromoStatisticApi {
  get_promo_statistics(shop_id: string, page: number): Observable<PromoStatisticsState>;
}
