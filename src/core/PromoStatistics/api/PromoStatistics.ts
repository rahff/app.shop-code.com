import {PromoStatisticApi} from '../spi/PromoStatisticApi';
import {PromoStatisticsState, StatsPage} from './data';
import {catchError, first, map, Observable, of} from 'rxjs';
import {Exception} from '../../Common/api/Exception';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {SELECTED_SHOP_KEY, STATS_PAGE} from '../../Common/constants';
import {ShopData} from '../../CreateShop/api/data';


export const promo_statistic_initial_state: PromoStatisticsState = {
  promo_stats: {
    page: 1,
    data: [],
    per_page: 0,
    nbr_of_page: 1
  },
  error: null,
}

export class PromoStatistics {

  public state: PromoStatisticsState = {...promo_statistic_initial_state};
  private local_memory_register: string[] = [];

  public constructor(private promo_statistic_api: PromoStatisticApi, private local_storage: LocalStorageApi) {}

  public get_promo_statistics(page: number = 1): Observable<boolean> {
    const {id} = this.local_storage.get_item<ShopData>(SELECTED_SHOP_KEY)!;
    const local_data = this.local_storage.get_item<StatsPage>(STATS_PAGE(id, page));
    if(local_data && this.local_memory_register.includes(STATS_PAGE(id, page))) return of(true);
    return this.promo_statistic_api.get_promo_statistics(id, page)
      .pipe(first(),
        map(this.set_state(id, page)),
        catchError(this.handle_error.bind(this))
      );
  }

  private set_state(id: string, page: number) {
    return (state: PromoStatisticsState) => {
      this.local_storage.set_item(STATS_PAGE(id, page), {...state.promo_stats})
      this.state = {...state};
      this.local_memory_register.push(STATS_PAGE(id, page));
      return true;
    }
  }

  private handle_error(error: Exception): Observable<boolean> {
    this.state.error = {message: error.message}
    return of(false);
  }
}
