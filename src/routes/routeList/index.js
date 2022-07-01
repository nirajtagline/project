import React from "react";
import AllStudentData from "../teacher-dashborad/all-student-data";
import EditExamDetails from "../teacher-dashborad/edit-exam-details";
import VarifiedStudentData from "../teacher-dashborad/varified-student-data";
import StudentDetails from "../teacher-dashborad/student-details";
import CreateExam from "../teacher-dashborad/create-exam";
import ViewExam from "../teacher-dashborad/view-exam";
import ViewExamDEtails from "../teacher-dashborad/view-exam-details";
import AllExamStudent from "../student-dashborad/all-exam-student";
import ExamPaper from "../student-dashborad/exam-paper";
import StudentProfile from "../student-dashborad/get-student-profile";
import Login from "../login";
import SignUp from "../sign-up";
import NewPassword from "../new-password";
import ForgotPassword from "../forgot-password";
import ResetPassword from "../reset-password";
import NoPageForYou from "../no-page-for-you";
import DashBoard from "../dashboard";

const routeList = [
  // common route
  {
    path: "/",
    element: <Login />,
    isRole: "general",
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    isRole: "general",
  },
  {
    path: "/signup",
    element: <SignUp />,
    isRole: "general",
  },
  {
    path: "/newPassword",
    element: <NewPassword />,
    isRole: "general",
  },
  {
    path: "*",
    element: <NoPageForYou />,
    isRole: "generalAuth",
  },

  // private auth route
  {
    path: "/reset-password",
    element: <ResetPassword />,
    isRole: "generalAuth",
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    isRole: "generalAuth",
  },

  {
    path: "/all-student-data",
    element: <AllStudentData />,
    isRole: "teacher",
  },
  {
    path: "/varified-student-data",
    element: <VarifiedStudentData />,
    isRole: "teacher",
  },
  {
    path: "/varified-student-data/student-details/:id",
    element: <StudentDetails />,
    isRole: "teacher",
  },
  { path: "/create-exam", element: <CreateExam />, isRole: "teacher" },
  { path: "/view-exam", element: <ViewExam />, isRole: "teacher" },
  {
    path: "/view-exam-details/:examId",
    element: <ViewExamDEtails />,
    isRole: "teacher",
  },
  {
    path: "/edit-exam-details/:examId",
    element: <EditExamDetails />,
    isRole: "teacher",
  },
  {
    path: "/all-exam-student",
    element: <AllExamStudent />,
    isRole: "student",
  },
  {
    path: "/all-exam-student/exam-paper/:examId",
    element: <ExamPaper />,
    isRole: "student",
  },
  {
    path: "/get-student-profile",
    element: <StudentProfile />,
    isRole: "student",
  },
];

export default routeList;
