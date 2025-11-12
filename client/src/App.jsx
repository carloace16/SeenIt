import React from "react";
// We need useLocation to check if we are on the homepage
import { useRoutes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import all your pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  let element = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/dashboard", element: <Dashboard /> },
  ]);

  return (
    // This div now correctly fills the screen
    <div className="App bg-gray-900 text-white min-h-screen flex flex-col font-['Urbanist']">
      <Navbar />

      {/* This is the layout fix.
        If it's the landing page, we use 'flex-grow' to fill the screen.
        If it's ANY OTHER page, we add the 'max-w-7xl' container.
      */}
      <main
        className={
          isLandingPage
            ? "flex flex-grow w-full" // Full-screen for landing page
            : "max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 flex-grow w-full" // Contained for all other pages
        }
      >
        {element}
      </main>

      <Footer />
    </div>
  );
};

export default App;
