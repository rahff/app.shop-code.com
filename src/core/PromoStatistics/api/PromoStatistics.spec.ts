import {PromoStatisticApi} from '../spi/PromoStatisticApi';
import SpyObj = jasmine.SpyObj;
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {promo_statistic_initial_state, PromoStatistics} from './PromoStatistics';
import {InMemoryLocalStorage} from '../../Common/test-utils/in_memory.spec';
import {SELECTED_SHOP_KEY, STATS_PAGE} from '../../Common/constants';
import {fake_promo_stats_state, fake_shop_data} from '../../Common/test-utils/fixture.spec';
import {of, throwError} from 'rxjs';
import {InternalServerError} from '../../Common/api/Exception';




describe('PromoStatistics: A Business User looks at the statistics', () => {

  let statistic_api: SpyObj<PromoStatisticApi>;
  let local_storage: LocalStorageApi;

  const load_promo_stats = (promo_statistic: PromoStatistics) => {
    statistic_api.get_promo_statistics.and.returnValue(of({...fake_promo_stats_state}))
    return promo_statistic.get_promo_statistics();
  }
  beforeEach(() => {
    local_storage = new InMemoryLocalStorage();
    statistic_api = jasmine.createSpyObj("PromoStatisticApi", ["get_promo_statistics"]);
    local_storage.set_item(SELECTED_SHOP_KEY, {...fake_shop_data});
  })

  it("see a board with the last created promo", () => {
    statistic_api.get_promo_statistics.and.returnValue(of({...fake_promo_stats_state}))
    const promo_statistic = new PromoStatistics(statistic_api, local_storage);
    promo_statistic.get_promo_statistics().subscribe(() => {
      expect(promo_statistic.state).toEqual({...fake_promo_stats_state})
      expect(statistic_api.get_promo_statistics).toHaveBeenCalledOnceWith(fake_shop_data.id, 1)
      expect(local_storage.get_item(STATS_PAGE(fake_shop_data.id, 1))).toEqual({...fake_promo_stats_state.promo_stats})

    })
  });

  it("once a promo stats page is loaded, it does not call backend anymore", () => {
    const promo_statistics = new PromoStatistics(statistic_api, local_storage);
    load_promo_stats(promo_statistics).subscribe(() => {
      promo_statistics.get_promo_statistics().subscribe(() => {
        expect(statistic_api.get_promo_statistics).toHaveBeenCalledOnceWith(fake_shop_data.id, 1);
        expect(promo_statistics.state).toEqual({...fake_promo_stats_state})
      })
    })
  });

  it("calling api may failed", () => {
    statistic_api.get_promo_statistics.and.returnValue(throwError(() => new InternalServerError()))
    const promo_statistic = new PromoStatistics(statistic_api, local_storage);
    promo_statistic.get_promo_statistics().subscribe(() => {
      expect(promo_statistic.state).toEqual({...promo_statistic_initial_state, error: {message: new InternalServerError().message}})
      expect(statistic_api.get_promo_statistics).toHaveBeenCalledOnceWith(fake_shop_data.id, 1);
    })
  });

  it("some data are already stored in local storage when the user opens the app, it call backend to retrieve new data", () => {
    local_storage.set_item(STATS_PAGE(fake_shop_data.id, 1), {...fake_promo_stats_state.promo_stats})
    statistic_api.get_promo_statistics.and.returnValue(of({...fake_promo_stats_state}))
    const promo_statistic = new PromoStatistics(statistic_api, local_storage);
    promo_statistic.get_promo_statistics().subscribe(() => {
      expect(promo_statistic.state).toEqual({...fake_promo_stats_state});
      expect(statistic_api.get_promo_statistics).toHaveBeenCalled();
    })
  });
});
