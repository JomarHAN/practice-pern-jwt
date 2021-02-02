import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useStateValue } from "../ContextAPI/StateProvider";
import "./Header.css";

function Header() {
  const [{ isAuth }, dispatch] = useStateValue();
  return (
    <div className="header">
      <div className="container header">
        <div className="header__left">
          <Link to="/">
            <h1>Home</h1>
          </Link>
        </div>
        <div className="header__right">
          {!isAuth ? (
            <Link to="/login">
              <h3>Login</h3>
            </Link>
          ) : (
            <div className="header__gallery">
              <Link to="gallery">
                <h3>Gallery</h3>
              </Link>
              <button
                onClick={() =>
                  dispatch({
                    type: "SET_ISAUTH",
                    isAuth: false,
                  })
                }
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
