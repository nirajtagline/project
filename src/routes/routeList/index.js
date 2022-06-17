import AllStudentData from "../teacher-dashborad/all-student-data";
import VarifiedStudentData from "../teacher-dashborad/varified-student-data";
import StudentDetails from "../teacher-dashborad/student-details";
import CreateExam from "../teacher-dashborad/create-exam";
import ViewExam from "../teacher-dashborad/view-exam";
import ViewExamDEtails from "../teacher-dashborad/view-exam-details";
import AllExamStudent from "../student-dashborad/all-exam-student";
import ExamPaper from "../student-dashborad/exam-paper";
import GiveExam from "../student-dashborad/give-exam";
import StudentProfile from "../student-dashborad/get-student-profile";
import Login from "../login";
import SignUp from "../sign-up";
import NewPassword from "../new-password";
import ForgotPassword from "../forgot-password";
import ResetPassword from "../reset-password";
import TeacherDashboard from "../teacher-dashborad";
import StudentDashboard from "../student-dashborad";

const routeList = [
  // common route
  {
    path: "/",
    element: <Login />,
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
    path: "/forgot-password",
    element: <ForgotPassword />,
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
    path: "/student-details",
    element: <StudentDetails />,
    isRole: "teacher",
  },
  { path: "/create-exam", element: <CreateExam />, isRole: "teacher" },
  { path: "/view-exam", element: <ViewExam />, isRole: "teacher" },
  {
    path: "/view-exam-details",
    element: <ViewExamDEtails />,
    isRole: "teacher",
  },

  // student route
  {
    path: "/all-exam-student",
    element: <AllExamStudent />,
    isRole: "student",
  },
  { path: "/exam-paper", element: <ExamPaper />, isRole: "student" },
  { path: "/giv-exam", element: <GiveExam />, isRole: "student" },
  {
    path: "/get-student-profile",
    element: <StudentProfile />,
    isRole: "student",
  },
];

export default routeList;
