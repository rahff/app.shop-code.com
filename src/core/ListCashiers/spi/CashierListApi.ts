import {CashierData} from '../../AddCashier/api/data';
import {Observable} from 'rxjs';

export interface CashierListApi {
  get_cashier_list(account_id: string): Observable<CashierData[]>;
}
