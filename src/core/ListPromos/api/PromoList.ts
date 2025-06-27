import {PromoListApi} from '../spi/PromoListApi';
import {catchError, first, map, Observable, of} from 'rxjs';
import {PromoData} from '../../CreatePromo/api/data';
import {Exception} from '../../Common/api/Exception';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';


export const promo_list_key = (shop_id: string): string => `promo_list_${shop_id}`;
export interface PromoListState {
  promos: PromoData[];
  error: { message: string } | null;
}

const promo_list_initial_state = {promos: [], error: null};

export class PromoList {

  public state: PromoListState = {...promo_list_initial_state};

  public constructor(private promo_gateway: PromoListApi, private local_storage_api: LocalStorageApi) {}

  public promo_of_shop(shopId: string): Observable<boolean> {
    const local_promo_list = this.local_storage_api.get_item<PromoData[]>(promo_list_key(shopId));
    if(local_promo_list) {
      this.state.promos = local_promo_list;
      return of(true);
    }
    return this.promo_gateway.get_shop_promos(shopId).pipe(
        first(),
        map((promos) => this.set_state(promos, shopId)),
        catchError(this.handle_error.bind(this))
    );
  }

  private set_state(promos: PromoData[], shop_id: string): boolean {
    this.local_storage_api.set_item(promo_list_key(shop_id), promos);
    this.state.promos = promos;
    return true;
  }

  private handle_error(error: Exception) {
    this.state.error = {message: error.message};
    return of(false);
  }
}
