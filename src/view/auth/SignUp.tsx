import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { LoadingIcon } from "../../Icon";
import Action from "../../service";

function SignUp() {
    const navigate = useNavigate();
    const [agree, setAgree] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .matches(
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    "Email invalid"
                )
                .required("you need to input email"),
            username: Yup.string()
                .min(3, "Must be 3 characters or high")
                .required("you need to input username"),
            password: Yup.string()
                .min(8, "Must be 8 characters or high")
                .required("you need to input password"),
        }),
        onSubmit: async (values: SignValidInterface) => {
            setLoading(true);
            const { success, msg } = await Action.Registry(values);
            setLoading(false);

            if (success) {
                toast.success(msg);
                navigate("/login");
            } else {
                toast.error(msg);
            }
        },
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-28 w-auto"
                    src="/assets/brand.png"
                    alt="Your Company"
                />
                <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create your Free Account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Your Email
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
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <div className="pl-1 text-red-600">
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </div>

                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Your Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                className={
                                    "block w-full rounded-md border-0 py-1.5 px-2 outline-none text-gray-900 bg-zinc-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 " +
                                    (formik.touched.username &&
                                    formik.errors.username
                                        ? "focus:ring-red-600"
                                        : "focus:ring-indigo-600")
                                }
                                placeholder="jenisben"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                            />
                        </div>
                        {formik.touched.username && formik.errors.username ? (
                            <div className="pl-1 text-red-600">
                                {formik.errors.username}
                            </div>
                        ) : null}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Password
                        </label>
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
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="pl-1 text-red-600">
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded outline-none bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                onClick={() => setAgree(!agree)}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label
                                htmlFor="terms"
                                className="font-light text-gray-500 dark:text-gray-300"
                            >
                                By signing up, you are creating a Flowbite
                                account, and you agree to Flowbite’s Terms of
                                Use{" "}
                                <Link
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    to=""
                                >
                                    Terms and Conditions
                                </Link>{" "}
                                and{" "}
                                <Link
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    to=""
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </label>
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
                            disabled={!agree}
                        >
                            Create an account
                        </button>
                    )}
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
