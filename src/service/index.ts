/* eslint-disable @typescript-eslint/no-explicit-any */
import { NormalApi } from "./http-common";

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

// Export Functions
const Action = {
    Registry,
};

export default Action;
