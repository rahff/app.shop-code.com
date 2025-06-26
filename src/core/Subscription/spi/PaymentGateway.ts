import {Observable} from 'rxjs';

export interface PaymentGateway {
  create_subscription(): Observable<string>
}
