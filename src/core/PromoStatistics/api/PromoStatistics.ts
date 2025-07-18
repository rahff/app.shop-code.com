import {PromoStatisticApi} from '../spi/PromoStatisticApi';
import {PromoStatisticsState, StatsPage} from './data';

import {Exception, isException} from '../../Common/api/Exception';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {STATS_PAGE} from '../../Common/constants';



export const promo_statistic_initial_state: PromoStatisticsState = {
  promo_stats: {
    page: 1,
    data: [],
    per_page: 0,
    nbr_of_page: 1
  },
  error: null,
}

const errorState = (exception: Exception): PromoStatisticsState =>
    ({...promo_statistic_initial_state, error: {message: exception.message}});

const promoStatisticsState = (promoStatsPage: StatsPage): PromoStatisticsState => ({promo_stats: promoStatsPage, error: null})

export type GetPromoStatistics = (shopId: string, page?: number) => Promise<PromoStatisticsState>;

const handleResponse = (localStorage: LocalStorageApi, shopId: string, page: number) => (response: StatsPage | Exception) => {
  if(isException(response)) return errorState(response);
  else {
    localStorage.set_item(STATS_PAGE(shopId, page), {...response})
    return promoStatisticsState(response);
  }
}

export const getPromoStatisticsCreator =
    (promoStatisticApi: PromoStatisticApi, localStorage: LocalStorageApi): GetPromoStatistics =>
    async (shopId: string, page: number = 1): Promise<PromoStatisticsState> => {
      const localData = localStorage.get_item<StatsPage>(STATS_PAGE(shopId, page));
      if(localData === null) {
        return promoStatisticApi(shopId, page).then(handleResponse(localStorage, shopId, page));
      }else return promoStatisticsState(localData);
    }

