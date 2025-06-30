import { Observable } from "rxjs";
import { PromoData } from "../../core/CreatePromo/api/data.ts";
import {PromoApi} from "../../core/CreatePromo/spi/PromoApi.ts";

export class HttpCreatePromoApi implements PromoApi {

    save_promo(promo_data: PromoData): Observable<PromoData> {
        return new Observable(subscriber => {
            setTimeout(() => {
                subscriber.next({...promo_data});
                subscriber.complete();
            }, 1000)
        })
    }
}

export const createPromoApi = new HttpCreatePromoApi();