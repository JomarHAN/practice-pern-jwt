import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app__nav">
          <div className="container app__header">
            <div className="app__headerLeft">
              <Link to="/">
                <h1>Home</h1>
              </Link>
            </div>
            <div className="app_headerRight">
              <Link>
                <h3>Login</h3>
              </Link>
            </div>
          </div>
        </div>
        <div className="app__container"></div>
      </div>
    </Router>
  );
}

export default App;
