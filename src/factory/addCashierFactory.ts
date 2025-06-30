import {AddCashier} from "../core/AddCashier/api/AddCashier.ts";
import {localStorageApi} from "../services/browser/LocalStorageBrowserApi.ts";
import {httpAddCashierApi} from "../services/external/HttpAddCashierApi.ts";

export const addCashierFactory = () => new AddCashier(httpAddCashierApi, localStorageApi)