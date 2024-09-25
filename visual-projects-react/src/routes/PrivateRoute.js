import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  //const { pathname, search } = useLocation();

  //localStorage.setItem("lastPath", pathname + search);

  const { user } = useSelector((state) => state);

  return user ? children : <Navigate to="/login" />;
};
