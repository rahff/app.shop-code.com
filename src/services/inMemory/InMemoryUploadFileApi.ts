import {Observable} from 'rxjs';
import {UploadFileApi} from "../../core/UploadImage/spi/UploadFileApi.ts";



export class InMemoryUploadFileApi implements UploadFileApi {

  public constructor() {}

  public get_signed_url(): Observable<string> {
    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next("https://awsS3.signed/endpoint");
        subscriber.complete()
      }, 200)
    })
  }

  public upload_file(file: File, url: string): Observable<boolean> {
    console.log("upload api called with :", file, url);
    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(true);
        subscriber.complete();
      }, 200)
    })
  }
}


export const inMemoryUploadFileApi = new InMemoryUploadFileApi();