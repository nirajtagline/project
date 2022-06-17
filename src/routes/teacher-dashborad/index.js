import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const userRole = localStorage.getItem("user-role");
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "teacher") {
      navigate("/student-dashboard");
    }
  }, [userRole]); // eslint-disable-line react-hooks/exhaustive-deps
  return <h1>Teacher dashboard</h1>;
};

export default TeacherDashboard;
