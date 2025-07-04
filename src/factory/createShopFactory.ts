import {CreateShop} from "../core/CreateShop/api/CreateShop.ts";
import {ShopFactory} from "../core/CreateShop/rules/ShopFactory.ts";
import {localStorageApi} from "../services/browser/LocalStorageBrowserApi.ts";
import {inMemoryCreateShopApi} from "../services/inMemory/InMemoryShopApi.ts";
import {NativeDateProvider} from "../services/browser/NativeDateProvider.ts";


export const createShopFactory = () => new CreateShop(inMemoryCreateShopApi, new ShopFactory(new NativeDateProvider()), localStorageApi)