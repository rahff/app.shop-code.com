import {AddCashierApi} from '../spi/AddCashierApi';
import {AddCashier} from './AddCashier';
import SpyObj = jasmine.SpyObj;
import {of} from 'rxjs';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {fake_cashier_credentials, fake_cashier_data} from '../../Common/test-utils/fixture.spec';
import {CASHIER_LIST_KEY} from '../../Common/constants';

describe('AddCashier: A Business User add a Cashier User to use the app as cashier', () => {

  let add_cashier_api: SpyObj<AddCashierApi>;
  let local_storage: SpyObj<LocalStorageApi>;

  beforeEach(() => {
    add_cashier_api = jasmine.createSpyObj('AddCashierApi', ['add']);
    local_storage = jasmine.createSpyObj('LocalStorageApi', ['add_item']);
  });

  it("set a username and password for the cashier", () => {
    add_cashier_api.add.and.returnValue(of({...fake_cashier_data}));
    const add_cashier = new AddCashier(add_cashier_api, local_storage);
    add_cashier.add_cashier({...fake_cashier_credentials}).subscribe(() => {
      expect(add_cashier_api.add).toHaveBeenCalledOnceWith({...fake_cashier_credentials});
      expect(local_storage.add_item).toHaveBeenCalledOnceWith(CASHIER_LIST_KEY, {...fake_cashier_data});
    })
  })
})
