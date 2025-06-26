import {SubscriptionManager} from './SubscriptionManager';
import {PaymentGateway} from '../spi/PaymentGateway';
import SpyObj = jasmine.SpyObj;
import {LOGIN_URL} from '../../Common/constants';
import {of, throwError} from 'rxjs';
import {UnauthenticatedUser} from '../../Common/api/Exception';

describe('SubscriptionManager: A business User upgrade its subscription', () => {
  const STRIPE_URL = "https://www.stripe.com/123";
  let payment_gateway: SpyObj<PaymentGateway>;

  beforeEach(() => {
    payment_gateway = jasmine.createSpyObj("PaymentGateway", ["create_subscription"]);
  });

  it("Authenticated user should be redirected to the payment processor url", async () => {
    payment_gateway.create_subscription.and.returnValue(of(STRIPE_URL));
    const subscription = new SubscriptionManager(payment_gateway);
   subscription.initiate_subscription().subscribe(redirect => {
     expect(redirect).toEqual(STRIPE_URL);
   });

  });

  it("Unauthenticated user should be redirected to the login page", async () => {
    payment_gateway.create_subscription.and.returnValue(throwError(() => new UnauthenticatedUser()))
    const subscription = new SubscriptionManager(payment_gateway);
    subscription.initiate_subscription().subscribe((redirect)=> {
      expect(redirect).toEqual(LOGIN_URL);
    })
  });
});

