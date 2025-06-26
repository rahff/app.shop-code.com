import {UserSession} from './UserSession';
import {
  AUTHENTICATION,
  LOGIN_ROUTE,
  MY_SHOPS_ROUTE, REFRESH_SESSION_ROUTE,
  SELECTED_SHOP_KEY, SET_CONFIG_ROUTE
} from '../../Common/constants';
import SpyObj = jasmine.SpyObj;
import {
  fake_shop_data,
  fake_user_profile,
  user_logged_in,
  user_signed_up, fake_user_profile_signup
} from '../../Common/test-utils/fixture.spec';
import {InMemoryLocalStorage} from '../../Common/test-utils/in_memory.spec';

import {UserProfileApi} from '../spi/UserProfileApi';
import {of} from 'rxjs';



describe('UserSession: A business User using the app', () => {

  let local_storage: InMemoryLocalStorage;
  let user_profile_api: SpyObj<UserProfileApi>;


  const when_the_user_is_logged_in = () => {
    local_storage.set_item(AUTHENTICATION, user_logged_in);
  }
  const when_the_user_signed_up = () => {
    local_storage.set_item(AUTHENTICATION, user_signed_up);
  }
  const when_the_user_was_redirected_after_refresh_session = () => {
    local_storage.set_item(AUTHENTICATION, user_logged_in);
    user_profile_api.get_user_profile.and.returnValue(of({...fake_user_profile_signup}));
  }
  const when_the_user_unlogged = () => {
    local_storage.clear()
  }
  const the_authentication_data_was_persisted_locally = () => {
    expect(local_storage.get_item(AUTHENTICATION)).toEqual(user_logged_in);
  }
  const user_session_hold_authentication = (user_session: UserSession) => {
    expect(user_session.its_authentication()).toEqual({...user_logged_in});
  }

  beforeEach(() => {
    local_storage = new InMemoryLocalStorage();
    user_profile_api = jasmine.createSpyObj("UserProfileApi", ["get_user_profile"]);
    user_profile_api.get_user_profile.and.returnValue(of({...fake_user_profile}));
  })

  it("open the app for the first time, he signed up", async () => {
    when_the_user_unlogged();
    when_the_user_signed_up();
    const user_session = new UserSession(local_storage, user_profile_api);
    const redirection = await user_session.load();
    expect(redirection.path).toEqual(REFRESH_SESSION_ROUTE);
  });

  it("after sign up, it must config region for its account", async () => {
    when_the_user_was_redirected_after_refresh_session();
    const user_session = new UserSession(local_storage, user_profile_api);
    const redirection = await user_session.load();
    expect(redirection.path).toEqual(SET_CONFIG_ROUTE);
  })

  it('open the app, as unlogged user', async () => {
    when_the_user_unlogged();
    const user_session = new UserSession(local_storage, user_profile_api);
    const redirection = await user_session.load();
    expect(user_session.its_authentication()).toBeNull();
    expect(redirection).toEqual({path: LOGIN_ROUTE});
  });


  it("later, he logged in", async () => {
    local_storage.set_item(AUTHENTICATION, {...user_logged_in});
    const user_session = new UserSession(local_storage, user_profile_api);
    const redirection = await user_session.load();
    user_session_hold_authentication(user_session);
    the_authentication_data_was_persisted_locally();
    expect(redirection).toEqual({path: MY_SHOPS_ROUTE});
  });

  it("when he logged in, it's profile is available", async () => {
    local_storage.set_item(AUTHENTICATION, {...user_logged_in});
    user_profile_api.get_user_profile.and.returnValue(of({...fake_user_profile}));
    const user_session = new UserSession(local_storage, user_profile_api);
    const redirection = await user_session.load();
    expect(user_session.its_profile()).toEqual(fake_user_profile);
    expect(redirection).toEqual({path: MY_SHOPS_ROUTE});
  });

  it('select one of its Shop to do business actions on it', () => {
    when_the_user_is_logged_in();
    const user_session = new UserSession(local_storage, user_profile_api);
    user_session.shop_selected({...fake_shop_data});
    expect(local_storage.get_item(SELECTED_SHOP_KEY)).toEqual({...fake_shop_data})
    expect(user_session.its_selected_shop()).toEqual({...fake_shop_data});
  });

  it('returns in the app later, he retrieves its session', async () => {
    when_the_user_is_logged_in();
    const user_session = new UserSession(local_storage, user_profile_api);
    const redirection = await user_session.load();
    user_session_hold_authentication(user_session);
    expect(redirection).toEqual({path: MY_SHOPS_ROUTE});
  });

  it('he select a shop, then, the page reloads, he must keeps the shop_id ref', async () => {
    local_storage.set_item(SELECTED_SHOP_KEY, {...fake_shop_data});
    when_the_user_is_logged_in();
    const user_session = new UserSession(local_storage, user_profile_api);
    await user_session.load();
    expect(user_session.its_selected_shop()).toEqual({...fake_shop_data});
  });
});


