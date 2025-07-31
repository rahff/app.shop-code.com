import {PromoStatisticApi} from '../spi/PromoStatisticApi';
import {PromoStatisticsState, StatsPage} from './data';

import {Exception, isException} from '../../Common/api/Exception';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';


export const promo_statistic_initial_state: PromoStatisticsState = {
  promo_stats: {
    data: [],
    last_evaluated_key: undefined
  },
  error: null,
}

const errorState = (exception: Exception): PromoStatisticsState =>
    ({...promo_statistic_initial_state, error: {message: exception.message}});

const promoStatisticsState = (promoStats: StatsPage): PromoStatisticsState => ({promo_stats: {data: promoStats.data, last_evaluated_key: promoStats.last_evaluated_key}, error: null})

export type GetPromoStatistics = (shopId: string, lastEvaluatedKey?: { primary_key: string; sort_key: string }) => Promise<PromoStatisticsState>;

const handleResponse = (localStorage: LocalStorageApi, shopId: string) => (response: StatsPage | Exception) => {
  if(isException(response)) return errorState(response);
  else {
    localStorage.set_item(shopId, response);
    return promoStatisticsState(response);
  }
}

const handleLoadMoreResponse = (localStorage: LocalStorageApi, shopId: string) => (response: StatsPage | Exception) => {
    if(isException(response)) return errorState(response);
    else {
        const statsPage = localStorage.get_item<StatsPage>(shopId);
        if(statsPage) {
            const newStatsPage = {...statsPage, data: statsPage.data.concat(response.data), last_evaluated_key: response.last_evaluated_key};
            localStorage.set_item(shopId, newStatsPage);
            return promoStatisticsState(newStatsPage);
        }
        return promoStatisticsState(response);
    }
}

export const getPromoStatisticsCreator =
    (promoStatisticApi: PromoStatisticApi, localStorage: LocalStorageApi): GetPromoStatistics =>
    async (shopId: string, lastEvaluatedKey?: { primary_key: string; sort_key: string }): Promise<PromoStatisticsState> => {
      if(!!lastEvaluatedKey) {
          return promoStatisticApi(shopId, lastEvaluatedKey).then(handleLoadMoreResponse(localStorage, shopId))
      }
      const localData = localStorage.get_item<StatsPage>(shopId);
      if(localData === null) {
        return promoStatisticApi(shopId, lastEvaluatedKey).then(handleResponse(localStorage, shopId));
      }else return promoStatisticsState(localData);
    }

