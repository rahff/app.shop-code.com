import {ShopData, ShopFormData} from '../api/data';
import {image_uri} from '../../UploadImage/api/UploadFile';
import {DateProvider} from "../../Common/spi/DateProvider.ts";


export class ShopFactory {

  public constructor(private date_provider: DateProvider) {}

  public from_form_data(form_data: ShopFormData, account_ref: string): ShopData {
    const id  = form_data.file_identifier;
    const logo_url = image_uri(form_data.file_identifier, form_data.file_extension);
    return {name: form_data.name, location: form_data.location, id, account_ref, logo: logo_url, promoCount: 0, createdAt: this.date_provider.todayString()};
  }
}
