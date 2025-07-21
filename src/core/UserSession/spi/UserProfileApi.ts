import {UserProfile} from '../api/data';
import {Exception} from "../../Common/api/Exception.ts";



export type UserProfileApi = (token: string) => Promise<UserProfile | Exception>;