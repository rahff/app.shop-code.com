import {AddCashierRequest, CashierData} from '../api/data';

export type AddCashierApi = (cashier_credentials: AddCashierRequest ) => Promise<CashierData>;
