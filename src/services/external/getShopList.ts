import {ShopData} from "../../core/CreateShop/api/data.ts";
import {SHOP_LIST_KEY} from "../../core/Common/constants.ts";
import {authorizationHeaders, Fetch} from "../common.ts";
import {environment} from "../../environment.ts";
import {accounts_shops} from "../../core/Common/test-utils/fixture.spec.ts";




export interface ShopListState {
  shops: ShopData[];
  error: { message: string } | null;
}

export const shop_list_initial_state: ShopListState = {shops: [], error: null};

export const getShopListCreator =
  (fetch: Fetch) =>
  (endpoint: string, token: string) =>
  async (): Promise<ShopListState> => {
    const local_shop_list = sessionStorage.getItem(SHOP_LIST_KEY);
    if(local_shop_list === null) {
      try {
        const response = await fetch(`${endpoint}/shop`, {headers: authorizationHeaders(token)});
        const data = await response.json() as ShopListState;
        sessionStorage.setItem(SHOP_LIST_KEY, JSON.stringify(data));
        return data;
      }catch (error: any) {
        return {
          shops: [],
          error: error.message,
        }
      }
    }else return JSON.parse(local_shop_list) as  ShopListState;
}

const fakeFetch: Fetch = () => {
  const state: ShopListState = {
    shops: [...accounts_shops],
    error: null
  }
  const response: Response = new Response(JSON.stringify(state))
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(response)
    },500)
  })
}

export const getShopList = environment === "production" ? getShopListCreator(fetch) : getShopListCreator(fakeFetch);
