import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import PrivateRoutes from "../components/PrivateRoutes";
import PublicRoutes from "../components/PublicRoutes";
import { getLocalItems } from "../utils/localStorage";
import RouteList from "./routeList";

const Routes = () => {
  const userRole = getLocalItems("user-role");
  const userToken = getLocalItems("user-token");

  return (
    <Router>
      {RouteList?.map(({ isRole, path, element }, i) => {
        if (isRole === userRole || isRole === "generalAuth") {
          return (
            <Route
              path={path}
              element={
                <PrivateRoutes userToken={userToken}>{element}</PrivateRoutes>
              }
              key={i}
            />
          );
        } else if (isRole === "general") {
          return (
            <Route
              path={path}
              element={<PublicRoutes>{element}</PublicRoutes>}
              key={i}
            />
          );
        } else return true;
      })}
    </Router>
  );
};

export default Routes;
