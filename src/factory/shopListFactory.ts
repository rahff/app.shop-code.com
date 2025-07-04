import {ShopList} from "../core/ListShops/api/ShopList.ts";
import {localStorageApi} from "../services/browser/LocalStorageBrowserApi.ts";
import {inMemoryShopListApi} from "../services/inMemory/InMemoryShopListApi.ts";

export const shopListFactory = () => new ShopList(inMemoryShopListApi, localStorageApi)