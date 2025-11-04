// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = true // or localStorage

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // renders nested routes when authenticated
};

export default ProtectedRoute;
