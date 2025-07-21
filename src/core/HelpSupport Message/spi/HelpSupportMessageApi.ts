import {Exception} from "../../Common/api/Exception.ts";
import {HelpSupportMessage} from "../api/HelpSupportMessage.ts";

export type HelpSupportMessageApi = (contactMessage: HelpSupportMessage) => Promise<{success: boolean} | Exception>;