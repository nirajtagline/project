import { Navigate } from "react-router";

const PrivateRoutes = ({ userToken, children }) => {
  let url = window.location.href;

  if (!userToken) {
    let path = /newPassword/;
    if (path.test(url)) return;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoutes;
