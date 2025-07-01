import {UserSession} from "../core/UserSession/api/UserSession.ts";
import {localStorageApi} from "../services/browser/LocalStorageBrowserApi.ts";
import {userProfileApi} from "../services/external/HttpUserProfileApi.ts";



const userSessionFactory = () => new UserSession(localStorageApi, userProfileApi);
export const userSession = userSessionFactory();