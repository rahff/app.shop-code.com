import {Observable} from 'rxjs';
import {ShopData} from '../../CreateShop/api/data';

export interface ShopListApi {
  get_account_shops(account_ref: string): Observable<ShopData[]>;
}
