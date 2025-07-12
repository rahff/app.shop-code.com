import {ShopData, ShopFormData} from "../../core/CreateShop/api/data.ts";
import {image_uri} from "../../core/UploadImage/api/UploadFile.ts";
import {DateProvider} from "../../core/Common/spi/DateProvider.ts";
import {authorizationHeaders, Fetch} from "../common.ts";
import {NativeDateProvider} from "../browser/NativeDateProvider.ts";
import {environment} from "../../environment.ts";
import {fake_shop_data} from "../../core/Common/test-utils/fixture.spec.ts";


const shopFactoryCreator =
  (dateProvider: DateProvider)=>
  (form_data: ShopFormData, account_ref: string): ShopData => {
    const id  = form_data.file_identifier;
    const logo_url = image_uri(form_data.file_identifier, form_data.file_extension);
    return {name: form_data.name, location: form_data.location, id, account_ref, logo: logo_url, promoCount: 0, createdAt: dateProvider.todayString()};
}

const shopFactory = shopFactoryCreator(new NativeDateProvider());


export const createShopCreator =
  (factory: (form_data: ShopFormData, account_ref: string) => ShopData) =>
  (fetch: Fetch) =>
  (endpoint: string, account_ref: string, token: string) =>
    async (shopData: ShopFormData): Promise<ShopData> => {
      const shop = factory(shopData, account_ref);
      const response = await fetch(`${endpoint}/shop`, {
        method: "POST",
        body: JSON.stringify(shop),
        headers: authorizationHeaders(token),
      })
     return await response.json();
}

const fakeFetch: Fetch = () => {
  const body = {...fake_shop_data};
  const response: Response = new Response(JSON.stringify(body));
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(response);
    },500)
  })
}



export const createShop = environment === "production" ?
  createShopCreator(shopFactory)(fetch) :
  createShopCreator(shopFactory)(fakeFetch);
