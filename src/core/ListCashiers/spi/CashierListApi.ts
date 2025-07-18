import {CashierData} from '../../AddCashier/api/data';
import {Exception} from "../../Common/api/Exception.ts";

export type CashierListApi = () => Promise<CashierData[] | Exception>;
