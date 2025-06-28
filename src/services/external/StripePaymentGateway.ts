import { Observable, of } from 'rxjs';
import { PaymentGateway } from '../../core/Subscription/spi/PaymentGateway';


export class StripePaymentGateway implements PaymentGateway {


  public constructor() {}

  public create_subscription(planId: string): Observable<string> {
    console.log('StripePaymentGateway.create_subscription', planId);
      return of("https://stripe.com");
  }

  public confirm_subscription(): Observable<boolean> {
    return of(true);
  }

  public cancel_subscription(): Observable<boolean> {
     return of(true);
  }
}

export const stripePaymentGateway = new StripePaymentGateway();