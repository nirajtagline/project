import React from "react";
import { getLocalItems } from "../../utils/localStorage";

const DashBoard = () => {
  const userRole = getLocalItems("user-role");

  return (
    <>
      <h1>{userRole?.toLocaleUpperCase()} DASHBOARD</h1>
    </>
  );
};

export default DashBoard;
