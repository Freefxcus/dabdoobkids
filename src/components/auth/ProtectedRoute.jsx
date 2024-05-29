import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated =
    localStorage.getItem("access_token") &&
    localStorage.getItem("refresh_token");
  if (!isAuthenticated) toast.error("Please login to access this page");
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
