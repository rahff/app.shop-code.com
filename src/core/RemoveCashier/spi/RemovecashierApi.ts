import {Exception} from "../../Common/api/Exception.ts";

export type RemoveCashierApi = (username: string, userId: string, userPoolId: string) => Promise<{success: boolean} | Exception>;
