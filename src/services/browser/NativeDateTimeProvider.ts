import {DateTimeProvider} from "../../core/RedeemCoupon/spi/DateTimeProvider.ts";

export class NativeDateTimeProvider implements DateTimeProvider {
    now(): Date {
        return new Date();
    }

}