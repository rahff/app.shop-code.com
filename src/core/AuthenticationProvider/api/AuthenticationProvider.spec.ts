import {AuthenticationApi} from '../spi/AuthenticationApi';
import { AuthenticationProvider } from './AuthenticationProvider';
import SpyObj = jasmine.SpyObj;
import {AUTHENTICATION} from '../../Common/constants';
import {user_logged_in} from '../../Common/test-utils/fixture.spec';
import {InMemoryLocalStorage} from '../../Common/test-utils/in_memory.spec';
import {of} from 'rxjs';



describe('AuthenticationProvider: A Business User logged in, an authentication code is provided by authentication service', () => {

  let authentication_api: SpyObj<AuthenticationApi>;
  let authentication_provider: AuthenticationProvider;
  let local_storage: InMemoryLocalStorage;

  const when_the_user_is_already_logged_in = () => {
    authentication_api.authenticate.and.returnValue(of({...user_logged_in}));
    local_storage.set_item(AUTHENTICATION, {...user_logged_in});
  }
  const when_the_user_is_unlogged = () => {
    authentication_api.authenticate.and.returnValue(of(null));
    local_storage.clear()
  }
  beforeEach(() => {
    authentication_api = jasmine.createSpyObj("AuthenticationApi", ["authenticate", "login", "logout"]);
    local_storage = new InMemoryLocalStorage();
    authentication_provider = new AuthenticationProvider(local_storage, authentication_api);
  });

  it("the user logs in", async () => {
    when_the_user_is_unlogged();
    authentication_api.authenticate.and.returnValue(of({...user_logged_in}));
    authentication_provider.auto_login().subscribe((authentication) => {
      expect(authentication).toEqual({...user_logged_in});
      expect(local_storage.get_item(AUTHENTICATION)).toEqual({...user_logged_in});
    });


  })

  it("the user is already logged in, it retrieve its identity from local storage", async () => {
    when_the_user_is_already_logged_in();
    authentication_provider.auto_login().subscribe((authentication) => {
      expect(authentication).toEqual(user_logged_in);
    });

  });

})

