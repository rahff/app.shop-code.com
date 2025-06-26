import {of, throwError} from 'rxjs';
import {ShopApi} from '../spi/ShopApi';
import {CreateShop} from './CreateShop';
import {fake_shop_data, fake_shop_form_data, user_logged_in} from '../../Common/test-utils/fixture.spec';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {InternalServerError, UpgradedPlanRequired} from '../../Common/api/Exception';
import {ShopFactory} from '../rules/ShopFactory';
import {IdGenerator} from '../../Common/spi/IdGenerator';
import SpyObj = jasmine.SpyObj;
import {
  AUTHENTICATION,
  CREATE_SHOP_ROUTE,
  ERROR_PAGE_ROUTE,
  MY_SHOPS_ROUTE, SHOP_LIST_KEY,
  UPGRADE_PLAN_ROUTE
} from '../../Common/constants';



describe('CreateShop: A Business User create a Shop to grouping its promo campaigns', () => {

  let shop_api: SpyObj<ShopApi>;
  let local_storage: SpyObj<LocalStorageApi>;
  let shop_factory: ShopFactory;
  let id_generator: SpyObj<IdGenerator>;

  beforeEach(() => {
    shop_api = jasmine.createSpyObj("ShopApi", ["save_shop"]);
    local_storage = jasmine.createSpyObj("LocalStorageApi", ["get_item", "add_item"]);
    id_generator = jasmine.createSpyObj("FakeIdGenerator", ["generate"]);
    shop_factory = new ShopFactory(id_generator);
    local_storage.get_item.withArgs(AUTHENTICATION).and.returnValue({...user_logged_in});
    id_generator.generate.and.returnValue(fake_shop_data.id);
  });

  it("A Shop with a name, a location and a already uploaded logo ", () => {
    shop_api.save_shop.and.returnValue(of(fake_shop_data));
    const create_shop = new CreateShop(shop_api, shop_factory, local_storage);
    const result = create_shop.create({...fake_shop_form_data});
    result.subscribe((redirection) => {
      expect(redirection.path).toEqual(MY_SHOPS_ROUTE);
      expect(local_storage.add_item).toHaveBeenCalledOnceWith(SHOP_LIST_KEY, {...fake_shop_data})
      expect(shop_api.save_shop).toHaveBeenCalledOnceWith(fake_shop_data);
    });

  });

  it("Create shop may fail due to subscription expired or require an upgrade", ()  => {
    const create_shop = new CreateShop(shop_api, shop_factory, local_storage);
    shop_api.save_shop.and.returnValue(throwError(() => new UpgradedPlanRequired()));
    const result = create_shop.create(fake_shop_form_data);
    result.subscribe((redirection) => {
      expect(redirection.path).toEqual(UPGRADE_PLAN_ROUTE);
      expect(redirection.params).toEqual({error: new UpgradedPlanRequired().message});
    });
  })

  it("Create shop may fail due to internal server error", ()  => {
    const create_shop = new CreateShop(shop_api, shop_factory, local_storage);
    shop_api.save_shop.and.returnValue(throwError(() => new InternalServerError()));
    const result = create_shop.create(fake_shop_form_data);
    result.subscribe((redirection) => {
      expect(redirection.path).toEqual(ERROR_PAGE_ROUTE);
      expect(redirection.params).toEqual({error: new InternalServerError().message, origin: CREATE_SHOP_ROUTE});
    });
  });
});
