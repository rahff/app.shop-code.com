import {LocalStorageApi} from "../../Common/spi/LocalStorageApi.ts";
import {RemoveCashierApi} from "../spi/RemovecashierApi.ts";
import {CASHIER_LIST_KEY} from "../../Common/constants.ts";
import {Exception, isException} from "../../Common/api/Exception.ts";


export type RemoveCashier = (username: string, userId: string, userPoolId: string) => Promise<{success: boolean}>;


const handlerResponse =
  (localStorage: LocalStorageApi, userId: string) =>
    (ok: {success: boolean} | Exception) => {
      if(isException(ok)) return {success: false};
      localStorage.remove_item(CASHIER_LIST_KEY, userId);
      return {success: true};
}

export const removeCashierCreator =
  (removeCashierApi: RemoveCashierApi, localStorage: LocalStorageApi): RemoveCashier =>
  async (username: string, userId: string, userPoolId: string) => {
    return removeCashierApi(username, userId, userPoolId).then(handlerResponse(localStorage, userId))
  }
