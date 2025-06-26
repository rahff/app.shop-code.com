import {UploadFile} from './UploadFile';
import {UploadFileApi} from '../spi/UploadFileApi';
import {fake_file, fake_shop_data, signed_url, signed_url_wrong} from '../../Common/test-utils/fixture.spec';
import {Observable, of, throwError} from 'rxjs';
import {IdGenerator} from '../../Common/spi/IdGenerator';




describe("A Business User selects a image for a shop's logo or promo's coupon" , () => {

  let upload_api: FakeUploadApi;
  let id_generator: FakeIdGenerator
  beforeEach(() => {
    upload_api = new FakeUploadApi();
    id_generator = new FakeIdGenerator();
  });

  it("require a authorization to upload it on the backend", () => {
    const upload_image = new UploadFile(upload_api, id_generator);
    const upload_url = upload_image.get_upload_url();
    upload_url.subscribe((_) => {
      expect(upload_image.upload_state.signed_url).toEqual(signed_url);
      expect(upload_image.upload_state.file_identifier).toEqual(fake_shop_data.id);
    });
  });

  it("it may fails", () => {
    upload_api.with_failure = true;
    const upload_image = new UploadFile(upload_api, id_generator);
    const upload_url = upload_image.get_upload_url();
    upload_url.subscribe(() => {
      expect(upload_image.upload_state.signed_url).toBeNull();
      expect(upload_image.upload_state.file_identifier).toBeNull();
      expect(upload_image.upload_state.error?.message).toEqual("something went wrong");
    });
  });

  it("submit the selected file to upload it", () => {
    const upload_image = new UploadFile(upload_api, id_generator);
    upload_image.upload(fake_file, signed_url).subscribe((result) => {
      expect(result).toEqual(true);
      expect(upload_api.files).toContain([fake_file, signed_url]);
    });
  });

  it("it may failed", () => {
    const upload_image = new UploadFile(upload_api, id_generator);
    const upload_result = upload_image.upload(fake_file, signed_url_wrong);
    upload_result.subscribe((result) => {
      expect(result).toBeFalse();
      expect(upload_api.files).not.toContain([fake_file, signed_url]);
    });
  });
});

class FakeUploadApi implements UploadFileApi {
  public with_failure: boolean = false;
  public files: [File, string][] = [];
  public upload_file(file: File, url: string): Observable<boolean> {
      if (url === signed_url_wrong) return throwError(this.throw_error);
      this.files.push([file, url]);
      return of(true);
  }
  public get_signed_url(): Observable<string> {
    if (this.with_failure) return throwError(this.throw_error);
    return of(signed_url);
  }
  private throw_error() {
    return new Error("something went wrong");
  }
}

class FakeIdGenerator implements IdGenerator {
    public generate(): string {
       return fake_shop_data.id
    }
}
