import {ShopData} from "../../core/CreateShop/api/data.ts";
import {fakePostFetch, Fetch, handleResponse, requestPostConfig} from "../common.ts";
import {environment} from "../../environment.ts";
import {Exception} from "../../core/Common/api/Exception.ts";
import {CreateShopApi} from "../../core/CreateShop/spi/CreateShopApi.ts";



export const createShopApiCreator =
  (fetch: Fetch) =>
  (endpoint: string, token: string): CreateShopApi =>
    async (shopData: ShopData): Promise<ShopData | Exception> => {
      return fetch(`${endpoint}/shop`, requestPostConfig(shopData, token))
          .then(handleResponse<ShopData>)
}




export const createShopApi = environment === "production" ?
  createShopApiCreator(fetch) :
  createShopApiCreator(fakePostFetch(null));
