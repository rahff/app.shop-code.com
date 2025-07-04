import {RedeemCoupon} from "../core/RedeemCoupon/api/RedeemCoupon.ts";
import {inMemoryCashDrawerApi} from "../services/inMemory/InMemoryCashDrawerApi.ts";
import {CouponPuncher} from "../core/RedeemCoupon/rules/CouponPuncher.ts";
import {CryptoIdGenerator} from "../services/browser/CryptoIdGenerator.ts";
import {NativeDateTimeProvider} from "../services/browser/NativeDateTimeProvider.ts";

export const redeemCouponFactory =  () => new RedeemCoupon(inMemoryCashDrawerApi, new CouponPuncher(new NativeDateTimeProvider(), new CryptoIdGenerator()))