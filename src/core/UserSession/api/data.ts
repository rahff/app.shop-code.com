

type Role = "Business" | "Cashier";

interface AccountUsage {
  nbr_of_shop: { current: number, limit: number };
  nbr_of_staff_user: { current: number, limit: number };
  nbr_of_promos: { current: number, limit: number };
}

type UserPlan = "Basic" | "Pro";

interface Config {
  shop_service_endpoint: string;
  user_service_endpoint: string;
  cognito_endpoint: string;
}

export interface UserProfile {
  account_ref: string;
  role: Role;
  user_name: string;
  region: string | null;
  account_usage: AccountUsage;
  config: Config | null;
}
