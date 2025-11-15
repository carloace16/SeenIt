import React, { createContext, useState, useContext } from "react";

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create a "hook" so other components can easily use this context
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Create the "Provider" component that will wrap our whole app
export const AuthProvider = ({ children }) => {
  // --- THIS IS THE UPDATE ---
  // When the app first loads, check if a user is saved in localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("seenit_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  // --------------------------

  // This is our global login function
  const login = (userData) => {
    // --- THIS IS THE UPDATE ---
    // Save the user to localStorage to persist the session
    localStorage.setItem("seenit_user", JSON.stringify(userData));
    // --------------------------
    setUser(userData);
  };

  // This is our global logout function
  const logout = () => {
    // --- THIS IS THE UPDATE ---
    // Remove the user from localStorage
    localStorage.removeItem("seenit_user");
    // --------------------------
    setUser(null);
  };

  // The "value" is what we pass down to all components
  const value = {
    user,
    isLoggedIn: !!user, // A simple boolean: true if user exists, false if not
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
