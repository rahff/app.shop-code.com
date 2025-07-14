import {PromoData} from "../../core/CreatePromo/api/data.ts";
import {authorizationHeaders, Fetch} from "../common.ts";
import {shop_promo_list} from "../../core/Common/test-utils/fixture.spec.ts";

import {environment} from "../../environment.ts";
import {LocalStorageApi} from "../../core/Common/spi/LocalStorageApi.ts";
import {sessionStorageBrowserApi} from "../browser/SessionStorageBrowserApi.ts";


export const promo_list_key = (shop_id: string): string => `promo_list_${shop_id}`;
export interface PromoListState {
  promos: PromoData[];
  error: { message: string } | null;
}

export const promo_list_initial_state = {promos: [], error: null};

export const getPromoListCreator =
  (fetch: Fetch, sessionStorage: LocalStorageApi)=>
  (endpoint: string, shopId: string, token: string) =>
  async  (): Promise<PromoListState> => {
  const localData = sessionStorage.get_item<PromoListState>(promo_list_key(shopId));
    if (localData === null) {
      try {
        const response = await fetch(endpoint, {headers: authorizationHeaders(token)});
        const data =  await response.json() as PromoListState;
        sessionStorage.set_item(promo_list_key(shopId), JSON.stringify(data));
        return data;
      }catch (error: any) {
        return {
          promos: [],
          error: error.message,
        }
      }
    }else return localData as PromoListState;
}

const fakeFetch: Fetch = () => {
  const state: PromoListState = {
    promos: [...shop_promo_list],
    error: null
  }
  const response: Response = new Response(JSON.stringify(state))
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(response)
    },500)
  })
}


export const getPromoList = environment === "production" ?
    getPromoListCreator(fetch, sessionStorageBrowserApi) :
    getPromoListCreator(fakeFetch, sessionStorageBrowserApi);
