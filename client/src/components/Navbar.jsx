import React from "react";
// 1. Import useNavigate
import { Link, useLocation, useNavigate } from "react-router-dom";
import SeenItLogo from "../assets/seenit-logo.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const { isLoggedIn, logout, user } = useAuth();
  // 2. Initialize navigate
  const navigate = useNavigate();

  // 3. Create a new handler that logs out AND redirects
  const handleLogout = () => {
    logout(); // Clears the user state
    navigate("/"); // Redirects to the landing page
  };

  const getNavLinks = () => {
    if (isLoggedIn) {
      return (
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-gray-300 hover:text-white text-lg font-medium transition-colors"
          >
            Dashboard
          </Link>
          <span className="text-gray-400 text-sm">Hi, {user.first_name}!</span>
          <button
            onClick={handleLogout} // 4. Use the new handler here
            className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-red-500 transition-all duration-300"
          >
            Log Out
          </button>
        </div>
      );
    }

    // --- (Rest of the code is the same) ---

    // Logic to hide buttons if we are already on that page
    if (path === "/login") {
      return (
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all duration-300"
        >
          Get Started
        </Link>
      );
    }

    if (path === "/register") {
      return (
        <Link
          to="/login"
          className="text-gray-300 hover:text-white text-lg font-medium transition-colors"
        >
          Log In
        </Link>
      );
    }

    // Default view (Landing Page or others)
    return (
      <div className="flex items-center gap-6">
        <Link
          to="/login"
          className="text-gray-300 hover:text-white text-lg font-medium transition-colors"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    );
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Brand Logo with Gradient Text */}
          <div className="flex-shrink-0">
            <Link
              to={isLoggedIn ? "/dashboard" : "/"}
              className="flex items-center gap-3 group"
            >
              <img
                className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
                src={SeenItLogo}
                alt="SeenIt Logo"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                SeenIt
              </span>
            </Link>
          </div>

          {/* Nav Links */}
          <div>{getNavLinks()}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
