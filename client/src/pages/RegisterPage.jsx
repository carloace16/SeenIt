import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await registerUser(formData);

    if (result.error) {
      setError(result.error);
    } else {
      // A real app would auto-login here, for now, we just redirect.
      console.log("Registered user:", result);
      alert("Account created! Please log in. (Redirecting...)");
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-gray-800 border border-gray-700 shadow-xl shadow-purple-500/10 rounded-2xl p-8 md:p-12 w-full max-w-lg">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-white text-center mb-2">
          Get Started with
        </h2>
        <h1 className="text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          SeenIt
        </h1>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-400"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., John"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-400"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Doe"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
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
            Create Account
          </button>

          {/* Link to Login */}
          <p className="text-gray-400 text-center text-sm pt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
