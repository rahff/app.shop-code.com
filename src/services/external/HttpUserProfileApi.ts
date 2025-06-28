import {Observable} from 'rxjs';
import {UserProfileApi} from "../../core/UserSession/spi/UserProfileApi.ts";
import {UserProfile} from "../../core/UserSession/api/data.ts";
import {fake_user_profile} from "../../core/Common/test-utils/fixture.spec.ts";




export class HttpUserProfileApi implements UserProfileApi {

  public constructor() {}

  public get_user_profile(): Observable<UserProfile> {
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next({...fake_user_profile});
        subscriber.complete();
      }, 200)
    })
  }

}


export const userProfileApi = new HttpUserProfileApi();