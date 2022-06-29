import React, { Suspense, useEffect } from "react";
import Routes from "../src/routes/index";
import Layout from "./components/Layout";
import Loader from "./shared/Loader";
import "./App.scss";
import { getLocalItems } from "./utils/localStorage";
import { useSelector } from "react-redux";

const App = () => {
  const { isUserLogged } = useSelector(({ userAuth }) => userAuth);
  const userToken = getLocalItems("user-token");

  useEffect(() => {}, [userToken, isUserLogged]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Layout>
          <Routes />
        </Layout>
      </Suspense>
    </div>
  );
};

export default App;
