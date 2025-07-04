import {PromoStatistics} from "../core/PromoStatistics/api/PromoStatistics.ts";
import {localStorageApi} from "../services/browser/LocalStorageBrowserApi.ts";
import {inMemoryPromoStatistics} from "../services/inMemory/InMemoryPromoStatistics.ts";

export const promoStatisticsFactory = () => new PromoStatistics(inMemoryPromoStatistics, localStorageApi);