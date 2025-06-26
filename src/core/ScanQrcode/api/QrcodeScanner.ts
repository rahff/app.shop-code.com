import {VideoScanner} from '../spi/VideoScanner';
import {Result} from '../../Common/api/CommonTypes';
import {QrcodeVerifier} from '../rules/QrcodeVerifier';
import {CouponData} from './data';

export class QrcodeScanner {

  public constructor(private camera: VideoScanner,
                     private verifier: QrcodeVerifier) {}

  public scan(): Result<CouponData> {
    const scanned: string = this.camera.scan();
    return this.verifier.verify(scanned);
  }
}

