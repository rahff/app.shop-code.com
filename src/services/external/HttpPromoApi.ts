
import {Observable} from 'rxjs';
import {PromoApi} from "../../core/CreatePromo/spi/PromoApi.ts";
import {PromoData} from "../../core/CreatePromo/api/data.ts";


export class HttpPromoApi implements PromoApi {

  constructor() { }

  public save_promo(promo_data: PromoData): Observable<PromoData> {
    return new Observable<PromoData>((subscriber) => {
      setTimeout(() => {
        subscriber.next(promo_data);
        subscriber.complete();
      }, 200)
    })
  }
}
