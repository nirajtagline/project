import React from "react";
import { Link } from "react-router-dom";
import { getLocalItems } from "../../utils/localStorage";

const Sidebar = () => {
  const userRole = getLocalItems("user-role");

  const sideMenuList = [
    // // Teacher route link
    { to: "/all-student-data", title: "All student Data", isRole: "teacher" },
    {
      to: "/varified-student-data",
      title: "Varified students for exam",
      isRole: "teacher",
    },

    { to: "/create-exam", title: "Create exam", isRole: "teacher" },
    { to: "/view-exam", title: "View exam", isRole: "teacher" },

    // // Student route link
    {
      to: "/all-exam-student",
      title: "All Exam for student",
      isRole: "student",
    },
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
