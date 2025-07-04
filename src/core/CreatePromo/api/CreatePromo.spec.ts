import {CreatePromo} from './CreatePromo';
import {PromoApi} from '../spi/PromoApi';
import {Observable, of, throwError} from 'rxjs';
import {PromoFormData} from './data';
import {
  create_promo_with_valid_form_data,
  fake_promo_data,
  fake_shop_data,
  form_data_with_invalid_date_range
} from '../../Common/test-utils/fixture.spec';
import {InternalServerError, InvalidDateRange, UpgradedPlanRequired} from '../../Common/api/Exception';
import {DateProvider} from '../../Common/spi/DateProvider';
import {PromoValidation} from '../rules/PromoValidation';
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import SpyObj = jasmine.SpyObj;
import {
  CREATE_PROMO_ROUTE,
  DASHBOARD_ROUTE,
  ERROR_PAGE_ROUTE, SELECTED_SHOP_KEY,
  UPGRADE_PLAN_ROUTE
} from '../../Common/constants';
import {Redirection} from '../../Common/api/CommonTypes';
import {promo_list_key} from '../../ListPromos/api/PromoList';




describe('CreatePromo: A Business user create a promo with a name, description, an already uploaded coupon image and a promo validity date range', () => {

  let promo_repository: SpyObj<PromoApi>;

  let date_provider: DateProvider;
  let promo_validator: PromoValidation;
  let local_storage: SpyObj<LocalStorageApi>;

  const create_promo_with = (promo_form_data: PromoFormData): Observable<Redirection> => {
    const create_promo = new CreatePromo(promo_repository, promo_validator, local_storage);
    return create_promo.create(promo_form_data);
  }

  beforeEach(() => {
    promo_repository = jasmine.createSpyObj("PromoApi", ["save_promo"]);
    date_provider = new FakeDateProvider();
    promo_validator = new PromoValidation(date_provider);
    local_storage = jasmine.createSpyObj("LocalStorageApi", ["get_item", "add_item"]);
    local_storage.get_item.withArgs(SELECTED_SHOP_KEY).and.returnValue({...fake_shop_data});
  })

  it("the promo is successfully created, the user is redirected to the promo list page", async () => {
    promo_repository.save_promo.and.returnValue(of(fake_promo_data));
    const result = create_promo_with(create_promo_with_valid_form_data);
    result.subscribe((redirection) => {
      expect(redirection.path).toEqual(DASHBOARD_ROUTE);
      expect(local_storage.add_item).toHaveBeenCalledWith(promo_list_key(fake_promo_data.shop_id), {...fake_promo_data})
      expect(promo_repository.save_promo).toHaveBeenCalledOnceWith(fake_promo_data);
    });
  })

  it("But a promo must have a coherent validity date range", async () => {
    const result = create_promo_with(form_data_with_invalid_date_range);
    result.subscribe((redirection) => {
      expect(redirection.path).toEqual(CREATE_PROMO_ROUTE);
      expect(redirection.params).toEqual({error: new InvalidDateRange().message});
      expect(promo_repository.save_promo).not.toHaveBeenCalledWith(fake_promo_data);
    });
  });

  it("Create a Promo may fail due to subscription expired or require an upgrade", async () => {
    promo_repository.save_promo.and.returnValue(throwError(() => new UpgradedPlanRequired()));
    const result = create_promo_with(create_promo_with_valid_form_data);
    result.subscribe((redirection) => {
      expect(redirection.path).toEqual(UPGRADE_PLAN_ROUTE);
      expect(redirection.params).toEqual({error: new UpgradedPlanRequired().message});
    });
  });

  it("Create a Promo may fail due to internal server error", async () => {
    promo_repository.save_promo.and.returnValue(throwError(() => new InternalServerError()));
    const result = create_promo_with(create_promo_with_valid_form_data);
    result.subscribe((redirection) => {
      expect(redirection.path).toEqual(ERROR_PAGE_ROUTE);
      expect(redirection.params).toEqual({error: new InternalServerError().message, origin: CREATE_PROMO_ROUTE});
    });
  });
});


class FakeDateProvider implements DateProvider {
  todayString(): string {
      return this.today().toLocaleDateString()
  }
  public today(): Date {
    return new Date(fake_promo_data.created_at);
  }
}
