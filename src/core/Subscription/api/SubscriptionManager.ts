import { PaymentGateway } from '../spi/PaymentGateway';
import { LOGIN_URL } from '../../Common/constants';
import { catchError, first, Observable, of } from 'rxjs';

export class SubscriptionManager {

  public constructor(private payment_gateway: PaymentGateway) {}

  public initiate_subscription(planId: string): Observable<string> {
    return this.payment_gateway.create_subscription(planId)
      .pipe(first(), catchError(() => of(LOGIN_URL)))
  }

  public handle_stripe_success(): Observable<boolean> {
    return this.payment_gateway.confirm_subscription()
      .pipe(first(), catchError(() => of(false)))
  }

  public cancel_subscription(): Observable<boolean> {
    return this.payment_gateway.cancel_subscription()
      .pipe(first(), catchError(() => of(false)))
  }
}