import {DateProvider} from '../../Common/spi/DateProvider';
import {PromoData, PromoFormData} from '../api/data';
import {err, ok, Result} from '../../Common/api/CommonTypes';
import {Promo} from '../../Model/Promo';



export class PromoValidation {

  public constructor(private date_provider: DateProvider) {}

  public validate(promo_form_data: PromoFormData, shop_id: string): Result<PromoData> {
    const created_at = this.format_date(this.date_provider.today());
    const promo = Promo.from_form_data(promo_form_data, created_at, shop_id);
    const validation_result = promo.has_valid_date_range();
    if(validation_result.isOk()) return ok(promo.data());
    else return err(validation_result.getError());
  }

  private format_date(date: Date): string {
    return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
  }
}
