import {Observable} from 'rxjs';

export interface UploadFileApi {
  get_signed_url(): Observable<string>;
  upload_file(file: File, url: string): Observable<boolean>;
}
