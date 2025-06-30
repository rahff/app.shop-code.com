import {DateProvider} from "../../core/Common/spi/DateProvider.ts";


export class NativeDateProvider implements DateProvider {
  public today(): Date {
    return new Date();
  }
  public todayString(): string {
    return this.today().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}
