import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpVerified, setOtpVerified] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticatedState] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // Sync user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const setIsAuthenticated = (value) => {
    setIsAuthenticatedState(value);
    localStorage.setItem("isAuthenticated", value ? "true" : "false");
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setOtp(["", "", "", ""]);
    setOtpVerified(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  return (
    <AppContext.Provider
      value={{
        mobileNumber,
        setMobileNumber,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        otp,
        setOtp,
        otpVerified,
        setOtpVerified,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
