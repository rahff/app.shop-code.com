import { Observable, of } from 'rxjs';
import { CashierListApi } from '../../core/ListCashiers/spi/CashierListApi';
import { CashierData } from '../../core/AddCashier/api/data';

// Mock cashier data for demonstration
const mockCashiers: CashierData[] = [
  {
    id: 'cashier_001',
    username: 'john_doe'
  },
  {
    id: 'cashier_002', 
    username: 'jane_smith'
  },
  {
    id: 'cashier_003',
    username: 'mike_wilson'
  }
];

export class HttpCashierListApi implements CashierListApi {
  
  public constructor() {}

  public get_cashier_list(account_id: string): Observable<CashierData[]> {
    console.log('Fetching cashiers for account:', account_id);
    
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next([...mockCashiers]);
        subscriber.complete();
      }, 500);
    });
  }
}

export const cashierListApi = new HttpCashierListApi();