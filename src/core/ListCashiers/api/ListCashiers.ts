import {first, map, Observable, of} from 'rxjs';
import {CashierListApi} from '../spi/CashierListApi';
import {CashierData} from '../../AddCashier/api/data';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {AUTHENTICATION, CASHIER_LIST_KEY} from '../../Common/constants';
import {Authentication} from '../../AuthenticationProvider/api/data';


export interface CashierListState {
  cashier_list: CashierData[],
  error: {message: string} | null
}



export class ListCashiers {

  public constructor(private cashier_list_api: CashierListApi, private local_storage: LocalStorageApi) {}

  public state: CashierListState = {
    cashier_list: [],
    error: null
  };

  public account_cashier(): Observable<boolean> {
    const local_cashier_list = this.local_storage.get_item<CashierData[]>(CASHIER_LIST_KEY);
    if(local_cashier_list?.length) {
      this.state.cashier_list = [...local_cashier_list];
      return of(true)
    };
    const {account_ref} = this.local_storage.get_item<Authentication>(AUTHENTICATION)!;
    return this.cashier_list_api.get_cashier_list(account_ref!)
      .pipe(first(), map(this.set_state.bind(this)));
  }

  private set_state(cashier_list: CashierData[]): boolean {
    this.local_storage.set_item(CASHIER_LIST_KEY, cashier_list);
    this.state.cashier_list = cashier_list;
    return true;
  }
}
