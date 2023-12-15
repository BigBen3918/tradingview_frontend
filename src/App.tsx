import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/layouts/header";
import Home from "./view/Home";
import SignIn from "./view/auth/SignIn";
import SignUp from "./view/auth/SignUp";

import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
            </Routes>

            <ToastContainer />
        </div>
    );
}

export default App;
