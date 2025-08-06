import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {
  LOGIN_ROUTE, REFRESH_SESSION_ROUTE, USER_PROFILE_KEY, DASHBOARD_ROUTE
} from '../../Common/constants';
import {Redirection} from '../../Common/api/CommonTypes';
import {UserProfile} from './data';
import {UserProfileApi} from '../spi/UserProfileApi';
import {Authentication} from "../../Model/Authentication.ts";
import {Exception, isException} from "../../Common/api/Exception.ts";



const is_signup = (authentication: Authentication | null): boolean => {
  if (!authentication) { return false; }
  return (!!authentication.user_id && !!authentication.token) && (!authentication.account_ref && !authentication.role);
}

const isAuthenticated = (authentication: Authentication | null): boolean  => authentication !== null;

export interface UserSessionState {
  userProfile: UserProfile | null;
  redirection: Redirection;
}


const redirectToRefreshSessionState = (): UserSessionState =>
    ({userProfile: null, redirection: {path: REFRESH_SESSION_ROUTE} });

const redirectToLoginState = (): UserSessionState =>
    ({userProfile: null, redirection: {path: LOGIN_ROUTE} });

const redirectToShopListState = (userProfile: UserProfile): UserSessionState =>
    ({userProfile, redirection: {path: DASHBOARD_ROUTE} });

const handleResponse =
    (localStorage: LocalStorageApi) =>
        (response: UserProfile | Exception): UserSessionState => {
          if(isException(response)) return redirectToRefreshSessionState();
          else {
            localStorage.set_item<UserProfile>(USER_PROFILE_KEY, response);
            return  redirectToShopListState(response);
          }
        }

export type LoadUserSession = (authentication: Authentication | null) => Promise<UserSessionState>

export const loadUserSessionCreator =
    (userProfileApi: UserProfileApi, localStorage: LocalStorageApi): LoadUserSession =>
    async (authentication: Authentication | null) => {
      if(is_signup(authentication)) return redirectToRefreshSessionState();
      if (isAuthenticated(authentication)) return userProfileApi(authentication!.token)
          .then(handleResponse(localStorage));
      else return redirectToLoginState();
    }


