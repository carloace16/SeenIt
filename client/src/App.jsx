import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import all our pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import ShowDetailsPage from "./pages/ShowDetailsPage";
import SeasonDetailsPage from "./pages/SeasonDetailsPage"; // <-- 1. Import new page

const App = () => {
  const location = useLocation();

  // This logic figures out which layout to use
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  const getMainLayoutClass = () => {
    if (isAuthPage) {
      // 1. For Landing/Login/Register: Full-width, flex-grow, and centers content
      return "flex flex-col flex-grow w-full justify-center items-center py-10 px-4";
    }
    // 2. For Dashboard/etc: Constrained width, content at the top
    return "max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 flex-grow w-full";
  };

  let element = useRoutes([
    {
      path: "/", // Landing Page
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/dashboard", // "Folders" page
      element: <Dashboard />,
    },
    {
      path: "/category/:id", // "Shows" page
      element: <CategoryPage />,
    },
    {
      path: "/show/:id", // <-- 2. ADD THIS ROUTE (Seasons page)
      element: <ShowDetailsPage />,
    },
    {
      path: "/season/:id", // <-- 3. ADD THIS ROUTE (Episodes page)
      element: <SeasonDetailsPage />,
    },
  ]);

  return (
    <div className="App bg-gray-900 text-white min-h-screen flex flex-col font-['Urbanist']">
      <Navbar />

      <main className={getMainLayoutClass()}>{element}</main>

      <Footer />
    </div>
  );
};

export default App;
