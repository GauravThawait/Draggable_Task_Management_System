import React, { createContext, useState, useEffect } from "react";
import { get_token } from "./storage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
