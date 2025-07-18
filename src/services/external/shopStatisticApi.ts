import {authorizationHeaders, fakeGetFetch, Fetch, handleResponse, HttpService} from "../common.ts";
import {GetShopStatisticApi} from "../../core/ShopStatistics/spi/GetShopStatisticApi.ts";
import {ShopStatistics} from "../../core/ShopStatistics/api/data.ts";
import {Exception} from "../../core/Common/api/Exception.ts";
import {environment} from "../../environment.ts";
import {fake_shop_stats} from "../../core/Common/test-utils/fixture.spec.ts";


const _shopStatisticApiCreator: HttpService<GetShopStatisticApi> =
    (fetch: Fetch) =>
    (endpoint: string, token: string) =>
    (shopId: string): Promise<ShopStatistics | Exception> => {
        return fetch(`${endpoint}/shop_statistics?shop_id=${shopId}`, {headers: authorizationHeaders(token)})
            .then(handleResponse<ShopStatistics>)
    }

export const shopStatisticApiCreator =
    environment === "production" ?
        _shopStatisticApiCreator(fetch) :
        _shopStatisticApiCreator(fakeGetFetch({...fake_shop_stats}))