import {AuthProviderProps} from "react-oidc-context";

export type RegionCode = "eu-west-3" | 'eu-central-1' | 'us-east-1' | 'us-west-2'

export interface Config {
    userPoolId: string,
    cognito: AuthProviderProps,
    "apiEndpoints": {
        "userSide": string,
        "shopPromo": string
    }
}

export const devConfig: Config = {
    userPoolId: "eu-west-3_4sYZgkGwV",
    cognito: {
        "authority": "https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_4sYZgkGwV",
        "client_id": "672adatjjqeolfdkpljt49g4qt",
        "redirect_uri": "http://localhost:5173/",
        "response_type": "code",
        "scope": "email openid profile",
        "automaticSilentRenew": true
    },
    apiEndpoints: {
        userSide: "",
        shopPromo: "",
    }
}