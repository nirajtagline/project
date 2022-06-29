import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getLocalItems } from "../../utils/localStorage";

const PrivateRoutes = (props) => {
  const userToken = getLocalItems("user-token");
  const navigate = useNavigate();
  let url = window.location.href;

  useEffect(() => {
    if (!userToken) {
      let path = /newPassword/;
      if (path.test(url)) return;
      navigate("/");
    }
  }, [userToken]); // eslint-disable-line react-hooks/exhaustive-deps
  return props.children;
};

export default PrivateRoutes;
