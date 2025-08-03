

export const AUTHENTICATION = "authentication" as const;
export const DASHBOARD_ROUTE = "dashboard" as const;
export const LOGIN_ROUTE = "login" as const;
export const REFRESH_SESSION_ROUTE = "refresh-session" as const;
export const SET_CONFIG_ROUTE = "set-config" as const;
export const APP_ROUTE = "bootstrap" as const;
export const LOGIN_URL = "http://localhost:4200/login" as const
export const UPGRADE_PLAN_ROUTE = "upgrade-plan" as const;
export const ERROR_PAGE_ROUTE = "error-page" as const;
export const CREATE_PROMO_ROUTE = "create-promo" as const;
export const USER_PROFILE_KEY = "userProfile" as const;
export const STATS_PAGE = (id: string, page: number) => `${id}promo_stats_page${page}` as const;
export const CASHIER_LIST_KEY = "cashier_list";
