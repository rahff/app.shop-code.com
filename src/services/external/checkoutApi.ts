import {authorizationHeaders, fakeGetFetch, Fetch, HttpService} from "../common.ts";
import {CheckoutApi} from "../../core/Subscription/spi/CheckoutApi.ts";
import {environment} from "../../environment.ts";
import {handleResponse} from "../common.ts";


const _checkoutApiCreator: HttpService<CheckoutApi> =
    (fetch: Fetch) =>
    (endpoint: string, token: string) =>
    async (planId:string) => {
        return fetch(` ${endpoint}/subscription?plan_id=${planId}`, {headers: authorizationHeaders(token)})
            .then(handleResponse<{url: string}>);
    }


export const checkoutApiCreator =
    environment === "production" ?
    _checkoutApiCreator(fetch) :
    _checkoutApiCreator(fakeGetFetch({url: "https://stripe.com"}));