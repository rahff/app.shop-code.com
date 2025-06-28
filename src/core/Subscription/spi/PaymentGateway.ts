import { Observable } from 'rxjs';

export interface PaymentGateway {
  create_subscription(planId: string): Observable<string>
  confirm_subscription(): Observable<boolean>
  cancel_subscription(): Observable<boolean>
}