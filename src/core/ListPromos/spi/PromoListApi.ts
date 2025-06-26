import {Observable} from 'rxjs';
import {PromoData} from '../../CreatePromo/api/data';

export interface PromoListApi {
  get_shop_promos(shop_id: string): Observable<PromoData[]>;
}
