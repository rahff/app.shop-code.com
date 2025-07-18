import {authorizationHeaders, fakeGetListFetch, Fetch, handleResponse} from "../common.ts";
import {CashierListApi} from "../../core/ListCashiers/spi/CashierListApi.ts";
import {CashierData} from "../../core/AddCashier/api/data.ts";
import {environment} from "../../environment.ts";
import {fake_cashier_data} from "../../core/Common/test-utils/fixture.spec.ts";

export const _cashierListApiCreator =
    (fetch: Fetch) =>
    (endpoint: string, token: string): CashierListApi =>
    async () => {
        return fetch(endpoint, {headers: authorizationHeaders(token)})
            .then(handleResponse<CashierData[]>)
    }

export const cashierListApiCreator =
    environment === "production" ?
    _cashierListApiCreator(fetch) :
    _cashierListApiCreator(fakeGetListFetch([...fake_cashier_data]));