import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../ContextAPI/StateProvider";
import "./Header.css";

function Header() {
  const [{ isAuth }, dispatch] = useStateValue();
  const [isLogin, setIsLogin] = useState(true);
  const [isGallery, setIsGallery] = useState(false);
  const onLogOut = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "SET_ISAUTH",
      isAuth: false,
    });
  };
  return (
    <div className="header">
      <div className="container header">
        <div className="header__left">
          <Link to="/" onClick={() => setIsGallery(!isGallery)}>
            <h1>Home</h1>
          </Link>
        </div>
        <div className="header__right">
          {!isAuth ? (
            <Link
              to={isLogin ? "/login" : "/register"}
              onClick={() => setIsLogin(!isLogin)}
            >
              <h3>{isLogin ? "Login" : "Register"}</h3>
            </Link>
          ) : (
            <div className="header__gallery">
              {!isGallery ? (
                <Link to="gallery" onClick={() => setIsGallery(!isGallery)}>
                  <h3>Gallery</h3>
                </Link>
              ) : (
                ""
              )}
              <button onClick={onLogOut} className="btn btn-danger">
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
