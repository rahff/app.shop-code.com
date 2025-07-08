import {AuthProviderProps} from "react-oidc-context";

export type RegionCode = "eu-west-3" | 'eu-central-1' | 'us-east-1' | 'us-west-2'

export const cognitoConfig: Record<RegionCode, AuthProviderProps> = {
    "eu-west-3": {
        authority: "https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_4sYZgkGwV",
        client_id: "672adatjjqeolfdkpljt49g4qt",
        redirect_uri: "http://localhost:5173/",
        response_type: "code",
        scope: "email openid profile",
        automaticSilentRenew: true,
    },
    "eu-central-1": {
        authority: "https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_4sYZgkGwV",
        client_id: "672adatjjqeolfdkpljt49g4qt",
        redirect_uri: "http://localhost:5173/",
        response_type: "code",
        scope: "email openid profile",
        automaticSilentRenew: true,
    },
    "us-east-1": {
        authority: "https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_4sYZgkGwV",
        client_id: "672adatjjqeolfdkpljt49g4qt",
        redirect_uri: "http://localhost:5173/",
        response_type: "code",
        scope: "email openid profile",
        automaticSilentRenew: true,
    },
    "us-west-2": {
        authority: "https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_4sYZgkGwV",
        client_id: "672adatjjqeolfdkpljt49g4qt",
        redirect_uri: "http://localhost:5173/",
        response_type: "code",
        scope: "email openid profile",
        automaticSilentRenew: true,
    }
}