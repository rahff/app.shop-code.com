import {fakePostFetch, Fetch, handleResponse, HttpService, requestPostConfig} from "../common.ts";
import {RemoveCashierApi} from "../../core/RemoveCashier/spi/RemovecashierApi.ts";
import {environment} from "../../environment.ts";

const _removeCashierApiCreator: HttpService<RemoveCashierApi> =
  (fetch: Fetch) =>
    (endpoint: string, token: string) =>
      (username: string, userId: string, userPoolId: string) => {
        return fetch(`${endpoint}/remove-cashier`, requestPostConfig({username, userId, userPoolId}, token))
          .then(handleResponse<{ success: boolean }>)
      }



export const removeCashierApiCreator =
  environment === "production" ?
    _removeCashierApiCreator(fetch) :
    _removeCashierApiCreator(fakePostFetch({success: true}));
