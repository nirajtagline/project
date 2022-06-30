import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import PrivateRoutes from "../components/PrivateRoutes";
import PublicRoutes from "../components/PublicRoutes";
import { getLocalItems } from "../utils/localStorage";
import RouteList from "./routeList";

const Routes = () => {
  const userRole = getLocalItems("user-role");

  const filteredRoute = RouteList.filter(
    (data) => data?.isRole === userRole || data?.isRole === "generalAuth"
  );
  const commonRoute = RouteList.filter((data) => data?.isRole === "general");

  return (
    <Router>
      {/* Public routes */}

      {commonRoute?.map((route, i) => {
        return (
          <Route
            path={route.path}
            element={<PublicRoutes>{route.element} </PublicRoutes>}
            key={i}
          />
        );
      })}

      {/* Private routes */}

      {filteredRoute?.map((roleWiseRoute, i) => {
        return (
          <Route
            path={roleWiseRoute.path}
            exact
            element={<PrivateRoutes>{roleWiseRoute.element}</PrivateRoutes>}
            key={i}
          />
        );
      })}
    </Router>
  );
};

export default Routes;
