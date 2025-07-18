import {CashierListApi} from '../spi/CashierListApi';
import {CashierData} from '../../AddCashier/api/data';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {CASHIER_LIST_KEY} from '../../Common/constants';
import {Exception, isException} from "../../Common/api/Exception.ts";



export interface CashierListState {
  cashier_list: CashierData[],
  error: {message: string} | null
}

export type ListCashiers = () => Promise<CashierListState>;

const cashierListState = (data: CashierData[]): CashierListState => ({cashier_list: data, error: null});
const errorState = (data: Exception): CashierListState => ({cashier_list: [], error: {message: data.message}});

const handleResponse = (localStorage: LocalStorageApi) => (response: CashierData[] | Exception) => {
  if (isException(response)) return errorState(response);
  else {
    localStorage.set_item(CASHIER_LIST_KEY, response);
    return cashierListState(response);
  }
}

export const listCashierCreator =
    (cashierListApi: CashierListApi, localStorage: LocalStorageApi): ListCashiers =>
    async (): Promise<CashierListState> => {
      const localData = localStorage.get_item<CashierData[]>(CASHIER_LIST_KEY);
      if(localData === null) return cashierListApi().then(handleResponse(localStorage))
      else return cashierListState(localData);
    }

