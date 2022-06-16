import Routes from "../src/routes/index";
import Layout from "./components/Layout";
import "./App.scss";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Layout>
        <NavBar />
        <Routes />
      </Layout>
    </div>
  );
}

export default App;
