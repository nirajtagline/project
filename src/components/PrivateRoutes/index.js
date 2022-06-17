import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const PrivateRoutes = (props) => {
  const { isUserLogged } = useSelector(({ userAuth }) => userAuth);
  const isLogged = localStorage.getItem("user-token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLogged || !isLogged) {
      navigate("/");
    }
  }, [isUserLogged, isLogged, navigate]);
  return props.children;
};

export default PrivateRoutes;
