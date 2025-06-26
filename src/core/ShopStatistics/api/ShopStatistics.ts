import {ShopStatisticApi} from '../spi/ShopStatisticApi';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {first, map, Observable, of} from 'rxjs';
import {ShopStatisticsState} from './data';
import {SELECTED_SHOP_KEY} from '../../Common/constants';
import {ShopData} from '../../CreateShop/api/data';



export const shop_stats_key = (shop_id: string): string => `shop_stats_${shop_id}`;

export class ShopStatistics {

  public state: ShopStatisticsState | null = null
  public constructor(private statistic_api: ShopStatisticApi,
                     private local_storage: LocalStorageApi) {}

  public shop_stats(): Observable<boolean> {
    const {id} = this.local_storage.get_item<ShopData>(SELECTED_SHOP_KEY)!
    if(this.state) return of(true);
    return this.statistic_api.get_shop_statistics(id)
      .pipe(first(),
        map(this.set_state(id).bind(this)))
  }

  private set_state(shop_id: string): (state: ShopStatisticsState) => boolean {
     return (state: ShopStatisticsState) => {
       this.local_storage.set_item(shop_stats_key(shop_id), state)
       this.state = state;
       return true;
     }
  }
}
