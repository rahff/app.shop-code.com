import {PromoStatisticApi} from '../spi/PromoStatisticApi';
import {PromoStatisticsState, StatsPage} from './data';

import {Exception, isException} from '../../Common/api/Exception';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {STATS_PAGE} from '../../Common/constants';



export const promo_statistic_initial_state: PromoStatisticsState = {
  promo_stats: {
    data: [],
    per_page: 0,
    last_evaluated_key: undefined
  },
  error: null,
}

const errorState = (exception: Exception): PromoStatisticsState =>
    ({...promo_statistic_initial_state, error: {message: exception.message}});

const promoStatisticsState = (promoStatsPage: StatsPage): PromoStatisticsState => ({promo_stats: promoStatsPage, error: null})

export type GetPromoStatistics = (shopId: string, lastEvaluatedKey?: { primary_key: string; sort_key: string }) => Promise<PromoStatisticsState>;

const handleResponse = (localStorage: LocalStorageApi, shopId: string, cacheKey: string) => (response: StatsPage | Exception) => {
  if(isException(response)) return errorState(response);
  else {
    localStorage.set_item(cacheKey, {...response});
    return promoStatisticsState(response);
  }
}

export const getPromoStatisticsCreator =
    (promoStatisticApi: PromoStatisticApi, localStorage: LocalStorageApi): GetPromoStatistics =>
    async (shopId: string, lastEvaluatedKey?: { primary_key: string; sort_key: string }): Promise<PromoStatisticsState> => {
      const cacheKey = lastEvaluatedKey 
        ? `${shopId}_stats_${lastEvaluatedKey.primary_key}_${lastEvaluatedKey.sort_key}`
        : `${shopId}_stats_initial`;
      
      const localData = localStorage.get_item<StatsPage>(cacheKey);
      if(localData === null) {
        return promoStatisticApi(shopId, lastEvaluatedKey).then(handleResponse(localStorage, shopId, cacheKey));
      }else return promoStatisticsState(localData);
    }

