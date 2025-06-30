import {AuthenticationProvider} from "../core/AuthenticationProvider/api/AuthenticationProvider.ts";
import { localStorageApi } from "../services/browser/LocalStorageBrowserApi.ts";
import {authenticationApi} from "../services/external/OIDCService.ts";



export const authenticationProviderFactory = () => new AuthenticationProvider(localStorageApi, authenticationApi);
