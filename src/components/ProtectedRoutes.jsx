import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedRoutes = ({ isSignedIn }) => {
  return (
    <>
      {isSignedIn ? <Outlet /> : <Navigate to="/login" replace={isSignedIn} />}
    </>
  );
};

export default ProtectedRoutes;
