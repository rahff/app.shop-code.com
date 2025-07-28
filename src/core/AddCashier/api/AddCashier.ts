import {AddCashierApi} from '../spi/AddCashierApi';

import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {CASHIER_LIST_KEY} from '../../Common/constants';
import {CashierData} from "./data.ts";
import {IdGenerator} from "../../Common/spi/IdGenerator.ts";

export type AddCashier = (cashier_credentials: {username: string, password: string, userPoolId: string}) => Promise<boolean>;

const persistCashierLocally = (local_storage: LocalStorageApi) => {
  return (data: CashierData) => {
    local_storage.add_item(CASHIER_LIST_KEY, data);
    return true;
  };
}

export const addCashierCreator = (add_cashier_api: AddCashierApi, local_storage: LocalStorageApi, idGenerator: IdGenerator) =>
    async (cashier_credentials: {username: string, password: string, userPoolId: string}): Promise<boolean> => {
      const id = idGenerator.generate();
      return await add_cashier_api({...cashier_credentials, id})
          .then(persistCashierLocally(local_storage))
          .catch(() => false)
    }



