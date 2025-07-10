import {AuthProviderProps} from "react-oidc-context";

export type RegionCode = "eu-west-3" | 'eu-central-1' | 'us-east-1' | 'us-west-2'

export interface Config {
    cognito: AuthProviderProps,
    "apiEndpoints": {
        "userSide": string,
        "shopPromo": string
    }
}