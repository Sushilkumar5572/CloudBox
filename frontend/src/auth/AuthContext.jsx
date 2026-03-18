import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setUser(userData);

  };

  const logout = () => {

    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);

  };

  return (

    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>

  );

};