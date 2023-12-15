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

const Login = async (param: SignValidInterface) => {
    try {
        const result: any = await NormalApi.post("/signin", param);

        if (result.data.token) {
            return {
                success: true,
                msg: "Welcome to Trading View",
                token: result.data.token,
            };
        } else {
            throw new Error("Failed Login");
        }
    } catch (err: any) {
        return {
            success: false,
            msg: err.response.data || err.message || "Failed Login",
        };
    }
};

// Export Functions
const Action = {
    Registry,
    Login,
};

export default Action;
