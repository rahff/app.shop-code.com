import {AddCashierApi} from "../../core/AddCashier/spi/AddCashierApi.ts";
import {Observable, of} from "rxjs";
import {CashierData} from "../../core/AddCashier/api/data.ts";
import {fake_cashier_data} from "../../core/Common/test-utils/fixture.spec.ts";

export class InMemoryAddCashierApi implements AddCashierApi {

    public add(cashier_credentials: { username: string; password: string }): Observable<CashierData> {
        console.log("Creating new CashierApi", cashier_credentials);
        return of({...fake_cashier_data});
    }
}

export const inMemoryAddCashierApi = new InMemoryAddCashierApi();