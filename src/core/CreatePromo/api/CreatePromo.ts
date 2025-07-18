import {PromoData, PromoFormData} from './data';
import {SavePromoApi} from '../spi/PromoApi';
import {Redirection, Result} from '../../Common/api/CommonTypes';
import {PromoValidator} from '../rules/PromoValidation';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {
  CREATE_PROMO_ROUTE,
  DASHBOARD_ROUTE,
  ERROR_PAGE_ROUTE,
  UPGRADE_PLAN_ROUTE
} from '../../Common/constants';
import {Exception, InvalidDateRange, isException, UpgradedPlanRequired} from '../../Common/api/Exception';
import {promo_list_key} from '../../ListPromos/api/PromoList';


const errorRedirection = async (response: Exception) => {
  if (response instanceof UpgradedPlanRequired) return {path: UPGRADE_PLAN_ROUTE}
  return {path: ERROR_PAGE_ROUTE, params: {error: response.message}};
}

const handleResponse = (localStorage: LocalStorageApi) => {
  return async (response: PromoData | Exception) => {
    if (isException<PromoData>(response)) return errorRedirection(response);
    localStorage.add_item(promo_list_key(response.shop_id), response);
    return {path: DASHBOARD_ROUTE};
  };
}

export type CreatePromo = (shopId: string, promoFormData: PromoFormData) => Promise<Redirection>;

export const createPromoCreator =
    (savePromoApi: SavePromoApi, validator: PromoValidator, localStorage: LocalStorageApi) =>
    async (shopId: string, promoFormData: PromoFormData): Promise<Redirection> => {
      const promo_validation: Result<PromoData, InvalidDateRange> = validator(promoFormData, shopId);
      if(promo_validation.isOk()) {
        return savePromoApi(promo_validation.getValue())
            .then(handleResponse(localStorage))
      }
      else return {path: CREATE_PROMO_ROUTE, params: {error: promo_validation.getError().message}};
    }
