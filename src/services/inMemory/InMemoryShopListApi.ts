import {Observable} from 'rxjs';
import {ShopListApi} from "../../core/ListShops/spi/ShopListApi.ts";
import {ShopData} from "../../core/CreateShop/api/data.ts";
import {accounts_shops} from "../../core/Common/test-utils/fixture.spec.ts";



export class InMemoryShopListApi implements ShopListApi {

  public constructor() {}

  public get_account_shops(account_ref: string): Observable<ShopData[]> {
    console.log(account_ref)
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next([...accounts_shops]);
        subscriber.complete();
      }, 200)
    })
  }
}

export const inMemoryShopListApi = new InMemoryShopListApi();
