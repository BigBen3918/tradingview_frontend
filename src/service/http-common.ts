import axios from "axios";

export const AuthApi = axios.create({
    baseURL: process.env.REACT_APP_BACKENDURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("trade_token"),
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
