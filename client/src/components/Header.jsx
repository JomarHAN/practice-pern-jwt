import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="app__header">
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
  );
}

export default Header;
