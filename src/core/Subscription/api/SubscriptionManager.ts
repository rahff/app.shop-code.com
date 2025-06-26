import {PaymentGateway} from '../spi/PaymentGateway';
import {LOGIN_URL} from '../../Common/constants';
import {catchError, first, Observable, of} from 'rxjs';

export class SubscriptionManager {

  public constructor(private payment_gateway: PaymentGateway) {}

  public initiate_subscription(): Observable<string> {
    return this.payment_gateway.create_subscription()
    .pipe(first(), catchError(() => of(LOGIN_URL)))
  }
}
