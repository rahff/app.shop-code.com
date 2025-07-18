import { CheckoutApi } from '../spi/CheckoutApi.ts';
import {Exception, isException} from "../../Common/api/Exception.ts";



export type GetCheckoutUrl = (planId: string) => Promise<CheckoutRedirectionState>;

export interface CheckoutRedirectionState {
  checkoutUrl: string | null;
  error: {message: string} | null;
}

export const checkoutRedirectionInitialState: CheckoutRedirectionState = {checkoutUrl: null, error: null};
const errorState =
    (exception: Exception): CheckoutRedirectionState =>
    ({checkoutUrl: null, error: {message: exception.message}});

const checkoutRedirectionState =
    (checkoutUrl: string): CheckoutRedirectionState =>
    ({checkoutUrl, error: null})

const handleResponse = (response: string | Exception) => {
  if(isException(response)) {
    return errorState(response);
  }else return checkoutRedirectionState(response);
}
export const getCheckoutUrlCreator =
    (paymentApi: CheckoutApi): GetCheckoutUrl =>
    async (planId: string) => paymentApi(planId).then(handleResponse);





