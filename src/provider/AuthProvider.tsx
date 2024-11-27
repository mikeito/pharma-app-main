'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for the context
interface AuthContextType {
  user: any | null; // The user data (can be of any type)
  token: string | null; // The auth token
  login: (user: any, token: string) => void; // Function to log in
  logout: () => void; // Function to log out
}


const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize the user and token state (you can retrieve them from localStorage if needed)
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Login function to set user and token
  const login = (userData: any, userToken: string) => {
    setUser(userData);  // Set the user data
    setToken(userToken); // Set the token
    // Optionally, you could store them in localStorage/sessionStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
  };

  // Logout function to clear user and token
  const logout = () => {
    setUser(null);
    setToken(null);
    // Optionally, remove from localStorage/sessionStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
