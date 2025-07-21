import {Exception} from "../../Common/api/Exception.ts";


export type GetUploadUrlApi = () => Promise<{signedUrl: string} | Exception>;

export type UploadFileApi = (file: File, url: string) => Promise<{success: boolean} | Exception>

