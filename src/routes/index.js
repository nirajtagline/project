import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import Login from "./login";
import SignUp from "./sign-up";
import ForgotPassword from "./forgot-password";
import Home from "./home";
import TeacherDashboard from "./teacher-dashborad";
import StudentDashboard from "./student-dashborad";

const Routes = () => {
  return (
    <>
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Router>
    </>
  );
};

export default Routes;
