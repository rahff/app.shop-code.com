
import {VideoScanner} from '../spi/VideoScanner';
import {err, ok} from '../../Common/api/CommonTypes';
import SpyObj = jasmine.SpyObj;
import {QrcodeVerifier} from '../rules/QrcodeVerifier';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {NotRecognized, PromoExpired, PromoNotYetStarted, WrongShop} from '../../Common/api/Exception';
import {DateProvider} from '../../Common/spi/DateProvider';
import {QrcodeScanner} from './QrcodeScanner';
import {fake_promo} from '../../Common/test-utils/fixture.spec';




const notAPromoQrcode = "{'id':'123'}";

const TODAY = new Date("2025-05-03");

const PROMO_WITH_WRONG_SHOP_ID = JSON.stringify({...fake_promo, shop_id: "456"});

const create_scanner = (
  local_storage: SpyObj<LocalStorageApi>,
  video_scanner: SpyObj<VideoScanner>,
  date_provider: SpyObj<DateProvider>): QrcodeScanner => {
  const qrcode_verifier = new QrcodeVerifier(local_storage, date_provider);
  return new QrcodeScanner(video_scanner, qrcode_verifier);
}

describe('A Cashier scan a qrcode;', () => {

  let local_storage: SpyObj<LocalStorageApi>;
  let video_scanner: SpyObj<VideoScanner>;
  let date_provider: SpyObj<DateProvider>;

  const when_promo_is_valid = () => {
    video_scanner.scan.and.returnValue(JSON.stringify(fake_promo));
    local_storage.get_item.and.returnValue(fake_promo.shop_id);
    date_provider.today.and.returnValue(TODAY);
  }
  const when_promo_is_not_belong_to_this_shop = () => {
    video_scanner.scan.and.returnValue(PROMO_WITH_WRONG_SHOP_ID);
    local_storage.get_item.and.returnValue("789");
    date_provider.today.and.returnValue(TODAY);
  }
  const when_promo_is_expired = () => {
    video_scanner.scan.and.returnValue(JSON.stringify(fake_promo));
    local_storage.get_item.and.returnValue(fake_promo.shop_id);
    date_provider.today.and.returnValue(new Date("2025-05-05"));
  }
  const when_promo_is_not_started_yet = () => {
    video_scanner.scan.and.returnValue(JSON.stringify(fake_promo));
    local_storage.get_item.and.returnValue(fake_promo.shop_id);
    date_provider.today.and.returnValue(new Date("2025-05-02"));
  }
  const when_is_not_a_valid_qrcode = () => {
    video_scanner.scan.and.returnValue(JSON.stringify(notAPromoQrcode));
    local_storage.get_item.and.returnValue(fake_promo.shop_id);
    date_provider.today.and.returnValue(TODAY);
  }

  beforeEach(() => {
    local_storage = jasmine.createSpyObj("FakeLocalStorage", ["get_item"]);
    video_scanner = jasmine.createSpyObj("FakeVideoScanner", ["scan"]);
    date_provider = jasmine.createSpyObj("FakeDateProvider", ["today"]);
  })

  it('the qrcode is a valid promo', () => {
    when_promo_is_valid();
    const qrcode_scanner = create_scanner(local_storage, video_scanner, date_provider);
    const scanner_output = qrcode_scanner.scan();
    expect(scanner_output).toEqual(ok(fake_promo));
  });

  it("the qrcode is not affiliate to the shop", () => {
    when_promo_is_not_belong_to_this_shop();
    const qrcode_scanner = create_scanner(local_storage, video_scanner, date_provider);
    const scanner_output = qrcode_scanner.scan();
    expect(scanner_output).toEqual(err(new WrongShop()));
  })

  it("the promo was expired", () => {
    when_promo_is_expired();
    const qrcode_scanner = create_scanner(local_storage, video_scanner, date_provider);
    const scanner_output = qrcode_scanner.scan();
    expect(scanner_output).toEqual(err(new PromoExpired()));
  })

  it("the promo not started yet", () => {
    when_promo_is_not_started_yet();
    const qrcode_scanner = create_scanner(local_storage, video_scanner, date_provider);
    const scanner_output = qrcode_scanner.scan();
    expect(scanner_output).toEqual(err(new PromoNotYetStarted()));
  })

  it("its a wrong, or not recognized qrcode", () => {
    when_is_not_a_valid_qrcode();
    const qrcode_scanner = create_scanner(local_storage, video_scanner, date_provider);
    const scanner_output = qrcode_scanner.scan();
    expect(scanner_output).toEqual(err(new NotRecognized()));
  })
})


