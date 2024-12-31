import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 bg-transparent px-4">
      <div>
        <Link
          to="/"
          className="px-4 py-2 text-gray-800 bg-transparent border border-gray-700 rounded-lg shadow-sm transition-transform hover:scale-105 focus:ring-2 focus:ring-gray-600"
        >
          Home
        </Link>
      </div>

      <div className="flex gap-4 justify-center items-center mx-auto">
        <Link
          to="/login"
          className="px-2 py-1 text-gray-800 bg-transparent border border-gray-700 rounded-lg shadow-sm transition-transform hover:scale-105 focus:ring-2 focus:ring-gray-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-2 py-1 text-gray-800 bg-transparent border border-gray-700 rounded-lg shadow-sm transition-transform hover:scale-105 focus:ring-2 focus:ring-gray-600"
        >
          Register
        </Link>
      </div>

      <div className="flex gap-3">
        <a
          href="https://github.com/rashal5"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex items-center gap-1 px-2 py-1 text-gray-800 bg-transparent border border-gray-700 rounded-lg shadow-sm transition-transform hover:scale-105 focus:ring-2 focus:ring-gray-600"
        >
          <FaGithub className="text-lg" />
          <span>GitHub</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
