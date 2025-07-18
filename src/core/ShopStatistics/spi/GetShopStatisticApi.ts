import {ShopStatistics} from '../api/data';
import {Exception} from "../../Common/api/Exception.ts";



export type GetShopStatisticApi = (shop_id: string) => Promise<ShopStatistics | Exception>;


