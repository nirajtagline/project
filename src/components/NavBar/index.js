import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const navigate = useNavigate();
  const { isUserLogged } = useSelector(({ userAuth }) => userAuth);
  const isLogged = localStorage.getItem("user-token");
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
          <NavLink className="header-link" to="/">
            Home
          </NavLink>
        </li>
        {!isLogged || !isUserLogged ? (
          <>
            <li>
              <NavLink className="header-link" to="/login">
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
          <li onClick={handleUserLogout}>
            <NavLink to="/login" className="header-link">
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </header>
  );
};

export default NavBar;
