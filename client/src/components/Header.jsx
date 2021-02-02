import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="container header">
        <div className="header__left">
          <Link to="/">
            <h1>Home</h1>
          </Link>
        </div>
        <div className="header__right">
          <Link to="/login">
            <h3>Login</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
