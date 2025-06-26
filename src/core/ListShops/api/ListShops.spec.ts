import {InMemoryLocalStorage} from '../../Common/test-utils/in_memory.spec';
import SpyObj = jasmine.SpyObj;
import {ShopListApi} from '../spi/ShopListApi';
import {ShopList} from './ShopList';
import {Observable, of, throwError} from 'rxjs';
import {AUTHENTICATION, SHOP_LIST_KEY} from '../../Common/constants';
import {InternalServerError} from '../../Common/api/Exception';
import {user_id, accounts_shops, user_logged_in} from '../../Common/test-utils/fixture.spec';




describe('ListShops: A Business User see its shop list', () => {
  let shop_api: SpyObj<ShopListApi>;
  let local_storage: InMemoryLocalStorage;
  let shop_list: ShopList;
  const load_shop_list = (shop_list: ShopList): Observable<boolean> => {
    shop_api.get_account_shops.and.returnValue(of(accounts_shops));
    return shop_list.shops()
  };

  beforeEach(() => {
    shop_api = jasmine.createSpyObj("ShopListApi", ["get_account_shops"]);
    local_storage = new InMemoryLocalStorage();
    local_storage.set_item(AUTHENTICATION, {...user_logged_in});
    shop_list = new ShopList(shop_api, local_storage);
  });

  it("get a list of shops, calling the backend external", () => {
    load_shop_list(shop_list).subscribe(() => {
      expect(shop_api.get_account_shops).toHaveBeenCalledOnceWith(user_id);
      expect(shop_list.state.shops).toEqual(accounts_shops);
    });
  });

  it("it may fail for network error", () => {
    shop_api.get_account_shops.and.returnValue(throwError(() => new InternalServerError()));
    const shop_list = new ShopList(shop_api, local_storage);
    shop_list.shops().subscribe(() => {
      expect(shop_api.get_account_shops).toHaveBeenCalledOnceWith(user_id);
      expect(shop_list.state.shops).toEqual([]);
      expect(shop_list.state.error).toEqual({message: new InternalServerError().message});
    });
  });

  it("the shop list is already loaded, it does not call backend external again", () => {
    load_shop_list(shop_list).subscribe(() => {
      shop_list.shops().subscribe(() => {
        expect(shop_api.get_account_shops).toHaveBeenCalledOnceWith(user_id);
        expect(shop_list.state.shops).toEqual(accounts_shops);
        expect(local_storage.get_item(SHOP_LIST_KEY)).toEqual(accounts_shops);
      })
    });
  });
})
