import {PromoData} from "../../core/CreatePromo/api/data.ts";
import {authorizationHeaders, fakeGetListFetch, Fetch, handleResponse} from "../common.ts";
import {shop_promo_list} from "../../core/Common/test-utils/fixture.spec.ts";
import {environment} from "../../environment.ts";
import {Exception} from "../../core/Common/api/Exception.ts";


export const promo_list_initial_state = {promos: [], error: null};


export const _getPromoListApiCreator =
  (fetch: Fetch) =>
  (endpoint: string, token: string) =>
  async (): Promise<PromoData[] |  Exception> => {
    return fetch(`${endpoint}/promos`, {headers: authorizationHeaders(token)})
        .then(handleResponse<PromoData[]>)
}


export const getPromoListApiCreator =
    environment === "production" ?
    _getPromoListApiCreator(fetch) :
    _getPromoListApiCreator(fakeGetListFetch([...shop_promo_list]));
