import React, { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext/UserContext";

const RequireAuth: React.FC = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  return user ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />;
};

export default RequireAuth;
