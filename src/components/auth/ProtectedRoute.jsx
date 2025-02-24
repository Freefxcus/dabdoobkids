import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp !== undefined && decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated =
    localStorage.getItem("access_token") &&
    isTokenExpired(localStorage.getItem("access_token"));
  localStorage.getItem("refresh_token");
  // if (!isAuthenticated)  //  toast.error("Please login to access this page");

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
