import {authorizationHeaders, fakeGetFetch, Fetch, handleResponse, HttpService} from "../common.ts";
import {GetUploadUrlApi} from "../../core/UploadImage/spi/UploadFileApi.ts";
import {Exception} from "../../core/Common/api/Exception.ts";
import {environment} from "../../environment.ts";


const _getUploadUrlApiCreator: HttpService<GetUploadUrlApi> =
    (fetch: Fetch) =>
    (endpoint: string, token: string) =>
     async ():  Promise<{ signedUrl: string } | Exception> => {
                return fetch(`${endpoint}/upload_url`, {headers: authorizationHeaders(token)})
                    .then(handleResponse<{ signedUrl: string }>)
     }


export const getUploadUrlApiCreator =
    environment === "production" ?
        _getUploadUrlApiCreator(fetch) :
        _getUploadUrlApiCreator(fakeGetFetch({signedUrl: "http://localhost:5371/signedUrl"}));