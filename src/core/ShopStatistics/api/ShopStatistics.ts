import {GetShopStatisticApi} from '../spi/GetShopStatisticApi.ts';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {ShopStatistics} from './data';
import {Exception, isException} from "../../Common/api/Exception.ts";



export interface ShopStatisticsState {
  shopStats: ShopStatistics | null;
  error: {message: string} | null;
}

export const shopStatisticsInitialState: ShopStatisticsState = {
  shopStats: null,
  error: null,
}

export type GetShopStatistics = (shopId: string) => Promise<ShopStatisticsState>;

export const shop_stats_key =
    (shop_id: string): string => `shop_stats_${shop_id}`;

const shopStatisticsState =
    (data: ShopStatistics): ShopStatisticsState => ({shopStats: data, error: null});

const errorState =
    (exception: Exception): ShopStatisticsState => ({shopStats: null, error: {message: exception.message}});

const handleResponse =
    (localStorage: LocalStorageApi, shopId: string) =>
    (response: ShopStatistics | Exception) => {
      if(isException(response)) return errorState(response);
      else {
        localStorage.set_item<ShopStatistics>(shop_stats_key(shopId), response);
        return shopStatisticsState(response);
      }
}
export const getShopStatisticsCreator =
    (getShopStatisticApi: GetShopStatisticApi, localStorage: LocalStorageApi): GetShopStatistics =>
    async (shopId: string) => {
      const localData = localStorage.get_item<ShopStatistics>(shop_stats_key(shopId));
      if(localData === null) {
        return getShopStatisticApi(shopId).then(handleResponse(localStorage, shopId));
      }else return shopStatisticsState(localData)
    }


