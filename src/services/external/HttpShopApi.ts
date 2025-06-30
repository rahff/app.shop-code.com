import {Observable} from 'rxjs';
import {ShopApi} from "../../core/CreateShop/spi/ShopApi.ts";
import {ShopData} from "../../core/CreateShop/api/data.ts";



export class HttpShopApi implements ShopApi {

  public constructor() {}

  save_shop(shop_data: ShopData): Observable<ShopData> {
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(shop_data);
        subscriber.complete();
      }, 1000)
    });
  }
}

export const createShopApi = new HttpShopApi();
