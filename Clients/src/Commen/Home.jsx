import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-gray-700 mb-4">
          Welcome to Your Future!
        </h1>
        <p className="text-2xl mb-6">
          The best time to start is now. Let’s get you started on your journey.
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-500 py-3 px-6 rounded-full font-semibold text-lg transition duration-300 hover:bg-blue-100"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="bg-transparent border-2 border-white text-gray-700 py-3 px-6 rounded-full font-semibold text-lg transition duration-300 hover:bg-white hover:text-blue-500"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
