import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../ContextAPI/StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();

  const onLogin = () => {
    dispatch({
      type: "SET_ISAUTH",
      isAuth: true,
    });
  };
  return (
    <div>
      <h1>Login</h1>
      <Link to="/register">Register</Link>
      <button onClick={onLogin}>Submit</button>
    </div>
  );
}

export default Login;
