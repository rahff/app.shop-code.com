import {ShopData, ShopFormData} from '../api/data';
import {imageUri} from '../../UploadImage/api/UploadFile';
import {DateProvider} from "../../Common/spi/DateProvider.ts";


export type ShopFactory = (form_data: ShopFormData, account_ref: string) => ShopData;

export const shopFactoryCreator =
    (date_provider: DateProvider): ShopFactory =>
    (form_data: ShopFormData, account_ref: string): ShopData => {
      const id  = form_data.file_identifier;
      const logo_url = imageUri(form_data.file_identifier, form_data.file_extension);
      return {name: form_data.name, location: form_data.location, id, account_ref, logo: logo_url, promoCount: 0, createdAt: date_provider.todayString()};
    }
