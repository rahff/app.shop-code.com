import { PromoListApi } from "../../core/ListPromos/spi/PromoListApi.ts";
import {Observable, throwError} from "rxjs";
import {PromoData} from "../../core/CreatePromo/api/data.ts";
import {InternalServerError} from "../../core/Common/api/Exception.ts";


const mockPromos: PromoData[] = [
  {
    id: '1',
    name: 'Summer Sale 2025',
    description: 'Get 30% off on all summer collection items. Valid for all clothing and accessories.',
    validity_date_start: '2025-06-01',
    validity_date_end: '2025-08-31',
    shop_id: "",
    coupon_img: "",
    created_at: ""
  },
  {
    id: '2',
    name: 'Coffee Loyalty Program',
    description: 'Buy 5 coffees, get the 6th one free. Perfect for our regular customers.',
    validity_date_start: '2025-01-01',
    validity_date_end: '2025-12-31',
    shop_id: "",
    coupon_img: "",
    created_at: ""
  },
  {
    id: '3',
    name: 'Weekend Special',
    description: 'Special weekend discounts on selected items every Saturday and Sunday.',
    validity_date_start: '2025-01-15',
    validity_date_end: '2025-03-15',
    shop_id: "",
    coupon_img: "",
    created_at: ""
  }
];

export class InMemoryPromoListApi implements PromoListApi {

  public constructor() {}

  public get_shop_promos(shop_id: string): Observable<PromoData[]> {
    console.log("call api")
    if (!shop_id) return throwError(()=> new InternalServerError());
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next([...mockPromos]);
        subscriber.complete();
      }, 200);
    });
  }
}

export const inMemoryPromoListApi = new InMemoryPromoListApi();
