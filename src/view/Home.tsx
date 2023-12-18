import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="flex flex-col items-center justify-center py-40">
            <Link
                to="/chart"
                className="px-10 py-5 ring-4 ring-blue-400 bg-blue-400 rounded-3xl text-[25px] font-bold hover:text-white"
            >
                Go to App
            </Link>
        </div>
    );
}

export default Home;
