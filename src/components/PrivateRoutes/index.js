import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const PrivateRoutes = (props) => {
  const { isUserLogged } = useSelector(({ userAuth }) => userAuth);
  const isLogged = localStorage.getItem("user-token");
  const navigate = useNavigate();
  let url = window.location.href;

  useEffect(() => {
    if (!isUserLogged || !isLogged) {
      let path = /newPassword/;
      if (path.test(url)) return;
      navigate("/");
    }
  }, [isUserLogged, isLogged]); // eslint-disable-line react-hooks/exhaustive-deps
  return props.children;
};

export default PrivateRoutes;
