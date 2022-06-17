import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const userRole = localStorage.getItem("user-role");
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "student") {
      navigate("/teacher-dashboard");
    }
  }, [userRole]); // eslint-disable-line react-hooks/exhaustive-deps
  return <h1>Student dashboard</h1>;
};

export default StudentDashboard;
