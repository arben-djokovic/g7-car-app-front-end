import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./AuthService";

export const PrivateRoute = ({children}) => {
  let isAuthenticated = auth.getAuthStatus();
  return (
        isAuthenticated ? children : <Navigate to="/log-in" />
  );
};
