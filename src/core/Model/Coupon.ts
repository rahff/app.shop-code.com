import {CouponData, DateRange} from '../ScanQrcode/api/data';


export class Coupon {
  private readonly shop_id: string;
  private readonly validity_date_range: DateRange;

  private constructor(private data: CouponData) {
    this.validate_syntax();
    this.shop_id = data.shop_id;
    this.validity_date_range = data.validity_date_range;
  }

  private validate_syntax(data: CouponData = this.data) {
    if (
        !data.name ||
        !data.customer_id ||
        !data.shop_id ||
        !data.coupon_img ||
        !data.validity_date_range
        ) {
      throw new SyntaxError("Invalid Coupon Data");
    }
  }

  public not_belong_to_the_shop(shop_id: string): boolean {
    return this.shop_id !== shop_id;
  }

  public is_not_started_yet(today: number): boolean {
    return Date.parse(this.validity_date_range.start) > today;
  }

  public is_expired(today: number): boolean {
    return Date.parse(this.validity_date_range.end) < today;
  }

  public its_data(): CouponData {
    return this.data;
  }
  // Throws SyntaxError
  public static from_json(json: string): Coupon {
    return new Coupon(JSON.parse(json));
  }
}


