import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {
  AUTHENTICATION,
  LOGIN_ROUTE,
  MY_SHOPS_ROUTE, REFRESH_SESSION_ROUTE,
  SELECTED_SHOP_KEY, SET_CONFIG_ROUTE,
} from '../../Common/constants';
import {Redirection} from '../../Common/api/CommonTypes';
import {UserProfile} from './data';
import {UserProfileApi} from '../spi/UserProfileApi';
import {firstValueFrom} from 'rxjs';
import {ShopData} from '../../CreateShop/api/data';
import {Authentication} from "../../Model/Authentication.ts";



const is_signup = (authentication: Authentication | null): boolean => {
  if (!authentication) { return false; }
  return (!!authentication.user_id && !!authentication.token) && (!authentication.account_ref && !authentication.role);
}


export class UserSession {

  private selected_shop: ShopData | null = null;
  private authentication: Authentication | null = null;
  private user_profile: UserProfile | null = null;

  public constructor(private local_storage_api: LocalStorageApi,
                     private user_profile_api: UserProfileApi) {}

  public async load(authentication: Authentication | null): Promise<Redirection> {
    this.authentication = authentication;
    this.local_storage_api.set_item(AUTHENTICATION, this.authentication);
    if(is_signup(this.authentication)) return {path: REFRESH_SESSION_ROUTE};
    if(this.is_authenticated()){
      this.user_profile = await firstValueFrom(this.user_profile_api.get_user_profile(this.authentication!.user_id));
      if(!this.user_profile.config) return {path: SET_CONFIG_ROUTE};
      return {path: MY_SHOPS_ROUTE};
    }else return {path: LOGIN_ROUTE};
  }

  public shop_selected(shop: ShopData): void {
    this.local_storage_api.set_item<ShopData>(SELECTED_SHOP_KEY, shop);
    this.selected_shop = shop;
  }

  public its_selected_shop(): ShopData {
    return this.selected_shop!;
  }

  public its_authentication(): Authentication | null {
    return this.authentication;
  }

  public is_authenticated(): boolean {
    return this.authentication !== null;
  }

  public its_profile(): UserProfile | null {
    return this.user_profile;
  }
}
