import axios from "axios";
import { AUTH_KEY } from "../redux/reducers/auth/key";

export const AuthApi = axios.create({
    baseURL: process.env.REACT_APP_BACKENDURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: localStorage.getItem(AUTH_KEY),
    },
});

export const NormalApi = axios.create({
    baseURL: process.env.REACT_APP_BACKENDURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //'Authorization': ''
    },
});
