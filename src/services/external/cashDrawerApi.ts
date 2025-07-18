import { CashDrawerApi } from "../../core/RedeemCoupon/spi/CashDrawerApi";
import {RedeemCouponData} from "../../core/RedeemCoupon/api/data.ts";
import {fakePostFetch, Fetch, ko, ok, requestPostConfig} from "../common.ts";
import {environment} from "../../environment.ts";




const _cashDrawerApiCreator =
    (fetch: Fetch) =>
    (endpoint: string, token: string): CashDrawerApi =>
    async (redeemed_coupon: RedeemCouponData) => {
        return fetch(endpoint, requestPostConfig(redeemed_coupon, token))
            .then(ok)
            .catch(ko);
    }



export const cashDrawerApiCreator = environment === "production" ?
    _cashDrawerApiCreator(fetch) :
    _cashDrawerApiCreator(fakePostFetch);
