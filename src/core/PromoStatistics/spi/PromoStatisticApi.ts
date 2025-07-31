
import {StatsPage} from '../api/data';
import {Exception} from "../../Common/api/Exception.ts";


export type PromoStatisticApi = (shop_id: string, lastEvaluatedKey?: { primary_key: string; sort_key: string }) => Promise<StatsPage | Exception>
