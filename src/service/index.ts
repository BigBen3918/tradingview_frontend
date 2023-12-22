/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AUTH_KEY } from "../redux/reducers/auth/key";

const BASEURL: string =
    process.env.REACT_APP_BACKENDURL || "http://127.0.0.1/api";

const Registry = async (param: SignValidInterface) => {
    try {
        const config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        const result: any = await axios.post(
            BASEURL + "/signup",
            param,
            config
        );

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
    const authToken = localStorage.getItem(AUTH_KEY) || "";

    const config = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: authToken,
        },
    };

    const { data } = await axios.post(BASEURL + "/gettokens", {}, config);

    return data.tokens;
};

// Export Functions
const Action = {
    Registry,
    GetTradeToken,
};

export default Action;
