import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext"; // 1. Import the auth hook

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Get the global login function

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const credentials = { email, password };
    const result = await loginUser(credentials);

    if (result.error) {
      setError(result.error);
    } else {
      // 3. Call the global login function with the user's data
      login(result);
      console.log("Logged in user:", result);
      // We don't need an alert, just redirect
      navigate("/dashboard"); // Redirect to the main dashboard
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-gray-800 border border-gray-700 shadow-xl shadow-blue-500/10 rounded-2xl p-8 md:p-12 w-full max-w-lg">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-white text-center mb-2">
          Welcome Back to
        </h2>
        <h1 className="text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          SeenIt
        </h1>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg 
                       shadow-lg shadow-blue-500/30 hover:bg-blue-500 
                       transition-all duration-300 transform hover:scale-105"
          >
            Log In
          </button>

          {/* Link to Register */}
          <p className="text-gray-400 text-center text-sm pt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
