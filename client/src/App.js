import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { useStateValue } from "./ContextAPI/StateProvider";

function App() {
  const [{ isAuth }] = useStateValue();
  console.log(isAuth);
  return (
    <Router>
      <div className="app">
        <div className="app__nav">
          <Header />
        </div>
        <div className="app__body container">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
