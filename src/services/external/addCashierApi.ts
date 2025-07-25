import {AddCashierApi} from "../../core/AddCashier/spi/AddCashierApi.ts";
import {fakePostFetch, Fetch, ko, requestPostConfig} from "../common.ts";
import {environment} from "../../environment.ts";
import {CashierData} from "../../core/AddCashier/api/data.ts";


const _addCashierApiCreator =
    (fetch: Fetch) =>
    (endpoint: string, token: string): AddCashierApi =>
    async (cashier_credentials): Promise<CashierData> => {
        const config = requestPostConfig(cashier_credentials, token);
        return fetch(endpoint, config)
            .then(response => response.json())
            .catch(ko)
    }


export const addCashierApiCreator = environment
    === "production" ?
    _addCashierApiCreator(fetch) :
    _addCashierApiCreator(fakePostFetch(null));