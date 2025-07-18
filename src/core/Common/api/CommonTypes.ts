import {Exception, Null} from './Exception';
import {
  APP_ROUTE,
  CREATE_PROMO_ROUTE, CREATE_SHOP_ROUTE,
  DASHBOARD_ROUTE,
  ERROR_PAGE_ROUTE, LOGIN_ROUTE,
  MY_SHOPS_ROUTE,
  REFRESH_SESSION_ROUTE, SET_CONFIG_ROUTE
} from "../constants.ts";


export class Result<T=any, E=Exception> {
  public constructor(private value: T, private error: E) {}

  public isOk(): boolean {
    return (this.error instanceof Null);
  }

  public getValue(): T {
    return this.value;
  }

  public getError(): E {
    return this.error;
  }
}

export const ok = <T> (value: T): Result<T, Null>  => {
  return new Result(value, Null.NULL());
}

export const err = <E extends Exception> (error: E): Result<any, E>  => {
  return new Result(null, error);
}

type RedirectionParams = {
  error?: string;
  origin?: string;
}

export type AppRoute =
    typeof APP_ROUTE |
    typeof LOGIN_ROUTE |
    typeof REFRESH_SESSION_ROUTE|
    typeof MY_SHOPS_ROUTE |
    typeof DASHBOARD_ROUTE |
    typeof ERROR_PAGE_ROUTE |
    typeof CREATE_PROMO_ROUTE |
    typeof CREATE_SHOP_ROUTE |
    typeof SET_CONFIG_ROUTE |
    'region-picker' |
    'upload-error' |
    'redeem-coupon' |
    'upgrade-plan' |
    'add-cashier' |
    'help-support';

export interface Redirection {
  path: AppRoute;
  params?: RedirectionParams;
}



