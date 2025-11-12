import React from "react";
import { Link } from "react-router-dom";
import SeenItLogo from "../assets/seenit-logo.png";

const Footer = () => {
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

          {/* Right Side: Simple Links */}
          <div className="flex gap-6">
            <Link
              to="/"
              className="text-gray-500 hover:text-blue-400 text-sm transition-colors"
            >
              Home
            </Link>
            <a
              href="#"
              className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-pink-400 text-sm transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
