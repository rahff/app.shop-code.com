import {CreateShopApi} from '../spi/CreateShopApi.ts';
import {ShopData, ShopFormData} from './data';
import {Redirection} from '../../Common/api/CommonTypes';
import {Exception, isException, UpgradedPlanRequired} from '../../Common/api/Exception';
import {ShopFactory} from '../rules/ShopFactory';
import {
  CREATE_SHOP_ROUTE,
  ERROR_PAGE_ROUTE,
  MY_SHOPS_ROUTE,
  SHOP_LIST_KEY,
  UPGRADE_PLAN_ROUTE
} from '../../Common/constants';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';


export type CreateShop = (shop_form_data: ShopFormData, userId: string) => Promise<Redirection>




const persistShopLocally = (localStorage: LocalStorageApi) => {
  return (response: ShopData | Exception): Redirection => {
    if (isException(response)) {
      if(response instanceof UpgradedPlanRequired) return {path: UPGRADE_PLAN_ROUTE}
      return {path: ERROR_PAGE_ROUTE, params: {error: response.message}};
    }
    localStorage.add_item(SHOP_LIST_KEY, response);
    return {path: MY_SHOPS_ROUTE};
  };
}

const handleError = (error: Exception) => {
  if (IsUpgradeRequired(error)) return {path: UPGRADE_PLAN_ROUTE, params: {error: error.message}};
  else return {path: ERROR_PAGE_ROUTE, params: {error: error.message, origin: CREATE_SHOP_ROUTE}};

}

const IsUpgradeRequired = (error: Exception): boolean => {
  return error instanceof UpgradedPlanRequired;
}

export const createShopCreator =
    (createShopApi: CreateShopApi, factory: ShopFactory, localStorage: LocalStorageApi): CreateShop =>
    async (shop_form_data: ShopFormData, account_ref: string): Promise<Redirection> => {
      const shopData = factory(shop_form_data, account_ref);
      return createShopApi(shopData)
          .then(persistShopLocally(localStorage))
          .catch(handleError)
    }



