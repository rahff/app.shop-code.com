import {catchError, first, map, Observable, of} from 'rxjs';
import {UploadFileApi} from '../spi/UploadFileApi';
import {Exception} from '../../Common/api/Exception';
import {IdGenerator} from '../../Common/spi/IdGenerator';

export type UploadStatus = "None" | "Pending" | "Ok" | "Failed";
export interface UploadState {
  signed_url: string | null;
  upload_status: UploadStatus;
  error: {message: string} | null;
  file_identifier: string | null;
}

export const image_uri = (id: string, ext: string): string => {
  return `https://images.shop-code.com/${id}.${ext}`
}

const upload_initial_state: UploadState = {signed_url: null, error: null, upload_status: "None", file_identifier: null};

export class UploadFile {

  public upload_state: UploadState = {...upload_initial_state};
  public constructor(private upload_api: UploadFileApi, private id_generator: IdGenerator) {}

  public get_upload_url(): Observable<boolean> {
    return this.upload_api.get_signed_url()
      .pipe(
        map(this.set_state.bind(this)),
        catchError(this.handle_error.bind(this))
      );
  }

  private set_state(url: string): boolean {
    this.upload_state.signed_url = url;
    this.upload_state.file_identifier = this.id_generator.generate();
    return true;
  }

  public upload(file: File, url: string): Observable<boolean> {
    return this.upload_api.upload_file(file, url)
      .pipe(first(), catchError(this.handle_error.bind(this)));
  }

  private handle_error(_: Exception) {
    this.upload_state.error = {message: _.message};
    return of(false);
  }
}
