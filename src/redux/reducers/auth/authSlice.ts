import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "./auth";
import { jwtDecode } from "jwt-decode";
import { AUTH_KEY } from "./key";

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    authStatus: "idle" | "pending" | "failed";
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        authStatus: "idle",
    } as AuthState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decoded: any = jwtDecode(action.payload);
            state.user = {
                email: decoded.email,
                username: decoded.username,
            };

            decoded.exp > Math.floor(Date.now() / 1000)
                ? (state.isAuthenticated = true)
                : logout();
        },
        logout: (state) => {
            state.user = null;
            state.authStatus = "idle";
            state.isAuthenticated = false;
            localStorage.removeItem(AUTH_KEY);
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.signIn.matchFulfilled,
            (state, { payload: { token } }) => {
                state.authStatus = "idle";
                localStorage.setItem(AUTH_KEY, token);
            }
        );
        builder.addMatcher(api.endpoints.signIn.matchPending, (state) => {
            state.authStatus = "pending";
        });
        builder.addMatcher(api.endpoints.signUp.matchPending, (state) => {
            state.authStatus = "pending";
        });
        builder.addMatcher(
            api.endpoints.gsignin.matchFulfilled,
            (state, { payload: { token } }) => {
                state.authStatus = "idle";
                localStorage.setItem(AUTH_KEY, token);
            }
        );
    },
});

export const { setUser, logout } = authSlice.actions;

// Default App
export default authSlice.reducer;
