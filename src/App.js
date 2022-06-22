import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import Routes from "../src/routes/index";
import Layout from "./components/Layout";
import NavBar from "./components/NavBar";
import Sidebar from "./routes/sidebar";
import Loader from "./shared/Loader";
import "./App.scss";

const App = () => {
  const isLogged = localStorage.getItem("user-token");
  const { isUserLogged } = useSelector(({ userAuth }) => userAuth);
  useEffect(() => {}, [isLogged, isUserLogged]);
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Layout>
          <NavBar />
          <div className="main-section">
            {isLogged ? (
              <div className="sidebar-section">
                <Sidebar />
              </div>
            ) : (
              ""
            )}

            <Routes />
          </div>
        </Layout>
      </Suspense>
    </div>
  );
};

export default App;
