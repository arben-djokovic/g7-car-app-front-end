import React from "react";
import { Navigate  } from 'react-router-dom';
import { auth } from "./AuthService";

export const GuestRoute = ({ children }) => {
  let isAuthenticated = auth.getAuthStatus();
  return isAuthenticated ? <Navigate  to="/" /> : children;
};