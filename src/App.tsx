import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

import Header from "./components/layouts/header";
import Home from "./view/Home";
import Chart from "./view/Chart";
import SignIn from "./view/auth/SignIn";
import SignUp from "./view/auth/SignUp";
import Forgot from "./view/auth/Forgot";

const ProtectedRoute = () => {
    const isAuth = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

const AuthRoute = () => {
    const isAuth = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    return isAuth ? <Navigate to="/" /> : <Outlet />;
};

function App() {
    return (
        <div>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/chart" element={<Chart />} />
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
