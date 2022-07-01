import Sidebar from "../sidebar";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import { getLocalItems } from "../../utils/localStorage";
import { useEffect } from "react";
import { fetchUserToken } from "../../redux/actions/userAuth";
import "./layout.scss";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { isUserLogged } = useSelector(({ userAuth }) => userAuth);
  const userToken = getLocalItems("user-token");

  useEffect(() => {
    dispatch(fetchUserToken(userToken));
  }, [userToken]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <NavBar />
      <div className="main-section">
        {isUserLogged ? (
          <div className="sidebar-section">
            <Sidebar />
          </div>
        ) : (
          ""
        )}
        <div className="routing-section">{children}</div>
      </div>
    </>
  );
};

export default Layout;
