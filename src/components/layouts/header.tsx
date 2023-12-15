import { useState } from "react";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "../../Icon";

function Header() {
    const [openNav, setOpenNav] = useState<boolean>(false);

    return (
        // Main navigation container
        <nav className="sticky top-0 flex w-full flex-wrap items-center justify-between backdrop-blur-2xl py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700">
            <div className="flex w-full flex-wrap items-center justify-between px-3 py-3">
                <div>
                    <Link
                        className="mx-2 my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
                        to="/"
                    >
                        <img
                            className="mr-2 w-full sm:h-[40px]"
                            src="/assets/logo.png"
                            alt="TrV Logo"
                        />
                    </Link>
                </div>

                {/* <!-- Hamburger button for mobile view --> */}
                <button
                    className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {/* <!-- Hamburger icon --> */}
                    <HamburgerIcon />
                </button>

                {/* <!-- Collapsible navbar container --> */}
                <div className="mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto">
                    {/* <!-- Left links --> */}
                    <ul
                        className="list-style-none mr-auto flex flex-col pl-0 lg:mt-1 lg:flex-row"
                        data-te-navbar-nav-ref
                    >
                        {/* <li>
                            <a
                                href="#"
                                className="block py-2 pr-4 pl-3 text-black rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                            >
                                Home
                            </a>
                        </li> */}
                    </ul>

                    <div className="flex justify-center items-center gap-3">
                        <Link
                            to="/login"
                            className="text-gray-800 bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none transition-all duration-300"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/register"
                            className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none transition-all duration-300"
                        >
                            Sign Up For Free
                        </Link>
                    </div>
                </div>

                {/* Mobile Nav */}
                <div
                    className={`absolute top-full right-0 shadow-lg lg:hidden`}
                >
                    <div
                        className={
                            openNav
                                ? "overflow-hidden transition-all duration-500 h-auto"
                                : "overflow-hidden transition-all duration-500 h-0"
                        }
                    >
                        <div className="bg-white text-black px-10 py-2 flex flex-col items-center justify-center">
                            <Link
                                to="/login"
                                className="px-5 py-3 hover:text-blue-700"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="px-5 py-3 hover:text-blue-700"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
