import {CreatePromo} from "../core/CreatePromo/api/CreatePromo.ts";
import {localStorageApi} from "../services/browser/LocalStorageBrowserApi.ts";
import {createPromoApi} from "../services/external/HttpCreatePromoApi.ts";
import {PromoValidation} from "../core/CreatePromo/rules/PromoValidation.ts";
import {NativeDateProvider} from "../services/browser/NativeDateProvider.ts";

export const createPromoFactory = () => new CreatePromo(createPromoApi, new PromoValidation(new NativeDateProvider()), localStorageApi)