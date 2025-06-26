import {AuthenticationApi} from '../spi/AuthenticationApi';
import {Authentication} from './data';
import {AUTHENTICATION} from '../../Common/constants';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {map, Observable} from 'rxjs';



export class AuthenticationProvider {

  public constructor(
    private local_storage_api: LocalStorageApi,
    private authentication_api: AuthenticationApi) {}

  public auto_login(): Observable<Authentication | null> {
    return this.authentication_api.authenticate()
      .pipe(map((authentication: Authentication | null) => {
        this.local_storage_api.set_item(AUTHENTICATION, authentication);
        return authentication;
      }));
  }

  public login(): void {
    return this.authentication_api.login();
  }

  public logout(): Observable<void> {
    return this.authentication_api.logout();
  }

  public refresh_session(): Observable<Authentication | null> {
    return this.authentication_api.refresh_session();
  }
}
