
import {Result} from '../../Common/api/CommonTypes';
import {QrcodeVerifier} from '../rules/QrcodeVerifier';
import {CouponData} from './data';

export class QrcodeScanner {

  public constructor(private verifier: QrcodeVerifier) {}

  public scan(scanned: string): Result<CouponData> {
    return this.verifier.verify(scanned);
  }
}

