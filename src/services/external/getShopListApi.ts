import {ShopData} from "../../core/CreateShop/api/data.ts";
import {authorizationHeaders, fakeGetListFetch, Fetch, handleResponse} from "../common.ts";
import {environment} from "../../environment.ts";
import {accounts_shops} from "../../core/Common/test-utils/fixture.spec.ts";
import {Exception} from "../../core/Common/api/Exception.ts";
import {ShopListState} from "../../core/ListShops/api/ShopList.ts";
import {ShopListApi} from "../../core/ListShops/spi/ShopListApi.ts";



export const shop_list_initial_state: ShopListState = {shops: [], error: null};

export const _shopListApiCreator =
  (fetch: Fetch) =>
  (endpoint: string, token: string): ShopListApi =>
  async (): Promise<ShopData[] | Exception> => {
    return fetch(endpoint, {headers: authorizationHeaders(token)})
        .then(handleResponse<ShopData[]>)
}


export const shopListApiCreator = environment === "production" ?
    _shopListApiCreator(fetch) :
    _shopListApiCreator(fakeGetListFetch([...accounts_shops]));
