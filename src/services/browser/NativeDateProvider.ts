import {DateProvider} from "../../core/Common/spi/DateProvider.ts";


export class NativeDateProvider implements DateProvider {
  today(): Date {
    return new Date();
  }
}
