import {fakeUploadFetch, Fetch, handleUploadResponse} from "../common.ts";
import {environment} from "../../environment.ts";
import {UploadFileApi} from "../../core/UploadImage/spi/UploadFileApi.ts";


const _uploadFileApiCreator = (fetch: Fetch) => {
    return async (file: File, signedUrl: string) => {
        return fetch(signedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
            },
            body: file,
        }).then(handleUploadResponse);
    };
}


export const uploadFileApi: UploadFileApi =
    environment === "production" ?
        _uploadFileApiCreator(fetch) :
        _uploadFileApiCreator(fakeUploadFetch);