import {PromoList} from "../core/ListPromos/api/PromoList.ts";
import {promoListApi} from "../services/external/HttpPromoListApi.ts";
import {localStorageApi} from "../services/browser/LocalStorageBrowserApi.ts";

export const promoList = new PromoList(promoListApi, localStorageApi);