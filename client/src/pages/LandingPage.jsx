import React from "react";
import { Link } from "react-router-dom";
import SeenItLogo from "../assets/seenit-logo.png";

const LandingPage = () => {
  return (
    // This container fills the vertical space and centers everything
    <div className="flex flex-col items-center justify-center text-center flex-grow">
      {/* Optional: You can add the logo here if you want it on the landing page */}
      {/* <img 
        src={SeenItLogo} 
        alt="SeenIt Logo" 
        className="w-40 h-40 mb-8"
      /> */}

      {/* The Gradient Header */}
      <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-tight mb-6">
        Never lose your place again.
        <br />
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Ever.
        </span>
      </h1>

      {/* The Subtitle (better spacing) */}
      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
        Tired of forgetting where you left off?{" "}
        <span className="font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          SeenIt
        </span>{" "}
        is your new personal tracker. Log every show, season, and episode. Your
        entire streaming history, all in one place.
      </p>

      {/* The Call to Action Buttons (bigger and better) */}
      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          to="/register"
          className="bg-blue-600 text-white font-bold py-4 px-10 rounded-full text-lg 
                     shadow-lg shadow-blue-500/30 hover:bg-blue-500 
                     transition-all duration-300 transform hover:scale-105"
        >
          Get Started for Free
        </Link>
        <Link
          to="/login"
          className="bg-gray-700 text-gray-200 font-bold py-4 px-10 rounded-full text-lg 
                     hover:bg-gray-600 
                     transition-colors duration-300 transform hover:scale-105"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
