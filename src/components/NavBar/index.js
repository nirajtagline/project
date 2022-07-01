import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalItems } from "../../utils/localStorage";
import { fetchUserToken } from "../../redux/actions/userAuth";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserLogged } = useSelector(({ userAuth }) => userAuth);

  const userRole = getLocalItems("user-role");

  useEffect(() => {}, [isUserLogged]);
  const handleUserLogout = () => {
    dispatch(fetchUserToken(""));
    localStorage.clear();
    navigate("/");
  };

  return (
    <header>
      <ul className="main-header">
        <li>
          {userRole ? (
            <h2>
              <NavLink to="/dashboard">{userRole.toLocaleUpperCase()} </NavLink>
            </h2>
          ) : (
            "User role"
          )}
        </li>

        {!isUserLogged ? (
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
