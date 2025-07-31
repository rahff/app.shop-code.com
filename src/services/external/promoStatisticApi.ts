import {authorizationHeaders, fakeGetFetch, Fetch, handleResponse, HttpService} from "../common.ts";
import {StatsPage} from "../../core/PromoStatistics/api/data.ts";
import {PromoStatisticApi} from "../../core/PromoStatistics/spi/PromoStatisticApi.ts";
import {environment} from "../../environment.ts";
import {fake_promo_statistics} from "../../core/Common/test-utils/fixture.spec.ts";



const _promoStatisticsApiCreator: HttpService<PromoStatisticApi> =
    (fetch: Fetch) =>
    (endpoint: string, token: string): PromoStatisticApi =>
    async (shopId: string, page: number) => {
      return fetch(
          `${endpoint}/promo_statistics?shop_id=${shopId}&page=${page}`,
          {headers: authorizationHeaders(token)}).then(handleResponse<StatsPage>);
    }


export const promoStatisticsApiCreator =
    environment === "production" ?
        _promoStatisticsApiCreator(fetch) :
        _promoStatisticsApiCreator(fakeGetFetch<StatsPage>({data: [{...fake_promo_statistics}], per_page: 5, last_evaluated_key: undefined}));