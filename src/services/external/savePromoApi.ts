import {PromoData} from "../../core/CreatePromo/api/data.ts";
import {fakePostFetch, Fetch, handleResponse, HttpService, requestPostConfig} from "../common.ts";
import {SavePromoApi} from "../../core/CreatePromo/spi/PromoApi.ts";
import {Exception} from "../../core/Common/api/Exception.ts";
import {environment} from "../../environment.ts";


export const _savePromoApiCreator: HttpService<SavePromoApi> =
    (fetch: Fetch) =>
    (endpoint: string, token: string): SavePromoApi =>
    async (promoData: PromoData): Promise<PromoData | Exception> => {
        return fetch(endpoint, requestPostConfig(promoData, token))
            .then(handleResponse<PromoData>)
    }

export const savePromoApiCreator =
    environment === "production" ?
    _savePromoApiCreator(fetch) :
    _savePromoApiCreator(fakePostFetch(null));