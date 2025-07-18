import {ShopData} from '../api/data';
import {Exception} from "../../Common/api/Exception.ts";



export type CreateShopApi = (shop_data: ShopData) => Promise<ShopData | Exception>;