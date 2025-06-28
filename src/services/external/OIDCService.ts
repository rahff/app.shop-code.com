import {AuthenticationApi} from "../../core/AuthenticationProvider/spi/AuthenticationApi.ts";
import {Authentication} from "../../core/AuthenticationProvider/api/data.ts";
import {Observable, of} from "rxjs";
import {user_logged_in} from "../../core/Common/test-utils/fixture.spec.ts";

export class OIDCService implements AuthenticationApi {
    public constructor() {}

    public authenticate(): Observable<Authentication | null> {
        return new Observable<Authentication | null>(observer => {
            setTimeout(() => {
                observer.next({...user_logged_in});
                observer.complete()
            }, 500)

        })
    }

    public login(): void {

    }

    public logout(): Observable<void> {
        return of()
    }

    public refresh_session(): Observable<Authentication | null> {
        return new Observable<Authentication | null>(observer => {
            setTimeout(() => {
                observer.next({...user_logged_in});
                observer.complete()
            }, 500)
        })
    }
}

export const authenticationApi = new OIDCService();