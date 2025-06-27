import {Observable} from 'rxjs';
import {UploadFileApi} from "../../core/UploadImage/spi/UploadFileApi.ts";



export class HttpUploadFileApi implements UploadFileApi {

  public constructor() {}

  public get_signed_url(): Observable<string> {
    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next("https://awsS3.signed/endpoint")
      }, 200)
    })
  }

  public upload_file(file: File, url: string): Observable<boolean> {
    console.log(file, url);
    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(true);
        subscriber.complete();
      }, 200)
    })
  }
}
