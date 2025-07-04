import {AddCashierModule} from "../core/AddCashier/api/AddCashier.ts";
import {localStorageApi} from "../services/browser/LocalStorageBrowserApi.ts";
import {inMemoryAddCashierApi} from "../services/inMemory/InMemoryAddCashierApi.ts";

export const addCashierFactory = () => {
    return AddCashierModule(inMemoryAddCashierApi, localStorageApi);
}