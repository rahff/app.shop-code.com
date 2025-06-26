import {AddCashierApi} from '../spi/AddCashierApi';
import {first, map, Observable} from 'rxjs';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {CashierData} from './data';
import {CASHIER_LIST_KEY} from '../../Common/constants';

export class AddCashier {

  public constructor(private add_cashier_api: AddCashierApi, private local_storage: LocalStorageApi) {}

  public add_cashier(cashier_credentials: {username: string, password: string}): Observable<boolean> {
    return this.add_cashier_api.add(cashier_credentials)
      .pipe(first(), map(this.handle_result.bind(this)))
  }

  private handle_result(cashier: CashierData): boolean {
    this.local_storage.add_item(CASHIER_LIST_KEY, cashier);
    return true;
  }
}
