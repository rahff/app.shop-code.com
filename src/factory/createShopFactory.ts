import {CreateShop} from "../core/CreateShop/api/CreateShop.ts";
import {ShopFactory} from "../core/CreateShop/rules/ShopFactory.ts";
import {CryptoIdGenerator} from "../services/browser/CryptoIdGenerator.ts";
import {localStorageApi} from "../services/browser/LocalStorageBrowserApi.ts";
import {createShopApi} from "../services/external/HttpShopApi.ts";


export const createShopFactory = () => new CreateShop(createShopApi, new ShopFactory(new CryptoIdGenerator()), localStorageApi)