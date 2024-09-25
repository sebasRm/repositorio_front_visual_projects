import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";
import { Sesion } from "./Sesion";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PublicRoute } from "./routes/PublicRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import { DashboardRoutes } from "./routes/DashboardRoutes";
function Navegate() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Sesion />
            </PublicRoute>
          }
        />
        <Route
         path="/*"
         element={
         <PrivateRoute>
          <DashboardRoutes/>
         </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
export default Navegate;
