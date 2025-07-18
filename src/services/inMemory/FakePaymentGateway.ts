import { Observable, of } from 'rxjs';
import { CheckoutApi } from '../../core/Subscription/spi/CheckoutApi.ts';


export class FakePaymentGateway implements CheckoutApi {


  public constructor() {}

  public create_subscription(planId: string): Observable<string> {
    console.log('FakePaymentGateway.create_subscription', planId);
      return of("https://stripe.com");
  }

  public confirm_subscription(): Observable<boolean> {
    return of(true);
  }

  public cancel_subscription(): Observable<boolean> {
     return of(true);
  }
}

export const fakePaymentGateway = new FakePaymentGateway();