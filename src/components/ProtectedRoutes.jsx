import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isSignedIn }) => {
  return (
    <>
      {isSignedIn ? <Outlet /> : <Navigate to="/login" replace={isSignedIn} />}
    </>
  );
};

export default ProtectedRoutes;
