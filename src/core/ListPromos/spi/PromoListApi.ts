import {PromoData} from '../../CreatePromo/api/data';
import {Exception} from "../../Common/api/Exception.ts";



export type PromoListApi = () => Promise<PromoData[] | Exception>;
