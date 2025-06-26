import SpyObj = jasmine.SpyObj;
import {Observable, of} from 'rxjs';
import {ListCashiers} from './ListCashiers';
import {CashierListApi} from '../spi/CashierListApi';
import {fake_cashier_data, user_logged_in} from '../../Common/test-utils/fixture.spec';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {InMemoryLocalStorage} from '../../Common/test-utils/in_memory.spec';
import {AUTHENTICATION} from '../../Common/constants';



describe("ListCashier: A Business User see the list of its registered cashiers.", () => {

  let cashier_list_api: SpyObj<CashierListApi>;
  let local_storage: LocalStorageApi;

  const load_cashier_list = (cashier_list: ListCashiers): Observable<boolean> => {
    cashier_list_api.get_cashier_list.and.returnValue(of([fake_cashier_data]));
    return cashier_list.account_cashier()
  }
  beforeEach(() => {
    cashier_list_api = jasmine.createSpyObj("CashierListApi", ["get_cashier_list"]);
    local_storage = new InMemoryLocalStorage();
    local_storage.set_item(AUTHENTICATION, {...user_logged_in})
  })
  it("call the backend api to get the cashier linked to this account", () => {
    cashier_list_api.get_cashier_list.and.returnValue(of([fake_cashier_data]));
    const cashier_list = new ListCashiers(cashier_list_api, local_storage);
    cashier_list.account_cashier().subscribe(() => {
      expect(cashier_list_api.get_cashier_list).toHaveBeenCalledOnceWith("account_ref");
      expect(cashier_list.state.cashier_list).toEqual([fake_cashier_data]);
    })
  })

  it("does not call the backend api when the cashier list is already loaded", () => {
    const cashier_list = new ListCashiers(cashier_list_api, local_storage)
    load_cashier_list(cashier_list).subscribe(() => {
      cashier_list.account_cashier().subscribe(() => {
        expect(cashier_list_api.get_cashier_list).toHaveBeenCalledOnceWith("account_ref");
        expect(cashier_list.state.cashier_list).toEqual([fake_cashier_data]);
      })
    })
  })
})
