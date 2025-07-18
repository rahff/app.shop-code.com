import {ShopData} from '../../CreateShop/api/data';
import {Exception} from "../../Common/api/Exception.ts";



export type ShopListApi = () => Promise<ShopData[] | Exception>;
