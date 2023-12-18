import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer, Slide } from "react-toastify";
import App from "./App.tsx";
import { store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const client_ID =
    process.env.REACT_APP_CLIENTID ||
    "199046025326-i7uti7dcg2vbo78vm8esb96kokmgl246.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <GoogleOAuthProvider clientId={client_ID}>
                <Router>
                    <App />

                    <ToastContainer
                        position="top-right"
                        autoClose={115000}
                        hideProgressBar={true}
                        newestOnTop={true}
                        closeOnClick={true}
                        rtl={false}
                        pauseOnHover={true}
                        draggable={true}
                        pauseOnFocusLoss={true}
                        transition={Slide}
                    />
                </Router>
            </GoogleOAuthProvider>
        </Provider>
    </React.StrictMode>
);
