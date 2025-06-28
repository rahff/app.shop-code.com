import { Observable, of, throwError } from 'rxjs';
import { PaymentGateway } from '../../core/Subscription/spi/PaymentGateway';
import { UnauthenticatedUser } from '../../core/Common/api/Exception';
import { localStorageApi } from '../browser/LocalStorageBrowserApi';
import { AUTHENTICATION } from '../../core/Common/constants';
import { Authentication } from '../../core/AuthenticationProvider/api/data';

export class StripePaymentGateway implements PaymentGateway {
  
  private readonly baseUrl = 'https://api.shop-code.com'; // Replace with your actual API URL

  public constructor() {}

  public create_subscription(planId: string): Observable<string> {
    const auth = localStorageApi.get_item<Authentication>(AUTHENTICATION);
    
    if (!auth || !auth.token) {
      return throwError(() => new UnauthenticatedUser());
    }

    return new Observable(subscriber => {
      fetch(`${this.baseUrl}/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          planId,
          userId: auth.user_id,
          successUrl: `${window.location.origin}/stripe/success`,
          cancelUrl: `${window.location.origin}/upgrade-plan`
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }
        return response.json();
      })
      .then(data => {
        if (data.checkoutUrl) {
          subscriber.next(data.checkoutUrl);
          subscriber.complete();
        } else {
          subscriber.error(new Error('No checkout URL received'));
        }
      })
      .catch(error => {
        console.error('Stripe checkout error:', error);
        subscriber.error(error);
      });
    });
  }

  public confirm_subscription(): Observable<boolean> {
    const auth = localStorageApi.get_item<Authentication>(AUTHENTICATION);
    
    if (!auth || !auth.token) {
      return throwError(() => new UnauthenticatedUser());
    }

    // Get session ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (!sessionId) {
      return of(false);
    }

    return new Observable(subscriber => {
      fetch(`${this.baseUrl}/stripe/confirm-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          sessionId,
          userId: auth.user_id
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to confirm subscription');
        }
        return response.json();
      })
      .then(data => {
        subscriber.next(data.success || false);
        subscriber.complete();
      })
      .catch(error => {
        console.error('Stripe confirmation error:', error);
        subscriber.next(false);
        subscriber.complete();
      });
    });
  }

  public cancel_subscription(): Observable<boolean> {
    const auth = localStorageApi.get_item<Authentication>(AUTHENTICATION);
    
    if (!auth || !auth.token) {
      return throwError(() => new UnauthenticatedUser());
    }

    return new Observable(subscriber => {
      fetch(`${this.baseUrl}/stripe/cancel-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          userId: auth.user_id
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to cancel subscription');
        }
        return response.json();
      })
      .then(data => {
        subscriber.next(data.success || false);
        subscriber.complete();
      })
      .catch(error => {
        console.error('Stripe cancellation error:', error);
        subscriber.next(false);
        subscriber.complete();
      });
    });
  }
}

export const stripePaymentGateway = new StripePaymentGateway();