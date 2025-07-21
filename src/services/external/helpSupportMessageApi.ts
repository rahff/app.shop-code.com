import {fakePostFetch, Fetch, handleResponse} from "../common.ts";
import {environment} from "../../environment.ts";
import {HelpSupportMessage} from "../../core/HelpSupport Message/api/HelpSupportMessage.ts";


const requestInit =
    (contactMessage: HelpSupportMessage): RequestInit =>
        ({method: 'POST', body: JSON.stringify(contactMessage), headers: {'Content-Type': 'application/json'}});
const helpSupportMessageApiCreator =
    (fetch: Fetch) =>
    (endpoint: string) =>
    async (contactMessage: HelpSupportMessage) => {
        return await fetch(endpoint, requestInit(contactMessage))
            .then(handleResponse<{success: boolean}>);
    }




export const helpSupportMessageApi =
    environment === "production" ?
        helpSupportMessageApiCreator(fetch) :
        helpSupportMessageApiCreator(fakePostFetch({success: true}));
