import {CashierData} from '../api/data';

export type AddCashierApi = (cashier_credentials: {username: string, password: string}) => Promise<CashierData>;
