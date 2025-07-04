import {ShopStatistics} from "../core/ShopStatistics/api/ShopStatistics.ts";
import {localStorageApi} from "../services/browser/LocalStorageBrowserApi.ts";
import {inMemoryShopStatisticApi} from "../services/inMemory/InMemoryShopStatisticApi.ts";

export const shopStatisticsFactory = () => new ShopStatistics(inMemoryShopStatisticApi, localStorageApi)