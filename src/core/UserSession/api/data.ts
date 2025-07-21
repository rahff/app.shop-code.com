

type Role = "Business" | "Cashier";

interface AccountUsage {
  nbr_of_shop: { current: number, limit: number };
  nbr_of_staff_user: { current: number, limit: number };
  nbr_of_promos: { current: number, limit: number };
}




export interface UserProfile {
  account_ref: string;
  role: Role;
  user_name: string;
  region: string | null;
  account_usage: AccountUsage;
  userPlan: string;
}
