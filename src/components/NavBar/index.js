import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const navigate = useNavigate();
  const { isUserLogged } = useSelector(({ userAuth }) => userAuth);
  const isLogged = localStorage.getItem("user-token");
  const userRole = localStorage.getItem("user-role");

  useEffect(() => {}, [isLogged, isUserLogged]);
  const handleUserLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <header>
      <ul className="main-header">
        <li>
          {userRole ? (
            <h2>
              <NavLink to={`${userRole}-dashboard`}>
                {userRole.toLocaleUpperCase()}{" "}
              </NavLink>
            </h2>
          ) : (
            "User role"
          )}
        </li>

        {!isLogged || !isUserLogged ? (
          <>
            <li>
              <NavLink className="header-link" to="/">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="header-link" to="/signup">
                SignUp
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li onClick={handleUserLogout}>
              <NavLink to="/" className="header-link">
                Logout
              </NavLink>
            </li>
            <li>
              <NavLink to="/reset-password" className="header-link">
                Reset Password
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default NavBar;
