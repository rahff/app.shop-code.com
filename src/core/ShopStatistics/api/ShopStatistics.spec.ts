import {ShopStatisticApi} from '../spi/ShopStatisticApi';
import SpyObj = jasmine.SpyObj;
import {LocalStorageApi} from '../../Common/spi/LocalStorageApi';
import {InMemoryLocalStorage} from '../../Common/test-utils/in_memory.spec';
import {shop_stats_key, ShopStatistics} from './ShopStatistics';
import {Observable, of} from 'rxjs';
import {fake_shop_data, fake_shop_stats} from '../../Common/test-utils/fixture.spec';
import {SELECTED_SHOP_KEY} from '../../Common/constants';



describe("ShopStatistics: A Business User want see statistics", () => {

  let statistic_api: SpyObj<ShopStatisticApi>;
  let local_storage: LocalStorageApi;
  let shop_statistics: ShopStatistics;
  const shop_id = fake_shop_data.id;
  const load_stats = (shop_statistics: ShopStatistics): Observable<boolean> => {
    statistic_api.get_shop_statistics.and.returnValue(of({...fake_shop_stats}))
    return shop_statistics.shop_stats()
  }
  beforeEach(() => {
    statistic_api = jasmine.createSpyObj("StatisticsApi", ["get_shop_statistics"]);
    local_storage = new InMemoryLocalStorage();
    local_storage.set_item(SELECTED_SHOP_KEY, {...fake_shop_data});
    shop_statistics = new ShopStatistics(statistic_api, local_storage);
  });

  it("should be able to see the shop statistics", () => {
    load_stats(shop_statistics).subscribe(() => {
      expect(shop_statistics.state).toEqual({...fake_shop_stats})
      expect(statistic_api.get_shop_statistics).toHaveBeenCalledOnceWith(shop_id)
    })
  });

  it("once the shop statistics are loaded, we can get it from local storage", () => {
     load_stats(shop_statistics).subscribe(() => {
        expect(local_storage.get_item(shop_stats_key(shop_id))).toEqual({...fake_shop_stats})
     })
  });

  it("should call backend api on first loading stats even there is local data available", () => {
     local_storage.set_item(shop_id, {...fake_shop_stats});
     load_stats(shop_statistics).subscribe(() => {
       expect(statistic_api.get_shop_statistics).toHaveBeenCalledOnceWith(fake_shop_data.id)
       expect(shop_statistics.state).toEqual({...fake_shop_stats});
     })
  });
})
