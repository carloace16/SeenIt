import React, { createContext, useState, useContext } from "react";

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create a "hook" so other components can easily use this context
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Create the "Provider" component that will wrap our whole app
export const AuthProvider = ({ children }) => {
  // We will store the logged-in user's data here
  const [user, setUser] = useState(null);

  // This will be our global login function
  const login = (userData) => {
    // In a real app, you'd also save a token to localStorage
    setUser(userData);
  };

  // This will be our global logout function
  const logout = () => {
    // In a real app, you'd also remove the token
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
