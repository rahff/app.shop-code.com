export interface Authentication {
  user_id: string;
  token: string;
  role: string | null;
  account_ref: string | null
}
