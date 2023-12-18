import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { setUser } from "../../redux/reducers/auth/authSlice";
import { useSignInMutation } from "../../redux/reducers/auth/auth";
import { AppleIcon, LoadingIcon } from "../../Icon";
import { GoogleLogin } from "@react-oauth/google";

function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [signin] = useSignInMutation();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .matches(
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    "Email invalid"
                )
                .required("you need to input email"),
            password: Yup.string()
                .min(8, "Must be 8 characters or high")
                .required("you need to input password"),
        }),
        onSubmit: async (values: SignValidInterface) => {
            setLoading(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data, error }: any = await signin(values);
            setLoading(false);

            if (!error) {
                dispatch(setUser(data.token));
                toast.success("Welcome");
                navigate("/dashboard");
            } else {
                toast.error(error.data || "Failed SignIn");
            }
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseMessage = (response: any) => {
        console.log(response);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-28 w-auto"
                    src="/assets/brand.png"
                    alt="Your Company"
                />
                <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Welcome back
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mt-5">
                    <div className="flex justify-center items-center gap-5 flex-wrap sm:flex-nowrap">
                        <GoogleLogin
                            onSuccess={responseMessage}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                            useOneTap
                        />
                        {/* <button
                            type="submit"
                            className="flex items-center gap-2 w-full justify-center rounded-md bg-transparent px-3 py-1.5 border-[1px] border-zinc-300 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-zinc-100"
                        >
                            <GoogleIcon />
                            Log in with Google
                        </button> */}
                        <button
                            type="submit"
                            className="flex items-center gap-2 w-full justify-center rounded-md bg-transparent px-3 py-1.5 border-[1px] border-zinc-300 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-zinc-100"
                        >
                            <AppleIcon />
                            Log in with Apple
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-5 py-5">
                        <div className="h-0.5 bg-zinc-300 w-full"></div>
                        <div>or</div>
                        <div className="h-0.5 bg-zinc-300 w-full"></div>
                    </div>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className={
                                    "block w-full rounded-md border-0 py-1.5 px-2 outline-none text-gray-900 bg-zinc-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 " +
                                    (formik.touched.email && formik.errors.email
                                        ? "focus:ring-red-600"
                                        : "focus:ring-indigo-600")
                                }
                                placeholder="name@company.com"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="pl-1 text-red-600">
                                    {formik.errors.email}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <Link
                                    to="/forgot"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className={
                                    "block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-zinc-50 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 " +
                                    (formik.touched.password &&
                                    formik.errors.password
                                        ? "focus:ring-red-600"
                                        : "focus:ring-indigo-600")
                                }
                                placeholder="********"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
                                <div className="pl-1 text-red-600">
                                    {formik.errors.password}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {loading ? (
                        <button
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm cursor-auto"
                            disabled={true}
                        >
                            <LoadingIcon />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-zinc-500 disabled:cursor-not-allowed"
                        >
                            Sign In
                        </button>
                    )}
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account yet?{" "}
                    <Link
                        to="/register"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignIn;
