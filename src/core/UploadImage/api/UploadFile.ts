
import {GetUploadUrlApi, UploadFileApi} from '../spi/UploadFileApi';
import {Exception, isException} from '../../Common/api/Exception';
import {IdGenerator} from '../../Common/spi/IdGenerator';

export type UploadStatus = "None" | "Pending" | "Ok" | "Failed";
export interface UploadState {
  signedUrl: string | null;
  uploadStatus: UploadStatus;
  error: {message: string} | null;
  fileIdentifier: string | null;
}

const uploadInitialState: UploadState = {signedUrl: null, error: null, uploadStatus: "None", fileIdentifier: null};

export const imageUri = (id: string, ext: string): string => {
  return `https://images.shop-code.com/${id}.${ext}`;
}

const errorState = (exception: Exception): UploadState => 
    ({...uploadInitialState, error: {message: exception.message}});

const uploadState = (signedUrl: string, fileIdentifier: string): UploadState =>
    ({...uploadInitialState, signedUrl, fileIdentifier});

const successUploadState = (signedUrl: string, fileIdentifier: string): UploadState =>
    ({signedUrl, fileIdentifier, uploadStatus: "Ok", error: null});

const handleUploadResponse =
    (file: File, url: string) =>
    (response: {success: boolean} | Exception) => {
        if(isException(response)) return errorState(response);
        else return successUploadState(url, file.name)
    }
const handleResponse = 
    (idGenerator: IdGenerator) => 
    (response: {signedUrl: string} | Exception): UploadState => {
      if(isException(response)) return errorState(response);
      else {
        const id = idGenerator.generate();
        return uploadState(response.signedUrl, id);
      }
    }

export type GetUploadUrl = () => Promise<UploadState>;

export const getUploadUrlCreator = 
    (getUploadUrlApi: GetUploadUrlApi, idGenerator: IdGenerator): GetUploadUrl =>
    async () => getUploadUrlApi().then(handleResponse(idGenerator));

export type UploadFile = (file: File, url: string) => Promise<UploadState>;

export const uploadFileCreator =
    (uploadFileApi: UploadFileApi): UploadFile =>
    (file: File, url: string) => uploadFileApi(file, url).then(handleUploadResponse(file, url))



