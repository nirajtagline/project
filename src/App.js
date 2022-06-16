import Routes from "../src/routes/index";
import Layout from "./components/Layout";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./App.scss";

const App = () => {
  const isLogged = localStorage.getItem("user-token");
  const { isUserLogged } = useSelector(({ userAuth }) => userAuth);

  useEffect(() => {}, [isLogged, isUserLogged]);

  return (
    <div className="App">
      <Layout>
        <NavBar />
        <div className="main-section">
          {isLogged ? <div className="sidebar-section">Sidebar</div> : ""}

          <Routes />
        </div>
      </Layout>
    </div>
  );
};

export default App;
