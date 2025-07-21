
import {authorizationHeaders, fakeGetFetch, Fetch, handleResponse} from "../common.ts";
import {UserProfile} from "../../core/UserSession/api/data.ts";
import {environment} from "../../environment.ts";
import {fake_user_profile} from "../../core/Common/test-utils/fixture.spec.ts";


const _userProfileApiCreator =
    (fetch: Fetch) =>
    (endpoint: string) =>
        async (token: string) => {
        return fetch(`${endpoint}/user_profile`, {headers: authorizationHeaders(token)})
            .then(handleResponse<UserProfile>);
    }


export const userProfileApiCreator =
    environment === "production" ?
        _userProfileApiCreator(fetch) :
        _userProfileApiCreator(fakeGetFetch({...fake_user_profile}))