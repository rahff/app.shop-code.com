import {Observable} from 'rxjs';
import {ShopData} from '../api/data';



export interface ShopApi {
  save_shop(shop_data: ShopData): Observable<ShopData>;
}
