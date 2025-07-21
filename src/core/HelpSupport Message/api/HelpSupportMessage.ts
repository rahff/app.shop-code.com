import {HelpSupportMessageApi} from "../spi/HelpSupportMessageApi.ts";
import {Exception, isException} from "../../Common/api/Exception.ts";


export interface HelpSupportMessage {
    customerEmail: string,
    subject: string,
    message: string
}

export type SendHelpSupportMessage = (helpSupportMessage: HelpSupportMessage) => Promise<{success: boolean}>;

const handleResponse = (response: {success: boolean} | Exception) => {
    if(isException(response)) return {success: false};
    else return {success: true};
}

export const sendHelpSupportMessageCreator =
    (messageApi: HelpSupportMessageApi): SendHelpSupportMessage =>
    async (helpSupportMessage: HelpSupportMessage) => {
        return messageApi(helpSupportMessage)
            .then(handleResponse)
    }
