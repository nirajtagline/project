import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const userRole = localStorage.getItem("user-role");

  const sideMenuList = [
    // Teacher route link
    { to: "/all-student-data", title: "All student Data", isRole: "teacher" },
    {
      to: "/varified-student-data",
      title: "Varify students for exam",
      isRole: "teacher",
    },

    { to: "/create-exam", title: "Create exam", isRole: "teacher" },
    { to: "/view-exam", title: "view exam", isRole: "teacher" },
    // { to: "/view-exam-details", title: "view exam details", isRole: "teacher" },

    // // Student route link
    {
      to: "/all-exam-student",
      title: "All Exam for student",
      isRole: "student",
    },
    { to: "/exam-paper", title: "Exam paper", isRole: "student" },
    { to: "/giv-exam", title: "Give exam", isRole: "student" },
    { to: "/get-student-profile", title: "Student profile", isRole: "student" },
  ];

  return (
    <div>
      <ul>
        {sideMenuList
          .filter((list) => list.isRole === userRole)
          .map((menu, i) => {
            return (
              <li key={i}>
                <Link to={menu.to}>{menu.title}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Sidebar;
