import {Authentication} from '../api/data';
import {Observable} from 'rxjs';


export interface AuthenticationApi {
   authenticate(): Observable<Authentication | null>;
   refresh_session(): Observable<Authentication | null>
   login(): void;
   logout(): Observable<void>;
}
