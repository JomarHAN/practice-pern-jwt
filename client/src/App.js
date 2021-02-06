import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { useStateValue } from "./ContextAPI/StateProvider";
import Dashboard from "./components/Dashboard";
import Gallery from "./components/Gallery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [{ isAuth }, dispatch] = useStateValue();

  const isVerify = async () => {
    if (localStorage.token) {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();

      if (parseRes === "Unauthorize") {
        dispatch({
          type: "SET_ISAUTH",
          isAuth: false,
        });
        localStorage.removeItem("token");
      } else {
        dispatch({
          type: "SET_ISAUTH",
          isAuth: true,
        });
      }
    }
  };

  useEffect(() => {
    isVerify();
  }, []);

  return (
    <Router>
      <ToastContainer />
      <div className="app">
        <div className="app__nav">
          <Header />
        </div>
        <div className="app__body container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuth ? <Login {...props} /> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuth ? <Register {...props} /> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/gallery"
              render={(props) =>
                isAuth ? <Gallery {...props} /> : <Redirect to="/" />
              }
            />
            <Route exact path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
