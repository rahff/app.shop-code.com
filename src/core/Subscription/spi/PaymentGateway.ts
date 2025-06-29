import { Observable } from 'rxjs';

export interface PaymentGateway {
  create_subscription(planId: string): Observable<string>
}