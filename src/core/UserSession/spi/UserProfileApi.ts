import {UserProfile} from '../api/data';
import {Observable} from 'rxjs';

export interface UserProfileApi {
  get_user_profile(user_id: string): Observable<UserProfile>;
}
