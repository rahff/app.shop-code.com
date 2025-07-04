import {UserSession} from "../core/UserSession/api/UserSession.ts";
import {localStorageApi} from "../services/browser/LocalStorageBrowserApi.ts";
import {inMemoryUserProfileApi} from "../services/inMemory/InMemoryUserProfileApi.ts";



const userSessionFactory = () => new UserSession(localStorageApi, inMemoryUserProfileApi);
export const userSession = userSessionFactory();