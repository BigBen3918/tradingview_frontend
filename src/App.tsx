import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { logout, setUser } from "./redux/reducers/auth/authSlice";
import { AUTH_KEY } from "./redux/reducers/auth/key";

import Header from "./components/layouts/header";
import Home from "./view/Home";
import SignIn from "./view/auth/SignIn";
import SignUp from "./view/auth/SignUp";
import Forgot from "./view/auth/Forgot";

const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    const authToken = localStorage.getItem(AUTH_KEY);
    if (!authToken) {
        dispatch(logout());
    } else {
        dispatch(setUser(authToken));
    }

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

const AuthRoute = () => {
    const isAuth = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    return isAuth ? <Navigate to="/dashboard" /> : <Outlet />;
};

function App() {
    return (
        <div>
            <Header />

            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Home />} />
                </Route>
                <Route element={<AuthRoute />}>
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/forgot" element={<Forgot />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
