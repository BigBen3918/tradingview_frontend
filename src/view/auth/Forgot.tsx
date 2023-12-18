import { toast } from "react-toastify";

function Forgot() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const submit = (event: any) => {
        event.preventDefault();
        toast.info("Please wait a moment");
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
                    Reset Your Password
                </h2>
                <p className="mt-1 text-center text-lg font-medium leading-9 tracking-tight text-gray-900">
                    Enter your recovery email
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <form onSubmit={submit} className="space-y-6">
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
                                className="block w-full rounded-md border-0 focus:ring-indigo-600 py-1.5 px-2 outline-none text-gray-900 bg-zinc-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 "
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-zinc-500 disabled:cursor-not-allowed"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Forgot;
