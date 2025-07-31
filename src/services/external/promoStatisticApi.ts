import {authorizationHeaders, fakeGetFetch, Fetch, handleResponse, HttpService} from "../common.ts";
import {StatsPage} from "../../core/PromoStatistics/api/data.ts";
import {PromoStatisticApi} from "../../core/PromoStatistics/spi/PromoStatisticApi.ts";
import {environment} from "../../environment.ts";
import {fake_promo_statistics} from "../../core/Common/test-utils/fixture.spec.ts";



const _promoStatisticsApiCreator: HttpService<PromoStatisticApi> =
    (fetch: Fetch) =>
    (endpoint: string, token: string): PromoStatisticApi =>
    async (shopId: string, lastEvaluatedKey?: { primary_key: string; sort_key: string }) => {
      let url = `${endpoint}/promo_statistics?shop_id=${shopId}`;
      
      if (lastEvaluatedKey) {
        url += `&last_key_pk=${encodeURIComponent(lastEvaluatedKey.primary_key)}&last_key_sk=${encodeURIComponent(lastEvaluatedKey.sort_key)}`;
      }
      
      return fetch(url, {headers: authorizationHeaders(token)}).then(handleResponse<StatsPage>);
    }


export const promoStatisticsApiCreator =
    environment === "production" ?
        _promoStatisticsApiCreator(fetch) :
        _promoStatisticsApiCreator(fakeGetFetch<StatsPage>({
          data: [...fake_promo_statistics],
          per_page: 5, 
          last_evaluated_key: { primary_key: "shop_id", sort_key: "2025-01-15T10:00:00Z" }
        }));