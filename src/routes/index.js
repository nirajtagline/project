import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import PrivateRoutes from "../components/PrivateRoutes";
import RoleWiseRoutes from "./RoleWise";
import RouteList from "./routeList";

const Routes = () => {
  const userRole = localStorage.getItem("user-role");

  const filteredRoute = RouteList.filter((data) => data?.isRole === userRole);
  const commonRoute = RouteList.filter((data) => data?.isRole === "general");
  const commonAuthRoute = RouteList.filter(
    (data) => data?.isRole === "generalAuth"
  );

  return (
    <>
      <Router>
        {commonRoute?.map((route, i) => {
          return <Route path={route.path} element={route.element} key={i} />;
        })}
      </Router>

      <PrivateRoutes>
        <Router>
          {commonAuthRoute?.map((route, i) => {
            return <Route path={route.path} element={route.element} key={i} />;
          })}
        </Router>
        <RoleWiseRoutes>
          <Router>
            {filteredRoute?.map((roleWiseRoute, i) => {
              return (
                <Route
                  path={roleWiseRoute.path}
                  element={roleWiseRoute.element}
                  key={i}
                />
              );
            })}
          </Router>
        </RoleWiseRoutes>
      </PrivateRoutes>
    </>
  );
};

export default Routes;
