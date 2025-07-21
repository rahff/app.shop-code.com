import {PromoData, PromoFormData} from '../CreatePromo/api/data';
import {InvalidDateRange} from '../Common/api/Exception';
import {err, ok, Result} from '../Common/api/CommonTypes';
import {imageUri} from '../UploadImage/api/UploadFile';

export class Promo {
  public id: string;
  public name: string;
  public description: string;
  public coupon_img: string;
  public validity_date_start: string;
  public validity_date_end: string;
  public created_at: string;
  public shop_id: string;

  private constructor(form_data: PromoFormData, created_at: string, shop_id: string) {
    this.name = form_data.name;
    this.created_at = created_at;
    this.description = form_data.description;
    this.coupon_img = imageUri(form_data.id, form_data.file_extension)
    this.validity_date_start = form_data.validity_date_start;
    this.validity_date_end = form_data.validity_date_end;
    this.id = form_data.id;
    this.shop_id = shop_id;
  }

  public static from_form_data(form_data: PromoFormData, created_at: string, shop_id: string): Promo {
    return new Promo(form_data, created_at, shop_id);
  }

  public has_valid_date_range(): Result<Promo, InvalidDateRange> {
    const is_valid = Date.parse(this.validity_date_start) <= Date.parse(this.validity_date_end);
    if (is_valid) return ok(this);
    else return err(new InvalidDateRange());
  }

  public data(): PromoData {
    return {
      shop_id: this.shop_id,
      id: this.id,
      name: this.name,
      description: this.description,
      coupon_img: this.coupon_img,
      validity_date_start: this.validity_date_start,
      validity_date_end: this.validity_date_end,
      created_at: this.created_at
    }
  }
}
