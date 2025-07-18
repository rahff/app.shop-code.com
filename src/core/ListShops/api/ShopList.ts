import {ShopListApi} from '../spi/ShopListApi';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {ShopData} from '../../CreateShop/api/data';
import {SHOP_LIST_KEY} from '../../Common/constants';
import {Exception, isException} from '../../Common/api/Exception';


export interface ShopListState {
  shops: ShopData[];
  error: { message: string } | null;
}

export type GetShopList = () => Promise<ShopListState>;

const shopListState = (data: ShopData[]): ShopListState => ({shops: data, error: null});

const errorState = (error: any): ShopListState => ({shops: [], error: error.message});

const persistShopList = (sessionStorage: LocalStorageApi) => (data: ShopData[]): ShopListState => {
  sessionStorage.set_item(SHOP_LIST_KEY, data);
  return shopListState(data);
}

const handleResponse = (localStorage: LocalStorageApi) => {
  return (response: ShopData[] | Exception) => {
    if (isException(response)) return errorState(response);
    else return persistShopList(localStorage)(response);
  };
}

export const getShopListCreator =
    (shopListApi: ShopListApi, localStorage: LocalStorageApi): GetShopList =>
    async () => {
      const localData = localStorage.get_item<ShopData[]>(SHOP_LIST_KEY);
      if (localData === null) {
        return shopListApi().then(handleResponse(localStorage))
      }else return shopListState(localData);
    }

