/* eslint-disable @typescript-eslint/no-explicit-any */
import { NormalApi, AuthApi } from "./http-common";

const Registry = async (param: SignValidInterface) => {
    try {
        const result: any = await NormalApi.post("/signup", param);

        if (result.data) {
            return { success: true, msg: result.data };
        } else {
            throw new Error("Failed SignUp");
        }
    } catch (err: any) {
        return {
            success: false,
            msg: err.response.data || err.message || "Failed SignUp",
        };
    }
};

const GetTradeToken = async () => {
    try {
        const { data } = await AuthApi.post("/gettokens");

        return data.tokens;
    } catch (err) {
        return [];
    }
};

// Export Functions
const Action = {
    Registry,
    GetTradeToken,
};

export default Action;
