import {ShopData} from "../../core/CreateShop/api/data.ts";
import {SHOP_LIST_KEY} from "../../core/Common/constants.ts";
import {authorizationHeaders, Fetch} from "../common.ts";
import {environment} from "../../environment.ts";
import {accounts_shops} from "../../core/Common/test-utils/fixture.spec.ts";
import {LocalStorageApi} from "../../core/Common/spi/LocalStorageApi.ts";
import {sessionStorageBrowserApi} from "../browser/SessionStorageBrowserApi.ts";




export interface ShopListState {
  shops: ShopData[];
  error: { message: string } | null;
}

export const shop_list_initial_state: ShopListState = {shops: [], error: null};

export const getShopListCreator =
  (fetch: Fetch, sessionStorage: LocalStorageApi) =>
  (endpoint: string, token: string) =>
  async (): Promise<ShopListState> => {
    const local_shop_list = sessionStorage.get_item<ShopData[]>(SHOP_LIST_KEY);
    if(local_shop_list === null) {
      try {
        const response = await fetch(`${endpoint}/shop`, {headers: authorizationHeaders(token)});
        const data = await response.json() as ShopData[];
        sessionStorage.set_item<ShopData[]>(SHOP_LIST_KEY, data);
        return {
          shops: data,
          error: null
        };
      }catch (error: any) {
        return {
          shops: [],
          error: error.message,
        }
      }
    }else return {shops: local_shop_list, error: null};
}

const fakeFetch: Fetch = () => {

  const response: Response = new Response(JSON.stringify([...accounts_shops]))
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(response)
    },500)
  })
}

export const getShopList = environment === "production" ?
    getShopListCreator(fetch, sessionStorageBrowserApi) :
    getShopListCreator(fakeFetch, sessionStorageBrowserApi);
