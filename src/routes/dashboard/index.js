import React from "react";
import { Outlet } from "react-router";
import { getLocalItems } from "../../utils/localStorage";

const DashBoard = () => {
  const userRole = getLocalItems("user-role");

  return (
    <>
      <h1>{userRole?.toLocaleUpperCase()} DASHBOARD</h1>
      <Outlet />
    </>
  );
};

export default DashBoard;
