import {catchError, map, Observable, of} from 'rxjs';
import {PromoData, PromoFormData} from './data';
import {PromoApi} from '../spi/PromoApi';
import {Redirection, Result} from '../../Common/api/CommonTypes';
import {PromoValidation} from '../rules/PromoValidation';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {
  CREATE_PROMO_ROUTE,
  DASHBOARD_ROUTE,
  ERROR_PAGE_ROUTE,
  SELECTED_SHOP_KEY,
  UPGRADE_PLAN_ROUTE
} from '../../Common/constants';
import {Exception, InvalidDateRange, UpgradedPlanRequired} from '../../Common/api/Exception';
import {ShopData} from '../../CreateShop/api/data';
import {promo_list_key} from '../../ListPromos/api/PromoList';



export class CreatePromo {

  public constructor(private promo_api: PromoApi,
                     private promo_validator: PromoValidation,
                     private local_storage_api: LocalStorageApi) {}

  public create(promo_form_data: PromoFormData): Observable<Redirection> {
    const shop = this.local_storage_api.get_item<ShopData>(SELECTED_SHOP_KEY)!; // a guard check ensures not null
    const promo_validation: Result<PromoData, InvalidDateRange> = this.promo_validator.validate(promo_form_data, shop.id);
    if(promo_validation.isOk()) return this.save_promo(promo_validation.getValue());
    else return of({path: CREATE_PROMO_ROUTE, params: {error: promo_validation.getError().message}});
  }

  private save_promo(promo: PromoData): Observable<Redirection> {
    return this.promo_api.save_promo(promo)
      .pipe(
        map(this.ok_result.bind(this)),
        catchError(this.handle_error.bind(this))
      );
  }

  private ok_result(promo: PromoData): Redirection {
    this.local_storage_api.add_item(promo_list_key(promo.shop_id), promo);
    return {path: DASHBOARD_ROUTE};
  }

  private handle_error(http_error: Exception): Observable<Redirection> {
    if(this.is_upgrade_required(http_error)) return of({path: UPGRADE_PLAN_ROUTE, params: {error: http_error.message}});
    else return of({path: ERROR_PAGE_ROUTE, params: {error: http_error.message, origin: CREATE_PROMO_ROUTE}});
  }

  private is_upgrade_required(error: Exception): boolean {
    return error instanceof UpgradedPlanRequired;
  }
}

