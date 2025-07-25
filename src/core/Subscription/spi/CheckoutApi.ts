import {Exception} from "../../Common/api/Exception.ts";



export type CheckoutApi = (planId: string) => Promise<{ url: string } | Exception>;