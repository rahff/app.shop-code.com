import {catchError, first, map, Observable, of} from 'rxjs';
import {ShopListApi} from '../spi/ShopListApi';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {ShopData} from '../../CreateShop/api/data';
import {SHOP_LIST_KEY} from '../../Common/constants';
import {Exception} from '../../Common/api/Exception';


export interface ShopListState {
  shops: ShopData[];
  error: { message: string } | null;
}

const shop_list_initial_state: ShopListState = {shops: [], error: null};

export class ShopList {

  public state: ShopListState = {...shop_list_initial_state};
  public constructor(private shop_list_api: ShopListApi, private local_storage: LocalStorageApi) {}

  public shops(user_id: string): Observable<boolean> {
    const local_shop_list = this.local_storage.get_item<ShopData[]>(SHOP_LIST_KEY);
    if(local_shop_list) {
      this.state.shops = local_shop_list;
      return of(true);
    }
    return this.shop_list_api.get_account_shops(user_id)
      .pipe(
        first(),
        map(this.set_state.bind(this)),
        catchError(this.handle_error.bind(this))
      );
  }

  private set_state(shops: ShopData[]): boolean {
    this.local_storage.set_item(SHOP_LIST_KEY, shops);
    this.state.shops = shops;
    return true;
  }

  private handle_error(error: Exception) {
    this.state.error = {message: error.message};
    return of(false);
  }
}
