import {Observable} from 'rxjs';
import {CashierData} from '../api/data';

export interface AddCashierApi {
  add(cashier_credentials: {username: string, password: string}): Observable<CashierData>
}
