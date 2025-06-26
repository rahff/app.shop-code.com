import {PromoData} from '../api/data';
import {Observable} from 'rxjs';

export interface PromoApi {
  save_promo(promo_data: PromoData): Observable<PromoData>;
}
