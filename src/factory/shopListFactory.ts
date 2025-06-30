import {ShopList} from "../core/ListShops/api/ShopList.ts";
import {localStorageApi} from "../services/browser/LocalStorageBrowserApi.ts";
import {shopListApi} from "../services/external/HttpShopListApi.ts";

export const shopListFactory = () => new ShopList(shopListApi, localStorageApi)