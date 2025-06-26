import {ShopStatisticsState} from '../api/data';
import {Observable} from 'rxjs';

export interface ShopStatisticApi {
  get_shop_statistics(shop_id: string): Observable<ShopStatisticsState>
}
