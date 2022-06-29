import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalItems } from "../../utils/localStorage";

const TeacherDashboard = () => {
  const userRole = getLocalItems("user-role");

  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "teacher") {
      navigate("/student-dashboard");
    }
  }, [userRole]); // eslint-disable-line react-hooks/exhaustive-deps
  return <h1>Teacher dashboard</h1>;
};

export default TeacherDashboard;
