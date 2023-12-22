import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//example from https://redux-toolkit.js.org/rtk-query/usage/examples#authentication
export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BACKENDURL,
        // prepareHeaders: (headers) => {
        //     // By default, if we have a token in the store, let's use that for authenticated requests
        //     const token = localStorage.getItem("tradeToken");
        //     if (token) {
        //         headers.set("authorization", `${token}`);
        //     }
        //     return headers;
        // },
    }),
    endpoints: (builder) => ({
        signIn: builder.mutation<{ token: string }, SignValidInterface>({
            query: (credentials) => ({
                url: "signin",
                method: "POST",
                body: credentials,
            }),
        }),
        gsignin: builder.mutation<{ token: string }, { token: string }>({
            query: (credentials) => ({
                url: "g-login",
                method: "POST",
                body: credentials,
            }),
        }),
        signUp: builder.mutation<{ message: string }, void>({
            query: () => "protected",
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation, useGsigninMutation } = api;
