import {PromoList} from "../core/ListPromos/api/PromoList.ts";
import {inMemoryPromoListApi} from "../services/inMemory/InMemoryPromoListApi.ts";
import {localStorageApi} from "../services/browser/LocalStorageBrowserApi.ts";

export const promoListFactory = () => new PromoList(inMemoryPromoListApi, localStorageApi);