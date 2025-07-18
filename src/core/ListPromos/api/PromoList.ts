import {PromoListApi} from '../spi/PromoListApi';
import {PromoData} from '../../CreatePromo/api/data';
import {Exception, isException} from '../../Common/api/Exception';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';


export const promo_list_key = (shop_id: string): string => `promo_list_${shop_id}`;

export interface PromoListState {
  promos: PromoData[];
  error: { message: string } | null;
}


export type GetPromoList = (shopId: string) => Promise<PromoListState>

const errorState = (response: Exception) => ({
  promos: [],
  error: {message: response.message}
})

const promoListState = (response: PromoData[]) => ({
  promos: response,
  error: null
})

const handleResponse = (localStorage: LocalStorageApi, shopId: string) => (response: PromoData[] | Exception) => {
  if(isException(response)) return errorState(response);
  else {
    localStorage.set_item(promo_list_key(shopId), response);
    return promoListState(response);
  }
}

export const getPromoListCreator =
    (promoListApi: PromoListApi, localStorage: LocalStorageApi): GetPromoList =>
    async (shopId: string): Promise<PromoListState> => {
      const localData = localStorage.get_item<PromoData[]>(promo_list_key(shopId));
      if(localData === null) {
        return promoListApi(shopId).then(handleResponse(localStorage, shopId));
      }else return {
        promos: localData,
        error: null
      }
    }
