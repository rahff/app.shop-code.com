import {ShopApi} from '../spi/ShopApi';
import {ShopData, ShopFormData} from './data';
import {catchError, map, Observable, of} from 'rxjs';
import {Redirection} from '../../Common/api/CommonTypes';
import {Exception, UpgradedPlanRequired} from '../../Common/api/Exception';
import {ShopFactory} from '../rules/ShopFactory';
import {
  AUTHENTICATION,
  CREATE_SHOP_ROUTE,
  ERROR_PAGE_ROUTE,
  MY_SHOPS_ROUTE,
  SHOP_LIST_KEY,
  UPGRADE_PLAN_ROUTE
} from '../../Common/constants';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {Authentication} from '../../AuthenticationProvider/api/data';



export class CreateShop {

  public constructor(private shop_api: ShopApi,
                     private shop_factory: ShopFactory,
                     private local_storage: LocalStorageApi) {}

  public create(shop_form_data: ShopFormData): Observable<Redirection> {
    const {user_id} = this.local_storage.get_item<Authentication>(AUTHENTICATION)!; // guard check ensures not null
     const shop_data = this.shop_factory.from_form_data(shop_form_data, user_id);
     return this.shop_api.save_shop(shop_data)
       .pipe(map(this.map_response.bind(this)), catchError(this.handle_error.bind(this)));
  }

  private map_response(shop: ShopData): Redirection {
    this.local_storage.add_item(SHOP_LIST_KEY, shop)
    return {path: MY_SHOPS_ROUTE};
  }

  private handle_error(http_error: Exception): Observable<Redirection> {
    if(this.is_upgrade_required(http_error)) return of({path: UPGRADE_PLAN_ROUTE, params: {error: http_error.message}});
    else return of({path: ERROR_PAGE_ROUTE, params: {error: http_error.message, origin: CREATE_SHOP_ROUTE}});
  }

  private is_upgrade_required(error: Exception): boolean {
    return error instanceof UpgradedPlanRequired;
  }
}

