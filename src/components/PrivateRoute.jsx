// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext"; // ✅ Corrected path

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
