import SpyObj = jasmine.SpyObj;
import {Observable, of, throwError} from 'rxjs';
import {promo_list_key, PromoList} from './PromoList';
import {PromoListApi} from '../spi/PromoListApi';
import {InMemoryLocalStorage} from '../../Common/test-utils/in_memory.spec';
import {InternalServerError} from '../../Common/api/Exception';
import {shop_id, shop_promo_list} from '../../Common/test-utils/fixture.spec';





describe('ListPromos: A Business User see a promo list for a for one of its shop', () => {
  let promo_list_gateway: SpyObj<PromoListApi>;
  let local_storage: InMemoryLocalStorage;

  const load_promo_list_for_a_shop = (promo_list: PromoList): Observable<boolean> => {
    promo_list_gateway.get_shop_promos.and.returnValue(of({...shop_promo_list}));
    return promo_list.promo_of_shop(shop_id)
  };

  beforeEach(() => {
    promo_list_gateway = jasmine.createSpyObj("PromoListApi", ["get_shop_promos"]);
    local_storage = new InMemoryLocalStorage();
  });

  it("it get a promo list for a shop, it call backend external", () => {
     promo_list_gateway.get_shop_promos.and.returnValue(of({...shop_promo_list}));
    const promo_list = new PromoList(promo_list_gateway, local_storage);
    promo_list.promo_of_shop(shop_id).subscribe(() => {
      expect(promo_list_gateway.get_shop_promos).toHaveBeenCalledOnceWith(shop_id);
      expect(promo_list.state.promos).toEqual({...shop_promo_list});
    });
  })

  it("it may failed due to network error", () => {
    promo_list_gateway.get_shop_promos.and.returnValue(throwError(() => new InternalServerError()));
    const promo_list = new PromoList(promo_list_gateway, local_storage);
    promo_list.promo_of_shop(shop_id).subscribe(() => {
      expect(promo_list_gateway.get_shop_promos).toHaveBeenCalledOnceWith(shop_id);
      expect(promo_list.state.error).toEqual({message: new InternalServerError().message});
    });
  });

  it("the promo list is already loaded, it does not call backend external again", () => {
    const promo_list = new PromoList(promo_list_gateway, local_storage);
    load_promo_list_for_a_shop(promo_list).subscribe(() => {
      promo_list.promo_of_shop(shop_id).subscribe(() => {
        expect(promo_list_gateway.get_shop_promos).toHaveBeenCalledOnceWith(shop_id);
        expect(promo_list.state.promos).toEqual({...shop_promo_list});
        expect(local_storage.get_item(promo_list_key(shop_id))).toEqual({...shop_promo_list});
      })
    })
  })
})

