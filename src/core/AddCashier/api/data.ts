export interface CashierData {
  username: string;
  id: string;
}

export interface AddCashierRequest {
  username: string,
  password: string,
  userPoolId: string,
  id: string
}