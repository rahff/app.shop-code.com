import {User} from "oidc-client-ts";
import {Authentication} from "./core/Model/Authentication.ts";


export const getAuthentication = (user: User | null): Authentication | null => {
    if(user) {
        return  {
            user_id: user.profile.sub,
            role: user.profile['custom:role'] as string || null,
            account_ref: user.profile['custom:account_ref'] as string | null,
            token: user.access_token
        }
    }
    return null
}