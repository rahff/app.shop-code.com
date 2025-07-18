import {PromoData} from '../api/data';
import {Exception} from "../../Common/api/Exception.ts";

export type SavePromoApi = (promo_data: PromoData) => Promise<PromoData | Exception>;
