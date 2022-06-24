import React from "react";
import { lazy } from "react";
const AllStudentData = lazy(() =>
  import("../teacher-dashborad/all-student-data")
);
const EditExamDetails = lazy(() =>
  import("../teacher-dashborad/edit-exam-details")
);
const VarifiedStudentData = lazy(() =>
  import("../teacher-dashborad/varified-student-data")
);
const StudentDetails = lazy(() =>
  import("../teacher-dashborad/student-details")
);
const CreateExam = lazy(() => import("../teacher-dashborad/create-exam"));
const ViewExam = lazy(() => import("../teacher-dashborad/view-exam"));
const ViewExamDEtails = lazy(() =>
  import("../teacher-dashborad/view-exam-details")
);
const AllExamStudent = lazy(() =>
  import("../student-dashborad/all-exam-student")
);
const ExamPaper = lazy(() => import("../student-dashborad/exam-paper"));
const StudentProfile = lazy(() =>
  import("../student-dashborad/get-student-profile")
);
const Login = lazy(() => import("../login"));
const SignUp = lazy(() => import("../sign-up"));
const NewPassword = lazy(() => import("../new-password"));
const ForgotPassword = lazy(() => import("../forgot-password"));
const ResetPassword = lazy(() => import("../reset-password"));
const TeacherDashboard = lazy(() => import("../teacher-dashborad"));
const StudentDashboard = lazy(() => import("../student-dashborad"));

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

  // private auth route
  {
    path: "/reset-password",
    element: <ResetPassword />,
    isRole: "generalAuth",
  },
  {
    path: "/teacher-dashboard",
    element: <TeacherDashboard />,
    isRole: "generalAuth",
  },
  {
    path: "/student-dashboard",
    element: <StudentDashboard />,
    isRole: "generalAuth",
  },

  // Teacher route
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

  // student route
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
