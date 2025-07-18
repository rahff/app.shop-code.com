
import {StatsPage} from '../api/data';
import {Exception} from "../../Common/api/Exception.ts";


export type PromoStatisticApi = (shop_id: string, page: number) => Promise<StatsPage | Exception>
