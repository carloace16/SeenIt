import React from "react";
import { Link } from "react-router-dom";
import SeenItLogo from "../assets/seenit-logo.png";
import { useAuth } from "../context/AuthContext"; // 1. Import the useAuth hook

const Footer = () => {
  const { isLoggedIn } = useAuth(); // 2. Get the user's login status

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Side: Logo & Copyright */}
          <div className="flex items-center gap-2">
            <img
              className="h-6 w-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
              src={SeenItLogo}
              alt="Logo"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} SeenIt. All rights reserved.
            </p>
          </div>

          {/* Right Side: Smart "Home" Link Only */}
          <div className="flex gap-6">
            <Link
              // 3. This link is now "smart"
              to={isLoggedIn ? "/dashboard" : "/"}
              className="text-gray-500 hover:text-blue-400 text-sm transition-colors"
            >
              Home
            </Link>
            {/* 4. Removed the "Privacy" and "Contact" links */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
