import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AUTH_STORAGE_KEY = 'dapurAzkaAuth';
const USER_PROFILE_KEY = 'dapurAzkaUserProfile';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      return storedAuth ? JSON.parse(storedAuth) : false;
    } catch (error) {
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(USER_PROFILE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(isAuthenticated));
      if (isAuthenticated && user) {
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(user));
      } else if (!isAuthenticated) {
        localStorage.removeItem(USER_PROFILE_KEY);
      }
    } catch (error) {
      console.error("Error saving auth state to localStorage:", error);
    }
  }, [isAuthenticated, user]);

  const login = (userData) => {
    setIsAuthenticated(true);
    const defaultProfile = { name: '', email: '', phone: '', address: '', city: '', postalCode: '' };
    const fullUserData = { ...defaultProfile, ...userData };
    setUser(fullUserData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(CART_STORAGE_KEY); // Also clear cart on logout
  };
  
  const CART_STORAGE_KEY = 'dapurAzkaCart'; // Define it if not imported globally

  const updateUser = (updatedData) => {
    setUser(prevUser => ({ ...prevUser, ...updatedData }));
  };
  
  const deleteAccount = () => {
    logout(); // This will clear auth state and user profile from localStorage
    // Additional logic for backend deletion if any
    console.log("Account deleted from frontend storage.");
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};